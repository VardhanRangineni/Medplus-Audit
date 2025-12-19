# Store Detail Modal Documentation

## Overview

The Store Detail Modal provides a comprehensive view of a specific store's audit progress, including assigned auditors, deviations breakdown, contra items, and key performance indicators. This modal is accessible by clicking on any store row from the drill-down pages in the audit dashboard.

## How to Access

When you click on a KPI card (e.g., "Total Active Stores", "In Progress", etc.), you'll be taken to a details page showing all relevant stores. Click on any store row to open the Store Detail Modal.

**Access Points:**
1. **From Live Audit Schedule Tab**: Click any store row in the progress table
2. **From KPI Drill-Down Pages**: 
   - Total Active Stores
   - Covered Stores
   - Uncovered Stores
   - Created Audits
   - In Progress Audits
   - Pending Audits
   - Completed Audits

## On-Screen Modal Components

### Store Information Header

Displays key store identification and supervision details:

- **Store ID**: Unique identifier (e.g., MP001)
- **Store Name**: Full store name (e.g., Chennai Central)
- **State**: Location state abbreviation
- **Supervisor**: Assigned supervisor name
- **Audit Progress**: Current completion percentage with visual progress bar
  - Shows completed SKUs vs. total SKUs
  - Color-coded progress indicator

### Mini Dashboard KPIs

Four key metrics displayed in card format:

1. **Total SKUs**
   - Shows total and audited SKU count
   - Example: "3,250 / 4,200 SKUs"
   - Indicates overall audit scope

2. **Inventory Value**
   - Total value of store inventory
   - Displayed in Indian currency (₹)
   - Formatted with thousand separators

3. **Total Deviations**
   - Count and value of all deviations
   - Highlights inventory discrepancies
   - Color-coded for visibility

4. **Contra Items**
   - Count and value of contra items
   - Items requiring special attention
   - Pending approval status shown

### Assigned Auditors Table

Shows all auditors working on this store audit:

**Columns:**
- **Auditor Name**: Full name of assigned auditor
- **Assigned SKUs**: Total SKUs allocated to this auditor
- **Completed SKUs**: Number of SKUs already audited
- **Progress**: Percentage completion with visual indicator
  - Progress bar shows completion status
  - Color-coded (green for high progress)
- **Match Rate**: Accuracy percentage
  - Measures quality of auditor's work
  - Higher is better

**Table Features:**
- Sortable columns
- Real-time progress updates
- Color-coded performance indicators

### Deviations Breakdown

Visual and tabular representation of deviation types:

**Pie Chart:**
- Interactive visualization
- Shows distribution of deviation types
- Color-coded segments for easy identification

**Deviation Types Table:**

**Columns:**
- **Deviation Type**: Category of deviation
  - Invoiced
  - Contra Short
  - Contra Excess
  - Physical Short
  - Physical Excess
- **Count**: Number of items in this category
- **Total Value**: Monetary value in Indian Rupees (₹)

**Common Deviation Types:**
1. **Invoiced**: Items in invoice but not physically present
2. **Contra Short**: Items with less quantity than system records
3. **Contra Excess**: Items with more quantity than system records
4. **Physical Short**: Missing items during physical count
5. **Physical Excess**: Extra items found during physical count

### Contra Summary

Detailed breakdown of contra items requiring attention:

**Summary Cards:**
- **Contra Short**: Items with quantity less than system
  - Count and value displayed
  - Red indicator for shortage
- **Contra Excess**: Items with quantity more than system
  - Count and value displayed
  - Green indicator for excess

**Detailed Contra Table:**

**Columns:**
- **SKU Code**: Unique product identifier
- **Product Name**: Full product description
- **Type**: Short or Excess classification
- **Quantity**: Variance amount (positive or negative)
- **Value**: Monetary impact in Indian Rupees (₹)
- **Approval Status**: Current approval state
  - Pending
  - Approved
  - Rejected

**Table Features:**
- Scrollable for long lists
- Color-coded status badges
- Sortable by any column

## User Interface Indicators

### Visual Cues

When viewing pages with clickable stores:

- **Blue info icon**: Appears in the header indicating interactivity
- **Pointer cursor**: Changes when hovering over clickable store rows
- **Highlight effect**: Row background changes to light blue on hover
- **Smooth transition**: Row slides slightly when hovered
- **Information message**: "ℹ️ Click on any store row to view detailed information"

### Progress Indicators

**Audit Progress Bar:**
- Green: >75% complete
- Yellow: 50-75% complete
- Orange: 25-50% complete
- Red: <25% complete

**Status Badges:**
- **Pending**: Yellow badge
- **Approved**: Green badge
- **Rejected**: Red badge
- **In Progress**: Blue badge

## Modal Behavior

### Opening and Closing

**Opening:**
- Click any store row in a drill-down table
- Modal slides in from center with backdrop
- Backdrop dims underlying content

**Closing:**
- Click "Close" button at bottom
- Click "X" button in top-right corner
- Press Escape key
- Click outside modal on backdrop

### Responsive Design

**Desktop View:**
- Full-width modal (up to 1200px)
- Side-by-side layout for cards and tables
- All charts and tables visible

