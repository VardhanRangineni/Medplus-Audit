import { useState } from 'react';
import { Container, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import Select from 'react-select';
import './GlobalHeader.css';
import medplusIcon from '../assets/Group 1420.png';

const GlobalHeader = ({ filters, onFilterChange, lastRefreshed, onRefresh, hideFilters = false }) => {
  // Use filters from props instead of local state

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  // Handle multi-select change
  const handleMultiSelectChange = (key, selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    handleFilterChange(key, values);
  };

  // Options for multi-select dropdowns
  const stateOptions = [
    { value: 'TN', label: 'Tamil Nadu' },
    { value: 'KA', label: 'Karnataka' },
    { value: 'AP', label: 'Andhra Pradesh' },
    { value: 'TS', label: 'Telangana' },
    { value: 'KL', label: 'Kerala' }
  ];

  const storeOptions = [
    { value: 'STOCK HUB', label: 'Stock Hub' },
    { value: 'NO STOCK HUB', label: 'No Stock Hub' },
    { value: 'REGULAR', label: 'Regular' }
  ];

  const auditJobTypeOptions = [
    { value: 'Full Audit', label: 'Full Audit' },
    { value: 'Select SKUs', label: 'Select SKUs' },
    { value: 'Partial Audit', label: 'Partial Audit' }
  ];

  const processTypeOptions = [
    { value: 'Product Audit', label: 'Product Audit' },
    { value: 'Batch Audit', label: 'Batch Audit' },
    { value: 'Box Audit', label: 'Box Audit' }
  ];

  const auditStatusOptions = [
    { value: 'Created', label: 'Created' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Completed', label: 'Completed' }
  ];

  // Custom styles for react-select
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: '31px',
      fontSize: '0.875rem',
      borderColor: '#dee2e6',
      '&:hover': {
        borderColor: '#0d6efd'
      }
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0 8px'
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: '31px'
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: '4px'
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: '4px'
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#e7f3ff'
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#0d6efd',
      fontSize: '0.75rem'
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#0d6efd',
      '&:hover': {
        backgroundColor: '#0d6efd',
        color: 'white'
      }
    })
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

        {/* Filters Section - Conditionally rendered */}
        {!hideFilters && (
          <>
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
              <Select
                isMulti
                options={stateOptions}
                value={stateOptions.filter(option => filters.state?.includes(option.value))}
                onChange={(selected) => handleMultiSelectChange('state', selected)}
                styles={customSelectStyles}
                placeholder="All States"
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label className="small fw-semibold mb-1">Store</Form.Label>
              <Select
                isMulti
                options={storeOptions}
                value={storeOptions.filter(option => filters.store?.includes(option.value))}
                onChange={(selected) => handleMultiSelectChange('store', selected)}
                styles={customSelectStyles}
                placeholder="All Stores"
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label className="small fw-semibold mb-1">Audit Job Type</Form.Label>
              <Select
                isMulti
                options={auditJobTypeOptions}
                value={auditJobTypeOptions.filter(option => filters.auditJobType?.includes(option.value))}
                onChange={(selected) => handleMultiSelectChange('auditJobType', selected)}
                styles={customSelectStyles}
                placeholder="All Types"
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label className="small fw-semibold mb-1">Process Type</Form.Label>
              <Select
                isMulti
                options={processTypeOptions}
                value={processTypeOptions.filter(option => filters.auditProcessType?.includes(option.value))}
                onChange={(selected) => handleMultiSelectChange('auditProcessType', selected)}
                styles={customSelectStyles}
                placeholder="All Processes"
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label className="small fw-semibold mb-1">Audit Status</Form.Label>
              <Select
                isMulti
                options={auditStatusOptions}
                value={auditStatusOptions.filter(option => filters.auditStatus?.includes(option.value))}
                onChange={(selected) => handleMultiSelectChange('auditStatus', selected)}
                styles={customSelectStyles}
                placeholder="All Statuses"
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </Form.Group>
          </Col>
        </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default GlobalHeader;
