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

import auditorsJson from '../data/auditors.json';

const AuditorPerformance = ({ filters = {} }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showTableFilters, setShowTableFilters] = useState(false);

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
  const hasActiveFilters = (filters.state && filters.state.length > 0) ||
    (filters.store && filters.store.length > 0) ||
    (filters.auditJobType && filters.auditJobType.length > 0) ||
    (filters.auditProcessType && filters.auditProcessType.length > 0) ||
    (filters.auditStatus && filters.auditStatus.length > 0);

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
          totalDeviationValue: 0,
          totalMatchedValue: 0,
          totalRevisedValue: 0,
          totalAppearedSKUs: 0,
          totalMatchedSKUs: 0,
          totalRevisedSKUs: 0,
          totalAuditedValue: 0,
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

      auditor.totalAuditedValue += (record.AuditorAuditedValue || 0);
      auditor.totalDeviationValue += (record.AppearedValue || 0); // Renaming totalValue to totalDeviationValue for clarity
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
      const matchRate = auditor.totalAppearedQty > 0 // Was totalAppearedQty? No, check useMemo below. logic mixed up qty vs value?
      // Wait, match rate usually specific to QTY or SKUs? Previous code used QTY.
      // Let's check original code: const matchRate = auditor.totalAppearedQty > 0 ? (auditor.totalMatchedQty / auditor.totalAppearedQty) * 100
      // So I should keep using QTY for rates.

      // But for the values: 
      return {
        auditorId: auditor.auditorId,
        auditorName: auditor.auditorName,
        allottedSKUs: auditor.allottedSKUs,
        allottedPIDs: auditor.allottedPIDs,
        completedSKUs: auditor.completedSKUs,
        completionRate: completionRate,
        avgTime: auditor.count > 0 ? parseFloat((auditor.totalAvgTimePerSKU / auditor.count).toFixed(2)) : 0,
        avgTimePID: auditor.count > 0 ? parseFloat((auditor.totalAvgTimePerPID / auditor.count).toFixed(2)) : 0,
        matchRate: auditor.totalAppearedQty > 0 ? parseFloat(((auditor.totalMatchedQty / auditor.totalAppearedQty) * 100).toFixed(1)) : 0,
        editRate: auditor.totalAppearedQty > 0 ? parseFloat(((auditor.totalRevisedQty / auditor.totalAppearedQty) * 100).toFixed(1)) : 0,
        totalAuditedValue: auditor.totalAuditedValue,
        totalDeviationValue: auditor.totalDeviationValue,
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
      acc.appeared.value += a.totalDeviationValue; // Was totalValue
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

    const avgPIDTime = (auditorData.reduce((sum, a) => sum + a.avgTimePID, 0) / count);
    
    return {
      avgTimePerSKU: `${(totalAvgTime / count).toFixed(1)} min`,
      avgTimePerSKUProduct: `${((totalAvgTime / count) * 2.4).toFixed(1)} min`,
      avgTimePerPID: `${avgPIDTime.toFixed(1)} min`,
      avgTimePerPIDProduct: `${(avgPIDTime * 2.4).toFixed(1)} min`,
      deviations
    };
  }, [auditorData]);

  const [showAuditorDetail, setShowAuditorDetail] = useState(false);
  const [selectedAuditorId, setSelectedAuditorId] = useState(null);
  const [showPerformersModal, setShowPerformersModal] = useState(false);
  const [performersModalData, setPerformersModalData] = useState({ title: '', items: [], variant: '', metric: '' });

  const handleShowMorePerformers = (type) => {
    // Pass ALL auditors, but formatted as {name, value}
    // We will let the modal handle sorting and slicing
    // Map status from json file
    const items = auditorData.map(a => {
      const statusObj = auditorsJson.find(aj => aj.AuditorID === a.auditorId);
      return {
        name: a.auditorName,
        value: a.matchRate,
        status: statusObj ? statusObj.Status : 'Active' // Default to Active if not found
      };
    });

    if (type === 'top') {
      setPerformersModalData({
        title: 'Audit Accuracy Ranking',
        items: items,
        initialSort: 'desc', // High to Low
        metricLabel: 'Audit Accuracy'
      });
    } else {
      setPerformersModalData({
        title: 'Audit Accuracy Ranking',
        items: items,
        initialSort: 'asc', // Low to High
        metricLabel: 'Audit Accuracy'
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
      "EMP ID": a.auditorId,
      "Name": a.auditorName,
      "Total Audits": a.totalAudits,
      "Allotted PIDs": a.allottedPIDs.toLocaleString('en-IN'),
      "Allotted SKUs": a.allottedSKUs.toLocaleString('en-IN'),
      "Allotted Qty": a.totalAppearedQty.toLocaleString('en-IN'),
      "Avg Time/PID (min)": a.avgTimePID,
      "Avg Time/SKU (min)": a.avgTime,
      "Match Rate %": a.matchRate,
      "Edit Rate %": a.editRate,
      "Total Deviation Value (Rs.)": a.totalDeviationValue,
      "Total Value (Rs.)": a.totalAuditedValue,
    }));
    const wsDetails = utils.json_to_sheet(detailedData);
    wsDetails['!cols'] = [
      { wch: 15 }, { wch: 25 }, { wch: 15 },
      { wch: 18 }, { wch: 18 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 12 }, { wch: 15 }, { wch: 18 }, { wch: 18 }
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
      head: [['ID', 'Name', 'Audits', 'Allotted PIDs', 'Allotted SKUs', 'Allotted Qty', 'Avg Time/PID', 'Avg Time/SKU', 'Match %', 'Edit %', 'Dev Value (Rs.)', 'Total Value (Rs.)']],
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
          `${a.editRate}%`,
          (a.totalDeviationValue || 0).toLocaleString('en-IN'),
          (a.totalAuditedValue || 0).toLocaleString('en-IN')
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
              EMP ID {getSortIcon('auditorId')}
            </div>
          </th>
          <th onClick={() => requestSort('auditorName')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Name {getSortIcon('auditorName')}
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
              Allotted Qty (Units) {getSortIcon('totalAppearedQty')}
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
              Audit Accuracy % {getSortIcon('matchRate')}
            </div>
          </th>

          <th onClick={() => requestSort('totalAuditedValue')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Total Audited Value (MRP) {getSortIcon('totalAuditedValue')}
            </div>
          </th>
          <th onClick={() => requestSort('totalDeviationValue')} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-1">
              Total Deviation Value (MRP) {getSortIcon('totalDeviationValue')}
            </div>
          </th>

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

            <td className="fw-semibold">{formatIndianCurrency(auditor.totalAuditedValue)}</td>

            <td className="fw-semibold">{formatIndianCurrency(auditor.totalDeviationValue)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <Container fluid className="auditor-performance-tab py-4">

      {/* Performance Summary Cards */}
      <Row className="g-3 mb-4 align-items-stretch">
        {/* Total Auditors Card */}
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex justify-content-between align-items-start flex-column">
              <div className="d-flex w-100 justify-content-between align-items-start">
                <div>
                  <h6 className="text-primary fw-bold text-uppercase mb-3">
                    AUDITORS
                  </h6>
                  <div className="text-secondary text-uppercase mb-1 small fw-semibold" style={{ visibility: 'hidden' }}>SPACER</div>
                  <h2 className="fw-bold text-primary mb-0" style={{ fontSize: '2rem' }}>{auditorData.length}</h2>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded-3 text-primary">
                  <i className="fas fa-users fa-lg"></i>
                </div>
              </div>
              <div className="text-muted small mt-auto">
                Auditors with at least one audit in FY
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Avg Time / PID Card */}
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex justify-content-between align-items-start flex-column">
              <div className="d-flex w-100 justify-content-between align-items-start">
                <div>
                  <h6 className="text-primary fw-bold text-uppercase mb-3">
                    AVG TIME / PID
                  </h6>
                  <div className="d-flex">
                    <div className="me-4 pe-4 border-end">
                      <div className="text-secondary text-uppercase mb-1 small fw-semibold">PRODUCT AUDITS</div>
                      <h2 className="fw-bold text-primary mb-0" style={{ fontSize: '2rem' }}>{performanceMetrics.avgTimePerPID}</h2>
                    </div>
                    <div>
                      <div className="text-secondary text-uppercase mb-1 small fw-semibold">BATCH AUDITS</div>
                      <h2 className="fw-bold text-primary mb-0" style={{ fontSize: '2rem' }}>{performanceMetrics.avgTimePerPIDProduct}</h2>
                    </div>
                  </div>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded-3 text-primary">
                  <i className="fas fa-hourglass-half fa-lg"></i>
                </div>
              </div>
              <div className="text-muted small mt-auto">
                Across all audits
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Avg Time / SKU Card (Combined) */}
        <Col md={5}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex justify-content-between align-items-start flex-column">
              <div className="d-flex w-100 justify-content-between align-items-start">
                <div>
                  <h6 className="text-primary fw-bold text-uppercase mb-3">
                    AVG TIME / SKU
                  </h6>
                  <div className="d-flex">
                    <div className="me-4 pe-4 border-end">
                      <div className="text-secondary text-uppercase mb-1 small fw-semibold">PRODUCT AUDITS</div>
                      <h2 className="fw-bold text-primary mb-0" style={{ fontSize: '2rem' }}>{performanceMetrics.avgTimePerSKU}</h2>
                    </div>
                    <div>
                      <div className="text-secondary text-uppercase mb-1 small fw-semibold">BATCH AUDITS</div>
                      <h2 className="fw-bold text-primary mb-0" style={{ fontSize: '2rem' }}>{performanceMetrics.avgTimePerSKUProduct}</h2>
                    </div>
                  </div>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded-3 text-primary">
                  <i className="fas fa-clock fa-lg"></i>
                </div>
              </div>
              <div className="text-muted small mt-auto">Across all audits</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>


      {/* Deviation Summary */}
      <h6 className="text-muted text-uppercase mb-3 fw-bold" style={{ fontSize: '0.85rem' }}>AUDIT ACCURACY</h6>
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm border-start border-4 border-primary">
            <Card.Body>
              <h6 className="text-primary fw-bold text-uppercase mb-3">APPEARED MISMATCHES</h6>
              <div className="d-flex justify-content-between mb-1 text-muted small">
                <span>SKUs</span>
                <span className="fw-bold text-dark">{formatIndianNumber(performanceMetrics.deviations.appeared.skus, true)}</span>
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
              <h6 className="text-success fw-bold text-uppercase mb-3">REVISED MISMATCHES</h6>
              <div className="d-flex justify-content-between mb-1 text-muted small">
                <span>SKUs</span>
                <span className="fw-bold text-dark">{formatIndianNumber(performanceMetrics.deviations.matched.skus, true)}</span>
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
              <h6 className="text-warning fw-bold text-uppercase mb-3">FINAL DEVIATIONS</h6>
              <div className="d-flex justify-content-between mb-1 text-muted small">
                <span>SKUs</span>
                <span className="fw-bold text-dark">{formatIndianNumber(performanceMetrics.deviations.revised.skus, true)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>Value</span>
                <span className="fw-bold text-dark">{formatIndianCurrency(performanceMetrics.deviations.revised.value)}</span>
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
              )}
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
        initialSort={performersModalData.initialSort}
        metricLabel={performersModalData.metricLabel}
      />
    </Container >
  );
};

export default AuditorPerformance;
