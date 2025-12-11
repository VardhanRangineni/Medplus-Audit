import { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import KPICard from '../components/KPICard';
import DrillDownModal from '../components/DrillDownModal';
import './SupervisorApprovals.css';

const SupervisorApprovals = () => {
  const [modalConfig, setModalConfig] = useState({ show: false, title: '', data: [], columns: [] });

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
      'Rajesh Kumar': [
        { storeId: 'MP001', storeName: 'Chennai Central', auditStatus: 'In Progress', completion: 85.5, lastUpdate: '2024-12-09', pendingApprovals: 8, totalPIDs: 2400 },
        { storeId: 'MP014', storeName: 'T. Nagar Branch', auditStatus: 'Completed', completion: 100, lastUpdate: '2024-12-08', pendingApprovals: 0, totalPIDs: 1850 },
        { storeId: 'MP021', storeName: 'Anna Nagar Hub', auditStatus: 'Pending', completion: 45.2, lastUpdate: '2024-12-07', pendingApprovals: 15, totalPIDs: 2200 }
      ],
      'Lakshmi Iyer': [
        { storeId: 'MP002', storeName: 'Bangalore Hub', auditStatus: 'In Progress', completion: 92.3, lastUpdate: '2024-12-10', pendingApprovals: 5, totalPIDs: 2100 },
        { storeId: 'MP016', storeName: 'Koramangala Store', auditStatus: 'Completed', completion: 100, lastUpdate: '2024-12-06', pendingApprovals: 0, totalPIDs: 1650 },
        { storeId: 'MP023', storeName: 'Indiranagar Branch', auditStatus: 'In Progress', completion: 78.5, lastUpdate: '2024-12-08', pendingApprovals: 10, totalPIDs: 1980 }
      ],
      'Mohammed Ali': [
        { storeId: 'MP003', storeName: 'Hyderabad Main', auditStatus: 'In Progress', completion: 78.9, lastUpdate: '2024-12-09', pendingApprovals: 12, totalPIDs: 3200 },
        { storeId: 'MP017', storeName: 'Madhapur Hub', auditStatus: 'Pending', completion: 35.8, lastUpdate: '2024-12-05', pendingApprovals: 18, totalPIDs: 2850 },
        { storeId: 'MP025', storeName: 'Secunderabad Store', auditStatus: 'In Progress', completion: 65.4, lastUpdate: '2024-12-07', pendingApprovals: 12, totalPIDs: 2450 }
      ],
      'Pradeep Singh': [
        { storeId: 'MP004', storeName: 'Pune West', auditStatus: 'Completed', completion: 100, lastUpdate: '2024-12-08', pendingApprovals: 0, totalPIDs: 1800 },
        { storeId: 'MP019', storeName: 'Shivaji Nagar Branch', auditStatus: 'In Progress', completion: 88.2, lastUpdate: '2024-12-09', pendingApprovals: 6, totalPIDs: 1650 },
        { storeId: 'MP026', storeName: 'Kothrud Store', auditStatus: 'In Progress', completion: 94.5, lastUpdate: '2024-12-10', pendingApprovals: 5, totalPIDs: 1550 }
      ]
    };

    const mockStoreData = supervisorStoresMap[supervisor.supervisorName] || [];

    setModalConfig({
      show: true,
      title: `${supervisor.supervisorName} - Managed Stores`,
      data: mockStoreData,
      columns: [
        { key: 'storeId', label: 'Store ID' },
        { key: 'storeName', label: 'Store Name' },
        { key: 'auditStatus', label: 'Audit Status' },
        { key: 'completion', label: 'Completion %', render: (val) => `${val}%` },
        { key: 'lastUpdate', label: 'Last Update' },
        { key: 'pendingApprovals', label: 'Pending Approvals' },
        { key: 'totalPIDs', label: 'Total PIDs' }
      ]
    });
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
      {/* Supervisor Summary Cards */}
      <Row className="g-3 mb-4">
        {supervisorData.map((supervisor, idx) => (
          <Col md={6} lg={3} key={idx}>
            <Card
              className="border-0 shadow-sm h-100 supervisor-card"
              onClick={() => showSupervisorDetails(supervisor)}
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
