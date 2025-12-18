# Total Stores Details Screen

## When This Screen Appears

This screen appears when a user clicks on the "Total Stores" card from the main dashboard. It displays after clicking "Click for details" on the blue card showing the count of 478 total stores.

## Complete UI Breakdown

### Header Section

**Back Button**
- Blue left arrow icon with "Back" text
- Located at top left
- Purpose: Returns user to the main dashboard
- When clicked: Navigates back to dashboard, maintaining previous filter selections

**Page Title: "Total Stores"**
- Large heading displayed prominently
- Confirms which store category is being viewed

**Record Count**
- Text: "Showing 10 of 10 records"
- Purpose: Informs user how many stores are displayed versus total available
- Updates dynamically based on filters applied

**Export to Excel Button**
- Green button with download icon
- Located at top right
- Purpose: Downloads all store data in the table to an Excel file
- When clicked: File downloads immediately with name like "total-stores-YYYY-MM-DD.xlsx"

### Filter and Search Bar

Four input controls for refining the displayed data:

**Search Box**
- Placeholder text: "Search across all fields..."
- Magnifying glass icon on left
- Purpose: Performs text search across all visible columns
- Behavior: Updates table results as user types (real-time filtering)
- Searches in: Store ID, Store Name, State, Store Type, etc.

**State Filter Dropdown**
- Default: "All States"
- Options include: Tamil Nadu, Karnataka, Telangana, Maharashtra, Delhi, Gujarat, West Bengal, Madhya Pradesh
- Purpose: Filter stores by geographic location
- When changed: Table updates to show only stores in selected state

**Store Name Filter Box**
- Placeholder: "Filter by store..."
- Purpose: Allows filtering by partial store name
- Behavior: Updates as user types

**Reset Button**
- Gray circular arrow icon with "Reset" text
- Purpose: Clears all filters and search terms, returning to default view
- When clicked: All filters reset, full unfiltered list reappears

### Data Table

**Table Structure**
- Multi-column layout with horizontal scrolling if needed
- Header row with column titles
- Data rows with alternating background colors for readability
- All rows display complete store information

**Column Headers** (left to right):

1. **STORE ID**
   - Format: MP### (e.g., MP001, MP002)
   - Purpose: Unique identifier for each store

2. **STORE NAME**
   - Store location name (e.g., "Chennai Central", "Bangalore Hub")
   - Purpose: Human-readable store identifier

3. **STATE**
   - Full state name
   - Purpose: Geographic location

4. **STORE TYPE**
   - Values: "HUB" or "REGULAR"
   - Purpose: Classification by store function and size

5. **BOX TYPE**
   - Values: "DYNAMIC" or "REGULAR"
   - Purpose: Indicates inventory management method

6. **STORE CREATED DATE**
   - Format: YYYY-MM-DD
   - Purpose: Shows when store was added to system

7. **LAST AUDITED DATE**
   - Format: YYYY-MM-DD
   - Purpose: Shows most recent audit completion date

8. **STATUS**
   - Displays as green badge with "Active" text
   - Purpose: Shows operational status of store

9. **SKUS (count)**
   - Numeric value (e.g., 4200, 3900)
   - Purpose: Number of unique products in this store

10. **QUANTITY (units)**
    - Numeric value (e.g., 385000, 425000)
    - Purpose: Total units of all products

11. **INVENTORY VALUE MRP (₹)**
    - Format: ₹###,### (e.g., ₹125,000)
    - Purpose: Total retail value of inventory

**Sample Data Rows:**
- Row 1: MP001 | Chennai Central | Tamil Nadu | HUB | DYNAMIC | 2020-01-15 | 2024-11-15 | Active | 4200 | 385000 | ₹125,000
- Row 2: MP002 | Bangalore Hub | Karnataka | HUB | DYNAMIC | 2019-08-20 | 2024-11-20 | Active | 3900 | 425000 | ₹198,000
- (Additional rows follow same pattern)

### Row Interaction

**Default State**
- Rows display with standard background
- Text is clearly readable
- All columns visible without interaction

**Hover State**
- When mouse moves over a row:
  - Background color lightens slightly
  - Cursor remains normal (arrow)
  - No visual indication that row is clickable
- Purpose: Provides visual feedback for current focus

**No Click Behavior**
- Unlike the Covered Stores screen, these rows are NOT clickable
- No modal or detail view opens when clicking a row
- Purpose: This is a summary view only; stores in this list may not have detailed audit information available

## Interaction Behavior

### Search Functionality
- Type in search box: Table filters in real-time
- Search is case-insensitive
- Matches partial strings
- Searches across all visible columns simultaneously
- Clear search box: Full list returns

### Filter Application
- Select state from dropdown: Table immediately shows only matching stores
- Multiple filters work together (search + state + store name)
- Filters are additive (AND logic)

### Reset Action
- Click Reset button:
  - Search box clears
  - State dropdown returns to "All States"
  - Store name filter clears
  - Table returns to showing all records
- No confirmation dialog appears

### Export Process
- Click "Export to Excel":
  - File generation happens immediately
  - Browser's download notification appears
  - File includes all columns visible in table
  - Includes currently filtered results (not full dataset if filters applied)
  - Filename includes current date

### Back Navigation
- Click Back button:
  - Smooth transition animation back to dashboard
  - Dashboard loads with same filter settings as before
  - No data is lost or reset

## Purpose of Every Action

**Back Button**
- Business purpose: Allows managers to return to high-level view after reviewing details
- Operational purpose: Maintains workflow continuity and context

**Search and Filters**
- Business purpose: Enables focused analysis on specific stores or regions
- Operational purpose: Quickly locate specific stores for investigation or planning

**Export to Excel**
- Business purpose: Provides data for offline analysis and reporting
- Operational purpose: Creates documentation for audit compliance and stakeholder communication

**Table Display**
- Business purpose: Provides comprehensive view of all stores and their basic attributes
- Operational purpose: Enables identification of stores by multiple criteria (location, type, inventory size)

**Status Indicator**
- Business purpose: Shows which stores are currently operational
- Operational purpose: Helps plan audit schedules around active stores

**Inventory Metrics**
- Business purpose: Shows scale and value of each store's inventory
- Operational purpose: Helps prioritize audit resources based on inventory value and complexity

**Last Audited Date**
- Business purpose: Identifies which stores may be overdue for next audit
- Operational purpose: Supports audit scheduling and compliance tracking

## Visual Documentation

![Total Stores Details Screen](./screenshots/total-stores-details.png)

The screenshot shows the complete table with all columns visible. Notice the search and filter controls at the top, the Export to Excel button for downloading data, and the comprehensive column layout providing complete store information. The green "Active" status badges indicate all stores are currently operational.
