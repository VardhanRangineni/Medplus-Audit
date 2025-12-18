# Store Detail Modal

## When This Modal Appears

This modal appears when a user clicks on any row in the Live Audit Schedule table. It provides comprehensive details about a specific store's audit in progress.

**Preconditions**: User must be on the Live Audit Schedule screen viewing in-progress audits.

![Store Detail Modal](screenshots/store-detail-modal.png)
*Detailed modal showing comprehensive audit information for a specific store*

## Complete UI Breakdown

### Modal Header

#### Store Title
- **Format**: "[Store Name] - Store Details"
- **Example**: "Coimbatore-Main - Store Details"
- **Purpose**: Identifies which store's information is being displayed
- **Icon**: Store/building icon next to title

#### Download Report Button
- **Label**: "Download Report"
- **Type**: Blue button with download icon
- **Location**: Top-right of header
- **Purpose**: Generate and download detailed report for this specific audit
- **What happens on click**: Creates PDF or Excel report with all modal information
- **Business purpose**: Enable offline review and sharing of specific audit details

#### Close Button (X)
- **Type**: X icon button
- **Location**: Far top-right corner
- **Purpose**: Close the modal and return to audit table
- **What happens on click**: Modal dismisses, returns to Live Audit Schedule screen

### Store Summary Section (Top)

#### Store ID Badge
- **Label**: "Store ID"
- **Value**: "MP0002" (displayed in black badge)
- **Purpose**: Show unique store identifier
- **Visual**: Dark background badge for emphasis

#### State Information
- **Label**: "State"
- **Value**: "TN" (state abbreviation)
- **Purpose**: Show geographic location

#### Supervisor Information
- **Label**: "Supervisor"
- **Value**: "Sourav Das" (supervisor name)
- **Icon**: User icon
- **Purpose**: Identify who is overseeing this audit

#### Audit Progress Display
- **Label**: "Audit Progress"
- **Value**: "86.3%"
- **Progress Bar**: Blue horizontal bar showing visual completion
- **Purpose**: Quick view of overall audit completion status

### Key Metrics Cards

#### Total SKUs Card
- **Title**: "Total SKUs"
- **Large Number**: "3,317"
- **Subtitle**: "Audited: 2,862"
- **Purpose**: Shows total products and how many have been checked
- **What it represents**: Scope of audit and progress in item count

#### Inventory Value Card
- **Title**: "Inventory Value"
- **Large Number**: "₹3209K" (₹32.09 Lakhs)
- **Subtitle**: "Total Value"
- **Purpose**: Shows monetary value of inventory being audited
- **Business purpose**: Understand financial impact and importance

### PIDs Section (Blue Icon)

#### Section Header
- **Icon**: Blue box icon
- **Title**: "PIDS"
- **Purpose**: Track Physical Inventory Document progress

#### PIDs Metrics
- **Total PIDs**: 1,551
  - Purpose: Total number of inventory documents
- **Pending PIDs**: 213
  - Purpose: Documents still requiring completion
- **Total SKUs**: 3,317
  - Purpose: Total unique products across all PIDs
- **Pending SKUs**: 455
  - Purpose: Products not yet audited

**Business purpose**: Track document-level progress separate from item-level progress

### Mismatches Section (Red Icon)

#### Section Header
- **Icon**: Red exclamation icon
- **Title**: "MISMATCHES"
- **Purpose**: Track inventory discrepancies found during audit

#### Mismatch Metrics
- **Total Mismatches**: 65
  - Purpose: Total count of items where physical count didn't match records
- **Pending**: 26
  - Purpose: Mismatches not yet resolved or reviewed
- **Matched**: 39
  - Purpose: Discrepancies that were resolved or matched after recount
- **Deviations**: 98
  - Purpose: Related deviation records generated

**Business purpose**: Monitor accuracy of inventory records and identify problem areas

### Deviations Section (Yellow Icon)

#### Section Header
- **Icon**: Yellow warning triangle icon
- **Title**: "DEVIATIONS"
- **Purpose**: Track formal deviation reports

#### Deviation Metrics
- **Total Deviations**: 98
  - Purpose: Total number of formal discrepancy reports
- **Pending**: 31
  - Purpose: Deviations awaiting supervisor review or action
- **Submitted**: 67
  - Purpose: Deviations formally documented and submitted

