import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import GlobalHeader from './components/GlobalHeader';
import StoreCoverage from './tabs/StoreCoverage';
import LiveAuditSchedule from './tabs/LiveAuditSchedule';
import AuditorPerformance from './tabs/AuditorPerformance';
import SupervisorApprovals from './tabs/SupervisorApprovals';
import DetailsPage from './pages/DetailsPage';
import './App.css';

function App() {
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [filters, setFilters] = useState({
    financialYear: '2024-25',
    state: '',
    store: '',
    auditJobType: '',
    auditProcessType: '',
    auditStatus: ''
  });

  const handleRefresh = () => {
    setLastRefreshed(new Date());
    console.log('Dashboard refreshed at:', new Date());
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <div className="main-container">
          <GlobalHeader 
            lastRefreshed={lastRefreshed}
            onRefresh={handleRefresh}
            onFilterChange={handleFilterChange}
          />
          <main className="content-area">
            <Routes>
              <Route path="/" element={<StoreCoverage filters={filters} />} />
              <Route path="/live-audit" element={<LiveAuditSchedule filters={filters} />} />
              <Route path="/auditor-performance" element={<AuditorPerformance filters={filters} />} />
              <Route path="/supervisor-approvals" element={<SupervisorApprovals filters={filters} />} />
              <Route path="/details" element={<DetailsPage filters={filters} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
