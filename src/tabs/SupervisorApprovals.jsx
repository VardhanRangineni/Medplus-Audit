import { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar, Alert } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import KPICard from '../components/KPICard';
import DrillDownModal from '../components/DrillDownModal';
import './SupervisorApprovals.css';

const SupervisorApprovals = ({ filters = {} }) => {
  const [modalConfig, setModalConfig] = useState({ show: false, title: '', data: [], columns: [] });
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [selectedSupervisorData, setSelectedSupervisorData] = useState(null);
  const [selectedAuditor, setSelectedAuditor] = useState(null);
  const [selectedAuditorStores, setSelectedAuditorStores] = useState(null);
  
  // Check if any filters are active
  const hasActiveFilters = filters.state || filters.store || filters.auditJobType || filters.auditProcessType || filters.auditStatus;

  // Supervisor Summary Data
  const supervisorData = [
    {
      supervisorId: 'SUP001',
      supervisorName: 'Rajesh Kumar',
      storesManaged: 12,
      auditCompletion: 87.5,
      pendingApprovals: 23,
      totalPIDs: 2400,
      unallocatedPIDs: 145
    },
    {
      supervisorId: 'SUP002',
      supervisorName: 'Lakshmi Iyer',
      storesManaged: 10,
      auditCompletion: 92.3,
      pendingApprovals: 15,
      totalPIDs: 2100,
      unallocatedPIDs: 98
    },
    {
      supervisorId: 'SUP003',
      supervisorName: 'Mohammed Ali',
      storesManaged: 15,
      auditCompletion: 78.9,
      pendingApprovals: 42,
      totalPIDs: 3200,
      unallocatedPIDs: 287
    },
    {
      supervisorId: 'SUP004',
      supervisorName: 'Pradeep Singh',
      storesManaged: 8,
      auditCompletion: 94.1,
      pendingApprovals: 11,
      totalPIDs: 1800,
      unallocatedPIDs: 76
    }
  ];

  // Re-audit Waterfall Data
  const reauditData = [
    { stage: 'Initially Appeared', count: 1250, color: '#dc3545' },
    { stage: 'Matched (Verified)', count: 875, color: '#198754' },
    { stage: 'Edited (Modified)', count: 245, color: '#ffc107' },
    { stage: 'Pending (Awaiting)', count: 130, color: '#0d6efd' }
  ];

  // Contra Approval Data
  const contraData = [
    {
      storeId: 'MP001',
      storeName: 'Chennai Central',
      contraType: 'Short',
      itemCount: 45,
      quantity: 1250,
      value: 125000,
      priority: 'High'
    },
    {
      storeId: 'MP002',
      storeName: 'Bangalore Hub',
      contraType: 'Excess',
      itemCount: 32,
      quantity: 890,
      value: 78500,
      priority: 'High'
    },
    {
      storeId: 'MP003',
      storeName: 'Hyderabad Main',
      contraType: 'Short',
      itemCount: 28,
      quantity: 650,
      value: 45000,
      priority: 'Medium'
    },
    {
      storeId: 'MP004',
      storeName: 'Pune West',
      contraType: 'Excess',
      itemCount: 18,
      quantity: 420,
      value: 32000,
      priority: 'Medium'
    },
    {
      storeId: 'MP005',
      storeName: 'Mumbai Central',
      contraType: 'Short',
      itemCount: 52,
      quantity: 1480,
      value: 156000,
      priority: 'High'
    }
  ];

  const showSupervisorDetails = (supervisor) => {
    const supervisorStoresMap = {
      'Rajesh Kumar': {
        stores: [
          { storeId: 'MP001', storeName: 'Chennai Central', auditStatus: 'In Progress', completion: 85.5, lastUpdate: '2024-12-09', pendingApprovals: 8, totalPIDs: 2400 },
          { storeId: 'MP014', storeName: 'T. Nagar Branch', auditStatus: 'Completed', completion: 100, lastUpdate: '2024-12-08', pendingApprovals: 0, totalPIDs: 1850 },
          { storeId: 'MP021', storeName: 'Anna Nagar Hub', auditStatus: 'Pending', completion: 45.2, lastUpdate: '2024-12-07', pendingApprovals: 15, totalPIDs: 2200 }
        ],
        auditors: [
          { auditorId: 'AUD001', auditorName: 'Amit Singh', assignedSKUs: 2400, completedSKUs: 2150, completionRate: 89.6, matchRate: 95.2 },
          { auditorId: 'AUD003', auditorName: 'Suresh Kumar', assignedSKUs: 2200, completedSKUs: 1850, completionRate: 84.1, matchRate: 91.5 }
        ]
      },
      'Lakshmi Iyer': {
        stores: [
          { storeId: 'MP002', storeName: 'Bangalore Hub', auditStatus: 'In Progress', completion: 92.3, lastUpdate: '2024-12-10', pendingApprovals: 5, totalPIDs: 2100 },
          { storeId: 'MP016', storeName: 'Koramangala Store', auditStatus: 'Completed', completion: 100, lastUpdate: '2024-12-06', pendingApprovals: 0, totalPIDs: 1650 },
          { storeId: 'MP023', storeName: 'Indiranagar Branch', auditStatus: 'In Progress', completion: 78.5, lastUpdate: '2024-12-08', pendingApprovals: 10, totalPIDs: 1980 }
        ],
        auditors: [
          { auditorId: 'AUD002', auditorName: 'Priya Reddy', assignedSKUs: 2800, completedSKUs: 2650, completionRate: 94.6, matchRate: 96.8 },
          { auditorId: 'AUD004', auditorName: 'Deepak Sharma', assignedSKUs: 2600, completedSKUs: 2450, completionRate: 94.2, matchRate: 94.8 }
        ]
      },
      'Mohammed Ali': {
        stores: [
          { storeId: 'MP003', storeName: 'Hyderabad Main', auditStatus: 'In Progress', completion: 78.9, lastUpdate: '2024-12-09', pendingApprovals: 12, totalPIDs: 3200 },
          { storeId: 'MP017', storeName: 'Madhapur Hub', auditStatus: 'Pending', completion: 35.8, lastUpdate: '2024-12-05', pendingApprovals: 18, totalPIDs: 2850 },
          { storeId: 'MP025', storeName: 'Secunderabad Store', auditStatus: 'In Progress', completion: 65.4, lastUpdate: '2024-12-07', pendingApprovals: 12, totalPIDs: 2450 }
        ],
        auditors: [
          { auditorId: 'AUD005', auditorName: 'Anitha Rao', assignedSKUs: 2350, completedSKUs: 2200, completionRate: 93.6, matchRate: 93.2 },
          { auditorId: 'AUD006', auditorName: 'Ravi Verma', assignedSKUs: 2100, completedSKUs: 1750, completionRate: 83.3, matchRate: 89.7 }
        ]
      },
      'Pradeep Singh': {
        stores: [
          { storeId: 'MP004', storeName: 'Pune West', auditStatus: 'Completed', completion: 100, lastUpdate: '2024-12-08', pendingApprovals: 0, totalPIDs: 1800 },
          { storeId: 'MP019', storeName: 'Shivaji Nagar Branch', auditStatus: 'In Progress', completion: 88.2, lastUpdate: '2024-12-09', pendingApprovals: 6, totalPIDs: 1650 },
          { storeId: 'MP026', storeName: 'Kothrud Store', auditStatus: 'In Progress', completion: 94.5, lastUpdate: '2024-12-10', pendingApprovals: 5, totalPIDs: 1550 }
        ],
        auditors: [
          { auditorId: 'AUD007', auditorName: 'Karthik Kumar', assignedSKUs: 2150, completedSKUs: 2000, completionRate: 93.0, matchRate: 92.8 },
          { auditorId: 'AUD008', auditorName: 'Meena Iyer', assignedSKUs: 1950, completedSKUs: 1850, completionRate: 94.9, matchRate: 95.5 }
        ]
      }
    };

    const data = supervisorStoresMap[supervisor.supervisorName] || { stores: [], auditors: [] };
    setSelectedSupervisor(supervisor);
    setSelectedSupervisorData(data);
  };

  const handleAuditorClick = (auditor) => {
    // Map auditors to their stores
    const auditorStoresMap = {
      'Amit Singh': [
        { storeId: 'MP001', storeName: 'Chennai Central', state: 'Tamil Nadu', assignedSKUs: 1200, completedSKUs: 1150, completionRate: 95.8, matchRate: 95.2, startDate: '2024-12-01', endDate: '2024-12-08' },
        { storeId: 'MP014', storeName: 'T. Nagar Branch', state: 'Tamil Nadu', assignedSKUs: 1200, completedSKUs: 1000, completionRate: 83.3, matchRate: 95.2, startDate: '2024-11-25', endDate: '2024-12-02' }
      ],
      'Suresh Kumar': [
        { storeId: 'MP021', storeName: 'Anna Nagar Hub', state: 'Tamil Nadu', assignedSKUs: 2200, completedSKUs: 1850, completionRate: 84.1, matchRate: 91.5, startDate: '2024-12-03', endDate: '2024-12-10' }
      ],
      'Priya Reddy': [
        { storeId: 'MP002', storeName: 'Bangalore Hub', state: 'Karnataka', assignedSKUs: 1500, completedSKUs: 1450, completionRate: 96.7, matchRate: 96.8, startDate: '2024-12-01', endDate: '2024-12-09' },
        { storeId: 'MP016', storeName: 'Koramangala Store', state: 'Karnataka', assignedSKUs: 1300, completedSKUs: 1200, completionRate: 92.3, matchRate: 96.8, startDate: '2024-11-28', endDate: '2024-12-05' }
      ],
      'Deepak Sharma': [
        { storeId: 'MP023', storeName: 'Indiranagar Branch', state: 'Karnataka', assignedSKUs: 2600, completedSKUs: 2450, completionRate: 94.2, matchRate: 94.8, startDate: '2024-12-02', endDate: '2024-12-09' }
      ],
      'Anitha Rao': [
        { storeId: 'MP003', storeName: 'Hyderabad Main', state: 'Telangana', assignedSKUs: 1350, completedSKUs: 1300, completionRate: 96.3, matchRate: 93.2, startDate: '2024-12-01', endDate: '2024-12-08' },
        { storeId: 'MP025', storeName: 'Secunderabad Store', state: 'Telangana', assignedSKUs: 1000, completedSKUs: 900, completionRate: 90.0, matchRate: 93.2, startDate: '2024-12-04', endDate: '2024-12-11' }
      ],
      'Ravi Verma': [
        { storeId: 'MP017', storeName: 'Madhapur Hub', state: 'Telangana', assignedSKUs: 2100, completedSKUs: 1750, completionRate: 83.3, matchRate: 89.7, startDate: '2024-11-29', endDate: '2024-12-06' }
      ],
      'Karthik Kumar': [
        { storeId: 'MP004', storeName: 'Pune West', state: 'Maharashtra', assignedSKUs: 1200, completedSKUs: 1150, completionRate: 95.8, matchRate: 92.8, startDate: '2024-11-27', endDate: '2024-12-04' },
        { storeId: 'MP019', storeName: 'Shivaji Nagar Branch', state: 'Maharashtra', assignedSKUs: 950, completedSKUs: 850, completionRate: 89.5, matchRate: 92.8, startDate: '2024-12-02', endDate: '2024-12-09' }
      ],
      'Meena Iyer': [
        { storeId: 'MP026', storeName: 'Kothrud Store', state: 'Maharashtra', assignedSKUs: 1950, completedSKUs: 1850, completionRate: 94.9, matchRate: 95.5, startDate: '2024-12-01', endDate: '2024-12-08' }
      ]
    };

    const stores = auditorStoresMap[auditor.auditorName] || [];
    setSelectedAuditor(auditor);
    setSelectedAuditorStores(stores);
  };

  const showContraDetails = (contra) => {
    const contraSKUMap = {
      'Chennai Central-Short': [
        { skuCode: 'PVT12345', productName: 'Medplus Paracetamol 500mg', quantity: -145, value: -12800, batch: 'B2401', reason: 'Damaged', approvalStatus: 'Pending' },
        { skuCode: 'PVT12346', productName: 'Medplus Vitamin C Tabs', quantity: -98, value: -8500, batch: 'B2402', reason: 'Expired', approvalStatus: 'Pending' },
        { skuCode: 'NPV22345', productName: 'Dolo 650mg Tablet', quantity: -125, value: -9800, batch: 'DL2401', reason: 'Theft', approvalStatus: 'Pending' }
      ],
      'Bangalore Hub-Excess': [
        { skuCode: 'PVT32345', productName: 'Medplus Multivitamin', quantity: 185, value: 16500, batch: 'B2408', reason: 'Billing Error', approvalStatus: 'Pending' },
        { skuCode: 'NPV32346', productName: 'Combiflam Tablet', quantity: 142, value: 11200, batch: 'CB2401', reason: 'Return Not Updated', approvalStatus: 'Pending' },
        { skuCode: 'PVT32347', productName: 'Medplus Baby Wipes', quantity: 98, value: 6800, batch: 'B2410', reason: 'Double Entry', approvalStatus: 'Pending' }
      ],
      'Hyderabad Main-Short': [
        { skuCode: 'NPV22347', productName: 'Cetrizine 10mg', quantity: -85, value: -5200, batch: 'CT2403', reason: 'Breakage', approvalStatus: 'Pending' },
        { skuCode: 'PVT22348', productName: 'Medplus Glucose-D', quantity: -72, value: -4800, batch: 'B2407', reason: 'Pilferage', approvalStatus: 'Pending' },
        { skuCode: 'NPV22349', productName: 'Disprin Tablet', quantity: -95, value: -6200, batch: 'DS2401', reason: 'Stock Adjustment', approvalStatus: 'Pending' }
      ],
      'Pune West-Excess': [
        { skuCode: 'NPV32348', productName: 'Moov Pain Relief', quantity: 128, value: -8500, batch: 'MV2402', reason: 'Transfer Pending', approvalStatus: 'Pending' },
        { skuCode: 'PVT32349', productName: 'Medplus Pain Relief Gel', quantity: 95, value: 7200, batch: 'B2409', reason: 'Invoice Mismatch', approvalStatus: 'Pending' },
        { skuCode: 'NPV32350', productName: 'Volini Gel', quantity: 68, value: 5400, batch: 'VL2401', reason: 'System Error', approvalStatus: 'Pending' }
      ],
      'Mumbai Central-Short': [
        { skuCode: 'PVT22350', productName: 'Medplus Sanitizer 500ml', quantity: -245, value: -22800, batch: 'B2405', reason: 'Damaged in Transit', approvalStatus: 'Pending' },
        { skuCode: 'NPV22351', productName: 'Vicks Vaporub', quantity: -185, value: -15200, batch: 'VK2402', reason: 'Quality Issue', approvalStatus: 'Pending' },
        { skuCode: 'PVT22352', productName: 'Medplus Face Mask Pack', quantity: -128, value: -9800, batch: 'B2406', reason: 'Recall', approvalStatus: 'Pending' }
      ]
    };

    const contraKey = `${contra.storeName}-${contra.contraType}`;
    const mockSKUData = contraSKUMap[contraKey] || [];

    setModalConfig({
      show: true,
      title: `${contra.storeName} - ${contra.contraType} Contra Details`,
      data: mockSKUData,
      columns: [
        { key: 'skuCode', label: 'SKU Code' },
        { key: 'productName', label: 'Product Name' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'value', label: 'Value', render: (val) => `₹${val.toLocaleString()}` },
        { key: 'batch', label: 'Batch' },
        { key: 'reason', label: 'Reason' },
        { key: 'approvalStatus', label: 'Status' }
      ]
    });
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      'High': 'danger',
      'Medium': 'warning',
      'Low': 'success'
    };
    return colors[priority] || 'secondary';
  };

  return (
    <Container fluid className="supervisor-approvals-tab py-4">
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
      {/* Supervisor Summary Cards or Details View */}
      {selectedAuditor ? (
        <>
          {/* Back Button to Supervisor Details */}
          <div className="mb-3">
            <Badge 
              bg="secondary" 
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setSelectedAuditor(null);
                setSelectedAuditorStores(null);
              }}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Back to {selectedSupervisor.supervisorName}
            </Badge>
          </div>

          {/* Auditor Details Header */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <Row>
                <Col md={3}>
                  <div className="text-muted small">Auditor ID</div>
                  <Badge bg="info" className="mt-1">{selectedAuditor.auditorId}</Badge>
                </Col>
                <Col md={3}>
                  <div className="text-muted small">Auditor Name</div>
                  <h5 className="mb-0 mt-1">{selectedAuditor.auditorName}</h5>
                </Col>
                <Col md={2}>
                  <div className="text-muted small">Assigned SKUs</div>
                  <h5 className="mb-0 mt-1">{selectedAuditor.assignedSKUs.toLocaleString()}</h5>
                </Col>
                <Col md={2}>
                  <div className="text-muted small">Completion Rate</div>
                  <h5 className="mb-0 mt-1 text-success">{selectedAuditor.completionRate}%</h5>
                </Col>
                <Col md={2}>
                  <div className="text-muted small">Match Rate</div>
                  <h5 className="mb-0 mt-1 text-primary">{selectedAuditor.matchRate}%</h5>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Stores Audited by Auditor */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-store-alt me-2 text-primary"></i>
                Stores Audited by {selectedAuditor.auditorName}
              </h5>
              <small className="text-muted">
                Total Stores: {selectedAuditorStores?.length || 0}
              </small>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Store ID</th>
                      <th>Store Name</th>
                      <th>State</th>
                      <th>Assigned SKUs</th>
                      <th>Completed SKUs</th>
                      <th>Completion Rate</th>
                      <th>Match Rate</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAuditorStores?.map((store, idx) => (
                      <tr key={idx}>
                        <td>
                          <Badge bg="light" text="dark" className="font-monospace">
                            {store.storeId}
                          </Badge>
                        </td>
                        <td className="fw-semibold">{store.storeName}</td>
                        <td>{store.state}</td>
                        <td>{store.assignedSKUs.toLocaleString()}</td>
                        <td>{store.completedSKUs.toLocaleString()}</td>
                        <td>
                          <ProgressBar 
                            now={store.completionRate} 
                            variant={store.completionRate >= 90 ? 'success' : store.completionRate >= 70 ? 'warning' : 'danger'}
                            label={`${store.completionRate}%`}
                            style={{ width: '120px', height: '20px' }}
                          />
                        </td>
                        <td>
                          <Badge bg={store.matchRate >= 95 ? 'success' : store.matchRate >= 90 ? 'warning' : 'danger'}>
                            {store.matchRate}%
                          </Badge>
                        </td>
                        <td>{store.startDate}</td>
                        <td>{store.endDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </>
      ) : !selectedSupervisor ? (
        <Row className="g-3 mb-4">
          {supervisorData.map((supervisor, idx) => (
            <Col md={6} lg={3} key={idx}>
              <Card
                className="border-0 shadow-sm h-100 supervisor-card"
                onClick={() => showSupervisorDetails(supervisor)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <Badge bg="primary" className="mb-2">{supervisor.supervisorId}</Badge>
                      <h6 className="mb-0 fw-bold">{supervisor.supervisorName}</h6>
                    </div>
                    <i className="fas fa-user-shield fa-2x text-primary opacity-25"></i>
                  </div>

                  <div className="mb-2">
                    <small className="text-muted">Stores Managed</small>
                    <h5 className="mb-0">{supervisor.storesManaged}</h5>
                  </div>

                  <div className="mb-2">
                    <small className="text-muted d-block mb-1">Audit Completion</small>
                    <ProgressBar
                      now={supervisor.auditCompletion}
                      variant={supervisor.auditCompletion >= 90 ? 'success' : 'warning'}
                      label={`${supervisor.auditCompletion}%`}
                      style={{ height: '20px' }}
                    />
                  </div>

                  <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                    <div>
                      <small className="text-muted d-block">Pending Approvals</small>
                      <Badge bg="warning">{supervisor.pendingApprovals}</Badge>
                    </div>
                    <div className="text-end">
                      <small className="text-muted d-block">Unallocated PIDs</small>
                      <Badge bg="danger">{supervisor.unallocatedPIDs}</Badge>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <>
          {/* Back Button */}
          <div className="mb-3">
            <Badge 
              bg="secondary" 
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setSelectedSupervisor(null);
                setSelectedSupervisorData(null);
                setSelectedAuditor(null);
                setSelectedAuditorStores(null);
              }}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Back to Supervisors
            </Badge>
          </div>

          {/* Supervisor Details Header */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <Row>
                <Col md={3}>
                  <div className="text-muted small">Supervisor ID</div>
                  <Badge bg="primary" className="mt-1">{selectedSupervisor.supervisorId}</Badge>
                </Col>
                <Col md={3}>
                  <div className="text-muted small">Supervisor Name</div>
                  <h5 className="mb-0 mt-1">{selectedSupervisor.supervisorName}</h5>
                </Col>
                <Col md={2}>
                  <div className="text-muted small">Stores Managed</div>
                  <h5 className="mb-0 mt-1">{selectedSupervisor.storesManaged}</h5>
                </Col>
                <Col md={2}>
                  <div className="text-muted small">Audit Completion</div>
                  <h5 className="mb-0 mt-1 text-success">{selectedSupervisor.auditCompletion}%</h5>
                </Col>
                <Col md={2}>
                  <div className="text-muted small">Pending Approvals</div>
                  <h5 className="mb-0 mt-1 text-warning">{selectedSupervisor.pendingApprovals}</h5>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Stores Managed Table */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-store me-2 text-primary"></i>
                Stores Managed
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Store ID</th>
                      <th>Store Name</th>
                      <th>Audit Status</th>
                      <th>Completion</th>
                      <th>Last Update</th>
                      <th>Pending Approvals</th>
                      <th>Total PIDs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSupervisorData?.stores.map((store, idx) => (
                      <tr key={idx}>
                        <td>
                          <Badge bg="light" text="dark" className="font-monospace">
                            {store.storeId}
                          </Badge>
                        </td>
                        <td className="fw-semibold">{store.storeName}</td>
                        <td>
                          <Badge bg={
                            store.auditStatus === 'Completed' ? 'success' :
                            store.auditStatus === 'In Progress' ? 'primary' :
                            'warning'
                          }>
                            {store.auditStatus}
                          </Badge>
                        </td>
                        <td>
                          <ProgressBar 
                            now={store.completion} 
                            variant={store.completion >= 90 ? 'success' : store.completion >= 70 ? 'warning' : 'danger'}
                            label={`${store.completion}%`}
                            style={{ width: '120px', height: '20px' }}
                          />
                        </td>
                        <td>{store.lastUpdate}</td>
                        <td>
                          <Badge bg={store.pendingApprovals > 0 ? 'warning' : 'success'}>
                            {store.pendingApprovals}
                          </Badge>
                        </td>
                        <td>{store.totalPIDs.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          {/* Auditors Under Supervisor */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-users me-2 text-primary"></i>
                Auditors Under {selectedSupervisor.supervisorName}
              </h5>
              <small className="text-muted">Click on any auditor to view their detailed performance</small>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Auditor ID</th>
                      <th>Auditor Name</th>
                      <th>Assigned SKUs</th>
                      <th>Completed SKUs</th>
                      <th>Completion Rate</th>
                      <th>Match Rate</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSupervisorData?.auditors.map((auditor, idx) => (
                      <tr 
                        key={idx}
                        onClick={() => handleAuditorClick(auditor)}
                        style={{ cursor: 'pointer' }}
                        className="auditor-row"
                      >
                        <td>
                          <Badge bg="light" text="dark" className="font-monospace">
                            {auditor.auditorId}
                          </Badge>
                        </td>
                        <td className="fw-semibold">{auditor.auditorName}</td>
                        <td>{auditor.assignedSKUs.toLocaleString()}</td>
                        <td>{auditor.completedSKUs.toLocaleString()}</td>
                        <td>
                          <ProgressBar 
                            now={auditor.completionRate} 
                            variant={auditor.completionRate >= 90 ? 'success' : 'warning'}
                            label={`${auditor.completionRate}%`}
                            style={{ width: '120px', height: '20px' }}
                          />
                        </td>
                        <td>
                          <Badge bg={auditor.matchRate >= 95 ? 'success' : auditor.matchRate >= 90 ? 'warning' : 'danger'}>
                            {auditor.matchRate}%
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
        </>
      )}

      {/* Re-audit Waterfall Visualization */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-water me-2 text-primary"></i>
                Re-audit Lifecycle
              </h5>
              <small className="text-muted">Deviation lifecycle from appearance to resolution</small>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reauditData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="stage" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#0d6efd">
                    {reauditData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* PID Allocation Overview */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-tasks me-2 text-primary"></i>
                PID Allocation Overview
              </h5>
              <small className="text-muted">Load distribution across supervisors</small>
            </Card.Header>
            <Card.Body>
              <div className="allocation-list">
                {supervisorData.map((supervisor, idx) => {
                  const allocatedPIDs = supervisor.totalPIDs - supervisor.unallocatedPIDs;
                  const allocationRate = (allocatedPIDs / supervisor.totalPIDs * 100).toFixed(1);

                  return (
                    <div key={idx} className="mb-3 p-3 bg-light rounded">
                      <div className="d-flex justify-content-between mb-2">
                        <strong>{supervisor.supervisorName}</strong>
                        <Badge bg="info">{allocationRate}% Allocated</Badge>
                      </div>
                      <div className="d-flex gap-3 text-muted small mb-2">
                        <span>Total: <strong>{supervisor.totalPIDs}</strong></span>
                        <span>Allocated: <strong className="text-success">{allocatedPIDs}</strong></span>
                        <span>Unallocated: <strong className="text-danger">{supervisor.unallocatedPIDs}</strong></span>
                      </div>
                      <ProgressBar>
                        <ProgressBar variant="success" now={(allocatedPIDs / supervisor.totalPIDs) * 100} key={1} />
                        <ProgressBar variant="danger" now={(supervisor.unallocatedPIDs / supervisor.totalPIDs) * 100} key={2} />
                      </ProgressBar>
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Contra Approval Dashboard */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-clipboard-check me-2 text-primary"></i>
                Contra Approval Dashboard
              </h5>
              <small className="text-muted">
                Contra Short & Contra Excess approvals - prioritize by value
              </small>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0 contra-table">
                  <thead className="bg-light">
                    <tr>
                      <th>Priority</th>
                      <th>Store ID</th>
                      <th>Store Name</th>
                      <th>Contra Type</th>
                      <th>Item Count</th>
                      <th>Quantity</th>
                      <th>Value (₹)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contraData
                      .sort((a, b) => b.value - a.value)
                      .map((contra, idx) => (
                        <tr
                          key={idx}
                          className="contra-row"
                          onClick={() => showContraDetails(contra)}
                        >
                          <td>
                            <Badge bg={getPriorityBadge(contra.priority)} pill>
                              {contra.priority}
                            </Badge>
                          </td>
                          <td>
                            <Badge bg="light" text="dark" className="font-monospace">
                              {contra.storeId}
                            </Badge>
                          </td>
                          <td className="fw-semibold">{contra.storeName}</td>
                          <td>
                            <Badge bg={contra.contraType === 'Short' ? 'danger' : 'warning'}>
                              {contra.contraType}
                            </Badge>
                          </td>
                          <td>{contra.itemCount}</td>
                          <td>{contra.quantity.toLocaleString()}</td>
                          <td>
                            <strong className="text-success">
                              ₹{contra.value.toLocaleString()}
                            </strong>
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

export default SupervisorApprovals;
