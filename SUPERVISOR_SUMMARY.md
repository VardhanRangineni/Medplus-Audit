# Supervisor Summary Documentation

## Overview

The Supervisor Summary provides a comprehensive view of a supervisor's audit oversight activities, performance metrics, and workload. This summary is accessible by clicking on any supervisor card from the "Supervisor Approvals & Workload" tab in the audit dashboard.

## How to Access

1. Navigate to the **Supervisor Approvals & Workload** tab (4th tab in the dashboard)
2. Locate the supervisor card you want to review
3. Click on the supervisor card to open the detailed summary modal

## On-Screen Summary Components

### Header Section

**Supervisor Information:**
- **Supervisor Name**: Display name of the supervisor
- **Supervisor ID**: Unique identifier (e.g., SUP001)
- **Download Report Button**: Dropdown menu with Excel and PDF export options
- **Date Range Filters**: 
  - "From" date picker (default: 1 year ago)
  - "To" date picker (default: today)
  - Date range cannot exceed 1 year
  - Validation prevents "From" date being after "To" date

### Key Performance Metrics (Top Cards)

Four primary KPI cards displaying:

1. **Total Audits**
   - Count of unique audits supervised within the selected date range
   - Displayed with a gradient blue background
   - Icon: Clipboard list

2. **Days Supervised**
   - Number of distinct days the supervisor was actively overseeing audits
   - Calculated from day-wise summary data

3. **Total PIDs**
   - Aggregate count of Product IDs/Batch IDs across all supervised audits
   - Formatted with Indian number notation (e.g., "1.5 L" for lakhs, "2.3 Cr" for crores)

4. **Total SKUs**
   - Total Stock Keeping Units supervised
   - Formatted with Indian number notation

### Deviation Summary Section

Displays aggregated deviation metrics across all supervised audits:

**Appeared Deviations (Blue Border)**
- Quantity: Total count of items with appeared deviations
- Value: Monetary value of appeared deviations (₹)

**Matched Deviations (Green Border)**
- Quantity: Items where initial deviation was confirmed as correct
- Value: Monetary value of matched deviations (₹)

**Revised Deviations (Yellow Border)**
- Quantity: Items that required correction by supervisor
- Value: Monetary value of revised deviations (₹)

### Audit History Table

Comprehensive table of all audits supervised, featuring:

**Columns:**
- **Audit ID**: Unique audit identifier (clickable for drill-down)
- **Store**: Store name where audit was conducted
- **Date**: Audit start date (DD/MM/YYYY format)
- **Job Type**: Type of audit (Full Audit, Select SKUs, Partial Audit)
- **PIDs**: Number of product IDs in the audit
- **SKUs**: Number of stock keeping units
- **QTY**: Quantity of items audited
- **Value**: Total audited value in Indian Rupees (₹)

**Table Features:**
- **Sorting**: Click column headers to sort ascending/descending
- **Pagination**: Navigate through multiple pages of audit history
- **Row Click**: Click any audit row to open detailed audit-specific summary
- **Sticky Header**: Column headers remain visible while scrolling

## Download Functionality

### Accessing Downloads

Click the **"Download Report"** button in the modal header to reveal two export options:

### Excel Export

**File Name Format**: `Supervisor_{SupervisorID}_Report.xlsx`

**Sheet 1: Supervisor Summary**
- Supervisor Name and ID
- Date Range applied
- Metrics Summary:
  - Total Audits
  - Days Supervised
  - Total PIDs
  - Total SKUs
- Status Breakdown (Completed, In-Progress, Pending/Created counts)
- Deviation Summary with Qty and Value for:
  - Appeared
  - Matched
  - Revised

**Sheet 2: Audit History**
- Complete list of all supervised audits with:
  - Audit ID
  - Store Name
  - Date
  - Job Type
  - PIDs
  - SKUs
  - Quantity
  - Value (Rs.)

