# MedPlus Audit Dashboard - Complete UI & Functional Documentation

## Table of Contents
- [Document Purpose](#document-purpose)
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
- [Interaction Behavior](#interaction-behavior)
  - [Filter Interactions](#filter-interactions)
  - [Refresh Now Button](#refresh-now-button)
  - [Summary Cards Interactions](#summary-cards-interactions)
  - [Chart Interactions](#chart-interactions)
  - [Navigation Interactions](#navigation-interactions)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Filter Purpose](#filter-purpose)
  - [Card Click Purpose](#card-click-purpose)
  - [Chart Purpose](#chart-purpose)
- [Visual Documentation](#visual-documentation)
- [When This Screen Appears](#when-this-screen-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Header Section](#header-section)
  - [Search and Filter Section](#search-and-filter-section)
  - [Data Table](#data-table)
- [Interaction Behavior](#interaction-behavior)
  - [Back Button](#back-button)
  - [Export Report](#export-report)
  - [Search Functionality](#search-functionality)
  - [Filters](#filters)
  - [Table Sorting](#table-sorting)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Search and Filter Purpose](#search-and-filter-purpose)
  - [Export Purpose](#export-purpose)
  - [Column Data Purpose](#column-data-purpose)
- [Visual Documentation](#visual-documentation)
- [When This Screen Appears](#when-this-screen-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Audit Status Summary Cards](#audit-status-summary-cards)
  - [Live Audit Schedule Section](#live-audit-schedule-section)
  - [Audit Table](#audit-table)
- [Interaction Behavior](#interaction-behavior)
  - [Status Summary Cards](#status-summary-cards)
  - [Export Report](#export-report)
  - [Table Row Click](#table-row-click)
  - [Progress Bars](#progress-bars)
  - [Table Sorting](#table-sorting)
  - [Real-Time Updates](#real-time-updates)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Status Cards](#status-cards)
  - [Export Report](#export-report)
  - [Row Click/Modal](#row-clickmodal)
  - [Progress Tracking](#progress-tracking)
  - [Auditor/Supervisor Information](#auditorsupervisor-information)
  - [Real-Time Focus](#real-time-focus)
- [Visual Documentation](#visual-documentation)
- [When This Modal Appears](#when-this-modal-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Modal Header](#modal-header)
  - [Store Summary Bar](#store-summary-bar)
  - [Metrics Cards](#metrics-cards)
  - [PIDs Section](#pids-section)
  - [Mismatches Section](#mismatches-section)
  - [Deviations Section](#deviations-section)
  - [Assigned Auditors Table](#assigned-auditors-table)
- [Interaction Behavior](#interaction-behavior)
  - [Download Report](#download-report)
  - [Close Buttons](#close-buttons)
  - [Scrolling](#scrolling)
  - [Auditor Table](#auditor-table)
  - [Real-Time Updates](#real-time-updates)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Modal Display](#modal-display)
  - [Store Summary](#store-summary)
  - [Metrics Cards](#metrics-cards)
  - [PIDs Section](#pids-section)
  - [Mismatches Section](#mismatches-section)
  - [Deviations Section](#deviations-section)
  - [Assigned Auditors](#assigned-auditors)
- [Visual Documentation](#visual-documentation)
- [When This Screen Appears](#when-this-screen-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Summary Metrics Cards](#summary-metrics-cards)
  - [Deviation Summary Section](#deviation-summary-section)
  - [Performance Rankings](#performance-rankings)
  - [Auditor Productivity Summary Table](#auditor-productivity-summary-table)
- [Interaction Behavior](#interaction-behavior)
  - [Clicking Auditor Rows](#clicking-auditor-rows)
  - [Search Field](#search-field)
  - [Column Sorting](#column-sorting)
  - [View More Buttons](#view-more-buttons)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Performance Tracking](#performance-tracking)
  - [Productivity Metrics](#productivity-metrics)
  - [Match Rate](#match-rate)
  - [Edit Rate](#edit-rate)
  - [Rankings](#rankings)
- [Visual Documentation](#visual-documentation)
- [When This Modal Appears](#when-this-modal-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Modal Header](#modal-header)
  - [Performance Summary Cards](#performance-summary-cards)
  - [Deviation Summary Section](#deviation-summary-section)
  - [Audit History Table](#audit-history-table)
- [Interaction Behavior](#interaction-behavior)
  - [Date Range Filters](#date-range-filters)
  - [Download Report](#download-report)
  - [Table Sorting](#table-sorting)
  - [Close Buttons](#close-buttons)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Individual Performance Review](#individual-performance-review)
  - [Deviation Analysis](#deviation-analysis)
  - [Audit History](#audit-history)
  - [Date Filtering](#date-filtering)
  - [Export](#export)
- [Visual Documentation](#visual-documentation)
- [When This Screen Appears](#when-this-screen-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Summary Metrics Cards](#summary-metrics-cards)
  - [Supervisor Performance Summary Table](#supervisor-performance-summary-table)
- [Interaction Behavior](#interaction-behavior)
  - [Clicking Supervisor Rows](#clicking-supervisor-rows)
  - [Search Field](#search-field)
  - [Column Sorting](#column-sorting)
  - [Export Report](#export-report)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Workload Monitoring](#workload-monitoring)
  - [Performance Tracking](#performance-tracking)
  - [Value Oversight](#value-oversight)
  - [Quality Management](#quality-management)
- [Visual Documentation](#visual-documentation)
- [When This Screen Appears](#when-this-screen-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Store Header](#store-header)
  - [PID Management Section](#pid-management-section)
  - [PID Table](#pid-table)
- [Interaction Behavior](#interaction-behavior)
  - [Filter Buttons](#filter-buttons)
  - [Checkboxes](#checkboxes)
  - [Assign Button](#assign-button)
  - [Reassign Button (Individual)](#reassign-button-individual)
  - [Bulk Reassign Button](#bulk-reassign-button)
  - [Search Field](#search-field)
- [Purpose of Every Action](#purpose-of-every-action)
  - [PID Management](#pid-management)
  - [Assignment](#assignment)
  - [Status Tracking](#status-tracking)
  - [Reassignment](#reassignment)
  - [Filter Functions](#filter-functions)
  - [SKU Count](#sku-count)
  - [Checkbox Disable Logic](#checkbox-disable-logic)
  - [Bulk Operations](#bulk-operations)
- [Visual Documentation](#visual-documentation)
- [End of Documentation](#end-of-documentation)


## Document Purpose

This document provides comprehensive, screen-level functional documentation of the MedPlus Audit Dashboard application. It is designed for managerial and non-technical audiences to understand what the system does and how users interact with it.

**Document Organization:**
This documentation follows the logical user journey through the application, starting from the main dashboard and drilling down into each functional area.

---

# Dashboard - Store Coverage Screen

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
- Large number: Monetary value (e.g., "Rs.11769.22L" meaning 117.69 Crore Rupees)
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
  - "Invoiced: Rs.5707K" (with color indicator)
  - "Contra Short: Rs.6034K" (with color indicator)
  - "Contra Excess: Rs.5714K" (with color indicator)
  - "Excess Submitted: Rs.6397K" (with color indicator)
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
  1. Injection - Rs.2,647,772 (5480 items)
  2. Liquids - Rs.2,612,180 (6010 items)
  3. General - Rs.2,509,308 (5362 items)
  4. Inhalers - Rs.2,439,249 (5476 items)
  5. Containers - Rs.2,420,339 (5627 items)
  6. Ointments - Rs.2,331,716 (4986 items)
  7. Powders - Rs.2,288,196 (5392 items)
  8. Surgicals - Rs.2,273,320 (4891 items)
  9. Drops - Rs.2,194,744 (5088 items)
  10. Tablets - Rs.2,135,633 (4590 items)

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

## Interaction Behavior

### Filter Interactions

Clicking any dropdown expands it downward and displays available options. When selecting an option, the dropdown closes, the selected value is displayed, and all dashboard data refreshes automatically. Multiple filters can be applied simultaneously and work together to narrow down data.

### Refresh Now Button

On click, the button briefly shows a loading animation, all data refreshes, and the "Last Refreshed" timestamp updates to current time.

### Summary Cards Interactions

- Total Stores Card click transitions to Total Stores Details screen showing a table of all stores
- Covered Stores Card click shows only stores that have been audited
- Uncovered Stores Card click displays stores requiring audit attention
- Cards slightly lift on hover with shadow effect

### Chart Interactions

Time period buttons (Quarterly, Half-Yearly, Yearly) update the chart view when clicked. Pie chart segments can be clicked to show drill-down details for that deviation type or product category.

### Navigation Interactions

Clicking any sidebar navigation item transitions to that screen and highlights it in blue. Clicking the MedPlus logo returns to this Store Coverage dashboard.

## Purpose of Every Action

### Filter Purpose
- Financial Year Filter: Enables historical review and year-over-year comparisons
- State Filter: Allows regional managers to focus on their territory
- Store Type Filter: Different stores have different audit requirements
- Audit Job Type Filter: Tracks completion of different audit strategies
- Process Type Filter: Different processes have different accuracy requirements
- Audit Status Filter: Enables workflow management and bottleneck identification

### Card Click Purpose
- Total Stores: Provides complete store directory
- Covered Stores: Shows compliance with audit requirements
- Uncovered Stores: Highlights audit gaps requiring immediate attention

### Chart Purpose
- Store Recency Analysis: Shows audit frequency distribution over time
- Deviation Distribution: Quantifies financial impact of different deviation types
- Product Form Distribution: Identifies which product categories have most deviations

## Visual Documentation

![Dashboard - Store Coverage Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/dashboard-main.png)

---

# Total Stores - Details Screen

## When This Screen Appears

This screen appears when user clicks on the "Total Stores" card on the main dashboard. It displays detailed information about all stores in the system.

## Complete UI Breakdown

### Header Section

**Back Button**
- Blue left arrow with "Back" text
- Returns user to Store Coverage dashboard

**Page Title**
- "Total Stores" displayed prominently

**Record Counter**
- Shows "Showing X of Y records"
- Updates based on filters and search results

**Export Report Button**
- Green button with download icon
- Provides dropdown options when clicked

### Search and Filter Section

**Search Field**
- Placeholder: "Search across all fields..."
- Searches through all columns in real-time

**State Dropdown Filter**
- Default: "All States"
- Filters table to selected state

**Store Type Filter Field**
- Free-text input field
- Filters stores by name or type

**Reset Button**
- Clears all search and filter inputs

### Data Table

**Columns:**
1. STORE ID - Unique identifier (MP###)
2. CITY - Location city
3. STORE NAME - Full store name
4. STATE - Operating state
5. STORE TYPE - HUB or REGULAR
6. BOX TYPE - DYNAMIC or REGULAR storage system
7. STORE CREATED DATE - When store was added (YYYY-MM-DD)
8. LAST AUDITED DATE - Most recent audit (YYYY-MM-DD)
9. STATUS - Active/Inactive with colored badge
10. SKUS (count) - Number of unique products
11. QUANTITY (units) - Total product units
12. INVENTORY VALUE MRP (Rs.) - Total inventory value

## Interaction Behavior

### Back Button
Returns to Store Coverage dashboard with all filters preserved.

### Export Report
Opens dropdown with format options (PDF, Excel, CSV), then downloads file containing all visible table data.

### Search Functionality
Filters results instantly as user types. Searches across Store ID, City, Store Name, and State. Empty search shows all records.

### Filters
State dropdown and store type filter can be combined with search. Reset button clears all filters at once.

### Table Sorting
Clicking column headers sorts data in ascending/descending order. Sortable columns include Store ID, City, Store Name, State, Last Audited Date, SKUs, Quantity, and Inventory Value.

## Purpose of Every Action

### Search and Filter Purpose
- Rapid location of specific stores
- Verification of store data
- Regional analysis and comparison

### Export Purpose
- Monthly management reports
- Board presentations
- Store expansion planning
- Comparative analysis

### Column Data Purpose
- Store ID: Unique identifier for all communications
- Geographic Information: Resource planning and logistics
- Store/Box Type: Determines audit approach
- Created Date: Assesses store maturity
- Last Audited Date: Critical for audit planning and compliance
- Status: Confirms operational state
- SKUs: Indicates audit complexity
- Quantity: Represents inventory volume
- Value: Financial exposure and risk assessment

## Visual Documentation

![Total Stores Details Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/total-stores-details.png)

---

# Live Audit Schedule Screen

## When This Screen Appears

This screen appears when user clicks on "Live Audit" in the sidebar navigation. It provides real-time visibility into ongoing audit operations and is the primary screen for monitoring active audits.

## Complete UI Breakdown

### Audit Status Summary Cards

**Total Card** - 26 audits (All Audits)
**Pending Card** - 6 audits (Awaiting action)  
**In Progress Card** - 9 audits (Actively running)
**Completed Card** - 11 audits (Finalized)

All cards have "Click for details" links for drill-down.

### Live Audit Schedule Section

**Section Title:** "Live Audit Schedule - In Progress"
**Subtitle:** "Click on any row to view auditor-wise allocation and real-time progress"

**Action Bar:**
- Export Report button (green)
- Audit counter showing filtered count

### Audit Table

**Columns:**
1. Store ID - Unique identifier with badge format
2. Store Name - Location being audited
3. Supervisor - Responsible manager with icon
4. Assigned Auditors - Count badge + names list
5. Start Date - Audit start date with calendar icon
6. Audit Progress - "X/Y SKUs" text + visual progress bar showing percentage
7. Actions - Reserved column

**Sample Data:**
- MP0002 Coimbatore-Main: Sourav Das supervising 4 auditors, started 2025-12-15, 86.3% complete
- MP0011 Nizamabad-Hub: Kiran Patel supervising 2 auditors, started 2025-12-04, 87.9% complete  
- MP0018 Delhi NCR-Central: Neha Sharma supervising 2 auditors, started 2025-12-09, 35.2% complete

## Interaction Behavior

### Status Summary Cards
Clicking cards filters the table to show only audits with that status. The In Progress card is the default view.

### Export Report
Generates downloadable report with current table data in selected format (PDF, Excel, CSV).

### Table Row Click
Opens Store Detail Modal (documented separately) showing comprehensive audit information including individual auditor performance and progress.

### Progress Bars
Provide visual at-a-glance status. Hover may show tooltip with exact counts.

### Table Sorting
Click column headers to sort by Store ID, Store Name, Supervisor, Start Date, or Progress percentage.

### Real-Time Updates
Screen may auto-refresh at intervals. Manual refresh available via "Refresh Now" button.

## Purpose of Every Action

### Status Cards
- Total: Complete operational overview
- Pending: Identifies work waiting to start, highlights potential delays
- In Progress: Primary operational focus for real-time management
- Completed: Tracks daily/weekly accomplishments

### Export Report
- Daily operational reports
- Supervisor performance tracking
- Resource allocation planning
- Historical activity records

### Row Click/Modal
- Deep dive into specific store progress
- See individual auditor contributions  
- Monitor quality metrics in real-time
- Make immediate adjustments

### Progress Tracking
- Estimate completion times
- Identify slow-moving audits
- Allocate additional resources
- Compare performance across stores

### Auditor/Supervisor Information
- Know who is working where
- Clear ownership and accountability
- Contact points for questions
- Workload balance visibility

### Real-Time Focus
Designed for "right now" operations enabling immediate response and active management.

## Visual Documentation

![Live Audit Schedule Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/live-audit-schedule.png)

---

# Store Detail Modal

## When This Modal Appears

This modal appears when user clicks on any audit row in the Live Audit Schedule table. It provides detailed breakdown of a specific store's audit progress and overlays the current screen with semi-transparent background.

## Complete UI Breakdown

### Modal Header

**Title:** Store name - "Store Details" (e.g., "Coimbatore-Main - Store Details")

**Actions:**
- Download Report button dropdown
- Close button (X)

### Store Summary Bar

Four key pieces of information displayed horizontally:

**Store ID** - Badge display (e.g., "MP0002")
**State** - Two-letter abbreviation (e.g., "TN")
**Supervisor** - Name with icon (e.g., "Sourav Das")
**Audit Progress** - Percentage with blue progress bar (e.g., "86.3%")

### Metrics Cards

**Total SKUs:** 3,317 total products, Audited: 2,862
**Inventory Value:** Rs.3209K Total Value

### PIDs Section

Four metrics in 2x2 grid:
- **Total PIDs:** 1,551 physical locations
- **Pending PIDs:** 213 (in orange) not yet audited
- **Total SKUs:** 3,317 products
- **Pending SKUs:** 455 (in orange) awaiting audit

### Mismatches Section

Four metrics showing inventory discrepancies:
- **Total Mismatches:** 65 count
- **Pending:** 26 (in orange) not resolved
- **Matched:** 39 (in green) successfully reconciled  
- **Deviations:** 98 related count

### Deviations Section

Three metrics:
- **Total Deviations:** 98 all discrepancies
- **Pending:** 31 (in orange) awaiting resolution
- **Submitted:** 67 (in green) completed for approval

### Assigned Auditors Table

**Columns:**
1. Checkbox (for selection)
2. Auditor Name
3. Assigned SKUs (count)
4. Completed SKUs (count)
5. Progress (%) - visual progress bar
6. Match Rate (%) - accuracy badge

**Sample Data:**
- Hitesh Shah: 675 assigned, 504 completed, 74.8% progress, 86.2% match rate
- Amit Singh: 673 assigned, 332 completed, 49.4% progress, 95.6% match rate
- Rohit Sharma: 913 assigned, 827 completed, 90.6% progress, 95.9% match rate
- Arun Nair: 1,056 assigned, 456 completed, 43.2% progress, 96.4% match rate

## Interaction Behavior

### Download Report
Exports store's complete audit data in selected format. Modal remains open after download.

### Close Buttons
X button or bottom Close button dismisses modal with animation and returns to Live Audit Schedule.

### Scrolling
If content is taller than screen, scroll bar appears. Header and footer remain accessible.

### Auditor Table
Clicking column headers sorts data. Rows may highlight on hover but are not clickable for further drill-down.

### Real-Time Updates
Data may auto-refresh while modal is open. Progress percentages and completed counts update automatically.

## Purpose of Every Action

### Modal Display
- Detailed oversight for supervisors
- Remote monitoring capability
- Transparency into operations
- Decision making on resource needs

### Store Summary
- Quick context confirmation
- Overall progress assessment
- Contact information for issues

### Metrics Cards
- Audit scope and complexity indication
- Financial risk assessment
- Resource adequacy evaluation

### PIDs Section
- Physical location tracking
- Route planning
- Complete store coverage assurance

### Mismatches Section
- Quality indicator
- Problem identification (theft, errors, system issues)
- Resolution tracking

### Deviations Section
- Financial impact visibility
- Compliance documentation
- Approval workflow tracking

### Assigned Auditors
- Individual accountability
- Performance visibility (speed and accuracy)
- Workload balance assessment
- Quality control
- Completion forecasting

## Visual Documentation

![Store Detail Modal](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/store-detail-modal.png)

---

# Auditor Performance Screen

## When This Screen Appears

This screen appears when user clicks on "Auditor Performance" in the sidebar navigation. It evaluates individual auditor productivity and quality with comprehensive performance metrics for all auditors.

## Complete UI Breakdown

### Summary Metrics Cards

**Total Auditors:** 40 active auditors
**Avg Time / PID:** 9.7 min productivity efficiency
**Avg Time / SKU:** 4.0 min productivity efficiency

### Deviation Summary Section

Three colored panels:

**Appeared Deviations (Blue)**
- SKUs: 2.93 L, Qty: 48.20 L, Value: Rs.31.69 Cr
- All discrepancies identified by auditors

**Matched Deviations (Green)**  
- SKUs: 2.75 L, Qty: 45.30 L, Value: Rs.29.82 Cr
- Successfully reconciled deviations

**Revised Deviations (Yellow/Orange)**
- SKUs: 18,189, Qty: 2.90 L, Value: Rs.1.87 Cr
- Deviations requiring correction

### Performance Rankings

**Top Performers Section** (View More button)
1. Rakesh Kumar - 96.2%
2. Ravi Kumar - 95.5%
3. Nikhil Reddy - 95.4%

**Needs Attention Section** (View More button)
1. Teja Reddy - 92.2%
2. Sashank Reddy - 92.2%
3. Pavan Kalyan - 92.5%

### Auditor Productivity Summary Table

**Title:** "Auditor Productivity Summary"  
**Subtitle:** "Click on any auditor to view detailed performance metrics"

**Search Field:** "Search by auditor name..."

**Columns:**
1. Auditor ID (e.g., A046)
2. Auditor Name
3. Total Audits (completed count)
4. Allotted PIDs (total assigned)
5. Allotted SKUs (total assigned)
6. Allotted Qty (quantity to audit)
7. Avg Time/PID (minutes)
8. Avg Time/SKU (minutes)
9. Match Rate % (accuracy)
10. Edit Rate % (correction frequency)
11. Total Value (inventory audited)
12. Actions (empty)

**Sample Data:**
- A046 Abhinay Naidu: 24 audits, 35,516 PIDs, 1.38L SKUs, 10.05 min/PID, 4.12 min/SKU, 93.3% match, Rs.1.09 Cr
- A037 Uday Varma: 25 audits, 29,640 PIDs, 1.28L SKUs, 9.56 min/PID, 4.03 min/SKU, 94.4% match, Rs.96.24 L

## Interaction Behavior

### Clicking Auditor Rows
Opens Auditor Detail Modal showing comprehensive performance history including audit history table and deviation statistics.

### Search Field
Filters table as user types, searches auditor name and ID, updates results instantly.

### Column Sorting
Click headers to sort ascending/descending by performance metrics to identify outliers.

### View More Buttons
Expands to show more top/bottom performers, may open separate screen or expand list in place.

## Purpose of Every Action

### Performance Tracking
- Identifies high performers for recognition
- Identifies low performers for training
- Ensures quality standards maintained
- Supports fair performance evaluation

### Productivity Metrics
- Avg Time/PID and Avg Time/SKU show efficiency
- Lower times indicate faster auditors
- Must be balanced with accuracy (Match Rate)

### Match Rate
- Shows accuracy of auditor's work
- High match rate = accurate counting
- Low match rate = needs retraining

### Edit Rate
- Shows revision frequency
- High rate may indicate carelessness
- Low rate indicates careful work

### Rankings
- Top performers deserve recognition
- Bottom performers need support
- Creates healthy competition
- Identifies best practices

## Visual Documentation

![Auditor Performance Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/auditor-performance.png)

---

# Auditor Detail Modal

## When This Modal Appears

This modal appears when user clicks on any auditor row in the Auditor Performance table. It provides complete performance history for selected auditor including detailed audit history and statistics.

## Complete UI Breakdown

### Modal Header

**Auditor Identification**
- Name prominently displayed (e.g., "Abhinay Naidu")
- ID shown below (e.g., "ID: A046")

**Actions:**
- Download Report button with dropdown
- Date range filters: "From" and "To" date pickers
- Close button (X)

### Performance Summary Cards

**Total Audits:** 37 completed audits
**Total PIDs:** 45,389 Physical Inventory Displays audited
**Total SKUs:** 1.81 L (181,000) Stock Keeping Units audited

### Deviation Summary Section

**Appeared Deviations**
- SKUs: 13,081, Qty: 2.05 L, Value: Rs.1.33 Cr
- All discrepancies found by this auditor

**Matched Deviations**
- SKUs: 12,221, Qty: 1.92 L, Value: Rs.1.25 Cr
- Successfully resolved

**Revised Deviations**
- SKUs: 860, Qty: 13,615, Value: Rs.8.51 L
- Required correction

### Audit History Table

**Columns:**
1. Store ID
2. Store (name)
3. Date (audit date)
4. Job Type (Full Audit, Select SKUs, Partial Audit)
5. PIDs (count)
6. SKUs (count)
7. QTY (quantity audited)
8. Audited Value (monetary value)

**Sample Rows:**
- MP0011, Hyd-Jubilee Hills, 06/12/2025, Select SKUs, 2,719 PIDs, 8,156 SKUs, 10,461 qty, Rs.2.15 Cr
- MP0009, Hyd-Tarnaka, 04/12/2025, Select SKUs, 4,685 PIDs, 14,052 SKUs, 11,323 qty, Rs.2.14 Cr
- Complete scrollable audit history showing chronological record

## Interaction Behavior

### Date Range Filters
Click From/To dates to select date range. Table filters to show audits within selected period.

### Download Report
Exports auditor's complete performance data including summary metrics and audit history in selected format.

### Table Sorting
Sort by date (most recent), value (highest-value audits), or store (group by location).

### Close Buttons
X or Close button returns to Auditor Performance screen with modal animation.

## Purpose of Every Action

### Individual Performance Review
- Complete audit history for evaluation
- Identifies patterns in work
- Shows consistency over time

### Deviation Analysis
- High revision rate indicates quality issues
- Good match rate shows accurate work
- Helps identify training needs

### Audit History
- Validates experience level
- Shows store types audited
- Demonstrates workload over time
- Supports compensation/promotion decisions

### Date Filtering
- Review specific time periods
- Quarterly/annual performance reviews
- Identify improvement or decline trends

### Export
- Performance review documentation
- HR records
- Training needs assessment
- Recognition and reward decisions

## Visual Documentation

![Auditor Detail Modal](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/auditor-detail-modal.png)

---

# Supervisor Approvals Screen

## When This Screen Appears

This screen appears when user clicks on "Supervisor" in the sidebar navigation. It monitors supervisor workload, audit oversight, and tracks approvals and supervisor performance.

## Complete UI Breakdown

### Summary Metrics Cards

**Total Supervisors:** 15 active supervisors
**Total Stores Managed:** 379 stores under oversight
**Total Audits:** 876 audits supervised
**Total Value:** Rs.130.91 Cr total inventory value supervised

### Supervisor Performance Summary Table

**Title:** "Supervisor Performance Summary"
**Subtitle:** "Click on any supervisor to view detailed performance metrics"

**Search Field:** "Search by supervisor name..."

**Columns:**
1. ID (e.g., S001, S002)
2. Name (supervisor name)
3. Stores Managed (count)
4. Total Audits (count)
5. Days Supervised (total days)
6. Auditors Supervised (count)
7. Total SKUs (audited)
8. Total Value (inventory value)
9. Actions (empty)

**Sample Data:**
- S001 Aditya Reddy: 26 stores, 53 audits, 206 days, 39 auditors, 10.17 L SKUs, Rs.8.13 Cr
- S002 Srinivas Rao: 26 stores, 54 audits, 223 days, 40 auditors, 8.32 L SKUs, Rs.8.79 Cr
- S004 Praveen Chowdary: 27 stores, 71 audits, 283 days, 40 auditors, 12.98 L SKUs, Rs.10.22 Cr

## Interaction Behavior

### Clicking Supervisor Rows
Opens Supervisor Detail Modal (if implemented) showing stores managed, auditor teams, approval history, and pending items.

### Search Field
Filters supervisors by name or ID, updates table instantly.

### Column Sorting
Sort by Stores Managed (workload), Total Value (responsibility level), or Audits (activity level).

### Export Report
Downloads complete supervisor performance data including all visible columns, respects active filters.

## Purpose of Every Action

### Workload Monitoring
- Ensures even distribution across supervisors
- Identifies overloaded or underutilized supervisors
- Supports resource reallocation

### Performance Tracking
- Days supervised shows experience/availability
- Audits count shows throughput
- Auditors supervised shows span of control

### Value Oversight
- Higher value indicates greater responsibility
- Helps determine compensation
- Shows trust and capability level

### Quality Management
- Supervisors approve audit results
- Track approval speed and accuracy
- Ensure proper oversight of audit quality

## Visual Documentation

![Supervisor Approvals Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/supervisor-approvals.png)

---

# Store PID Allotment Screen

## When This Screen Appears

This screen appears when user clicks on "Store PID Allotment" in the sidebar navigation. It assigns Physical Inventory Display locations (PIDs) to auditors and manages audit task distribution within a single store.

## Complete UI Breakdown

### Store Header

**Store Identification:**
- Store name displayed prominently (e.g., "Chennai Central")
- Subtext: Location and Store ID (e.g., "Tamil Nadu | Store ID: MP001")

**Status Metrics (5 boxes):**
1. Total PIDs: 15 total locations
2. Assigned: 5 PIDs allocated
3. Unassigned: 10 PIDs available
4. In Progress: 1 currently being audited
5. Completed: 1 finished PIDs

### PID Management Section

**Section Title:** "PID Management"

**Search and Filter Bar:**
- Search field: "Search by PID, description, or auditor..."
- Filter buttons: "All PIDs" (default), "Not Assigned", "Reassign"

**Action Buttons:**
- "Assign (0)" - disabled when no PIDs selected (number shows selection count)
- "Bulk Reassign (0)" - disabled when no PIDs selected

### PID Table

**Columns:**
1. Checkbox (for selection)
2. PID Number (e.g., PID001, PID002)
3. SKU Count (products in location)
4. Description (location code like A1-56, B6-7)
5. Assign Status (Not Assigned / Assigned)
6. Audit Status (Pending / Not Started / In Progress / Completed)
7. Auditor Name (assigned person or "-")
8. Actions (Reassign button when applicable)

**Sample Rows:**

**PID001** (Assigned, In Progress)
- SKUs: 245, Description: A1-56, Auditor: Amit Singh
- Checkbox disabled, no action button

**PID002** (Not Assigned)
- SKUs: 189, Description: B6-7, Auditor: -
- Checkbox enabled, no action button yet

**PID004** (Assigned, Not Started)
- SKUs: 156, Description: A3-45, Auditor: Priya Reddy
- Checkbox enabled, Reassign button available

**PID009** (Completed)
- SKUs: 198, Description: C7-12, Auditor: Amit Singh
- Checkbox disabled, no action button

## Interaction Behavior

### Filter Buttons
- "All PIDs": Shows complete list
- "Not Assigned": Shows only unassigned PIDs
- "Reassign": Shows PIDs that are assigned but not started

### Checkboxes
Checking PIDs highlights rows and increases count in Assign/Reassign buttons. Multiple PIDs selectable. Select all checkbox in header checks all eligible PIDs.

### Assign Button
When PIDs selected, button becomes enabled. Clicking opens assignment dialog listing available auditors. After assignment, PIDs update to "Assigned" status with auditor name.

### Reassign Button (Individual)
Clicking opens reassignment dialog showing current auditor and alternatives. User selects new auditor and confirms. Row updates with new auditor name maintaining "Not Started" status.

### Bulk Reassign Button
When multiple assigned PIDs selected, button enables. Opens bulk dialog allowing assignment of all selected to one auditor or distribution among multiple.

### Search Field
Filters table as user types, searches PID number, description, and auditor name in real-time.

## Purpose of Every Action

### PID Management
- Breaks store into manageable sections
- Each PID represents physical location (aisle, shelf)
- Efficient auditor routing through store

### Assignment
- Ensures every location covered
- Prevents duplicate work
- Balances workload among auditors

### Status Tracking
- Shows in-progress PIDs
- Identifies completed work
- Highlights remaining work

### Reassignment
- Adjusts for auditor availability
- Rebalances workload if behind
- Responds to changing circumstances

### Filter Functions
- Not Assigned: Identifies unallocated work, ensures complete coverage
- Reassign: Shows flexible assignments for workload optimization

### SKU Count
- Estimates time required per PID
- Higher count = longer time
- Used for fair workload distribution

### Checkbox Disable Logic
- Can't reassign in-progress work (protects auditor continuity)
- Can't modify completed work (maintains audit integrity)

### Bulk Operations
- Saves time for many PIDs
- Efficient initial allocation
- Quick last-minute adjustments

## Visual Documentation

![Store PID Allotment Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/store-pid-allotment.png)

---

## End of Documentation

This comprehensive documentation covers all major screens, modals, and interactions in the MedPlus Audit Dashboard application. Each section provides detailed information about what appears on screen, how users interact with elements, and the business purpose behind each feature.

The documentation is designed for managerial review and decision-making, focusing on functionality and user experience rather than technical implementation.
