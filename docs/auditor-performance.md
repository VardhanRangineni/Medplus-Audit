# Auditor Performance Screen

## Table of Contents
- [When This Screen Appears](#when-this-screen-appears)
- [Complete UI Breakdown](#complete-ui-breakdown)
  - [Header and Filters](#header-and-filters)
  - [Summary Metrics Cards](#summary-metrics-cards)
  - [Deviation Summary Section](#deviation-summary-section)
  - [Performance Rankings](#performance-rankings)
  - [Auditor Productivity Summary Table](#auditor-productivity-summary-table)
- [Interaction Behavior](#interaction-behavior)
  - [Clicking auditor rows:](#clicking-auditor-rows)
  - [Search field:](#search-field)
  - [Column sorting:](#column-sorting)
  - [View More buttons:](#view-more-buttons)
- [Purpose of Every Action](#purpose-of-every-action)
  - [Performance Tracking:](#performance-tracking)
  - [Productivity Metrics:](#productivity-metrics)
  - [Match Rate:](#match-rate)
  - [Edit Rate:](#edit-rate)
  - [Deviation Summary:](#deviation-summary)
  - [Rankings Purpose:](#rankings-purpose)
- [Visual Documentation](#visual-documentation)


## When This Screen Appears

This screen appears when:
- User clicks on "Auditor Performance" in the sidebar navigation
- Used to evaluate individual auditor productivity and quality
- Provides comprehensive performance metrics for all auditors

## Complete UI Breakdown

### Header and Filters

- Application title and Last Refreshed timestamp remain visible
- Global filter bar remains accessible (Financial year, State, Store, Audit Job Type, Process Type, Audit Status)
- Export Report button (green) in top right for downloading performance data

### Summary Metrics Cards

**Total Auditors Card**
- Icon: People/group icon
- Number: 40
- Label: "Active auditors"
- Shows current auditor workforce size

**Avg Time / PID Card**
- Icon: Hourglass/timer icon
- Number: 9.7 min
- Label: "Productivity efficiency"
- Average time to audit one Physical Inventory Display

**Avg Time / SKU Card**
- Icon: Clock icon
- Number: 4.0 min
- Label: "Productivity efficiency"
- Average time to audit one Stock Keeping Unit

### Deviation Summary Section

**Section Title**: "DEVIATION SUMMARY"

Three colored panels showing aggregate deviation data:

**Appeared Deviations** (Blue)
- SKUs: 2.93 L (Lakh = 293,000)
- Qty: 48.20 L
- Value: ₹31.69 Cr (Crore = 316.9 million)
- All discrepancies identified by auditors

**Matched Deviations** (Green)
- SKUs: 2.75 L
- Qty: 45.30 L
- Value: ₹29.82 Cr
- Deviations that were reconciled/resolved

**Revised Deviations** (Yellow/Orange)
- SKUs: 18,189
- Qty: 2.90 L
- Value: ₹1.87 Cr
- Deviations requiring correction

### Performance Rankings

**Top Performers Section**
- Title: "Top Performers"
- View More button to see complete list

Lists top 3 auditors:
1. Rakesh Kumar - 96.2%
2. Ravi Kumar - 95.5%
3. Nikhil Reddy - 95.4%

**Needs Attention Section**
- Title: "Needs Attention"
- View More button

Lists bottom 3 auditors:
1. Teja Reddy - 92.2%
2. Sashank Reddy - 92.2%
3. Pavan Kalyan - 92.5%

### Auditor Productivity Summary Table

**Table Title**: "Auditor Productivity Summary"
**Subtitle**: "Click on any auditor to view detailed performance metrics"

**Search Field**
- Placeholder: "Search by auditor name..."
- Filters table in real-time

**Table Columns:**
1. Auditor ID (e.g., A046, A037)
2. Auditor Name
3. Total Audits (completed count)
4. Allotted PIDs (total assigned)
5. Allotted SKUs (total assigned)
6. Allotted Qty (quantity to audit)
7. Avg Time/PID (minutes)
8. Avg Time/SKU (minutes)
9. Match Rate % (accuracy)
10. Edit Rate % (correction frequency)
11. Total Value (inventory audited)
12. Actions (empty column)

**Sample Data:**
- A046 Abhinay Naidu: 24 audits, 35,516 PIDs, 1.38L SKUs, 10.05 min/PID, 4.12 min/SKU, 93.3% match, ₹1.09 Cr
- A037 Uday Varma: 25 audits, 29,640 PIDs, 1.28L SKUs, 9.56 min/PID, 4.03 min/SKU, 94.4% match, ₹96.24 L

## Interaction Behavior

### Clicking auditor rows:
- Opens Auditor Detail Modal (documented separately)
- Shows comprehensive performance history
- Includes audit history table
- Displays deviation statistics

### Search field:
- Filters table as user types
- Searches auditor name and ID
- Updates results instantly

### Column sorting:
- Click headers to sort ascending/descending
- Sort by performance metrics to identify outliers
- Numerical and alphabetical sorting available

### View More buttons:
- Expands to show more top/bottom performers
- May open separate screen or expand list in place

## Purpose of Every Action

### Performance Tracking:
- Identifies high performers for recognition
- Identifies low performers for training
- Ensures quality standards are maintained
- Supports fair performance evaluation

### Productivity Metrics:
- Avg Time/PID and Avg Time/SKU show efficiency
- Lower times indicate faster auditors
- Must be balanced with accuracy (Match Rate)

### Match Rate:
- Shows accuracy of auditor's work
- High match rate = accurate counting
- Low match rate = needs retraining or closer supervision

### Edit Rate:
- Shows how often audits are revised
- High edit rate may indicate carelessness
- Low edit rate indicates careful work

### Deviation Summary:
- Aggregate view of all auditor findings
- Shows scale of inventory discrepancies
- Matched deviations show successful resolution

### Rankings Purpose:
- Top performers deserve recognition and rewards
- Bottom performers need support and training
- Creates healthy competition
- Identifies best practices from top performers

## Visual Documentation

![Auditor Performance Screen](https://github.com/VardhanRangineni/Medplus-Audit/raw/main/docs/screenshots/auditor-performance.png)

*The Auditor Performance screen showing productivity metrics, accuracy ratings, and detailed performance data for all auditors.*
