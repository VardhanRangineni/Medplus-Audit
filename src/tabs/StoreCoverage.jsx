import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import KPICard from '../components/KPICard';
import './StoreCoverage.css';

const StoreCoverage = ({ filters = {} }) => {
  const navigate = useNavigate();
  
  // Check if any filters are active
  const hasActiveFilters = filters.state || filters.store || filters.auditJobType || filters.auditProcessType || filters.auditStatus;

  // Mock Data
  const storeStats = {
    totalActive: 450,
    covered: 385,
    uncovered: 65,
    coveredPercentage: 85.6,
    uncoveredPercentage: 14.4
  };

  const recencyData = [
    { range: 'Oct - Dec', stores: 180, percentage: 46.8 },
    { range: 'Jul - Sep', stores: 125, percentage: 32.5 },
    { range: 'Apr - Jun', stores: 55, percentage: 14.3 },
    { range: 'Jan - Mar', stores: 25, percentage: 6.5 }
  ];

  const inventoryData = {
    totalSKUs: 12450,
    totalQuantity: 245600,
    totalValue: 3456789.50
  };

  const deviationData = [
    { type: 'Private - Invoiced', value: 45000, count: 245 },
    { type: 'Private - Contra Short', value: 32000, count: 178 },
    { type: 'Private - Contra Excess', value: 28000, count: 156 },
    { type: 'Private - Excess Submitted', value: 15000, count: 89 },
    { type: 'Non-Private - Invoiced', value: 38000, count: 203 },
    { type: 'Non-Private - Contra Short', value: 27000, count: 145 },
    { type: 'Non-Private - Contra Excess', value: 22000, count: 121 },
    { type: 'Non-Private - Excess Submitted', value: 12000, count: 67 }
  ];

  const COLORS = ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6610f2', '#fd7e14', '#20c997', '#d63384'];

  // Drill-down handlers
  const showStoreDetails = (type) => {
    const typeMap = {
      'Total Active Stores': 'total-active-stores',
      'Covered Stores': 'covered-stores',
      'Uncovered Stores': 'uncovered-stores',
      'Stores - Oct - Dec': 'stores-recency-oct-dec',
      'Stores - Jul - Sep': 'stores-recency-jul-sep',
      'Stores - Apr - Jun': 'stores-recency-apr-jun',
      'Stores - Jan - Mar': 'stores-recency-jan-mar'
    };
    navigate(`/details?title=${encodeURIComponent(type)}&type=${typeMap[type]}`);
  };

  const showDeviationDetails = (deviationType) => {
    navigate(`/details?title=${encodeURIComponent(deviationType + ' - SKU Details')}&type=deviation-${deviationType.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <Container fluid className="store-coverage-tab py-4">
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
      {/* KPI Summary Cards */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <KPICard
            title="Total Active Stores"
            value={storeStats.totalActive}
            icon="fas fa-store"
            color="primary"
            onClick={() => showStoreDetails('Total Active Stores')}
          />
        </Col>
        <Col md={4}>
          <KPICard
            title="Covered Stores"
            value={storeStats.covered}
            subtitle={`${storeStats.coveredPercentage}% of total`}
            icon="fas fa-check-circle"
            color="success"
            onClick={() => showStoreDetails('Covered Stores')}
          />
        </Col>
        <Col md={4}>
          <KPICard
            title="Uncovered Stores"
            value={storeStats.uncovered}
            subtitle={`${storeStats.uncoveredPercentage}% of total`}
            icon="fas fa-exclamation-triangle"
            color="danger"
            onClick={() => showStoreDetails('Uncovered Stores')}
          />
        </Col>
      </Row>

      {/* Store Recency Analysis */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-calendar-alt me-2 text-primary"></i>
                Store Recency Analysis
              </h5>
              <small className="text-muted">Breakdown of covered stores by days since last audit</small>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="stores" 
                    fill="#0d6efd" 
                    onClick={(data) => showStoreDetails(`Stores - ${data.range}`)}
                    cursor="pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Inventory Summary */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <KPICard
            title="Total SKUs"
            value={inventoryData.totalSKUs.toLocaleString()}
            subtitle="Across all covered stores"
            icon="fas fa-box"
            color="info"
          />
        </Col>
        <Col md={4}>
          <KPICard
            title="Total Quantity"
            value={inventoryData.totalQuantity.toLocaleString()}
            subtitle="Units in inventory"
            icon="fas fa-cubes"
            color="warning"
          />
        </Col>
        <Col md={4}>
          <KPICard
            title="Total Inventory Value"
            value={`₹${(inventoryData.totalValue / 100000).toFixed(2)}L`}
            subtitle="Aggregate value"
            icon="fas fa-rupee-sign"
            color="success"
          />
        </Col>
      </Row>

      {/* Deviation Breakdown */}
      <Row>
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-chart-pie me-2 text-primary"></i>
                Deviation Distribution
              </h5>
              <small className="text-muted">Click on segments for details</small>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={deviationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.type.split(' - ')[1]}: ₹${(entry.value / 1000).toFixed(0)}K`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={(data) => showDeviationDetails(data.type)}
                    cursor="pointer"
                  >
                    {deviationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-list me-2 text-primary"></i>
                Deviation Summary
              </h5>
              <small className="text-muted">Private vs Non-Private breakdown</small>
            </Card.Header>
            <Card.Body>
              <div className="deviation-list">
                {deviationData.map((deviation, idx) => (
                  <div 
                    key={idx} 
                    className="deviation-item p-3 mb-2 rounded cursor-pointer"
                    onClick={() => showDeviationDetails(deviation.type)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold">{deviation.type}</div>
                        <small className="text-muted">{deviation.count} items</small>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold text-primary">₹{deviation.value.toLocaleString()}</div>
                        <small className="text-muted">
                          <i className="fas fa-arrow-right"></i>
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StoreCoverage;
