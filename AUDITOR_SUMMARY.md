# Auditor Summary Documentation

## Overview

The Auditor Summary provides a detailed performance view of an individual auditor's productivity, accuracy, and quality metrics across all assigned audits. This summary is accessible by clicking on any auditor row from the "Auditor Performance & Productivity" tab in the audit dashboard.

## How to Access

1. Navigate to the **Auditor Performance & Productivity** tab (3rd tab in the dashboard)
2. Locate the auditor in the productivity summary table
3. Click on any row in the auditor table to open the detailed summary modal

## On-Screen Summary Components

### Header Section

**Auditor Information:**
- **Auditor Name**: Display name of the auditor
- **Auditor ID**: Unique identifier (e.g., A039)
- **Download Report Button**: Dropdown menu with Excel and PDF export options
- **Date Range Filters**: 
  - "From" date picker (default: 1 year ago)
  - "To" date picker (default: today)
  - Date range cannot exceed 1 year
  - Validation prevents "From" date being after "To" date

### Key Performance Metrics (Top Cards)

Three primary KPI cards displaying:

1. **Total Audits**
   - Count of audits the auditor participated in within the selected date range
   - Displayed with a gradient blue background
   - Icon: Clipboard list

2. **Total PIDs**
   - Aggregate count of Product IDs/Batch IDs assigned to the auditor
   - Formatted with Indian number notation (e.g., "36,389" or "1.5 L" for lakhs)

3. **Total SKUs**
   - Total Stock Keeping Units assigned to the auditor
   - Formatted with Indian number notation (e.g., "1.69 L" for 1.69 lakhs)

### Deviation Summary Section

Displays aggregated deviation metrics across all audits performed by the auditor:

**Appeared Deviations (Blue Border)**
- Quantity: Total count of items with appeared deviations found by this auditor
- Value: Monetary value of appeared deviations (₹)

**Matched Deviations (Green Border)**
- Quantity: Items where auditor's findings were confirmed as correct during re-audit
- Value: Monetary value of matched deviations (₹)
- **Higher is better** - indicates accurate auditing

**Revised Deviations (Yellow Border)**
- Quantity: Items that required correction after auditor's initial submission
- Value: Monetary value of revised deviations (₹)
- **Lower is better** - indicates better quality work

### Audit History Table

Comprehensive table of all audits performed by the auditor, featuring:

**Columns:**
- **Audit ID**: Unique audit identifier (clickable for drill-down)
- **Store**: Store name where audit was conducted
- **Date**: Audit start date (DD/MM/YYYY format)
- **Job Type**: Type of audit (Full Audit, Select SKUs, Partial Audit)
- **PIDs**: Number of product IDs assigned to this auditor in this audit
- **SKUs**: Number of stock keeping units assigned
- **QTY**: Quantity of items audited by this auditor
- **Audited Value**: Total value audited by this auditor in Indian Rupees (₹)

**Table Features:**
- **Sorting**: Click column headers to sort (default: most recent first)
- **Pagination**: Navigate through multiple pages of audit history
- **Row Click**: Click any audit row to open detailed audit-specific summary
- **Sticky Header**: Column headers remain visible while scrolling

## Download Functionality

### Accessing Downloads

Click the **"Download Report"** button in the modal header to reveal two export options:

### Excel Export

**File Name Format**: `Auditor_{AuditorName}_metrics.xlsx`  
(e.g., `Auditor_Srikanth_Rao_metrics.xlsx`)

**Sheet 1: Summary**
- **Report Metadata**:
  - Auditor Name and ID
  - Generated On (timestamp)
  - Period (date range)
- **Performance Metrics**:
  - Total Audits
  - Total PIDs
  - Total SKUs
- **Status Breakdown**:
  - Completed count
  - In-Progress count
  - Pending count
  - Created count
- **Deviation Summary** (with Qty and Value):
  - Appeared
  - Matched
  - Revised
  - In-Progress

**Sheet 2: Audit Details**
- Complete list of all audits with:
  - Audit ID
  - Store Name
  - Date (DD/MM/YYYY)
  - Job Type
  - Allocated PIDs
  - Allocated SKUs
  - Quantity
  - Audited Value (₹)

**Excel Features:**
- Pre-formatted column widths for optimal readability
- Separate sheets for summary and detail views
- All numeric values properly formatted with thousand separators

### PDF Export

**File Name Format**: `Auditor_{AuditorName}_Report_{Date}.pdf`  
(e.g., `Auditor_Srikanth_Rao_Report_2025-12-18.pdf`)

**Document Structure:**

1. **Header Section**:
   - Report title: "Auditor Performance Report"
   - Generated timestamp
   - Auditor name and ID
   - Period covered

2. **Performance Metrics Table**:
   - Total Audits
   - Total PIDs (with comma separators)
   - Total SKUs (with comma separators)
   - Completed Audits count
   - In-Progress Audits count
   - Striped theme with blue headers

3. **Deviation Summary Table**:
   - Three rows: Appeared, Matched, Revised
   - Columns: Deviation Stage, Qty, Value (Rs.)
   - All values formatted with Indian number notation
   - Grid theme with orange headers

4. **Audit Details Table**:
   - All audits performed by the auditor
   - 8 columns: Audit ID, Store, Date, Job Type, PIDs, SKUs, Qty, Audited Value
   - Plain theme with smaller font (8pt) to fit more data
   - Dark gray headers with white text

