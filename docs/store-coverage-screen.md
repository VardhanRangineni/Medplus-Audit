# Store Coverage Screen

## When This Screen Appears

This is the default landing screen when users first access the audit dashboard. It appears when:
- User first logs into the system
- User clicks "Store Coverage" in the sidebar navigation
- User navigates to the home/root path of the application

![Store Coverage Screen](screenshots/store-coverage-main.png)
*Main Store Coverage dashboard showing all key metrics and visualizations*

## Complete UI Breakdown

### Export Summary Button
- **Label**: "Export Summary"
- **Type**: Green button with download icon
- **Location**: Top-right of main content area
- **Purpose**: Download a report of current dashboard data
- **What happens on click**: Generates and downloads a summary file (PDF or Excel) of visible metrics
- **Business purpose**: Enable offline review and sharing of audit coverage data

### Total Stores KPI Card
- **Title**: "Total Stores"
- **Large Number**: "478"
- **Icon**: Blue store icon
- **Link**: "Click for details" (in blue)
- **Purpose**: Shows the complete count of stores in the system
- **What the number represents**: Total number of pharmacy stores in the network
- **What happens on click**: Navigates to a detailed table listing all stores with their information
- **Business purpose**: Provides quick visibility of network size and scope

### Covered Stores KPI Card
- **Title**: "Covered Stores"
- **Large Number**: "418"
- **Percentage**: "87.4% of total"
- **Icon**: Green checkmark icon
- **Link**: "Click for details" (in blue)
- **Purpose**: Shows how many stores have been audited
- **What the number represents**: Count of stores that have completed at least one audit
- **What happens on click**: Displays detailed list of all audited stores with audit dates and status
- **Business purpose**: Track audit coverage to ensure compliance across the network

### Uncovered Stores KPI Card
- **Title**: "Uncovered Stores"
- **Large Number**: "60"
- **Percentage**: "12.6% of total"
- **Icon**: Red warning triangle icon
- **Link**: "Click for details" (in blue)
- **Purpose**: Highlights stores that have never been audited
- **What the number represents**: Count of stores without any audit history
- **What happens on click**: Shows list of stores needing audit assignment
- **Warning state**: Red color indicates attention needed
- **Business purpose**: Identify gaps in audit coverage to maintain compliance

### Store Recency Analysis Chart
- **Title**: "Store Recency Analysis"
- **Subtitle**: "Breakdown of covered stores by days since last audit"
- **Chart Type**: Horizontal bar chart
- **Time Period Buttons**:
  - Quarterly (active by default)
  - Half-Yearly
  - Yearly
- **Export Button**: Green button to download chart data
- **Y-Axis Labels**: Quarter names (Jan-Mar, Apr-Jun, Jul-Sep, Oct-Dec)
- **X-Axis**: Number scale (0, 30, 60, 90, 120)
- **Blue Bars**: Show count of stores audited in each quarter
- **Purpose**: Visualize when stores were last audited
- **What happens when clicking period buttons**: Chart recalculates to show data grouped by selected time period
- **What happens on Export click**: Downloads chart data as file
- **Business purpose**: Identify stores that haven't been audited recently and may need scheduling

### Inventory Metrics Section

#### Total SKUs Card
- **Title**: "Total SKUs"
- **Large Number**: "1,729,130"
- **Subtitle**: "Across all covered stores"
- **Icon**: Box/package icon
- **Purpose**: Shows total count of Stock Keeping Units
- **What it represents**: Total number of unique product items across all audited stores
- **Business purpose**: Understand the scope and complexity of inventory being audited

#### Total Quantity Card
- **Title**: "Total Quantity"
- **Large Number**: "7.4Cr" (7.4 Crores = 74 million units)
- **Subtitle**: "Units in inventory"
- **Icon**: Stack icon
- **Purpose**: Shows total unit count of all products
- **What it represents**: Sum of all individual product units in inventory
- **Business purpose**: Track inventory volume for operational planning

