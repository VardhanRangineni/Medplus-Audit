# Audit HOD Dashboard - Functional Specification Document

## Document Information
- **Version:** 1.0
- **Date:** December 10, 2025
- **Author:** Senior UI/UX Designer & Business Analyst
- **Project:** MedPlus Audit Management System

---

## 1. Executive Summary

The Audit HOD Dashboard is a comprehensive web-based application designed to provide Head of Department level users with real-time visibility into audit operations, store coverage, inventory deviations, auditor productivity, and supervisor approvals. The dashboard enables data-driven operational decisions and reduces dependency on manual reporting.

---

## 2. System Architecture

### 2.1 Technology Stack
- **Frontend:** React 19.2.0 with functional components and hooks
- **UI Framework:** Bootstrap 5 via React-Bootstrap
- **Data Visualization:** Recharts library
- **Icons:** Font Awesome
- **Build Tool:** Vite
- **State Management:** React useState/useEffect (upgradable to Redux)

### 2.2 Component Architecture
```
App Component (Root)
├── GlobalHeader (Persistent)
│   ├── Filter Controls
│   ├── Refresh Controls
│   └── Export Indicator
└── Tab Container
    ├── Tab 1: StoreCoverage
    ├── Tab 2: LiveAuditSchedule
    ├── Tab 3: AuditorPerformance
    └── Tab 4: SupervisorApprovals

Shared Components:
├── KPICard (Reusable metric display)
└── DrillDownModal (Interactive data grid)
```

---

## 3. Detailed Feature Specifications

### 3.1 Global Header & Filters

#### 3.1.1 Filter Panel
**Location:** Top of screen, persistent across all tabs

**Filter Fields:**
1. **Financial Year** (Mandatory)
   - Type: Dropdown
   - Values: 2024-25, 2023-24, 2022-23
   - Default: Current financial year
   - Validation: Required field

2. **State**
   - Type: Multi-select dropdown
   - Values: All States, TN, KA, AP, TS, KL
   - Default: All States
   - Behavior: Cascades to Store filter

3. **Store**
   - Type: Multi-select dropdown
   - Values: Dynamically loaded based on State selection
   - Default: All Stores
   - Format: Store Code - Store Name

4. **Audit Job Type**
   - Type: Dropdown
   - Values: All Types, Full Audit, Partial Audit
   - Default: All Types

5. **Audit Process Type**
   - Type: Dropdown
   - Values: All Processes, Product, Batch
   - Default: All Processes

6. **Audit Status**
   - Type: Multi-select dropdown
   - Values: All, Created, In Progress, Pending, Completed
   - Default: All Statuses

#### 3.1.2 System Controls
- **Last Refreshed Timestamp**
  - Format: DD-MMM-YYYY HH:MM:SS
  - Updates on: Page load, manual refresh, filter change
  
- **Refresh Now Button**
  - Action: Fetches latest data from backend
  - Visual feedback: Loading spinner during refresh
  - Cooldown: 5 seconds to prevent excessive requests

- **Export Indicator**
  - Type: Badge with info icon
  - Message: "All list and drill-down views support Export to Excel"
  - Position: Bottom of filter panel

#### 3.1.3 Filter Behavior
- Filters apply across ALL tabs simultaneously
- Filter changes trigger data refresh for active tab
- Background tabs refresh data when activated
- Filter state persists during session (session storage)
- "Reset Filters" option to clear all selections

---

### 3.2 Tab 1: Store Coverage & Inventory Metrics

#### 3.2.1 KPI Summary Cards (Top Section)

**Card 1: Total Active Stores**
- **Display:** Absolute count (e.g., 450)
- **Icon:** Store icon (fas fa-store)
- **Color:** Primary blue
- **Interactivity:** Clickable
- **Drill-down:** Opens modal with complete store list
  - Columns: Store ID, Store Name, State, Region, Active Since
  - Sortable: All columns
  - Exportable: Yes

**Card 2: Covered Stores**
- **Display:** Count + Percentage (e.g., "385" with subtitle "85.6% of total")
- **Icon:** Check circle icon
- **Color:** Success green
- **Interactivity:** Clickable
- **Drill-down:** Opens modal with covered stores list
  - Columns: Store ID, Store Name, Last Audit Date, Days Since Audit, Audit Status
  - Sortable: All columns
  - Filters: Date range, audit status
  - Exportable: Yes

