import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Modal, Alert, ListGroup } from 'react-bootstrap';
import './StorePIDAllotment.css';

const StorePIDAllotment = () => {
  // Mock data - replace with actual API calls
  const supervisorStores = [
    { storeId: 'MP001', storeName: 'Chennai Central', state: 'Tamil Nadu', totalPIDs: 1250 },
    { storeId: 'MP003', storeName: 'Hyderabad Main', state: 'Telangana', totalPIDs: 1420 },
    { storeId: 'MP005', storeName: 'Pune West', state: 'Maharashtra', totalPIDs: 890 }
  ];

  const availableAuditors = [
    { id: 'AUD001', name: 'Amit Singh', activeAssignments: 3, completionRate: 95.2 },
    { id: 'AUD002', name: 'Priya Reddy', activeAssignments: 2, completionRate: 96.8 },
    { id: 'AUD003', name: 'Suresh Kumar', activeAssignments: 4, completionRate: 91.5 },
    { id: 'AUD004', name: 'Deepak Sharma', activeAssignments: 3, completionRate: 94.8 },
    { id: 'AUD005', name: 'Anitha Rao', activeAssignments: 2, completionRate: 93.5 }
  ];

  const mockPIDs = [
    { pid: 'PID001', productName: 'Paracetamol 500mg', category: 'Tablets', status: 'Available' },
    { pid: 'PID002', productName: 'Ibuprofen 400mg', category: 'Tablets', status: 'Available' },
    { pid: 'PID003', productName: 'Cough Syrup 100ml', category: 'Syrup', status: 'Available' },
    { pid: 'PID004', productName: 'Vitamin C Tablets', category: 'Supplements', status: 'Available' },
    { pid: 'PID005', productName: 'Aspirin 75mg', category: 'Tablets', status: 'Assigned' },
    { pid: 'PID006', productName: 'Calcium Supplements', category: 'Supplements', status: 'Available' },
    { pid: 'PID007', productName: 'Antiseptic Cream', category: 'Ointment', status: 'Available' },
    { pid: 'PID008', productName: 'Hand Sanitizer 500ml', category: 'Hygiene', status: 'Available' },
    { pid: 'PID009', productName: 'Bandages 10cm', category: 'Medical Supplies', status: 'Available' },
    { pid: 'PID010', productName: 'Cotton Swabs Pack', category: 'Medical Supplies', status: 'In Progress' }
  ];

  const existingAssignments = [
    {
      id: 1,
      storeId: 'MP001',
      storeName: 'Chennai Central',
      auditorId: 'AUD001',
      auditorName: 'Amit Singh',
      pids: ['PID005'],
      description: 'High priority items for immediate audit',
      assignedDate: '2024-12-15',
      status: 'In Progress'
    },
    {
      id: 2,
      storeId: 'MP003',
      storeName: 'Hyderabad Main',
      auditorId: 'AUD002',
      auditorName: 'Priya Reddy',
      pids: ['PID010'],
      description: 'Weekly audit cycle - medical supplies',
      assignedDate: '2024-12-14',
      status: 'In Progress'
    }
  ];

  const [selectedStore, setSelectedStore] = useState('');
  const [selectedPIDs, setSelectedPIDs] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedAuditor, setSelectedAuditor] = useState('');
  const [searchPID, setSearchPID] = useState('');
  const [assignments, setAssignments] = useState(existingAssignments);
  const [showModal, setShowModal] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [newAuditor, setNewAuditor] = useState('');
  const [alertMessage, setAlertMessage] = useState({ show: false, type: '', message: '' });

  // Filter PIDs based on search
  const filteredPIDs = useMemo(() => {
    if (!searchPID) return mockPIDs;
    return mockPIDs.filter(pid =>
      pid.pid.toLowerCase().includes(searchPID.toLowerCase()) ||
      pid.productName.toLowerCase().includes(searchPID.toLowerCase()) ||
      pid.category.toLowerCase().includes(searchPID.toLowerCase())
    );
  }, [searchPID]);

  const handlePIDSelection = (pid) => {
    setSelectedPIDs(prev => {
      if (prev.includes(pid)) {
        return prev.filter(p => p !== pid);
      } else {
        return [...prev, pid];
      }
    });
  };

  const handleAssign = () => {
    if (!selectedStore) {
      showAlert('danger', 'Please select a store');
      return;
    }
    if (selectedPIDs.length === 0) {
      showAlert('danger', 'Please select at least one PID');
      return;
    }
    if (!description.trim()) {
      showAlert('danger', 'Please enter a description');
      return;
    }
    if (!selectedAuditor) {
      showAlert('danger', 'Please select an auditor');
      return;
    }

    const store = supervisorStores.find(s => s.storeId === selectedStore);
    const auditor = availableAuditors.find(a => a.id === selectedAuditor);

    const newAssignment = {
      id: assignments.length + 1,
      storeId: selectedStore,
      storeName: store.storeName,
      auditorId: selectedAuditor,
      auditorName: auditor.name,
      pids: [...selectedPIDs],
      description: description,
      assignedDate: new Date().toISOString().split('T')[0],
      status: 'Not Started'
    };

    setAssignments([...assignments, newAssignment]);
    showAlert('success', `Successfully assigned ${selectedPIDs.length} PIDs to ${auditor.name}`);

    // Reset form
    setSelectedPIDs([]);
    setDescription('');
    setSelectedAuditor('');
    setShowModal(false);
  };

  const handleReassign = () => {
    if (!newAuditor) {
      showAlert('danger', 'Please select a new auditor');
      return;
    }

    const auditor = availableAuditors.find(a => a.id === newAuditor);
    
    setAssignments(prev =>
      prev.map(assignment =>
        assignment.id === selectedAssignment.id
          ? { ...assignment, auditorId: newAuditor, auditorName: auditor.name, status: 'Not Started' }
          : assignment
      )
    );

    showAlert('success', `Successfully reassigned PIDs to ${auditor.name}`);
    setShowReassignModal(false);
    setNewAuditor('');
    setSelectedAssignment(null);
  };

  const openReassignModal = (assignment) => {
    if (assignment.status === 'In Progress') {
      showAlert('warning', 'Cannot reassign - PID picking has already started');
      return;
    }
    setSelectedAssignment(assignment);
    setShowReassignModal(true);
  };

  const showAlert = (type, message) => {
    setAlertMessage({ show: true, type, message });
    setTimeout(() => {
      setAlertMessage({ show: false, type: '', message: '' });
    }, 4000);
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Not Started': 'secondary',
      'In Progress': 'primary',
      'Completed': 'success'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <Container fluid className="store-pid-allotment py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="mb-2">
            <i className="fas fa-tasks me-2 text-primary"></i>
            Store PID Allotment
          </h2>
          <p className="text-muted">Assign PIDs to auditors for store audits</p>
        </Col>
      </Row>

      {alertMessage.show && (
        <Alert variant={alertMessage.type} dismissible onClose={() => setAlertMessage({ show: false, type: '', message: '' })}>
          {alertMessage.message}
        </Alert>
      )}

      {/* Assignment Form */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-plus-circle me-2"></i>
                Create New Assignment
              </h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Select Store <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      value={selectedStore}
                      onChange={(e) => setSelectedStore(e.target.value)}
                    >
                      <option value="">Choose store...</option>
                      {supervisorStores.map(store => (
                        <option key={store.storeId} value={store.storeId}>
                          {store.storeName} - {store.state} ({store.totalPIDs} PIDs)
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Selected PIDs <span className="text-danger">*</span></Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="text"
                        value={`${selectedPIDs.length} PIDs selected`}
                        readOnly
                      />
                      <Button
                        variant="outline-primary"
                        className="ms-2"
                        onClick={() => setShowModal(true)}
                        disabled={!selectedStore}
                      >
                        <i className="fas fa-search me-1"></i>
                        Select PIDs
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter assignment description (e.g., High priority items, Weekly audit cycle, etc.)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Assign to Auditor <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      value={selectedAuditor}
                      onChange={(e) => setSelectedAuditor(e.target.value)}
                    >
                      <option value="">Choose auditor...</option>
                      {availableAuditors.map(auditor => (
                        <option key={auditor.id} value={auditor.id}>
                          {auditor.name} - Active: {auditor.activeAssignments} | Rate: {auditor.completionRate}%
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6} className="d-flex align-items-end">
                  <Button
                    variant="success"
                    className="w-100"
                    onClick={handleAssign}
                  >
                    <i className="fas fa-check-circle me-2"></i>
                    Assign PIDs
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Existing Assignments */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-white border-0">
              <h5 className="mb-0">
                <i className="fas fa-list me-2 text-primary"></i>
                Current Assignments ({assignments.length})
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <Table striped hover responsive className="mb-0">
                  <thead style={{ position: 'sticky', top: 0, background: 'white', zIndex: 1 }}>
                    <tr>
                      <th>Store</th>
                      <th>Auditor</th>
                      <th>PIDs Count</th>
                      <th>Description</th>
                      <th>Assigned Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.length > 0 ? (
                      assignments.map((assignment) => (
                        <tr key={assignment.id}>
                          <td>
                            <strong>{assignment.storeName}</strong>
                            <br />
                            <small className="text-muted">{assignment.storeId}</small>
                          </td>
                          <td>
                            <i className="fas fa-user-circle me-1 text-primary"></i>
                            {assignment.auditorName}
                          </td>
                          <td>
                            <Badge bg="info">{assignment.pids.length} PIDs</Badge>
                          </td>
                          <td>
                            <small>{assignment.description}</small>
                          </td>
                          <td>{assignment.assignedDate}</td>
                          <td>{getStatusBadge(assignment.status)}</td>
                          <td>
                            <Button
                              size="sm"
                              variant="outline-warning"
                              onClick={() => openReassignModal(assignment)}
                              disabled={assignment.status === 'In Progress'}
                            >
                              <i className="fas fa-exchange-alt me-1"></i>
                              Reassign
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-muted">
                          <i className="fas fa-inbox fa-3x mb-3 d-block"></i>
                          No assignments yet. Create your first assignment above.
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

      {/* PID Selection Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-list-check me-2"></i>
            Select PIDs for Assignment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search by PID, product name, or category..."
              value={searchPID}
              onChange={(e) => setSearchPID(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Badge bg="primary">{selectedPIDs.length} PIDs selected</Badge>
          </div>
          <ListGroup style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {filteredPIDs.map((pid) => (
              <ListGroup.Item
                key={pid.pid}
                className={`d-flex justify-content-between align-items-center ${
                  pid.status !== 'Available' ? 'disabled' : ''
                }`}
                style={{ cursor: pid.status === 'Available' ? 'pointer' : 'not-allowed' }}
                onClick={() => pid.status === 'Available' && handlePIDSelection(pid.pid)}
              >
                <div>
                  <Form.Check
                    type="checkbox"
                    inline
                    checked={selectedPIDs.includes(pid.pid)}
                    onChange={() => {}}
                    disabled={pid.status !== 'Available'}
                  />
                  <strong>{pid.pid}</strong> - {pid.productName}
                  <br />
                  <small className="text-muted">{pid.category}</small>
                </div>
                <Badge bg={pid.status === 'Available' ? 'success' : pid.status === 'Assigned' ? 'warning' : 'primary'}>
                  {pid.status}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            <i className="fas fa-check me-1"></i>
            Confirm Selection ({selectedPIDs.length})
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reassign Modal */}
      <Modal show={showReassignModal} onHide={() => setShowReassignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-exchange-alt me-2"></i>
            Reassign PIDs
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAssignment && (
            <>
              <Alert variant="info">
                <strong>Current Assignment:</strong>
                <br />
                Store: {selectedAssignment.storeName}
                <br />
                Auditor: {selectedAssignment.auditorName}
                <br />
                PIDs: {selectedAssignment.pids.length}
              </Alert>
              <Form.Group>
                <Form.Label>Select New Auditor <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  value={newAuditor}
                  onChange={(e) => setNewAuditor(e.target.value)}
                >
                  <option value="">Choose auditor...</option>
                  {availableAuditors
                    .filter(a => a.id !== selectedAssignment.auditorId)
                    .map(auditor => (
                      <option key={auditor.id} value={auditor.id}>
                        {auditor.name} - Active: {auditor.activeAssignments} | Rate: {auditor.completionRate}%
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
    </Container>
  );
};

export default StorePIDAllotment;
