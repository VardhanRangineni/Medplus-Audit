# Audit Details Modal Documentation

## Overview

The Audit-Specific Summary provides a comprehensive breakdown of a single audit, including store details, re-audit metrics, and participating auditor performance. This summary is accessible by clicking on any audit row from various locations in the dashboard, including the audit history tables in Supervisor and Auditor summaries.

## How to Access

Multiple access points in the dashboard:

1. **From Supervisor Summary**: Click any audit row in the "Audit History" table
2. **From Auditor Summary**: Click any audit row in the "Audit History" table
3. **From Live Audit Schedule Tab**: Click any store/audit row in the progress table

## On-Screen Summary Components

### Header Section (Hero Card)

**Audit Identification:**
- **Audit ID**: Unique audit identifier displayed prominently
- **Audit Job Type**: Type of audit (Full Audit, Select SKUs, Partial Audit)
- **Large Purple Icon**: Visual indicator (file-invoice icon)
- **Export Button**: Dropdown menu for Excel and PDF downloads

**Store and Timeline Information:**
- **Store Icon**: Store name with location indicator
- **Calendar Icons**: 
  - **Start Date**: When the audit began (with green calendar icon)
  - **End Date**: When the audit completed (with dark green check icon)
- **Total Value**: Prominently displayed in large green text
  - Shows the total inventory value for this audit
  - Formatted in Indian currency notation (₹ with L/Cr suffixes)

### Re-Audit Summary Section

Displays the audit verification and correction workflow:

**Section Header**: "Re-Audit Summary" with decorative purple gradient bar

**Summary Table** (3 rows):

1. **Appeared**
   - Badge: Blue pill indicator
   - Meaning: Items initially identified with deviations during the audit
   - Columns: Qty (quantity) and Value (₹)

2. **Matched**
   - Badge: Green pill indicator
   - Meaning: Appeared items that were verified and confirmed as correct
   - Columns: Qty and Value (₹)
   - **Higher is better** - indicates accurate initial audit

3. **Deviations**
   - Badge: Yellow pill indicator
   - Meaning: Items that required corrections after verification
   - Columns: Qty and Value (₹)
   - **Lower is better** - indicates quality initial audit

**Table Styling:**
- Light gray header background
- Clean, modern design with color-coded badges
- Values displayed in bold for emphasis
- Monetary values in green text

### Participating Auditors Section

**Section Header**: "Participating Auditors" with green gradient bar and count badge

**Auditors Table:**

**Columns:**
- **ID**: Auditor ID badge (e.g., A039) with chevron icon
- **Auditor Name**: Displayed in purple/blue accent color
- **PIDs**: Product IDs assigned to this auditor
- **SKUs**: Stock Keeping Units assigned
- **Qty**: Quantity of items this auditor worked on
- **Audited Value**: Monetary value audited by this auditor (₹)

**Interactive Features:**
- **Expandable Rows**: Click any auditor row to expand/collapse
- **Chevron Icons**: 
  - Right-pointing when collapsed
  - Down-pointing when expanded
- **Row Highlighting**: Background changes to light gray when row is selected

**Expanded Auditor View:**

When you click an auditor row, an expandable section reveals:

**Mini Re-Audit Summary for This Auditor**

A nested table showing this specific auditor's performance:

**Header**: "Re-Audit Summary" with purple gradient bar (smaller version)

**Three Rows:**
1. **Appeared** (Blue badge)
   - Qty and Value specific to this auditor's work
2. **Matched** (Green badge)
   - Qty and Value for this auditor's accurate findings
3. **Deviations** (Yellow badge)
   - Qty and Value for this auditor's items needing correction

**Styling:**
- Light blue/gray background for expanded section
- Smaller font size for nested content
- White row backgrounds for contrast
- Max-width table (400px) for optimal readability

## Download Functionality

### Accessing Downloads

Click the **"Export"** button in the modal header (located in the purple header section) to reveal two export options.

### Excel Export

**File Name Format**: `Audit_{AuditID}_Report.xlsx`  
(e.g., `Audit_AUD00691_Report.xlsx`)

**Sheet 1: Audit Summary**
- **Audit Information**:
  - Audit ID
  - Store Name
  - Total Value (₹)
  - Start Date
  - End Date (if completed)
  - Status
- **Re-Audit Category Table**:
  - Three rows: Appeared, Matched, Deviations
  - Columns: Category name, Qty, Value

**Sheet 2: Participating Auditors**
- Complete list of all auditors who worked on this audit:
  - ID (Auditor ID)
  - Auditor Name
  - PIDs assigned
  - SKUs assigned
  - Qty audited
  - Audited Value (₹)

**Excel Features:**
- Pre-formatted column widths for readability
- Separate sheets for different data categories
- Clean, professional layout
- All monetary values properly formatted

### PDF Export

**File Name Format**: `Audit_{AuditID}_Report.pdf`  
(e.g., `Audit_AUD00691_Report.pdf`)

**Document Structure:**

1. **Title Section**:
   - "Audit Details: {AUDIT_ID}"
   - Store name
   - Total Value with currency formatting
   - Start Date and End Date (if audit is completed)

2. **Re-Audit Summary Table**:
   - Header: "Re-Audit Category", "Qty", "Value (Rs.)"
   - Three rows: Appeared, Matched, Deviations
   - Grid theme with blue headers (color: [41, 128, 185])
   - All values formatted with Indian number notation

