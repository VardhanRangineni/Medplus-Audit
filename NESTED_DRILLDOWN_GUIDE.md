# Nested Drill-Down Feature Documentation

## Overview
The Medplus Audit Dashboard now supports **nested drill-down functionality** that allows users to:
1. Click on KPI cards to view a list of stores
2. Click on individual stores to view detailed store-specific information
3. See store deviations, contra items, auditor assignments, and progress in a mini dashboard

## How It Works

### Level 1: KPI Card Click
When you click on a KPI card (e.g., "Total Active Stores", "In Progress", etc.), you'll be taken to a details page showing all relevant stores.

**Example Flow:**
1. Click "In Progress" KPI card (showing 128 audits)
2. See a table with all 128 stores currently in progress
3. Each row contains store information (Store ID, Name, State, Supervisor, Progress, etc.)

### Level 2: Store Row Click
When you click on any store row, a **Store Detail Modal** opens showing:

#### Store Information Header
- **Store ID**: Unique identifier (e.g., MP001)
- **State**: Location state
- **Supervisor**: Assigned supervisor name
- **Audit Progress**: Current completion percentage with visual progress bar

#### Mini Dashboard KPIs
Four key metrics displayed in card format:
1. **Total SKUs**: Total and audited SKU count
2. **Inventory Value**: Total value of store inventory
3. **Total Deviations**: Count and value of all deviations
4. **Contra Items**: Count and value of contra items

#### Assigned Auditors Table
Shows all auditors working on this store with:
- Auditor Name
- Assigned SKUs
- Completed SKUs
- Progress percentage with visual indicator
- Match Rate (accuracy percentage)

#### Deviations Breakdown
- **Pie Chart**: Visual distribution of deviation types
- **Table**: Detailed breakdown by type
  - Deviation Type (Invoiced, Contra Short, Contra Excess, etc.)
  - Count of items
  - Total value

#### Contra Summary
- **Summary Cards**: 
  - Contra Short (items less than system)
  - Contra Excess (items more than system)
- **Detailed Table**:
  - SKU Code
  - Product Name
  - Type (Short/Excess)
  - Quantity variance
  - Value
  - Approval Status

## Enabled Views

The store drill-down feature is enabled for these view types:

1. **Total Active Stores** - All stores in the system
2. **Covered Stores** - Stores that have been audited
3. **Uncovered Stores** - Stores pending audit
4. **Created Audits** - Newly created audit jobs
5. **In Progress Audits** - Currently running audits
6. **Pending Audits** - Paused or awaiting action
7. **Completed Audits** - Finished audits

## User Interface Indicators

### Visual Cues
- **Blue info icon**: Appears in the header when store click is enabled
- **Pointer cursor**: Changes when hovering over clickable store rows
- **Highlight effect**: Row background changes to light blue on hover
- **Smooth transition**: Row slides slightly when hovered

### Instructions
When viewing a page with clickable stores, you'll see:
> ℹ️ Click on any store row to view detailed information

## Mock Data Structure

Each store has the following detailed information:

### Store Details
```javascript
{
  storeId: 'MP001',
  storeName: 'Chennai Central',
  state: 'TN',
  supervisor: 'Rajesh Kumar',
  auditProgress: { percentage: 77.4, completedSKUs: 3250, totalSKUs: 4200 },
  inventorySummary: { totalSKUs: 4200, auditedSKUs: 3250, totalValue: 525000 },
  auditors: [...],
  deviations: [...],
  contra: [...]
}
```

### Sample Stores Available
- **MP001**: Chennai Central (77.4% complete)
- **MP002**: Bangalore Hub (71.8% complete)
- **MP003**: Hyderabad Main (78.8% complete)
- **MP004**: Pune West (59.7% complete)
- **MP005**: Mumbai Central (61.5% complete)

## Technical Implementation

### Components Created
1. **StoreDetailModal.jsx**: Main modal component for displaying store details
2. **StoreDetailModal.css**: Styling for the store detail modal

### Components Updated
1. **DrillDownModal.jsx**: Added nested modal support and row click handling
2. **DetailsPage.jsx**: Enabled store click functionality with visual indicators

### Services Updated
1. **mockDataService.js**: Added `getStoreDetailedInfo()` method with comprehensive store data

### Key Features
- **Responsive Design**: Modal adapts to different screen sizes
- **Interactive Charts**: Recharts integration for deviation visualization
- **Progress Indicators**: Bootstrap progress bars for completion tracking
- **Status Badges**: Color-coded badges for different statuses
- **Scrollable Tables**: Long lists scroll independently
- **Export Ready**: All data can be exported to Excel

## Usage Example

### Step-by-Step User Journey

1. **Navigate to Dashboard**
   - Open the Audit HOD Dashboard

2. **Select a View**
   - Click on "Live Audit Schedule" tab
   - View the workflow status cards

3. **Drill Down to Stores**
   - Click "In Progress" card (128 audits)
   - See all stores currently being audited

4. **View Store Details**
   - Click on "Chennai Central" row
   - Store Detail Modal opens

5. **Explore Store Data**
   - Review audit progress (77.4%)
   - Check auditor performance (3 auditors)
   - Analyze deviations (4 types, ₹30K total)
   - Review contra items (5 items pending approval)

6. **Close and Return**
   - Click "Close" button
   - Return to store list
   - Select another store or navigate back

## Benefits

### For Auditors
- Quick access to store-specific metrics
- Clear visibility of pending items
- Easy tracking of progress

### For Supervisors
- Comprehensive store overview
- Team performance visibility
- Deviation and contra monitoring

### For Management
- High-level and detailed views
- Data-driven decision making
- Quick identification of issues

## Future Enhancements

Potential improvements for the feature:

1. **Real-time Updates**: WebSocket integration for live data
2. **Drill-down to SKU Level**: Click on deviation/contra items
3. **Historical Trends**: Show store performance over time
4. **Comparison View**: Compare multiple stores side-by-side
5. **Action Buttons**: Approve contra, reassign auditors, etc.
6. **Print/PDF Export**: Generate store reports
7. **Notifications**: Alert for critical deviations
8. **Custom Filters**: Filter deviations by type, value, etc.

## API Integration

When integrating with real backend APIs, replace the mock service calls:

```javascript
// Current (Mock)
const storeData = await mockDataService.getStoreDetailedInfo(storeId);

// Future (Real API)
const storeData = await api.get(`/api/stores/${storeId}/details`);
```

The expected API response structure is already defined in the mock service.

## Troubleshooting

### Store Modal Doesn't Open
- Ensure the store has a valid `storeId` in the data
- Check browser console for errors
- Verify mock data exists for that store

### Data Not Displaying
- Check if `mockDataService.getStoreDetailedInfo()` returns data
- Verify the storeId matches available mock data
- Ensure all required fields are present

### Performance Issues
- Reduce the number of items in deviation/contra tables
- Implement pagination for large datasets
- Use virtualization for long lists

## Accessibility

The feature includes:
- ✅ Keyboard navigation support
- ✅ Screen reader friendly labels
- ✅ High contrast colors
- ✅ Focus indicators
- ✅ ARIA attributes

## Browser Support

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

**Last Updated**: December 11, 2025  
**Version**: 1.0.0  
**Author**: Development Team
