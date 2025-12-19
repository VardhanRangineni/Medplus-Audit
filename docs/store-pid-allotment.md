# Store PID Allotment Screen

## Table of Contents
- [When This Screen Appears](#when-this-screen-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Store Header](#store-header)
  - [PID Management Section](#pid-management-section)
  - [PID Table](#pid-table)
- [Interaction Behavior](#interaction-behavior)
  - [Filter Buttons](#filter-buttons)
  - [Checkboxes](#checkboxes)
  - [Assign Button](#assign-button)
  - [Reassign Button (Individual)](#reassign-button-individual)
  - [Bulk Reassign Button](#bulk-reassign-button)
  - [Search Field](#search-field)
- [Purpose of Every Action](#purpose-of-every-action)
  - [PID Management:](#pid-management)
  - [Assignment:](#assignment)
  - [Status Tracking:](#status-tracking)
  - [Reassignment:](#reassignment)
  - [Not Assigned Filter:](#not-assigned-filter)
  - [Reassign Filter:](#reassign-filter)
  - [SKU Count Purpose:](#sku-count-purpose)
  - [Status Columns Purpose:](#status-columns-purpose)
  - [Checkbox Disable Logic:](#checkbox-disable-logic)
  - [Bulk Operations Purpose:](#bulk-operations-purpose)
- [Visual Documentation](#visual-documentation)


## When This Screen Appears

This screen appears when:
- User clicks on "Store PID Allotment" in the sidebar navigation
- Used to assign Physical Inventory Display locations (PIDs) to auditors
- Manages audit task distribution within a single store

## Complete UI Breakdown

### Store Header

**Store Identification**
- Store name displayed prominently (e.g., "Chennai Central")
- Subtext: Location and Store ID (e.g., "Tamil Nadu | Store ID: MP001")

**Status Metrics (5 boxes in a row)**
1. Total PIDs: 15 (total locations in store)
2. Assigned: 5 (PIDs allocated to auditors)
3. Unassigned: 10 (PIDs available for assignment)
4. In Progress: 1 (currently being audited)
5. Completed: 1 (finished PIDs)

### PID Management Section

**Section Title**: "PID Management" with icon

**Search and Filter Bar**
- Search field: "Search by PID, description, or auditor..."
  - Filters PIDs as user types
- Filter buttons (3 buttons):
  1. "All PIDs" (default, shows all)
  2. "Not Assigned" (shows only unassigned PIDs)
  3. "Reassign" (shows PIDs that can be reassigned)

**Action Buttons (Top Right)**
- "Assign (0)" button - disabled when no PIDs selected
  - Number shows count of selected PIDs
  - Becomes enabled when checkboxes are checked
- "Bulk Reassign (0)" button - disabled when no PIDs selected
  - Allows reassigning multiple PIDs at once

### PID Table

**Table Columns:**
1. Checkbox (for selection)
2. PID Number (e.g., PID001, PID002)
3. SKU Count (number of products in this location)
4. Description (location code like A1-56, B6-7)
5. Assign Status (Not Assigned / Assigned)
6. Audit Status (Pending / Not Started / In Progress / Completed)
7. Auditor Name (person assigned, or "-" if unassigned)
8. Actions (Reassign button when applicable)

**Sample Rows:**

**PID001** (Assigned, In Progress)
- SKUs: 245
- Description: A1-56
- Status: Assigned, In Progress
- Auditor: Amit Singh
- Checkbox: Disabled (can't reassign while in progress)
- No action button

**PID002** (Not Assigned)
- SKUs: 189
- Description: B6-7
- Status: Not Assigned, Pending
- Auditor: -
- Checkbox: Enabled
- No action button yet

**PID004** (Assigned, Not Started)
- SKUs: 156
- Description: A3-45
- Status: Assigned, Not Started
- Auditor: Priya Reddy
- Checkbox: Enabled
- Action: Reassign button available

**PID009** (Completed)
- SKUs: 198
- Description: C7-12
- Status: Assigned, Completed
- Auditor: Amit Singh
- Checkbox: Disabled (completed work can't be reassigned)
- No action button

## Interaction Behavior

### Filter Buttons

**Clicking "All PIDs":**
- Shows complete PID list
- Button highlights in blue
- Displays all statuses

**Clicking "Not Assigned":**
- Filters to show only unassigned PIDs
- Highlights PIDs needing auditor assignment
- Button highlights in blue

**Clicking "Reassign":**
- Shows PIDs that are assigned but not started
- Allows changing auditor assignments
- Useful for workload rebalancing

### Checkboxes

**Checking a PID checkbox:**
- Row highlights
- Count in "Assign" or "Bulk Reassign" button increases
- Multiple PIDs can be selected

**Select all checkbox (in header):**
- Checks all eligible PIDs
- Disabled PIDs remain unchecked
- Quick way to select multiple PIDs

### Assign Button

**When PIDs are selected:**
1. "Assign (X)" button becomes enabled
2. Number shows count of selected PIDs
3. Clicking button opens assignment dialog

**Assignment dialog contains:**
- List of available auditors
- Option to select auditor
- Confirm button to assign

**After assignment:**
- Selected PIDs update to "Assigned" status
- Auditor name appears in table
- Checkboxes deselect
- Assign button resets to disabled

### Reassign Button (Individual)

**Clicking Reassign button on a row:**
1. Opens reassignment dialog
2. Shows current auditor
3. Lists alternative auditors
4. User selects new auditor
5. Confirms reassignment

**After reassignment:**
- Row updates with new auditor name
- Maintains "Not Started" status
- Work remains in queue

### Bulk Reassign Button

**When multiple assigned PIDs are selected:**
1. Button becomes enabled
2. Clicking opens bulk reassignment dialog
3. Can assign all selected PIDs to one auditor
4. Or distribute among multiple auditors

**Bulk assignment options:**
- Assign all to one person
- Evenly distribute among selected auditors
- Custom distribution

### Search Field

**As user types:**
- Table filters to matching PIDs
- Searches PID number, description, and auditor name
- Results update in real-time

**Empty search:**
- Shows all PIDs (respecting button filters)

## Purpose of Every Action

### PID Management:
- Breaks store into manageable sections
- Each PID represents a physical location (aisle, shelf section, etc.)
- Efficient routing of auditors through store

### Assignment:
- Ensures every location is covered
- Prevents duplicate work
- Balances workload among auditors

### Status Tracking:
- Shows which PIDs are in progress
- Identifies completed work
- Highlights what remains to be done

### Reassignment:
- Adjusts for auditor availability
- Rebalances workload if one auditor is behind
- Responds to changing circumstances

### Not Assigned Filter:
- Quickly identifies unallocated work
- Ensures complete coverage before audit starts
- Highlights planning gaps

### Reassign Filter:
- Shows flexible assignments
- PIDs not yet started can be moved
- Enables workload optimization

### SKU Count Purpose:
- Helps estimate time required for each PID
- Higher SKU count = longer audit time
- Used for fair workload distribution

### Status Columns Purpose:
- Assign Status shows if auditor is allocated
- Audit Status shows actual progress
- Combined view shows complete picture

### Checkbox Disable Logic:
- Can't reassign in-progress work (would disrupt auditor)
- Can't modify completed work (maintains audit integrity)
- Protects audit quality and continuity

### Bulk Operations Purpose:
- Saves time when assigning many PIDs
- Efficient initial allocation
- Quick adjustments for last-minute changes

## Visual Documentation

![Store PID Allotment Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/store-pid-allotment.png)

*The Store PID Allotment screen showing PID assignments, status tracking, and auditor allocation for a specific store's physical inventory locations.*
