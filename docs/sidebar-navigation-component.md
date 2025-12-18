# Sidebar Navigation Component

## When This Component Appears

The sidebar navigation is always visible on the left side of the screen across all pages in the application. It provides persistent access to all major sections of the system.

## Complete UI Breakdown

### Logo Section

**MedPlus Logo**
- Located at the very top of the sidebar
- Company logo with red and white colors
- Square icon format
- Purpose: Brand identification and visual anchor

**Dashboard Label** (on some screens)
- Text: "Audit Dashboard"
- Appears below logo on certain pages
- Gray text
- Purpose: Confirms current application section

### Navigation Links

Four main navigation items arranged vertically:

**Store Coverage Link**
- Icon: Building/store icon (blue when active)
- Primary label: "Store Coverage"
- Secondary label: "Coverage & Inventory"
- Purpose: Navigate to main dashboard
- Active state: Blue background, white text
- Inactive state: White background, dark text
- When clicked: Navigates to dashboard showing store coverage metrics

**Live Audit Link**
- Icon: Calendar/schedule icon (blue)
- Primary label: "Live Audit"
- Secondary label: "Schedule & Progress"
- Purpose: View ongoing audits
- Active state: Blue background highlight
- Inactive state: Standard appearance
- When clicked: Opens Live Audit Schedule screen

**Auditor Performance Link**
- Icon: Person/user icon (blue)
- Primary label: "Auditor Performance"
- Secondary label: "Productivity & Quality"
- Purpose: Review auditor metrics
- Active state: Blue highlight
- Inactive state: Standard appearance
- When clicked: Opens Auditor Performance screen

**Supervisor Link**
- Icon: People/team icon (blue)
- Primary label: "Supervisor"
- Secondary label: "Approvals & Workload"
- Purpose: View supervisor tasks
- Active state: Blue highlight
- Inactive state: Standard appearance
- When clicked: Opens Supervisor Approvals screen

### User Section (Bottom)

**User Role Display**
- Label: "HOD Admin" or user role
- Smaller text below: "Audit Head" or position
- Located at bottom of sidebar
- User icon above text
- Purpose: Shows current user's role and level
- May be clickable for profile/settings

### Hover States

**Navigation Link Hover**
- When mouse hovers over inactive link:
  - Background lightens slightly
  - Cursor changes to pointer
  - Text may underline
- Purpose: Indicates interactivity

## Interaction Behavior

### Link Clicks
- Click any navigation link:
  - Current link becomes active (blue background)
  - Previous active link returns to inactive state
  - Main content area transitions to new screen
  - Smooth animation (fade or slide)
  - URL updates in browser
  - No page reload occurs

### Active State Management
- One link is always active
- Active link shows which screen user is viewing
- Active state persists during session
- Provides visual confirmation of location

### Responsive Behavior
- On smaller screens:
  - Sidebar may collapse to icons only
  - Labels hide, icons remain
  - Hamburger menu may appear to toggle sidebar
- On tablets:
  - Full sidebar may remain visible
  - Or sidebar overlays content when opened
- On desktop:
  - Sidebar always visible
  - Fixed position, doesn't scroll with content

### Navigation Flow
- Users can switch between sections at any time
- No confirmation needed when switching
- Work in progress is auto-saved or users are warned
- Breadcrumb or back buttons not needed due to sidebar access

## Purpose of Every Action

**Logo Display**
- Business purpose: Reinforces brand identity
- Operational purpose: Visual anchor for navigation orientation

**Store Coverage Link**
- Business purpose: Access to high-level metrics and overview
- Operational purpose: Primary landing point for assessing overall system status

**Live Audit Link**
- Business purpose: Monitor ongoing audit operations
- Operational purpose: Real-time visibility into active work

**Auditor Performance Link**
- Business purpose: Assess team productivity and quality
- Operational purpose: Identify training needs and high performers

**Supervisor Link**
- Business purpose: Manage approval workflows
- Operational purpose: Ensure timely review and resolution of audit issues

**User Role Display**
- Business purpose: Confirms authority level for displayed data
- Operational purpose: Shows who is currently using the system

**Two-Line Labels**
- Business purpose: Provides context for each section
- Operational purpose: Helps users quickly understand what each section contains

**Icon Usage**
- Business purpose: Visual recognition without reading text
- Operational purpose: Faster navigation through visual pattern recognition

**Active State Highlighting**
- Business purpose: Prevents users from getting lost
- Operational purpose: Confirms which data is currently displayed

**Persistent Visibility**
- Business purpose: Always-available navigation reduces clicks
- Operational purpose: Efficient workflow without backtracking

## Visual Documentation

The sidebar appears on the left edge of all screenshots throughout the documentation. It uses a blue color scheme for the MedPlus brand, with white icons and text for active items. The navigation provides clear, two-line descriptions making it suitable for both technical and managerial users.
