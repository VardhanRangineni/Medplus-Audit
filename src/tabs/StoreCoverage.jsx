import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Button, Badge } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import KPICard from '../components/KPICard';
import './StoreCoverage.css';

const StoreCoverage = ({ filters = {} }) => {
  const navigate = useNavigate();
  const [selectedDeviation, setSelectedDeviation] = useState(null);
  
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
    { type: 'Invoiced', value: 83000, count: 448 },
    { type: 'Contra Short', value: 59000, count: 323 },
    { type: 'Contra Excess', value: 50000, count: 277 },
    { type: 'Excess Submitted', value: 27000, count: 156 }
  ];

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

  const COLORS = ['#0d6efd', '#dc3545', '#ffc107', '#198754'];
  const FORM_COLORS = ['#6610f2', '#fd7e14', '#20c997', '#d63384'];

  // Function to export product form data to Excel
  const exportProductFormToExcel = () => {
    let dataToExport = [];
    let fileName = 'Product_Form_Overall.xlsx';
    
    if (selectedDeviation) {
      // Export specific deviation data
      dataToExport = productFormData[selectedDeviation.type].map(item => ({
        'Deviation Type': selectedDeviation.type,
        'Product Form': item.form,
        'Value (₹)': item.value,
        'Item Count': item.count
      }));
      fileName = `Product_Form_${selectedDeviation.type.replace(/\s+/g, '_')}.xlsx`;
    } else {
      // Export overall data
      dataToExport = [
        { 'Product Form': 'Tablets', 'Value (₹)': 94000, 'Item Count': 533 },
        { 'Product Form': 'Liquids', 'Value (₹)': 70000, 'Item Count': 377 },
        { 'Product Form': 'Capsules', 'Value (₹)': 34000, 'Item Count': 191 },
        { 'Product Form': 'Refrigerated', 'Value (₹)': 21000, 'Item Count': 103 }
      ];
      fileName = 'Product_Form_Overall.xlsx';
    }

    // Create worksheet
    const ws = window.XLSX.utils.json_to_sheet(dataToExport);
    
    // Create workbook
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, 'Product Forms');
    
    // Download file
    window.XLSX.writeFile(wb, fileName);
  };

  // Drill-down handlers
  const showStoreDetails = (type) => {
    const typeMap = {
      'Total Stores': 'total-active-stores',
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
            title="Total Stores"
            value={storeStats.totalActive}
            icon="fas fa-store"
            color="primary"
            onClick={() => showStoreDetails('Total Stores')}
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
            value={inventoryData.totalQuantity >= 10000000 ? `${(inventoryData.totalQuantity / 10000000).toFixed(1)}Cr` : `${(inventoryData.totalQuantity / 100000).toFixed(1)}L`}
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
                    label={(entry) => `${entry.type}: ₹${(entry.value / 1000).toFixed(0)}K`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={(data) => setSelectedDeviation(data)}
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
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-info-circle me-2 text-primary"></i>
                    {selectedDeviation ? 'Deviation Details' : 'Deviation Summary'}
                  </h5>
                  <small className="text-muted">
                    {selectedDeviation ? `Details for ${selectedDeviation.type}` : 'Click on a pie segment for details'}
                  </small>
                </div>
                <div className="d-flex gap-2">
                  <Button 
                    size="sm" 
                    variant="success"
                    onClick={exportProductFormToExcel}
                  >
                    <i className="fas fa-file-excel me-1"></i>
                    Export Excel
                  </Button>
                  {selectedDeviation && (
                    <Button 
                      size="sm" 
                      variant="outline-secondary"
                      onClick={() => setSelectedDeviation(null)}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              {selectedDeviation ? (
                <div>
                  <div className="mb-3">
                    <h6 className="text-primary mb-2">
                      <Badge bg="primary" className="me-2">{selectedDeviation.type}</Badge>
                      Product Form Breakdown
                    </h6>
                    <div className="text-muted small">
                      Total: ₹{selectedDeviation.value.toLocaleString()} | {selectedDeviation.count} items
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={productFormData[selectedDeviation.type]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        labelLine={false}
                        label={(entry) => `${entry.form}: ₹${(entry.value / 1000).toFixed(0)}K`}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {productFormData[selectedDeviation.type].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={FORM_COLORS[index % FORM_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-3">
                    {productFormData[selectedDeviation.type].map((form, idx) => (
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
                  <ResponsiveContainer width="100%" height={280}>
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
    </Container>
  );
};

export default StoreCoverage;
