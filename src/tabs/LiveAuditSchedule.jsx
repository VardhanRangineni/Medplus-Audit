import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Table, ProgressBar, Alert } from 'react-bootstrap';
import KPICard from '../components/KPICard';
import './LiveAuditSchedule.css';

const LiveAuditSchedule = ({ filters = {} }) => {
  const navigate = useNavigate();
  
  // Check if any filters are active
  const hasActiveFilters = filters.state || filters.store || filters.auditJobType || filters.auditProcessType || filters.auditStatus;

  // Mock Data
  const workflowStats = {
    created: 45,
    inProgress: 128,
    pending: 37,
    completed: 240
  };

  const auditTableData = [
    {
      storeId: 'MP001',
      storeName: 'Chennai Central',
      supervisor: 'Rajesh Kumar',
      auditors: 'Amit, Priya, Suresh',
      startDate: '2024-12-01',
      completedSKUs: 3250,
      totalSKUs: 4200,
      progress: 77.4
    },
    {
      storeId: 'MP002',
      storeName: 'Bangalore Hub',
      supervisor: 'Lakshmi Iyer',
      auditors: 'Deepak, Anitha',
      startDate: '2024-12-03',
      completedSKUs: 2800,
      totalSKUs: 3900,
      progress: 71.8
    },
    {
      storeId: 'MP003',
      storeName: 'Hyderabad Main',
      supervisor: 'Mohammed Ali',
      auditors: 'Ravi, Sneha, Karthik, Meena',
      startDate: '2024-12-05',
      completedSKUs: 4100,
      totalSKUs: 5200,
      progress: 78.8
    },
    {
      storeId: 'MP004',
      storeName: 'Pune West',
      supervisor: 'Pradeep Singh',
      auditors: 'Vijay, Pooja',
      startDate: '2024-12-07',
      completedSKUs: 1850,
      totalSKUs: 3100,
      progress: 59.7
    },
    {
      storeId: 'MP005',
      storeName: 'Mumbai Central',
      supervisor: 'Neha Sharma',
      auditors: 'Arun, Divya, Ramesh',
      startDate: '2024-12-08',
      completedSKUs: 2950,
      totalSKUs: 4800,
      progress: 61.5
    }
  ];

  const showWorkflowDetails = (status) => {
    navigate(`/details?title=${encodeURIComponent(status + ' Audits')}&type=audit-${status.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const showLiveAuditProgress = (store) => {
    navigate(`/details?title=${encodeURIComponent(store.storeName + ' - Live Audit Progress')}&type=audit-progress&store=${encodeURIComponent(store.storeName)}`);
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'success';
    if (progress >= 60) return 'warning';
    return 'danger';
  };

  return (
    <Container fluid className="live-audit-tab py-4">
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
      {/* Audit Workflow Tiles */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <KPICard
            title="Created"
            value={workflowStats.created}
            subtitle="Not started"
            icon="fas fa-file-alt"
            color="secondary"
            onClick={() => showWorkflowDetails('Created')}
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="In Progress"
            value={workflowStats.inProgress}
            subtitle="Actively running"
            icon="fas fa-spinner"
            color="primary"
            onClick={() => showWorkflowDetails('In Progress')}
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="Pending"
            value={workflowStats.pending}
            subtitle="Awaiting action"
            icon="fas fa-pause-circle"
            color="warning"
            onClick={() => showWorkflowDetails('Pending')}
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="Completed"
            value={workflowStats.completed}
            subtitle="Finalized"
            icon="fas fa-check-circle"
            color="success"
            onClick={() => showWorkflowDetails('Completed')}
          />
        </Col>
      </Row>

      {/* Detailed Audit Table */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-table me-2 text-primary"></i>
                Live Audit Schedule
              </h5>
              <small className="text-muted">Click on any row to view auditor-wise allocation and real-time progress</small>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0 audit-table">
                  <thead className="bg-light">
                    <tr>
                      <th>Store ID</th>
                      <th>Store Name</th>
                      <th>Supervisor</th>
                      <th>Assigned Auditors</th>
                      <th>Start Date</th>
                      <th>Audit Progress</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditTableData.map((audit, idx) => (
                      <tr 
                        key={idx} 
                        className="audit-row"
                        onClick={() => showLiveAuditProgress(audit)}
                      >
                        <td>
                          <Badge bg="light" text="dark" className="font-monospace">
                            {audit.storeId}
                          </Badge>
                        </td>
                        <td className="fw-semibold">{audit.storeName}</td>
                        <td>
                          <i className="fas fa-user-tie me-2 text-muted"></i>
                          {audit.supervisor}
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <Badge bg="info" pill>
                              {audit.auditors.split(',').length}
                            </Badge>
                            <small className="text-muted">{audit.auditors}</small>
                          </div>
                        </td>
                        <td>
                          <i className="fas fa-calendar me-2 text-muted"></i>
                          {audit.startDate}
                        </td>
                        <td style={{ minWidth: '250px' }}>
                          <div className="mb-1">
                            <small className="text-muted">
                              {audit.completedSKUs.toLocaleString()} / {audit.totalSKUs.toLocaleString()} SKUs
                            </small>
                          </div>
                          <ProgressBar 
                            now={audit.progress} 
                            variant={getProgressColor(audit.progress)}
                            label={`${audit.progress.toFixed(1)}%`}
                            style={{ height: '20px' }}
                          />
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
    </Container>
  );
};

export default LiveAuditSchedule;
