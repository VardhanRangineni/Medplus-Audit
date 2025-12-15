import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Table, ProgressBar, Badge, Alert, Modal, Button } from 'react-bootstrap';
import KPICard from '../components/KPICard';
import AuditorDetailModal from '../components/AuditorDetailModal';
import rawAuditData from '../data/audit_dataset_200_records.json';
import './AuditorPerformance.css';

const AuditorPerformance = ({ filters = {} }) => {
  const [modalConfig, setModalConfig] = useState({ show: false, title: '', data: [], columns: [] });
  const [showAllModal, setShowAllModal] = useState(false);

  // Check if any filters are active
  const hasActiveFilters = filters.state || filters.store || filters.auditJobType || filters.auditProcessType || filters.auditStatus;

  // Process data to get auditor metrics
  const auditorData = useMemo(() => {
    // 1. Group by Auditor
    const auditorMap = {};

    rawAuditData.forEach(record => {
      const id = record.AuditorID;
      if (!id) return;

      // Filter by Time Period (financialYear prop)
      if (filters.financialYear && filters.financialYear !== 'All-time') {
        const date = new Date(record.AuditDate);
        const month = date.getMonth(); // 0-11
        const year = date.getFullYear();

        if (year !== 2025) return; // Only 2025 supported for now as per requirements

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

      if (!auditorMap[id]) {
        auditorMap[id] = {
          auditorId: id,
          auditorName: record.AuditorName,
          allottedSKUs: 0,
          completedSKUs: 0,
          totalAvgTime: 0,
          totalMatchRate: 0,
          totalEditRate: 0,
          count: 0
        };
      }

      const auditor = auditorMap[id];
      // Use "AuditorAllottedSKUs" and "CompletedSKUs" from JSON
      auditor.allottedSKUs += (record.AuditorAllottedSKUs || 0);
      auditor.completedSKUs += (record.CompletedSKUs || 0);
      auditor.totalAvgTime += (record.AvgTimePerSKU || 0);
      auditor.totalMatchRate += (record.MatchRatePercent || 0);
      auditor.totalEditRate += (record.EditRatePercent || 0);
      auditor.count += 1;
    });

    // 2. Calculate Averages and Rates
    const processedList = Object.values(auditorMap).map(auditor => {
      // Avoid division by zero
      const completionRate = auditor.allottedSKUs > 0
        ? (auditor.completedSKUs / auditor.allottedSKUs) * 100
        : 0;

      return {
        auditorId: auditor.auditorId,
        auditorName: auditor.auditorName,
        allottedSKUs: auditor.allottedSKUs,
        completedSKUs: auditor.completedSKUs,
        completionRate: completionRate,
        avgTime: parseFloat((auditor.totalAvgTime / auditor.count).toFixed(1)),
        matchRate: parseFloat((auditor.totalMatchRate / auditor.count).toFixed(1)),
        editRate: parseFloat((auditor.totalEditRate / auditor.count).toFixed(1))
      };
    });

    // 3. Sort by Allotted SKUs Descending
    processedList.sort((a, b) => b.allottedSKUs - a.allottedSKUs);

    // 4. Return Full List
    return processedList;
  }, []); // Dependency array empty as we are using static imported data

  // Calculate overall performance metrics for cards
  const performanceMetrics = useMemo(() => {
    if (auditorData.length === 0) return { avgTimePerSKU: '0 min', matchRate: 0, editRate: 0 };

    const totalAvgTime = auditorData.reduce((sum, a) => sum + a.avgTime, 0);
    const totalMatchRate = auditorData.reduce((sum, a) => sum + a.matchRate, 0);
    const totalEditRate = auditorData.reduce((sum, a) => sum + a.editRate, 0);
    const count = auditorData.length;

    return {
      avgTimePerSKU: `${(totalAvgTime / count).toFixed(1)} min`,
      matchRate: (totalMatchRate / count).toFixed(1),
      editRate: (totalEditRate / count).toFixed(1)
    };
  }, [auditorData]);

  const showAuditorPIDDetails = (auditor) => {
    // Note: detailed PID data is not available in the summary JSON
    setModalConfig({
      show: true,
      title: `${auditor.auditorName} (${auditor.auditorId}) - PID Workload View`,
      data: [],
      columns: [
        { key: 'pid', label: 'PID' },
        { key: 'productName', label: 'Product Name' },
        { key: 'assignedQty', label: 'Assigned Qty' },
        { key: 'completedQty', label: 'Completed Qty' },
        { key: 'timeSpent', label: 'Time Spent' },
        { key: 'status', label: 'Status' },
        { key: 'deviations', label: 'Deviations' },
        { key: 'matchStatus', label: 'Match Status' }
      ]
    });
  };

  // ... existing code ...

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

  const renderTableRows = (data) => (
    <Table hover className="mb-0 auditor-table">
      <thead className="bg-light sticky-top" style={{ top: 0, zIndex: 1, position: 'sticky' }}>
        <tr>
          <th>Auditor ID</th>
          <th>Auditor Name</th>
          <th>Allotted SKUs</th>
          <th>Completed SKUs</th>
          <th>Completion %</th>
          <th>Avg Time/SKU</th>
          <th>Match Rate %</th>
          <th>Edit Rate %</th>
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
              <i className="fas fa-user me-2 text-muted"></i>
              {auditor.auditorName}
            </td>
            <td>{auditor.allottedSKUs.toLocaleString()}</td>
            <td>
              <strong className="text-primary">
                {auditor.completedSKUs.toLocaleString()}
              </strong>
            </td>
            <td style={{ minWidth: '200px' }}>
              <div className="d-flex align-items-center gap-2">
                <ProgressBar
                  now={auditor.completionRate}
                  variant={getCompletionColor(auditor.completionRate)}
                  style={{ height: '20px', flex: 1 }}
                />
                <Badge bg={getCompletionColor(auditor.completionRate)}>
                  {auditor.completionRate.toFixed(1)}%
                </Badge>
              </div>
            </td>
            <td>
              <Badge bg={auditor.avgTime < 4.5 ? 'success' : 'warning'}>
                {auditor.avgTime} min
              </Badge>
            </td>
            <td>
              <Badge bg={getPerformanceBadge(auditor.matchRate, 93)}>
                {auditor.matchRate.toFixed(1)}%
              </Badge>
            </td>
            <td>
              <Badge bg={getPerformanceBadge(auditor.editRate, 10, true)}>
                {auditor.editRate.toFixed(1)}%
              </Badge>
            </td>
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

      {/* Performance Summary Cards */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <KPICard
            title="Average Time per SKU"
            value={performanceMetrics.avgTimePerSKU}
            subtitle="Productivity efficiency"
            icon="fas fa-clock"
            color="primary"
          />
        </Col>
        <Col md={4}>
          <KPICard
            title="Match Rate"
            value={`${performanceMetrics.matchRate}%`}
            subtitle="Accuracy vs re-audit"
            icon="fas fa-bullseye"
            color="success"
          />
        </Col>
        <Col md={4}>
          <KPICard
            title="Edit Rate"
            value={`${performanceMetrics.editRate}%`}
            subtitle="Quality indicator"
            icon="fas fa-edit"
            color="warning"
          />
        </Col>
      </Row>

      {/* Productivity Summary Table */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-users me-2 text-primary"></i>
                Auditor Productivity Summary
              </h5>
              <small className="text-muted">Click on any auditor to view detailed performance metrics</small>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                {renderTableRows(auditorData.slice(0, 5))}
              </div>
            </Card.Body>
            <Card.Footer className="bg-white border-0 text-center py-3">
              <Button
                variant="link"
                className="text-decoration-none fw-bold"
                onClick={() => setShowAllModal(true)}
              >
                VIEW MORE <i className="fas fa-arrow-right ms-2"></i>
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* All Auditors Modal */}
      <Modal
        show={showAllModal}
        onHide={() => setShowAllModal(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-users me-2 text-primary"></i>
            All Auditors Performance
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <div className="table-responsive">
            {renderTableRows(auditorData)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAllModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Performance Insights */}
      <Row className="mt-4">
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
                {auditorData
                  .sort((a, b) => b.completionRate - a.completionRate)
                  .slice(0, 3)
                  .map((auditor, idx) => (
                    <div key={idx} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                      <div>
                        <Badge bg="success" className="me-2">{idx + 1}</Badge>
                        <strong>{auditor.auditorName}</strong>
                      </div>
                      <Badge bg="success" pill>{auditor.completionRate.toFixed(1)}%</Badge>
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
                {auditorData
                  .sort((a, b) => a.completionRate - b.completionRate)
                  .slice(0, 3)
                  .map((auditor, idx) => (
                    <div key={idx} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                      <div>
                        <Badge bg="warning" className="me-2">{idx + 1}</Badge>
                        <strong>{auditor.auditorName}</strong>
                      </div>
                      <Badge bg="warning" pill>{auditor.completionRate.toFixed(1)}%</Badge>
                    </div>
                  ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Detailed Auditor Modal */}
      <AuditorDetailModal
        show={showAuditorDetail}
        onHide={() => setShowAuditorDetail(false)}
        auditorId={selectedAuditorId}
        allData={rawAuditData}
      />
    </Container>
  );
};

export default AuditorPerformance;
