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
