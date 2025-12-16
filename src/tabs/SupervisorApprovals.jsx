import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar, Alert, Dropdown } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
          <th onClick={() => requestSort('totalPIDs')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Total SKUs {getSortIcon('totalPIDs')}
            </div>
          </th>
          <th onClick={() => requestSort('totalValue')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Total Value {getSortIcon('totalValue')}
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
            <td className="fw-semibold">{sup.daysSupervised}</td>
            <td className="fw-semibold">{sup.auditorsSupervised}</td>
            <td className="fw-semibold">{sup.totalPIDs?.toLocaleString()}</td>
            <td className="fw-semibold">₹{sup.totalValue?.toLocaleString('en-IN')}</td>
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
    const auditMetaMap = {};

    auditData.forEach(record => {
      if (!auditTotalPIDsMap[record.AUDIT_ID]) {
        auditTotalPIDsMap[record.AUDIT_ID] = record.TotalPIDs || 0;
      }
      if (!auditMetaMap[record.AUDIT_ID]) {
        auditMetaMap[record.AUDIT_ID] = { start: record.AuditStartDate, end: record.AuditEndDate };
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
          totalValue: 0
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
      supervisorAuditMap[sId].add(record.AUDIT_ID);
    });

    const supervisors = Object.values(supervisorMap).map(sup => {
      let totalPIDs = 0;
      let totalDays = 0;
      supervisorAuditMap[sup.supervisorId].forEach(aid => {
        totalPIDs += auditTotalPIDsMap[aid] || 0;
        const meta = auditMetaMap[aid];
        if (meta && meta.start && meta.end) {
          const diff = meta.end - meta.start;
          // Count at least 1 day if start == end
          totalDays += Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
        }
      });

      const avgCompletion =
        sup.completion.reduce((a, b) => a + b, 0) / sup.completion.length || 0;

      return {
        supervisorId: sup.supervisorId,
        supervisorName: sup.supervisorName,
        storesManaged: sup.stores.size,
        totalAudits: supervisorAuditMap[sup.supervisorId].size,
        daysSupervised: totalDays,
        auditorsSupervised: sup.auditors.size,
        auditCompletion: +avgCompletion.toFixed(1),
        pendingApprovals: sup.pendingApprovals,
        totalPIDs,
        totalValue: sup.totalValue,
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

  return (
    <Container fluid className="supervisor-approvals-tab py-4">
      {hasActiveFilters && (
        <Alert variant="info">
          <i className="fas fa-filter me-2"></i>
          <strong>Active Filters</strong>
        </Alert>
      )}

      {/* Export Button */}
      <div className="d-flex justify-content-end mb-3">
        <Dropdown>
          <Dropdown.Toggle
            size="sm"
            className="d-flex align-items-center gap-2 fw-bold shadow-sm"
            style={{ backgroundColor: '#0d6efd', color: 'white', border: 'none' }}
            id="supervisor-export-dropdown"
          >
            <i className="fas fa-download"></i> Export Report
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {
              const wb = utils.book_new();
              const detailedData = supervisorData.map(s => ({
                "Supervisor ID": s.supervisorId,
                "Supervisor Name": s.supervisorName,
                "Stores Managed": s.storesManaged,
                "Total Audits": s.totalAudits,
                "Days Supervised": s.daysSupervised,
                "Auditors Supervised": s.auditorsSupervised,
                "Total SKUs": s.totalPIDs,
                "Total Value (₹)": s.totalValue,
                "Unallocated PIDs": s.unallocatedPIDs,
              }));
              const wsDetails = utils.json_to_sheet(detailedData);
              wsDetails['!cols'] = [
                { wch: 15 }, { wch: 25 }, { wch: 18 }, { wch: 15 },
                { wch: 18 }, { wch: 20 }, { wch: 15 }, { wch: 18 },
                { wch: 18 }
              ];
              utils.book_append_sheet(wb, wsDetails, "Supervisor Details");
              writeFile(wb, `Supervisor_Performance_Summary_${new Date().toISOString().split('T')[0]}.xlsx`);
            }}>
              <i className="fas fa-file-excel text-success me-2"></i> Export as Excel
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {
              const doc = new jsPDF();
              doc.setFontSize(16);
              doc.text("Supervisor Performance Summary", 14, 20);
              doc.setFontSize(10);
              doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
              autoTable(doc, {
                startY: 36,
                head: [['Metric', 'Value']],
                body: [
                  ['Total Stores Managed', overallMetrics.totalStores],
                ],
                theme: 'striped',
                headStyles: { fillColor: [41, 128, 185] }
              });
              autoTable(doc, {
                startY: doc.lastAutoTable.finalY + 10,
                head: [['ID', 'Name', 'Stores', 'Audits', 'Days', 'Auditors', 'SKUs', 'Value']],
                body: supervisorData.map(s => [
                  s.supervisorId,
                  s.supervisorName,
                  s.storesManaged,
                  s.totalAudits,
                  s.daysSupervised,
                  s.auditorsSupervised,
                  s.totalPIDs?.toLocaleString(),
                  `₹${s.totalValue?.toLocaleString('en-IN')}`
                ]),
                theme: 'grid',
                styles: { fontSize: 8 },
                headStyles: { fillColor: [52, 73, 94], textColor: 255 }
              });
              doc.save(`Supervisor_Performance_Summary_${new Date().toISOString().split('T')[0]}.pdf`);
            }}>
              <i className="fas fa-file-pdf text-danger me-2"></i> Export as PDF
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row className="g-3 mb-4">
        <Col md={3}><KPICard title="Total Supervisors" value={supervisorData.length} /></Col>
        <Col md={3}><KPICard title="Total Stores Managed" value={overallMetrics.totalStores} /></Col>
        <Col md={3}><KPICard title="Total Audits" value={overallMetrics.totalAudits?.toLocaleString()} /></Col>
        <Col md={3}><KPICard title="Total Value" value={`₹${overallMetrics.totalValue?.toLocaleString('en-IN')}`} /></Col>
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
        allData={auditData}
      />
    </Container>
  );
};

export default SupervisorApprovals;
