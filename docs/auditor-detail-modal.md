# Auditor Detail Modal

## Table of Contents
- [When This Modal Appears](#when-this-modal-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Modal Header](#modal-header)
  - [Performance Summary Cards](#performance-summary-cards)
  - [Deviation Summary Section](#deviation-summary-section)
  - [Audit History Table](#audit-history-table)
- [Interaction Behavior](#interaction-behavior)
  - [Date Range Filters:](#date-range-filters)
  - [Download Report:](#download-report)
  - [Table Sorting:](#table-sorting)
  - [Close Buttons:](#close-buttons)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Individual Performance Review:](#individual-performance-review)
  - [Deviation Analysis:](#deviation-analysis)
  - [Audit History:](#audit-history)
  - [Date Filtering:](#date-filtering)
  - [Export Purpose:](#export-purpose)
- [Visual Documentation](#visual-documentation)


## When This Modal Appears

This modal appears when:
- User clicks on any auditor row in the Auditor Performance table
- Provides complete performance history for selected auditor
- Shows detailed audit history and statistics

## Complete UI Breakdown

### Modal Header

**Auditor Identification**
- Auditor name prominently displayed (e.g., "Srikanth Rao")
- Auditor ID shown below name (e.g., "ID: A039")

**Actions (Top Right)**
- Download Report button with dropdown for format selection
- Date range filters: "From" and "To" date pickers for filtering audit history
- Close button (X) to dismiss modal

### Performance Summary Cards

Four cards showing aggregate metrics:

**Total Audits**
- Number: 26 (total audits completed by this auditor)
- Displayed with gradient blue background

**Total PIDs**
- Number: 31,414 (Physical Inventory Displays audited)

**Total SKUs**
- Number: 1.29 L (Stock Keeping Units audited)

**Total Value**
- Value: ₹22.04 Cr (Total audited value in Indian Rupees)

### Deviation Summary Section

Shows this auditor's deviation statistics in three panels:

**Appeared Deviations (Blue Border)**
- SKUs: 10,017
- Qty: 1.52 L
- Value: ₹1.09 Cr
- All discrepancies found by this auditor

**Matched Deviations (Green Border)**
- SKUs: 9,345
- Qty: 1.42 L
- Value: ₹1.03 Cr
- Successfully resolved and confirmed as correct

**Revised Deviations (Yellow Border)**
- SKUs: 672
- Qty: 9,770
- Value: ₹6.53 L
- Required correction after auditor's initial submission

### Audit History Table

**Table Title**: "AUDIT HISTORY"

**Columns:**
1. Store ID
2. Store (name)
3. Date (audit date)
4. Job Type (Full Audit, Select SKUs, Partial Audit)
5. PIDs (count)
6. SKUs (count)
7. QTY (quantity audited)
8. Audited Value (monetary value)

**Sample Rows:**
- MP0023, Hyd-Nampally, 12/12/2025, Full Audit, 1,759 PIDs, 7,039 SKUs, 8,464 qty, ₹57.23 L
- MP0021, Hyd-Amberpet, 05/12/2025, Select SKUs, 755 PIDs, 2,262 SKUs, 4,524 qty, ₹75.92 L

**Table Features:**
- Scrollable to show complete history
- Sortable by columns
- Shows chronological audit record
- Complete audit trail for this auditor

## Interaction Behavior

### Date Range Filters:
- Click From date to select start date
- Click To date to select end date
- Table filters to show audits within date range
- Useful for performance reviews covering specific periods

### Download Report:
- Exports this auditor's complete performance data
- Includes summary metrics and audit history
- Format options: PDF, Excel, CSV

### Table Sorting:
- Sort by date to see most recent work
- Sort by value to see highest-value audits
- Sort by store to group by location

### Close Buttons:
- X button or Close button returns to Auditor Performance screen
- Modal dismisses with animation

## Purpose of Every Action

### Individual Performance Review:
- Complete audit history for performance evaluation
- Identifies patterns in auditor's work
- Shows consistency over time

### Deviation Analysis:
- High revision rate may indicate quality issues
- Good match rate shows accurate work
- Helps identify training needs

### Audit History:
- Validates experience level
- Shows store types audited (helps with assignments)
- Demonstrates workload over time period
- Supports compensation and promotion decisions

### Date Filtering:
- Review specific time periods
- Quarterly or annual performance reviews
- Identify improvement or decline trends

### Export Purpose:
- Performance review documentation
- HR records
- Training needs assessment
- Recognition and reward decisions

## Visual Documentation

![Auditor Detail Modal](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/auditor-detail-modal.png)

*The Auditor Detail Modal showing complete performance history, deviation statistics, and detailed audit history for an individual auditor.*