3. **Participating Auditors Table**:
   - Header: "ID", "Auditor Name", "PIDs", "SKUs", "Qty", "Audited Value (Rs.)"
   - Complete list of all participating auditors
   - Striped rows for readability
   - Dark gray headers (color: [52, 73, 94])
   - All numeric values formatted with thousand separators

**PDF Features:**
- Professional grid and striped table themes
- Color-coded headers for visual organization
- Automatic page breaks for long auditor lists
- Consistent currency formatting throughout

## Data Interpretation

### Understanding Re-Audit Metrics

**Formula**: Appeared = Matched + Deviations

**What "Appeared" Means:**
- These are items that initially showed discrepancies between system records and physical inventory
- Could be shortages, excesses, or data entry errors
- Represents items flagged during the initial audit for review

**What "Matched" Means:**
- Items from "Appeared" that were verified and confirmed to be correct
- The original deviation was valid and should be recorded
- High match rates indicate accurate initial audits

**What "Deviations" Means:**
- Items from "Appeared" that required corrections
- The original audit finding was inaccurate and needed revision
- Lower deviation rates indicate better audit quality

### Interpreting Auditor Performance

**High PIDs/SKUs with Low Deviations**: Excellent performer handling large workload accurately

**Low PIDs/SKUs with High Deviations**: Quality concerns despite small workload

**Consistent Match Rates Across Auditors**: Well-trained team with standardized processes

**Varying Match Rates**: May indicate need for additional training for some auditors

## Use Cases

### When to View Audit-Specific Summary

**Audit Verification:**
- Review outcomes after audit completion
- Verify all auditors completed their assignments
- Check for data quality issues

**Issue Investigation:**
- Drill down into specific problem audits
- Identify which auditor contributed to issues
- Understand deviation patterns for this store

**Performance Analysis:**
- Compare auditor performance within same audit
- Identify consistently strong/weak performers
- Assess team coordination

**Store Analysis:**
- Understand inventory accuracy at this store
- Identify patterns of specific deviation types
- Plan corrective actions

### When to Download

**For Store Management:**
- Share audit results with store managers
- Provide evidence for inventory discrepancies
- Document findings for follow-up actions

**For Finance Team:**
- High-value deviation documentation
- Inventory value reconciliation
- Financial reporting backup

**For Audit Trail:**
- Compliance documentation
- Historical audit records
- Quality assurance evidence

**For Analysis:**
- Import into BI tools
- Create custom reports
- Trend analysis across multiple audits

## Technical Notes

### Data Aggregation

**Store-Level Totals**:
- Audit value is the full store audit value
- Re-audit summaries are aggregated across all participating auditors

**Auditor-Level Details**:
- Each auditor row shows only their assigned portion
- PIDs, SKUs, and values are specific to that auditor's work
- Re-audit metrics in expanded view are auditor-specific

### Modal Behavior

**Nested Modals:**
- This modal can open from another modal (e.g., from Supervisor or Auditor summary)
- Proper z-index management ensures correct stacking
- Backdrop dims underlying modals

**Expandable Rows:**
- Only one auditor row can be expanded at a time
- Click same row again to collapse
- State is maintained while modal is open but resets on close

### Styling Features

**Gradient Accents:**
- Purple gradient (667eea → 764ba2) for main header
- Green gradient (10b981 → 059669) for auditor section
- Visual consistency with other summaries

**Color Coding:**
- Blue (#0d6efd) for "Appeared" - informational
- Green (#198754) for "Matched" - success/positive
- Yellow (#d97706) for "Deviations" - warning/needs attention

## Best Practices

### For Audit Managers

1. **Spot Checks**: Regularly review random audits to ensure quality
2. **Pattern Recognition**: Look for stores with consistently high deviations
3. **Team Balance**: Ensure even distribution of auditors across audits
4. **Documentation**: Download reports for audits with significant findings

### For Supervisors

1. **Pre-Approval Review**: Check audit summary before final approval
2. **Auditor Feedback**: Use individual auditor metrics for coaching
3. **Quality Gates**: Set deviation thresholds that trigger additional review
4. **Timely Resolution**: Address high-deviation audits quickly

### For Store Managers

1. **Root Cause Analysis**: Use deviation data to identify systemic issues
2. **Process Improvement**: Address patterns causing repeated deviations
3. **Staff Training**: Train store staff on accurate inventory management
4. **Documentation**: Keep downloaded reports for reference and trend analysis

## Common Questions

**Q: Why are there multiple auditors for one audit?**  
A: Large audits are divided among multiple auditors to complete efficiently. Each auditor is assigned specific PIDs/SKUs.

**Q: What if Matched + Deviations ≠ Appeared?**  
A: There may be items still "Pending" review that aren't shown in this summary. This summary shows only finalized items.

**Q: Can I see SKU-level details?**  
A: The current summary shows auditor-level aggregates. SKU-level details are available through other drill-down options in the dashboard.

**Q: Why do auditor totals not add up to store total?**  
A: Some metrics (like total audit value) represent the full store value, not the sum of auditor portions. Check column headers for context.

**Q: How do I see which specific items were deviations?**  
A: This summary shows aggregated metrics. Detailed item lists would need to be accessed through the operational audit system or raw data exports.

## Related Documentation

- See **supervisor-modal.md** for supervisor oversight context
- See **auditor-modal.md** for individual auditor performance tracking
- See **store-modal.md** for store-level details
- See **USER_GUIDE.md** for complete dashboard navigation
