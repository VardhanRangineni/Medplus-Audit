import { Modal, Button, Row, Col, Card, Table, Badge, ProgressBar } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './StoreDetailModal.css';

const StoreDetailModal = ({ show, onHide, storeData }) => {
  console.log('StoreDetailModal render - show:', show, 'storeData:', storeData);
  
  if (!storeData) {
    return (
      <Modal show={show} onHide={onHide} size="xl" className="store-detail-modal">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="fas fa-store me-2"></i>
            Store Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="text-center text-muted py-5">
            <i className="fas fa-info-circle fa-3x mb-3 d-block"></i>
            <p>No store data available</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const { 
    storeId, 
    storeName, 
    state,
    supervisor, 
    deviations = [], 
    contra = [],
    auditProgress = {},
    inventorySummary = {},
    auditors = []
  } = storeData;

  // Calculate total deviation value
  const totalDeviationValue = deviations.reduce((sum, dev) => sum + (dev.value || 0), 0);
  const totalContraValue = contra.reduce((sum, item) => sum + (item.value || 0), 0);

  // Prepare deviation chart data
  const deviationChartData = deviations.slice(0, 5).map((dev, idx) => ({
    name: dev.type || `Type ${idx + 1}`,
    value: dev.value || 0,
    count: dev.count || 0
  }));

  const COLORS = ['#dc3545', '#ffc107', '#0d6efd', '#198754', '#6f42c1'];

  // Calculate contra summary
  const contraShort = contra.filter(c => c.type === 'Short').reduce((sum, c) => sum + (c.value || 0), 0);
  const contraExcess = contra.filter(c => c.type === 'Excess').reduce((sum, c) => sum + (c.value || 0), 0);

  return (
    <Modal show={show} onHide={onHide} size="xl" className="store-detail-modal">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <i className="fas fa-store me-2"></i>
          {storeName} - Store Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {/* Store Info Header */}
        <Card className="mb-3 border-0 shadow-sm">
          <Card.Body>
            <Row>
              <Col md={3}>
                <div className="text-muted small">Store ID</div>
                <div className="fw-bold fs-5">
                  <Badge bg="dark" className="font-monospace">{storeId}</Badge>
                </div>
              </Col>
              <Col md={3}>
                <div className="text-muted small">State</div>
                <div className="fw-bold fs-5">{state}</div>
              </Col>
              <Col md={3}>
                <div className="text-muted small">Supervisor</div>
                <div className="fw-bold fs-5">
                  <i className="fas fa-user-tie me-2 text-primary"></i>
                  {supervisor || 'N/A'}
                </div>
              </Col>
              <Col md={3}>
                <div className="text-muted small">Audit Progress</div>
                <div className="fw-bold fs-5">{auditProgress.percentage || 0}%</div>
                <ProgressBar 
                  now={auditProgress.percentage || 0} 
                  variant={auditProgress.percentage >= 80 ? 'success' : auditProgress.percentage >= 60 ? 'warning' : 'danger'}
                  style={{ height: '8px' }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Mini Dashboard - KPIs */}
        <Row className="g-3 mb-4">
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-muted small mb-1">Total SKUs</div>
                <h3 className="mb-0 text-primary">{inventorySummary.totalSKUs?.toLocaleString() || '0'}</h3>
                <small className="text-muted">Audited: {inventorySummary.auditedSKUs?.toLocaleString() || '0'}</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-muted small mb-1">Inventory Value</div>
                <h3 className="mb-0 text-success">₹{(inventorySummary.totalValue / 1000 || 0).toFixed(0)}K</h3>
                <small className="text-muted">Total Value</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-muted small mb-1">Total Deviations</div>
                <h3 className="mb-0 text-danger">{deviations.length}</h3>
                <small className="text-muted">₹{(totalDeviationValue / 1000).toFixed(0)}K</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-muted small mb-1">Contra Items</div>
                <h3 className="mb-0 text-warning">{contra.length}</h3>
                <small className="text-muted">₹{(totalContraValue / 1000).toFixed(0)}K</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Auditors Working on Store */}
        {auditors && auditors.length > 0 && (
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-light">
              <h6 className="mb-0 fw-bold">
                <i className="fas fa-users me-2 text-primary"></i>
                Assigned Auditors
              </h6>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover className="mb-0" size="sm">
                <thead>
                  <tr>
                    <th>Auditor Name</th>
                    <th>Assigned SKUs (count)</th>
                    <th>Completed SKUs (count)</th>
                    <th>Progress (%)</th>
                    <th>Match Rate (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {auditors.map((auditor, idx) => (
                    <tr key={idx}>
                      <td className="fw-semibold">{auditor.name}</td>
                      <td>{auditor.assignedSKUs?.toLocaleString()}</td>
                      <td>{auditor.completedSKUs?.toLocaleString()}</td>
                      <td style={{ minWidth: '150px' }}>
                        <ProgressBar 
                          now={auditor.completionRate || 0} 
                          label={`${(auditor.completionRate || 0).toFixed(1)}%`}
                          variant={auditor.completionRate >= 80 ? 'success' : 'warning'}
                          style={{ height: '20px' }}
                        />
                      </td>
                      <td>
                        <Badge bg={auditor.matchRate >= 95 ? 'success' : auditor.matchRate >= 90 ? 'warning' : 'danger'}>
                          {auditor.matchRate?.toFixed(1)}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        {/* Deviations and Contra Side by Side */}
        <Row className="g-3">
          {/* Deviations Section */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-light">
                <h6 className="mb-0 fw-bold">
                  <i className="fas fa-exclamation-triangle me-2 text-danger"></i>
                  Deviations Breakdown
                </h6>
              </Card.Header>
              <Card.Body>
                {deviations.length > 0 ? (
                  <>
                    {/* Deviation Chart */}
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={deviationChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.count}`}
                          outerRadius={70}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {deviationChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>

                    {/* Deviation Table */}
                    <div className="mt-3" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                      <Table hover size="sm" className="mb-0">
                        <thead className="bg-light sticky-top">
                          <tr>
                            <th>Type</th>
                            <th className="text-end">Count (items)</th>
                            <th className="text-end">Value (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {deviations.map((dev, idx) => (
                            <tr key={idx}>
                              <td className="small">{dev.type}</td>
                              <td className="text-end">
                                <Badge bg="secondary" pill>{dev.count}</Badge>
                              </td>
                              <td className="text-end fw-semibold text-danger">
                                ₹{(dev.value || 0).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-muted py-4">
                    <i className="fas fa-check-circle fa-3x mb-2 d-block text-success"></i>
                    <p className="mb-0">No deviations found</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Contra Section */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-light">
                <h6 className="mb-0 fw-bold">
                  <i className="fas fa-balance-scale me-2 text-warning"></i>
                  Contra Summary
                </h6>
              </Card.Header>
              <Card.Body>
                {contra.length > 0 ? (
                  <>
                    {/* Contra Summary Cards */}
                    <Row className="g-2 mb-3">
                      <Col xs={6}>
                        <Card className="bg-danger bg-opacity-10 border-0">
                          <Card.Body className="p-2 text-center">
                            <div className="text-muted small">Contra Short</div>
                            <div className="fw-bold text-danger">₹{(contraShort / 1000).toFixed(0)}K</div>
                            <small className="text-muted">
                              {contra.filter(c => c.type === 'Short').length} items
                            </small>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xs={6}>
                        <Card className="bg-success bg-opacity-10 border-0">
                          <Card.Body className="p-2 text-center">
                            <div className="text-muted small">Contra Excess</div>
                            <div className="fw-bold text-success">₹{(contraExcess / 1000).toFixed(0)}K</div>
                            <small className="text-muted">
                              {contra.filter(c => c.type === 'Excess').length} items
                            </small>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    {/* Contra Table */}
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      <Table hover size="sm" className="mb-0">
                        <thead className="bg-light sticky-top">
                          <tr>
                            <th>SKU Code</th>
                            <th>Product</th>
                            <th>Type</th>
                            <th className="text-end">Qty (units)</th>
                            <th className="text-end">Value (₹)</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contra.map((item, idx) => (
                            <tr key={idx}>
                              <td className="small font-monospace">{item.skuCode}</td>
                              <td className="small">{item.productName}</td>
                              <td>
                                <Badge bg={item.type === 'Short' ? 'danger' : 'success'} pill>
                                  {item.type}
                                </Badge>
                              </td>
                              <td className="text-end">{item.quantity}</td>
                              <td className="text-end fw-semibold">
                                ₹{(item.value || 0).toLocaleString()}
                              </td>
                              <td>
                                <Badge bg={item.status === 'Approved' ? 'success' : 'warning'}>
                                  {item.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-muted py-4">
                    <i className="fas fa-check-circle fa-3x mb-2 d-block text-success"></i>
                    <p className="mb-0">No contra items found</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StoreDetailModal;
