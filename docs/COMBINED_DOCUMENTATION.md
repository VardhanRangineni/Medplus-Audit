# MedPlus Audit Dashboard - Complete Documentation

This document combines all documentation files for the MedPlus Audit Dashboard.

---


\newpage

# Auditor Detail Modal

## Table of Contents
- [When This Modal Appears](#when-this-modal-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Modal Header](#modal-header)
  - [Performance Summary Cards](#performance-summary-cards)
  - [Deviation Summary Section](#deviation-summary-section)
  - [Audit History Table](#audit-history-table)
- [Interaction Behavior](#interaction-behavior)
  - [Date Range Filters:](#date-range-filters)
  - [Download Report:](#download-report)
  - [Table Sorting:](#table-sorting)
  - [Close Buttons:](#close-buttons)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Individual Performance Review:](#individual-performance-review)
  - [Deviation Analysis:](#deviation-analysis)
  - [Audit History:](#audit-history)
  - [Date Filtering:](#date-filtering)
  - [Export Purpose:](#export-purpose)
- [Visual Documentation](#visual-documentation)


## When This Modal Appears

This modal appears when:
- User clicks on any auditor row in the Auditor Performance table
- Provides complete performance history for selected auditor
- Shows detailed audit history and statistics

## Complete UI Breakdown

### Modal Header

**Auditor Identification**
- Auditor name prominently displayed (e.g., "Srikanth Rao")
- Auditor ID shown below name (e.g., "ID: A039")

**Actions (Top Right)**
- Download Report button with dropdown for format selection
- Date range filters: "From" and "To" date pickers for filtering audit history
- Close button (X) to dismiss modal

### Performance Summary Cards

Four cards showing aggregate metrics:

**Total Audits**
- Number: 26 (total audits completed by this auditor)
- Displayed with gradient blue background

**Total PIDs**
- Number: 31,414 (Physical Inventory Displays audited)

**Total SKUs**
- Number: 1.29 L (Stock Keeping Units audited)

**Total Value**
- Value: ₹22.04 Cr (Total audited value in Indian Rupees)

### Deviation Summary Section

Shows this auditor's deviation statistics in three panels:

**Appeared Deviations (Blue Border)**
- SKUs: 10,017
- Qty: 1.52 L
- Value: ₹1.09 Cr
- All discrepancies found by this auditor

**Matched Deviations (Green Border)**
- SKUs: 9,345
- Qty: 1.42 L
- Value: ₹1.03 Cr
- Successfully resolved and confirmed as correct

**Revised Deviations (Yellow Border)**
- SKUs: 672
- Qty: 9,770
- Value: ₹6.53 L
- Required correction after auditor's initial submission

### Audit History Table

**Table Title**: "AUDIT HISTORY"

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
- MP0011, Hyd-Jubilee Hills, 06/12/2025, Select SKUs, 2,719 PIDs, 8,156 SKUs, 10,461 qty, ₹2.15 Cr
- MP0009, Hyd-Tarnaka, 04/12/2025, Select SKUs, 4,685 PIDs, 14,052 SKUs, 11,323 qty, ₹2.14 Cr
- MP0014, Hyd-Manikonda, 29/11/2025, Full Audit, 730 PIDs, 2,922 SKUs, 791 qty, ₹19.32 L

**Table Features:**
- Scrollable to show complete history
- Sortable by columns
- Shows chronological audit record
- Complete audit trail for this auditor

## Interaction Behavior

### Date Range Filters:
- Click From date to select start date
- Click To date to select end date
- Table filters to show audits within date range
- Useful for performance reviews covering specific periods

### Download Report:
- Exports this auditor's complete performance data
- Includes summary metrics and audit history
- Format options: PDF, Excel, CSV

### Table Sorting:
- Sort by date to see most recent work
- Sort by value to see highest-value audits
- Sort by store to group by location

### Close Buttons:
- X button or Close button returns to Auditor Performance screen
- Modal dismisses with animation

## Purpose of Every Action

### Individual Performance Review:
- Complete audit history for performance evaluation
- Identifies patterns in auditor's work
- Shows consistency over time

### Deviation Analysis:
- High revision rate may indicate quality issues
- Good match rate shows accurate work
- Helps identify training needs

### Audit History:
- Validates experience level
- Shows store types audited (helps with assignments)
- Demonstrates workload over time period
- Supports compensation and promotion decisions

### Date Filtering:
- Review specific time periods
- Quarterly or annual performance reviews
- Identify improvement or decline trends

### Export Purpose:
- Performance review documentation
- HR records
- Training needs assessment
- Recognition and reward decisions

## Visual Documentation

![Auditor Detail Modal](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/auditor-detail-modal.png)

*The Auditor Detail Modal showing complete performance history, deviation statistics, and detailed audit history for an individual auditor.*


\newpage

# Auditor Performance Screen

## Table of Contents
- [When This Screen Appears](#when-this-screen-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Header and Filters](#header-and-filters)
  - [Summary Metrics Cards](#summary-metrics-cards)
  - [Deviation Summary Section](#deviation-summary-section)
  - [Performance Rankings](#performance-rankings)
  - [Auditor Productivity Summary Table](#auditor-productivity-summary-table)
- [Interaction Behavior](#interaction-behavior)
  - [Clicking auditor rows:](#clicking-auditor-rows)
  - [Search field:](#search-field)
  - [Column sorting:](#column-sorting)
  - [View More buttons:](#view-more-buttons)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Performance Tracking:](#performance-tracking)
  - [Productivity Metrics:](#productivity-metrics)
  - [Match Rate:](#match-rate)
  - [Edit Rate:](#edit-rate)
  - [Deviation Summary:](#deviation-summary)
  - [Rankings Purpose:](#rankings-purpose)
- [Visual Documentation](#visual-documentation)


## When This Screen Appears

This screen appears when:
- User clicks on "Auditor Performance" in the sidebar navigation
- Used to evaluate individual auditor productivity and quality
- Provides comprehensive performance metrics for all auditors

## Complete UI Breakdown

### Header and Filters

- Application title and Last Refreshed timestamp remain visible
- Global filter bar remains accessible (Financial year, State, Store, Audit Job Type, Process Type, Audit Status)
- Export Report button (green) in top right for downloading performance data

### Summary Metrics Cards

**Total Auditors Card**
- Icon: People/group icon
- Number: 40
- Label: "Active auditors"
- Shows current auditor workforce size

**Avg Time / PID Card**
- Icon: Hourglass/timer icon
- Number: 9.7 min
- Label: "Productivity efficiency"
- Average time to audit one Physical Inventory Display

**Avg Time / SKU Card**
- Icon: Clock icon
- Number: 4.0 min
- Label: "Productivity efficiency"
- Average time to audit one Stock Keeping Unit

### Deviation Summary Section

**Section Title**: "DEVIATION SUMMARY"

Three colored panels showing aggregate deviation data:

**Appeared Deviations** (Blue)
- SKUs: 2.93 L (Lakh = 293,000)
- Qty: 48.20 L
- Value: ₹31.69 Cr (Crore = 316.9 million)
- All discrepancies identified by auditors

**Matched Deviations** (Green)
- SKUs: 2.75 L
- Qty: 45.30 L
- Value: ₹29.82 Cr
- Deviations that were reconciled/resolved

**Revised Deviations** (Yellow/Orange)
- SKUs: 18,189
- Qty: 2.90 L
- Value: ₹1.87 Cr
- Deviations requiring correction

### Performance Rankings

**Top Performers Section**
- Title: "Top Performers"
- View More button to see complete list

Lists top 3 auditors:
1. Rakesh Kumar - 96.2%
2. Ravi Kumar - 95.5%
3. Nikhil Reddy - 95.4%

**Needs Attention Section**
- Title: "Needs Attention"
- View More button

Lists bottom 3 auditors:
1. Teja Reddy - 92.2%
2. Sashank Reddy - 92.2%
3. Pavan Kalyan - 92.5%

### Auditor Productivity Summary Table

**Table Title**: "Auditor Productivity Summary"
**Subtitle**: "Click on any auditor to view detailed performance metrics"

**Search Field**
- Placeholder: "Search by auditor name..."
- Filters table in real-time

**Table Columns:**
1. Auditor ID (e.g., A046, A037)
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
12. Actions (empty column)

**Sample Data:**
- A046 Abhinay Naidu: 24 audits, 35,516 PIDs, 1.38L SKUs, 10.05 min/PID, 4.12 min/SKU, 93.3% match, ₹1.09 Cr
- A037 Uday Varma: 25 audits, 29,640 PIDs, 1.28L SKUs, 9.56 min/PID, 4.03 min/SKU, 94.4% match, ₹96.24 L

## Interaction Behavior

### Clicking auditor rows:
- Opens Auditor Detail Modal (documented separately)
- Shows comprehensive performance history
- Includes audit history table
- Displays deviation statistics

### Search field:
- Filters table as user types
- Searches auditor name and ID
- Updates results instantly

### Column sorting:
- Click headers to sort ascending/descending
- Sort by performance metrics to identify outliers
- Numerical and alphabetical sorting available

### View More buttons:
- Expands to show more top/bottom performers
- May open separate screen or expand list in place

## Purpose of Every Action

### Performance Tracking:
- Identifies high performers for recognition
- Identifies low performers for training
- Ensures quality standards are maintained
- Supports fair performance evaluation

### Productivity Metrics:
- Avg Time/PID and Avg Time/SKU show efficiency
- Lower times indicate faster auditors
- Must be balanced with accuracy (Match Rate)

### Match Rate:
- Shows accuracy of auditor's work
- High match rate = accurate counting
- Low match rate = needs retraining or closer supervision

### Edit Rate:
- Shows how often audits are revised
- High edit rate may indicate carelessness
- Low edit rate indicates careful work

### Deviation Summary:
- Aggregate view of all auditor findings
- Shows scale of inventory discrepancies
- Matched deviations show successful resolution

### Rankings Purpose:
- Top performers deserve recognition and rewards
- Bottom performers need support and training
- Creates healthy competition
- Identifies best practices from top performers

## Visual Documentation

![Auditor Performance Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/auditor-performance.png)

*The Auditor Performance screen showing productivity metrics, accuracy ratings, and detailed performance data for all auditors.*


\newpage

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


\newpage

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

![Dashboard - Store Coverage Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/dashboard-main.png)

*The main dashboard showing store coverage metrics, inventory statistics, and deviation analysis. This screen provides a comprehensive overview of the audit program status.*


\newpage

# Live Audit Schedule Screen

## Table of Contents
- [When This Screen Appears](#when-this-screen-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Header Section](#header-section)
  - [Global Filter Bar](#global-filter-bar)
  - [Audit Status Summary Cards](#audit-status-summary-cards)
  - [Live Audit Schedule Section](#live-audit-schedule-section)
  - [Audit Table](#audit-table)
  - [Sample Data Rows](#sample-data-rows)
  - [Sidebar Navigation](#sidebar-navigation)
- [Interaction Behavior (Step-by-Step)](#interaction-behavior-step-by-step)
  - [Status Summary Cards](#status-summary-cards)
  - [Export Report Button](#export-report-button)
  - [Table Row Click](#table-row-click)
  - [Progress Bar](#progress-bar)
  - [Table Sorting](#table-sorting)
  - [Real-Time Updates](#real-time-updates)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Status Card Purpose](#status-card-purpose)
  - [Export Report Purpose](#export-report-purpose)
  - [Row Click / Modal Purpose](#row-click--modal-purpose)
  - [Progress Tracking Purpose](#progress-tracking-purpose)
  - [Auditor Information Purpose](#auditor-information-purpose)
  - [Supervisor Information Purpose](#supervisor-information-purpose)
  - [Start Date Purpose](#start-date-purpose)
  - [Real-Time Focus](#real-time-focus)
- [Visual Documentation](#visual-documentation)


## When This Screen Appears

This screen appears when:
- User clicks on "Live Audit" in the sidebar navigation
- User selects "Schedule & Progress" from navigation menu
- The screen provides real-time visibility into ongoing audit operations

This is the primary screen for monitoring active audits and tracking day-to-day operations.

## Complete UI Breakdown

### Header Section

**Application Title and Refresh**
- "Medplus Audit Dashboard" remains visible
- "Last Refreshed" timestamp with current date and time
- "Refresh Now" button to update real-time data

### Global Filter Bar

All dashboard filters remain accessible:
- Financial year, State, Store, Audit Job Type, Process Type, Audit Status
- Filters work across the entire application
- Affect which audits are displayed in the schedule

### Audit Status Summary Cards

Four cards displaying audit counts by status:

**Total Card**
- Icon: Document/clipboard icon in gray
- Number: 26 (Total number of all audits)
- Label: "All Audits"
- Interactive: "Click for details" link
- Purpose: Shows complete audit count regardless of status

**Pending Card**
- Icon: Clock icon in yellow/orange
- Number: 6 (Audits awaiting action)
- Label: "Awaiting action"
- Interactive: "Click for details" link
- Purpose: Highlights audits that need to be started

**In Progress Card**
- Icon: Circular progress icon in blue
- Number: 9 (Currently active audits)
- Label: "Actively running"
- Interactive: "Click for details" link
- Purpose: Shows real-time audit activity

**Completed Card**
- Icon: Checkmark icon in green
- Number: 11 (Finished audits)
- Label: "Finalized"
- Interactive: "Click for details" link
- Purpose: Confirms successfully completed work

### Live Audit Schedule Section

**Section Header**
- Title: "Live Audit Schedule - In Progress" with calendar icon
- Subtitle: "Click on any row to view auditor-wise allocation and real-time progress"
- Instructs users on interaction method

**Action Bar**
- Export Report button (green, with download icon)
- Audit counter: "9 Audits" showing filtered count
- Right-aligned for easy access

### Audit Table

The table displays currently active audits with the following columns:

**Store ID**
- Unique identifier (e.g., MP0002, MP0011)
- Badge format with gray background
- Easy visual identification

**Store Name**
- Store location name
- Examples: "Coimbatore-Main", "Nizamabad-Hub", "Delhi NCR-Central"
- Identifies which store is being audited

**Supervisor**
- Name of supervising manager
- Examples: "Sourav Das", "Kiran Patel", "Neha Sharma"
- Icon: Person icon displayed next to name
- Shows who is responsible for audit oversight

**Assigned Auditors**
- Blue circular badge showing number of auditors (e.g., "4", "2", "1")
- Comma-separated list of auditor names
- Examples: "Hitesh Shah, Amit Singh, Rohit Sharma, Arun Nair"
- Truncates to show count + names
- Indicates team size and composition

**Start Date**
- Calendar icon followed by date
- Format: YYYY-MM-DD (e.g., "2025-12-15")
- Shows when audit began
- Helps track audit duration

**Audit Progress**
- Two-part display:
  1. Text: "X,XXX / Y,YYY SKUs" (completed vs. total)
  2. Visual: Blue progress bar showing percentage
- Examples: "2,862 / 3,317 SKUs" with 86.3% bar
- Provides immediate visual status update
- Percentage label appears on or near progress bar

**Actions Column**
- Currently empty in this view
- May contain action buttons in other contexts
- Reserved for future operations

### Sample Data Rows

**Row 1: MP0002 - Coimbatore-Main**
- Supervisor: Sourav Das
- Auditors: 4 (Hitesh Shah, Amit Singh, Rohit Sharma, Arun Nair)
- Start Date: 2025-12-15
- Progress: 2,862 / 3,317 SKUs (86.3%)
- Status: Near completion

**Row 2: MP0011 - Nizamabad-Hub**
- Supervisor: Kiran Patel
- Auditors: 2 (Nisha Gupta, Suresh Kumar)
- Start Date: 2025-12-04
- Progress: 4,475 / 5,092 SKUs (87.9%)
- Status: Near completion

**Row 3: MP0018 - Delhi NCR-Central**
- Supervisor: Neha Sharma
- Auditors: 2 (Deepak Reddy, Sneha Patel)
- Start Date: 2025-12-09
- Progress: 1,496 / 4,250 SKUs (35.2%)
- Status: Early stage

**Row 4: MP0024 - Durgapur-Hub**
- Supervisor: Amit Verma
- Auditors: 1 (Vijay Kumar)
- Start Date: 2025-12-10
- Progress: 1,573 / 3,271 SKUs (48.1%)
- Status: Midway

### Sidebar Navigation

**Active Item**
- "Live Audit" is highlighted in blue
- Indicates current screen
- Other navigation items available: Store Coverage, Auditor Performance, Supervisor, Store PID Allotment

**User Profile**
- HOD Admin / Audit Head shown at bottom
- Consistent across all screens

## Interaction Behavior (Step-by-Step)

### Status Summary Cards

**When clicking Total card:**
1. Table filters to show all audits regardless of status
2. Card highlights to indicate active filter
3. Table updates immediately

**When clicking Pending card:**
1. Table filters to show only audits with "Pending" status
2. Shows audits that haven't started yet
3. Audit counter updates to show filtered count

**When clicking In Progress card:**
1. Table shows only currently active audits (default view)
2. Displays audits with auditors actively working
3. Focuses on real-time operations

**When clicking Completed card:**
1. Table filters to show finished audits
2. Displays completed work for verification
3. Shows historical completion data

### Export Report Button

**On click:**
1. Dropdown appears with export format options
2. Options: PDF, Excel, CSV formats
3. User selects preferred format

**After selection:**
1. Report generates with current table data
2. Includes all visible columns and rows
3. Respects active filters
4. File downloads with name like "Live_Audit_Schedule_[date]"
5. Contains timestamp and filter information

### Table Row Click

**When clicking any audit row:**
1. A detailed modal dialog appears
2. Modal overlays the current screen with semi-transparent background
3. Shows Store Detail Modal (documented separately)
4. Displays comprehensive audit information for selected store

**Modal contains:**
- Store identification and metrics
- Auditor allocation and performance
- Real-time progress tracking
- Detailed SKU counts
- Deviation information

### Progress Bar

**Visual indicators:**
- Green/Blue color for healthy progress
- Longer bar = higher completion percentage
- Text shows exact percentage (e.g., 86.3%)

**Hover behavior:**
- Tooltip may appear with exact counts
- Shows completed vs. remaining SKUs
- Provides estimated completion information

### Table Sorting

**Clicking column headers sorts by that column:**

**Store ID sort:**
- Alphabetically (MP0001, MP0002, MP0003...)
- Helps find specific stores quickly

**Store Name sort:**
- Alphabetically by store name
- Groups stores from same city

**Supervisor sort:**
- Alphabetically by supervisor name
- Groups audits by supervisor
- Useful for supervisor workload review

**Start Date sort:**
- Chronologically
- Oldest first or newest first
- Identifies longest-running audits

**Audit Progress sort:**
- By completion percentage
- Shows nearly complete audits first
- Or shows audits needing attention

### Real-Time Updates

**Auto-refresh behavior:**
- Screen may auto-refresh at intervals (e.g., every 60 seconds)
- Progress bars update with new completion data
- Audit counts update automatically
- New audits appear as they start
- Completed audits move to Completed status

**Manual refresh:**
- Click "Refresh Now" button
- Forces immediate data update
- Ensures latest information is displayed

## Purpose of Every Action

### Status Card Purpose

**Total Audits:**
- Provides complete overview of audit program
- Shows scale of operations
- Helps capacity planning

**Pending Audits:**
- Identifies work waiting to start
- Highlights potential delays
- Allows proactive scheduling adjustments
- Critical for meeting deadlines

**In Progress Audits:**
- Primary operational focus
- Shows current workforce utilization
- Enables real-time problem identification
- Supports immediate intervention if needed

**Completed Audits:**
- Confirms work finished
- Tracks daily/weekly accomplishments
- Provides closure confirmation
- Supports performance metrics

### Export Report Purpose

**Business Uses:**
- Daily operational reports for management
- Supervisor performance tracking
- Resource allocation planning
- Client/stakeholder updates
- Historical records of audit activity

**Decision Support:**
- Identify which stores are being audited
- Track completion rates
- Plan future audit schedules
- Allocate auditors to stores

### Row Click / Modal Purpose

**Deep Dive Analysis:**
- See individual auditor contributions
- Identify performance issues mid-audit
- Monitor quality metrics in real-time
- Make immediate adjustments if needed

**Supervisor Support:**
- Check on specific stores remotely
- Verify auditor assignments
- Review progress without being physically present
- Provide guidance based on real-time data

### Progress Tracking Purpose

**Operational Management:**
- Estimate completion times
- Identify slow-moving audits
- Allocate additional resources if falling behind
- Celebrate early completions

**Visual Indicators:**
- Progress bars provide at-a-glance status
- No need to calculate percentages mentally
- Quick identification of problem audits
- Easy comparison across multiple stores

### Auditor Information Purpose

**Team Composition:**
- Know who is working where
- Identify small vs. large teams
- Understand resource distribution
- Plan for auditor availability

**Accountability:**
- Clear ownership of each audit
- Named individuals for each store
- Contact points for questions
- Performance evaluation data

### Supervisor Information Purpose

**Chain of Command:**
- Know who to contact for each audit
- Escalation path for issues
- Responsibility assignment
- Performance accountability

**Workload Balance:**
- See how many audits each supervisor manages
- Identify overloaded supervisors
- Balance future assignments
- Ensure fair distribution

### Start Date Purpose

**Duration Tracking:**
- Calculate how long audit has been running
- Identify unusually long audits
- Benchmark completion times
- Plan future audit schedules

**Timeline Management:**
- Ensure audits complete within required timeframes
- Identify delays early
- Take corrective action
- Meet compliance requirements

### Real-Time Focus

**Immediate Response:**
- This screen is designed for "right now" operations
- Not historical analysis - that's on other screens
- Enables rapid decision-making
- Supports active management

**Operational Excellence:**
- High completion percentages show effective operations
- Low percentages trigger interventions
- Balanced workload across auditors
- Efficient use of resources

## Visual Documentation

![Live Audit Schedule Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/live-audit-schedule.png)

*The Live Audit Schedule screen showing audits currently in progress with real-time completion tracking and auditor assignments.*


\newpage

# Store Detail Modal

## Table of Contents
- [When This Modal Appears](#when-this-modal-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Modal Header](#modal-header)
  - [Store Summary Bar](#store-summary-bar)
  - [Metrics Cards (Two Large Cards)](#metrics-cards-two-large-cards)
  - [PIDs Section](#pids-section)
  - [Mismatches Section](#mismatches-section)
  - [Deviations Section](#deviations-section)
  - [Assigned Auditors Section](#assigned-auditors-section)
  - [Footer](#footer)
- [Interaction Behavior (Step-by-Step)](#interaction-behavior-step-by-step)
  - [Opening the Modal](#opening-the-modal)
  - [Download Report Button](#download-report-button)
  - [Close Buttons](#close-buttons)
  - [Scrolling Within Modal](#scrolling-within-modal)
  - [Auditor Table Interactions](#auditor-table-interactions)
  - [Real-Time Updates](#real-time-updates)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Modal Display Purpose](#modal-display-purpose)
  - [Store Summary Purpose](#store-summary-purpose)
  - [Metrics Cards Purpose](#metrics-cards-purpose)
  - [PIDs Section Purpose](#pids-section-purpose)
  - [Mismatches Section Purpose](#mismatches-section-purpose)
  - [Deviations Section Purpose](#deviations-section-purpose)
  - [Assigned Auditors Purpose](#assigned-auditors-purpose)
  - [Download Report Purpose](#download-report-purpose)
  - [Close Function Purpose](#close-function-purpose)
- [Visual Documentation](#visual-documentation)


## When This Modal Appears

This modal appears when:
- User clicks on any audit row in the Live Audit Schedule table
- Provides detailed breakdown of a specific store's audit progress
- Overlays the current screen with a semi-transparent background

The modal can be dismissed by:
- Clicking the X close button in the top right
- Clicking the "Close" button at the bottom
- Clicking outside the modal area (on the darkened background)

## Complete UI Breakdown

### Modal Header

**Title Section**
- Store icon followed by store name
- Example: "Coimbatore-Main - Store Details"
- Large, prominent text for easy identification

**Action Buttons (Top Right)**
- Download Report button (dropdown with icon)
  - Allows exporting this store's audit data
  - Options likely include PDF, Excel formats
- Close button (X icon)
  - Closes the modal
  - Returns to Live Audit Schedule

### Store Summary Bar

Displays four key pieces of information horizontally:

**Store ID**
- Label: "Store ID"
- Value: Badge-style display (e.g., "MP0002")
- Dark background with white text
- Quick reference identifier

**State**
- Label: "State"
- Value: Two-letter abbreviation (e.g., "TN" for Tamil Nadu)
- Identifies geographic location

**Supervisor**
- Label: "Supervisor"
- Value: Supervisor name with person icon (e.g., "Sourav Das")
- Shows audit oversight responsibility

**Audit Progress**
- Label: "Audit Progress"
- Value: Percentage (e.g., "86.3%")
- Visual: Blue progress bar
- Shows overall completion status

### Metrics Cards (Two Large Cards)

**Total SKUs Card**
- Title: "Total SKUs"
- Large number: "3,317"
- Subtext: "Audited: 2,862"
- Shows total products and how many have been checked

**Inventory Value Card**
- Title: "Inventory Value"
- Large number: "₹3209K" (3209 thousand rupees)
- Subtext: "Total Value"
- Shows financial value of inventory

### PIDs Section

**Section Title**: "PIDS" (with blue icon)

Displays four metrics in a 2x2 grid:

**Total PIDs**
- Number: 1,551
- Label below number
- Represents physical inventory locations

**Pending PIDs**
- Number: 213 (in orange/yellow)
- Indicates locations not yet audited
- Requires attention

**Total SKUs**
- Number: 3,317
- Repeated from main metrics
- Confirms product count

**Pending SKUs**
- Number: 455 (in orange/yellow)
- Products awaiting audit
- Work remaining indicator

### Mismatches Section

**Section Title**: "MISMATCHES" (with red warning icon)

Displays four metrics in a 2x2 grid:

**Total Mismatches**
- Number: 65
- Shows count of inventory discrepancies

**Pending**
- Number: 26 (in orange)
- Mismatches not yet resolved

**Matched**
- Number: 39 (in green)
- Successfully reconciled discrepancies

**Deviations**
- Number: 98
- Related deviation count
- Cross-references with Deviations section

### Deviations Section

**Section Title**: "DEVIATIONS" (with orange warning triangle)

Displays three metrics in a row:

**Total Deviations**
- Number: 98
- All identified discrepancies

**Pending**
- Number: 31 (in orange)
- Awaiting resolution

**Submitted**
- Number: 67 (in green)
- Completed and submitted for approval

### Assigned Auditors Section

**Section Title**: "Assigned Auditors" (with people icon)

Table displaying auditor-level details:

**Table Columns:**
1. Checkbox (for selection - currently not selectable in view mode)
2. Auditor Name
3. Assigned SKUs (count)
4. Completed SKUs (count)
5. Progress (%) - with visual progress bar
6. Match Rate (%) - accuracy metric

**Sample Data Rows:**

**Auditor 1: Hitesh Shah**
- Assigned: 675 SKUs
- Completed: 504 SKUs
- Progress: 74.8% (blue bar)
- Match Rate: 86.2% (shown as badge)

**Auditor 2: Amit Singh**
- Assigned: 673 SKUs
- Completed: 332 SKUs
- Progress: 49.4% (blue bar)
- Match Rate: 95.6%

**Auditor 3: Rohit Sharma**
- Assigned: 913 SKUs
- Completed: 827 SKUs
- Progress: 90.6% (blue bar)
- Match Rate: 95.9%

**Auditor 4: Arun Nair**
- Assigned: 1,056 SKUs
- Completed: 456 SKUs
- Progress: 43.2% (blue bar)
- Match Rate: 96.4%

### Footer

**Close Button**
- Prominent button at bottom center
- Blue background
- Text: "Close"
- Primary way to dismiss modal

## Interaction Behavior (Step-by-Step)

### Opening the Modal

**When row is clicked from Live Audit Schedule:**
1. Screen dims with dark transparent overlay
2. Modal slides or fades into view from center
3. Data loads and displays
4. User can scroll within modal if content is tall
5. Background screen is no longer interactive

### Download Report Button

**On click:**
1. Dropdown menu appears
2. Shows export format options (PDF, Excel, CSV)
3. User selects format

**After selection:**
1. Report generates with all visible data
2. Includes: Store ID, metrics, auditor performance
3. File downloads with name like "Store_Detail_MP0002_[date]"
4. Modal remains open after download

### Close Buttons

**Clicking X button (top right):**
1. Modal closes with fade/slide animation
2. Returns to Live Audit Schedule
3. User sees the same audit in the table
4. No data is lost or changed

**Clicking Close button (bottom):**
- Same behavior as X button
- Provides alternative close option

**Clicking outside modal (on dark background):**
- Some implementations allow this
- Modal closes and returns to previous screen

### Scrolling Within Modal

**If content is taller than screen:**
1. Scroll bar appears on right side of modal
2. User can scroll to see all sections
3. Header with store name remains visible
4. Footer with Close button remains accessible

### Auditor Table Interactions

**Clicking column headers:**
1. Sorts table by that column
2. First click: Ascending order
3. Second click: Descending order
4. Helpful for identifying top/bottom performers

**Sort by Progress:**
- Identifies auditors who are behind or ahead
- Enables workload balancing decisions

**Sort by Match Rate:**
- Highlights accuracy issues
- Identifies training needs

**Row hover:**
- Row may highlight
- Helps track which auditor is being viewed
- Rows are not clickable for further drill-down in this view

### Real-Time Updates

**Modal data refresh:**
- Data may auto-refresh while modal is open
- Progress percentages update
- Completed SKU counts increase
- Provides live operational view

**Manual refresh:**
- Closing and reopening modal fetches latest data
- Alternatively, modal may have a refresh button

## Purpose of Every Action

### Modal Display Purpose

**Detailed Oversight:**
- Supervisors can monitor specific store progress
- HOD can check on critical stores
- Provides transparency into operations
- Enables remote monitoring without physical presence

**Decision Making:**
- See if audit is on track
- Identify if additional resources are needed
- Determine if audit will complete on time

### Store Summary Purpose

**Quick Context:**
- Store ID confirms which store is being viewed
- State helps with geographic context
- Supervisor shows who to contact
- Overall progress shows if intervention is needed

### Metrics Cards Purpose

**Total SKUs & Inventory Value:**
- Indicates audit scope and complexity
- Higher SKU count = longer audit time needed
- Higher value = more financial risk
- Helps assess if resources are adequate

**Audited Count:**
- Shows how much work has been completed
- Confirms progress is being made
- Percentage representation in progress bar

### PIDs Section Purpose

**Operational Detail:**
- PIDs represent physical locations in store
- Knowing total PIDs helps plan audit route
- Pending PIDs shows remaining work
- Ensures complete store coverage

**Progress Tracking:**
- Both SKU-level and PID-level tracking
- Cross-verification of completeness
- Prevents leaving areas unaudited

### Mismatches Section Purpose

**Quality Indicator:**
- Mismatches are discrepancies between physical count and system
- High mismatch count may indicate problems:
  - Theft or shrinkage
  - Poor inventory management
  - System errors
  - Receiving/shipping errors

**Resolution Tracking:**
- Pending mismatches need investigation
- Matched mismatches have been resolved
- Provides closure count

### Deviations Section Purpose

**Financial Impact:**
- Deviations represent value differences
- Pending deviations await approval
- Submitted deviations are ready for review
- Critical for financial accuracy

**Compliance:**
- All deviations must be documented
- Submitted count shows audit thoroughness
- Pending count shows remaining work

### Assigned Auditors Purpose

**Individual Accountability:**
- Named auditors for each portion of work
- Clear ownership and responsibility
- Performance visibility

**Performance Metrics:**
- Progress shows individual speed
- Match Rate shows individual accuracy
- Enables fair performance evaluation

**Workload Balance:**
- See if work is evenly distributed
- Identify if one auditor is overwhelmed
- Make real-time reassignments if needed

**Quality Control:**
- Low match rates trigger immediate feedback
- High match rates identify best practices
- Training needs become apparent

**Completion Forecasting:**
- Based on individual progress rates
- Can estimate overall completion time
- Allows proactive scheduling

### Download Report Purpose

**Documentation:**
- Permanent record of audit status
- Time-stamped snapshot
- Evidence for compliance

**Communication:**
- Share with supervisors not in system
- Include in presentations
- Provide to store managers
- Support improvement discussions

### Close Function Purpose

**Navigation:**
- Return to audit list view
- Check other audits
- Avoid modal staying open inadvertently

**Workflow:**
- Quick check of details
- Return to list
- Check next audit
- Efficient review process

## Visual Documentation

![Store Detail Modal](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/store-detail-modal.png)

*The Store Detail Modal showing comprehensive audit progress including individual auditor performance, inventory metrics, and deviation tracking for a specific store.*


\newpage

# Store PID Allotment Screen

## Table of Contents
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
  - [PID Management:](#pid-management)
  - [Assignment:](#assignment)
  - [Status Tracking:](#status-tracking)
  - [Reassignment:](#reassignment)
  - [Not Assigned Filter:](#not-assigned-filter)
  - [Reassign Filter:](#reassign-filter)
  - [SKU Count Purpose:](#sku-count-purpose)
  - [Status Columns Purpose:](#status-columns-purpose)
  - [Checkbox Disable Logic:](#checkbox-disable-logic)
  - [Bulk Operations Purpose:](#bulk-operations-purpose)
- [Visual Documentation](#visual-documentation)


## When This Screen Appears

This screen appears when:
- User clicks on "Store PID Allotment" in the sidebar navigation
- Used to assign Physical Inventory Display locations (PIDs) to auditors
- Manages audit task distribution within a single store

## Complete UI Breakdown

### Store Header

**Store Identification**
- Store name displayed prominently (e.g., "Chennai Central")
- Subtext: Location and Store ID (e.g., "Tamil Nadu | Store ID: MP001")

**Status Metrics (5 boxes in a row)**
1. Total PIDs: 15 (total locations in store)
2. Assigned: 5 (PIDs allocated to auditors)
3. Unassigned: 10 (PIDs available for assignment)
4. In Progress: 1 (currently being audited)
5. Completed: 1 (finished PIDs)

### PID Management Section

**Section Title**: "PID Management" with icon

**Search and Filter Bar**
- Search field: "Search by PID, description, or auditor..."
  - Filters PIDs as user types
- Filter buttons (3 buttons):
  1. "All PIDs" (default, shows all)
  2. "Not Assigned" (shows only unassigned PIDs)
  3. "Reassign" (shows PIDs that can be reassigned)

**Action Buttons (Top Right)**
- "Assign (0)" button - disabled when no PIDs selected
  - Number shows count of selected PIDs
  - Becomes enabled when checkboxes are checked
- "Bulk Reassign (0)" button - disabled when no PIDs selected
  - Allows reassigning multiple PIDs at once

### PID Table

**Table Columns:**
1. Checkbox (for selection)
2. PID Number (e.g., PID001, PID002)
3. SKU Count (number of products in this location)
4. Description (location code like A1-56, B6-7)
5. Assign Status (Not Assigned / Assigned)
6. Audit Status (Pending / Not Started / In Progress / Completed)
7. Auditor Name (person assigned, or "-" if unassigned)
8. Actions (Reassign button when applicable)

**Sample Rows:**

**PID001** (Assigned, In Progress)
- SKUs: 245
- Description: A1-56
- Status: Assigned, In Progress
- Auditor: Amit Singh
- Checkbox: Disabled (can't reassign while in progress)
- No action button

**PID002** (Not Assigned)
- SKUs: 189
- Description: B6-7
- Status: Not Assigned, Pending
- Auditor: -
- Checkbox: Enabled
- No action button yet

**PID004** (Assigned, Not Started)
- SKUs: 156
- Description: A3-45
- Status: Assigned, Not Started
- Auditor: Priya Reddy
- Checkbox: Enabled
- Action: Reassign button available

**PID009** (Completed)
- SKUs: 198
- Description: C7-12
- Status: Assigned, Completed
- Auditor: Amit Singh
- Checkbox: Disabled (completed work can't be reassigned)
- No action button

## Interaction Behavior

### Filter Buttons

**Clicking "All PIDs":**
- Shows complete PID list
- Button highlights in blue
- Displays all statuses

**Clicking "Not Assigned":**
- Filters to show only unassigned PIDs
- Highlights PIDs needing auditor assignment
- Button highlights in blue

**Clicking "Reassign":**
- Shows PIDs that are assigned but not started
- Allows changing auditor assignments
- Useful for workload rebalancing

### Checkboxes

**Checking a PID checkbox:**
- Row highlights
- Count in "Assign" or "Bulk Reassign" button increases
- Multiple PIDs can be selected

**Select all checkbox (in header):**
- Checks all eligible PIDs
- Disabled PIDs remain unchecked
- Quick way to select multiple PIDs

### Assign Button

**When PIDs are selected:**
1. "Assign (X)" button becomes enabled
2. Number shows count of selected PIDs
3. Clicking button opens assignment dialog

**Assignment dialog contains:**
- List of available auditors
- Option to select auditor
- Confirm button to assign

**After assignment:**
- Selected PIDs update to "Assigned" status
- Auditor name appears in table
- Checkboxes deselect
- Assign button resets to disabled

### Reassign Button (Individual)

**Clicking Reassign button on a row:**
1. Opens reassignment dialog
2. Shows current auditor
3. Lists alternative auditors
4. User selects new auditor
5. Confirms reassignment

**After reassignment:**
- Row updates with new auditor name
- Maintains "Not Started" status
- Work remains in queue

### Bulk Reassign Button

**When multiple assigned PIDs are selected:**
1. Button becomes enabled
2. Clicking opens bulk reassignment dialog
3. Can assign all selected PIDs to one auditor
4. Or distribute among multiple auditors

**Bulk assignment options:**
- Assign all to one person
- Evenly distribute among selected auditors
- Custom distribution

### Search Field

**As user types:**
- Table filters to matching PIDs
- Searches PID number, description, and auditor name
- Results update in real-time

**Empty search:**
- Shows all PIDs (respecting button filters)

## Purpose of Every Action

### PID Management:
- Breaks store into manageable sections
- Each PID represents a physical location (aisle, shelf section, etc.)
- Efficient routing of auditors through store

### Assignment:
- Ensures every location is covered
- Prevents duplicate work
- Balances workload among auditors

### Status Tracking:
- Shows which PIDs are in progress
- Identifies completed work
- Highlights what remains to be done

### Reassignment:
- Adjusts for auditor availability
- Rebalances workload if one auditor is behind
- Responds to changing circumstances

### Not Assigned Filter:
- Quickly identifies unallocated work
- Ensures complete coverage before audit starts
- Highlights planning gaps

### Reassign Filter:
- Shows flexible assignments
- PIDs not yet started can be moved
- Enables workload optimization

### SKU Count Purpose:
- Helps estimate time required for each PID
- Higher SKU count = longer audit time
- Used for fair workload distribution

### Status Columns Purpose:
- Assign Status shows if auditor is allocated
- Audit Status shows actual progress
- Combined view shows complete picture

### Checkbox Disable Logic:
- Can't reassign in-progress work (would disrupt auditor)
- Can't modify completed work (maintains audit integrity)
- Protects audit quality and continuity

### Bulk Operations Purpose:
- Saves time when assigning many PIDs
- Efficient initial allocation
- Quick adjustments for last-minute changes

## Visual Documentation

![Store PID Allotment Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/store-pid-allotment.png)

*The Store PID Allotment screen showing PID assignments, status tracking, and auditor allocation for a specific store's physical inventory locations.*


\newpage

# Supervisor Approvals Screen

## Table of Contents
- [When This Screen Appears](#when-this-screen-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Header and Filters](#header-and-filters)
  - [Summary Metrics Cards](#summary-metrics-cards)
  - [Supervisor Performance Summary Table](#supervisor-performance-summary-table)
- [Interaction Behavior](#interaction-behavior)
  - [Clicking supervisor rows:](#clicking-supervisor-rows)
  - [Search field:](#search-field)
  - [Column sorting:](#column-sorting)
  - [Export Report:](#export-report)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Workload Monitoring:](#workload-monitoring)
  - [Performance Tracking:](#performance-tracking)
  - [Value Oversight:](#value-oversight)
  - [Quality Management:](#quality-management)
- [Visual Documentation](#visual-documentation)


## When This Screen Appears

This screen appears when:
- User clicks on "Supervisor" in the sidebar navigation
- Used to monitor supervisor workload and audit oversight
- Tracks approvals and supervisor performance

## Complete UI Breakdown

### Header and Filters

- Global filter bar remains accessible
- Export Report button for downloading supervisor data

### Summary Metrics Cards

Four cards displaying key metrics:

**Total Supervisors**
- Number: 15
- Shows count of active supervisors

**Total Stores Managed**
- Number: 379
- All stores under supervisor oversight

**Total Audits**
- Number: 876
- Audits supervised across all supervisors

**Total Value**
- Number: ₹130.91 Cr
- Total inventory value supervised

### Supervisor Performance Summary Table

**Table Title**: "Supervisor Performance Summary"
**Subtitle**: "Click on any supervisor to view detailed performance metrics"

**Search Field**
- Placeholder: "Search by supervisor name..."
- Filters table in real-time

**Table Columns:**
1. ID (e.g., S001, S002)
2. Name (supervisor name)
3. Stores Managed (count)
4. Total Audits (count)
5. Days Supervised (total days)
6. Auditors Supervised (count)
7. Total SKUs (audited)
8. Total Value (inventory value)
9. Actions (empty column)

**Sample Data:**
- S001 Aditya Reddy: 26 stores, 53 audits, 206 days, 39 auditors, 10.17 L SKUs, ₹8.13 Cr
- S002 Srinivas Rao: 26 stores, 54 audits, 223 days, 40 auditors, 8.32 L SKUs, ₹8.79 Cr
- S004 Praveen Chowdary: 27 stores, 71 audits, 283 days, 40 auditors, 12.98 L SKUs, ₹10.22 Cr

## Interaction Behavior

### Clicking supervisor rows:
- Opens Supervisor Detail Modal (if implemented)
- Shows stores managed by this supervisor
- Displays auditor teams under their supervision
- Shows approval history and pending items

### Search field:
- Filters supervisors by name or ID
- Updates table instantly

### Column sorting:
- Sort by Stores Managed to see workload distribution
- Sort by Total Value to see responsibility levels
- Sort by Audits to see activity levels

### Export Report:
- Downloads complete supervisor performance data
- Includes all visible columns
- Respects active filters

## Purpose of Every Action

### Workload Monitoring:
- Ensures even distribution of stores across supervisors
- Identifies overloaded or underutilized supervisors
- Supports resource reallocation

### Performance Tracking:
- Days supervised shows experience and availability
- Audits count shows throughput
- Auditors supervised shows span of control

### Value Oversight:
- Higher value indicates greater responsibility
- Helps determine appropriate compensation
- Shows trust and capability level

### Quality Management:
- Supervisors approve audit results
- Track approval speed and accuracy
- Ensure proper oversight of audit quality

## Visual Documentation

![Supervisor Approvals Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/supervisor-approvals.png)

*The Supervisor Approvals screen showing workload distribution, performance metrics, and oversight statistics for all supervisors.*


\newpage

# Total Stores - Details Screen

## Table of Contents
- [When This Screen Appears](#when-this-screen-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Header Section](#header-section)
  - [Global Filter Bar](#global-filter-bar)
  - [Search and Filter Section](#search-and-filter-section)
  - [Data Table](#data-table)
  - [Sample Data Rows](#sample-data-rows)
  - [Table Features](#table-features)
- [Interaction Behavior (Step-by-Step)](#interaction-behavior-step-by-step)
  - [Back Button](#back-button)
  - [Export Report Button](#export-report-button)
  - [Search Field](#search-field)
  - [State Dropdown Filter](#state-dropdown-filter)
  - [Store Type Filter Field](#store-type-filter-field)
  - [Reset Button](#reset-button)
  - [Table Column Headers](#table-column-headers)
  - [Table Rows](#table-rows)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Back Button Purpose](#back-button-purpose)
  - [Export Report Purpose](#export-report-purpose)
  - [Search Functionality Purpose](#search-functionality-purpose)
  - [Filter Purpose](#filter-purpose)
  - [Reset Function Purpose](#reset-function-purpose)
  - [Sorting Purpose](#sorting-purpose)
  - [Column Data Purpose](#column-data-purpose)
- [Visual Documentation](#visual-documentation)


## When This Screen Appears

This screen appears when:
- User clicks on the "Total Stores" card on the main dashboard
- User clicks "Click for details" link on the Total Stores summary card
- The screen displays detailed information about all stores in the system

The screen is accessible from the Store Coverage dashboard and shows comprehensive store-level data.

## Complete UI Breakdown

### Header Section

**Back Button**
- Blue left arrow with "Back" text
- Located at top left of content area
- Returns user to Store Coverage dashboard

**Page Title**
- "Total Stores" displayed prominently
- Indicates user is viewing the complete store list

**Record Counter**
- Shows "Showing X of Y records"
- Example: "Showing 10 of 10 records"
- Updates based on filters and search results

**Export Report Button**
- Green button with download icon
- Located at top right
- Text: "Export Report"
- Provides dropdown options when clicked

### Global Filter Bar

The filter bar from the main dashboard remains visible at the top:
- Financial year, State, Store, Audit Job Type, Process Type, Audit Status
- All filters continue to work and affect the data displayed in the table

### Search and Filter Section

**Search Field**
- Placeholder text: "Search across all fields..."
- Located at left of filter row
- Searches through all columns: Store ID, name, city, state, etc.
- Updates results in real-time as user types

**State Dropdown Filter**
- Default: "All States"
- Options include: Tamil Nadu, Karnataka, Telangana, Maharashtra, Delhi, Gujarat, West Bengal, Madhya Pradesh
- Filters table to show only stores in selected state

**Store Type Filter Field**
- Placeholder: "Filter by store..."
- Free-text input field
- Filters stores by name or store type (HUB, REGULAR)

**Reset Button**
- Circular arrow icon with "Reset" text
- Clears all search and filter inputs
- Returns table to show all stores

### Data Table

The table contains the following columns from left to right:

**STORE ID**
- Unique identifier for each store
- Format: MP### (e.g., MP001, MP002)
- Allows quick reference and lookup

**CITY**
- City where store is located
- Examples: Chennai, Bangalore, Hyderabad
- Helps identify geographic location

**STORE NAME**
- Full name of the store
- Examples: "Chennai Central", "Bangalore Hub", "Hyderabad Main"
- Identifies specific location within city

**STATE**
- State where store operates
- Examples: Tamil Nadu, Karnataka, Telangana
- Used for regional analysis

**STORE TYPE**
- Classification of store
- Values: "HUB" or "REGULAR"
- HUB stores typically have higher volume and complexity

**BOX TYPE**
- Indicates storage system used
- Values: "DYNAMIC" or "REGULAR"
- DYNAMIC suggests automated or flexible storage systems

**STORE CREATED DATE**
- Date when store was added to system
- Format: YYYY-MM-DD (e.g., 2020-01-15)
- Helps track store age and maturity

**LAST AUDITED DATE**
- Date of most recent audit completion
- Format: YYYY-MM-DD (e.g., 2024-11-15)
- Critical for assessing audit recency

**STATUS**
- Current operational status
- Displayed as colored badge: "Active" in green
- Inactive stores would show different color (if any exist)

**SKUS (count)**
- Number of unique product types (Stock Keeping Units)
- Numeric value (e.g., 4200, 3900)
- Indicates store size and complexity

**QUANTITY (units)**
- Total number of individual product units
- Large numbers (e.g., 385000, 425000)
- Represents inventory volume

**INVENTORY VALUE MRP (₹)**
- Total value of inventory at Maximum Retail Price
- Displayed in Indian Rupees
- Format: ₹###,### (e.g., ₹125,000, ₹198,000)
- Represents financial value at risk

### Sample Data Rows

The table shows stores including:

**MP001 - Chennai Central**
- City: Chennai
- State: Tamil Nadu
- Type: HUB / DYNAMIC
- Created: 2020-01-15
- Last Audited: 2024-11-15
- Status: Active
- SKUs: 4200
- Quantity: 385000 units
- Value: ₹125,000

**MP002 - Bangalore Hub**
- City: Bangalore
- State: Karnataka
- Type: HUB / DYNAMIC
- Created: 2019-08-20
- Last Audited: 2024-11-20
- Status: Active
- SKUs: 3900
- Quantity: 425000 units
- Value: ₹198,000

**MP003 - Hyderabad Main**
- City: Hyderabad
- State: Telangana
- Type: REGULAR / REGULAR
- Created: 2020-03-12
- Last Audited: 2024-10-28
- Status: Active
- SKUs: 5200
- Quantity: 498000 units
- Value: ₹167,000

### Table Features

**Scrolling**
- Table scrolls horizontally if columns don't fit screen width
- Table scrolls vertically to show all stores
- Headers remain visible when scrolling vertically

**Row Highlighting**
- Rows may highlight on hover
- Helps user track which row they're viewing

## Interaction Behavior (Step-by-Step)

### Back Button

**On click:**
1. Screen transitions back to Store Coverage dashboard
2. User returns to the main dashboard view
3. All dashboard filters remain as previously set
4. Dashboard data refreshes if any changes occurred

### Export Report Button

**On click:**
1. Dropdown menu appears with export options
2. Options likely include: PDF, Excel, CSV formats
3. User selects desired format

**After selecting format:**
1. Export process begins
2. Loading indicator may appear
3. File downloads to user's computer
4. File contains all visible table data (respecting current filters)
5. File name includes date and "Total_Stores" identifier

### Search Field

**When user types:**
1. Results filter instantly with each keystroke
2. Table updates to show only matching records
3. Record counter updates to show: "Showing X of Y records"
4. Matches can occur in any column

**Search behavior:**
- Case-insensitive search
- Searches across Store ID, City, Store Name, State
- Partial matches are included
- Empty search shows all records

### State Dropdown Filter

**On click:**
1. Dropdown expands showing state options
2. Current selection is highlighted

**When selecting a state:**
1. Dropdown closes
2. Table filters to show only stores in selected state
3. Record counter updates
4. Can be combined with search field

**When selecting "All States":**
1. State filter is removed
2. Table shows stores from all states
3. Other active filters continue to apply

### Store Type Filter Field

**When typing:**
1. Table filters as user types
2. Filters based on store name or store type
3. Can narrow results to specific store patterns
4. Works in combination with other filters

### Reset Button

**On click:**
1. Search field clears
2. State dropdown resets to "All States"
3. Store type filter field clears
4. Table returns to showing all stores
5. Record counter shows total count
6. Global filters (top bar) remain unchanged

### Table Column Headers

**When clicking column headers:**
1. Table sorts by that column
2. First click: Ascending order (A-Z or lowest-highest)
3. Second click: Descending order (Z-A or highest-lowest)
4. Third click: Returns to default order
5. Arrow icon appears next to sorted column name

**Sortable columns include:**
- Store ID (alphanumeric)
- City (alphabetical)
- Store Name (alphabetical)
- State (alphabetical)
- Last Audited Date (chronological)
- SKUs (numerical)
- Quantity (numerical)
- Inventory Value (numerical)

### Table Rows

**On hover:**
- Row background may change slightly
- Helps user identify which row they're viewing
- Cursor remains as default (not clickable)

**No click action:**
- Individual rows are not clickable in this view
- Data is displayed for viewing only
- To access more details, users must use Export function or return to dashboard

## Purpose of Every Action

### Back Button Purpose

**Business Need:**
- Allows quick navigation back to executive dashboard
- Enables managers to view details then return to overview
- Supports iterative exploration: dashboard → details → dashboard → different details

**User Workflow:**
- View overall store count on dashboard
- Drill into Total Stores for details
- Verify specific stores
- Return to dashboard to check other metrics

### Export Report Purpose

**Business Need:**
- Creates permanent record of store status at specific point in time
- Enables offline analysis and reporting
- Allows sharing with stakeholders who don't have system access
- Supports compliance and audit documentation requirements

**Use Cases:**
- Monthly management reports
- Board presentations
- Audit trail documentation
- Store expansion planning
- Comparative analysis over time

### Search Functionality Purpose

**Business Need:**
- Rapid location of specific stores
- Verification of store data without scrolling
- Quick lookup during phone conversations or meetings

**Use Cases:**
- "Is store MP025 in our system?"
- "What's the status of our Chennai stores?"
- "When was Hyderabad Main last audited?"

### Filter Purpose

**State Filter:**
- Regional managers focus on their territory
- Compare performance across states
- Identify state-specific patterns or issues

**Store Type Filter:**
- Distinguish HUB operations from regular stores
- Analyze different store models separately
- Plan resources based on store characteristics

### Reset Function Purpose

**Business Need:**
- Quick way to clear complex filter combinations
- Prevents user from manually clearing multiple fields
- Ensures clean slate for new search

**Prevents Errors:**
- Users might forget which filters are active
- Hidden filters could confuse results
- Reset provides known starting point

### Sorting Purpose

**Business Need:**
- Identify stores with oldest audit dates (need immediate attention)
- Find stores with highest inventory value (higher risk)
- Locate stores with most SKUs (complexity indicators)
- Alphabetically browse stores by name or location

**Decision Making:**
- Sort by Last Audited Date to prioritize upcoming audits
- Sort by Inventory Value to focus on high-value stores
- Sort by SKUs to identify most complex stores

### Column Data Purpose

**Store ID:**
- Unique identifier prevents confusion between similarly named stores
- Used in all system communications and reports
- Critical for data integrity

**Geographic Information (City, State):**
- Resource planning and logistics
- Regional performance analysis
- Travel and scheduling optimization for auditors

**Store Type & Box Type:**
- Determines audit approach and duration
- HUB stores may require more auditors
- DYNAMIC systems may need specialized training

**Created Date:**
- Newer stores may need more frequent early audits
- Helps assess store maturity and stability
- Identifies recent additions to network

**Last Audited Date:**
- Most critical metric for audit planning
- Identifies overdue audits
- Ensures compliance with audit frequency requirements
- Red flag if too much time has elapsed

**Status:**
- Confirms store is operational
- Inactive stores shouldn't appear in active audit plans
- Helps maintain data accuracy

**SKUs:**
- Indicates audit complexity and duration
- More SKUs = longer audit time
- Helps estimate auditor workload

**Quantity:**
- Represents volume of inventory
- Higher quantities may indicate higher risk
- Affects theft prevention and shrinkage concerns

**Inventory Value:**
- Financial exposure and risk
- Higher value stores need more attention
- Supports insurance and security planning
- Critical for loss prevention focus

## Visual Documentation

![Total Stores Details Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/total-stores-details.png)

*The detailed view showing all stores in a searchable, filterable table format. Each row represents a complete store record with key operational metrics.*


\newpage

# Audit Details Modal Documentation

## Table of Contents
- [Overview](#overview)
- [How to Access](#how-to-access)
- [On-Screen Summary Components](#on-screen-summary-components)
  - [Header Section (Hero Card)](#header-section-hero-card)
  - [Re-Audit Summary Section](#re-audit-summary-section)
  - [Participating Auditors Section](#participating-auditors-section)
- [Download Functionality](#download-functionality)
  - [Accessing Downloads](#accessing-downloads)
  - [Excel Export](#excel-export)
  - [PDF Export](#pdf-export)
- [Data Interpretation](#data-interpretation)
  - [Understanding Re-Audit Metrics](#understanding-re-audit-metrics)
  - [Interpreting Auditor Performance](#interpreting-auditor-performance)
- [Use Cases](#use-cases)
  - [When to View Audit-Specific Summary](#when-to-view-audit-specific-summary)
  - [When to Download](#when-to-download)
- [Technical Notes](#technical-notes)
  - [Data Aggregation](#data-aggregation)
  - [Modal Behavior](#modal-behavior)
  - [Styling Features](#styling-features)
- [Best Practices](#best-practices)
  - [For Audit Managers](#for-audit-managers)
  - [For Supervisors](#for-supervisors)
  - [For Store Managers](#for-store-managers)
- [Common Questions](#common-questions)
- [Related Documentation](#related-documentation)


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


\newpage

# Auditor Details Modal Documentation

## Table of Contents
- [Overview](#overview)
- [How to Access](#how-to-access)
- [On-Screen Summary Components](#on-screen-summary-components)
  - [Header Section](#header-section)
  - [Key Performance Metrics (Top Cards)](#key-performance-metrics-top-cards)
  - [Deviation Summary Section](#deviation-summary-section)
  - [Audit History Table](#audit-history-table)
- [Download Functionality](#download-functionality)
  - [Accessing Downloads](#accessing-downloads)
  - [Excel Export](#excel-export)
  - [PDF Export](#pdf-export)
- [Performance Indicators](#performance-indicators)
  - [Key Metrics Explained](#key-metrics-explained)
- [Use Cases](#use-cases)
  - [When to View Auditor Summary](#when-to-view-auditor-summary)
  - [When to Download](#when-to-download)
- [Data Interpretation](#data-interpretation)
  - [Understanding Deviation Patterns](#understanding-deviation-patterns)
  - [Status Indicators](#status-indicators)
- [Technical Notes](#technical-notes)
  - [Date Filtering Behavior](#date-filtering-behavior)
  - [Data Aggregation](#data-aggregation)
  - [Sorting Options](#sorting-options)
- [Best Practices](#best-practices)
  - [For Audit Managers](#for-audit-managers)
  - [For Supervisors](#for-supervisors)
  - [For Auditors (Self-Review)](#for-auditors-self-review)
- [Common Questions](#common-questions)
- [Related Documentation](#related-documentation)


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

- See **supervisor-modal.md** for supervisor oversight metrics
- See **audit-modal.md** for individual audit breakdowns
- See **store-modal.md** for store-level details
- See **USER_GUIDE.md** (Tab 3 section) for complete auditor performance workflows


\newpage

# Store Detail Modal Documentation

## Table of Contents
- [Overview](#overview)
- [How to Access](#how-to-access)
- [On-Screen Modal Components](#on-screen-modal-components)
  - [Store Information Header](#store-information-header)
  - [Mini Dashboard KPIs](#mini-dashboard-kpis)
  - [Assigned Auditors Table](#assigned-auditors-table)
  - [Deviations Breakdown](#deviations-breakdown)
  - [Contra Summary](#contra-summary)
- [User Interface Indicators](#user-interface-indicators)
  - [Visual Cues](#visual-cues)
  - [Progress Indicators](#progress-indicators)
- [Modal Behavior](#modal-behavior)
  - [Opening and Closing](#opening-and-closing)
  - [Responsive Design](#responsive-design)
- [Data Interpretation](#data-interpretation)
  - [Understanding Store Progress](#understanding-store-progress)
  - [Analyzing Auditor Performance](#analyzing-auditor-performance)
  - [Deviation Patterns](#deviation-patterns)
- [Use Cases](#use-cases)
  - [For Supervisors](#for-supervisors)
  - [For Audit Managers](#for-audit-managers)
  - [For Store Managers](#for-store-managers)
- [Technical Notes](#technical-notes)
  - [Data Refresh](#data-refresh)
  - [Performance Considerations](#performance-considerations)
  - [Mock Data](#mock-data)
- [Best Practices](#best-practices)
  - [For Daily Operations](#for-daily-operations)
  - [For Quality Assurance](#for-quality-assurance)
  - [For Efficiency](#for-efficiency)
- [Accessibility Features](#accessibility-features)
- [Browser Support](#browser-support)
- [Related Documentation](#related-documentation)
- [Future Enhancements](#future-enhancements)


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


\newpage

# Supervisor Details Modal Documentation

## Table of Contents
- [Overview](#overview)
- [How to Access](#how-to-access)
- [On-Screen Summary Components](#on-screen-summary-components)
  - [Header Section](#header-section)
  - [Key Performance Metrics (Top Cards)](#key-performance-metrics-top-cards)
  - [Deviation Summary Section](#deviation-summary-section)
  - [Audit History Table](#audit-history-table)
- [Download Functionality](#download-functionality)
  - [Accessing Downloads](#accessing-downloads)
  - [Excel Export](#excel-export)
  - [PDF Export](#pdf-export)
- [Use Cases](#use-cases)
  - [When to View Supervisor Summary](#when-to-view-supervisor-summary)
  - [When to Download](#when-to-download)
- [Data Interpretation](#data-interpretation)
  - [Understanding Deviation Metrics](#understanding-deviation-metrics)
  - [Status Indicators](#status-indicators)
- [Technical Notes](#technical-notes)
  - [Date Filtering Behavior](#date-filtering-behavior)
  - [Data Aggregation](#data-aggregation)
  - [Performance Considerations](#performance-considerations)
- [Best Practices](#best-practices)
  - [For Audit Managers](#for-audit-managers)
  - [For Supervisors](#for-supervisors)
- [Related Documentation](#related-documentation)


## Overview

The Supervisor Summary provides a comprehensive view of a supervisor's audit oversight activities, performance metrics, and workload. This summary is accessible by clicking on any supervisor card from the "Supervisor Approvals & Workload" tab in the audit dashboard.

## How to Access

1. Navigate to the **Supervisor Approvals & Workload** tab (4th tab in the dashboard)
2. Locate the supervisor card you want to review
3. Click on the supervisor card to open the detailed summary modal

## On-Screen Summary Components

### Header Section

**Supervisor Information:**
- **Supervisor Name**: Display name of the supervisor (e.g., "Aditya Reddy")
- **Supervisor ID**: Unique identifier (e.g., "S001")
- **Download Report Button**: Dropdown menu with Excel and PDF export options
- **Date Range Filters**: 
  - "From" date picker (default: 1 year ago, e.g., 2024-12-19)
  - "To" date picker (default: today, e.g., 2025-12-19)
  - Date range cannot exceed 1 year
  - Validation prevents "From" date being after "To" date

### Key Performance Metrics (Top Cards)

Six primary KPI cards displaying:

1. **Total Audits**
   - Count: 15 (unique audits supervised within the selected date range)
   - Displayed with a gradient blue background
   - Icon: Clipboard list

2. **Auditors Supervised**
   - Count: 27 (number of auditors overseen)
   - Shows supervisor's team size

3. **Days Supervised**
   - Count: 60 (distinct days actively overseeing audits)
   - Calculated from day-wise summary data

4. **Total PIDs**
   - Count: 70,251 (Product IDs/Batch IDs across all supervised audits)
   - Formatted with comma separators

5. **Total SKUs**
   - Count: 3.40 L (Stock Keeping Units supervised)
   - Formatted with Indian number notation (Lakhs)

6. **Total Value**
   - Value: ₹44.50 Cr (Total audited value in Indian Rupees)
   - Formatted with Indian number notation (Crores)

### Deviation Summary Section

Displays aggregated deviation metrics across all supervised audits:

**Appeared Deviations (Blue Border)**
- SKUs: 32,149
- Qty: 5.73 L
- Value: ₹2.13 Cr
- Total count of items with appeared deviations

**Matched Deviations (Green Border)**
- SKUs: 29,953
- Qty: 5.34 L
- Value: ₹1.98 Cr
- Items where initial deviation was confirmed as correct

**Revised Deviations (Yellow Border)**
- SKUs: 2,196
- Qty: 38,456
- Value: ₹14.90 L
- Items that required correction by supervisor

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

- See **audit-modal.md** for detailed audit breakdowns
- See **auditor-modal.md** for auditor performance metrics
- See **USER_GUIDE.md** (Tab 4 section) for complete supervisor approval workflows

