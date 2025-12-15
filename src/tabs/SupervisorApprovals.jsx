import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar, Alert, Button, Modal } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import KPICard from '../components/KPICard';
import SupervisorDetailModal from '../components/SupervisorDetailModal';
import rawAuditData from '../data/audit_dataset_200_records.json';
import './SupervisorApprovals.css';

// Reusable Table Component for Supervisors
const SupervisorTable = ({ data, onRowClick }) => (
  <Table hover className="mb-0">
    <thead className="bg-light">
      <tr>
        <th>Supervisor</th>
        <th>Stores Managed</th>
        <th style={{ minWidth: '200px' }}>Audit Completion</th>
        <th className="text-center">Pending Approvals</th>
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
            </div>
          </td>
          <td>
            <div className="fs-5 fw-semibold">{supervisor.storesManaged}</div>
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

const SupervisorApprovals = ({ filters = {} }) => {
  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);

  // Check if any filters are active
  const hasActiveFilters = filters.state || filters.store || filters.auditJobType || filters.auditProcessType || filters.auditStatus;

  // Process data to get supervisor metrics and global aggregated stats
  const { supervisorData, reauditData, overallMetrics } = useMemo(() => {
    const supervisorMap = {};
    const reauditStats = {
      appeared: 0,
      matched: 0,
      revised: 0,
      pending: 0
    };

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

      // Re-audit waterfall
      reauditStats.appeared += (record.AppearedCount || 0);
      reauditStats.matched += (record.MatchedCount || 0);
      reauditStats.revised += (record.RevisedCount || 0);
      reauditStats.pending += (record.PendingCount || 0);
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
        auditCompletion: parseFloat(avgCompletion.toFixed(1)),
        pendingApprovals: sup.pendingApprovals,
        totalPIDs: totalPIDs,
        unallocatedPIDs: Math.max(0, totalPIDs - sup.allocatedPIDs)
      };
    });

    // Sort by Stores Managed Descending (Default)
    const sortedSupervisors = processedSupervisors.sort((a, b) => b.storesManaged - a.storesManaged);

    // Calculate aggregations
    const metrics = sortedSupervisors.reduce((acc, curr) => ({
      totalSupervisors: acc.totalSupervisors + 1,
      totalStores: acc.totalStores + curr.storesManaged,
      totalPending: acc.totalPending + curr.pendingApprovals,
      totalUnallocated: acc.totalUnallocated + curr.unallocatedPIDs,
      sumCompletion: acc.sumCompletion + curr.auditCompletion
    }), { totalSupervisors: 0, totalStores: 0, totalPending: 0, totalUnallocated: 0, sumCompletion: 0 });

    const avgGlobalCompletion = metrics.totalSupervisors > 0 ? (metrics.sumCompletion / metrics.totalSupervisors).toFixed(1) : 0;

    const processedReaudit = [
      { stage: 'Initially Appeared', count: reauditStats.appeared, color: '#dc3545' },
      { stage: 'Matched (Verified)', count: reauditStats.matched, color: '#198754' },
      { stage: 'Edited (Modified)', count: reauditStats.revised, color: '#ffc107' },
      { stage: 'Pending (Awaiting)', count: reauditStats.pending, color: '#0d6efd' }
    ];

    return {
      supervisorData: sortedSupervisors,
      reauditData: processedReaudit,
      overallMetrics: {
        ...metrics,
        avgCompletion: avgGlobalCompletion
      }
    };
  }, [filters]);

  const displayedSupervisors = supervisorData.slice(0, 5);

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
        <Col md={4}>
          <KPICard
            title="Total Stores Managed"
            value={overallMetrics.totalStores}
            icon="fas fa-store"
            color="primary"
          />
        </Col>
        <Col md={4}>
          <KPICard
            title="Avg Completion"
            value={`${overallMetrics.avgCompletion}%`}
            icon="fas fa-chart-pie"
            color="success"
          />
        </Col>
        <Col md={4}>
          <KPICard
            title="Pending Approvals"
            value={overallMetrics.totalPending}
            icon="fas fa-clock"
            color="warning"
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
              <div>
                <small className="text-muted me-2">
                  Showing {displayedSupervisors.length} of {supervisorData.length} Supervisors
                </small>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
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
                  <Bar dataKey="count" fill="#0d6efd">
                    {reauditData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>


      {/* All Supervisors Modal */}
      <Modal show={showAllModal} onHide={() => setShowAllModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-users me-2 text-primary"></i>
            All Supervisors
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <SupervisorTable data={supervisorData} onRowClick={showSupervisorDetails} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAllModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

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
