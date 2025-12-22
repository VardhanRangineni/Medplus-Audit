import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Table, ProgressBar, Badge, Alert, Dropdown, Form, InputGroup, Button } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatIndianCurrency, formatIndianNumber } from '../utils/formatters';
import KPICard from '../components/KPICard';
import AuditorDetailModal from '../components/AuditorDetailModal';
import PerformersListModal from '../components/PerformersListModal';
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
          totalMatchedValue: 0,
          totalRevisedValue: 0,
          totalAppearedSKUs: 0,
          totalMatchedSKUs: 0,
          totalRevisedSKUs: 0,
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

      auditor.totalAppearedSKUs += (record.AppearedSKUs || 0);
      auditor.totalMatchedSKUs += (record.MatchedSKUs || 0);
      auditor.totalRevisedSKUs += (record.RevisedSKUs || 0);

      auditor.totalValue += (record.AppearedValue || 0);
      auditor.totalMatchedValue += (record.MatchedValue || 0);
      auditor.totalRevisedValue += (record.RevisedValue || 0);

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
        totalMatchedValue: auditor.totalMatchedValue,
        totalRevisedValue: auditor.totalRevisedValue,
        totalAppearedQty: auditor.totalAppearedQty,
        totalMatchedQty: auditor.totalMatchedQty,
        totalRevisedQty: auditor.totalRevisedQty,
        totalAppearedSKUs: auditor.totalAppearedSKUs,
        totalMatchedSKUs: auditor.totalMatchedSKUs,
        totalRevisedSKUs: auditor.totalRevisedSKUs,
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
    const defaultMetrics = {
      avgTimePerSKU: '0 min',
      avgTimePerPID: '0 min',
      matchRate: 0,
      editRate: 0,
      deviations: {
        appeared: { qty: 0, value: 0 },
        matched: { qty: 0, value: 0 },
        revised: { qty: 0, value: 0 }
      }
    };

    if (auditorData.length === 0) return defaultMetrics;

    const totalAvgTime = auditorData.reduce((sum, a) => sum + a.avgTime, 0);
    const count = auditorData.length;

    // Aggregating deviations
    const deviations = auditorData.reduce((acc, a) => {
      acc.appeared.qty += a.totalAppearedQty;
      acc.appeared.value += a.totalValue;
      acc.appeared.skus += (a.totalAppearedSKUs || 0);

      acc.matched.qty += a.totalMatchedQty;
      acc.matched.value += a.totalMatchedValue;
      acc.matched.skus += (a.totalMatchedSKUs || 0);

      acc.revised.qty += a.totalRevisedQty;
      acc.revised.value += a.totalRevisedValue;
      acc.revised.skus += (a.totalRevisedSKUs || 0);

      return acc;
    }, {
      appeared: { qty: 0, value: 0, skus: 0 },
      matched: { qty: 0, value: 0, skus: 0 },
      revised: { qty: 0, value: 0, skus: 0 }
    });

    return {
      avgTimePerSKU: `${(totalAvgTime / count).toFixed(1)} min`,
      avgTimePerPID: `${(auditorData.reduce((sum, a) => sum + a.avgTimePID, 0) / count).toFixed(1)} min`,
      deviations
    };
  }, [auditorData]);

  const [showAuditorDetail, setShowAuditorDetail] = useState(false);
  const [selectedAuditorId, setSelectedAuditorId] = useState(null);
  const [showPerformersModal, setShowPerformersModal] = useState(false);
  const [performersModalData, setPerformersModalData] = useState({ title: '', items: [], variant: '', metric: '' });

  const handleShowMorePerformers = (type) => {
    if (type === 'top') {
      const items = [...auditorData].sort((a, b) => b.matchRate - a.matchRate).map(a => ({ name: a.auditorName, value: a.matchRate }));
      setPerformersModalData({
        title: 'Top Performers (High Deviation Match Rate)',
        items: items,
        variant: 'success',
        metricLabel: 'Match Rate',
        metricKey: 'matchRate'
      });
    } else {
      const items = [...auditorData].sort((a, b) => a.matchRate - b.matchRate).map(a => ({ name: a.auditorName, value: a.matchRate }));
      setPerformersModalData({
        title: 'Needs Attention (Low Deviation Match Rate)',
        items: items,
        variant: 'warning',
        metricLabel: 'Match Rate',
        metricKey: 'matchRate'
      });
    }
    setShowPerformersModal(true);
  };

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

    // Summary Sheet
    const summaryData = [
      ["Productivity Summary"],
      ["Metric", "Value"],
      ["Total Auditors", auditorData.length],
      ["Avg Time/PID", performanceMetrics.avgTimePerPID],
      ["Avg Time/SKU", performanceMetrics.avgTimePerSKU],
      [],
      ["Deviation Summary", "Qty", "Value"],
      ["Appeared", performanceMetrics.deviations.appeared.qty, performanceMetrics.deviations.appeared.value],
      ["Matched", performanceMetrics.deviations.matched.qty, performanceMetrics.deviations.matched.value],
      ["Revised", performanceMetrics.deviations.revised.qty, performanceMetrics.deviations.revised.value]
    ];
    const wsSummary = utils.aoa_to_sheet(summaryData);
    wsSummary['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 20 }];
    utils.book_append_sheet(wb, wsSummary, "Summary");

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
        ['Total Auditors', auditorData.length],
        ['Avg Time per PID', performanceMetrics.avgTimePerPID],
        ['Avg Time per SKU', performanceMetrics.avgTimePerSKU],
      ],
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] }
    });

    // Deviation Summary Table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Deviation Category', 'Qty', 'Value (Rs.)']],
      body: [
        ['Appeared', performanceMetrics.deviations.appeared.qty.toLocaleString('en-IN'), formatIndianCurrency(performanceMetrics.deviations.appeared.value)],
        ['Matched', performanceMetrics.deviations.matched.qty.toLocaleString('en-IN'), formatIndianCurrency(performanceMetrics.deviations.matched.value)],
        ['Revised', performanceMetrics.deviations.revised.qty.toLocaleString('en-IN'), formatIndianCurrency(performanceMetrics.deviations.revised.value)],
      ],
      theme: 'striped',
      headStyles: { fillColor: [243, 156, 18] }
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
            <td>{formatIndianNumber(auditor.allottedPIDs, true)}</td>
            <td>{formatIndianNumber(auditor.allottedSKUs, true)}</td>
            <td>{formatIndianNumber(auditor.totalAppearedQty, true)}</td>
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

            <td className="fw-semibold">{formatIndianCurrency(auditor.totalValue)}</td>
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
        <Col md={3} className="d-flex justify-content-end align-items-start">
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
        </Col>
      </Row>

      {/* Deviation Summary */}
      <h6 className="text-muted text-uppercase mb-3 fw-bold" style={{ fontSize: '0.85rem' }}>DEVIATION SUMMARY</h6>
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm border-start border-4 border-primary">
            <Card.Body>
              <h6 className="text-primary fw-bold text-uppercase mb-3">APPEARED DEVIATIONS</h6>
              <div className="d-flex justify-content-between mb-1 text-muted small">
                <span>SKUs</span>
                <span className="fw-bold text-dark">{formatIndianNumber(performanceMetrics.deviations.appeared.skus, true)}</span>
              </div>
              <div className="d-flex justify-content-between mb-1 text-muted small">
                <span>Qty</span>
                <span className="fw-bold text-dark">{formatIndianNumber(performanceMetrics.deviations.appeared.qty, true)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>Value</span>
                <span className="fw-bold text-dark">{formatIndianCurrency(performanceMetrics.deviations.appeared.value)}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm border-start border-4 border-success">
            <Card.Body>
              <h6 className="text-success fw-bold text-uppercase mb-3">MATCHED DEVIATIONS</h6>
              <div className="d-flex justify-content-between mb-1 text-muted small">
                <span>SKUs</span>
                <span className="fw-bold text-dark">{formatIndianNumber(performanceMetrics.deviations.matched.skus, true)}</span>
              </div>
              <div className="d-flex justify-content-between mb-1 text-muted small">
                <span>Qty</span>
                <span className="fw-bold text-dark">{formatIndianNumber(performanceMetrics.deviations.matched.qty, true)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>Value</span>
                <span className="fw-bold text-dark">{formatIndianCurrency(performanceMetrics.deviations.matched.value)}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm border-start border-4 border-warning">
            <Card.Body>
              <h6 className="text-warning fw-bold text-uppercase mb-3">REVISED DEVIATIONS</h6>
              <div className="d-flex justify-content-between mb-1 text-muted small">
                <span>SKUs</span>
                <span className="fw-bold text-dark">{formatIndianNumber(performanceMetrics.deviations.revised.skus, true)}</span>
              </div>
              <div className="d-flex justify-content-between mb-1 text-muted small">
                <span>Qty</span>
                <span className="fw-bold text-dark">{formatIndianNumber(performanceMetrics.deviations.revised.qty, true)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>Value</span>
                <span className="fw-bold text-dark">{formatIndianCurrency(performanceMetrics.deviations.revised.value)}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Performance Insights */}
      <h6 className="text-muted text-uppercase mb-3 fw-bold" style={{ fontSize: '0.85rem' }}>DEVIATION MATCH RATE</h6>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3 d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-bold text-success">
                <i className="fas fa-trophy me-2"></i>
                Top Performers
              </h6>
              <Button variant="link" className="p-0 text-success small text-decoration-none fw-bold" onClick={() => handleShowMorePerformers('top')}>
                View More <i className="fas fa-arrow-right ms-1"></i>
              </Button>
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
            <Card.Header className="bg-white border-0 py-3 d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-bold text-warning">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Needs Attention
              </h6>
              <Button variant="link" className="p-0 text-warning small text-decoration-none fw-bold" onClick={() => handleShowMorePerformers('low')}>
                View More <i className="fas fa-arrow-right ms-1"></i>
              </Button>
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

      <PerformersListModal
        show={showPerformersModal}
        onHide={() => setShowPerformersModal(false)}
        title={performersModalData.title}
        items={performersModalData.items}
        variant={performersModalData.variant}
        metricLabel={performersModalData.metricLabel}
      />
    </Container >
  );
};

export default AuditorPerformance;
