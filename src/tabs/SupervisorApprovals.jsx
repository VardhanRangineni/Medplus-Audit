import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar, Alert, Button } from 'react-bootstrap';

import KPICard from '../components/KPICard';
import SupervisorDetailModal from '../components/SupervisorDetailModal';
import rawAuditData from '../data/audit_dataset_200_records.json';
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

  return (
    <Table hover className="mb-0 hover-scale-row align-middle">
      <thead className="bg-light sticky-top" style={{ top: 0, zIndex: 20 }}>
        <tr>
          <th onClick={() => requestSort('supervisorId')} style={{ cursor: 'pointer' }}>
            ID {getSortIcon('supervisorId')}
          </th>
          <th onClick={() => requestSort('supervisorName')} style={{ cursor: 'pointer' }}>
            Name {getSortIcon('supervisorName')}
          </th>
          <th onClick={() => requestSort('storesManaged')} style={{ cursor: 'pointer' }}>
            Stores Managed {getSortIcon('storesManaged')}
          </th>
          <th onClick={() => requestSort('totalAudits')} style={{ cursor: 'pointer' }}>
            Total Audits {getSortIcon('totalAudits')}
          </th>
          <th onClick={() => requestSort('totalPIDs')} style={{ cursor: 'pointer' }}>
            Total SKUs {getSortIcon('totalPIDs')}
          </th>
          <th onClick={() => requestSort('auditCompletion')} style={{ cursor: 'pointer', minWidth: '200px' }}>
            Audit Completion {getSortIcon('auditCompletion')}
          </th>
          <th onClick={() => requestSort('pendingApprovals')} className="text-center" style={{ cursor: 'pointer' }}>
            Pending Approvals {getSortIcon('pendingApprovals')}
          </th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((sup, idx) => (
          <tr key={idx} onClick={() => onRowClick(sup)} style={{ cursor: 'pointer' }}>
            <td>
              <Badge bg="light" text="dark" className="font-monospace">
                {sup.supervisorId}
              </Badge>
            </td>
            <td className="fw-bold">{sup.supervisorName}</td>
            <td className="fw-semibold">{sup.storesManaged}</td>
            <td className="fw-semibold">{sup.totalAudits}</td>
            <td className="fw-semibold">{sup.totalPIDs?.toLocaleString()}</td>
            <td>
              <div className="d-flex align-items-center gap-2">
                <ProgressBar
                  now={sup.auditCompletion}
                  variant={sup.auditCompletion >= 90 ? 'success' : 'primary'}
                  style={{ height: '8px', flex: 1 }}
                />
                <span className="small fw-bold">{sup.auditCompletion}%</span>
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
        <Card.Header className="bg-white fw-bold">Supervisor Performance Summary</Card.Header>
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
