#!/bin/bash

# Script to update documentation with TOC and global screenshot links

REPO_URL="https://github.com/VardhanRangineni/Medplus-Audit"
DOCS_DIR="/home/runner/work/Medplus-Audit/Medplus-Audit/docs"

# List of markdown files in docs directory that have screenshots
MD_FILES=(
    "auditor-detail-modal.md"
    "auditor-performance.md"
    "complete-ui-documentation.md"
    "dashboard-store-coverage.md"
    "live-audit-schedule.md"
    "store-detail-modal.md"
    "store-pid-allotment.md"
    "supervisor-approvals.md"
    "total-stores-details.md"
)

# Files without screenshots
MD_FILES_NO_SCREENSHOTS=(
    "audit-modal.md"
    "auditor-modal.md"
    "store-modal.md"
    "supervisor-modal.md"
)

echo "========================================="
echo "Step 1: Update screenshot links to global URLs"
echo "========================================="

cd "$DOCS_DIR"

for file in "${MD_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        # Replace relative screenshot paths with global GitHub URLs
        sed -i "s|](screenshots/|](${REPO_URL}/raw/main/docs/screenshots/|g" "$file"
        echo "  ✓ Updated screenshot links in $file"
    fi
done

echo ""
echo "========================================="
echo "Step 2: Generate PDFs with Table of Contents"
echo "========================================="

# Generate PDFs for all markdown files (with and without screenshots)
ALL_MD_FILES=("${MD_FILES[@]}" "${MD_FILES_NO_SCREENSHOTS[@]}")

for file in "${ALL_MD_FILES[@]}"; do
    if [ -f "$file" ]; then
        base_name="${file%.md}"
        pdf_name="${base_name}.pdf"
        
        echo "Generating $pdf_name with TOC..."
        pandoc "$file" \
            -o "$pdf_name" \
            --pdf-engine=xelatex \
            --toc \
            --toc-depth=3 \
            --number-sections \
            -V geometry:margin=1in \
            -V linkcolor:blue \
            -V urlcolor:blue \
            -V toccolor:blue \
            2>/dev/null
        
        if [ $? -eq 0 ]; then
            echo "  ✓ Generated $pdf_name"
        else
            echo "  ✗ Failed to generate $pdf_name"
        fi
    fi
done

echo ""
echo "========================================="
echo "Step 3: Add TOC to markdown files"
echo "========================================="

# Function to generate TOC for a markdown file
generate_toc() {
    local file=$1
    local temp_file="${file}.toc.tmp"
    
    echo "Generating TOC for $file..."
    
    # Extract headers and generate TOC
    awk '
    BEGIN {
        print "## Table of Contents\n"
    }
    /^#+ / {
        # Count the number of # to determine level
        level = 0
        for(i=1; i<=length($0); i++) {
            if(substr($0, i, 1) == "#") level++
            else break
        }
        
        # Extract the header text (remove # and trim)
        header = substr($0, level+2)
        
        # Skip the title (level 1) and TOC itself
        if(level == 1 || header ~ /^Table of Contents/) next
        
        # Create anchor (lowercase, replace spaces with hyphens, remove special chars)
        anchor = tolower(header)
        gsub(/[^a-z0-9 -]/, "", anchor)
        gsub(/ /, "-", anchor)
        
        # Generate indentation
        indent = ""
        for(i=2; i<level; i++) indent = indent "  "
        
        # Print TOC entry
        printf "%s- [%s](#%s)\n", indent, header, anchor
    }
    ' "$file" > "$temp_file"
    
    # Check if file already has TOC
    if grep -q "^## Table of Contents" "$file"; then
        echo "  ℹ File already has TOC, skipping..."
        rm "$temp_file"
        return
    fi
    
    # Insert TOC after the first header (title)
    awk '
    NR==FNR {
        toc[NR] = $0
        next
    }
    !inserted && /^#+ / {
        print
        print ""
        for(i=1; i<=length(toc); i++) {
            if(toc[i] != "") print toc[i]
        }
        print ""
        inserted = 1
        next
    }
    { print }
    ' "$temp_file" "$file" > "${file}.new"
    
    mv "${file}.new" "$file"
    rm "$temp_file"
    
    echo "  ✓ Added TOC to $file"
}

# Add TOC to all markdown files
for file in "${ALL_MD_FILES[@]}"; do
    if [ -f "$file" ]; then
        generate_toc "$file"
    fi
done

echo ""
echo "========================================="
echo "Step 4: Create combined documentation"
echo "========================================="

# Create combined markdown file
COMBINED_MD="$DOCS_DIR/COMBINED_DOCUMENTATION.md"

echo "# MedPlus Audit Dashboard - Complete Documentation" > "$COMBINED_MD"
echo "" >> "$COMBINED_MD"
echo "This document combines all documentation files for the MedPlus Audit Dashboard." >> "$COMBINED_MD"
echo "" >> "$COMBINED_MD"
echo "---" >> "$COMBINED_MD"
echo "" >> "$COMBINED_MD"

# Combine all markdown files
for file in "${ALL_MD_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Adding $file to combined documentation..."
        echo "" >> "$COMBINED_MD"
        echo "\\newpage" >> "$COMBINED_MD"
        echo "" >> "$COMBINED_MD"
        cat "$file" >> "$COMBINED_MD"
        echo "" >> "$COMBINED_MD"
    fi
done

echo "  ✓ Created combined markdown file"

# Generate combined PDF with TOC
echo ""
echo "Generating combined PDF with TOC..."
pandoc "$COMBINED_MD" \
    -o "$DOCS_DIR/COMBINED_DOCUMENTATION.pdf" \
    --pdf-engine=xelatex \
    --toc \
    --toc-depth=3 \
    --number-sections \
    -V geometry:margin=1in \
    -V linkcolor:blue \
    -V urlcolor:blue \
    -V toccolor:blue \
    2>/dev/null

if [ $? -eq 0 ]; then
    echo "  ✓ Generated COMBINED_DOCUMENTATION.pdf"
else
    echo "  ✗ Failed to generate combined PDF"
fi

# Generate combined Word document with TOC
echo ""
echo "Generating combined Word document with TOC..."
pandoc "$COMBINED_MD" \
    -o "$DOCS_DIR/COMBINED_DOCUMENTATION.docx" \
    --toc \
    --toc-depth=3 \
    --number-sections \
    2>/dev/null

if [ $? -eq 0 ]; then
    echo "  ✓ Generated COMBINED_DOCUMENTATION.docx"
else
    echo "  ✗ Failed to generate combined Word document"
fi

echo ""
echo "========================================="
echo "✓ Documentation update complete!"
echo "========================================="
echo ""
echo "Summary:"
echo "  - Updated screenshot links to global GitHub URLs"
echo "  - Added table of contents to all markdown files"
echo "  - Generated PDFs with TOC for all documentation"
echo "  - Created combined PDF with TOC"
echo "  - Created combined Word document with TOC"
echo ""
