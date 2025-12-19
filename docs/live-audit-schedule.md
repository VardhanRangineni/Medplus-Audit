# Live Audit Schedule Screen

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

![Live Audit Schedule Screen](screenshots/live-audit-schedule.png)

*The Live Audit Schedule screen showing audits currently in progress with real-time completion tracking and auditor assignments.*
