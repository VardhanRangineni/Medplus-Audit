# Dashboard - Store Coverage Screen

## Table of Contents
- [When This Screen Appears](#when-this-screen-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Header Section](#header-section)
  - [Filter Bar](#filter-bar)
  - [Summary Cards Section](#summary-cards-section)
  - [Store Recency Analysis Chart](#store-recency-analysis-chart)
  - [Inventory Metrics Section](#inventory-metrics-section)
  - [Deviation Distribution Section](#deviation-distribution-section)
  - [Deviation Summary Section](#deviation-summary-section)
  - [Sidebar Navigation](#sidebar-navigation)
- [Interaction Behavior (Step-by-Step)](#interaction-behavior-step-by-step)
  - [Filter Interactions](#filter-interactions)
  - [Refresh Now Button](#refresh-now-button)
  - [Summary Cards Interactions](#summary-cards-interactions)
  - [Chart Interactions](#chart-interactions)
  - [Navigation Interactions](#navigation-interactions)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Filter Purpose](#filter-purpose)
  - [Card Click Purpose](#card-click-purpose)
  - [Chart Purpose](#chart-purpose)
  - [Navigation Purpose](#navigation-purpose)
- [Visual Documentation](#visual-documentation)


## When This Screen Appears

This screen appears immediately when the application loads. It is the home screen and primary landing page. Users arrive at this screen when:
- Opening the application for the first time
- Clicking the MedPlus logo in the sidebar
- Clicking the "Store Coverage" navigation item in the sidebar
- Clicking the "Back" button from any detail screen

## Complete UI Breakdown

### Header Section

**Application Title**
- Displays "Medplus Audit Dashboard" prominently at the top
- This title remains visible across all screens in the application

**Last Refreshed Indicator**
- Shows the timestamp when data was last updated
- Format: "Last Refreshed: [Date], [Time]"
- Example: "Last Refreshed: 19 Dec 2025, 05:03:46 am"
- Updates automatically when the Refresh Now button is clicked

**Refresh Now Button**
- Blue button with circular refresh icon
- Located next to the Last Refreshed indicator
- Purpose: Manually refreshes all dashboard data

### Filter Bar

The filter bar contains six dropdown fields arranged horizontally:

**Financial Year Dropdown** (marked with red asterisk indicating required)
- First filter on the left
- Options: 2025–26, 2024–25, 2023–24, 2022–23
- Default selection: Current financial year (2025–26)
- Purpose: Filters all data to show only information from the selected financial year

**State Dropdown**
- Second filter from left
- Default: "All States"
- Options: All States, Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, Kerala
- Purpose: Filters data to show stores and audits from specific states

**Store Dropdown**
- Third filter from left
- Default: "All Stores"
- Options: All Stores, Stock Hub, No Stock Hub, Regular
- Purpose: Filters by store type classification

**Audit Job Type Dropdown**
- Fourth filter from left
- Default: "All Types"
- Options: All Types, Full Audit, Select SKUs, Partial Audit
- Purpose: Filters by the type of audit being performed

**Process Type Dropdown**
- Fifth filter from left
- Default: "All Processes"
- Options: All Processes, Product Audit, Batch Audit
- Purpose: Filters by audit process methodology

**Audit Status Dropdown**
- Sixth filter from left (rightmost)
- Default: "All Statuses"
- Options: All Statuses, Created, In Progress, Pending, Completed
- Purpose: Filters by current status of audits

### Summary Cards Section

Three prominent cards display key metrics:

**Total Stores Card**
- Icon: Blue store/building icon in circular background
- Main number: Large number showing total store count (e.g., 478)
- Subtitle: "Active: [number] | Inactive: [number]"
- Interactive element: "Click for details" link at bottom
- Purpose: Shows total number of stores in the system

**Covered Stores Card**
- Icon: Green checkmark in circular background
- Main number: Number of stores with completed audits (e.g., 418)
- Subtitle: Percentage of total (e.g., "87.4% of total")
- Interactive element: "Click for details" link at bottom
- Purpose: Shows how many stores have been audited

**Uncovered Stores Card**
- Icon: Red warning triangle in circular background
- Main number: Number of stores without recent audits (e.g., 60)
- Subtitle: Percentage of total (e.g., "12.6% of total")
- Interactive element: "Click for details" link at bottom
- Purpose: Highlights stores requiring attention

### Store Recency Analysis Chart

**Chart Header**
- Title: "Store Recency Analysis" with calendar icon
- Description: "Breakdown of covered stores by days since last audit"

**Time Period Buttons**
- Three buttons arranged horizontally: Quarterly, Half-Yearly, Yearly
- Quarterly button is selected by default (shown in blue)
- Purpose: Changes the time grouping displayed in the chart

**Bar Chart**
- Displays vertical blue bars showing store counts
- X-axis: Time periods (e.g., "Jan - Mar", "Apr - Jun", "Jul - Sep", "Oct - Dec")
- Y-axis: Number of stores (scale from 0 to 120)
- Each bar represents stores audited in that time period
- Bars are uniform height when data is evenly distributed

### Inventory Metrics Section

Three cards displaying inventory statistics:

**Total SKUs Card**
- Label: "Total SKUs"
- Large number: Count of unique products (e.g., "1,729,130")
- Subtitle: "Across all covered stores"
- Purpose: Shows total product variety being tracked

**Total Quantity Card**
- Label: "Total Quantity"
- Large number: Total units (e.g., "7.4Cr" meaning 7.4 Crore or 74 million)
- Subtitle: "Units in inventory"
- Purpose: Shows total volume of products

**Total Inventory Value Card**
- Label: "Total Inventory Value"
- Large number: Monetary value (e.g., "₹11769.22L" meaning 117.69 Crore Rupees)
- Subtitle: "Aggregate value"
- Purpose: Shows total financial value of inventory

### Deviation Distribution Section

**Section Header**
- Title: "Deviation Distribution" with chart icon
- Subtitle: "Click on segments for details"

**Pie Chart**
- Displays a circular chart divided into colored segments
- Each segment represents a deviation type
- Clicking segments provides detailed breakdown

**Legend**
- Four items listed vertically with colored squares:
  - "Invoiced: ₹5707K" (with color indicator)
  - "Contra Short: ₹6034K" (with color indicator)
  - "Contra Excess: ₹5714K" (with color indicator)
  - "Excess Submitted: ₹6397K" (with color indicator)
- Purpose: Shows financial impact of different deviation categories

### Deviation Summary Section

**Section Header**
- Title: "Deviation Summary"
- Subtitle: "Click on a pie segment for details"

**Product Form Distribution Header**
- "Overall Product Form Distribution"
- Subtitle: "Across all deviation types"

**Pie Chart**
- Circular chart showing product form breakdown
- Multiple segments in different colors
- Each segment represents a product category

**Product Form List**
- Ten product categories listed vertically:
  1. Injection - ₹2,647,772 (5480 items)
  2. Liquids - ₹2,612,180 (6010 items)
  3. General - ₹2,509,308 (5362 items)
  4. Inhalers - ₹2,439,249 (5476 items)
  5. Containers - ₹2,420,339 (5627 items)
  6. Ointments - ₹2,331,716 (4986 items)
  7. Powders - ₹2,288,196 (5392 items)
  8. Surgicals - ₹2,273,320 (4891 items)
  9. Drops - ₹2,194,744 (5088 items)
  10. Tablets - ₹2,135,633 (4590 items)

**Footer Message**
- "Click on any deviation segment to see specific breakdown"
- Indicates interactive functionality

### Sidebar Navigation

**Logo Section**
- MedPlus logo at the top
- "Audit Dashboard" text below logo

**Navigation Items** (five main items)

1. **Store Coverage** (active by default)
   - Icon: Store/building icon
   - Main text: "Store Coverage"
   - Subtext: "Coverage & Inventory"
   - Highlighted in blue when active

2. **Live Audit**
   - Icon: Clipboard icon
   - Main text: "Live Audit"
   - Subtext: "Schedule & Progress"

3. **Auditor Performance**
   - Icon: Users icon
   - Main text: "Auditor Performance"
   - Subtext: "Productivity & Quality"

4. **Supervisor**
   - Icon: User with checkmark icon
   - Main text: "Supervisor"
   - Subtext: "Approvals & Workload"

5. **Store PID Allotment**
   - Icon: List icon
   - Main text: "Store PID Allotment"
   - Subtext: "Assign PIDs to Auditors"

**User Profile Section** (at bottom)
- User role: "HOD Admin"
- User name: "Audit Head"
- Icon: User profile circle

## Interaction Behavior (Step-by-Step)

### Filter Interactions

**When clicking any dropdown:**
1. The dropdown expands downward
2. Available options are displayed in a list
3. Current selection is highlighted

**When selecting an option:**
1. The dropdown closes
2. Selected value is displayed
3. All dashboard data refreshes automatically to reflect the new filter
4. All cards, charts, and numbers update immediately

**Filter combinations:**
- Multiple filters can be applied simultaneously
- Filters work together to narrow down data
- Example: Selecting "Karnataka" state + "Full Audit" type shows only full audits in Karnataka stores

### Refresh Now Button

**On click:**
1. Button briefly shows a loading animation
2. All data on the dashboard refreshes
3. "Last Refreshed" timestamp updates to current time
4. All numbers, charts, and graphs reload with latest data

**When data is updating:**
- The button may be temporarily disabled
- A spinning animation indicates loading is in progress

### Summary Cards Interactions

**Total Stores Card - On click:**
1. Screen transitions to Total Stores Details screen
2. Displays a detailed table of all stores
3. Shows store ID, name, location, status, and metrics for each store

**Covered Stores Card - On click:**
1. Screen transitions to Covered Stores Details screen
2. Shows only stores that have been audited
3. Includes audit dates and coverage information

**Uncovered Stores Card - On click:**
1. Screen transitions to Uncovered Stores Details screen
2. Displays stores requiring audit attention
3. Highlights time since last audit for each store

**Hover behavior on cards:**
- Card slightly lifts or shows shadow effect
- "Click for details" link may change color
- Cursor changes to pointer indicating clickability

### Chart Interactions

**Store Recency Analysis Time Period Buttons:**

**When clicking "Quarterly":**
- Button background turns blue
- Chart updates to show four quarters
- X-axis shows: Jan-Mar, Apr-Jun, Jul-Sep, Oct-Dec

**When clicking "Half-Yearly":**
- Button background turns blue
- Chart updates to show two half-year periods
- X-axis shows: First Half, Second Half

**When clicking "Yearly":**
- Button background turns blue
- Chart displays annual view
- Shows cumulative data for entire year

**Deviation Pie Chart Segments - On click:**
1. A drill-down modal or detail view appears
2. Shows specific stores or items contributing to that deviation type
3. Provides breakdown by store, product, or other relevant dimension

**Product Form Pie Chart Segments - On click:**
1. Modal displays detailed information for that product category
2. Shows which stores have deviations for that product form
3. Lists specific items and their deviation amounts

### Navigation Interactions

**Clicking any sidebar navigation item:**
1. Current screen fades or transitions
2. New screen loads
3. Navigation item highlights in blue
4. Previous item returns to default styling

**Clicking MedPlus logo:**
1. Returns to this Store Coverage dashboard screen
2. All filters remain as previously set
3. Data refreshes if updates are available

## Purpose of Every Action

### Filter Purpose

**Financial Year Filter:**
- Allows management to review historical performance
- Enables year-over-year comparisons
- Essential for annual reporting and planning
- Helps identify trends across multiple years

**State Filter:**
- Regional managers can focus on their territory
- Identifies state-specific performance patterns
- Helps allocate resources geographically
- Enables targeted interventions in specific regions

**Store Type Filter:**
- Different store types have different audit requirements
- Stock Hubs require more frequent audits due to higher volume
- Helps plan audit resources based on store complexity

**Audit Job Type Filter:**
- Full Audits are comprehensive and time-intensive
- Select SKUs target high-value or high-risk items
- Partial Audits address specific concerns
- Filtering helps track completion of different audit strategies

**Process Type Filter:**
- Product Audits verify physical inventory
- Batch Audits track manufacturing lots and expiry dates
- Different processes have different accuracy requirements

**Audit Status Filter:**
- "Created" shows scheduled but not started audits
- "In Progress" highlights ongoing work
- "Pending" indicates audits waiting for review
- "Completed" confirms finished work
- Enables workflow management and bottleneck identification

### Card Click Purpose

**Total Stores Click:**
- Provides complete store directory
- Allows verification of store master data
- Useful for validating store count accuracy

**Covered Stores Click:**
- Shows compliance with audit requirements
- Identifies which stores are meeting audit schedules
- Demonstrates audit coverage to stakeholders

**Uncovered Stores Click:**
- Highlights audit gaps requiring immediate attention
- Helps prioritize audit scheduling
- Critical for ensuring comprehensive audit coverage

### Chart Purpose

**Store Recency Analysis:**
- Shows audit frequency distribution over time
- Identifies periods with high or low audit activity
- Helps plan future audit schedules
- Reveals seasonal patterns in audit completion

**Time Period Toggle:**
- Quarterly view shows detailed seasonal patterns
- Half-yearly view simplifies comparison between halves of year
- Yearly view provides long-term trend overview

**Deviation Distribution Pie Chart:**
- Quantifies financial impact of different deviation types
- Invoiced deviations indicate billing discrepancies
- Contra deviations show inventory adjustment needs
- Excess submissions reveal overstocking issues

**Product Form Distribution:**
- Identifies which product categories have most deviations
- Helps focus quality control efforts
- Tablets, drops, injections each have different handling requirements
- Reveals if specific product forms are problematic

### Navigation Purpose

**Store Coverage (this screen):**
- Executive overview of entire audit program
- Starting point for investigating any area
- Shows overall health of inventory management

**Live Audit:**
- Real-time monitoring of ongoing audits
- Tracks auditor progress during workday
- Enables immediate intervention if problems arise

**Auditor Performance:**
- Evaluates individual auditor productivity
- Identifies training needs
- Recognizes top performers
- Ensures quality standards are maintained

**Supervisor:**
- Monitors approval workflow
- Tracks supervisor workload
- Ensures timely review of audit results

**Store PID Allotment:**
- Assigns specific inventory locations (PIDs) to auditors
- Ensures complete coverage of each store
- Prevents duplicate work
- Optimizes auditor routing within stores

## Visual Documentation

![Dashboard - Store Coverage Screen](./screenshots/dashboard-main.png)

*The main dashboard showing store coverage metrics, inventory statistics, and deviation analysis. This screen provides a comprehensive overview of the audit program status.*