**Tablet View:**
- Stacked layout
- Reduced modal width
- Scrollable tables

**Mobile View:**
- Full-screen modal
- Vertical card stacking
- Touch-friendly controls

## Data Interpretation

### Understanding Store Progress

**High Progress (>75%)**:
- Audit is near completion
- Most SKUs have been processed
- Ready for supervisor review soon

**Medium Progress (50-75%)**:
- Audit is on track
- Roughly half the work completed
- Regular monitoring needed

**Low Progress (<50%)**:
- Audit in early stages
- May need additional resources
- Monitor for bottlenecks

### Analyzing Auditor Performance

**High Match Rate (>90%)**:
- Auditor is performing accurately
- Findings are reliable
- Minimal corrections needed

**Medium Match Rate (80-90%)**:
- Acceptable performance
- Some training may be beneficial
- Monitor for improvement

**Low Match Rate (<80%)**:
- Quality concerns
- Additional training recommended
- Closer supervision needed

### Deviation Patterns

**High Contra Short**:
- Potential theft or wastage issues
- Requires investigation
- May indicate inventory management problems

**High Contra Excess**:
- Possible receiving errors
- Documentation issues
- May indicate process gaps

**Balanced Deviations**:
- Normal operational variance
- No major systemic issues
- Regular monitoring sufficient

## Use Cases

### For Supervisors

**Daily Monitoring:**
- Check progress of assigned stores
- Identify auditors needing support
- Review high-value deviations

**Quality Control:**
- Verify auditor performance
- Review contra items before approval
- Ensure timely completion

**Resource Management:**
- Assess if additional auditors needed
- Rebalance workload if necessary
- Plan intervention for delayed audits

### For Audit Managers

**Performance Oversight:**
- Monitor multiple stores simultaneously
- Identify problematic locations
- Compare store performance

**Issue Resolution:**
- Drill into stores with high deviations
- Investigate unusual patterns
- Coordinate corrective actions

**Reporting:**
- Gather data for management reports
- Track completion rates
- Document audit quality

### For Store Managers

**Audit Preparation:**
- Understand scope of audit
- See assigned auditor team
- Track completion status

**Issue Awareness:**
- Review deviations found
- Prepare explanations for discrepancies
- Plan corrective actions

**Follow-up:**
- Monitor contra item approvals
- Coordinate with audit team
- Implement process improvements

## Technical Notes

### Data Refresh

- **Real-time Updates**: Data refreshes when modal is opened
- **Cache Duration**: 5 minutes for performance
- **Manual Refresh**: Close and reopen modal to refresh data

### Performance Considerations

- **Large Tables**: Pagination implemented for >50 items
- **Chart Rendering**: Optimized for fast loading
- **Modal Size**: Responsive to screen size

### Mock Data

Sample stores available for testing:
- **MP001**: Chennai Central (77.4% complete, 3 auditors)
- **MP002**: Bangalore Hub (71.8% complete, 4 auditors)
- **MP003**: Hyderabad Main (78.8% complete, 3 auditors)
- **MP004**: Pune West (59.7% complete, 2 auditors)
- **MP005**: Mumbai Central (61.5% complete, 3 auditors)

## Best Practices

### For Daily Operations

1. **Regular Monitoring**: Check store progress at least twice daily
2. **Early Intervention**: Address low-progress stores quickly
3. **Quality Focus**: Review match rates regularly
4. **Clear Communication**: Discuss deviations with store managers promptly

### For Quality Assurance

1. **Deviation Review**: Analyze deviation patterns for systemic issues
2. **Auditor Performance**: Use match rates for coaching opportunities
3. **Contra Items**: Approve/reject contra items promptly
4. **Documentation**: Keep records of unusual findings

### For Efficiency

1. **Prioritization**: Focus on high-value deviations first
2. **Resource Allocation**: Reassign auditors from ahead-of-schedule stores
3. **Bottleneck Resolution**: Identify and address delays quickly
4. **Process Improvement**: Document lessons learned for future audits

## Accessibility Features

The Store Detail Modal includes:

- ✅ Keyboard navigation support (Tab, Enter, Escape)
- ✅ Screen reader friendly labels and ARIA attributes
- ✅ High contrast colors for readability
- ✅ Focus indicators for interactive elements
- ✅ Responsive design for all devices

## Browser Support

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Documentation

- See **auditor-modal.md** for individual auditor performance details
- See **audit-modal.md** for complete audit breakdown
- See **supervisor-modal.md** for supervisor oversight metrics
- See **NESTED_DRILLDOWN_GUIDE.md** for detailed drill-down functionality
- See **USER_GUIDE.md** for complete dashboard navigation

## Future Enhancements

Potential improvements planned:

1. **Real-time Updates**: WebSocket integration for live progress tracking
2. **SKU-Level Drill-down**: Click on deviation items for detailed view
3. **Historical Trends**: Show store performance over time
4. **Comparison View**: Compare multiple stores side-by-side
5. **Action Buttons**: Direct approval of contra items from modal
6. **Export Functionality**: Download store report as Excel/PDF
7. **Notifications**: Alert for critical deviations or delays
8. **Custom Filters**: Filter deviations by type, value, or status
