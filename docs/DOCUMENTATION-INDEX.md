# MedPlus Audit System - Functional Documentation Index

This directory contains comprehensive functional documentation for the MedPlus Audit Dashboard application, created specifically for managerial and non-technical review.

## Documentation Structure

### Main Screens

- **dashboard-main-screen.md** - The primary landing page with store coverage metrics, charts, and inventory summaries
- **total-stores-details-screen.md** - Detailed table view of all stores in the system
- **covered-stores-details-screen.md** - Detailed view of stores that have been audited, with clickable rows
- **live-audit-schedule-screen.md** - Real-time view of ongoing audits with progress tracking

### Components

- **sidebar-navigation-component.md** - Left sidebar navigation menu present on all screens
- **global-header-component.md** - Top header with filters and refresh controls present on all screens

### Modals

- **store-detail-modal.md** - Pop-up modal showing comprehensive audit details for a selected store
- **supervisor-details-modal.md** - Pop-up modal showing detailed performance metrics for an individual supervisor
- **auditor-details-modal.md** - Pop-up modal showing detailed performance metrics for an individual auditor
- **audit-specific-details-modal.md** - Pop-up modal showing complete details about a specific audit including re-audit summary and participating auditors

### Additional Screens

- **auditor-performance-screen.md** - Screen for reviewing individual auditor productivity and quality metrics  
- **supervisor-performance-screen.md** - Screen for supervisor performance and workload management
- **uncovered-stores-details-screen.md** - Screen showing stores that have never been audited

### Screenshots

All screenshots are stored in the `screenshots/` directory and are embedded in the corresponding markdown files:

- `dashboard-main.png` - Full dashboard view
- `total-stores-details.png` - Total stores table view
- `covered-stores-details.png` - Covered stores table with audit columns
- `store-detail-modal-completed.png` - Modal showing completed audit details
- `live-audit-schedule.png` - Live audit screen with in-progress audits
- `uncovered-stores-details.png` - Uncovered stores table view
- `auditor-performance-screen.png` - Auditor performance metrics screen
- `supervisor-approvals-screen.png` - Supervisor performance screen (renamed from supervisor-approvals)
- `supervisor-details-modal.png` - Individual supervisor details modal
- `auditor-details-modal.png` - Individual auditor details modal
- `audit-details-modal.png` - Specific audit details modal

## How to Use This Documentation

1. **Start with the Dashboard** - Begin by reading `dashboard-main-screen.md` to understand the main interface
2. **Follow the Navigation Flow** - Review `sidebar-navigation-component.md` and `global-header-component.md` to understand how to move between screens
3. **Explore Detail Screens** - Read the individual screen documentation to understand each section's purpose
4. **Understand Interactions** - Each document includes "Interaction Behavior" sections explaining what happens when users click elements

## Documentation Standards

Each markdown file follows this structure:
- **When This Screen Appears** - Preconditions and triggering actions
- **Complete UI Breakdown** - Exhaustive description of every visible element
- **Interaction Behavior** - Step-by-step explanation of user actions and system responses
- **Purpose of Every Action** - Business and operational rationale for each feature
- **Visual Documentation** - Embedded screenshots showing the actual interface

## Intended Audience

This documentation is created for:
- Management teams reviewing system functionality
- Decision-makers evaluating operational capabilities
- Non-technical stakeholders understanding workflow
- Business users learning how to interpret displayed information

## What This Documentation Does NOT Cover

As specified in requirements, this documentation intentionally excludes:
- Technical implementation details
- Code structure or programming languages
- Database schemas or API specifications
- System architecture or infrastructure
- Installation or configuration procedures

## PDF Versions

PDF versions of each markdown file should be generated for offline review and distribution to stakeholders.

## Updates and Maintenance

This documentation reflects the system as of December 18, 2025. As features are added or modified, corresponding documentation files should be updated to maintain accuracy.
