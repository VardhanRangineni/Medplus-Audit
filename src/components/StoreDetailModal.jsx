import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Card, Table, Badge, ProgressBar } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './StoreDetailModal.css';

const StoreDetailModal = ({ show, onHide, storeData, auditStatus }) => {
  const [selectedDeviationType, setSelectedDeviationType] = useState(null);
  
  // Reset filter when modal closes or data changes
  useEffect(() => {
    if (!show) {
      setSelectedDeviationType(null);
    }
  }, [show, storeData]);
  
  console.log('StoreDetailModal render - show:', show, 'storeData:', storeData, 'auditStatus:', auditStatus);
  
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
  const FORM_COLORS = ['#6610f2', '#fd7e14', '#20c997', '#d63384'];

  // Product form breakdown for each deviation type
  const productFormData = {
    'Invoiced': [
      { form: 'Tablets', value: 35000, count: 198 },
      { form: 'Liquids', value: 28000, count: 145 },
      { form: 'Capsules', value: 12000, count: 68 },
      { form: 'Refrigerated', value: 8000, count: 37 }
    ],
    'Contra Short': [
      { form: 'Tablets', value: 25000, count: 142 },
      { form: 'Liquids', value: 18000, count: 98 },
      { form: 'Capsules', value: 10000, count: 54 },
      { form: 'Refrigerated', value: 6000, count: 29 }
    ],
    'Contra Excess': [
      { form: 'Tablets', value: 22000, count: 125 },
      { form: 'Liquids', value: 15000, count: 82 },
      { form: 'Capsules', value: 8000, count: 45 },
      { form: 'Refrigerated', value: 5000, count: 25 }
    ],
    'Excess Submitted': [
      { form: 'Tablets', value: 12000, count: 68 },
      { form: 'Liquids', value: 9000, count: 52 },
      { form: 'Capsules', value: 4000, count: 24 },
      { form: 'Refrigerated', value: 2000, count: 12 }
    ]
  };

  // Calculate contra summary
  const contraShort = contra.filter(c => c.type === 'Short').reduce((sum, c) => sum + (c.value || 0), 0);
  const contraExcess = contra.filter(c => c.type === 'Excess').reduce((sum, c) => sum + (c.value || 0), 0);

  // Filter contra items based on selected deviation type
  const getFilteredContraItems = () => {
    console.log('Filtering contra items:', { selectedDeviationType, totalContraItems: contra.length });
    
    if (!selectedDeviationType) return contra;
    
    // Map deviation type to contra type
    if (selectedDeviationType === 'Contra Short') {
      const filtered = contra.filter(c => c.type === 'Short');
      console.log('Filtered Contra Short:', filtered.length, 'items');
      return filtered;
    } else if (selectedDeviationType === 'Contra Excess') {
      const filtered = contra.filter(c => c.type === 'Excess');
      console.log('Filtered Contra Excess:', filtered.length, 'items');
      return filtered;
    }
    return contra;
  };

  const filteredContraItems = getFilteredContraItems();

  // Handle deviation row click
  const handleDeviationClick = (deviationType) => {
    console.log('Deviation clicked:', deviationType);
    setSelectedDeviationType(selectedDeviationType === deviationType ? null : deviationType);
  };

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
          <Col md={auditStatus === 'completed' ? 3 : 6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-muted small mb-1">Total SKUs</div>
                <h3 className="mb-0 text-primary">{inventorySummary.totalSKUs?.toLocaleString() || '0'}</h3>
                <small className="text-muted">Audited: {inventorySummary.auditedSKUs?.toLocaleString() || '0'}</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={auditStatus === 'completed' ? 3 : 6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-muted small mb-1">Inventory Value</div>
                <h3 className="mb-0 text-success">₹{(inventorySummary.totalValue / 1000 || 0).toFixed(0)}K</h3>
                <small className="text-muted">Total Value</small>
              </Card.Body>
            </Card>
          </Col>
          {auditStatus === 'completed' && (
            <>
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
            </>
          )}
        </Row>

        {/* Auditors Working on Store - Show for in-progress, pending, and completed */}
        {auditStatus !== 'created' && auditors && auditors.length > 0 && (
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
                    {(auditStatus === 'in-progress' || auditStatus === 'completed') && (
                      <>
                        <th>Assigned SKUs (count)</th>
                        <th>Completed SKUs (count)</th>
                        <th>Progress (%)</th>
                        <th>Match Rate (%)</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {auditors.map((auditor, idx) => (
                    <tr key={idx}>
                      <td className="fw-semibold">{auditor.name}</td>
                      {(auditStatus === 'in-progress' || auditStatus === 'completed') && (
                        <>
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
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        {/* Deviations and Contra Side by Side - Show only for completed */}
        {auditStatus === 'completed' && (
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
                          onClick={(data) => handleDeviationClick(data.name)}
                          style={{ cursor: 'pointer' }}
                        >
                          {deviationChartData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[index % COLORS.length]}
                              style={{ cursor: 'pointer' }}
                            />
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
                            <tr 
                              key={idx}
                              onClick={() => handleDeviationClick(dev.type)}
                              style={{ 
                                cursor: 'pointer',
                                backgroundColor: selectedDeviationType === dev.type ? 'rgba(13, 110, 253, 0.1)' : 'transparent'
                              }}
                              className="deviation-row"
                            >
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

          {/* Right Panel - Product Form Breakdown or Contra Section */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fw-bold">
                    {selectedDeviationType ? (
                      <>
                        <i className="fas fa-pills me-2 text-info"></i>
                        <Badge bg="primary" className="me-2">{selectedDeviationType}</Badge>
                        Product Form Breakdown
                      </>
                    ) : (
                      <>
                        <i className="fas fa-chart-pie me-2 text-info"></i>
                        Product Form Analysis
                      </>
                    )}
                  </h6>
                  {selectedDeviationType && (
                    <Button 
                      size="sm" 
                      variant="outline-secondary"
                      onClick={() => setSelectedDeviationType(null)}
                    >
                      Clear Filter
                    </Button>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                {selectedDeviationType && productFormData[selectedDeviationType] ? (
                  /* Product Form Breakdown for Selected Deviation */
                  <div>
                    <div className="text-muted small mb-3">
                      {(() => {
                        const selectedDev = deviations.find(d => d.type === selectedDeviationType);
                        return selectedDev ? `Total: ₹${selectedDev.value.toLocaleString()} | ${selectedDev.count} items` : '';
                      })()}
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={productFormData[selectedDeviationType]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          labelLine={false}
                          label={(entry) => `${entry.form}: ₹${(entry.value / 1000).toFixed(0)}K`}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {productFormData[selectedDeviationType].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={FORM_COLORS[index % FORM_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-3">
                      {productFormData[selectedDeviationType].map((form, idx) => (
                        <div key={idx} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                          <div className="d-flex align-items-center">
                            <div 
                              style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: FORM_COLORS[idx % FORM_COLORS.length],
                                borderRadius: '2px',
                                marginRight: '8px'
                              }}
                            />
                            <span className="fw-semibold">{form.form}</span>
                          </div>
                          <div className="text-end">
                            <div className="fw-bold text-success">₹{form.value.toLocaleString()}</div>
                            <div className="text-muted small">{form.count} items</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Show Overall Product Form Distribution by default */
                  <div>
                    <div className="mb-3">
                      <h6 className="text-primary mb-2">
                        Overall Product Form Distribution
                      </h6>
                      <div className="text-muted small">
                        Across all deviation types
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={[
                            { form: 'Tablets', value: 94000, count: 533 },
                            { form: 'Liquids', value: 70000, count: 377 },
                            { form: 'Capsules', value: 34000, count: 191 },
                            { form: 'Refrigerated', value: 21000, count: 103 }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          labelLine={false}
                          label={(entry) => `${entry.form}: ₹${(entry.value / 1000).toFixed(0)}K`}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            { form: 'Tablets', value: 94000, count: 533 },
                            { form: 'Liquids', value: 70000, count: 377 },
                            { form: 'Capsules', value: 34000, count: 191 },
                            { form: 'Refrigerated', value: 21000, count: 103 }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={FORM_COLORS[index % FORM_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-3">
                      {[
                        { form: 'Tablets', value: 94000, count: 533 },
                        { form: 'Liquids', value: 70000, count: 377 },
                        { form: 'Capsules', value: 34000, count: 191 },
                        { form: 'Refrigerated', value: 21000, count: 103 }
                      ].map((form, idx) => (
                        <div key={idx} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                          <div className="d-flex align-items-center">
                            <div 
                              style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: FORM_COLORS[idx % FORM_COLORS.length],
                                borderRadius: '2px',
                                marginRight: '8px'
                              }}
                            />
                            <span className="fw-semibold">{form.form}</span>
                          </div>
                          <div className="text-end">
                            <div className="fw-bold text-success">₹{form.value.toLocaleString()}</div>
                            <div className="text-muted small">{form.count} items</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-3 text-muted small">
                      <i className="fas fa-info-circle me-1"></i>
                      Click on any deviation segment to see specific breakdown
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StoreDetailModal;