**Excel Features:**
- Pre-formatted column widths for optimal readability
- Separate sheets for easy navigation
- All numeric values properly formatted

### PDF Export

**File Name Format**: `Supervisor_{SupervisorID}_Report.pdf`

**Document Structure:**
1. **Header Section**:
   - Report title with supervisor name
   - Supervisor ID
   - Date range

2. **Metrics Summary Table**:
   - Total Audits
   - Days Supervised
   - Total PIDs
   - Total SKUs
   - Completed count
   - In-Progress count

3. **Deviation Summary Table**:
   - Appeared, Matched, and Revised deviations
   - Both Qty and Value columns
   - Grid theme with color-coded headers

4. **Audit History Table**:
   - All supervised audits
   - 8 columns: Audit ID, Store, Date, Type, PIDs, SKUs, Qty, Value
   - Striped rows for readability

## Use Cases

### When to View Supervisor Summary

**Daily Monitoring:**
- Check supervisor workload and active audits
- Identify pending approvals

**Performance Review:**
- Evaluate supervisor efficiency over time periods
- Compare multiple supervisors' metrics

**Resource Planning:**
- Assess supervisor capacity
- Balance workload distribution

**Compliance Tracking:**
- Verify audit coverage
- Track deviation patterns

### When to Download

**For Sharing:**
- Send reports to management
- Share with finance team for high-value deviations

**For Record-Keeping:**
- Archive monthly supervisor performance
- Maintain compliance documentation

**For Analysis:**
- Import into BI tools for deeper analysis
- Create custom charts and visualizations

## Data Interpretation

### Understanding Deviation Metrics

**Appeared Deviations**: Initial discrepancies identified during audit. Higher values indicate significant inventory discrepancies that require attention.

**Matched Deviations**: Deviations that were verified and found to be correct. High match rates indicate accurate initial audits.

**Revised Deviations**: Items that required supervisor intervention and correction. Lower values indicate better auditor accuracy.

### Status Indicators

- **Completed**: Audits fully finalized
- **In-Progress**: Currently active audits
- **Pending**: Awaiting action or approval
- **Created**: Set up but not yet started

## Technical Notes

### Date Filtering Behavior

- **Default Range**: Last 1 year from current date
- **Maximum Range**: 1 year (365 days)
- **Validation**: Automatic warning if invalid range selected
- **Auto-Revert**: Returns to last valid range after 2 seconds if invalid selection
- **Time Handling**: 
  - "From" date: Set to 00:00:00 (start of day)
  - "To" date: Set to 23:59:59 (end of day)

### Data Aggregation

- **Unique Audits**: Counted by distinct AUDIT_ID
- **Sums**: PIDs, SKUs, quantities, and values are aggregated across all matching records
- **Dates**: Day-wise summaries are used to calculate "Days Supervised"

### Performance Considerations

- **Large Datasets**: Table pagination helps manage performance
- **Date Filtering**: Apply narrower date ranges for faster loading
- **Export Size**: Excel exports include full dataset (may be large for long time periods)

## Best Practices

### For Audit Managers

1. **Regular Reviews**: Check supervisor summaries weekly to identify trends
2. **Balanced Workload**: Use metrics to ensure even distribution of audits
3. **Training Needs**: High revision rates may indicate need for auditor training
4. **Timely Approvals**: Monitor pending/in-progress counts to prevent bottlenecks

### For Supervisors

1. **Self-Monitoring**: Review your own summary to track personal performance
2. **Prioritization**: Focus on high-value deviations first
3. **Documentation**: Download reports regularly for personal records
4. **Trend Analysis**: Compare month-over-month metrics to improve efficiency

## Related Documentation

- See **AUDITOR_SUMMARY.md** for detailed auditor performance metrics
- See **AUDIT_SPECIFIC_SUMMARY.md** for individual audit breakdowns
- See **USER_GUIDE.md** (Tab 4 section) for complete supervisor approval workflows
