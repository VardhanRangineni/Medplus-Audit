import { useState } from 'react';
import { Container, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import './GlobalHeader.css';
import medplusIcon from '../assets/Group 1420.png';

const GlobalHeader = ({ filters, onFilterChange, lastRefreshed, onRefresh }) => {
  // Use filters from props instead of local state

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
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
              Medplus Audit Dashboard
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
                <option value="HUB">HUB</option>
                <option value="REGULAR">Regular</option>
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
                <option value="Full Audit">Full Audit</option>
                <option value="Select SKUs">Select SKUs</option>
                <option value="Partial Audit">Partial Audit</option>
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
                <option value="Product Audit">Product Audit</option>
                <option value="Batch Audit">Batch Audit</option>
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
                <option value="Created">Created</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GlobalHeader;
