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
  const [filters, setFilters] = useState({});
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters applied:', newFilters);
  };

  const handleRefresh = () => {
    setLastRefreshed(new Date());
    console.log('Dashboard refreshed at:', new Date());
  };

  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <div className="main-container">
          <GlobalHeader 
            onFilterChange={handleFilterChange}
            lastRefreshed={lastRefreshed}
            onRefresh={handleRefresh}
          />
          <main className="content-area">
            <Routes>
              <Route path="/" element={<StoreCoverage />} />
              <Route path="/live-audit" element={<LiveAuditSchedule />} />
              <Route path="/auditor-performance" element={<AuditorPerformance />} />
              <Route path="/supervisor-approvals" element={<SupervisorApprovals />} />
              <Route path="/details" element={<DetailsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
