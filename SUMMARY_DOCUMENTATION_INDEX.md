# Summary Documentation Index

## Overview

This directory contains comprehensive documentation for the MedPlus Audit Dashboard, including summary views and detailed modal documentation. These resources provide detailed insights into supervisor oversight, auditor performance, individual audit breakdowns, and store-level details.

## 📁 Documentation Structure

- **Root Directory**: Main documentation files (this location)
- **[docs/ Directory](./docs/)**: Organized modal documentation with PDFs and screenshots

## Available Summary Documentation

### 📊 [Supervisor Summary](./SUPERVISOR_SUMMARY.md)

Complete documentation for Supervisor Summary views and downloads.

**Key Topics Covered:**
- How to access supervisor summaries
- On-screen metrics and visualizations
- Deviation analysis (Appeared, Matched, Revised)
- Date filtering and data aggregation
- Excel and PDF download functionality
- Use cases and best practices for audit managers

**Best For:**
- Audit managers monitoring supervisor performance
- Supervisors reviewing their own metrics
- Resource planning and workload distribution

---

### 👤 [Auditor Summary](./AUDITOR_SUMMARY.md)

Complete documentation for Auditor Summary views and downloads.

**Key Topics Covered:**
- How to access auditor summaries
- Performance metrics (Match Rate, Edit Rate, Time per SKU)
- Audit history and productivity tracking
- Date filtering capabilities
- Excel and PDF download functionality
- Data interpretation for performance reviews

**Best For:**
- Performance evaluations and coaching
- Quality monitoring and training needs
- Workload assessment and capacity planning

---

### 🔍 [Audit-Specific Summary](./AUDIT_SPECIFIC_SUMMARY.md)

Complete documentation for Audit-Specific Summary views and downloads.

**Key Topics Covered:**
- How to access individual audit details
- Re-audit metrics breakdown
- Participating auditor performance
- Expandable auditor-level details
- Excel and PDF download functionality
- Store-specific deviation analysis

**Best For:**
- Detailed audit verification
- Issue investigation and root cause analysis
- Store-level inventory accuracy assessment
- Team performance comparison within same audit

---

### 🏪 [Store Detail Modal](./docs/store-modal.md)

Complete documentation for Store Detail Modal with screenshot.

**Key Topics Covered:**
- How to access store details
- Store information and progress tracking
- Assigned auditors table
- Deviations breakdown and contra summary
- Visual indicators and modal behavior

**Best For:**
- Daily monitoring of store audit progress
- Reviewing auditor assignments and performance
- Analyzing store-specific deviations
- Tracking contra items requiring approval

**Screenshot Available:** [Store Detail Modal Screenshot](./docs/screenshots/store-detail-modal.png)

---

## 📚 Complete Modal Documentation

For comprehensive modal documentation with PDF versions:

### [docs/ Directory - Complete Modal Documentation](./docs/)

The `docs/` directory contains:
- **Individual modal documentation** (Markdown + PDF):
  - [Supervisor Details Modal](./docs/supervisor-modal.md)
  - [Auditor Details Modal](./docs/auditor-modal.md)
  - [Audit Details Modal](./docs/audit-modal.md)
  - [Store Detail Modal](./docs/store-modal.md)
- **[Combined documentation](./docs/COMBINED_MODAL_DOCUMENTATION.md)** with complete table of contents (Markdown + PDF)
- **Screenshots** of modal interfaces

---

## Quick Navigation

### By User Role

**Audit Managers / HODs:**
- Start with [Supervisor Summary](./SUPERVISOR_SUMMARY.md) to understand team oversight
- Use [Auditor Summary](./AUDITOR_SUMMARY.md) for individual performance tracking
- Drill into [Audit-Specific Summary](./AUDIT_SPECIFIC_SUMMARY.md) for issue investigation

**Supervisors:**
- Review your own [Supervisor Summary](./SUPERVISOR_SUMMARY.md) for self-monitoring
- Check [Audit-Specific Summary](./AUDIT_SPECIFIC_SUMMARY.md) before approving audits
- Use [Auditor Summary](./AUDITOR_SUMMARY.md) for team coaching

**Auditors:**
- View your [Auditor Summary](./AUDITOR_SUMMARY.md) for self-assessment
- Track your progress and quality metrics
- Compare your performance against benchmarks

**Store Managers:**
- Check [Store Detail Modal](./docs/store-modal.md) for audit progress
- Review deviations and contra items
- Monitor assigned auditor performance

### By Task

