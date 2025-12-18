# Sidebar Navigation

## When This Appears

The Sidebar Navigation is permanently visible on the left side of every screen. It provides access to all major sections of the audit dashboard.

![Sidebar Navigation](screenshots/live-audit-schedule.png)
*The Sidebar showing all navigation options and active page indicator*

## Complete UI Breakdown

### Application Logo
- **Element**: MedPlus logo with "Audit Dashboard" text
- **Location**: Top of sidebar
- **Purpose**: Branding and application identification
- **Behavior**: Non-clickable, serves as visual anchor

### Store Coverage Section
- **Icon**: Store/building icon
- **Primary Label**: "Store Coverage"
- **Secondary Label**: "Coverage & Inventory"
- **Purpose**: Navigate to the main dashboard showing store audit coverage and inventory metrics
- **Active indicator**: Blue highlight when this section is currently displayed
- **What happens on click**: Displays the Store Coverage screen with KPI cards, charts, and deviation analysis

### Live Audit Section
- **Icon**: Calendar icon
- **Primary Label**: "Live Audit"
- **Secondary Label**: "Schedule & Progress"
- **Purpose**: Navigate to real-time audit monitoring and scheduling
- **Active indicator**: Blue highlight when this section is currently displayed
- **What happens on click**: Shows ongoing audits with progress bars, assigned auditors, and status information

### Auditor Performance Section
- **Icon**: People icon
- **Primary Label**: "Auditor Performance"
- **Secondary Label**: "Productivity & Quality"
- **Purpose**: Navigate to auditor metrics and performance tracking
- **Active indicator**: Blue highlight when this section is currently displayed
- **What happens on click**: Displays auditor productivity metrics, match rates, and ranking tables

### Supervisor Section
- **Icon**: People with badge icon
- **Primary Label**: "Supervisor"
- **Secondary Label**: "Approvals & Workload"
- **Purpose**: Navigate to supervisor management and workload distribution
- **Active indicator**: Blue highlight when this section is currently displayed
- **What happens on click**: Shows supervisor performance metrics and managed store information

### User Profile Section
- **Icon**: User avatar icon
- **Primary Label**: "HOD Admin"
- **Secondary Label**: "Audit Head"
- **Location**: Bottom of sidebar
- **Purpose**: Displays current user role and identification
- **Behavior**: Shows who is logged in and their authority level

## Interaction Behavior

### Navigation Action
1. User clicks on any navigation section
2. The clicked section highlights in blue
3. Previous section's highlight is removed
4. Main content area transitions to the selected screen
5. URL updates to reflect the current section
6. All header filters remain in their current state

### Active State Indication
- Currently displayed section has:
  - Blue background highlight
  - Full-width color block
  - Maintains icon and text contrast
- Other sections show:
  - No background color
  - White or light-colored icons
  - Hover effect available

### Hover Behavior
- On non-active sections:
  - Slight highlight or color change
  - Cursor changes to pointer
  - Visual feedback that element is clickable

## Purpose of Each Section

### Store Coverage
- **Operational purpose**: Monitor overall store audit coverage across the pharmacy network
- **Decision support**: Identify uncovered stores and plan audit scheduling
- **Business value**: Ensure regulatory compliance through comprehensive store coverage

### Live Audit
- **Operational purpose**: Track real-time progress of ongoing audits
- **Decision support**: Identify audits that are falling behind schedule or need intervention
- **Business value**: Optimize resource allocation and ensure timely audit completion

### Auditor Performance
- **Operational purpose**: Monitor individual auditor productivity and quality metrics
- **Decision support**: Identify high performers for recognition and low performers for training
- **Business value**: Improve audit quality through performance management

### Supervisor
- **Operational purpose**: Track supervisor workload and audit approval status
- **Decision support**: Balance workload across supervisors and identify bottlenecks
- **Business value**: Ensure efficient audit approval process and fair work distribution

### User Profile
- **Operational purpose**: Display current user identity and role
- **Decision support**: Clarify access level and authority for making decisions
- **Business value**: Maintain accountability and audit trail of user actions