**Card 3: Uncovered Stores**
- **Display:** Count + Percentage (e.g., "65" with subtitle "14.4% of total")
- **Icon:** Warning icon
- **Color:** Danger red
- **Interactivity:** Clickable
- **Drill-down:** Opens modal with uncovered stores list
  - Columns: Store ID, Store Name, Last Audit Date, Days Since Audit, Priority
  - Highlight: Rows with >90 days since last audit
  - Sortable: All columns
  - Exportable: Yes

#### 3.2.2 Store Recency Analysis

**Visualization Type:** Horizontal Bar Chart

**Data Buckets:**
- 0-3 Months: Stores audited within 90 days
- 3-6 Months: Stores audited 91-180 days ago
- 6-9 Months: Stores audited 181-270 days ago
- 9-12 Months: Stores audited 271-365 days ago

**Display Elements:**
- X-axis: Number of stores
- Y-axis: Time ranges
- Bar labels: Store count + percentage
- Color coding: Gradient from green (recent) to red (old)

**Interactivity:**
- Click any bar to open drill-down modal
- Modal shows: List of stores in that time bucket
- Columns: Store ID, Name, Last Audit Date, Exact Days, Assigned Supervisor

**Business Rules:**
- Stores >365 days are flagged as "Critical - Overdue"
- Color coding: Green (<90), Yellow (90-180), Orange (180-270), Red (>270)

#### 3.2.3 Inventory Summary Cards

**Card 1: Total SKUs**
- **Display:** Count with thousand separator (e.g., "12,450")
- **Subtitle:** "Across all covered stores"
- **Icon:** Box icon
- **Color:** Info blue
- **Non-clickable** (aggregate metric)

**Card 2: Total Quantity**
- **Display:** Count with thousand separator (e.g., "245,600")
- **Subtitle:** "Units in inventory"
- **Icon:** Cubes icon
- **Color:** Warning yellow
- **Non-clickable** (aggregate metric)

**Card 3: Total Inventory Value**
- **Display:** Currency with Lakh/Crore notation (e.g., "₹34.57L")
- **Subtitle:** "Aggregate value"
- **Icon:** Rupee icon
- **Color:** Success green
- **Non-clickable** (aggregate metric)

**Calculation Logic:**
- SKUs: Distinct count of Product IDs across covered stores
- Quantity: Sum of all quantities
- Value: Sum of (Quantity × Unit Price) for all SKUs

#### 3.2.4 Deviation Breakdown

**Left Panel: Pie Chart**
- **Visualization:** Interactive pie chart
- **Segments:** 8 segments (Private/Non-Private × 4 deviation types)
- **Label Format:** "Type: ₹XXK" on each segment
- **Colors:** Distinct colors for each segment
- **Tooltip:** Shows count, quantity, and value on hover
- **Click Behavior:** Opens SKU-level drill-down

**Right Panel: Deviation List**
- **Format:** Scrollable list of deviation cards
- **Each Card Shows:**
  - Deviation Type (e.g., "Private - Contra Short")
  - Item count (e.g., "178 items")
  - Total value (e.g., "₹32,000")
  - Arrow icon for drill-down
- **Sorting:** By value (highest to lowest)
- **Hover Effect:** Border highlight + slight elevation

**Drill-Down Modal (SKU Level):**
- **Columns:**
  - Store ID, Store Name
  - SKU Code, Product Name
  - Quantity Deviation
  - Value Impact (₹)
  - Deviation Type
  - Date Identified
  - Current Status
- **Filters:** Store, Date range, Value threshold
- **Export:** Excel with all visible columns

---

### 3.3 Tab 2: Live Audit Schedule & Status

#### 3.3.1 Audit Workflow Tiles

**Four Status Tiles (KPI Cards):**

**Tile 1: Created**
- **Count:** Number of audits created but not started
- **Icon:** File icon
- **Color:** Secondary gray
- **Subtitle:** "Not started"
- **Click:** Opens list of created audits

**Tile 2: In Progress**
- **Count:** Number of actively running audits
- **Icon:** Spinner icon
- **Color:** Primary blue
- **Subtitle:** "Actively running"
- **Click:** Opens list of in-progress audits
- **Badge:** Shows count of audits >7 days old

**Tile 3: Pending**
- **Count:** Number of audits waiting for action
- **Icon:** Pause icon
- **Color:** Warning yellow
- **Subtitle:** "Awaiting action"
- **Click:** Opens list of pending audits
- **Highlight:** Audits pending >48 hours