**Performance Reviews:**
1. [Auditor Summary](./AUDITOR_SUMMARY.md) - Individual metrics
2. [Supervisor Summary](./SUPERVISOR_SUMMARY.md) - Oversight quality

**Issue Investigation:**
1. [Audit-Specific Summary](./AUDIT_SPECIFIC_SUMMARY.md) - Root cause analysis
2. [Auditor Summary](./AUDITOR_SUMMARY.md) - Individual auditor contribution
3. [Supervisor Summary](./SUPERVISOR_SUMMARY.md) - Pattern identification

**Planning & Forecasting:**
1. [Supervisor Summary](./SUPERVISOR_SUMMARY.md) - Workload distribution
2. [Auditor Summary](./AUDITOR_SUMMARY.md) - Capacity assessment
3. [Audit-Specific Summary](./AUDIT_SPECIFIC_SUMMARY.md) - Team coordination

---

## Common Features Across All Summaries

### 📥 Download Functionality

All three summaries support:
- **Excel Export**: Multi-sheet workbooks with summary and detail sheets
- **PDF Export**: Professional reports with color-coded tables
- **Date Filtering**: Adjustable date ranges (up to 1 year)
- **Indian Currency Formatting**: Lakhs (L) and Crores (Cr) notation

### 🎯 Data Quality

All summaries include:
- **Real-time Data**: Updated as audits progress
- **Date Validation**: Prevents invalid date selections
- **Aggregated Metrics**: Properly summed across selected periods
- **Sortable Tables**: Click headers to sort by any column

### 🔐 Security & Access

- Role-based access control ensures appropriate visibility
- Audit trails maintained for all data access
- No sensitive information exposed in summaries

---

## Download File Naming Conventions

| Summary Type | Excel Format | PDF Format |
|--------------|--------------|------------|
| Supervisor | `Supervisor_{ID}_Report.xlsx` | `Supervisor_{ID}_Report.pdf` |
| Auditor | `Auditor_{Name}_metrics.xlsx` | `Auditor_{Name}_Report_{Date}.pdf` |
| Audit-Specific | `Audit_{AuditID}_Report.xlsx` | `Audit_{AuditID}_Report.pdf` |

---

## Key Metrics Glossary

**Common Terms Across Summaries:**

- **PIDs (Product IDs)**: Unique product or batch identifiers assigned during audit
- **SKUs (Stock Keeping Units)**: Individual product items tracked in inventory
- **Appeared Deviations**: Initial discrepancies found during audit
- **Matched Deviations**: Deviations verified as correct
- **Revised Deviations**: Items requiring correction after review
- **Match Rate**: Percentage of accurate audit findings (higher is better)
- **Edit Rate**: Percentage of entries needing correction (lower is better)
- **Indian Currency Format**: ₹ with L (Lakhs = 100,000) or Cr (Crores = 10,000,000)

---

## Related Documentation

### Main Dashboard Documentation
- **[USER_GUIDE.md](./USER_GUIDE.md)**: Complete guide to using the audit dashboard
- **[FUNCTIONAL_SPECIFICATION.md](./FUNCTIONAL_SPECIFICATION.md)**: Technical specifications and requirements
- **[NESTED_DRILLDOWN_GUIDE.md](./NESTED_DRILLDOWN_GUIDE.md)**: Detailed drill-down functionality

### Quick Start Guides
- **[QUICK_START.md](./QUICK_START.md)**: Get started quickly with the dashboard
- **[DASHBOARD_README.md](./DASHBOARD_README.md)**: Overview of dashboard features

---

## Support & Feedback

### For Questions
- Refer to the specific summary documentation linked above
- Check the [USER_GUIDE.md](./USER_GUIDE.md) for broader context
- Contact your audit team lead for process-specific questions

### For Technical Issues
- Clear browser cache and reload
- Ensure you're using a supported browser (Chrome, Firefox, Edge)
- Contact IT support for system access issues

---

## Document Version Information

**Last Updated**: December 2025  
**Applies To**: MedPlus Audit Dashboard v1.0  
**Documentation Coverage**:
- ✅ Supervisor Summary (complete)
- ✅ Auditor Summary (complete)
- ✅ Audit-Specific Summary (complete)

---

## What's Not Covered

These summary documents focus specifically on the three modal summaries and their download functionality. They do **not** cover:
- Store Coverage & Inventory metrics
- Live Audit Schedule views
- Global dashboard filters
- User authentication and access control
- Backend data processing

For information on these topics, please refer to the [USER_GUIDE.md](./USER_GUIDE.md) and [FUNCTIONAL_SPECIFICATION.md](./FUNCTIONAL_SPECIFICATION.md).
