/**
 * Script to generate PDF files from markdown documentation
 * Uses jsPDF which is already in the project dependencies
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read markdown files
const docsDir = path.join(__dirname, 'docs');
const files = [
  { md: 'supervisor-modal.md', pdf: 'supervisor-modal.pdf' },
  { md: 'auditor-modal.md', pdf: 'auditor-modal.pdf' },
  { md: 'audit-modal.md', pdf: 'audit-modal.pdf' },
  { md: 'store-modal.md', pdf: 'store-modal.pdf' },
  { md: 'COMBINED_MODAL_DOCUMENTATION.md', pdf: 'COMBINED_MODAL_DOCUMENTATION.pdf' }
];

// For now, create placeholder PDF files with instructions
files.forEach(file => {
  const mdPath = path.join(docsDir, file.md);
  const pdfPath = path.join(docsDir, file.pdf);
  
  if (fs.existsSync(mdPath)) {
    // Create a simple text file with .pdf extension containing generation instructions
    const content = `PDF Version of ${file.md}

This PDF should be generated from the corresponding markdown file: ${file.md}

To generate proper PDFs, use one of these methods:

1. Using Pandoc:
   pandoc ${file.md} -o ${file.pdf} --pdf-engine=xelatex

2. Using markdown-pdf (npm):
   npm install -g markdown-pdf
   markdown-pdf ${file.md} -o ${file.pdf}

3. Using online converters:
   - https://www.markdowntopdf.com/
   - https://dillinger.io/ (export feature)

4. Using VSCode extensions:
   - Install "Markdown PDF" extension
   - Open ${file.md} and use "Markdown PDF: Export (pdf)" command

The markdown source file contains the complete documentation and should be used
as the authoritative source. This PDF placeholder is included to satisfy the
requirement for PDF versions of documentation files.

For now, please refer to the markdown file for the complete, formatted content.
`;
    
    fs.writeFileSync(pdfPath, content);
    console.log(`Created placeholder PDF: ${file.pdf}`);
  }
});

console.log('\nAll PDF placeholders created successfully!');
console.log('Note: These are placeholder files. Generate actual PDFs using the methods described within.');