**Tile 4: Completed**
- **Count:** Number of finalized audits
- **Icon:** Check circle icon
- **Color:** Success green
- **Subtitle:** "Finalized"
- **Click:** Opens list of completed audits (last 30 days)

#### 3.3.2 Detailed Audit Table

**Table Columns:**

1. **Store ID**
   - Format: Badge with monospace font
   - Sortable: Yes

2. **Store Name**
   - Format: Bold text
   - Sortable: Alphabetically

3. **Assigned Supervisor**
   - Format: Name with user icon
   - Sortable: Yes
   - Filter: Dropdown of supervisors

4. **Assigned Auditors**
   - Format: Count badge + comma-separated names
   - Example: "3 Amit, Priya, Suresh"
   - Sortable: By count

5. **Audit Start Date**
   - Format: DD-MMM-YYYY with calendar icon
   - Sortable: Yes (default: newest first)

6. **Audit Progress**
   - Format: Progress bar with percentage label
   - Shows: Completed SKUs / Total SKUs
   - Color: Green (≥80%), Yellow (60-79%), Red (<60%)
   - Example: "3,250 / 4,200 SKUs" + 77.4% progress bar

**Table Behavior:**
- Pagination: 10 rows per page
- Infinite scroll option
- Row hover: Slight background color change
- Row click: Opens Live Audit Progress drill-down
- Auto-refresh: Every 2 minutes for "In Progress" audits

#### 3.3.3 Live Audit Drill-Down

**Triggered By:** Clicking any row in Audit Table

**Modal Layout:**

**Top Section - Store Summary:**
- Store Name + ID
- Supervisor Name
- Audit Start Date + Days Running
- Overall Progress: Large progress bar
- Total vs Completed SKUs
- Total vs Completed Inventory Value

**Bottom Section - Auditor-wise Breakdown Table:**

**Columns:**
1. Auditor Name
2. Assigned SKUs
3. Completed SKUs
4. Completion % (with progress bar)
5. Value Covered (₹)
6. Current Status (Active/Break/Offline)
7. Last Activity Timestamp

**Color Coding:**
- Green badge: Completion ≥80%
- Yellow badge: Completion 60-79%
- Red badge: Completion <60%

**Real-time Updates:**
- Refresh button in modal
- Auto-refresh every 30 seconds
- Visual indicator when data updates

**Export Option:**
- Excel export with summary + auditor breakdown
- PDF report with charts

---

### 3.4 Tab 3: Auditor Performance & Productivity

#### 3.4.1 Performance Summary Cards

**Card 1: Average Time per SKU**
- **Display:** Time in minutes (e.g., "4.2 min")
- **Subtitle:** "Productivity efficiency"
- **Icon:** Clock icon
- **Calculation:** Total time spent / Total SKUs completed
- **Benchmark:** Green if <5 min, Yellow if 5-7 min, Red if >7 min

**Card 2: Match Rate**
- **Display:** Percentage (e.g., "94.5%")
- **Subtitle:** "Accuracy vs re-audit"
- **Icon:** Bullseye icon
- **Calculation:** (Matched counts / Total re-audited counts) × 100
- **Benchmark:** Green if ≥93%, Yellow if 90-92%, Red if <90%

**Card 3: Edit Rate**
- **Display:** Percentage (e.g., "8.3%")
- **Subtitle:** "Quality indicator"
- **Icon:** Edit icon
- **Calculation:** (Edited entries / Total entries) × 100
- **Benchmark:** Green if ≤10%, Yellow if 10-15%, Red if >15%
- **Note:** Lower is better

#### 3.4.2 Productivity Summary Table

**Table Columns:**

1. **Auditor ID**
   - Format: Badge (e.g., "AUD001")

2. **Auditor Name**
   - Format: Name with user icon
   - Sortable: Alphabetically

3. **Allotted SKUs**
   - Format: Number with comma separator
   - Sortable: Yes

4. **Completed SKUs**
   - Format: Bold number in primary color
   - Sortable: Yes (default sort)

5. **Completion %**
   - Format: Progress bar + badge
   - Width: 200px for progress bar
   - Shows: Percentage value
   - Color: Dynamic based on performance

6. **Avg Time/SKU**
   - Format: Badge with time (e.g., "4.1 min")
   - Color: Green (<4.5), Yellow (4.5-6), Red (>6)

