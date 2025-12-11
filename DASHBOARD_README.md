# Audit HOD Dashboard

## 📊 Overview

A comprehensive, enterprise-grade dashboard for Audit Head of Department (HOD) to monitor and manage audit operations in real-time. Built with React, Bootstrap, and Recharts.

## ✨ Features

### 🎯 Global Header & Filters
- **Persistent Filters Across All Tabs:**
  - Financial Year (Mandatory)
  - State, Store
  - Audit Job Type (Full/Partial)
  - Audit Process Type (Product/Batch)
  - Audit Status
- **System Controls:**
  - Last Refreshed Timestamp
  - Manual Refresh Button
  - Global Export to Excel Support

### 📈 Tab 1: Store Coverage & Inventory Metrics

#### KPI Summary Cards
- **Total Active Stores** - Absolute count with drill-down
- **Covered Stores** - Count + percentage with interactive details
- **Uncovered Stores** - Count + percentage with alerts

#### Store Recency Analysis
- Interactive bar chart showing stores by audit age:
  - 0-3 Months
  - 3-6 Months
  - 6-9 Months
  - 9-12 Months

#### Inventory Summary
- Total SKUs across all covered stores
- Total Quantity in inventory
- Total Inventory Value (₹)

#### Deviation Breakdown
- **Visual Distribution:** Interactive pie chart
- **Private vs Non-Private Products** split by:
  - Invoiced
  - Contra Short
  - Contra Excess
  - Excess Submitted
- Click any segment for SKU-level details

### 🔄 Tab 2: Live Audit Schedule & Status

#### Audit Workflow Tiles
Real-time counts of stores in each stage:
- **Created** - Not started
- **In Progress** - Actively running
- **Pending** - Awaiting action
- **Completed** - Finalized

#### Detailed Audit Table
- Store Name & ID
- Assigned Supervisor
- Assigned Auditors (with count badge)
- Audit Start Date
- Live Progress Bar (Completed vs Pending SKUs)

#### Live Audit Drill-Down
Click any store to view:
- Total vs Completed SKUs
- Inventory Value Coverage
- Auditor-wise allocation:
  - Assigned SKUs per auditor
  - Real-time completion status
  - Value covered by each auditor

### 👥 Tab 3: Auditor Performance & Productivity

#### Performance Cards
- **Average Time per SKU** - Productivity efficiency metric
- **Match Rate %** - Accuracy vs re-audit
- **Edit Rate %** - Quality indicator

#### Productivity Summary Table
For each auditor:
- Allotted SKUs
- Completed SKUs
- Completion Percentage (visual progress bar)
- Average Time/SKU
- Match Rate %
- Edit Rate %

#### Auditor Drill-Down (PID Workload View)
Click any auditor to see:
- List of assigned PIDs (Product/Batch IDs)
- Time spent per PID
- Completion status
- Deviation count
- Delay indicators and bottlenecks

#### Performance Insights
- **Top Performers** - Top 3 auditors by completion rate
- **Needs Attention** - Bottom 3 requiring support

### 🛡️ Tab 4: Supervisor Approvals & Re-audit

#### Supervisor Summary Cards
Interactive cards for each supervisor showing:
- Supervisor ID and Name
- Stores Managed
- Aggregate Audit Completion %
- Pending Approvals count
- Unallocated PIDs count

#### Re-audit Waterfall Visualization
Visual lifecycle of deviations:
1. Initially Appeared Deviations
2. Matched (Verified)
3. Edited (Modified by supervisor)
4. Pending (Awaiting action)

#### PID Allocation Overview
Load distribution showing:
- Total PIDs Allocated
- PIDs Unallocated
- Visual progress bars with allocation rates

#### Contra Approval Dashboard
**Critical Feature:** Contra Short & Contra Excess Management
- Display both **Quantity AND Value**
- Priority-based sorting (High/Medium/Low)
- Enable prioritization of high-value discrepancies
- Click for SKU-level details

## 🎨 Design Principles

### Enterprise-Grade UX
- ✅ Clean, modern Bootstrap-based design
- ✅ Clear visual hierarchy
- ✅ Consistent color coding:
  - Primary (Blue) - Main actions & info
  - Success (Green) - Positive metrics
  - Warning (Yellow) - Attention needed
  - Danger (Red) - Critical issues

### Interactivity
- ✅ Every KPI, chart, and metric is clickable
- ✅ Drill-down modals with sortable, filterable data grids
- ✅ Hover effects and smooth transitions
- ✅ Progress bars with percentage indicators

