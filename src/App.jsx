import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import GlobalHeader from './components/GlobalHeader';
import StoreCoverage from './tabs/StoreCoverage';
import LiveAuditSchedule from './tabs/LiveAuditSchedule';
import AuditorPerformance from './tabs/AuditorPerformance';
import SupervisorApprovals from './tabs/SupervisorApprovals';
import StorePIDAllotment from './pages/StorePIDAllotment';
import DetailsPage from './pages/DetailsPage';
import './App.css';

function AppContent() {
  const location = useLocation();
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [filters, setFilters] = useState({
    financialYear: '2025-26',
    state: [],
    store: [],
    auditJobType: [],
    auditProcessType: [],
    auditStatus: []
  });

  const handleRefresh = () => {
    setLastRefreshed(new Date());
    console.log('Dashboard refreshed at:', new Date());
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  // Hide filters for Store PID Allotment page
  const hideFilters = location.pathname === '/store-pid-allotment';
  // Hide Financial Year filter for Live Audit page
  const hideFinancialYear = location.pathname === '/live-audit';

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-container">
        <GlobalHeader
          lastRefreshed={lastRefreshed}
          onRefresh={handleRefresh}
          filters={filters}
          onFilterChange={handleFilterChange}
          hideFilters={hideFilters}
          hideFinancialYear={hideFinancialYear}
        />
        <main className="content-area">
          <Routes>
            <Route path="/" element={<StoreCoverage filters={filters} />} />
            <Route path="/live-audit" element={<LiveAuditSchedule filters={filters} />} />
            <Route path="/auditor-performance" element={<AuditorPerformance filters={filters} />} />
            <Route path="/supervisor-approvals" element={<SupervisorApprovals filters={filters} />} />
            <Route path="/store-pid-allotment" element={<StorePIDAllotment />} />
            <Route path="/details" element={<DetailsPage filters={filters} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