7. **Match Rate %**
   - Format: Badge with percentage
   - Color: Green (≥93), Red (<93)

8. **Edit Rate %**
   - Format: Badge with percentage
   - Color: Green (≤10), Red (>10)

9. **Actions**
   - Format: Chevron icon
   - Action: Opens PID Workload drill-down

**Table Features:**
- Search: Filter by auditor name
- Sort: All columns sortable
- Pagination: 20 auditors per page
- Highlight: Top 3 performers in light green background

#### 3.4.3 Auditor Drill-Down (PID Workload View)

**Triggered By:** Clicking any auditor row

**Modal Title:** "{Auditor Name} ({Auditor ID}) - PID Workload View"

**Table Columns:**

1. **PID (Product/Batch ID)**
   - Format: Monospace code

2. **Product Name**
   - Format: Text with truncation if >40 chars

3. **Assigned Qty**
   - Format: Number

4. **Completed Qty**
   - Format: Number
   - Highlight: Red if 0 and assigned >24 hours ago

5. **Time Spent**
   - Format: HH:MM or "X min"

6. **Status**
   - Format: Badge
   - Values: Completed (green), In Progress (blue), Pending (yellow)

7. **Deviations**
   - Format: Number
   - Highlight: Yellow if >0

8. **Delay**
   - Format: Badge
   - Values: "On Time" (green), "X hours delayed" (red)
   - Logic: Compare actual time vs estimated time

**Sorting:**
- Default: By delay (longest delayed first)
- Purpose: Quickly identify bottlenecks

**Filters:**
- Status: All, Completed, In Progress, Pending
- Deviations: All, With Deviations, No Deviations
- Delay: All, On Time, Delayed

#### 3.4.4 Performance Insights

**Left Card - Top Performers:**
- Shows: Top 3 auditors by completion rate
- Format: Numbered list with badges
- Color: Success green
- Display: Name + Completion %

**Right Card - Needs Attention:**
- Shows: Bottom 3 auditors by completion rate
- Format: Numbered list with badges
- Color: Warning yellow
- Display: Name + Completion %
- Purpose: Identify auditors needing support/training

---

### 3.5 Tab 4: Supervisor Approvals & Re-audit

#### 3.5.1 Supervisor Summary Cards

**Card Design:**
- Interactive cards (4 per row on desktop)
- Hover effect: Elevation + shadow
- Click: Opens supervisor's managed stores list

**Each Card Contains:**

**Header Section:**
- Supervisor ID (badge)
- Supervisor Name
- Shield icon (watermark)

**Metrics Section:**
1. **Stores Managed**
   - Large number display
   - Subtitle: "Stores Managed"

2. **Audit Completion**
   - Progress bar with percentage
   - Color: Green (≥90), Yellow (80-89), Red (<80)

**Footer Section:**
- **Pending Approvals:** Count badge (warning color)
- **Unallocated PIDs:** Count badge (danger color)

**Drill-Down (Managed Stores):**
- **Columns:** Store ID, Store Name, Audit Status, Completion %, Last Update
- **Sortable:** All columns
- **Filterable:** By audit status
- **Export:** Yes

#### 3.5.2 Re-audit Waterfall Visualization

**Visualization Type:** Horizontal Bar Chart (Waterfall Style)

**Data Stages:**

