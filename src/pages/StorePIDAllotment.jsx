import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Modal, Alert } from 'react-bootstrap';
import './StorePIDAllotment.css';

const StorePIDAllotment = () => {
  // Supervisor's assigned store (only one)
  const supervisorStore = {
    storeId: 'MP001',
    storeName: 'Chennai Central',
    state: 'Tamil Nadu',
    totalPIDs: 15
  };

  const availableAuditors = [
    { id: 'AUD001', name: 'Amit Singh', totalAssignedSKUs: 1245, completedCount: 843 },
    { id: 'AUD002', name: 'Priya Reddy', totalAssignedSKUs: 956, completedCount: 723 },
    { id: 'AUD003', name: 'Suresh Kumar', totalAssignedSKUs: 1534, completedCount: 1102 },
    { id: 'AUD004', name: 'Deepak Sharma', totalAssignedSKUs: 1089, completedCount: 892 },
    { id: 'AUD005', name: 'Anitha Rao', totalAssignedSKUs: 734, completedCount: 589 }
  ];

  // Initial PID data with descriptions and statuses
  const initialPIDs = [
    { pid: 'PID001', description: 'A1-56', skuCount: 245, assignStatus: 'Assigned', auditStatus: 'In Progress', auditorId: 'AUD001', auditorName: 'Amit Singh' },
    { pid: 'PID002', description: 'B6-7', skuCount: 189, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
    { pid: 'PID003', description: 'C2-89', skuCount: 312, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
    { pid: 'PID004', description: 'A3-45', skuCount: 156, assignStatus: 'Assigned', auditStatus: 'Not Started', auditorId: 'AUD002', auditorName: 'Priya Reddy' },
    { pid: 'PID005', description: 'D1-23', skuCount: 278, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
    { pid: 'PID006', description: 'B8-90', skuCount: 201, assignStatus: 'Assigned', auditStatus: 'Not Started', auditorId: 'AUD003', auditorName: 'Suresh Kumar' },
    { pid: 'PID007', description: 'E5-67', skuCount: 167, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
    { pid: 'PID008', description: 'A2-34', skuCount: 234, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
    { pid: 'PID009', description: 'C7-12', skuCount: 198, assignStatus: 'Assigned', auditStatus: 'Completed', auditorId: 'AUD001', auditorName: 'Amit Singh' },
    { pid: 'PID010', description: 'F3-78', skuCount: 289, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
    { pid: 'PID011', description: 'B4-56', skuCount: 176, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
    { pid: 'PID012', description: 'D8-91', skuCount: 223, assignStatus: 'Assigned', auditStatus: 'Not Started', auditorId: 'AUD002', auditorName: 'Priya Reddy' },
    { pid: 'PID013', description: 'A5-23', skuCount: 145, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
    { pid: 'PID014', description: 'E2-45', skuCount: 267, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
    { pid: 'PID015', description: 'C9-67', skuCount: 192, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null }
  ];

  const [pids, setPids] = useState(initialPIDs);
  const [selectedPIDs, setSelectedPIDs] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showBulkReassignModal, setShowBulkReassignModal] = useState(false);
  const [selectedAuditor, setSelectedAuditor] = useState('');
  const [reassignPID, setReassignPID] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'notAssigned', 'reassign'
  const [alertMessage, setAlertMessage] = useState({ show: false, type: '', message: '' });
  const [sortField, setSortField] = useState(''); // '', 'assignStatus', 'auditStatus'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'

  // Filter PIDs based on search and active filter
  const filteredPIDs = useMemo(() => {
    let filtered = pids;

    // Apply filter buttons
    if (activeFilter === 'notAssigned') {
      filtered = filtered.filter(pid => pid.assignStatus === 'Not Assigned');
    } else if (activeFilter === 'reassign') {
      filtered = filtered.filter(pid => pid.assignStatus === 'Assigned' && pid.auditStatus === 'Not Started');
    }

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(pid =>
        pid.pid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pid.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pid.auditorName && pid.auditorName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let compareValue = 0;
        if (sortField === 'assignStatus') {
          compareValue = a.assignStatus.localeCompare(b.assignStatus);
        } else if (sortField === 'auditStatus') {
          compareValue = a.auditStatus.localeCompare(b.auditStatus);
        }
        return sortOrder === 'asc' ? compareValue : -compareValue;
      });
    }

    return filtered;
  }, [searchTerm, pids, activeFilter, sortField, sortOrder]);

  // Statistics
  const stats = useMemo(() => {
    const total = pids.length;
    const assigned = pids.filter(p => p.assignStatus === 'Assigned').length;
    const notAssigned = pids.filter(p => p.assignStatus === 'Not Assigned').length;
    const inProgress = pids.filter(p => p.auditStatus === 'In Progress').length;
    const completed = pids.filter(p => p.auditStatus === 'Completed').length;
    
    return { total, assigned, notAssigned, inProgress, completed };
  }, [pids]);

  // Calculate total SKU count for selected PIDs
  const selectedSKUCount = useMemo(() => {
    return pids
      .filter(pid => selectedPIDs.includes(pid.pid))
      .reduce((total, pid) => total + pid.skuCount, 0);
  }, [selectedPIDs, pids]);

  const handleSelectPID = (pidId) => {
    setSelectedPIDs(prev => {
      if (prev.includes(pidId)) {
        return prev.filter(id => id !== pidId);
      } else {
        return [...prev, pidId];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      let selectablePIDs;
      if (activeFilter === 'notAssigned') {
        selectablePIDs = filteredPIDs.map(p => p.pid);
      } else if (activeFilter === 'reassign') {
        selectablePIDs = filteredPIDs.map(p => p.pid);
      } else {
        selectablePIDs = filteredPIDs
          .filter(p => p.assignStatus === 'Not Assigned' || (p.assignStatus === 'Assigned' && p.auditStatus === 'Not Started'))
          .map(p => p.pid);
      }
      setSelectedPIDs(selectablePIDs);
    } else {
      setSelectedPIDs([]);
    }
  };

  const openAssignModal = () => {
    if (selectedPIDs.length === 0) {
      showAlert('warning', 'Please select at least one PID to assign');
      return;
    }
    setShowAssignModal(true);
  };

  const openBulkReassignModal = () => {
    if (selectedPIDs.length === 0) {
      showAlert('warning', 'Please select at least one PID to reassign');
      return;
    }
    setShowBulkReassignModal(true);
  };

  const handleAssign = () => {
    if (!selectedAuditor) {
      showAlert('danger', 'Please select an auditor');
      return;
    }

    const auditor = availableAuditors.find(a => a.id === selectedAuditor);
    
    setPids(prev =>
      prev.map(pid =>
        selectedPIDs.includes(pid.pid)
          ? { 
              ...pid, 
              assignStatus: 'Assigned', 
              auditStatus: 'Not Started',
              auditorId: selectedAuditor, 
              auditorName: auditor.name 
            }
          : pid
      )
    );

    showAlert('success', `Successfully assigned ${selectedPIDs.length} PID(s) to ${auditor.name}`);
    setSelectedPIDs([]);
    setSelectedAuditor('');
    setShowAssignModal(false);
  };

  const openReassignModal = (pid) => {
    if (pid.auditStatus === 'In Progress' || pid.auditStatus === 'Completed') {
      showAlert('warning', `Cannot reassign - PID picking has already ${pid.auditStatus === 'Completed' ? 'completed' : 'started'}`);
      return;
    }
    setReassignPID(pid);
    setShowReassignModal(true);
  };

  const handleReassign = () => {
    if (!selectedAuditor) {
      showAlert('danger', 'Please select an auditor');
      return;
    }

    const auditor = availableAuditors.find(a => a.id === selectedAuditor);
    
    setPids(prev =>
      prev.map(pid =>
        pid.pid === reassignPID.pid
          ? { 
              ...pid, 
              auditorId: selectedAuditor, 
              auditorName: auditor.name,
              auditStatus: 'Not Started'
            }
          : pid
      )
    );

    showAlert('success', `Successfully reassigned ${reassignPID.pid} to ${auditor.name}`);
    setReassignPID(null);
    setSelectedAuditor('');
    setShowReassignModal(false);
  };

  const handleBulkReassign = () => {
    if (!selectedAuditor) {
      showAlert('danger', 'Please select an auditor');
      return;
    }

    const auditor = availableAuditors.find(a => a.id === selectedAuditor);
    
    setPids(prev =>
      prev.map(pid =>
        selectedPIDs.includes(pid.pid)
          ? { 
              ...pid, 
              auditorId: selectedAuditor, 
              auditorName: auditor.name,
              auditStatus: 'Not Started'
            }
          : pid
      )
    );

    showAlert('success', `Successfully reassigned ${selectedPIDs.length} PID(s) to ${auditor.name}`);
    setSelectedPIDs([]);
    setSelectedAuditor('');
    setShowBulkReassignModal(false);
  };

  const showAlert = (type, message) => {
    setAlertMessage({ show: true, type, message });
    setTimeout(() => {
      setAlertMessage({ show: false, type: '', message: '' });
    }, 4000);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle sort order if same field
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getAssignStatusBadge = (status) => {
    return status === 'Assigned' ? (
      <Badge bg="success">Assigned</Badge>
    ) : (
      <Badge bg="secondary">Not Assigned</Badge>
    );
  };

  const getAuditStatusBadge = (status) => {
    const variants = {
      'Not Started': 'secondary',
      'In Progress': 'primary',
      'Completed': 'success',
      'Pending': 'warning'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <Container fluid className="store-pid-allotment py-4">
      {/* Store Header */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-primary">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="mb-1 text-primary">
                    <i className="fas fa-store me-2"></i>
                    {supervisorStore.storeName}
                  </h3>
                  <p className="text-muted mb-0">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {supervisorStore.state} | Store ID: {supervisorStore.storeId}
                  </p>
                </div>
                <div className="d-flex gap-3">
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-primary">{stats.total}</div>
                    <small className="text-muted">Total PIDs</small>
                  </div>
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-success">{stats.assigned}</div>
                    <small className="text-muted">Assigned</small>
                  </div>
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-secondary">{stats.notAssigned}</div>
                    <small className="text-muted">Unassigned</small>
                  </div>
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-info">{stats.inProgress}</div>
                    <small className="text-muted">In Progress</small>
                  </div>
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-success">{stats.completed}</div>
                    <small className="text-muted">Completed</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {alertMessage.show && (
        <Alert variant={alertMessage.type} dismissible onClose={() => setAlertMessage({ show: false, type: '', message: '' })}>
          {alertMessage.message}
        </Alert>
      )}

      {/* PID Table */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <Row className="mb-3">
                <Col>
                  <h5 className="mb-0">
                    <i className="fas fa-list-check me-2 text-primary"></i>
                    PID Management
                  </h5>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={3}>
                  <Form.Control
                    type="text"
                    placeholder="Search by PID, description, or auditor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="sm"
                  />
                </Col>
                <Col md={5}>
                  <div className="d-flex gap-2">
                    <Button
                      variant={activeFilter === 'all' ? 'primary' : 'outline-primary'}
                      size="sm"
                      onClick={() => { setActiveFilter('all'); setSelectedPIDs([]) }}
                    >
                      <i className="fas fa-list me-1"></i>
                      All PIDs
                    </Button>
                    <Button
                      variant={activeFilter === 'notAssigned' ? 'primary' : 'outline-primary'}
                      size="sm"
                      onClick={() => { setActiveFilter('notAssigned'); setSelectedPIDs([]) }}
                    >
                      <i className="fas fa-user-plus me-1"></i>
                      Not Assigned
                    </Button>
                    <Button
                      variant={activeFilter === 'reassign' ? 'primary' : 'outline-primary'}
                      size="sm"
                      onClick={() => { setActiveFilter('reassign'); setSelectedPIDs([]) }}
                    >
                      <i className="fas fa-exchange-alt me-1"></i>
                      Reassign
                    </Button>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex gap-2 justify-content-end">
                    {(activeFilter === 'all' || activeFilter === 'notAssigned') && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={openAssignModal}
                        disabled={selectedPIDs.length === 0}
                      >
                        <i className="fas fa-user-plus me-1"></i>
                        Assign ({selectedPIDs.length})
                      </Button>
                    )}
                    {(activeFilter === 'all' || activeFilter === 'reassign') && (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={openBulkReassignModal}
                        disabled={selectedPIDs.length === 0}
                      >
                        <i className="fas fa-exchange-alt me-1"></i>
                        Bulk Reassign ({selectedPIDs.length})
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
              {selectedPIDs.length > 0 && (
                <Row className="mt-3">
                  <Col>
                    <div className="selected-pids-summary">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <i className="fas fa-check-circle text-success me-2"></i>
                          <strong>{selectedPIDs.length}</strong> PID{selectedPIDs.length !== 1 ? 's' : ''} Selected
                        </div>
                        <div className="total-sku-count">
                          <i className="fas fa-boxes me-2"></i>
                          Total SKUs: <strong className="text-primary">{selectedSKUCount.toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
            </Card.Header>
            <Card.Body className="p-0">
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <Table striped hover responsive className="mb-0">
                  <thead style={{ position: 'sticky', top: 0, background: 'white', zIndex: 1 }}>
                    <tr>
                      <th style={{ width: '50px' }}>
                        <Form.Check
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectedPIDs.length > 0 && (
                            activeFilter === 'notAssigned' ? selectedPIDs.length === filteredPIDs.length :
                            activeFilter === 'reassign' ? selectedPIDs.length === filteredPIDs.length :
                            selectedPIDs.length === filteredPIDs.filter(p => p.assignStatus === 'Not Assigned' || (p.assignStatus === 'Assigned' && p.auditStatus === 'Not Started')).length
                          )}
                        />
                      </th>
                      <th>PID Number</th>
                      <th>SKU Count</th>
                      <th>Description</th>
                      <th 
                        onClick={() => handleSort('assignStatus')} 
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                        className="sortable-header"
                      >
                        Assign Status 
                        {sortField === 'assignStatus' && (
                          <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                        )}
                      </th>
                      <th 
                        onClick={() => handleSort('auditStatus')} 
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                        className="sortable-header"
                      >
                        Audit Status 
                        {sortField === 'auditStatus' && (
                          <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                        )}
                      </th>
                      <th>Auditor Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPIDs.length > 0 ? (
                      filteredPIDs.map((pid) => (
                        <tr key={pid.pid}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={selectedPIDs.includes(pid.pid)}
                              onChange={() => handleSelectPID(pid.pid)}
                              disabled={
                                activeFilter === 'notAssigned' ? false :
                                activeFilter === 'reassign' ? false :
                                !(pid.assignStatus === 'Not Assigned' || (pid.assignStatus === 'Assigned' && pid.auditStatus === 'Not Started'))
                              }
                            />
                          </td>
                          <td>
                            <strong className="text-primary">{pid.pid}</strong>
                          </td>
                          <td>
                            <Badge bg="info" className="fw-normal">{pid.skuCount}</Badge>
                          </td>
                          <td>{pid.description}</td>
                          <td>{getAssignStatusBadge(pid.assignStatus)}</td>
                          <td>{getAuditStatusBadge(pid.auditStatus)}</td>
                          <td>
                            {pid.auditorName ? (
                              <span>
                                <i className="fas fa-user-circle me-1 text-primary"></i>
                                {pid.auditorName}
                              </span>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                          <td>
                            {pid.assignStatus === 'Assigned' && pid.auditStatus === 'Not Started' && (
                              <Button
                                size="sm"
                                variant="outline-warning"
                                onClick={() => openReassignModal(pid)}
                              >
                                <i className="fas fa-exchange-alt me-1"></i>
                                Reassign
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4 text-muted">
                          <i className="fas fa-search fa-3x mb-3 d-block"></i>
                          No PIDs found matching your search
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

      {/* Assign Modal */}
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-user-plus me-2"></i>
            Assign PIDs to Auditor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info">
            <strong>Selected PIDs:</strong> {selectedPIDs.length}
            <br />
            <small className="text-muted">{selectedPIDs.join(', ')}</small>
          </Alert>
          <Form.Group>
            <Form.Label>Select Auditor <span className="text-danger">*</span></Form.Label>
            <Form.Select
              value={selectedAuditor}
              onChange={(e) => setSelectedAuditor(e.target.value)}
            >
              <option value="">Choose auditor...</option>
              {availableAuditors.map(auditor => (
                <option key={auditor.id} value={auditor.id}>
                  {auditor.name} - Assigned SKUs: {auditor.totalAssignedSKUs.toLocaleString()} | Completed: {auditor.completedCount.toLocaleString()}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAssign}>
            <i className="fas fa-check me-1"></i>
            Assign PIDs
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reassign Modal */}
      <Modal show={showReassignModal} onHide={() => setShowReassignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-exchange-alt me-2"></i>
            Reassign PID
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reassignPID && (
            <>
              <Alert variant="info">
                <strong>PID:</strong> {reassignPID.pid}
                <br />
                <strong>Description:</strong> {reassignPID.description}
                <br />
                <strong>Current Auditor:</strong> {reassignPID.auditorName}
              </Alert>
              <Form.Group>
                <Form.Label>Select New Auditor <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  value={selectedAuditor}
                  onChange={(e) => setSelectedAuditor(e.target.value)}
                >
                  <option value="">Choose auditor...</option>
                  {availableAuditors
                    .filter(a => a.id !== reassignPID.auditorId)
                    .map(auditor => (
                      <option key={auditor.id} value={auditor.id}>
                        {auditor.name} - Total Assigned SKUs: {auditor.totalAssignedSKUs.toLocaleString()} | Completed: {auditor.completedCount.toLocaleString()}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReassignModal(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleReassign}>
            <i className="fas fa-exchange-alt me-1"></i>
            Confirm Reassignment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Bulk Reassign Modal */}
      <Modal show={showBulkReassignModal} onHide={() => setShowBulkReassignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-exchange-alt me-2"></i>
            Bulk Reassign PIDs
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <strong>Selected PIDs:</strong> {selectedPIDs.length}
            <br />
            <small className="text-muted">{selectedPIDs.join(', ')}</small>
          </Alert>
          <Form.Group>
            <Form.Label>Select New Auditor <span className="text-danger">*</span></Form.Label>
            <Form.Select
              value={selectedAuditor}
              onChange={(e) => setSelectedAuditor(e.target.value)}
            >
              <option value="">Choose auditor...</option>
              {availableAuditors.map(auditor => (
                <option key={auditor.id} value={auditor.id}>
                  {auditor.name} - Total Assigned SKUs: {auditor.totalAssignedSKUs.toLocaleString()} | Completed: {auditor.completedCount.toLocaleString()}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBulkReassignModal(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleBulkReassign}>
            <i className="fas fa-exchange-alt me-1"></i>
            Confirm Bulk Reassignment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StorePIDAllotment;