**PDF Features:**
- Professional formatting with color-coded tables
- Automatic page breaks for long audit lists
- Consistent Indian currency formatting throughout

## Performance Indicators

### Key Metrics Explained

**Average Time per PID (Product ID)**
- Measures efficiency: How long it takes to audit each product batch
- **Lower is better** - indicates faster processing
- Benchmark: <10 minutes is good performance

**Average Time per SKU (Stock Keeping Unit)**
- Measures item-level efficiency
- **Lower is better** - indicates faster item processing
- Benchmark: <5 minutes is good performance

**Match Rate**
- Percentage of auditor's findings that match during re-audit
- **Higher is better** - indicates accuracy
- Benchmark: ≥90.5% is acceptable, ≥91% is excellent

**Edit Rate**
- Percentage of entries that required correction
- **Lower is better** - indicates higher quality work
- Benchmark: ≤10% is good

## Use Cases

### When to View Auditor Summary

**Performance Reviews:**
- Monthly or quarterly auditor evaluations
- Identify top performers for recognition
- Identify underperformers for coaching

**Workload Assessment:**
- Check if auditor is over/under-utilized
- Verify fair distribution of work
- Plan resource allocation

**Quality Monitoring:**
- Track match and edit rates over time
- Identify patterns in deviation types
- Assess training effectiveness

**Capacity Planning:**
- Understand auditor throughput
- Forecast completion times for new audits
- Balance team workload

### When to Download

**For HR/Management:**
- Performance review documentation
- Bonus/promotion decisions
- Annual reviews

**For Training:**
- Identify specific areas needing improvement
- Create targeted training programs
- Track improvement over time

**For Audit Planning:**
- Historical performance data for resource planning
- Workload distribution analysis
- Efficiency benchmarking

**For Compliance:**
- Maintain audit trail documentation
- Regulatory reporting
- Quality assurance records

## Data Interpretation

### Understanding Deviation Patterns

**High Appeared, High Matched**: Auditor is finding legitimate issues - good performance

**High Appeared, Low Matched**: Auditor may be over-reporting issues - needs training

**Low Appeared, High Matched**: Auditor is accurate but may be missing some issues - needs attention

**Low Appeared, Low Matched**: May indicate either very clean stores or under-reporting - investigate

### Status Indicators

- **Completed**: Audits fully finalized and approved
- **In-Progress**: Currently working on these audits
- **Pending**: Work done, awaiting supervisor review
- **Created**: Assigned but not yet started

## Technical Notes

### Date Filtering Behavior

- **Default Range**: Last 1 year from current date
- **Maximum Range**: 1 year (365 days)
- **Validation**: 
  - Warning displayed if invalid range selected
  - "From Date cannot be after To Date"
  - "Interval can't be more than 1 year"
- **Auto-Revert**: Returns to last valid range after 2 seconds
- **Time Handling**: 
  - "From" date: Set to 00:00:00
  - "To" date: Set to 23:59:59

### Data Aggregation

- **Unique Audits**: Counted by distinct audit participation records
- **Sums**: All PIDs, SKUs, quantities, and values are summed across selected date range
- **Averages**: Time metrics are calculated from underlying time tracking data

### Sorting Options

Default sort in audit history table:
- **Primary**: By Audit Start Date (most recent first)
- **Alternative**: Click any column header to sort by that column
- **Toggle**: Click again to reverse sort direction

## Best Practices

### For Audit Managers

1. **Regular Monitoring**: Review auditor summaries weekly to catch issues early
2. **Comparative Analysis**: Compare multiple auditors to identify best practices
3. **Training Focus**: Use match and edit rates to target training efforts
4. **Recognition**: Download and archive reports for top performers
5. **Fair Assignment**: Use productivity metrics to balance workload

### For Supervisors

1. **Performance Coaching**: Use metrics to provide specific, data-driven feedback
2. **Quality Checks**: Monitor match rates closely for accuracy issues
3. **Efficiency Goals**: Set realistic time targets based on historical data
4. **Early Intervention**: Address declining performance trends quickly

### For Auditors (Self-Review)

1. **Track Progress**: Compare your current metrics to previous periods
2. **Quality Focus**: Prioritize accuracy (match rate) over speed
3. **Continuous Improvement**: Identify your weakest areas and improve
4. **Time Management**: Monitor your average time metrics to optimize workflow

## Common Questions

**Q: Why doesn't my download include all audits from the table?**  
A: The download respects the date filter applied. Adjust the date range to include more audits.

**Q: What does "Audited Value" represent?**  
A: The total monetary value of inventory items you audited (based on item prices × quantities).

**Q: How is "Match Rate" calculated?**  
A: (Number of your entries that matched during re-audit) ÷ (Total entries re-audited) × 100

**Q: Can I see PID-level details?**  
A: Yes, this information is available in the main Auditor Performance tab table (not in this summary modal).

## Related Documentation

- See **SUPERVISOR_SUMMARY.md** for supervisor oversight metrics
- See **AUDIT_SPECIFIC_SUMMARY.md** for individual audit breakdowns
- See **USER_GUIDE.md** (Tab 3 section) for complete auditor performance workflows
- See **FUNCTIONAL_SPECIFICATION.md** (Section 3.4) for technical details on auditor metrics
