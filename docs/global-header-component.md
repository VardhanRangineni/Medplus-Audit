# Global Header Component

## When This Component Appears

The global header appears at the top of every screen in the application. It provides consistent access to key controls and information regardless of which section the user is viewing.

## Complete UI Breakdown

### Left Section

**Page Title**
- Text: "Medplus Audit Dashboard"
- Large, bold heading
- Blue color matching brand
- Always displays same text across all screens
- Purpose: Confirms user is in the audit system

### Center Section - Filter Controls

Six dropdown menus arranged horizontally for filtering all data:

**Financial Year Dropdown** (Required Field)
- Label: "Financial year *"
- Asterisk (*) indicates required selection
- Default: "2025–26"
- Other options: "2024–25", "2023–24", "2022–23"
- Dropdown arrow on right
- Purpose: Filter all displayed data by fiscal year
- When changed: Entire application updates to show selected year's data

**State Dropdown**
- Label: "State"
- Default: "All States"
- Options: Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, Kerala, and others
- Purpose: Filter data to specific geographic region
- When changed: All metrics and tables show only selected state

**Store Dropdown**
- Label: "Store"
- Default: "All Stores"
- Options: "HUB", "Regular"
- Purpose: Filter by store classification
- When changed: Data shows only selected store type

**Audit Job Type Dropdown**
- Label: "Audit Job Type"
- Default: "All Types"
- Options: "Full Audit", "Select SKUs", "Partial Audit"
- Purpose: Filter by audit scope
- When changed: Shows only selected audit type

**Process Type Dropdown**
- Label: "Process Type"
- Default: "All Processes"
- Options: "Product Audit", "Batch Audit"
- Purpose: Filter by audit methodology
- When changed: Updates to show selected process type

**Audit Status Dropdown**
- Label: "Audit Status"
- Default: "All Statuses"
- Options: "Created", "In Progress", "Pending", "Completed"
- Purpose: Filter by audit completion state
- When changed: Shows only audits with selected status

### Right Section

**Last Refreshed Indicator**
- Icon: Circular refresh icon
- Text format: "Last Refreshed: [Date] [Time]"
- Example: "Last Refreshed: 18 Dec 2025, 09:04:09 am"
- Gray text
- Purpose: Shows when data was last updated

**Refresh Now Button**
- Blue button with refresh icon
- Text: "Refresh Now"
- Located immediately to right of last refreshed indicator
- Purpose: Manually trigger data refresh
- Hover state: Button darkens slightly

## Interaction Behavior

### Dropdown Selections

**Opening a Dropdown**
- Click dropdown:
  - Dropdown expands downward
  - Shows all available options
  - Current selection is highlighted
  - Other dropdowns remain closed

**Selecting an Option**
- Click option in dropdown:
  - Dropdown closes
  - Selected value displays in dropdown
  - All dashboard data updates immediately
  - Loading indicators may appear briefly
  - Charts, tables, and metrics refresh
  - No page reload occurs

**Dropdown Combinations**
- Multiple filters work together
- Combine filters to narrow data (AND logic)
- Example: "Tamil Nadu" + "HUB" + "In Progress" shows only TN hub stores with active audits
- All sections of application respect filter selections

### Refresh Functionality

**Automatic Refresh**
- Data may update automatically on a timer
- Timestamp updates to show new refresh time
- No user action required

**Manual Refresh**
- Click "Refresh Now" button:
  - Button shows loading state (spinning icon)
  - System fetches latest data from backend
  - All metrics update simultaneously
  - Timestamp updates to current time
  - Button returns to normal state
  - Takes 1-3 seconds typically

### Filter Persistence

**Within Session**
- Filter selections persist when navigating between screens
- Example: Select "Tamil Nadu" on dashboard, then go to Live Audit - TN filter remains
- Prevents need to reselect filters repeatedly

**Across Sessions**
- Filters may save in browser
- When user returns later, last selections may be remembered
- Or system may reset to defaults

**Reset Behavior**
- No global reset button in header
- Reset must be done by manually selecting "All..." options
- Or by refreshing browser page

## Purpose of Every Action

**Page Title**
- Business purpose: Brand consistency and context awareness
- Operational purpose: Confirms which system user is in

**Financial Year Filter**
- Business purpose: Analyze trends across different fiscal years
- Operational purpose: Ensure reports align with company's financial calendar
- Compliance purpose: Required field ensures no ambiguity in reporting period

**State Filter**
- Business purpose: Regional analysis and comparison
- Operational purpose: Focus on specific geographic areas of responsibility
- Management purpose: Regional managers see only their territories

**Store Type Filter**
- Business purpose: Compare HUB vs Regular store performance
- Operational purpose: Different store types may have different audit requirements
- Resource planning: HUBs typically require more resources

**Audit Job Type Filter**
- Business purpose: Analyze efficiency by audit scope
- Operational purpose: Track different audit methodologies
- Planning purpose: Understand time required for each audit type

**Process Type Filter**
- Business purpose: Compare product vs batch audit effectiveness
- Operational purpose: Different processes for different scenarios
- Training purpose: Identify which process type has better outcomes

**Audit Status Filter**
- Business purpose: Monitor audit pipeline
- Operational purpose: Focus on specific stages (e.g., pending approvals)
- Workflow management: Identify bottlenecks

**Last Refreshed Indicator**
- Business purpose: Transparency about data currency
- Operational purpose: Users know if they're seeing stale data
- Decision support: Critical decisions should be made on recent data

**Refresh Now Button**
- Business purpose: On-demand access to latest information
- Operational purpose: Verify status before important actions
- User control: Allows users to update when needed, not on automatic schedule

**Global Visibility**
- Business purpose: Consistent filtering across entire application
- Operational purpose: Reduces cognitive load - set filters once
- Efficiency: No need to refilter when moving between screens

## Visual Documentation

The global header appears at the top of every screenshot in this documentation. It features a clean layout with the title on the left, six filter dropdowns in the center, and refresh controls on the right. The blue color scheme matches the sidebar navigation for visual consistency.
