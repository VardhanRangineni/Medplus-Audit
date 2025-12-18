# PDF Generation Instructions

## Overview

All functional documentation is provided in Markdown format (`.md` files). PDF versions can be generated from these markdown files using various tools.

## Recommended Methods for PDF Generation

### Method 1: Using Browser (Easiest)

1. Open any markdown file in GitHub or a markdown viewer
2. Use browser's Print function (Ctrl+P or Cmd+P)
3. Select "Save as PDF" as the destination
4. Save with the same filename as the markdown file

### Method 2: Using Pandoc (Most Professional)

If you have Pandoc installed:

```bash
# Install pandoc (if not already installed)
# On Ubuntu/Debian:
sudo apt-get install pandoc texlive-latex-base texlive-fonts-recommended

# On MacOS:
brew install pandoc basictex

# Generate PDF from markdown
pandoc global-header.md -o global-header.pdf
pandoc sidebar-navigation.md -o sidebar-navigation.pdf
# ... repeat for each file
```

### Method 3: Using Visual Studio Code

1. Install the "Markdown PDF" extension by yzane
2. Open any `.md` file
3. Right-click and select "Markdown PDF: Export (pdf)"
4. PDF will be generated in the same directory

### Method 4: Using Online Converters

Several online services can convert Markdown to PDF:
- https://md2pdf.netlify.app/
- https://www.markdowntopdf.com/
- https://cloudconvert.com/md-to-pdf

Simply upload the `.md` file and download the generated PDF.

## Batch Conversion Script

For users with Pandoc installed, use this script to convert all markdown files:

```bash
#!/bin/bash
for file in *.md; do
    if [ "$file" != "README.md" ] && [ "$file" != "PDF-GENERATION.md" ]; then
        pandoc "$file" -o "${file%.md}.pdf"
        echo "Generated ${file%.md}.pdf"
    fi
done
```

## Files to Convert

The following markdown files should be converted to PDF:

1. `global-header.md` → `global-header.pdf`
2. `sidebar-navigation.md` → `sidebar-navigation.pdf`
3. `store-coverage-screen.md` → `store-coverage-screen.pdf`
4. `store-details-page.md` → `store-details-page.pdf`
5. `live-audit-schedule-screen.md` → `live-audit-schedule-screen.pdf`
6. `store-detail-modal.md` → `store-detail-modal.pdf`
7. `auditor-performance-screen.md` → `auditor-performance-screen.pdf`
8. `supervisor-approvals-screen.md` → `supervisor-approvals-screen.pdf`

Note: `README.md` can remain as markdown as it serves as the index/navigation document.

## Why PDFs Were Not Pre-generated

PDF generation requires system dependencies that may not be available in all environments. The markdown format is:
- Universally readable
- Version control friendly
- Easily convertible to PDF when needed
- Viewable directly on GitHub

## Maintaining Documentation

When updating documentation:
1. Edit the `.md` files
2. Regenerate PDFs using your preferred method
3. Ensure screenshots are up-to-date
4. Update the README.md if adding new documentation files
