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
- Auditor name prominently displayed (e.g., "Abhinay Naidu")
- Auditor ID shown below name (e.g., "ID: A046")

**Actions (Top Right)**
- Download Report button with dropdown for format selection
- Date range filters: "From" and "To" date pickers for filtering audit history
- Close button (X) to dismiss modal

### Performance Summary Cards

Three cards showing aggregate metrics:

**Total Audits**
- Number: 37 (total audits completed by this auditor)

**Total PIDs**
- Number: 45,389 (Physical Inventory Displays audited)

**Total SKUs**
- Number: 1.81 L (181,000 Stock Keeping Units audited)

### Deviation Summary Section

Shows this auditor's deviation statistics in three panels:

**Appeared Deviations**
- SKUs: 13,081
- Qty: 2.05 L
- Value: ₹1.33 Cr
- All discrepancies found by this auditor

**Matched Deviations**
- SKUs: 12,221
- Qty: 1.92 L
- Value: ₹1.25 Cr
- Successfully resolved

**Revised Deviations**
- SKUs: 860
- Qty: 13,615
- Value: ₹8.51 L
- Required correction

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
- MP0011, Hyd-Jubilee Hills, 06/12/2025, Select SKUs, 2,719 PIDs, 8,156 SKUs, 10,461 qty, ₹2.15 Cr
- MP0009, Hyd-Tarnaka, 04/12/2025, Select SKUs, 4,685 PIDs, 14,052 SKUs, 11,323 qty, ₹2.14 Cr
- MP0014, Hyd-Manikonda, 29/11/2025, Full Audit, 730 PIDs, 2,922 SKUs, 791 qty, ₹19.32 L

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
