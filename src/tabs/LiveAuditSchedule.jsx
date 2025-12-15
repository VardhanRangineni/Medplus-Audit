import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Table, ProgressBar, Alert, Form, InputGroup } from 'react-bootstrap';
import KPICard from '../components/KPICard';
import StoreDetailModal from '../components/StoreDetailModal';
import { mockDataService } from '../services/mockDataService';
import './LiveAuditSchedule.css';

const LiveAuditSchedule = ({ filters = {} }) => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('in-progress');
  const [expandedRows, setExpandedRows] = useState({});
  const [mismatchFilters, setMismatchFilters] = useState({});
  const [mismatchSearchTerms, setMismatchSearchTerms] = useState({});
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [storeData, setStoreData] = useState(null);

  // Fetch store data when selectedStore changes
  useEffect(() => {
    const fetchStoreData = async () => {
      if (selectedStore?.storeId) {
        const data = await mockDataService.getStoreDetailedInfo(selectedStore.storeId, filters);
        setStoreData(data);
      }
    };
    fetchStoreData();
  }, [selectedStore, filters]);

  // Check if any filters are active
  const hasActiveFilters = filters.state || filters.store || filters.auditJobType || filters.auditProcessType || filters.auditStatus;

  // Mock Data
  const workflowStats = {
    created: 9,
    inProgress: 5,
    pending: 1,
    completed: 3
  };

  // Sample audit data for table
  const allCreatedAudits = [
    { storeId: 'MP001', storeName: 'Chennai Central', supervisor: 'Rajesh Kumar', auditors: 'Amit, Priya, Suresh', startDate: '2024-12-01', completedSKUs: 3250, totalSKUs: 4200, progress: 77.4, status: 'in-progress' },
    { storeId: 'MP002', storeName: 'Bangalore Hub', supervisor: 'Lakshmi Iyer', auditors: 'Deepak, Anitha', startDate: '2024-12-03', completedSKUs: 2800, totalSKUs: 3900, progress: 71.8, status: 'in-progress' },
    { storeId: 'MP003', storeName: 'Hyderabad Main', supervisor: 'Mohammed Ali', auditors: 'Ravi, Sneha', startDate: '2024-12-05', completedSKUs: 4100, totalSKUs: 5200, progress: 78.8, status: 'in-progress' },
    { storeId: 'MP004', storeName: 'Pune West', supervisor: 'Pradeep Singh', auditors: 'Vijay, Pooja', startDate: '2024-12-07', completedSKUs: 1850, totalSKUs: 3100, progress: 59.7, status: 'in-progress' },
    { storeId: 'MP005', storeName: 'Mumbai Central', supervisor: 'Neha Sharma', auditors: 'Arun, Divya', startDate: '2024-12-08', completedSKUs: 2950, totalSKUs: 4800, progress: 61.5, status: 'in-progress' },
    { storeId: 'MP007', storeName: 'Ahmedabad Main', supervisor: 'Kiran Patel', auditors: 'Not Assigned', startDate: '2024-12-06', completedSKUs: 0, totalSKUs: 3600, progress: 0, status: 'created' },
    { storeId: 'MP012', storeName: 'Surat Hub', supervisor: 'Dipak Shah', auditors: 'Hitesh, Nisha', startDate: '2024-12-07', completedSKUs: 0, totalSKUs: 2800, progress: 0, status: 'pending' },
    // Completed Audits
    {
      storeId: 'MP006', storeName: 'Delhi NCR', state: 'DL', supervisor: 'Amit Verma', noOfAuditors: 3, auditors: 'Rohit, Sneha, Karan', startDate: '2024-11-20', endDate: '2024-11-28', totalPIDs: 1850, totalSKUs: 4500, completedSKUs: 4500, duration: 192, deviations: 4, mismatch: 12, mismatchDetails: [
        { productId: 'PID001', sku: 'SKU12345', productName: 'Paracetamol 500mg', type: 'Short', systemQty: 100, physicalQty: 95, difference: -5 },
        { productId: 'PID002', sku: 'SKU12346', productName: 'Ibuprofen 400mg', type: 'Excess', systemQty: 50, physicalQty: 53, difference: 3 },
        { productId: 'PID003', sku: 'SKU12347', productName: 'Aspirin 75mg', type: 'Contra Short', systemQty: 80, physicalQty: 78, difference: -2 },
        { productId: 'PID004', sku: 'SKU12348', productName: 'Vitamin C Tablets', type: 'Contra Excess', systemQty: 120, physicalQty: 122, difference: 2 }
      ], auditJobType: 'Full Audit', processType: 'Product Audit', progress: 100, status: 'completed'
    },
    {
      storeId: 'MP008', storeName: 'Kolkata East', state: 'WB', supervisor: 'Sourav Das', noOfAuditors: 2, auditors: 'Ankit, Rina', startDate: '2024-11-22', endDate: '2024-11-30', totalPIDs: 1650, totalSKUs: 3800, completedSKUs: 3800, duration: 192, deviations: 4, mismatch: 18, mismatchDetails: [
        { productId: 'PID006', sku: 'SKU22345', productName: 'Metformin 500mg', type: 'Short', systemQty: 200, physicalQty: 192, difference: -8 },
        { productId: 'PID007', sku: 'SKU22346', productName: 'Amlodipine 5mg', type: 'Excess', systemQty: 75, physicalQty: 79, difference: 4 }
      ], auditJobType: 'Partial/Random Audit', processType: 'Batch Audit', progress: 100, status: 'completed'
    },
    {
      storeId: 'MP009', storeName: 'Nagpur Central', state: 'MH', supervisor: 'Pooja Deshmukh', noOfAuditors: 2, auditors: 'Manoj, Kavita', startDate: '2024-11-25', endDate: '2024-12-02', totalPIDs: 1420, totalSKUs: 3200, completedSKUs: 3200, duration: 168, deviations: 3, mismatch: 8, mismatchDetails: [
        { productId: 'PID010', sku: 'SKU32345', productName: 'Omeprazole 20mg', type: 'Short', systemQty: 150, physicalQty: 147, difference: -3 }
      ], auditJobType: 'Full Audit', processType: 'Product Audit', progress: 100, status: 'completed'
    },
  ];

  const allAuditData = {
    created: allCreatedAudits, // Show all audits when 'Created' is selected
    'in-progress': allCreatedAudits.filter(audit => audit.status === 'in-progress'),
    pending: allCreatedAudits.filter(audit => audit.status === 'pending'),
    completed: allCreatedAudits.filter(audit => audit.status === 'completed')
  };

  const auditTableData = allAuditData[selectedStatus] || [];

  const showWorkflowDetails = (status) => {
    const statusMap = {
      'Created': 'created',
      'In Progress': 'in-progress',
      'Pending': 'pending',
      'Completed': 'completed'
    };
    setSelectedStatus(statusMap[status]);
  };

  const toggleMismatchDetails = (storeId) => {
    setExpandedRows(prev => ({ ...prev, [storeId]: !prev[storeId] }));
  };

  const handleMismatchFilterChange = (storeId, filterValue) => {
    setMismatchFilters(prev => ({ ...prev, [storeId]: filterValue }));
  };

  const handleMismatchSearchChange = (storeId, searchValue) => {
    setMismatchSearchTerms(prev => ({ ...prev, [storeId]: searchValue }));
  };

  const filterMismatchDetails = (details, storeId) => {
    if (!details || details.length === 0) return [];

    const filterType = mismatchFilters[storeId] || 'all';
    const searchTerm = (mismatchSearchTerms[storeId] || '').toLowerCase();

    let filtered = details;

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(item =>
        item.type.toLowerCase().replace(/\s+/g, '-') === filterType.toLowerCase()
      );
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.productId.toLowerCase().includes(searchTerm) ||
        item.sku.toLowerCase().includes(searchTerm) ||
        item.productName.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  const showLiveAuditProgress = (store) => {
    navigate(`/details?title=${encodeURIComponent(store.storeName + ' - Live Audit Progress')}&type=audit-progress&store=${encodeURIComponent(store.storeName)}`);
  };

  const showStoreDetails = (store) => {
    setSelectedStore(store);
    setShowStoreModal(true);
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
            color={selectedStatus === 'created' ? 'secondary' : 'secondary'}
            onClick={() => showWorkflowDetails('Created')}
            style={{
              border: selectedStatus === 'created' ? '2px solid #6c757d' : '1px solid #dee2e6',
              boxShadow: selectedStatus === 'created' ? '0 0 10px rgba(108, 117, 125, 0.3)' : 'none',
              opacity: selectedStatus === 'created' ? 1 : 0.6
            }}
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="In Progress"
            value={workflowStats.inProgress}
            subtitle="Actively running"
            icon="fas fa-spinner"
            color={selectedStatus === 'in-progress' ? 'primary' : 'primary'}
            onClick={() => showWorkflowDetails('In Progress')}
            style={{
              border: selectedStatus === 'in-progress' ? '2px solid #0d6efd' : '1px solid #dee2e6',
              boxShadow: selectedStatus === 'in-progress' ? '0 0 10px rgba(13, 110, 253, 0.3)' : 'none',
              opacity: selectedStatus === 'in-progress' ? 1 : 0.6
            }}
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="Pending"
            value={workflowStats.pending}
            subtitle="Awaiting action"
            icon="fas fa-pause-circle"
            color={selectedStatus === 'pending' ? 'warning' : 'warning'}
            onClick={() => showWorkflowDetails('Pending')}
            style={{
              border: selectedStatus === 'pending' ? '2px solid #ffc107' : '1px solid #dee2e6',
              boxShadow: selectedStatus === 'pending' ? '0 0 10px rgba(255, 193, 7, 0.3)' : 'none',
              opacity: selectedStatus === 'pending' ? 1 : 0.6
            }}
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="Completed"
            value={workflowStats.completed}
            subtitle="Finalized"
            icon="fas fa-check-circle"
            color={selectedStatus === 'completed' ? 'success' : 'success'}
            onClick={() => showWorkflowDetails('Completed')}
            style={{
              border: selectedStatus === 'completed' ? '2px solid #198754' : '1px solid #dee2e6',
              boxShadow: selectedStatus === 'completed' ? '0 0 10px rgba(25, 135, 84, 0.3)' : 'none',
              opacity: selectedStatus === 'completed' ? 1 : 0.6
            }}
          />
        </Col>
      </Row>

      {/* Detailed Audit Table */}
      <Row className="g-0">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-table me-2 text-primary"></i>
                    Live Audit Schedule - {selectedStatus === 'created' ? 'Created' : selectedStatus === 'in-progress' ? 'In Progress' : selectedStatus === 'pending' ? 'Pending' : 'Completed'}
                  </h5>
                  <small className="text-muted">Click on any row to view auditor-wise allocation and real-time progress</small>
                </div>
                <Badge bg="primary" pill style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
                  {auditTableData.length} {auditTableData.length === 1 ? 'Audit' : 'Audits'}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-scroll-container">
                <Table hover className="mb-0 audit-table">
                  <thead className="bg-light">
                    <tr>
                      <th>Store ID</th>
                      <th>Store Name</th>
                      {selectedStatus === 'completed' && <th>State</th>}
                      <th>Supervisor</th>
                      {selectedStatus === 'completed' ? <th>Auditors</th> : <th>Assigned Auditors</th>}
                      <th>Start Date</th>
                      {selectedStatus === 'completed' && <th>End Date</th>}
                      {selectedStatus === 'completed' && <th>PIDs</th>}
                      {selectedStatus === 'completed' && <th>SKUs</th>}
                      {selectedStatus === 'completed' && <th>Duration</th>}
                      {selectedStatus === 'completed' && <th>Deviations</th>}
                      {selectedStatus === 'completed' && <th>Mismatch</th>}
                      {selectedStatus === 'created' && <th>Status</th>}
                      {selectedStatus !== 'completed' && <th>Audit Progress</th>}
                      {selectedStatus === 'completed' && <th>Job Type</th>}
                      {selectedStatus === 'completed' && <th>Process</th>}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditTableData.length > 0 ? (
                      auditTableData.map((audit, idx) => (
                        <React.Fragment key={idx}>
                          <tr
                            className="audit-row"
                            onClick={() => showStoreDetails(audit)}
                            style={{ cursor: 'pointer' }}
                          >
                            <td>
                              <Badge bg="light" text="dark" className="font-monospace">
                                {audit.storeId}
                              </Badge>
                            </td>
                            <td className="fw-semibold">{audit.storeName}</td>
                            {selectedStatus === 'completed' && (
                              <td>
                                <Badge bg="secondary">{audit.state}</Badge>
                              </td>
                            )}
                            <td>
                              <i className="fas fa-user-tie me-2 text-muted"></i>
                              {audit.supervisor}
                            </td>
                            <td>
                              {selectedStatus === 'completed' ? (
                                <Badge bg="info" pill>{audit.noOfAuditors}</Badge>
                              ) : (
                                <div className="d-flex align-items-center gap-2">
                                  {audit.auditors !== 'Not Assigned' ? (
                                    <>
                                      <Badge bg="info" pill>
                                        {audit.auditors.split(',').length}
                                      </Badge>
                                      <small className="text-muted">{audit.auditors}</small>
                                    </>
                                  ) : (
                                    <Badge bg="secondary">{audit.auditors}</Badge>
                                  )}
                                </div>
                              )}
                            </td>
                            <td>
                              <i className="fas fa-calendar me-2 text-muted"></i>
                              {audit.startDate}
                            </td>
                            {selectedStatus === 'completed' && (
                              <>
                                <td>
                                  <i className="fas fa-calendar-check me-2 text-muted"></i>
                                  {audit.endDate}
                                </td>
                                <td>
                                  <Badge bg="light" text="dark">{audit.totalPIDs.toLocaleString()}</Badge>
                                </td>
                                <td>
                                  <Badge bg="light" text="dark">{audit.totalSKUs.toLocaleString()}</Badge>
                                </td>
                                <td>
                                  <Badge bg="primary">{audit.duration}</Badge>
                                </td>
                                <td>
                                  <Badge bg="danger">{audit.deviations || 0}</Badge>
                                </td>
                                <td
                                  onClick={(e) => {
                                    if (audit.mismatchDetails && audit.mismatchDetails.length > 0) {
                                      e.stopPropagation();
                                      toggleMismatchDetails(audit.storeId);
                                    }
                                  }}
                                  style={{
                                    cursor: audit.mismatchDetails && audit.mismatchDetails.length > 0 ? 'pointer' : 'default',
                                    color: audit.mismatchDetails && audit.mismatchDetails.length > 0 ? '#0d6efd' : 'inherit'
                                  }}
                                >
                                  <span className="fw-semibold">{audit.mismatch}</span>
                                  {audit.mismatchDetails && audit.mismatchDetails.length > 0 && (
                                    <i className={`fas fa-chevron-${expandedRows[audit.storeId] ? 'up' : 'down'} ms-2`}></i>
                                  )}
                                </td>
                              </>
                            )}
                            {selectedStatus === 'created' && (
                              <td>
                                <Badge
                                  bg={
                                    audit.status === 'in-progress' ? 'primary' :
                                      audit.status === 'pending' ? 'warning' :
                                        audit.status === 'completed' ? 'success' :
                                          'secondary'
                                  }
                                >
                                  {audit.status === 'in-progress' ? 'In Progress' :
                                    audit.status === 'pending' ? 'Pending' :
                                      audit.status === 'completed' ? 'Completed' :
                                        audit.status}
                                </Badge>
                                {audit.status === 'pending' && audit.reason && (
                                  <div className="mt-1">
                                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                                      <i className="fas fa-exclamation-circle me-1"></i>
                                      {audit.reason}
                                    </small>
                                  </div>
                                )}
                              </td>
                            )}
                            {selectedStatus !== 'completed' && (
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
                            )}
                            {selectedStatus === 'completed' && (
                              <>
                                <td>
                                  <Badge bg="info">{audit.auditJobType}</Badge>
                                </td>
                                <td>
                                  <Badge bg="success">{audit.processType}</Badge>
                                </td>
                              </>
                            )}
                            <td>
                              {selectedStatus !== 'completed' ? (
                                <i className="fas fa-chevron-right text-primary"></i>
                              ) : (
                                <Badge bg="success">
                                  <i className="fas fa-check-circle me-1"></i>
                                  Complete
                                </Badge>
                              )}
                            </td>
                          </tr>
                          {/* Expandable Mismatch Details Row */}
                          {selectedStatus === 'completed' && expandedRows[audit.storeId] && audit.mismatchDetails && audit.mismatchDetails.length > 0 && (
                            <tr>
                              <td colSpan="14" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
                                <div className="mb-3 d-flex gap-3 align-items-center">
                                  <Form.Select
                                    value={mismatchFilters[audit.storeId] || 'all'}
                                    onChange={(e) => handleMismatchFilterChange(audit.storeId, e.target.value)}
                                    style={{ width: '200px' }}
                                  >
                                    <option value="all">All Mismatch Types</option>
                                    <option value="short">Short</option>
                                    <option value="excess">Excess</option>
                                    <option value="contra-short">Contra Short</option>
                                    <option value="contra-excess">Contra Excess</option>
                                  </Form.Select>

                                  <InputGroup style={{ width: '300px' }}>
                                    <InputGroup.Text>
                                      <i className="fas fa-search"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                      type="text"
                                      placeholder="Search Product ID, SKU, or Name..."
                                      value={mismatchSearchTerms[audit.storeId] || ''}
                                      onChange={(e) => handleMismatchSearchChange(audit.storeId, e.target.value)}
                                    />
                                  </InputGroup>
                                </div>

                                <Table bordered size="sm" className="mb-0">
                                  <thead className="table-secondary">
                                    <tr>
                                      <th>Product ID</th>
                                      <th>SKU</th>
                                      <th>Product Name</th>
                                      <th>Mismatch Type</th>
                                      <th>System Qty</th>
                                      <th>Physical Qty</th>
                                      <th>Difference</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {filterMismatchDetails(audit.mismatchDetails, audit.storeId).length > 0 ? (
                                      filterMismatchDetails(audit.mismatchDetails, audit.storeId).map((item, itemIdx) => (
                                        <tr key={itemIdx}>
                                          <td><code>{item.productId}</code></td>
                                          <td><code>{item.sku}</code></td>
                                          <td>{item.productName}</td>
                                          <td>
                                            <Badge
                                              bg={
                                                item.type === 'Short' ? 'danger' :
                                                  item.type === 'Excess' ? 'warning' :
                                                    item.type === 'Contra Short' ? 'dark' :
                                                      'secondary'
                                              }
                                            >
                                              {item.type}
                                            </Badge>
                                          </td>
                                          <td className="text-end">{item.systemQty}</td>
                                          <td className="text-end">{item.physicalQty}</td>
                                          <td className="text-end">
                                            <span style={{ color: item.difference < 0 ? '#dc3545' : '#28a745' }}>
                                              {item.difference > 0 ? '+' : ''}{item.difference}
                                            </span>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="7" className="text-center text-muted py-3">
                                          <i className="fas fa-search me-2"></i>
                                          No matching products found
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </Table>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="14" className="text-center py-5">
                          <i className="fas fa-inbox fa-3x text-muted mb-3 d-block"></i>
                          <p className="text-muted">No audits found for this status</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Store Detail Modal */}
      <StoreDetailModal
        show={showStoreModal}
        onHide={() => setShowStoreModal(false)}
        storeData={storeData}
        auditStatus={selectedStore?.status}
      />
    </Container>
  );
};

export default LiveAuditSchedule;
