# MedPlus Audit Dashboard - User Documentation

## Overview

This documentation provides comprehensive functional documentation for the MedPlus Audit Dashboard system. The documentation is designed for managerial and operational users to understand what the system does and how to use it effectively.

## Documentation Structure

This documentation is organized by screen and interaction:

### Core Screens

1. **[Global Header](global-header.md)** - Filter controls and refresh functionality available on every screen
2. **[Sidebar Navigation](sidebar-navigation.md)** - Main navigation menu to access all sections
3. **[Store Coverage Screen](store-coverage-screen.md)** - Main dashboard showing store audit coverage and inventory metrics
4. **[Store Details Page](store-details-page.md)** - Detailed table view of stores with filtering and export
5. **[Live Audit Schedule Screen](live-audit-schedule-screen.md)** - Real-time monitoring of ongoing audits
6. **[Auditor Performance Screen](auditor-performance-screen.md)** - Individual auditor productivity and quality metrics
7. **[Supervisor Approvals Screen](supervisor-approvals-screen.md)** - Supervisor workload and performance tracking

### Interactive Components

8. **[Store Detail Modal](store-detail-modal.md)** - Detailed audit information popup with auditor assignments

## Quick Navigation Guide

### For Operations Managers
- Start with **[Store Coverage Screen](store-coverage-screen.md)** to understand overall audit status
- Use **[Live Audit Schedule Screen](live-audit-schedule-screen.md)** to monitor daily operations
- Review **[Store Details Page](store-details-page.md)** to identify uncovered stores

### For Audit Supervisors
- Monitor **[Live Audit Schedule Screen](live-audit-schedule-screen.md)** for real-time progress
- Use **[Store Detail Modal](store-detail-modal.md)** to review specific audit details
- Check **[Auditor Performance Screen](auditor-performance-screen.md)** to manage your team

### For Senior Management
- Review **[Store Coverage Screen](store-coverage-screen.md)** for high-level metrics
- Use **[Supervisor Approvals Screen](supervisor-approvals-screen.md)** for workload distribution
- Use **[Auditor Performance Screen](auditor-performance-screen.md)** for team assessment

## Common Tasks

### Finding Uncovered Stores
1. Go to **[Store Coverage Screen](store-coverage-screen.md)**
2. Click on "Uncovered Stores" KPI card
3. View **[Store Details Page](store-details-page.md)** with filtered list
4. Export to Excel for planning

### Monitoring Audit Progress
1. Navigate to **[Live Audit Schedule Screen](live-audit-schedule-screen.md)**
2. Click on "In Progress" status card
3. Click on any audit row to open **[Store Detail Modal](store-detail-modal.md)**
4. Review auditor assignments and progress

### Evaluating Auditor Performance
1. Open **[Auditor Performance Screen](auditor-performance-screen.md)**
2. Review "Top Performers" and "Needs Attention" sections
3. Sort table by relevant metrics
4. Click on auditor for detailed history

### Checking Supervisor Workload
1. Navigate to **[Supervisor Approvals Screen](supervisor-approvals-screen.md)**
2. Review workload distribution across supervisors
3. Sort by "Total Audits" or "Days Supervised"
4. Click on supervisor for detailed team view

## Key Features Available on Every Screen

### Global Filters (from [Global Header](global-header.md))
- **Financial Year** - Filter data by fiscal period
- **State** - View data for specific geographic regions
- **Store Type** - Filter by HUB or Regular stores
- **Audit Job Type** - Filter by Full, Partial, or Select SKU audits
- **Process Type** - Filter by Product or Batch audit process
- **Audit Status** - Filter by Created, Pending, In Progress, or Completed

### Export Capabilities
All major screens include export buttons to download data for:
- Offline analysis
- Sharing with stakeholders
- Executive reporting
- Historical archival

### Real-time Updates
The system provides current data with:
- Last Refreshed timestamp
- Manual Refresh button
- Live progress indicators
- Up-to-date metrics

## Understanding the Data

### Store Metrics
- **Total Stores** - All pharmacy locations in the network
- **Covered Stores** - Stores that have been audited
- **Uncovered Stores** - Stores needing audit assignment
- **Store Recency** - Time since last audit for each store

### Audit Metrics
- **PIDs** - Physical Inventory Documents (groups of items)
- **SKUs** - Stock Keeping Units (individual product types)
- **Quantity** - Total units of all products
- **Inventory Value** - Monetary value in Rupees

### Performance Metrics
- **Match Rate** - Accuracy percentage (auditor count vs. system record)
- **Edit Rate** - Percentage of entries requiring correction
- **Time per PID** - Average minutes to audit one document
- **Time per SKU** - Average minutes to audit one product

### Deviation Types
- **Invoiced** - Items recorded as received but not found
- **Contra Short** - Physical count less than system record
- **Contra Excess** - Physical count more than system record
- **Excess Submitted** - Overages formally reported

## System Conventions

### Status Indicators
- **Green checkmark** - Completed, Active, or Good status
- **Yellow clock** - Pending or Awaiting action
- **Red triangle** - Warning, Uncovered, or Needs attention
- **Blue progress** - In Progress or Ongoing

### Interactive Elements
- **Blue underlined text** - Clickable links
- **"Click for details" links** - Navigate to detail views
- **Hover effects** - Visual feedback on clickable items
- **Progress bars** - Visual completion indicators

### Data Presentation
- **Large numbers** - Key performance indicators
- **Percentages** - Completion rates and accuracy metrics
- **Charts** - Trend analysis and distribution
- **Tables** - Detailed data with sorting and filtering

## Support and Additional Information

For questions about specific features, refer to the individual screen documentation linked above. Each document provides:
- When the screen appears
- Complete UI breakdown
- Interaction behavior details
- Purpose of every action
- Business context for features
