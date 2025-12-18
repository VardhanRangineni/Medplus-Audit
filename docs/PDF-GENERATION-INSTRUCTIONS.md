# PDF Generation Instructions

## Overview

Each markdown documentation file in this directory should have a corresponding PDF version for distribution to stakeholders who prefer offline reading or need to share documentation in meetings.

## Generating PDFs

### Using Pandoc (Recommended)

Install pandoc and required LaTeX packages:
```bash
sudo apt-get install pandoc texlive-latex-base texlive-fonts-recommended texlive-latex-extra
```

Generate a single PDF:
```bash
pandoc dashboard-main-screen.md -o dashboard-main-screen.pdf --pdf-engine=xelatex
```

Generate all PDFs at once:
```bash
for file in *.md; do 
  pandoc "$file" -o "${file%.md}.pdf" --pdf-engine=xelatex
done
```

### Using Online Conversion Tools

If command-line tools are not available:
1. Upload markdown files to services like:
   - https://cloudconvert.com/md-to-pdf
   - https://www.markdowntopdf.com/
   - https://dillinger.io/ (with export to PDF)

2. Download the generated PDFs
3. Place them in the `/docs/` directory alongside their markdown counterparts

### Using VS Code Extensions

1. Install "Markdown PDF" extension in VS Code
2. Open any markdown file
3. Right-click and select "Markdown PDF: Export (pdf)"
4. PDF will be generated in the same directory

## PDF Naming Convention

PDFs should match their markdown filename:
- `dashboard-main-screen.md` → `dashboard-main-screen.pdf`
- `covered-stores-details-screen.md` → `covered-stores-details-screen.pdf`
- `store-detail-modal.md` → `store-detail-modal.pdf`

## Including Screenshots in PDFs

The markdown files already reference screenshots using relative paths:
```markdown
![Dashboard Screenshot](./screenshots/dashboard-main.png)
```

Most PDF generation tools will automatically embed these images in the final PDF.

## Quality Considerations

- Ensure PDFs maintain readability at standard viewing sizes
- Verify that all screenshots are included and visible
- Check that tables remain properly formatted
- Confirm that line breaks and formatting are preserved

## Distribution

Once PDFs are generated:
1. Review each PDF to ensure quality
2. Commit PDFs to the repository alongside markdown files
3. Include PDFs in documentation packages sent to stakeholders
4. Update this file if PDF generation process changes
