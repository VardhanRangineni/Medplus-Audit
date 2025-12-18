# Store Details Page

## When This Screen Appears

This screen appears when a user clicks "Click for details" on any of the Store KPI cards (Total Stores, Covered Stores, or Uncovered Stores) from the Store Coverage screen.

![Store Details Page](screenshots/details-page-total-stores.png)
*Store Details page showing filterable table of all stores*

## Complete UI Breakdown

### Back Button
- **Label**: "Back" with left arrow icon
- **Location**: Top-left of content area
- **Purpose**: Return to the previous screen (Store Coverage dashboard)
- **What happens on click**: Navigates back to the Store Coverage screen
- **Business purpose**: Allow easy return to overview after reviewing details

### Page Title
- **Dynamic Title**: Shows the type of stores being displayed (e.g., "Total Stores")
- **Location**: Top center
- **Purpose**: Identifies which store category is currently displayed
- **Changes based on**: Which KPI card was clicked on the previous screen

### Record Counter
- **Label**: "Showing 10 of 10 records"
- **Location**: Below the title
- **Purpose**: Indicates how many records are visible and total available
- **Updates dynamically**: Changes as user applies filters or pagination

### Export to Excel Button
- **Label**: "Export to Excel"
- **Type**: Green button with download icon
- **Location**: Top-right corner
- **Purpose**: Download the current table data to an Excel file
- **What happens on click**: 
  - Generates Excel file with all visible columns
  - Includes only filtered records (if filters are applied)
  - Downloads file to user's device
- **Business purpose**: Enable offline analysis and reporting

### Filter Controls Section

#### Search Box
- **Placeholder**: "Search across all fields..."
- **Type**: Text input with magnifying glass icon
- **Purpose**: Perform free-text search across all table columns
- **What happens on typing**:
  - Table filters in real-time as user types
  - Searches store ID, name, state, type, and other fields
  - Record counter updates to show filtered count
- **Business purpose**: Quickly find specific stores without scrolling

#### State Filter Dropdown
- **Type**: Dropdown menu
- **Default**: "All States"
- **Options**: Lists all available states
  - All States
  - Tamil Nadu
  - Karnataka
  - Telangana
  - Maharashtra
  - Delhi
  - Gujarat
  - West Bengal
  - Madhya Pradesh
- **Purpose**: Filter table to show only stores in selected state
- **What happens on selection**: Table updates to show only matching records
- **Business purpose**: Focus on regional store operations

#### Store Filter Input
- **Placeholder**: "Filter by store..."
- **Type**: Text input
- **Purpose**: Filter by store name or ID
- **What happens on typing**: Table narrows to matching stores
- **Business purpose**: Quickly locate specific store locations

#### Reset Button
- **Label**: "Reset"
- **Type**: Button
- **Purpose**: Clear all applied filters and return to full dataset
- **What happens on click**:
  - Clears search text
  - Resets state dropdown to "All States"
  - Clears store filter
  - Restores full table display
- **Business purpose**: Quickly return to complete view after focused analysis

### Data Table

#### Column Headers (Clickable for Sorting)
1. **STORE ID**: Unique identifier for each store
2. **STORE NAME**: Official name of the store location
3. **STATE**: Geographic state where store is located
4. **STORE TYPE**: Category - HUB or REGULAR
5. **BOX TYPE**: Inventory management type - DYNAMIC or REGULAR
6. **STORE CREATED DATE**: When store was added to system
7. **LAST AUDITED DATE**: Date of most recent completed audit
8. **STATUS**: Current operational status (Active, Inactive, etc.)
9. **SKUS (count)**: Number of unique products in store
10. **QUANTITY (units)**: Total units of all products
11. **INVENTORY VALUE MRP (₹)**: Total rupee value of inventory

#### Table Rows
- Each row represents one store
- Alternating row colors for readability
- Full-width rows spanning all columns

#### Sample Data Display
- **MP001** - Chennai Central - Tamil Nadu - HUB - DYNAMIC - 2020-01-15 - 2024-11-15 - Active - 4200 - 385000 - ₹125,000
- **MP002** - Bangalore Hub - Karnataka - HUB - DYNAMIC - 2019-08-20 - 2024-11-20 - Active - 3900 - 425000 - ₹198,000
- Additional rows follow same pattern

#### Status Badge
- **Active Status**: Green badge with white text
- Purpose: Visual indication of store operational state
- Color coding: Green = Active, other colors for different states

## Interaction Behavior

### Navigation Flow
1. User arrives from Store Coverage screen
2. Table displays with appropriate filter pre-applied:
   - Total Stores: All stores shown
   - Covered Stores: Only stores with audit dates
   - Uncovered Stores: Only stores without audit dates
3. User can apply additional filters
4. User clicks Back to return to dashboard

### Filtering Process
1. User enters text in search box or selects from dropdowns
2. Table instantly filters to matching records
3. Record counter updates ("Showing X of Y records")
4. Multiple filters work together (cumulative)
5. Empty results show if no matches found

### Sorting Behavior
1. User clicks on column header
2. Table sorts by that column:
   - First click: Ascending order
   - Second click: Descending order
   - Third click: Returns to default order
3. Visual indicator shows sort direction
4. Sorting works with active filters

### Export Process
1. User applies desired filters (optional)
2. User clicks "Export to Excel"
3. System generates file with:
   - All visible columns
   - Only currently displayed/filtered rows
   - Formatted headers
4. File downloads with timestamp in filename
5. User can open in Excel or similar application

### Reset Action
1. User clicks Reset button
2. All filter inputs clear
3. Table returns to original state
4. Full dataset displays
5. Record counter shows total available records

## Purpose of Every Action

### Search and Filter
- **Operational purpose**: Locate specific stores or groups of stores quickly
- **Decision support**: Analyze subsets of stores by region, type, or other criteria
- **Efficiency**: Avoid manual scrolling through hundreds of records

### Sorting
- **Operational purpose**: Organize data by relevant criteria
- **Decision support**: Identify outliers (oldest audits, largest inventory, etc.)
- **Analysis**: Spot patterns in store characteristics

### Export
- **Operational purpose**: Enable offline work and sharing
- **Decision support**: Perform detailed analysis in Excel with pivot tables
- **Reporting**: Create reports for management or regulatory purposes
- **Record keeping**: Maintain historical snapshots of store data

### Status Display
- **Operational purpose**: Quickly identify which stores are operational
- **Decision support**: Exclude inactive stores from audit planning
- **Resource allocation**: Focus efforts on active locations

### Store Metrics
- **Operational purpose**: Understand size and complexity of each store
- **Decision support**: Allocate appropriate audit time based on SKU count
- **Financial oversight**: Track inventory value by location
- **Audit planning**: Assign appropriate number of auditors based on store size
