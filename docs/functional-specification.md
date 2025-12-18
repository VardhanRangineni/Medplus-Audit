# MedPlus Audit Dashboard - Functional Specification

**Version:** 1.0  
**Date:** December 18, 2025  
**Document Type:** Complete Functional & UI Specification  
**Purpose:** Comprehensive documentation for full re-implementation

---

## Table of Contents

1. [Application Overview](#1-application-overview)
2. [Navigation & Entry Flow](#2-navigation--entry-flow)
3. [Global Components](#3-global-components)
4. [Screen-by-Screen Specifications](#4-screen-by-screen-specifications)
5. [Modal Dialogs & Sub-screens](#5-modal-dialogs--sub-screens)
6. [UI Components Reference](#6-ui-components-reference)
7. [Data Concepts & Entities](#7-data-concepts--entities)
8. [Export & Download Features](#8-export--download-features)
9. [Visual Documentation](#9-visual-documentation)

---

## 1. Application Overview

### 1.1 Purpose

The **MedPlus Audit Dashboard** is a web-based application designed for the **Head of Department (HOD)** to monitor and manage pharmacy inventory audits across multiple stores. The dashboard provides real-time visibility into:

- Store audit coverage and inventory status
- Live audit progress and schedules
- Auditor productivity and performance metrics
- Supervisor workload and approval workflows

### 1.2 Intended Users

**Primary User:** Head of Department (HOD) / Audit Head

**User Role:** Read-only dashboard with drill-down capabilities, export functionality, and real-time data monitoring.

### 1.3 Technology Stack

- **Frontend Framework:** React 19.2.0 with React Router DOM
- **UI Library:** Bootstrap 5.3.8 and React-Bootstrap 2.10.10
- **Charts:** Recharts 3.5.1
- **Icons:** Font Awesome 7.1.0
- **Export:** XLSX 0.18.5, jsPDF 3.0.4, jsPDF-AutoTable 5.0.2
- **Build Tool:** Vite 7.2.4

### 1.4 Core Concepts

**Key Entities:**
- **Stores:** Physical pharmacy locations (HUB stores or Regular stores)
- **SKU (Stock Keeping Unit):** Individual product identifier
- **PID (Product ID/Batch ID):** Product or batch identifier for audit allocation
- **Audits:** Scheduled inventory verification activities
- **Auditors:** Staff members who physically count inventory
- **Supervisors:** Staff members who oversee audits and approve discrepancies
- **Deviations:** Differences between system records and physical counts

**Deviation Types:**
- **Invoiced:** Items received but not yet in system
- **Contra Short:** Physical inventory less than system records (shortage)
- **Contra Excess:** Physical inventory more than system records (overage)
- **Excess Submitted:** Reported excess items

**Audit Workflow States:**
- **Created:** Audit scheduled but not started
- **In Progress:** Audit currently being conducted
- **Pending:** Audit paused or awaiting action
- **Completed:** Audit finalized

---

## 2. Navigation & Entry Flow

### 2.1 Application Entry

The application loads directly to the **Store Coverage & Inventory** tab (the default/home screen). There is no separate login screen visible in this implementation.

### 2.2 Main Navigation Structure

The application uses a **sidebar navigation** (left side, fixed) with four main sections:

```
┌─────────────────────────────┐
│  [MedPlus Logo]             │
│  Audit Dashboard            │
├─────────────────────────────┤
│  📊 Store Coverage          │
│     Coverage & Inventory    │
├─────────────────────────────┤
│  📋 Live Audit              │
│     Schedule & Progress     │
├─────────────────────────────┤
│  👥 Auditor Performance     │
│     Productivity & Quality  │
├─────────────────────────────┤
│  👤 Supervisor              │
│     Approvals & Workload    │
├─────────────────────────────┤
│                             │
│  [Bottom Section]           │
│  👤 HOD Admin               │
│     Audit Head              │
└─────────────────────────────┘
```

**Navigation Behavior:**
- Clicking any navigation item loads the corresponding tab
- Active tab is highlighted with a different background color (blue)
- Navigation is instant (client-side routing)
- Sidebar is always visible (fixed position)

### 2.3 URL Routes

The application uses these routes:
- `/` → Store Coverage & Inventory (default)
- `/live-audit` → Live Audit Schedule
- `/auditor-performance` → Auditor Performance
- `/supervisor-approvals` → Supervisor Approvals
- `/details` → Details page (when drilling down from main views)

---

## 3. Global Components

### 3.1 Global Header

**Location:** Top of the screen, below sidebar, sticky (remains visible when scrolling)

**Components:**

1. **Title Area (Left)**
   - Text: "Medplus Audit Dashboard"
   - Style: Blue, bold, large font

2. **Refresh Status (Right)**
   - Icon: Sync/refresh icon
   - Text: "Last Refreshed: [timestamp]"
   - Format: "18 Dec 2025, 05:50:52 am"
   - Button: "Refresh Now" (blue outline button)
   - Behavior: Updates timestamp and reloads data when clicked

3. **Filter Bar (Full Width)**
   
   **Filter Controls (Left to Right):**
   
   a. **Financial Year** (Required field, marked with *)
      - Type: Dropdown
      - Options: 2025-26, 2024-25, 2023-24, 2022-23
      - Default: Current financial year (2025-26)
      - Behavior: Cannot be left empty
   
   b. **State**
      - Type: Dropdown
      - Options: All States, Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, Kerala
      - Default: All States
   
   c. **Store**
      - Type: Dropdown
      - Options: All Stores, HUB, Regular
      - Default: All Stores
      - Note: Refers to store type, not individual store
   
   d. **Audit Job Type**
      - Type: Dropdown
      - Options: All Types, Full Audit, Select SKUs, Partial Audit
      - Default: All Types
   
   e. **Process Type**
      - Type: Dropdown
      - Options: All Processes, Product Audit, Batch Audit
      - Default: All Processes
   
   f. **Audit Status**
      - Type: Dropdown
      - Options: All Statuses, Created, In Progress, Pending, Completed
      - Default: All Statuses

**Filter Behavior:**
- Filters apply automatically when changed (no "Apply" button needed)
- All tabs respond to filter changes
- Filters are global across all tabs
- Changing filters updates all visible metrics and charts immediately

### 3.2 Sidebar Profile

**Location:** Bottom of sidebar

**Components:**
- Icon: User avatar icon
- Text Line 1: "HOD Admin"
- Text Line 2: "Audit Head"
- Style: Light text on dark blue background

**Behavior:** Static display only, no interaction

---

## 4. Screen-by-Screen Specifications

## 4.1 Store Coverage & Inventory

**Purpose:** Provides overview of store audit coverage, inventory summary, and deviation analysis.

**URL:** `/` (default/home screen)

![Store Coverage Tab](https://github.com/user-attachments/assets/bd8de829-0af9-4253-8fd7-94d90b41a30e)

*Figure 4.1.1: Store Coverage main screen showing KPI cards, recency chart, and deviation distribution*

### 4.1.1 Top Action Bar

**Export Summary Button**
- Location: Top right
- Style: Green button with download icon
- Text: "Export Summary"
- Behavior: Exports current view data to Excel or PDF

### 4.1.2 KPI Cards Row

Three large KPI cards displayed horizontally:

**Card 1: Total Stores**
- Icon: Store icon (blue)
- Main Number: "478"
- Subtitle: None
- Footer: "Click for details" (clickable)
- Behavior: Clicking navigates to details page showing all stores

**Card 2: Covered Stores**
- Icon: Checkmark icon (green)
- Main Number: "418"
- Subtitle: "87.4% of total"
- Footer: "Click for details" (clickable)
- Behavior: Clicking shows list of covered stores with last audit dates

**Card 3: Uncovered Stores**
- Icon: Warning icon (red)
- Main Number: "60"
- Subtitle: "12.6% of total"
- Color: Red theme (indicates attention needed)
- Footer: "Click for details" (clickable)
- Behavior: Clicking shows list of stores needing audits

**Visual Styling:**
- Cards have subtle shadow and rounded corners
- Icons are large and colored
- Numbers are prominent and bold
- Hover effect: Subtle elevation/shadow increase

### 4.1.3 Store Recency Analysis Chart

**Section Header:**
- Title: "Store Recency Analysis"
- Icon: Calendar icon
- Subtitle: "Breakdown of covered stores by days since last audit"

**Controls:**
- Export Button (green, top right)
- View Toggles: "Quarterly" | "Half-Yearly" | "Yearly" (button group)
  - Default: Quarterly view selected

**Chart Type:** Horizontal Bar Chart

**Data Displayed (Quarterly View):**
- Y-Axis: Time periods (Oct-Dec, Jul-Sep, Apr-Jun, Jan-Mar)
- X-Axis: Number of stores (0, 30, 60, 90, 120)
- Bars: Blue color, show store counts per quarter

**Interpretation:**
- Shows how recently stores were audited
- Helps identify stores overdue for audit
- Clicking a bar shows stores in that time range

### 4.1.4 Inventory Summary Cards

Three smaller cards displayed horizontally:

**Card 1: Total SKUs**
- Main Number: "1,729,130"
- Subtitle: "Across all covered stores"
- Icon: Box/package icon

**Card 2: Total Quantity**
- Main Number: "7.4Cr" (7.4 Crore = 74 million)
- Subtitle: "Units in inventory"
- Icon: Items icon

**Card 3: Total Inventory Value**
- Main Number: "₹11769.22L" (₹117.69 Crore)
- Subtitle: "Aggregate value"
- Icon: Currency icon

**Note:** These are aggregate totals across all covered stores, affected by filters.

### 4.1.5 Deviation Distribution Section

**Layout:** Two-column layout

**Left Column: Deviation Distribution Pie Chart**

**Section Header:**
- Title: "Deviation Distribution"
- Subtitle: "Click on segments for details"

**Chart Components:**
- Type: Pie chart
- Segments: Four deviation types with different colors
- Legend (right side of chart):
  - Invoiced: ₹5707K (purple/violet)
  - Contra Short: ₹6034K (blue)
  - Contra Excess: ₹5714K (pink/red)
  - Excess Submitted: ₹6397K (yellow/orange)

**Interaction:**
- Clicking a segment shows SKU-level details for that deviation type
- Hover shows value tooltip

**Right Column: Deviation Summary**

**Section Header:**
- Title: "Deviation Summary"
- Subtitle: "Click on a pie segment for details"
- Export Button (green, top right)

**Subsection: Overall Product Form Distribution**
- Subtitle: "Across all deviation types"

**Content:** Two-column layout with pie chart and list

**Listed Product Forms (in order):**
1. Injection: ₹2,647,772 (5480 items)
2. Liquids: ₹2,612,180 (6010 items)
3. General: ₹2,509,308 (5362 items)
4. Inhalers: ₹2,439,249 (5476 items)
5. Containers: ₹2,420,339 (5627 items)
6. Ointments: ₹2,331,716 (4986 items)
7. Powders: ₹2,288,196 (5392 items)
8. Surgicals: ₹2,273,320 (4891 items)
9. Drops: ₹2,194,744 (5088 items)
10. Tablets: ₹2,135,633 (4590 items)

**Bottom Instruction:**
- Text: "Click on any deviation segment to see specific breakdown"

### 4.1.6 Store Details Modal

![Store Details](https://github.com/user-attachments/assets/f82de1a3-e646-464a-b2e4-f741ee8c70f3)

*Figure 4.1.2: Store details page showing comprehensive store listing with filters*

**Triggered By:** Clicking any KPI card (Total Stores, Covered Stores, Uncovered Stores)

**Modal Components:**

**Header:**
- Back button (arrow icon) - returns to main view
- Title: "[Type] Stores" (e.g., "Total Stores")
- Record count: "Showing X of Y records"
- Export to Excel button (green)

**Filters Bar:**
- Search box: "Search across all fields..."
- State dropdown: Filter by specific state
- Store filter textbox: "Filter by store..."
- Reset button: Clears all filters

**Data Table:**

Columns displayed:
1. Store ID (e.g., MP001)
2. Store Name
3. State
4. Store Type (HUB or REGULAR)
5. Box Type (DYNAMIC or REGULAR)
6. Store Created Date (YYYY-MM-DD)
7. Last Audited Date (YYYY-MM-DD)
8. Status (badge: "Active")
9. SKUs (count)
10. Quantity (units)
11. Inventory Value MRP (₹)

**Table Features:**
- Sortable columns (click header to sort)
- Pagination (if more than page size)
- Search highlights matching text
- Responsive design

---

## 4.2 Live Audit Schedule & Progress

**Purpose:** Monitor ongoing audits in real-time, view progress, and drill down into auditor-level details.

**URL:** `/live-audit`

![Live Audit Schedule](https://github.com/user-attachments/assets/825b69dc-9e55-4175-9c5c-8222ea03b913)

*Figure 4.2.1: Live Audit Schedule showing audit status cards and in-progress audits table*

### 4.2.1 Audit Status Cards

Four cards displayed horizontally showing audit workflow states:

**Card 1: CREATED**
- Icon: Document icon (gray)
- Main Number: "7"
- Subtitle: "Not started"
- Color Theme: Gray
- Footer: "Click for details"

**Card 2: PENDING**
- Icon: Clock/pause icon (yellow)
- Main Number: "6"
- Subtitle: "Awaiting action"
- Color Theme: Yellow
- Footer: "Click for details"

**Card 3: IN PROGRESS**
- Icon: Spinner/loading icon (blue)
- Main Number: "9"
- Subtitle: "Actively running"
- Color Theme: Blue
- Footer: "Click for details"

**Card 4: COMPLETED**
- Icon: Checkmark icon (green)
- Main Number: "11"
- Subtitle: "Finalized"
- Color Theme: Green
- Footer: "Click for details"

**Behavior:** Clicking shows filtered list of audits in that status

### 4.2.2 Live Audit Schedule Table

**Section Header:**
- Title: "Live Audit Schedule - In Progress"
- Icon: Calendar icon
- Subtitle: "Click on any row to view auditor-wise allocation and real-time progress"

**Controls:**
- Export Report button (green, top right)
- Audit count badge: "9 Audits" (blue badge)

**Table Columns:**

1. **Store ID**
   - Format: MP0002
   - Style: Badge with gray background

2. **Store Name**
   - Plain text
   - Example: "Coimbatore-Main"

3. **Supervisor**
   - Text with user icon
   - Example: "Sourav Das"

4. **Assigned Auditors**
   - Count badge (blue circle with number)
   - Tooltip on hover showing auditor names
   - Format: "4" with tooltip "Hitesh Shah, Amit Singh, Rohit Sharma, Arun Nair"

5. **Start Date**
   - Format: YYYY-MM-DD
   - Example: "2025-12-15"

6. **Audit Progress**
   - Format: "X,XXX / Y,YYY SKUs"
   - Progress bar below text
   - Color coding:
     - Green (≥80%): On track
     - Yellow (60-79%): Moderate
     - Red (<60%): Needs attention
   - Percentage displayed: e.g., "86.3%"

7. **Actions**
   - (Empty column, reserved for future actions)

**Row Interaction:**
- Entire row is clickable (hover shows pointer cursor)
- Clicking opens Store Details Modal

### 4.2.3 Store Audit Details Modal

![Audit Details Modal](https://github.com/user-attachments/assets/27cb0485-c426-47ff-a12d-255ec4c18083)

*Figure 4.2.2: Store audit details modal showing comprehensive breakdown including PIDs, mismatches, deviations, and auditor assignments*

**Triggered By:** Clicking any audit row in the table

**Modal Header:**
- Icon: Store icon
- Title: "[Store Name] - Store Details"
- Example: "Coimbatore-Main - Store Details"
- Download Report button (blue, top right)
- Close button (X icon, far right)

**Top Info Bar:**

Four columns displaying:
1. **Store ID:** MP0002 (in badge)
2. **State:** TN
3. **Supervisor:** Sourav Das (with user icon)
4. **Audit Progress:** 86.3% with progress bar

**Summary Cards Row:**

Two cards:

**Card 1: Total SKUs**
- Main number: "3,317"
- Subtitle: "Audited: 2,862"

**Card 2: Inventory Value**
- Main number: "₹3209K"
- Subtitle: "Total Value"

**Metrics Grid (Three Sections):**

**Section 1: PIDs** (Blue icon)
- Total PIDs: 1,551
- Pending PIDs: 213
- Total SKUs: 3,317
- Pending SKUs: 455

**Section 2: MISMATCHES** (Red icon)
- Total Mismatches: 65
- Pending: 26
- Matched: 39
- Deviations: 98

**Section 3: DEVIATIONS** (Yellow icon)
- Total Deviations: 98
- Pending: 31
- Submitted: 67

**Assigned Auditors Table:**

**Header:** "Assigned Auditors" with user group icon

**Columns:**
1. (Icon column - empty)
2. Auditor Name
3. Assigned SKUs (count)
4. Completed SKUs (count)
5. Progress (%) - with progress bar
6. Match Rate (%) - with badge styling

**Example Rows:**
| Auditor | Assigned | Completed | Progress | Match Rate |
|---------|----------|-----------|----------|------------|
| Hitesh Shah | 675 | 504 | 74.8% | 86.2% |
| Amit Singh | 673 | 332 | 49.4% | 95.6% |
| Rohit Sharma | 913 | 827 | 90.6% | 95.9% |
| Arun Nair | 1,056 | 456 | 43.2% | 96.4% |

**Table Features:**
- Each row is clickable
- Progress bars color-coded (green/yellow/red)
- Match rate shown as green badge if ≥90%

**Modal Footer:**
- Close button (bottom center)

---

## 4.3 Auditor Performance

**Purpose:** Track individual auditor productivity, quality metrics, and performance rankings.

**URL:** `/auditor-performance`

![Auditor Performance](https://github.com/user-attachments/assets/e2a2f885-f0a3-4cdf-b51f-e78d1b218380)

*Figure 4.3.1: Auditor Performance showing KPIs, top performers/needs attention lists, and detailed productivity table*

### 4.3.1 Performance KPI Cards

Five cards displayed horizontally:

**Card 1: Total Auditors**
- Icon: Users group icon (cyan)
- Main Number: "40"
- Subtitle: "Active auditors"

**Card 2: Avg Time / PID**
- Icon: Hourglass icon (cyan)
- Main Number: "9.9 min"
- Subtitle: "Productivity efficiency"

**Card 3: Avg Time / SKU**
- Icon: Clock icon (blue)
- Main Number: "4.0 min"
- Subtitle: "Productivity efficiency"

**Card 4: Match Rate**
- Icon: Target/accuracy icon (green)
- Main Number: "90.8%"
- Subtitle: "Accuracy vs re-audit"

**Card 5: Edit Rate**
- Icon: Edit icon (yellow/orange)
- Main Number: "9.2%"
- Subtitle: "Quality indicator"

### 4.3.2 Performance Rankings

**Layout:** Two columns

**Left Column: Top Performers**
- Header: "Top Performers" with trophy icon (green theme)
- Ranked list (1-3):
  1. Uday Varma - 91.5%
  2. Mahesh Babu - 91.2%
  3. Pavan Kalyan - 91.2%
- Style: Green highlight, ranking numbers in circles

**Right Column: Needs Attention**
- Header: "Needs Attention" with warning icon (yellow theme)
- Ranked list (1-3):
  1. Rakesh Kumar - 90.2%
  2. Sudheer Naidu - 90.2%
  3. Rahul Varma - 90.3%
- Style: Yellow/orange highlight, ranking numbers in circles

### 4.3.3 Auditor Productivity Table

**Section Header:**
- Title: "Auditor Productivity Summary"
- Subtitle: "Click on any auditor to view detailed performance metrics"

**Search Bar:**
- Placeholder: "Search by auditor name..."
- Position: Top right of table

**Export Button:**
- Text: "Export Report"
- Style: Blue button
- Position: Top right

**Table Columns:**

1. **Auditor ID** - Badge style (A001, A012, etc.), sortable
2. **Auditor Name** - Full name, sortable
3. **Total Audits** - Count of audits performed, sortable
4. **Allotted PIDs** - Number format: "1,29,964", sortable
5. **Allotted SKUs** - Number format: "5,97,875", sortable
6. **Allotted Qty** - Quantity: "17,635", sortable
7. **Avg Time/PID** - Time format: "9.86 min", sortable
8. **Avg Time/SKU** - Time format: "4.06 min", sortable
9. **Match Rate %** - Percentage: "90.9%", sortable
10. **Edit Rate %** - Percentage: "9.1%", sortable
11. **Total Value** - Currency: "₹61.65 L", sortable
12. **Actions** - (Empty column for future actions)

**Table Features:**
- All columns sortable (click header)
- Rows clickable for drill-down
- Alternate row coloring for readability
- Scrollable if many auditors
- Pagination or infinite scroll

**Row Interaction:**
- Hover: Row highlights
- Click: Opens auditor detail modal (expected)

---

## 4.4 Supervisor Approvals

**Purpose:** Monitor supervisor workload, store management, and audit oversight.

**URL:** `/supervisor-approvals`

### 4.4.1 Supervisor KPI Cards

Four cards displayed horizontally:

**Card 1: Total Supervisors**
- Icon: Supervisor icon
- Main Number: "10"

**Card 2: Total Stores Managed**
- Icon: Store icon
- Main Number: "100"

**Card 3: Total Audits**
- Icon: Audit icon
- Main Number: "1,000"

**Card 4: Total Value**
- Icon: Currency icon
- Main Number: "₹17.44 Cr"

### 4.4.2 Supervisor Performance Table

**Section Header:**
- Title: "Supervisor Performance Summary"
- Subtitle: "Click on any supervisor to view detailed performance metrics"

**Search Bar:**
- Placeholder: "Search by supervisor name..."
- Position: Top right of table

**Export Button:**
- Text: "Export Report"
- Style: Blue button
- Position: Top right

**Table Columns:**

1. **ID** - Badge style (S001, S002, etc.), sortable
2. **Name** - Full name, sortable
3. **Stores Managed** - Count, sortable
4. **Total Audits** - Count, sortable
5. **Days Supervised** - Total days, sortable
6. **Auditors Supervised** - Count, sortable
7. **Total SKUs** - Format: "19.32 L" (in Lakhs), sortable
8. **Total Value** - Currency: "₹1.77 Cr", sortable
9. **Actions** - (Empty column)

**Sample Data:**
| ID | Name | Stores | Audits | Days | Auditors | SKUs | Value |
|----|------|--------|--------|------|----------|------|-------|
| S001 | Aditya Reddy | 10 | 105 | 375 | 40 | 19.32 L | ₹1.77 Cr |
| S002 | Srinivas Rao | 10 | 101 | 388 | 40 | 17.28 L | ₹1.77 Cr |
| S003 | Karthik Reddy | 10 | 100 | 373 | 40 | 18.91 L | ₹1.69 Cr |

**Table Features:**
- Sortable columns
- Clickable rows for supervisor details
- Search functionality
- Export capability

---

## 5. Modal Dialogs & Sub-screens

### 5.1 Details Page (Store Listing)

**Triggered By:** Clicking KPI cards from Store Coverage tab

**URL:** `/details?title=[Type]&type=[type-identifier]`

**Page Components:**

**Header Bar:**
- Back button (left) - returns to previous view
- Title: "[Type]" (e.g., "Total Stores")
- Record count: "Showing X of Y records"
- Export to Excel button (green, right)

**Filter Controls:**
- Search textbox: "Search across all fields..."
- State dropdown: Filter by state
- Store filter textbox: "Filter by store..."
- Reset button: Clears filters

**Data Table:**
- Full-page table with store details
- Sortable columns
- Pagination
- Responsive design

### 5.2 Store Audit Detail Modal

**Triggered By:** Clicking audit row in Live Audit Schedule

**Components:** (Detailed in section 4.2.3)

- Header with store info
- Progress metrics
- PID, Mismatch, and Deviation statistics
- Auditor breakdown table
- Download Report functionality

---

## 6. UI Components Reference

### 6.1 KPI Cards

**Standard KPI Card Structure:**
```
┌─────────────────────────────┐
│  [Icon]        [Main Number]│
│                              │
│  [Title Text]                │
│  [Subtitle Text]             │
│                              │
│  [Footer Link/Action]        │
└─────────────────────────────┘
```

**Properties:**
- Icon: Positioned top-left or right
- Main Number: Large, bold font
- Title: Descriptive label above number
- Subtitle: Additional context below number
- Footer: Clickable action text
- Shadow: Subtle drop shadow
- Border Radius: Rounded corners
- Hover: Elevation increase

**Color Themes:**
- Blue: General information
- Green: Positive/completed
- Yellow: Warning/attention
- Red: Critical/needs action
- Gray: Neutral/not started

### 6.2 Progress Bars

**Visual:** Horizontal bar with fill

**Color Coding:**
- Green (≥80%): On track / Good performance
- Yellow (60-79%): Moderate / Acceptable
- Red (<60%): Poor / Needs attention

**Format:** Percentage displayed to right of bar

### 6.3 Badges

**Types:**

1. **Status Badge**
   - Style: Pill-shaped with background color
   - Examples: "Active" (green), "Pending" (yellow)

2. **Count Badge**
   - Style: Circular with number
   - Color: Blue
   - Used for: Auditor count, pending items

3. **ID Badge**
   - Style: Rectangular with gray background
   - Examples: "MP001", "A039", "S001"

### 6.4 Tables

**Standard Features:**
- Striped rows (alternate row coloring)
- Hover effect on rows
- Sortable columns (up/down arrows)
- Pagination or scroll
- Search/filter capability
- Export functionality

**Interaction:**
- Click column header to sort
- Click row to drill down (if enabled)
- Hover shows interactivity

### 6.5 Charts

**Chart Types Used:**

1. **Bar Chart** (Store Recency Analysis)
   - Orientation: Horizontal
   - Color: Blue
   - Grid: Light gray
   - Tooltip: Shows exact values on hover

2. **Pie Chart** (Deviation Distribution)
   - Segments: 4 deviation types
   - Colors: Distinct per category
   - Legend: Right side
   - Interactive: Click segments for details

**Chart Controls:**
- View toggles (buttons)
- Export button
- Legend

### 6.6 Buttons

**Types:**

1. **Primary Button**
   - Color: Blue background
   - Text: White
   - Usage: Main actions

2. **Outline Button**
   - Border: Blue
   - Text: Blue
   - Background: White
   - Usage: "Refresh Now"

3. **Success Button**
   - Color: Green background
   - Text: White
   - Icon: Download/export icon
   - Usage: Export actions

4. **Button Group**
   - Multiple buttons side-by-side
   - Active state highlighted
   - Usage: View toggles

### 6.7 Icons

**Icon Library:** Font Awesome

**Common Icons:**
- 🏪 Store: fa-store
- ✓ Check/Complete: fa-check
- ⚠ Warning: fa-exclamation-triangle
- 👤 User: fa-user
- 👥 Users: fa-users
- ⏱ Clock: fa-clock
- 📊 Chart: fa-chart-bar
- 📋 Clipboard: fa-clipboard
- �� Refresh: fa-sync-alt
- 📥 Download: fa-download
- 📆 Calendar: fa-calendar
- 🎯 Target: fa-bullseye
- ✏️ Edit: fa-edit

---

## 7. Data Concepts & Entities

### 7.1 Store Entity

**Attributes:**
- Store ID: Unique identifier (e.g., MP001)
- Store Name: Human-readable name
- State: Geographic location
- Store Type: HUB or REGULAR
- Box Type: DYNAMIC or REGULAR
- Created Date: When store was established
- Last Audited Date: Most recent audit completion date
- Status: Active/Inactive
- SKU Count: Number of unique products
- Quantity: Total units in inventory
- Inventory Value: Total worth in currency

**States:**
- Active: Currently operational
- (Inactive states not shown in current data)

**Types:**
- HUB: Large distribution center
- REGULAR: Standard retail location

### 7.2 Audit Entity

**Attributes:**
- Audit ID: Unique identifier
- Store: Associated store
- Supervisor: Overseeing supervisor
- Assigned Auditors: List of auditors
- Start Date: When audit began
- End Date: When audit completed (if applicable)
- Status: Created, In Progress, Pending, Completed
- Progress: Percentage completed
- Total PIDs: Product IDs allocated
- Total SKUs: Stock Keeping Units to audit
- Completed PIDs/SKUs: Work done so far

**Lifecycle:**
1. **Created:** Audit scheduled, not started
2. **In Progress:** Auditors actively counting
3. **Pending:** Paused or awaiting supervisor action
4. **Completed:** All work finalized and approved

### 7.3 Auditor Entity

**Attributes:**
- Auditor ID: Unique identifier (e.g., A001)
- Name: Full name
- Total Audits: Number of audits performed
- Allotted PIDs: Product IDs assigned
- Allotted SKUs: SKUs assigned
- Allotted Quantity: Units to count
- Avg Time/PID: Efficiency metric (minutes)
- Avg Time/SKU: Efficiency metric (minutes)
- Match Rate: Accuracy percentage
- Edit Rate: Quality indicator percentage
- Total Value: Cumulative value audited

**Performance Metrics:**
- **Match Rate:** % of audits that match re-audit results
  - ≥93%: Excellent
  - 90-92%: Good
  - <90%: Needs improvement

- **Edit Rate:** % of entries requiring correction
  - ≤10%: Good quality
  - >10%: Quality concerns

- **Avg Time/SKU:** Speed of work
  - <5 min: Efficient
  - 5-7 min: Average
  - >7 min: Slow

### 7.4 Supervisor Entity

**Attributes:**
- Supervisor ID: Unique identifier (e.g., S001)
- Name: Full name
- Stores Managed: Count of assigned stores
- Total Audits: Audits supervised
- Days Supervised: Total supervision days
- Auditors Supervised: Count of managed auditors
- Total SKUs: Cumulative SKUs overseen
- Total Value: Cumulative value managed

**Responsibilities:**
- Assign PIDs to auditors
- Monitor audit progress
- Approve/reject deviations
- Resolve mismatches
- Quality control

### 7.5 Deviation Entity

**Types:**

1. **Invoiced**
   - Definition: Items received but not yet in system
   - Cause: Delivery received, system update pending
   - Action: Update system records

2. **Contra Short**
   - Definition: Physical less than system (shortage)
   - Cause: Theft, damage, unrecorded sales
   - Action: Investigate, adjust system, potential write-off
   - Priority: HIGH if value >₹1,00,000

3. **Contra Excess**
   - Definition: Physical more than system (overage)
   - Cause: Unrecorded receipts, data entry errors
   - Action: Investigate, adjust system
   - Priority: HIGH if value >₹1,00,000

4. **Excess Submitted**
   - Definition: Reported excess items
   - Cause: Identified during audit
   - Action: Supervisor review and approval

**Deviation States:**
- Initially Appeared: First discovered
- Pending: Awaiting supervisor decision
- Matched: Confirmed correct
- Edited: Corrected by supervisor
- Submitted: Sent for approval

### 7.6 PID (Product ID / Batch ID)

**Concept:** A PID represents a product or batch of products that needs to be audited.

**Attributes:**
- PID identifier
- Associated SKUs
- Assigned Auditor
- Status: Pending, In Progress, Completed
- Time taken
- Deviations found

**Allocation:**
- Supervisor assigns PIDs to auditors
- Distribution should be balanced
- Unallocated PIDs indicate workload issues

### 7.7 SKU (Stock Keeping Unit)

**Concept:** Unique product identifier in inventory system.

**Attributes:**
- SKU code
- Product name
- Product form (Tablets, Injection, Liquid, etc.)
- Quantity in stock
- MRP (Maximum Retail Price)
- System quantity
- Physical quantity (from audit)
- Deviation (if any)

**Product Forms:**
- Tablets
- Injection
- Liquids
- Inhalers
- Containers
- Ointments
- Powders
- Surgicals
- Drops
- General

---

## 8. Export & Download Features

### 8.1 Export Summary (Store Coverage Tab)

**Button Location:** Top right of Store Coverage screen

**Button Style:** Green with download icon

**Functionality:**
- Exports current view of store coverage data
- Format: Excel (XLSX) or PDF
- Includes: KPI summaries, store lists, deviation data
- File naming: Includes timestamp

### 8.2 Export to Excel (Details Page)

**Button Location:** Top right of details/modal screens

**Button Style:** Green with Excel icon

**Functionality:**
- Exports visible table data
- Format: Excel-compatible (CSV or XLSX)
- Columns: All visible columns in table
- Rows: All rows (not just visible page)
- Filters: Respects active filters
- File naming: "[Type]-[Date].xlsx"

### 8.3 Export Report (Various Tabs)

**Button Location:** Top right of tab content

**Button Style:** Blue or green with download icon

**Functionality:**
- Exports comprehensive report for current tab
- Format: PDF or Excel
- Includes: All visible data, charts (as images), summaries

**Available On:**
- Live Audit Schedule tab
- Auditor Performance tab
- Supervisor Approvals tab

### 8.4 Download Report (Store Detail Modal)

**Button Location:** Top right of modal header

**Button Style:** Blue with download icon

**Functionality:**
- Generates detailed report for specific store/audit
- Format: PDF
- Includes:
  - Store information
  - Audit progress
  - Auditor breakdown
  - Mismatch and deviation details
- File naming: "[StoreName]-Audit-Report-[Date].pdf"

### 8.5 Export Behavior

**Common Characteristics:**
- Download starts immediately
- File saves to default download location
- No confirmation dialog (direct download)

**Export Formats:**

1. **Excel (XLSX/CSV):**
   - Tabular data
   - Store lists
   - Performance tables
   - Maintains formatting

2. **PDF:**
   - Formatted reports
   - Includes charts as images
   - Print-ready layout
   - Headers and footers

---

## 9. Visual Documentation

All screenshots referenced in this document are captured from the running application and represent the actual UI state.

### 9.1 Screenshot References

1. **Store Coverage Tab:** Figure 4.1.1
2. **Store Details Page:** Figure 4.1.2
3. **Live Audit Schedule:** Figure 4.2.1
4. **Audit Details Modal:** Figure 4.2.2
5. **Auditor Performance:** Figure 4.3.1

---

## 10. Additional Information

### 10.1 Color Scheme

**Primary Colors:**
- Primary Blue: #0d6efd
- Success Green: #198754
- Warning Yellow: #ffc107
- Danger Red: #dc3545
- Gray: #6c757d

**Background Colors:**
- White: #ffffff
- Light Gray: #f8f9fa
- Dark Blue: #1e40af (sidebar)

### 10.2 Responsive Behavior

**Breakpoints:**
- Mobile: <576px
- Tablet: 576px - 768px
- Desktop: 768px - 992px
- Large Desktop: >992px

**Adaptive Elements:**
- Sidebar: Collapsible on mobile
- KPI Cards: Stack vertically on mobile
- Tables: Horizontal scroll on mobile
- Charts: Resize to fit container

---

## 11. Conclusion

This functional specification provides a complete, accurate description of the MedPlus Audit Dashboard as observed from the running application. It serves as the definitive reference for full re-implementation.

**Key Features:**
- Dashboard for HOD-level oversight
- Four main functional areas
- Drill-down from summary to detail
- Export functionality throughout
- Real-time monitoring
- Performance metrics

**Implementation Priority:**
1. Core data models and entities
2. Global header and filter system
3. Store Coverage tab
4. Live Audit Schedule with modals
5. Auditor Performance tracking
6. Supervisor Management
7. Export functionality
8. Polish and optimization

---

**Document Version:** 1.0  
**Last Updated:** December 18, 2025  
**Status:** Complete

---

*End of Functional Specification Document*
