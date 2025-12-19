# MedPlus Audit Dashboard - Modal Documentation

This directory contains comprehensive documentation for all modal components in the MedPlus Audit Dashboard.

## 📁 Directory Structure

```
docs/
├── README.md                              # This file
├── COMBINED_MODAL_DOCUMENTATION.md        # Complete documentation for all modals
├── COMBINED_MODAL_DOCUMENTATION.pdf       # PDF version of combined documentation
├── supervisor-modal.md                    # Supervisor Details Modal documentation
├── supervisor-modal.pdf                   # PDF version
├── auditor-modal.md                       # Auditor Details Modal documentation
├── auditor-modal.pdf                      # PDF version
├── audit-modal.md                         # Audit Details Modal documentation
├── audit-modal.pdf                        # PDF version
├── store-modal.md                         # Store Detail Modal documentation
├── store-modal.pdf                        # PDF version
└── screenshots/
    └── store-detail-modal.png             # Screenshot of Store Detail Modal
```

## 📚 Available Documentation

### Individual Modal Documentation

1. **[Supervisor Details Modal](./supervisor-modal.md)**
   - Comprehensive view of supervisor oversight and performance
   - Access from: Supervisor Approvals & Workload tab
   - Features: KPIs, deviation summary, audit history, downloads

2. **[Auditor Details Modal](./auditor-modal.md)**
   - Individual auditor performance and productivity metrics
   - Access from: Auditor Performance & Productivity tab
   - Features: Performance indicators, match rates, audit history

3. **[Audit Details Modal](./audit-modal.md)**
   - Single audit breakdown with re-audit metrics
   - Access from: Multiple locations (supervisor/auditor summaries, live audit schedule)
   - Features: Re-audit summary, participating auditors, expandable rows

4. **[Store Detail Modal](./store-modal.md)**
   - Store-specific audit progress and details
   - Access from: KPI drill-down pages
   - Features: Progress tracking, auditor assignments, deviation breakdown
   - Screenshot: [store-detail-modal.png](./screenshots/store-detail-modal.png)

### Combined Documentation

**[COMBINED_MODAL_DOCUMENTATION.md](./COMBINED_MODAL_DOCUMENTATION.md)**
- Complete documentation for all four modals in one file
- Includes comprehensive table of contents
- Common features and glossary
- Best for: Printing, offline reference, comprehensive review

## 🎯 Quick Reference

### By User Role

**Audit Managers / HODs:**
- Start with Supervisor Modal documentation for team oversight
- Use Auditor Modal for performance tracking
- Drill into Audit Modal for issue investigation

**Supervisors:**
- Review Supervisor Modal for self-monitoring
- Check Audit Modal before approving audits
- Use Auditor Modal for team coaching

**Auditors:**
- View Auditor Modal for self-assessment
- Track progress and quality metrics

**Store Managers:**
- Use Store Modal to understand audit progress
- Review deviations and contra items

### By Task

**Performance Reviews:**
- Auditor Modal → Supervisor Modal

**Issue Investigation:**
- Audit Modal → Auditor Modal → Supervisor Modal

**Planning & Forecasting:**
- Supervisor Modal → Auditor Modal → Audit Modal

## 📥 Downloads

All modals (except Store Detail) support:
- **Excel Export**: Multi-sheet workbooks
- **PDF Export**: Professional reports with color-coded tables

## 🔑 Common Features

- Date filtering (up to 1 year range)
- Interactive tables with sorting
- Pagination for large datasets
- Row click for drill-down
- Indian currency formatting (₹, L, Cr)

## 📸 Screenshots

Screenshots of modal interfaces are stored in the `screenshots/` subdirectory:
- `store-detail-modal.png` - Store Detail Modal interface

## 📝 File Formats

- **Markdown (.md)**: Source documentation files with full formatting
- **PDF (.pdf)**: Portable document format for printing and sharing

## 🔗 Related Documentation

- **[USER_GUIDE.md](../USER_GUIDE.md)**: Complete dashboard usage guide
- **[FUNCTIONAL_SPECIFICATION.md](../FUNCTIONAL_SPECIFICATION.md)**: Technical specifications
- **[NESTED_DRILLDOWN_GUIDE.md](../NESTED_DRILLDOWN_GUIDE.md)**: Detailed drill-down functionality
- **[SUMMARY_DOCUMENTATION_INDEX.md](../SUMMARY_DOCUMENTATION_INDEX.md)**: Main documentation index

## 📊 Glossary

**PIDs**: Product IDs - Unique product or batch identifiers  
**SKUs**: Stock Keeping Units - Individual product items tracked in inventory  
**Appeared Deviations**: Initial discrepancies found during audit  
**Matched Deviations**: Deviations verified as correct during re-audit  
**Revised Deviations**: Items requiring correction after review  
**Contra Short**: Items with less quantity than system records  
**Contra Excess**: Items with more quantity than system records  
**Match Rate**: Percentage of accurate audit findings (higher is better)  
**Edit Rate**: Percentage of entries needing correction (lower is better)

## 📅 Version Information

**Last Updated**: December 19, 2025  
**Version**: 1.0  
**Applies To**: MedPlus Audit Dashboard v1.0

## 📞 Support

For questions about the documentation:
- Refer to specific modal documentation files
- Check the USER_GUIDE.md for broader context
- Contact your audit team lead for process-specific questions

---

© 2025 MedPlus Audit Dashboard. All rights reserved.
