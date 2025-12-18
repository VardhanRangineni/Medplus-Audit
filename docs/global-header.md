# Global Header

## When This Appears

The Global Header appears at the top of every screen in the system. It is always visible regardless of which section the user is viewing.

![Global Header](screenshots/store-coverage-main.png)
*The Global Header showing filter controls and refresh functionality*

## Complete UI Breakdown

### Dashboard Title
- **Label**: "Medplus Audit Dashboard"
- **Purpose**: Identifies the application and provides context for the user
- **Location**: Top-left of the header area

### Last Refreshed Indicator
- **Label**: "Last Refreshed: [Date and Time]"
- **Purpose**: Shows when the dashboard data was last updated
- **Format**: Displays date and time (e.g., "18 Dec 2025, 07:01:10 am")
- **Why it exists**: Helps users understand the freshness of the data they're viewing

### Refresh Now Button
- **Label**: "Refresh Now"
- **Type**: Blue button with refresh icon
- **Purpose**: Allows users to manually update all dashboard data
- **What happens on click**: 
  - Updates the "Last Refreshed" timestamp
  - Reloads all data on the current screen
  - Fetches the latest information from the system
- **Business purpose**: Ensures users are viewing the most current audit data when making decisions

### Financial Year Filter (Required)
- **Label**: "Financial year *"
- **Type**: Dropdown menu
- **Options**:
  - 2025–26
  - 2024–25
  - 2023–24
  - 2022–23
- **Default**: 2025–26 (current financial year)
- **Purpose**: Filters all dashboard data to show information for the selected financial year
- **Why it exists**: Allows comparison of audit performance across different fiscal periods
- **What happens when changed**: All metrics, charts, and tables update to reflect only data from the selected financial year
- **Required field**: Marked with asterisk (*), must have a value selected

### State Filter
- **Label**: "State"
- **Type**: Dropdown menu
- **Options**:
  - All States (default)
  - Tamil Nadu
  - Karnataka
  - Andhra Pradesh
  - Telangana
  - Kerala
- **Purpose**: Filters data to show only stores and audits from the selected state
- **Why it exists**: Enables regional managers to focus on their specific geographic area
- **What happens when changed**: All data narrows to show only information from the selected state

### Store Filter
- **Label**: "Store"
- **Type**: Dropdown menu
- **Options**:
  - All Stores (default)
  - HUB
  - Regular
- **Purpose**: Filters data by store type
- **Why it exists**: Different store types (HUB vs Regular) may have different audit requirements and performance expectations
- **What happens when changed**: Dashboard shows only data for the selected store type

### Audit Job Type Filter
- **Label**: "Audit Job Type"
- **Type**: Dropdown menu
- **Options**:
  - All Types (default)
  - Full Audit
  - Select SKUs
  - Partial Audit
- **Purpose**: Filters audits by their scope
- **Why it exists**: Different audit types have different time requirements and coverage expectations
- **What happens when changed**: Displays only audits of the selected type

### Process Type Filter
- **Label**: "Process Type"
- **Type**: Dropdown menu
- **Options**:
  - All Processes (default)
  - Product Audit
  - Batch Audit
- **Purpose**: Filters by the audit methodology used
- **Why it exists**: Product audits and batch audits have different workflows and accuracy requirements
- **What happens when changed**: Shows only audits using the selected process type

### Audit Status Filter
- **Label**: "Audit Status"
- **Type**: Dropdown menu
- **Options**:
  - All Statuses (default)
  - Created
  - In Progress
  - Pending
  - Completed
- **Purpose**: Filters audits by their current workflow state
- **Why it exists**: Allows supervisors to focus on audits requiring action or review
- **What happens when changed**: Displays only audits in the selected status

## Interaction Behavior

### Filter Application
1. User selects any combination of filters
2. All filters work together (cumulative filtering)
3. Dashboard immediately updates to reflect the filtered view
4. All sections and metrics recalculate based on the filter criteria
5. Filters persist as the user navigates between different screens

### Refresh Action
1. User clicks "Refresh Now" button
2. Button may show a brief loading state
3. System fetches latest data from the database
4. All visible metrics, charts, and tables update
5. "Last Refreshed" timestamp updates to current time
6. User receives updated information without leaving the current screen

## Purpose of Actions

### Filter Controls
- **Operational purpose**: Enable users to narrow down vast amounts of audit data to relevant subsets
- **Decision support**: Help managers focus on specific regions, store types, or audit statuses
- **Performance analysis**: Allow comparison across different time periods and audit types

### Refresh Control
- **Operational purpose**: Ensure data currency when multiple users are working in the system
- **Decision support**: Provide confidence that decisions are based on the latest available information
- **Real-time monitoring**: Enable supervisors to track audit progress as it happens
