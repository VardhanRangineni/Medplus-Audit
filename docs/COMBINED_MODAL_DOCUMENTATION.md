# MedPlus Audit Dashboard - Complete Modal Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Supervisor Details Modal](#supervisor-details-modal)
   - [Overview](#supervisor-overview)
   - [How to Access](#supervisor-access)
   - [Components](#supervisor-components)
   - [Download Functionality](#supervisor-downloads)
   - [Use Cases](#supervisor-use-cases)
   - [Best Practices](#supervisor-best-practices)
3. [Auditor Details Modal](#auditor-details-modal)
   - [Overview](#auditor-overview)
   - [How to Access](#auditor-access)
   - [Components](#auditor-components)
   - [Download Functionality](#auditor-downloads)
   - [Performance Indicators](#auditor-performance)
   - [Best Practices](#auditor-best-practices)
4. [Audit Details Modal](#audit-details-modal)
   - [Overview](#audit-overview)
   - [How to Access](#audit-access)
   - [Components](#audit-components)
   - [Download Functionality](#audit-downloads)
   - [Data Interpretation](#audit-interpretation)
   - [Best Practices](#audit-best-practices)
5. [Store Detail Modal](#store-detail-modal)
   - [Overview](#store-overview)
   - [How to Access](#store-access)
   - [Components](#store-components)
   - [Visual Indicators](#store-indicators)
   - [Use Cases](#store-use-cases)
   - [Best Practices](#store-best-practices)
6. [Common Features](#common-features)
7. [Glossary](#glossary)

---

## Introduction

The MedPlus Audit Dashboard provides four key modal windows for detailed data exploration and analysis. Each modal offers specialized views into different aspects of the audit process:

- **Supervisor Details Modal**: Comprehensive oversight of supervisor performance and workload
- **Auditor Details Modal**: Individual auditor performance metrics and productivity
- **Audit Details Modal**: Single audit breakdown with re-audit metrics and participating auditors
- **Store Detail Modal**: Store-specific audit progress, deviations, and contra items

This document provides complete documentation for all four modals in one consolidated reference.

---

# Supervisor Details Modal

<a name="supervisor-overview"></a>
## Overview

The Supervisor Summary provides a comprehensive view of a supervisor's audit oversight activities, performance metrics, and workload. This summary is accessible by clicking on any supervisor card from the "Supervisor Approvals & Workload" tab in the audit dashboard.

<a name="supervisor-access"></a>
## How to Access

1. Navigate to the **Supervisor Approvals & Workload** tab (4th tab in the dashboard)
2. Locate the supervisor card you want to review
3. Click on the supervisor card to open the detailed summary modal

<a name="supervisor-components"></a>
## On-Screen Summary Components

### Header Section

**Supervisor Information:**
- **Supervisor Name**: Display name of the supervisor
- **Supervisor ID**: Unique identifier (e.g., SUP001)
- **Download Report Button**: Dropdown menu with Excel and PDF export options
- **Date Range Filters**: 
  - "From" date picker (default: 1 year ago)
  - "To" date picker (default: today)
  - Date range cannot exceed 1 year
  - Validation prevents "From" date being after "To" date

### Key Performance Metrics (Top Cards)

Four primary KPI cards displaying:

1. **Total Audits** - Count of unique audits supervised within the selected date range
2. **Days Supervised** - Number of distinct days the supervisor was actively overseeing audits
3. **Total PIDs** - Aggregate count of Product IDs/Batch IDs across all supervised audits
4. **Total SKUs** - Total Stock Keeping Units supervised

### Deviation Summary Section

Displays aggregated deviation metrics across all supervised audits:

- **Appeared Deviations (Blue Border)**: Initial discrepancies with quantity and value
- **Matched Deviations (Green Border)**: Confirmed correct deviations with quantity and value
- **Revised Deviations (Yellow Border)**: Items requiring supervisor correction with quantity and value

### Audit History Table

Comprehensive table with columns: Audit ID, Store, Date, Job Type, PIDs, SKUs, QTY, Value

**Features**: Sorting, Pagination, Row Click for drill-down, Sticky Header

<a name="supervisor-downloads"></a>
## Download Functionality

### Excel Export
- **File Format**: `Supervisor_{SupervisorID}_Report.xlsx`
- **Sheet 1**: Supervisor Summary with metrics and deviation data
- **Sheet 2**: Complete audit history

### PDF Export
- **File Format**: `Supervisor_{SupervisorID}_Report.pdf`
- Includes metrics summary, deviation table, and audit history

<a name="supervisor-use-cases"></a>
## Use Cases

**Daily Monitoring**: Check supervisor workload and active audits
**Performance Review**: Evaluate supervisor efficiency over time
**Resource Planning**: Assess supervisor capacity and balance workload
**Compliance Tracking**: Verify audit coverage and track deviation patterns

<a name="supervisor-best-practices"></a>
## Best Practices

1. Review supervisor summaries weekly to identify trends
2. Use metrics to ensure even distribution of audits
3. High revision rates may indicate need for auditor training
4. Monitor pending/in-progress counts to prevent bottlenecks

---

# Auditor Details Modal

<a name="auditor-overview"></a>
## Overview

The Auditor Summary provides a detailed performance view of an individual auditor's productivity, accuracy, and quality metrics across all assigned audits. This summary is accessible by clicking on any auditor row from the "Auditor Performance & Productivity" tab.

<a name="auditor-access"></a>
## How to Access

1. Navigate to the **Auditor Performance & Productivity** tab (3rd tab in the dashboard)
2. Locate the auditor in the productivity summary table
3. Click on any row in the auditor table to open the detailed summary modal

<a name="auditor-components"></a>
## On-Screen Summary Components

### Header Section

**Auditor Information:**
- **Auditor Name**: Display name of the auditor
- **Auditor ID**: Unique identifier (e.g., A039)
- **Download Report Button**: Dropdown menu with Excel and PDF export options
- **Date Range Filters**: Same as Supervisor modal

### Key Performance Metrics (Top Cards)

Three primary KPI cards:

1. **Total Audits** - Count of audits the auditor participated in
2. **Total PIDs** - Aggregate count of Product IDs assigned to the auditor
3. **Total SKUs** - Total Stock Keeping Units assigned to the auditor

### Deviation Summary Section

- **Appeared Deviations**: Total items with deviations found by this auditor
- **Matched Deviations**: Items confirmed as correct (Higher is better)
- **Revised Deviations**: Items requiring correction (Lower is better)

### Audit History Table

Shows all audits performed by the auditor with columns: Audit ID, Store, Date, Job Type, PIDs, SKUs, QTY, Audited Value

<a name="auditor-downloads"></a>
## Download Functionality

### Excel Export
- **File Format**: `Auditor_{AuditorName}_metrics.xlsx`
- **Sheet 1**: Summary with performance metrics and deviation data
- **Sheet 2**: Complete audit details

### PDF Export
- **File Format**: `Auditor_{AuditorName}_Report_{Date}.pdf`
- Includes performance metrics, deviation summary, and audit details tables

<a name="auditor-performance"></a>
## Performance Indicators

**Match Rate**: Percentage of auditor's findings that match during re-audit (≥90.5% is acceptable, ≥91% is excellent)

**Edit Rate**: Percentage of entries that required correction (≤10% is good)

**Time Metrics**: Average time per PID (<10 min is good) and per SKU (<5 min is good)

<a name="auditor-best-practices"></a>
## Best Practices

1. Review auditor summaries weekly to catch issues early
2. Compare multiple auditors to identify best practices
3. Use match and edit rates to target training efforts
4. Download and archive reports for top performers

---

# Audit Details Modal

<a name="audit-overview"></a>
## Overview

The Audit-Specific Summary provides a comprehensive breakdown of a single audit, including store details, re-audit metrics, and participating auditor performance. Accessible from multiple locations including Supervisor and Auditor summary audit history tables.

<a name="audit-access"></a>
## How to Access

1. **From Supervisor Summary**: Click any audit row in the "Audit History" table
2. **From Auditor Summary**: Click any audit row in the "Audit History" table
3. **From Live Audit Schedule Tab**: Click any store/audit row in the progress table

<a name="audit-components"></a>
## On-Screen Summary Components

### Header Section (Hero Card)

**Audit Identification:**
- **Audit ID**: Unique audit identifier
- **Audit Job Type**: Full Audit, Select SKUs, or Partial Audit
- **Store Information**: Store name with location indicator
- **Timeline**: Start Date and End Date with calendar icons
- **Total Value**: Prominently displayed in large green text
- **Export Button**: Dropdown for Excel and PDF downloads

### Re-Audit Summary Section

Displays the audit verification and correction workflow:

1. **Appeared (Blue)**: Items initially identified with deviations
2. **Matched (Green)**: Items verified and confirmed as correct
3. **Deviations (Yellow)**: Items that required corrections

**Formula**: Appeared = Matched + Deviations

### Participating Auditors Section

**Auditors Table** with columns: ID, Auditor Name, PIDs, SKUs, Qty, Audited Value

**Interactive Features:**
- **Expandable Rows**: Click to reveal auditor-specific re-audit summary
- **Chevron Icons**: Indicate expand/collapse state
- **Row Highlighting**: Visual feedback on selection

**Expanded Auditor View** shows mini re-audit summary specific to that auditor

<a name="audit-downloads"></a>
## Download Functionality

### Excel Export
- **File Format**: `Audit_{AuditID}_Report.xlsx`
- **Sheet 1**: Audit Summary with re-audit category table
- **Sheet 2**: Participating auditors list

### PDF Export
- **File Format**: `Audit_{AuditID}_Report.pdf`
- Includes title section, re-audit summary table, and participating auditors table

<a name="audit-interpretation"></a>
## Data Interpretation

**High PIDs/SKUs with Low Deviations**: Excellent performer handling large workload accurately

**Low PIDs/SKUs with High Deviations**: Quality concerns despite small workload

**Consistent Match Rates**: Well-trained team with standardized processes

**Varying Match Rates**: May indicate need for additional training

<a name="audit-best-practices"></a>
## Best Practices

1. Regularly review random audits to ensure quality
2. Look for stores with consistently high deviations
3. Check audit summary before final approval
4. Download reports for audits with significant findings

---

# Store Detail Modal

<a name="store-overview"></a>
## Overview

The Store Detail Modal provides a comprehensive view of a specific store's audit progress, including assigned auditors, deviations breakdown, contra items, and key performance indicators. Accessible by clicking on any store row from drill-down pages.

<a name="store-access"></a>
## How to Access

Click on a KPI card to view a details page, then click on any store row to open the Store Detail Modal.

**Access Points:**
- Live Audit Schedule Tab
- Total Active Stores
- In Progress Audits
- Completed Audits
- Other drill-down pages

<a name="store-components"></a>
## On-Screen Modal Components

### Store Information Header

- **Store ID**: Unique identifier (e.g., MP001)
- **Store Name**: Full store name
- **State**: Location state abbreviation
- **Supervisor**: Assigned supervisor name
- **Audit Progress**: Completion percentage with visual progress bar

### Mini Dashboard KPIs

Four key metrics:

1. **Total SKUs**: Total and audited SKU count
2. **Inventory Value**: Total value of store inventory (₹)
3. **Total Deviations**: Count and value of all deviations
4. **Contra Items**: Count and value requiring attention

### Assigned Auditors Table

Shows all auditors with columns: Auditor Name, Assigned SKUs, Completed SKUs, Progress, Match Rate

### Deviations Breakdown

**Pie Chart**: Visual distribution of deviation types

**Table**: Deviation Type, Count, Total Value

**Common Types**: Invoiced, Contra Short, Contra Excess, Physical Short, Physical Excess

### Contra Summary

**Summary Cards**: Contra Short and Contra Excess

**Detailed Table**: SKU Code, Product Name, Type, Quantity, Value, Approval Status

<a name="store-indicators"></a>
## Visual Indicators

**Progress Colors:**
- Green: >75% complete
- Yellow: 50-75% complete
- Orange: 25-50% complete
- Red: <25% complete

**Status Badges:**
- Pending (Yellow)
- Approved (Green)
- Rejected (Red)
- In Progress (Blue)

<a name="store-use-cases"></a>
## Use Cases

**For Supervisors**: Daily monitoring, quality control, resource management

**For Audit Managers**: Performance oversight, issue resolution, reporting

**For Store Managers**: Audit preparation, issue awareness, follow-up planning

<a name="store-best-practices"></a>
## Best Practices

1. Check store progress at least twice daily
2. Address low-progress stores quickly
3. Review match rates regularly
4. Prioritize high-value deviations first
5. Approve/reject contra items promptly

---

# Common Features

## Date Filtering (Supervisor & Auditor Modals)

- **Default Range**: Last 1 year from current date
- **Maximum Range**: 1 year (365 days)
- **Validation**: Prevents invalid date selections
- **Auto-Revert**: Returns to last valid range if invalid

## Download Capabilities

All modals (except Store Detail) support:
- **Excel Export**: Multi-sheet workbooks with formatted data
- **PDF Export**: Professional reports with color-coded tables
- **Indian Currency Formatting**: Lakhs (L) and Crores (Cr) notation

## Interactive Tables

- **Sorting**: Click column headers to sort
- **Pagination**: Navigate through multiple pages
- **Row Click**: Drill down into detailed views
- **Sticky Headers**: Remain visible while scrolling

## Modal Behavior

- **Opening**: Click trigger element, modal slides in with backdrop
- **Closing**: Close button, X button, Escape key, or click backdrop
- **Nested Modals**: Proper z-index management for stacked modals
- **Responsive Design**: Adapts to desktop, tablet, and mobile screens

## Accessibility

All modals include:
- ✅ Keyboard navigation support
- ✅ Screen reader friendly labels
- ✅ High contrast colors
- ✅ Focus indicators
- ✅ ARIA attributes

---

# Glossary

**PIDs (Product IDs)**: Unique product or batch identifiers assigned during audit

**SKUs (Stock Keeping Units)**: Individual product items tracked in inventory

**Appeared Deviations**: Initial discrepancies found during audit

**Matched Deviations**: Deviations verified as correct during re-audit

**Revised Deviations**: Items requiring correction after review

**Contra Short**: Items with less quantity than system records

**Contra Excess**: Items with more quantity than system records

**Match Rate**: Percentage of accurate audit findings (higher is better)

**Edit Rate**: Percentage of entries needing correction (lower is better)

**Job Types**:
- **Full Audit**: Complete inventory count of all items
- **Select SKUs**: Targeted audit of specific products
- **Partial Audit**: Audit of selected store sections

**Status Types**:
- **Created**: Audit set up but not started
- **In-Progress**: Currently active audit
- **Pending**: Awaiting action or approval
- **Completed**: Audit fully finalized

**Indian Currency Notation**:
- **L (Lakhs)**: 100,000 (1 lakh = 1,00,000)
- **Cr (Crores)**: 10,000,000 (1 crore = 1,00,00,000)

---

## Document Information

**Last Updated**: December 19, 2025  
**Version**: 1.0  
**Applies To**: MedPlus Audit Dashboard v1.0

## Related Documentation

- **USER_GUIDE.md**: Complete dashboard usage guide
- **FUNCTIONAL_SPECIFICATION.md**: Technical specifications
- **NESTED_DRILLDOWN_GUIDE.md**: Detailed drill-down functionality
- **QUICK_START.md**: Quick start guide for new users

---

© 2025 MedPlus Audit Dashboard. All rights reserved.
