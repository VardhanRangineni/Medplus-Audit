import { useState } from 'react';
import { Container, Row, Col, Card, Table, ProgressBar, Badge, Alert } from 'react-bootstrap';
import KPICard from '../components/KPICard';
import DrillDownModal from '../components/DrillDownModal';
import './AuditorPerformance.css';

const AuditorPerformance = ({ filters = {} }) => {
  const [modalConfig, setModalConfig] = useState({ show: false, title: '', data: [], columns: [] });
  
  // Check if any filters are active
  const hasActiveFilters = filters.state || filters.store || filters.auditJobType || filters.auditProcessType || filters.auditStatus;

  // Performance Cards Data
  const performanceMetrics = {
    avgTimePerSKU: '4.2 min',
    matchRate: 94.5,
    editRate: 8.3
  };

  // Productivity Table Data
  const auditorData = [
    {
      auditorId: 'AUD001',
      auditorName: 'Amit Singh',
      allottedSKUs: 2400,
      completedSKUs: 2150,
      completionRate: 89.6,
      avgTime: 4.1,
      matchRate: 95.2,
      editRate: 7.5
    },
    {
      auditorId: 'AUD002',
      auditorName: 'Priya Reddy',
      allottedSKUs: 2800,
      completedSKUs: 2650,
      completionRate: 94.6,
      avgTime: 3.8,
      matchRate: 96.8,
      editRate: 6.2
    },
    {
      auditorId: 'AUD003',
      auditorName: 'Suresh Kumar',
      allottedSKUs: 2200,
      completedSKUs: 1850,
      completionRate: 84.1,
      avgTime: 5.2,
      matchRate: 91.5,
      editRate: 11.8
    },
    {
      auditorId: 'AUD004',
      auditorName: 'Deepak Sharma',
      allottedSKUs: 2600,
      completedSKUs: 2450,
      completionRate: 94.2,
      avgTime: 4.0,
      matchRate: 94.8,
      editRate: 8.1
    },
    {
      auditorId: 'AUD005',
      auditorName: 'Anitha Rao',
      allottedSKUs: 2350,
      completedSKUs: 2200,
      completionRate: 93.6,
      avgTime: 4.3,
      matchRate: 93.2,
      editRate: 9.5
    },
    {
      auditorId: 'AUD006',
      auditorName: 'Ravi Verma',
      allottedSKUs: 2100,
      completedSKUs: 1750,
      completionRate: 83.3,
      avgTime: 5.5,
      matchRate: 89.7,
      editRate: 13.2
    }
  ];

  const showAuditorPIDDetails = (auditor) => {
    const auditorStoreMap = {
      'Amit Singh': [
        { storeId: 'MP001', storeName: 'Chennai Central', state: 'TN', assignedSKUs: 1400, completedSKUs: 1100, completionRate: 78.6, matchRate: 95.2, startDate: '2024-12-01', status: 'In Progress' },
        { storeId: 'MP006', storeName: 'Delhi NCR', state: 'DL', assignedSKUs: 1000, completedSKUs: 1000, completionRate: 100, matchRate: 96.2, startDate: '2024-11-20', status: 'Completed' }
      ],
      'Priya Reddy': [
        { storeId: 'MP001', storeName: 'Chennai Central', state: 'TN', assignedSKUs: 1400, completedSKUs: 1100, completionRate: 78.6, matchRate: 96.8, startDate: '2024-12-01', status: 'In Progress' },
        { storeId: 'MP010', storeName: 'Bhopal Main', state: 'MP', assignedSKUs: 1400, completedSKUs: 1400, completionRate: 100, matchRate: 94.3, startDate: '2024-11-15', status: 'Completed' }
      ],
      'Suresh Kumar': [
        { storeId: 'MP001', storeName: 'Chennai Central', state: 'TN', assignedSKUs: 1400, completedSKUs: 1050, completionRate: 75.0, matchRate: 91.5, startDate: '2024-12-01', status: 'In Progress' }
      ],
      'Deepak Sharma': [
        { storeId: 'MP002', storeName: 'Bangalore Hub', state: 'KA', assignedSKUs: 1950, completedSKUs: 1400, completionRate: 71.8, matchRate: 94.8, startDate: '2024-12-03', status: 'In Progress' },
        { storeId: 'MP008', storeName: 'Kolkata East', state: 'WB', assignedSKUs: 650, completedSKUs: 650, completionRate: 100, matchRate: 95.3, startDate: '2024-11-22', status: 'Completed' }
      ],
      'Anitha Rao': [
        { storeId: 'MP002', storeName: 'Bangalore Hub', state: 'KA', assignedSKUs: 1950, completedSKUs: 1400, completionRate: 71.8, matchRate: 93.5, startDate: '2024-12-03', status: 'In Progress' }
      ],
      'Ravi Verma': [
        { storeId: 'MP003', storeName: 'Hyderabad Main', state: 'TS', assignedSKUs: 1300, completedSKUs: 1025, completionRate: 78.8, matchRate: 92.3, startDate: '2024-12-05', status: 'In Progress' },
        { storeId: 'MP009', storeName: 'Nagpur Central', state: 'MH', assignedSKUs: 800, completedSKUs: 725, completionRate: 90.6, matchRate: 87.1, startDate: '2024-11-25', status: 'In Progress' }
      ]
    };

    const mockStoreData = auditorStoreMap[auditor.auditorName] || [];

    setModalConfig({
      show: true,
      title: `${auditor.auditorName} (${auditor.auditorId}) - Stores Audited`,
      data: mockStoreData,
      columns: [
        { key: 'storeId', label: 'Store ID' },
        { key: 'storeName', label: 'Store Name' },
        { key: 'state', label: 'State' },
        { key: 'assignedSKUs', label: 'Assigned SKUs' },
        { key: 'completedSKUs', label: 'Completed SKUs' },
        { key: 'completionRate', label: 'Completion Rate (%)' },
        { key: 'matchRate', label: 'Match Rate (%)' },
        { key: 'startDate', label: 'Start Date' }
      ]
    });
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

  return (
    <Container fluid className="auditor-performance-tab py-4">      {/* Filter Status Alert */}
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
      )}      {/* Performance Summary Cards */}
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
              <small className="text-muted">Click on any auditor to view stores they have audited</small>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0 auditor-table">
                  <thead className="bg-light">
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
                    {auditorData.map((auditor, idx) => (
                      <tr 
                        key={idx}
                        className="auditor-row"
                        onClick={() => showAuditorPIDDetails(auditor)}
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
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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

      {/* Drill-Down Modal */}
      <DrillDownModal
        show={modalConfig.show}
        onHide={() => setModalConfig({ ...modalConfig, show: false })}
        title={modalConfig.title}
        data={modalConfig.data}
        columns={modalConfig.columns}
      />
    </Container>
  );
};

export default AuditorPerformance;
