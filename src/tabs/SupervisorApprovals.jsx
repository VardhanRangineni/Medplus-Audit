import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar, Alert, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatIndianCurrency, formatIndianNumber } from '../utils/formatters';

import KPICard from '../components/KPICard';
import SupervisorDetailModal from '../components/SupervisorDetailModal';
import auditData from '../data/audit_dataset.json';
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
              EMP ID {getSortIcon('supervisorId')}
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
          <th onClick={() => requestSort('daysSupervised')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Days Supervised {getSortIcon('daysSupervised')}
            </div>
          </th>
          <th onClick={() => requestSort('auditorsSupervised')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Auditors Supervised {getSortIcon('auditorsSupervised')}
            </div>
          </th>
          <th onClick={() => requestSort('totalSKUs')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Total SKUs {getSortIcon('totalSKUs')}
            </div>
          </th>
          <th onClick={() => requestSort('totalValue')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Audited Value (MRP) {getSortIcon('totalValue')}
            </div>
          </th>
          <th onClick={() => requestSort('mismatchValue')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Mismatch Value (MRP) {getSortIcon('mismatchValue')}
            </div>
          </th>
          <th onClick={() => requestSort('deviationValue')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Deviation Value (MRP) {getSortIcon('deviationValue')}
            </div>
          </th>
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
            <td className="fw-semibold">{sup.daysSupervised}</td>
            <td className="fw-semibold">{sup.auditorsSupervised}</td>
            <td className="fw-semibold">{formatIndianNumber(sup.totalSKUs, true)}</td>
            <td className="fw-semibold">{formatIndianCurrency(sup.totalValue)}</td>
            <td className="fw-semibold text-warning">{formatIndianCurrency(sup.mismatchValue)}</td>
            <td className="fw-semibold text-danger">{formatIndianCurrency(sup.deviationValue)}</td>
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showTableFilters, setShowTableFilters] = useState(false);

  const hasActiveFilters =
    (filters.state && filters.state.length > 0) ||
    (filters.store && filters.store.length > 0) ||
    (filters.auditJobType && filters.auditJobType.length > 0) ||
    (filters.auditProcessType && filters.auditProcessType.length > 0) ||
    (filters.auditStatus && filters.auditStatus.length > 0);



  const { supervisorData, overallMetrics } = useMemo(() => {
    const supervisorMap = {};
    const supervisorAuditMap = {};
    const auditStoreTotalPIDsMap = {};
    const auditStoreTotalSKUsMap = {};

    auditData.forEach(record => {
      if (!auditStoreTotalPIDsMap[record.AUDIT_ID]) {
        auditStoreTotalPIDsMap[record.AUDIT_ID] = record.StoreTotalPIDs || 0;
      }
      if (!auditStoreTotalSKUsMap[record.AUDIT_ID]) {
        auditStoreTotalSKUsMap[record.AUDIT_ID] = record.StoreTotalSKUs || 0;
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
          completion: [],
          auditors: new Set(),
          totalValue: 0,
          mismatchValue: 0,
          deviationValue: 0,
          supervisedDates: new Set()
        };
        supervisorAuditMap[sId] = new Set();
      }

      const sup = supervisorMap[sId];
      sup.stores.add(record.StoreName);
      sup.pendingApprovals += record.PendingCount || 0;
      sup.allocatedPIDs += record.AuditorAllottedPIDs || 0;
      sup.completion.push(record.CompletionPercent || 0);
      if (record.AuditorID) sup.auditors.add(record.AuditorID);
      sup.totalValue += record.AppearedValue || 0;
      sup.mismatchValue += record.MatchedValue || 0;
      sup.deviationValue += record.RevisedValue || 0;
      supervisorAuditMap[sId].add(record.AUDIT_ID);

      if (record.DayWiseSummary) {
        Object.keys(record.DayWiseSummary).forEach(date => sup.supervisedDates.add(date));
      }
    });

    const supervisors = Object.values(supervisorMap).map(sup => {
      let totalPIDs = 0;
      let totalSKUs = 0;

      supervisorAuditMap[sup.supervisorId].forEach(aid => {
        totalPIDs += auditStoreTotalPIDsMap[aid] || 0;
        totalSKUs += auditStoreTotalSKUsMap[aid] || 0;
      });

      const avgCompletion =
        sup.completion.reduce((a, b) => a + b, 0) / sup.completion.length || 0;

      return {
        supervisorId: sup.supervisorId,
        supervisorName: sup.supervisorName,
        storesManaged: sup.stores.size,
        totalAudits: supervisorAuditMap[sup.supervisorId].size,
        daysSupervised: sup.supervisedDates.size,
        auditorsSupervised: sup.auditors.size,
        auditCompletion: +avgCompletion.toFixed(1),
        pendingApprovals: sup.pendingApprovals,
        totalPIDs,
        totalSKUs,
        totalValue: sup.totalValue,
        mismatchValue: sup.mismatchValue,
        deviationValue: sup.deviationValue,
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
        totalAudits: acc.totalAudits + cur.totalAudits,
        totalValue: acc.totalValue + (cur.totalValue || 0),
        totalPending: acc.totalPending + cur.pendingApprovals,
        totalUnallocated: acc.totalUnallocated + cur.unallocatedPIDs,
        sumCompletion: acc.sumCompletion + cur.auditCompletion,
        count: acc.count + 1
      }),
      { totalStores: 0, totalAudits: 0, totalValue: 0, totalPending: 0, totalUnallocated: 0, sumCompletion: 0, count: 0 }
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

  const handleDownloadExcel = () => {
    const wb = utils.book_new();
    const detailedData = supervisorData.map(s => ({
      "Supervisor ID": s.supervisorId,
      "Supervisor Name": s.supervisorName,
      "Stores Managed": s.storesManaged,
      "Total Audits": s.totalAudits,
      "Days Supervised": s.daysSupervised,
      "Auditors Supervised": s.auditorsSupervised,
      "Total SKUs": s.totalSKUs,
      "Total Value (₹)": s.totalValue,
      "Mismatch Value (₹)": s.mismatchValue,
      "Deviation Value (₹)": s.deviationValue,
      "Unallocated PIDs": s.unallocatedPIDs,
    }));
    const wsDetails = utils.json_to_sheet(detailedData);
    wsDetails['!cols'] = [
      { wch: 15 }, { wch: 25 }, { wch: 18 }, { wch: 15 },
      { wch: 18 }, { wch: 20 }, { wch: 15 }, { wch: 18 },
      { wch: 18 }, { wch: 18 }, { wch: 18 }
    ];
    utils.book_append_sheet(wb, wsDetails, "Supervisor Details");
    writeFile(wb, `Supervisor_Performance_Summary_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <Container fluid className="supervisor-approvals-tab py-4">
      <Row className="g-3 mb-4">
        <Col md={3}><KPICard title="Total Supervisors" value={supervisorData.length} /></Col>
        <Col md={3}><KPICard title="Total Audits Supervised" value={overallMetrics.totalAudits?.toLocaleString()} /></Col>
        <Col md={3}><KPICard title="Total Stores Supervised" value={overallMetrics.totalStores} /></Col>
        <Col md={3}><KPICard title="Audited Value (MRP)" value={formatIndianCurrency(overallMetrics.totalValue)} /></Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 py-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-user-tie me-2 text-primary"></i>
                Supervisor Performance Summary
              </h5>
              <small className="text-muted">Click on any supervisor to view detailed performance metrics</small>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={() => setShowTableFilters(!showTableFilters)}
              >
                <i className="fas fa-filter me-1"></i>
                Table Filters
                <i className={`fas fa-chevron-${showTableFilters ? 'up' : 'down'} ms-1`}></i>
              </button>
              <button
                className="btn btn-success btn-sm"
                onClick={handleDownloadExcel}
              >
                <i className="fas fa-file-excel me-1"></i>
                Export Excel
              </button>
            </div>
          </div>
          {showTableFilters && (
            <div className="mt-3">
              <InputGroup style={{ maxWidth: '300px' }}>
                <InputGroup.Text className="bg-white border-end-0">
                  <i className="fas fa-search text-muted"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by supervisor name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-start-0"
                  style={{ boxShadow: 'none' }}
                />
                {searchQuery && (
                  <InputGroup.Text
                    className="bg-white"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSearchQuery('')}
                  >
                    <i className="fas fa-times text-muted"></i>
                  </InputGroup.Text>
                )}
              </InputGroup>
            </div>
          )}
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <SupervisorTable
              data={supervisorData.filter(s =>
                (s.supervisorName || '').toLowerCase().includes(searchQuery.toLowerCase())
              )}
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
        allData={auditData}
      />
    </Container>
  );
};

export default SupervisorApprovals;
