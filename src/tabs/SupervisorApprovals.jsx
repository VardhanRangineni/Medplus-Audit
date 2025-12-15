import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar, Alert, Button, Modal } from 'react-bootstrap';

import KPICard from '../components/KPICard';
import SupervisorDetailModal from '../components/SupervisorDetailModal';
import rawAuditData from '../data/audit_dataset_200_records.json';
import './SupervisorApprovals.css';

// Reusable Table Component for Supervisors
<<<<<<< Updated upstream
const SupervisorTable = ({ data, onRowClick }) => (
  <Table hover className="mb-0">
    <thead className="bg-light">
      <tr>
        <th>Supervisor</th>
        <th>Stores Managed</th>
        <th style={{ minWidth: '200px' }}>Audit Completion</th>
        <th className="text-center">Pending Approvals</th>
        <th className="text-center">Unallocated PIDs</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((supervisor, idx) => (
        <tr key={idx} onClick={() => onRowClick(supervisor)} style={{ cursor: 'pointer' }}>
          <td>
            <div className="d-flex align-items-center">
              <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                <i className="fas fa-user text-secondary"></i>
              </div>
              <div>
                <div className="fw-bold">{supervisor.supervisorName}</div>
                <small className="text-muted">{supervisor.supervisorId}</small>
              </div>
=======
// Reusable Table Component for Supervisors
const SupervisorTable = ({ data, onRowClick, sortConfig, requestSort }) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <i className="fas fa-sort text-muted ms-1 small"></i>;
    return sortConfig.direction === 'ascending'
      ? <i className="fas fa-sort-up text-primary ms-1 small"></i>
      : <i className="fas fa-sort-down text-primary ms-1 small"></i>;
  };

  return (
    <Table hover className="mb-0 hover-scale-row align-middle">
      <thead className="bg-light sticky-top" style={{ top: 0, zIndex: 20 }}>
        <tr className="align-middle">
          <th onClick={() => requestSort('supervisorId')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              ID {getSortIcon('supervisorId')}
>>>>>>> Stashed changes
            </div>
          </th>
          <th onClick={() => requestSort('supervisorName')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Name {getSortIcon('supervisorName')}
            </div>
<<<<<<< Updated upstream
          </td>
          <td className="text-center">
            {supervisor.pendingApprovals > 0 ? (
              <Badge bg="warning" text="dark" pill className="px-3 py-2">
                {supervisor.pendingApprovals}
              </Badge>
            ) : <span className="text-muted">-</span>}
          </td>
          <td className="text-center">
            {supervisor.unallocatedPIDs > 0 ? (
              <Badge bg="danger" pill className="px-3 py-2">
                {supervisor.unallocatedPIDs}
              </Badge>
            ) : <span className="text-success"><i className="fas fa-check"></i></span>}
          </td>
          <td>
            <Button variant="light" size="sm" className="rounded-circle">
              <i className="fas fa-chevron-right text-primary"></i>
            </Button>
          </td>
=======
          </th>
          <th onClick={() => requestSort('storesManaged')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Stores Managed {getSortIcon('storesManaged')}
            </div>
          </th>
          <th onClick={() => requestSort('totalAudits')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Total Audits {getSortIcon('totalAudits')}
            </div>
          </th>
          <th onClick={() => requestSort('totalPIDs')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Total SKUs {getSortIcon('totalPIDs')}
            </div>
          </th>
          <th onClick={() => requestSort('auditCompletion')} style={{ cursor: 'pointer', minWidth: '200px' }}>
            <div className="d-flex align-items-center gap-1">
              Audit Completion {getSortIcon('auditCompletion')}
            </div>
          </th>
          <th onClick={() => requestSort('pendingApprovals')} style={{ cursor: 'pointer' }} className="text-center">
            <div className="d-flex align-items-center justify-content-center gap-1">
              Pending Approvals {getSortIcon('pendingApprovals')}
            </div>
          </th>
          <th>Actions</th>
>>>>>>> Stashed changes
        </tr>
      </thead>
      <tbody>
        {data.map((supervisor, idx) => (
          <tr key={idx} onClick={() => onRowClick(supervisor)} style={{ cursor: 'pointer' }}>
            <td>
              <Badge bg="light" text="dark" className="font-monospace">
                {supervisor.supervisorId}
              </Badge>
            </td>
            <td>
              <div className="fw-bold">{supervisor.supervisorName}</div>
            </td>
            <td>
              <div className="fs-5 fw-semibold">{supervisor.storesManaged}</div>
            </td>
            <td>
              <div className="fs-5 fw-semibold">{supervisor.totalAudits}</div>
            </td>
            <td>
              <div className="fs-5 fw-semibold">{supervisor.totalPIDs?.toLocaleString()}</div>
            </td>
            <td>
              <div className="d-flex align-items-center gap-2">
                <ProgressBar now={supervisor.auditCompletion} variant={supervisor.auditCompletion >= 90 ? 'success' : 'primary'} style={{ height: '8px', flex: 1 }} />
                <span className="small fw-bold">{supervisor.auditCompletion}%</span>
              </div>
            </td>
            <td className="text-center">
              {supervisor.pendingApprovals > 0 ? (
                <Badge bg="warning" text="dark" pill className="px-3 py-2">
                  {supervisor.pendingApprovals}
                </Badge>
              ) : <span className="text-muted">-</span>}
            </td>
            <td>
              <Button variant="light" size="sm" className="rounded-circle">
                <i className="fas fa-chevron-right text-primary"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const SupervisorApprovals = ({ filters = {} }) => {
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'supervisorId', direction: 'ascending' });

  // Check if any filters are active
  const hasActiveFilters = filters.state || filters.store || filters.auditJobType || filters.auditProcessType || filters.auditStatus;

  // Process data to get supervisor metrics and global aggregated stats
  const { supervisorData, overallMetrics } = useMemo(() => {
    const supervisorMap = {};


    // Helper to track unique audits per supervisor to avoid double counting TotalPIDs
    const supervisorAuditMap = {};
    const auditTotalPIDsMap = {};

    rawAuditData.forEach(record => {
      // Collect Global Audit Info
      if (!auditTotalPIDsMap[record.AUDIT_ID]) {
        auditTotalPIDsMap[record.AUDIT_ID] = record.TotalPIDs || 0;
      }

      // Filter Logic
      if (filters.financialYear && filters.financialYear !== 'All-time') {
        const date = new Date(record.AuditDate);
        const month = date.getMonth();
        const year = date.getFullYear();
        if (year !== 2025) return;
        let inRange = false;
        switch (filters.financialYear) {
          case 'Oct 2025 - Dec 2025': inRange = month >= 9 && month <= 11; break;
          case 'Jul 2025 - Sep 2025': inRange = month >= 6 && month <= 8; break;
          case 'Apr 2025 - Jun 2025': inRange = month >= 3 && month <= 5; break;
          case 'Jan 2025 - Mar 2025': inRange = month >= 0 && month <= 2; break;
          default: inRange = true;
        }
        if (!inRange) return;
      }

      const sId = record.SupervisorID;
      if (!sId) return;

      if (!supervisorMap[sId]) {
        supervisorMap[sId] = {
          supervisorId: sId,
          supervisorName: record.SupervisorName,
          stores: new Set(),
          pendingApprovals: 0,
          allocatedPIDs: 0,
          auditCompletionList: []
        };
        supervisorAuditMap[sId] = new Set();
      }

      const sup = supervisorMap[sId];
      sup.stores.add(record.StoreName);
      sup.pendingApprovals += (record.PendingCount || 0);
      sup.auditCompletionList.push(record.CompletionPercent || 0);
      sup.allocatedPIDs += (record.AuditorAllottedPIDs || 0);

      supervisorAuditMap[sId].add(record.AUDIT_ID);


    });

    const processedSupervisors = Object.values(supervisorMap).map(sup => {
      let totalPIDs = 0;
      supervisorAuditMap[sup.supervisorId].forEach(auditId => {
        totalPIDs += (auditTotalPIDsMap[auditId] || 0);
      });

      const avgCompletion = sup.auditCompletionList.length > 0
        ? sup.auditCompletionList.reduce((a, b) => a + b, 0) / sup.auditCompletionList.length
        : 0;

      return {
        supervisorId: sup.supervisorId,
        supervisorName: sup.supervisorName,
        storesManaged: sup.stores.size,
        totalAudits: supervisorAuditMap[sup.supervisorId].size,
        auditCompletion: parseFloat(avgCompletion.toFixed(1)),
        pendingApprovals: sup.pendingApprovals,
        totalPIDs: totalPIDs,
        unallocatedPIDs: Math.max(0, totalPIDs - sup.allocatedPIDs)
      };
    });

    // Sort by Config
    const sortedSupervisors = [...processedSupervisors];
    if (sortConfig.key) {
      sortedSupervisors.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    // Calculate aggregations
    const metrics = sortedSupervisors.reduce((acc, curr) => ({
      totalSupervisors: acc.totalSupervisors + 1,
      totalStores: acc.totalStores + curr.storesManaged,
      totalPending: acc.totalPending + curr.pendingApprovals,
      totalUnallocated: acc.totalUnallocated + curr.unallocatedPIDs,
      sumCompletion: acc.sumCompletion + curr.auditCompletion
    }), { totalSupervisors: 0, totalStores: 0, totalPending: 0, totalUnallocated: 0, sumCompletion: 0 });

    const avgGlobalCompletion = metrics.totalSupervisors > 0 ? (metrics.sumCompletion / metrics.totalSupervisors).toFixed(1) : 0;



    return {
      supervisorData: sortedSupervisors,

      overallMetrics: {
        ...metrics,
        avgCompletion: avgGlobalCompletion
      }
    };
  }, [filters, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const showSupervisorDetails = (supervisor) => {
    setSelectedSupervisor(supervisor);
  };

  return (
    <Container fluid className="supervisor-approvals-tab py-4">
      {/* Filter Status Alert */}
      {hasActiveFilters && (
        <Alert variant="info" className="mb-3">
          <i className="fas fa-filter me-2"></i>
          <strong>Active Filters:</strong>
          {filters.state && <Badge bg="primary" className="ms-2">State: {filters.state}</Badge>}
          {filters.store && <Badge bg="primary" className="ms-2">Store: {filters.store}</Badge>}
          {filters.auditJobType && <Badge bg="primary" className="ms-2">Job Type: {filters.auditJobType}</Badge>}
          {filters.auditProcessType && <Badge bg="primary" className="ms-2">Process: {filters.auditProcessType}</Badge>}
          {filters.auditStatus && <Badge bg="primary" className="ms-2">Status: {filters.auditStatus}</Badge>}
        </Alert>
      )}

      {/* Overview KPIs */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <KPICard
            title="Total Stores Managed"
            value={overallMetrics.totalStores}
            icon="fas fa-store"
            color="primary"
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="Avg Completion"
            value={`${overallMetrics.avgCompletion}%`}
            icon="fas fa-chart-pie"
            color="success"
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="Pending Approvals"
            value={overallMetrics.totalPending}
            icon="fas fa-clock"
            color="warning"
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="Unallocated PIDs"
            value={overallMetrics.totalUnallocated}
            icon="fas fa-exclamation-circle"
            color="danger"
          />
        </Col>
      </Row>

      {/* Supervisor List - Modern Table View */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3 d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0 fw-bold">
                  <i className="fas fa-users-cog me-2 text-primary"></i>
                  Supervisor Performance Summary
                </h5>
                <small className="text-muted">Overview of supervisor metrics and workloads</small>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
<<<<<<< Updated upstream
              <SupervisorTable data={displayedSupervisors} onRowClick={showSupervisorDetails} />
            </Card.Body>
            <Card.Footer className="bg-white text-center py-3 border-0">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowAllModal(true)}
                className="rounded-pill px-4 fw-bold"
              >
                View All Supervisors <i className="fas fa-external-link-alt ms-2"></i>
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Re-audit Waterfall Visualization */}
      <Row className="mb-4">
        <Col lg={12}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-water me-2 text-primary"></i>
                Re-audit Lifecycle
              </h5>
              <small className="text-muted">Deviation lifecycle from appearance to resolution</small>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reauditData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="stage" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#0d6efd">
                    {reauditData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
=======
              <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <SupervisorTable
                  data={supervisorData}
                  onRowClick={showSupervisorDetails}
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
              </div>
>>>>>>> Stashed changes
            </Card.Body>
          </Card>
        </Col>
      </Row>






      {/* Detail Modal */}
      <SupervisorDetailModal
        show={!!selectedSupervisor}
        onHide={() => setSelectedSupervisor(null)}
        supervisorId={selectedSupervisor?.supervisorId}
        allData={rawAuditData}
      />
    </Container>
  );
};

export default SupervisorApprovals;