### Data Visibility
- ✅ Real-time status updates
- ✅ Visual progress indicators
- ✅ Badge-based status displays
- ✅ Color-coded performance metrics

### Export Capabilities
- ✅ Export to Excel from all drill-down views
- ✅ CSV format with proper headers
- ✅ Date-stamped file names

## 🛠️ Technical Stack

- **Frontend Framework:** React 19.2.0
- **UI Library:** React-Bootstrap
- **Visualization:** Recharts
- **Icons:** Font Awesome
- **Build Tool:** Vite
- **Styling:** Bootstrap 5 + Custom CSS

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies:** `npm install`
3. **Start the dev server:** `npm run dev`
4. **Open your browser:** Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── GlobalHeader.jsx       # Persistent header with filters
│   ├── GlobalHeader.css
│   ├── KPICard.jsx            # Reusable KPI card component
│   ├── KPICard.css
│   ├── DrillDownModal.jsx     # Interactive drill-down modal
│   └── DrillDownModal.css
├── tabs/
│   ├── StoreCoverage.jsx      # Tab 1: Store & Inventory
│   ├── StoreCoverage.css
│   ├── LiveAuditSchedule.jsx  # Tab 2: Live Audits
│   ├── LiveAuditSchedule.css
│   ├── AuditorPerformance.jsx # Tab 3: Auditor Metrics
│   ├── AuditorPerformance.css
│   ├── SupervisorApprovals.jsx # Tab 4: Supervisor & Re-audit
│   └── SupervisorApprovals.css
├── App.jsx                    # Main application component
├── App.css
├── main.jsx                   # Entry point
└── index.css                  # Global styles
```

## 🎯 Key Features Implementation

### 1. Global Filtering System
All filters apply across tabs in real-time. The filter state is managed at the App level and passed to all tab components.

### 2. Drill-Down Functionality
Every metric opens a detailed modal with:
- Searchable data grid
- Sortable columns (click headers)
- Export to Excel capability
- Record count badge

### 3. Real-Time Progress Tracking
- Live audit progress with SKU counts
- Auditor completion percentages
- Supervisor allocation rates
- Color-coded status indicators

### 4. Data Validation
- "N/A" display for missing data
- Logical consistency checks (Completed + Pending = Allotted)
- Visual mismatch highlighting

### 5. Responsive Design
- Mobile-friendly layout
- Adaptive charts and tables
- Collapsible sections for smaller screens

## 🔧 Customization

### Adding New Filters
Edit `GlobalHeader.jsx` to add new filter options.

### Modifying Colors
Update color schemes in component CSS files or override Bootstrap variables.

### Adding New Metrics
Create new KPICard components with appropriate props.

### API Integration
Replace mock data in tab components with API calls triggered by filter changes.

## 📊 Data Flow

```
User Action (Filter/Refresh)
    ↓
GlobalHeader Component
    ↓
App Component (State Management)
    ↓
Tab Components (Data Fetching)
    ↓
Visualization Components (Charts/Tables)
    ↓
DrillDownModal (Detailed View)
```

## 🎨 Color Scheme

- **Primary Blue:** `#0d6efd` - Main actions, info
- **Success Green:** `#198754` - Positive metrics
- **Warning Yellow:** `#ffc107` - Attention items
- **Danger Red:** `#dc3545` - Critical alerts
- **Info Cyan:** `#0dcaf0` - Informational
- **Light Gray:** `#f8f9fa` - Backgrounds

## 📝 Best Practices

1. **Performance:** Use React.memo() for expensive components
2. **State Management:** Consider Redux/Context for larger implementations
3. **API Calls:** Implement debouncing for filter changes
4. **Error Handling:** Add try-catch blocks and error boundaries
5. **Loading States:** Add skeleton loaders for better UX
6. **Accessibility:** All interactive elements have keyboard navigation

## 🔐 Security Considerations

- Implement proper authentication before deploying
- Sanitize all user inputs
- Use HTTPS for API calls
- Implement role-based access control
- Add audit logging for sensitive operations

## 📈 Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Advanced analytics and predictive insights
- [ ] Customizable dashboard layouts
- [ ] PDF report generation
- [ ] Mobile app version
- [ ] Email notifications for critical events
- [ ] Integration with BI tools

## 🤝 Support

For questions or issues, please contact the development team.

## 📄 License

Proprietary - MedPlus Audit System

---

**Built with ❤️ for MedPlus Audit Operations**
