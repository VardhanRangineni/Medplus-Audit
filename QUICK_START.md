# 🚀 Quick Start Guide - Audit HOD Dashboard

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Edge, Safari)

## Installation

### Step 1: Install Dependencies
```bash
cd "c:\Users\win\Documents\Medplus Audit"
npm install
```

This will install:
- React 19.2.0
- Bootstrap & React-Bootstrap
- Recharts (for visualizations)
- Font Awesome (for icons)

### Step 2: Start Development Server
```bash
npm run dev
```

The application will start at: **http://localhost:5173**

### Step 3: Access the Dashboard
Open your browser and navigate to the local URL shown in the terminal.

---

## 📂 Project Structure Overview

```
src/
├── components/          # Reusable components
│   ├── GlobalHeader.jsx    # Header with filters
│   ├── KPICard.jsx         # Metric cards
│   └── DrillDownModal.jsx  # Data drill-down
│
├── tabs/               # Main dashboard tabs
│   ├── StoreCoverage.jsx
│   ├── LiveAuditSchedule.jsx
│   ├── AuditorPerformance.jsx
│   └── SupervisorApprovals.jsx
│
├── services/           # API integration layer
│   └── mockDataService.js
│
├── App.jsx            # Main application
└── main.jsx           # Entry point
```

---

## 🎨 Dashboard Features

### Tab 1: Store Coverage & Inventory
- **View:** Store audit coverage statistics
- **Visualize:** Time since last audit (bar chart)
- **Analyze:** Inventory deviations (pie chart)
- **Action:** Click any metric to drill down

### Tab 2: Live Audit Schedule
- **Monitor:** Real-time audit status
- **Track:** Audit progress by store
- **Review:** Auditor-wise workload
- **Action:** Click store row for detailed progress

### Tab 3: Auditor Performance
- **Measure:** Productivity metrics
- **Compare:** Auditor completion rates
- **Identify:** Top performers and bottlenecks
- **Action:** Click auditor for PID-level details

### Tab 4: Supervisor Approvals
- **Oversee:** Supervisor workload
- **Approve:** Contra Short/Excess items
- **Prioritize:** High-value discrepancies
- **Action:** Click supervisor card or contra row

---

## 🔧 Configuration

### API Integration
Replace mock data in `src/services/mockDataService.js`:

```javascript
// Before (Mock Data)
return { totalActive: 450, covered: 385 };

// After (Real API)
return await api.get('/api/stores/coverage', { params: filters });
```

### Environment Variables
Create `.env` file in project root:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_API_TIMEOUT=30000
VITE_REFRESH_INTERVAL=120000
```

### Customization
**Change Colors:** Edit CSS files in components and tabs folders
**Add Filters:** Modify `src/components/GlobalHeader.jsx`
**New Metrics:** Create additional KPICard components

---

## 🎯 Common Tasks

### Add a New KPI Card
```jsx
<KPICard
  title="Your Metric"
  value="123"
  subtitle="Additional info"
  icon="fas fa-icon-name"
  color="primary"
  onClick={() => showDetails()}
/>
```

### Create a Drill-Down Modal
```jsx
setModalConfig({
  show: true,
  title: 'Detail View',
  data: yourDataArray,
  columns: [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { 
      key: 'value', 
      label: 'Value',
      render: (val) => `₹${val.toLocaleString()}`
    }
  ]
});
```

### Export Data to Excel
The drill-down modal has built-in export functionality. Users click the "Export to Excel" button, and data exports as CSV.

---

## 🐛 Troubleshooting

### Issue: Charts not rendering
**Solution:** Ensure Recharts is installed: `npm install recharts`

### Issue: Icons not showing
**Solution:** Check Font Awesome import in `main.jsx`:
```javascript
import '@fortawesome/fontawesome-free/css/all.min.css';
```

### Issue: Bootstrap styles not applied
**Solution:** Verify Bootstrap import in `main.jsx`:
```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Issue: Build fails
**Solution:** Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Sample Data

The application comes with comprehensive mock data for demonstration:
- 450+ stores across multiple states
- 6 auditors with varying performance
- 4 supervisors managing stores
- Live audit schedules with progress tracking
- Deviation data across multiple categories

---

## 🔐 Security Considerations

Before deploying to production:

1. **Add Authentication:**
   ```javascript
   // In App.jsx
   if (!user.isAuthenticated) {
     return <Redirect to="/login" />;
   }
   ```

2. **Implement Authorization:**
   ```javascript
   if (user.role !== 'HOD') {
     return <AccessDenied />;
   }
   ```

3. **Secure API Calls:**
   ```javascript
   headers: {
     'Authorization': `Bearer ${token}`
   }
   ```

4. **Enable HTTPS:**
   - Configure production server with SSL certificate
   - Enforce HTTPS redirects

---

## 📈 Performance Tips

### Optimize Re-renders
```javascript
import { memo } from 'react';
export default memo(YourComponent);
```

### Lazy Load Tabs
```javascript
import { lazy, Suspense } from 'react';
const StoreCoverage = lazy(() => import('./tabs/StoreCoverage'));
```

### Debounce Filter Changes
```javascript
import { useDebounce } from 'use-debounce';
const [debouncedFilters] = useDebounce(filters, 500);
```

---

## 🚀 Build for Production

### Create Production Build
```bash
npm run build
```

Output will be in `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Deploy to Server
```bash
# Example: Deploy to Apache/Nginx
cp -r dist/* /var/www/html/audit-dashboard/
```

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11 (not recommended)

---

## 📞 Support

For technical issues or questions:
- Check the [Functional Specification](./FUNCTIONAL_SPECIFICATION.md)
- Review the [Dashboard README](./DASHBOARD_README.md)
- Contact the development team

---

## 📝 Next Steps

1. **Connect Real API:** Replace mock data with actual backend endpoints
2. **Add Authentication:** Implement SSO or OAuth
3. **Customize Branding:** Update colors, logos, and labels
4. **Enable Monitoring:** Add error tracking and analytics
5. **User Testing:** Conduct UAT with actual HOD users

---

## 🎉 You're Ready!

Your Audit HOD Dashboard is now set up and ready for development. Start exploring the tabs, click on metrics to see drill-downs, and customize as needed!

**Happy Coding! 🚀**