#### Total Inventory Value Card
- **Title**: "Total Inventory Value"
- **Large Number**: "₹11769.22L" (₹117.69 Crores)
- **Subtitle**: "Aggregate value"
- **Icon**: Currency icon
- **Purpose**: Shows total monetary value of inventory
- **What it represents**: Sum of MRP value of all products in stock
- **Business purpose**: Understand financial exposure and inventory investment

### Deviation Distribution Pie Chart
- **Title**: "Deviation Distribution"
- **Subtitle**: "Click on segments for details"
- **Chart Type**: Pie chart with four segments
- **Legend Items**:
  - Invoiced: ₹5707K (yellow)
  - Contra Short: ₹6034K (red/orange)
  - Contra Excess: ₹5714K (green)
  - Excess Submitted: ₹6397K (blue)
- **Interactive**: Segments are clickable
- **Purpose**: Show breakdown of inventory discrepancies by type
- **What happens on segment click**: Shows detailed breakdown of that specific deviation type
- **Business purpose**: Identify patterns in inventory discrepancies for process improvement

### Deviation Summary Section
- **Title**: "Deviation Summary"
- **Subtitle**: "Click on a pie segment for details"
- **Export Button**: Allows downloading deviation data

#### Overall Product Form Distribution
- **Subtitle**: "Across all deviation types"
- **Left Side**: Pie chart showing product form distribution
- **Right Side**: Detailed list of product categories with:
  - Product form name (Injection, Liquids, General, etc.)
  - Value amount (e.g., ₹2,647,772)
  - Item count (e.g., 5480 items)
- **Ten Categories Listed**:
  1. Injection - ₹2,647,772 - 5480 items
  2. Liquids - ₹2,612,180 - 6010 items
  3. General - ₹2,509,308 - 5362 items
  4. Inhalers - ₹2,439,249 - 5476 items
  5. Containers - ₹2,420,339 - 5627 items
  6. Ointments - ₹2,331,716 - 4986 items
  7. Powders - ₹2,288,196 - 5392 items
  8. Surgicals - ₹2,273,320 - 4891 items
  9. Drops - ₹2,194,744 - 5088 items
  10. Tablets - ₹2,135,633 - 4590 items
- **Bottom Message**: "Click on any deviation segment to see specific breakdown"
- **Purpose**: Show which product types have the most deviations
- **Business purpose**: Focus correction efforts on product categories with highest discrepancy rates

## Interaction Behavior

### KPI Card Click Flow
1. User clicks "Click for details" on any KPI card
2. System navigates to Store Details page
3. Page shows filtered table based on clicked metric
4. Back button available to return to dashboard

### Chart Period Selection
1. User clicks Quarterly, Half-Yearly, or Yearly button
2. Selected button highlights in blue
3. Chart redraws with new time grouping
4. Data recalculates for selected period

### Export Actions
1. User clicks Export button
2. System generates report file
3. File downloads to user's device
4. Contains current filtered data in spreadsheet or PDF format

### Deviation Chart Interaction
1. User clicks on pie chart segment
2. Right panel updates to show breakdown for that deviation type
3. Product form list filters to show only items in that category
4. User can click different segments to see other breakdowns

## Purpose of Every Action

### Coverage Tracking
- **Operational purpose**: Monitor which stores have and haven't been audited
- **Decision support**: Prioritize stores for upcoming audit scheduling
- **Compliance**: Ensure all stores meet regulatory audit requirements

### Recency Analysis
- **Operational purpose**: Identify stores with outdated audits
- **Decision support**: Plan audit cycles to maintain freshness of data
- **Quality control**: Ensure regular audit cadence across the network

### Inventory Metrics
- **Operational purpose**: Understand scale of inventory being managed
- **Decision support**: Allocate auditor resources based on inventory complexity
- **Financial oversight**: Track value of inventory under management

### Deviation Analysis
- **Operational purpose**: Identify where inventory records don't match physical stock
- **Decision support**: Focus process improvement on highest-impact deviation types
- **Loss prevention**: Detect patterns that may indicate theft or process failures
- **Training needs**: Identify product types requiring additional staff training