1. **Initially Appeared Deviations**
   - Count: All deviations identified in initial audit
   - Color: Red (#dc3545)
   - Represents: Starting point

2. **Matched (Verified)**
   - Count: Deviations confirmed as correct
   - Color: Green (#198754)
   - Represents: No action needed

3. **Edited (Modified)**
   - Count: Deviations corrected by supervisor
   - Color: Yellow (#ffc107)
   - Represents: Supervisor intervention

4. **Pending (Awaiting)**
   - Count: Deviations awaiting supervisor action
   - Color: Blue (#0d6efd)
   - Represents: Action required

**Chart Features:**
- X-axis: Count
- Y-axis: Stage labels
- Bar labels: Count + percentage of total
- Tooltip: Detailed breakdown on hover
- Click: Drill-down to deviation details

**Business Logic:**
- Initially Appeared = Matched + Edited + Pending
- Visual validation: Total should balance

#### 3.5.3 PID Allocation Overview

**Purpose:** Monitor workload distribution across supervisors

**Display Format:** List of cards

**Each Card Contains:**

**Header:**
- Supervisor Name
- Allocation Rate Badge (e.g., "92.4% Allocated")

**Metrics Row:**
- Total PIDs: Number
- Allocated PIDs: Number (green text)
- Unallocated PIDs: Number (red text)

**Progress Bar:**
- Stacked progress bar
- Green segment: Allocated PIDs
- Red segment: Unallocated PIDs
- Width proportional to counts

**Sorting:**
- Default: By unallocated count (descending)
- Purpose: Identify supervisors with high unallocated loads

**Alert Logic:**
- Red alert if unallocated >10% of total
- Yellow warning if unallocated 5-10%

#### 3.5.4 Contra Approval Dashboard

**Critical Feature: High-Value Discrepancy Management**

**Table Columns:**

1. **Priority**
   - Format: Badge (High/Medium/Low)
   - Color: Red/Yellow/Green
   - Logic: 
     - High: Value >₹100,000
     - Medium: Value ₹50,000-₹100,000
     - Low: Value <₹50,000

2. **Store ID**
   - Format: Badge with monospace font

3. **Store Name**
   - Format: Bold text

4. **Contra Type**
   - Format: Badge
   - Values: Short (red), Excess (yellow)
   - Short: Physical < System
   - Excess: Physical > System

5. **Item Count**
   - Format: Number
   - Represents: Number of SKUs affected

6. **Quantity**
   - Format: Number with comma separator
   - Represents: Total units discrepancy

7. **Value (₹)**
   - Format: Bold currency with comma separator
   - Color: Success green (emphasized)
   - **Critical:** This enables value-based prioritization

8. **Actions**
   - Format: Chevron icon
   - Action: Opens SKU-level contra details

**Default Sorting:**
- By Value (descending)
- Purpose: Supervisors can immediately focus on high-value items

**Filters:**
- Priority: All, High, Medium, Low
- Contra Type: All, Short, Excess
- Value Range: Custom range slider

**Drill-Down (SKU-Level Contra Details):**

**Modal Title:** "{Store Name} - {Contra Type} Contra Details"

**Columns:**
1. SKU Code
2. Product Name
3. System Quantity
4. Physical Quantity
5. Deviation (±)
6. Unit Price
7. Total Value Impact
8. Supervisor
9. Status (Pending Approval/Approved/Rejected)
10. Actions (Approve/Reject buttons if pending)

**Approval Workflow:**
- Supervisor can approve/reject directly from modal
- Comments field required for rejection
- Approval history tracked with timestamp and user

---

## 4. Interaction Patterns

### 4.1 Drill-Down Modal Specifications

**Standard Modal Features:**

**Header:**
- Title with icon
- Close button (X)
- Background: Light gray

**Body:**
- **Search Bar:**
  - Placeholder: "Search in table..."
  - Icon: Magnifying glass
  - Search across all visible columns
  - Real-time filtering

- **Toolbar:**
  - Record count badge (e.g., "125 Records")
  - Export to Excel button (green with Excel icon)
  - Refresh button (if real-time data)

- **Data Table:**
  - Header row: Sticky (remains visible on scroll)
  - Sortable columns: Click header to sort
  - Sort indicators: Up/down arrows
  - Alternating row colors for readability
  - Max height: 500px with vertical scroll
  - Responsive: Horizontal scroll on small screens

**Footer:**
- Background: Light gray
- Close button

### 4.2 Navigation Flow

**Primary Navigation:**
```
User Lands → Global Header Visible → Tab Navigation
    ↓
Select Tab → Tab Content Loads → View KPIs/Charts/Tables
    ↓
Click Element → Drill-Down Modal Opens → View Details
    ↓
Export/Close → Return to Tab → Continue Analysis
```

**Filter Flow:**
```
Change Filter → Loading Indicator → Data Refresh
    ↓
All Components Update → Timestamp Updates → User Sees New Data
```

### 4.3 Data Validation Rules

**Display Rules:**
1. **Missing Data:** Display "N/A" in gray text
2. **Zero Values:** Display "0" (not blank)
3. **Null Percentages:** Display "—" (em dash)
4. **Date Formatting:** Consistent DD-MMM-YYYY format
5. **Currency:** Always prefix with ₹ symbol

**Logical Consistency Checks:**
1. **Completion Formula:** Completed + Pending = Allotted
   - If mismatch: Highlight row in light red background
   - Show tooltip: "Data inconsistency detected"

2. **Percentage Validation:** All percentages should be ≤100%
   - If >100%: Display as "Error" in red

3. **Date Validation:** End date ≥ Start date
   - If invalid: Show validation message

4. **Negative Values:** Not allowed for counts/quantities
   - Display: "Invalid Data" with warning icon

### 4.4 Responsive Design Breakpoints

**Desktop (≥1200px):**
- Full layout with all columns visible
- Side-by-side charts
- 4 KPI cards per row

**Tablet (768px - 1199px):**
- Stacked charts (one per row)
- 2 KPI cards per row
- Horizontal scroll for wide tables

**Mobile (<768px):**
- Single column layout
- 1 KPI card per row
- Accordion-style for sections
- Tab names shortened (icons only)

---

## 5. Performance Requirements

### 5.1 Loading Times
- Initial page load: <3 seconds
- Filter application: <1 second
- Drill-down modal: <2 seconds
- Chart rendering: <1.5 seconds

### 5.2 Data Refresh
- Auto-refresh: Every 2 minutes (configurable)
- Manual refresh: Instant with loading indicator
- Background refresh: For inactive tabs

### 5.3 Concurrent Users
- Support: 100+ concurrent users
- No performance degradation

---

## 6. Security & Access Control

### 6.1 Authentication
- SSO integration required
- Session timeout: 30 minutes of inactivity
- Auto-save filter preferences

### 6.2 Authorization
**Role: Audit HOD**
- View all data across all states/stores
- Export capabilities
- No data modification rights (read-only)

**Role: Supervisor**
- View data for assigned stores only
- Approval rights for own stores
- Limited export capabilities

**Role: Auditor**
- View own performance data only
- No export capabilities

### 6.3 Data Privacy
- Mask sensitive information (if any)
- Audit log for all data access
- Compliance with data protection regulations

---

## 7. Error Handling

### 7.1 Error Types

**Network Errors:**
- Display: Toast notification with retry option
- Message: "Unable to connect. Please check your connection."

**API Errors:**
- Display: Alert banner with error code
- Message: "Error loading data (Code: XXX). Please contact support."

**Data Validation Errors:**
- Display: Inline validation messages
- Color: Red text with warning icon

**Session Timeout:**
- Display: Modal dialog
- Message: "Your session has expired. Please log in again."
- Action: Redirect to login

### 7.2 Fallback Behavior
- Show last loaded data with timestamp
- Disable filters until connection restored
- Cache filter selections for recovery

---

## 8. Testing Requirements

### 8.1 Unit Testing
- All React components
- Data transformation functions
- Validation logic

### 8.2 Integration Testing
- API integration
- Filter application across tabs
- Drill-down modal functionality

### 8.3 User Acceptance Testing
- Test with actual HOD users
- Validate business logic
- Verify all drill-down paths

### 8.4 Performance Testing
- Load testing with 100+ concurrent users
- Stress testing with large datasets
- Browser compatibility testing

---

## 9. Deployment & Maintenance

### 9.1 Deployment Process
1. Build production bundle: `npm run build`
2. Deploy to staging environment
3. UAT sign-off
4. Deploy to production
5. Monitor for errors

### 9.2 Monitoring
- Application performance monitoring (APM)
- Error tracking (e.g., Sentry)
- User analytics
- Server logs

### 9.3 Maintenance Schedule
- Daily: Monitor error logs
- Weekly: Performance review
- Monthly: Feature updates based on feedback

---

## 10. Future Enhancements (Roadmap)

### Phase 2 (Q1 2026)
- Real-time WebSocket updates
- Predictive analytics for audit delays
- Mobile app version

### Phase 3 (Q2 2026)
- AI-powered anomaly detection
- Automated email alerts
- Custom report builder

### Phase 4 (Q3 2026)
- Integration with BI tools (Power BI, Tableau)
- Voice-enabled queries
- Advanced data visualization

---

## 11. Glossary

- **HOD:** Head of Department
- **SKU:** Stock Keeping Unit (unique product identifier)
- **PID:** Product ID or Batch ID
- **Contra Short:** Physical inventory less than system records
- **Contra Excess:** Physical inventory more than system records
- **Match Rate:** Percentage of audit counts matching re-audit
- **Edit Rate:** Frequency of corrections made to audit data

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Business Analyst | | | |
| UI/UX Designer | | | |
| Technical Lead | | | |
| HOD (Stakeholder) | | | |

---

**End of Functional Specification Document**
