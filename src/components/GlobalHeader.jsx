import { useState } from 'react';
import { Container, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import './GlobalHeader.css';

const GlobalHeader = ({ onFilterChange, lastRefreshed, onRefresh }) => {
  const [filters, setFilters] = useState({
    financialYear: '2025-26',
    state: '',
    store: '',
    auditJobType: '',
    auditProcessType: '',
    auditStatus: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const formatTimestamp = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="global-header bg-white shadow-sm sticky-top">
      <Container fluid className="py-3">
        {/* Header Title */}
        <Row className="mb-3 align-items-center">
          <Col>
            <h3 className="mb-0 text-primary fw-bold">
              <i className="fas fa-chart-line me-2"></i>
              Audit HOD Dashboard
            </h3>
          </Col>
          <Col xs="auto" className="text-end">
            <div className="d-flex align-items-center gap-3">
              <div className="text-muted small">
                <i className="fas fa-sync-alt me-2"></i>
                Last Refreshed: <strong>{formatTimestamp(lastRefreshed)}</strong>
              </div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={onRefresh}
                className="d-flex align-items-center gap-2"
              >
                <i className="fas fa-refresh"></i>
                Refresh Now
              </Button>
            </div>
          </Col>
        </Row>

        {/* Filters Section */}
        <Row className="g-3 mb-2">
          <Col md={2}>
            <Form.Group>
              <Form.Label className="small fw-semibold mb-1">
                Financial year <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                size="sm"
                value={filters.financialYear}
                onChange={(e) => handleFilterChange('financialYear', e.target.value)}
                className="filter-select text-center fw-bold"
                style={{ cursor: 'pointer' }}
              >
                <option value="2025-26">2025–26</option>
                <option value="2024-25">2024–25</option>
                <option value="2023-24">2023–24</option>
                <option value="2022-23">2022–23</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label className="small fw-semibold mb-1">State</Form.Label>
              <Form.Select
                size="sm"
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                className="filter-select"
              >
                <option value="">All States</option>
                <option value="TN">Tamil Nadu</option>
                <option value="KA">Karnataka</option>
                <option value="AP">Andhra Pradesh</option>
                <option value="TS">Telangana</option>
                <option value="KL">Kerala</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label className="small fw-semibold mb-1">Store</Form.Label>
              <Form.Select
                size="sm"
                value={filters.store}
                onChange={(e) => handleFilterChange('store', e.target.value)}
                className="filter-select"
              >
                <option value="">All Stores</option>
                <option value="MP001">MP001 - Chennai Central</option>
                <option value="MP002">MP002 - Bangalore Hub</option>
                <option value="MP003">MP003 - Hyderabad Main</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label className="small fw-semibold mb-1">Audit Job Type</Form.Label>
              <Form.Select
                size="sm"
                value={filters.auditJobType}
                onChange={(e) => handleFilterChange('auditJobType', e.target.value)}
                className="filter-select"
              >
                <option value="">All Types</option>
                <option value="full">Full Audit</option>
                <option value="partial">Partial Audit</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label className="small fw-semibold mb-1">Process Type</Form.Label>
              <Form.Select
                size="sm"
                value={filters.auditProcessType}
                onChange={(e) => handleFilterChange('auditProcessType', e.target.value)}
                className="filter-select"
              >
                <option value="">All Processes</option>
                <option value="product">Product</option>
                <option value="batch">Batch</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label className="small fw-semibold mb-1">Audit Status</Form.Label>
              <Form.Select
                size="sm"
                value={filters.auditStatus}
                onChange={(e) => handleFilterChange('auditStatus', e.target.value)}
                className="filter-select"
              >
                <option value="">All Statuses</option>
                <option value="created">Created</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Export Notice */}
        <Row>
          <Col>
            <div className="text-muted small">
              <Badge bg="info" className="me-2">
                <i className="fas fa-file-excel me-1"></i>
                Export Available
              </Badge>
              All list and drill-down views support Export to Excel
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GlobalHeader;
