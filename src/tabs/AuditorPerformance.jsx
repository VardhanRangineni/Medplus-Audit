import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Table, ProgressBar, Badge, Alert, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import KPICard from '../components/KPICard';
import AuditorDetailModal from '../components/AuditorDetailModal';
import auditData from '../data/audit_dataset.json';
import './AuditorPerformance.css';

const AuditorPerformance = ({ filters = {} }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <i className="fas fa-sort text-muted ms-1 small"></i>;
    return sortConfig.direction === 'ascending'
      ? <i className="fas fa-sort-up text-primary ms-1 small"></i>
      : <i className="fas fa-sort-down text-primary ms-1 small"></i>;
  };

  const formatIndianCurrency = (value) => {
    if (value === undefined || value === null) return '0';
    const val = Number(value);
    if (val >= 10000000) return (val / 10000000).toFixed(2) + ' Cr';
    if (val >= 100000) return (val / 100000).toFixed(2) + ' L';
    return val.toLocaleString('en-IN');
  };

  // Check if any filters are active
  const hasActiveFilters = filters.state || filters.store || filters.auditJobType || filters.auditProcessType || filters.auditStatus;

  // Process data to get auditor metrics
  const auditorData = useMemo(() => {
    // 1. Group by Auditor
    const auditorMap = {};



    auditData.forEach(record => {
      const id = record.AuditorID;
      if (!id) return;

      // Filter by Time Period (financialYear prop)
      if (filters.financialYear && filters.financialYear !== 'All-time') {
        const recordDate = new Date(record.AuditStartDate);
        // Format: "2024-25" -> startYear=2024, endYear=2025
        const [startYearStr, endYearShort] = filters.financialYear.split('-');
        const startYear = parseInt(startYearStr, 10);
        const endYear = startYear + 1; // 2024 -> 2025

        // Financial Year: April 1st of StartYear to March 31st of EndYear
        const fyStart = new Date(`${startYear}-04-01`);
        const fyEnd = new Date(`${endYear}-03-31`);
        // Adjust end date to include the full day
        fyEnd.setHours(23, 59, 59, 999);

        if (recordDate < fyStart || recordDate > fyEnd) {
          return;
        }
      }

      if (!auditorMap[id]) {
        auditorMap[id] = {
          auditorId: id,
          auditorName: record.AuditorName,
          allottedSKUs: 0,
          allottedPIDs: 0,
          completedSKUs: 0,
          totalAvgTimePerSKU: 0,
          totalAvgTimePerPID: 0,
          totalAppearedQty: 0,
          totalMatchedQty: 0,
          totalRevisedQty: 0,
          totalValue: 0,
          count: 0
        };
      }

      const auditor = auditorMap[id];
      // Use "AuditorAllottedSKUs" and "CompletedSKUs" from JSON
      auditor.allottedSKUs += (record.AuditorAllottedSKUs || 0);
      auditor.allottedPIDs += (record.AuditorAllottedPIDs || 0);
      auditor.completedSKUs += (record.CompletedSKUs || 0);

      // Use direct values from JSON
      auditor.totalAvgTimePerSKU += (record.AvgTimePerSKU || 0);
      auditor.totalAvgTimePerPID += (record.AvgTimePerPID || 0);

      auditor.totalAppearedQty += (record.AppearedQty || 0);
      auditor.totalMatchedQty += (record.MatchedQty || 0);
      auditor.totalRevisedQty += (record.RevisedQty || 0);
      auditor.totalValue += (record.AppearedValue || 0);
      auditor.count += 1;
    });

    // 2. Calculate Averages and Rates
    const processedList = Object.values(auditorMap).map(auditor => {
      // Avoid division by zero
      const completionRate = auditor.allottedSKUs > 0
        ? (auditor.completedSKUs / auditor.allottedSKUs) * 100
        : 0;

      // Calculate Match Rate and Edit Rate from qty totals
      const matchRate = auditor.totalAppearedQty > 0
        ? (auditor.totalMatchedQty / auditor.totalAppearedQty) * 100
        : 0;
      const editRate = auditor.totalAppearedQty > 0
        ? (auditor.totalRevisedQty / auditor.totalAppearedQty) * 100
        : 0;

      // Use average of records directly from data
      const avgTime = auditor.count > 0
        ? parseFloat((auditor.totalAvgTimePerSKU / auditor.count).toFixed(2))
        : 0;

      const avgTimePID = auditor.count > 0
        ? parseFloat((auditor.totalAvgTimePerPID / auditor.count).toFixed(2))
        : 0;

      return {
        auditorId: auditor.auditorId,
        auditorName: auditor.auditorName,
        allottedSKUs: auditor.allottedSKUs,
        allottedPIDs: auditor.allottedPIDs,
        completedSKUs: auditor.completedSKUs,
        completionRate: completionRate,
        avgTime: avgTime,
        avgTimePID: avgTimePID,
        matchRate: parseFloat(matchRate.toFixed(1)),
        editRate: parseFloat(editRate.toFixed(1)),
        totalValue: auditor.totalValue,
        totalAppearedQty: auditor.totalAppearedQty,
        totalAudits: auditor.count
      };
    });

    // 3. Sort
    if (sortConfig.key) {
      processedList.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    } else {
      // Default Sort by Allotted SKUs Descending
      processedList.sort((a, b) => b.allottedSKUs - a.allottedSKUs);
    }

    // 4. Return Full List
    return processedList;
  }, [sortConfig, filters.financialYear]); // Re-sort when config changes

  // Calculate overall performance metrics for cards
  const performanceMetrics = useMemo(() => {
    if (auditorData.length === 0) return { avgTimePerSKU: '0 min', matchRate: 0, editRate: 0 };

    const totalAvgTime = auditorData.reduce((sum, a) => sum + a.avgTime, 0);
    const totalMatchRate = auditorData.reduce((sum, a) => sum + a.matchRate, 0);
    const totalEditRate = auditorData.reduce((sum, a) => sum + a.editRate, 0);
    const count = auditorData.length;

    return {
      avgTimePerSKU: `${(totalAvgTime / count).toFixed(1)} min`,
      avgTimePerPID: `${(auditorData.reduce((sum, a) => sum + a.avgTimePID, 0) / count).toFixed(1)} min`,
      matchRate: (totalMatchRate / count).toFixed(1),
      editRate: (totalEditRate / count).toFixed(1)
    };
  }, [auditorData]);

  const [showAuditorDetail, setShowAuditorDetail] = useState(false);
  const [selectedAuditorId, setSelectedAuditorId] = useState(null);

  const handleAuditorClick = (auditor) => {
    setSelectedAuditorId(auditor.auditorId);
    setShowAuditorDetail(true);
  };

  const getCompletionColor = (rate) => {
    if (rate >= 90) return 'success';
    if (rate >= 80) return 'warning';
    return 'danger';
  };

  const getPerformanceBadge = (value, threshold, isReverse = false) => {
    const isGood = isReverse ? value < threshold : value > threshold;
    return isGood ? 'success' : 'danger';
  };

  // Download Handlers
  const handleDownloadExcel = () => {
    const wb = utils.book_new();

    // Detailed Data Sheet
    const detailedData = auditorData.map(a => ({
      "Auditor ID": a.auditorId,
      "Auditor Name": a.auditorName,
      "Total Audits": a.totalAudits,
      "Allotted PIDs": a.allottedPIDs.toLocaleString('en-IN'),
      "Allotted SKUs": a.allottedSKUs.toLocaleString('en-IN'),
      "Allotted Qty": a.totalAppearedQty.toLocaleString('en-IN'),
      "Avg Time/PID (min)": a.avgTimePID,
      "Avg Time/SKU (min)": a.avgTime,
      "Match Rate %": a.matchRate,
      "Edit Rate %": a.editRate,
      "Total Value (Rs.)": a.totalValue,
    }));
    const wsDetails = utils.json_to_sheet(detailedData);
    wsDetails['!cols'] = [
      { wch: 15 }, { wch: 25 }, { wch: 15 },
      { wch: 18 }, { wch: 18 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 12 }, { wch: 15 }, { wch: 18 }
    ];
    utils.book_append_sheet(wb, wsDetails, "Auditor Details");

    writeFile(wb, `Auditor_Productivity_Summary_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Auditor Productivity Summary", 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
    doc.text(`Financial Year: ${filters.financialYear || 'All-time'}`, 14, 34);

    // Metrics Summary Table
    autoTable(doc, {
      startY: 42,
      head: [['Metric', 'Value']],
      body: [
        ['Avg Time per PID', performanceMetrics.avgTimePerPID],
        ['Avg Time per SKU', performanceMetrics.avgTimePerSKU],
        ['Match Rate', `${performanceMetrics.matchRate}%`],
        ['Edit Rate', `${performanceMetrics.editRate}%`],
        ['Total Auditors', auditorData.length],
      ],
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] }
    });

    // Auditor Details Table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['ID', 'Name', 'Audits', 'Allotted PIDs', 'Allotted SKUs', 'Allotted Qty', 'Avg Time/PID', 'Avg Time/SKU', 'Match %', 'Edit %', 'Value (Rs.)']],
      body: (searchQuery
        ? auditorData.filter(a => a.auditorName.toLowerCase().includes(searchQuery.toLowerCase()))
        : auditorData).map(a => [
          a.auditorId,
          a.auditorName,
          a.totalAudits,
          a.allottedPIDs.toLocaleString('en-IN'),
          a.allottedSKUs.toLocaleString('en-IN'),
          a.totalAppearedQty.toLocaleString('en-IN'),
          `${a.avgTimePID} min`,
          `${a.avgTime} min`,
          `${a.matchRate}%`,
          `${a.editRate}%`,
          (a.totalValue || 0).toLocaleString('en-IN')
        ]),
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [52, 73, 94], textColor: 255 }
    });

    doc.save(`Auditor_Productivity_Summary_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const renderTableRows = (data) => (
    <Table hover className="mb-0 auditor-table align-middle">
      <thead className="bg-light sticky-top" style={{ top: 0, zIndex: 20, position: 'sticky' }}>
        <tr className="align-middle">
          <th onClick={() => requestSort('auditorId')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Auditor ID {getSortIcon('auditorId')}
            </div>
          </th>
          <th onClick={() => requestSort('auditorName')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Auditor Name {getSortIcon('auditorName')}
            </div>
          </th>
          <th onClick={() => requestSort('totalAudits')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Total Audits {getSortIcon('totalAudits')}
            </div>
          </th>
          <th onClick={() => requestSort('allottedPIDs')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Allotted PIDs {getSortIcon('allottedPIDs')}
            </div>
          </th>
          <th onClick={() => requestSort('allottedSKUs')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Allotted SKUs {getSortIcon('allottedSKUs')}
            </div>
          </th>
          <th onClick={() => requestSort('totalAppearedQty')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Allotted Qty {getSortIcon('totalAppearedQty')}
            </div>
          </th>
          <th onClick={() => requestSort('avgTimePID')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Avg Time/PID {getSortIcon('avgTimePID')}
            </div>
          </th>
          <th onClick={() => requestSort('avgTime')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Avg Time/SKU {getSortIcon('avgTime')}
            </div>
          </th>
          <th onClick={() => requestSort('matchRate')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Match Rate % {getSortIcon('matchRate')}
            </div>
          </th>
          <th onClick={() => requestSort('editRate')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Edit Rate % {getSortIcon('editRate')}
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
        {data.map((auditor, idx) => (
          <tr
            key={idx}
            className="auditor-row"
            onClick={() => handleAuditorClick(auditor)}
            style={{ cursor: 'pointer' }}
          >
            <td>
              <Badge bg="light" text="dark" className="font-monospace">
                {auditor.auditorId}
              </Badge>
            </td>
            <td className="fw-semibold">
              {auditor.auditorName}
            </td>
            <td className="text-center">{auditor.totalAudits}</td>
            <td>{auditor.allottedPIDs.toLocaleString('en-IN')}</td>
            <td>{auditor.allottedSKUs.toLocaleString('en-IN')}</td>
            <td>{auditor.totalAppearedQty.toLocaleString('en-IN')}</td>
            <td>
              {auditor.avgTimePID} min
            </td>
            <td>
              {auditor.avgTime} min
            </td>
            <td>
              {auditor.matchRate.toFixed(1)}%
            </td>
            <td>
              {auditor.editRate.toFixed(1)}%
            </td>

            <td className="fw-semibold">₹{formatIndianCurrency(auditor.totalValue)}</td>
            <td>
              <i className="fas fa-chevron-right text-primary"></i>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <Container fluid className="auditor-performance-tab py-4">
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

      {/* Export Button */}
      <div className="d-flex justify-content-end mb-3">
        <Dropdown>
          <Dropdown.Toggle
            size="sm"
            className="d-flex align-items-center gap-2 fw-bold shadow-sm"
            style={{ backgroundColor: '#0d6efd', color: 'white', border: 'none' }}
            id="auditor-export-dropdown"
          >
            <i className="fas fa-download"></i> Export Report
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleDownloadExcel}>
              <i className="fas fa-file-excel text-success me-2"></i> Export as Excel
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDownloadPDF}>
              <i className="fas fa-file-pdf text-danger me-2"></i> Export as PDF
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Performance Summary Cards */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <KPICard
            title="Total Auditors"
            value={auditorData.length}
            subtitle="Active auditors"
            icon="fas fa-users"
            color="info"
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="Avg Time / PID"
            value={performanceMetrics.avgTimePerPID}
            subtitle="Productivity efficiency"
            icon="fas fa-hourglass-half"
            color="info"
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="Avg Time / SKU"
            value={performanceMetrics.avgTimePerSKU}
            subtitle="Productivity efficiency"
            icon="fas fa-clock"
            color="primary"
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="Match Rate"
            value={`${performanceMetrics.matchRate}%`}
            subtitle="Accuracy vs re-audit"
            icon="fas fa-bullseye"
            color="success"
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="Edit Rate"
            value={`${performanceMetrics.editRate}%`}
            subtitle="Quality indicator"
            icon="fas fa-edit"
            color="warning"
          />
        </Col>
      </Row>

      {/* Performance Insights */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h6 className="mb-0 fw-bold text-success">
                <i className="fas fa-trophy me-2"></i>
                Top Performers
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="performance-list">
                {[...auditorData]
                  .sort((a, b) => b.matchRate - a.matchRate)
                  .slice(0, 3)
                  .map((auditor, idx) => (
                    <div key={idx} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                      <div>
                        <Badge bg="success" className="me-2">{idx + 1}</Badge>
                        <strong>{auditor.auditorName}</strong>
                      </div>
                      <Badge bg="success" pill>{auditor.matchRate.toFixed(1)}%</Badge>
                    </div>
                  ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h6 className="mb-0 fw-bold text-warning">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Needs Attention
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="performance-list">
                {[...auditorData]
                  .sort((a, b) => a.matchRate - b.matchRate)
                  .slice(0, 3)
                  .map((auditor, idx) => (
                    <div key={idx} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                      <div>
                        <Badge bg="warning" className="me-2">{idx + 1}</Badge>
                        <strong>{auditor.auditorName}</strong>
                      </div>
                      <Badge bg="warning" pill>{auditor.matchRate.toFixed(1)}%</Badge>
                    </div>
                  ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Productivity Summary Table */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-users me-2 text-primary"></i>
                    Auditor Productivity Summary
                  </h5>
                  <small className="text-muted">Click on any auditor to view detailed performance metrics</small>
                </div>
                <InputGroup style={{ maxWidth: '300px' }}>
                  <InputGroup.Text className="bg-white border-end-0">
                    <i className="fas fa-search text-muted"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by auditor name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-start-0"
                    style={{ boxShadow: 'none' }}
                  />
                  {searchQuery && (
                    <InputGroup.Text
                      className="bg-white cursor-pointer"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSearchQuery('')}
                    >
                      <i className="fas fa-times text-muted"></i>
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {renderTableRows(auditorData.filter(a =>
                  a.auditorName.toLowerCase().includes(searchQuery.toLowerCase())
                ))}
              </div>
            </Card.Body>
            {/* View More Removed - Showing All Records */}
          </Card>

        </Col>
      </Row>



      {/* Detailed Auditor Modal */}
      <AuditorDetailModal
        show={showAuditorDetail}
        onHide={() => setShowAuditorDetail(false)}
        auditorId={selectedAuditorId}
        allData={auditData}
      />
    </Container >
  );
};

export default AuditorPerformance;
