import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Button, Badge, Table } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import KPICard from '../components/KPICard';
import './StoreCoverage.css';

const StoreCoverage = ({ filters = {} }) => {
  const navigate = useNavigate();
  const [selectedDeviation, setSelectedDeviation] = useState(null);
  const [recencyView, setRecencyView] = useState('quarterly'); // quarterly, half-yearly, yearly
  
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

  // Store breakdown by type and box mapping
  const storeBreakdown = [
    { storeType: 'HUB', boxType: 'Box Mapping', total: 120, covered: 105, uncovered: 15 },
    { storeType: 'HUB', boxType: 'Non Box Mapping', total: 80, covered: 65, uncovered: 15 },
    { storeType: 'REGULAR', boxType: 'Box Mapping', total: 180, covered: 155, uncovered: 25 },
    { storeType: 'REGULAR', boxType: 'Non Box Mapping', total: 70, covered: 60, uncovered: 10 }
  ];

  // Recency data for different time views
  const recencyDataSets = {
    quarterly: [
      { range: 'Oct - Dec', stores: 180, percentage: 46.8 },
      { range: 'Jul - Sep', stores: 125, percentage: 32.5 },
      { range: 'Apr - Jun', stores: 55, percentage: 14.3 },
      { range: 'Jan - Mar', stores: 25, percentage: 6.5 }
    ],
    'half-yearly': [
      { range: 'Jul - Dec', stores: 305, percentage: 79.2 },
      { range: 'Jan - Jun', stores: 80, percentage: 20.8 }
    ],
    yearly: [
      { range: '2024', stores: 385, percentage: 100 }
    ]
  };

  const recencyData = recencyDataSets[recencyView];

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

  // Product form breakdown for each deviation type (10 Audit Forms)
  const productFormData = {
    'Invoiced': [
      { form: 'Tablets', value: 35000, count: 198 },
      { form: 'Liquids', value: 28000, count: 145 },
      { form: 'Injection', value: 22000, count: 88 },
      { form: 'Ointments', value: 15000, count: 72 },
      { form: 'Powders', value: 12000, count: 58 },
      { form: 'Drops', value: 9000, count: 45 },
      { form: 'Inhalers', value: 8000, count: 38 },
      { form: 'Containers', value: 18000, count: 95 },
      { form: 'General', value: 14000, count: 52 },
      { form: 'Surgicals', value: 11000, count: 48 }
    ],
    'Contra Short': [
      { form: 'Tablets', value: 25000, count: 142 },
      { form: 'Liquids', value: 18000, count: 98 },
      { form: 'Injection', value: 15000, count: 62 },
      { form: 'Ointments', value: 10000, count: 52 },
      { form: 'Powders', value: 8000, count: 42 },
      { form: 'Drops', value: 6000, count: 32 },
      { form: 'Inhalers', value: 5500, count: 28 },
      { form: 'Containers', value: 12000, count: 68 },
      { form: 'General', value: 9000, count: 38 },
      { form: 'Surgicals', value: 7500, count: 35 }
    ],
    'Contra Excess': [
      { form: 'Tablets', value: 22000, count: 125 },
      { form: 'Liquids', value: 15000, count: 82 },
      { form: 'Injection', value: 13000, count: 55 },
      { form: 'Ointments', value: 8500, count: 45 },
      { form: 'Powders', value: 7000, count: 38 },
      { form: 'Drops', value: 5200, count: 28 },
      { form: 'Inhalers', value: 4800, count: 24 },
      { form: 'Containers', value: 10000, count: 58 },
      { form: 'General', value: 7500, count: 32 },
      { form: 'Surgicals', value: 6500, count: 30 }
    ],
    'Excess Submitted': [
      { form: 'Tablets', value: 12000, count: 68 },
      { form: 'Liquids', value: 9000, count: 52 },
      { form: 'Injection', value: 7500, count: 32 },
      { form: 'Ointments', value: 5000, count: 28 },
      { form: 'Powders', value: 4200, count: 22 },
      { form: 'Drops', value: 3000, count: 18 },
      { form: 'Inhalers', value: 2800, count: 15 },
      { form: 'Containers', value: 6000, count: 35 },
      { form: 'General', value: 4500, count: 20 },
      { form: 'Surgicals', value: 3800, count: 18 }
    ]
  };

  const COLORS = ['#0d6efd', '#dc3545', '#ffc107', '#198754'];
  const FORM_COLORS = ['#8B5CF6', '#FF6B35', '#4ADE80', '#FF1493', '#3B82F6', '#FFD700', '#FF4500', '#00CED1', '#DA70D6', '#00BFFF'];

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

  // Export store coverage summary to Excel
  const exportStoreCoverageToExcel = () => {
    const summaryData = [
      { 'Metric': 'Total Active Stores', 'Value': storeStats.totalActive },
      { 'Metric': 'Covered Stores', 'Value': storeStats.covered, 'Percentage': `${storeStats.coveredPercentage}%` },
      { 'Metric': 'Uncovered Stores', 'Value': storeStats.uncovered, 'Percentage': `${storeStats.uncoveredPercentage}%` }
    ];

    const inventorySummary = [
      { 'Metric': 'Total SKUs', 'Value': inventoryData.totalSKUs },
      { 'Metric': 'Total Quantity', 'Value': inventoryData.totalQuantity },
      { 'Metric': 'Total Inventory Value (₹)', 'Value': inventoryData.totalValue }
    ];

    const deviationSummary = deviationData.map(item => ({
      'Deviation Type': item.type,
      'Value (₹)': item.value,
      'Item Count': item.count
    }));

    // Create workbook with multiple sheets
    const wb = window.XLSX.utils.book_new();
    
    // Store Coverage sheet
    const ws1 = window.XLSX.utils.json_to_sheet(summaryData);
    window.XLSX.utils.book_append_sheet(wb, ws1, 'Store Coverage');
    
    // Inventory Summary sheet
    const ws2 = window.XLSX.utils.json_to_sheet(inventorySummary);
    window.XLSX.utils.book_append_sheet(wb, ws2, 'Inventory Summary');
    
    // Deviation Summary sheet
    const ws3 = window.XLSX.utils.json_to_sheet(deviationSummary);
    window.XLSX.utils.book_append_sheet(wb, ws3, 'Deviation Summary');
    
    // Download file
    const fileName = `Store_Coverage_Summary_${new Date().toISOString().split('T')[0]}.xlsx`;
    window.XLSX.writeFile(wb, fileName);
  };

  // Export recency analysis to Excel
  const exportRecencyAnalysisToExcel = () => {
    const dataToExport = recencyData.map(item => ({
      'Time Range': item.range,
      'Number of Stores': item.stores,
      'Percentage (%)': item.percentage
    }));

    // Create worksheet
    const ws = window.XLSX.utils.json_to_sheet(dataToExport);
    
    // Create workbook
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, 'Recency Analysis');
    
    // Download file
    const fileName = `Store_Recency_Analysis_${recencyView}_${new Date().toISOString().split('T')[0]}.xlsx`;
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
        <Col xs={12} className="d-flex justify-content-end mb-2">
          <button
            className="btn btn-success btn-sm"
            onClick={exportStoreCoverageToExcel}
          >
            <i className="fas fa-file-excel me-1"></i>
            Export Summary
          </button>
        </Col>
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

      {/* Store Type & Box Mapping Breakdown */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-table me-2 text-primary"></i>
                Store Type & Box Mapping Breakdown
              </h5>
              <small className="text-muted">Distribution of stores by type and box mapping status</small>
            </Card.Header>
            <Card.Body>
              <Table striped hover responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Store Type</th>
                    <th>Box</th>
                    <th className="text-center">Total Stores</th>
                    <th className="text-center">Covered</th>
                    <th className="text-center">Uncovered</th>
                    <th className="text-center">Coverage %</th>
                  </tr>
                </thead>
                <tbody>
                  {storeBreakdown.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <Badge bg={row.storeType === 'HUB' ? 'primary' : 'info'} className="px-3 py-2">
                          {row.storeType}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={row.boxType === 'Box Mapping' ? 'success' : 'secondary'} className="px-3 py-2">
                          {row.boxType}
                        </Badge>
                      </td>
                      <td className="text-center fw-bold">{row.total}</td>
                      <td className="text-center">
                        <span className="text-success fw-semibold">{row.covered}</span>
                      </td>
                      <td className="text-center">
                        <span className="text-danger fw-semibold">{row.uncovered}</span>
                      </td>
                      <td className="text-center">
                        <Badge bg="light" text="dark" className="px-3 py-2">
                          {((row.covered / row.total) * 100).toFixed(1)}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light fw-bold">
                  <tr>
                    <td colSpan="2" className="text-end">TOTAL:</td>
                    <td className="text-center">{storeStats.totalActive}</td>
                    <td className="text-center text-success">{storeStats.covered}</td>
                    <td className="text-center text-danger">{storeStats.uncovered}</td>
                    <td className="text-center">
                      <Badge bg="primary" className="px-3 py-2">
                        {storeStats.coveredPercentage}%
                      </Badge>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Store Recency Analysis */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-calendar-alt me-2 text-primary"></i>
                    Store Recency Analysis
                  </h5>
                  <small className="text-muted">Breakdown of covered stores by days since last audit</small>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={exportRecencyAnalysisToExcel}
                  >
                    <i className="fas fa-file-excel me-1"></i>
                    Export
                  </button>
                  <div className="btn-group" role="group">
                    <Button
                      size="sm"
                      variant={recencyView === 'quarterly' ? 'primary' : 'outline-primary'}
                      onClick={() => setRecencyView('quarterly')}
                    >
                      <i className="fas fa-calendar-week me-1"></i>
                      Quarterly
                    </Button>
                    <Button
                      size="sm"
                      variant={recencyView === 'half-yearly' ? 'primary' : 'outline-primary'}
                      onClick={() => setRecencyView('half-yearly')}
                    >
                      <i className="fas fa-calendar-alt me-1"></i>
                      Half-Yearly
                    </Button>
                    <Button
                      size="sm"
                      variant={recencyView === 'yearly' ? 'primary' : 'outline-primary'}
                      onClick={() => setRecencyView('yearly')}
                    >
                      <i className="fas fa-calendar me-1"></i>
                      Yearly
                    </Button>
                  </div>
                </div>
              </div>
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
                        { form: 'Injection', value: 57500, count: 237 },
                        { form: 'Ointments', value: 38500, count: 197 },
                        { form: 'Powders', value: 31200, count: 160 },
                        { form: 'Drops', value: 23200, count: 123 },
                        { form: 'Inhalers', value: 21100, count: 105 },
                        { form: 'Containers', value: 46000, count: 256 },
                        { form: 'General', value: 35000, count: 142 },
                        { form: 'Surgicals', value: 28800, count: 131 }
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
                        { form: 'Injection', value: 57500, count: 237 },
                        { form: 'Ointments', value: 38500, count: 197 },
                        { form: 'Powders', value: 31200, count: 160 },
                        { form: 'Drops', value: 23200, count: 123 },
                        { form: 'Inhalers', value: 21100, count: 105 },
                        { form: 'Containers', value: 46000, count: 256 },
                        { form: 'General', value: 35000, count: 142 },
                        { form: 'Surgicals', value: 28800, count: 131 }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={FORM_COLORS[index % FORM_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {[
                    { form: 'Tablets', value: 94000, count: 533 },
                    { form: 'Liquids', value: 70000, count: 377 },
                    { form: 'Injection', value: 57500, count: 237 },
                    { form: 'Ointments', value: 38500, count: 197 },
                    { form: 'Powders', value: 31200, count: 160 },
                    { form: 'Drops', value: 23200, count: 123 },
                    { form: 'Inhalers', value: 21100, count: 105 },
                    { form: 'Containers', value: 46000, count: 256 },
                    { form: 'General', value: 35000, count: 142 },
                    { form: 'Surgicals', value: 28800, count: 131 }
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