**Business purpose**: Ensure all discrepancies are properly documented and resolved

### Assigned Auditors Table

#### Table Header
- **Icon**: People icon
- **Title**: "Assigned Auditors"
- **Purpose**: Show individual auditor performance on this audit

#### Table Columns
1. **Auditor Name**: Name of the individual auditor
2. **Assigned SKUs (count)**: Number of products allocated to this auditor
3. **Completed SKUs (count)**: Number of products this auditor has finished
4. **Progress (%)**: Percentage completion with visual progress bar
5. **Match Rate (%)**: Accuracy percentage - how often their counts match records

#### Sample Row Data
- **Hitesh Shah**: 675 assigned, 504 completed, 74.8% progress, 86.2% match rate
- **Amit Singh**: 673 assigned, 332 completed, 49.4% progress, 95.6% match rate
- **Rohit Sharma**: 913 assigned, 827 completed, 90.6% progress, 95.9% match rate
- **Arun Nair**: 1,056 assigned, 456 completed, 43.2% progress, 96.4% match rate

#### Row Hover State
- Rows are clickable (indicated by cursor change)
- May open additional auditor detail view

#### Progress Bar Visual
- Blue bar showing completion percentage
- Fills from left to right
- Provides quick visual comparison between auditors

#### Match Rate Badge
- Percentage displayed as badge
- Color coding: Green for high rates, yellow for medium, red for low
- Purpose: Quality indicator for each auditor

### Modal Footer

#### Close Button
- **Label**: "Close"
- **Type**: Secondary button
- **Location**: Bottom center of modal
- **Purpose**: Dismiss modal and return to audit table
- **Same function as X button**: Provides alternative way to close

## Interaction Behavior

### Opening the Modal
1. User clicks row in Live Audit Schedule table
2. Screen dims with dark overlay
3. Modal slides or fades into view
4. Modal centers on screen
5. Background content remains visible but not interactive

### Closing the Modal
**Three ways to close:**
1. Click X button in top-right
2. Click Close button at bottom
3. Click outside modal on dimmed background (if enabled)

**What happens on close:**
- Modal disappears
- Background screen returns to full brightness
- User returns to exact position in audit table
- No data is lost or changed

### Download Report Action
1. User clicks "Download Report" button
2. Button may show loading state
3. System generates comprehensive report including:
   - Store summary information
   - All metric cards
   - Auditor performance table
   - Progress charts
4. File downloads to user's device
5. Modal remains open after download

### Auditor Row Click
1. User clicks on an auditor's row
2. May open additional detail view showing:
   - Specific SKUs assigned to that auditor
   - Detailed mismatch information
   - Time spent per item
   - Audit history for that auditor
3. Allows drill-down into individual performance

### Real-time Updates
- Progress percentages may update automatically
- Pending counts decrease as work is completed
- Completed counts increase in real-time
- No manual refresh needed

## Purpose of Every Action

### Store Summary Information
- **Operational purpose**: Quickly identify which audit is being viewed
- **Decision support**: Context for all metrics shown below
- **Accountability**: Clear supervisor assignment

### PIDs Tracking
- **Operational purpose**: Monitor document-level completion
- **Decision support**: Estimate time to completion
- **Workflow management**: Identify document bottlenecks

### Mismatch Monitoring
- **Operational purpose**: Track accuracy of audit process
- **Decision support**: Identify stores or product types with chronic accuracy issues
- **Quality control**: Ensure discrepancies are being resolved
- **Training needs**: High mismatch rates may indicate need for staff retraining

### Deviation Tracking
- **Operational purpose**: Ensure all discrepancies are formally documented
- **Decision support**: Prioritize supervisor review of pending deviations
- **Compliance**: Maintain audit trail of inventory issues
- **Process improvement**: Analyze patterns in deviations

### Auditor Performance Table
- **Operational purpose**: Monitor individual productivity
- **Decision support**: Identify auditors who may need help or reassignment
- **Quality assessment**: Match rate shows accuracy of each auditor
- **Workload balancing**: See if work is distributed appropriately
- **Performance management**: Identify high and low performers
- **Real-time intervention**: Catch problems before audit completes

### Download Capability
- **Operational purpose**: Share detailed audit status with stakeholders
- **Decision support**: Perform offline analysis of audit patterns
- **Documentation**: Create records for regulatory or management review
- **Historical comparison**: Compare current audit to past audits
