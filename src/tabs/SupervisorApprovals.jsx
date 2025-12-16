import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar, Alert, Button } from 'react-bootstrap';

import KPICard from '../components/KPICard';
import SupervisorDetailModal from '../components/SupervisorDetailModal';
import rawAuditData from '../data/audit_dataset_records.json';
import './SupervisorApprovals.css';

/* ================================
   Reusable Supervisor Table
================================ */
const SupervisorTable = ({ data, onRowClick, sortConfig, requestSort }) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <i className="fas fa-sort text-muted ms-1 small"></i>;
    return sortConfig.direction === 'ascending'
      ? <i className="fas fa-sort-up text-primary ms-1 small"></i>
      : <i className="fas fa-sort-down text-primary ms-1 small"></i>;
  };

  const getCompletionColor = (rate) => {
    if (rate >= 90) return 'success';
    if (rate >= 80) return 'warning';
    return 'danger';
  };

  return (
    <Table hover className="mb-0 supervisor-table align-middle">
      <thead className="bg-light sticky-top" style={{ top: 0, zIndex: 20 }}>
        <tr>
          <th onClick={() => requestSort('supervisorId')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              ID {getSortIcon('supervisorId')}
            </div>
          </th>
          <th onClick={() => requestSort('supervisorName')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Name {getSortIcon('supervisorName')}
            </div>
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
          <th onClick={() => requestSort('pendingApprovals')} className="text-center" style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1 justify-content-center">
              Pending Approvals {getSortIcon('pendingApprovals')}
            </div>
          </th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((sup, idx) => (
          <tr key={idx} onClick={() => onRowClick(sup)} className="supervisor-row" style={{ cursor: 'pointer' }}>
            <td>
              <Badge bg="light" text="dark" className="font-monospace">
                {sup.supervisorId}
              </Badge>
            </td>
            <td className="fw-semibold">
              {sup.supervisorName}
            </td>
            <td className="fw-semibold">{sup.storesManaged}</td>
            <td className="fw-semibold">{sup.totalAudits}</td>
            <td className="fw-semibold">{sup.totalPIDs?.toLocaleString()}</td>
            <td>
              <div className="d-flex align-items-center gap-2">
                <ProgressBar
                  now={sup.auditCompletion}
                  variant={getCompletionColor(sup.auditCompletion)}
                  style={{ height: '20px', flex: 1 }}
                />
                <Badge bg={getCompletionColor(sup.auditCompletion)}>
                  {sup.auditCompletion}%
                </Badge>
              </div>
            </td>
            <td className="text-center">
              {sup.pendingApprovals > 0 ? (
                <Badge bg="warning" text="dark" pill className="px-3 py-2">
                  {sup.pendingApprovals}
                </Badge>
              ) : (
                <span className="text-muted">-</span>
              )}
            </td>
            <td>
              <i className="fas fa-chevron-right text-primary"></i>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

/* ================================
   Supervisor Approvals Page
================================ */
const SupervisorApprovals = ({ filters = {} }) => {
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'supervisorId', direction: 'ascending' });

  const hasActiveFilters =
    filters.state || filters.store || filters.auditJobType || filters.auditProcessType || filters.auditStatus;

  const { supervisorData, overallMetrics } = useMemo(() => {
    const supervisorMap = {};
    const supervisorAuditMap = {};
    const auditTotalPIDsMap = {};

    rawAuditData.forEach(record => {
      if (!auditTotalPIDsMap[record.AUDIT_ID]) {
        auditTotalPIDsMap[record.AUDIT_ID] = record.TotalPIDs || 0;
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
          completion: []
        };
        supervisorAuditMap[sId] = new Set();
      }

      const sup = supervisorMap[sId];
      sup.stores.add(record.StoreName);
      sup.pendingApprovals += record.PendingCount || 0;
      sup.allocatedPIDs += record.AuditorAllottedPIDs || 0;
      sup.completion.push(record.CompletionPercent || 0);
      supervisorAuditMap[sId].add(record.AUDIT_ID);
    });

    const supervisors = Object.values(supervisorMap).map(sup => {
      let totalPIDs = 0;
      supervisorAuditMap[sup.supervisorId].forEach(aid => {
        totalPIDs += auditTotalPIDsMap[aid] || 0;
      });

      const avgCompletion =
        sup.completion.reduce((a, b) => a + b, 0) / sup.completion.length || 0;

      return {
        supervisorId: sup.supervisorId,
        supervisorName: sup.supervisorName,
        storesManaged: sup.stores.size,
        totalAudits: supervisorAuditMap[sup.supervisorId].size,
        auditCompletion: +avgCompletion.toFixed(1),
        pendingApprovals: sup.pendingApprovals,
        totalPIDs,
        unallocatedPIDs: Math.max(0, totalPIDs - sup.allocatedPIDs)
      };
    });

    supervisors.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

    const metrics = supervisors.reduce(
      (acc, cur) => ({
        totalStores: acc.totalStores + cur.storesManaged,
        totalPending: acc.totalPending + cur.pendingApprovals,
        totalUnallocated: acc.totalUnallocated + cur.unallocatedPIDs,
        sumCompletion: acc.sumCompletion + cur.auditCompletion,
        count: acc.count + 1
      }),
      { totalStores: 0, totalPending: 0, totalUnallocated: 0, sumCompletion: 0, count: 0 }
    );

    return {
      supervisorData: supervisors,
      overallMetrics: {
        ...metrics,
        avgCompletion: metrics.count ? (metrics.sumCompletion / metrics.count).toFixed(1) : 0
      }
    };
  }, [sortConfig]);

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  };

  return (
    <Container fluid className="supervisor-approvals-tab py-4">
      {hasActiveFilters && (
        <Alert variant="info">
          <i className="fas fa-filter me-2"></i>
          <strong>Active Filters</strong>
        </Alert>
      )}

      <Row className="g-3 mb-4">
        <Col md={3}><KPICard title="Total Stores Managed" value={overallMetrics.totalStores} /></Col>
        <Col md={3}><KPICard title="Avg Completion" value={`${overallMetrics.avgCompletion}%`} /></Col>
        <Col md={3}><KPICard title="Pending Approvals" value={overallMetrics.totalPending} /></Col>
        <Col md={3}><KPICard title="Unallocated PIDs" value={overallMetrics.totalUnallocated} /></Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 py-3">
          <h5 className="mb-0 fw-bold">
            <i className="fas fa-user-tie me-2 text-primary"></i>
            Supervisor Performance Summary
          </h5>
          <small className="text-muted">Click on any supervisor to view detailed performance metrics</small>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <SupervisorTable
              data={supervisorData}
              onRowClick={setSelectedSupervisor}
              sortConfig={sortConfig}
              requestSort={requestSort}
            />
          </div>
        </Card.Body>
      </Card>

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
