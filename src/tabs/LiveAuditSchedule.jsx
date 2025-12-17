import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Badge, Table, ProgressBar, Alert, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import KPICard from '../components/KPICard';
import StoreDetailModal from '../components/StoreDetailModal';
import { mockDataService } from '../services/mockDataService';
import liveAuditData from '../data/live_audit_schedule_data.json';
import storeCoverageData from '../data/store_coverage_data.json';
import './LiveAuditSchedule.css';

const LiveAuditSchedule = ({ filters = {} }) => {
  const [selectedStatus, setSelectedStatus] = useState('in-progress');
  const [expandedRows, setExpandedRows] = useState({});
  const [mismatchFilters, setMismatchFilters] = useState({});
  const [mismatchSearchTerms, setMismatchSearchTerms] = useState({});
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [storeData, setStoreData] = useState(null);

  // Fetch store data when selectedStore changes
  useEffect(() => {
    if (selectedStore?.storeId) {
      // Find the audit data for this store
      const auditData = liveAuditData.find(a => a.StoreID === selectedStore.storeId);
      // Also find store inventory data
      const storeInventory = storeCoverageData.find(s => s.StoreID === selectedStore.storeId);
      
      if (auditData) {
        // Transform auditors data to match modal expected structure
        const transformedAuditors = auditData.Auditors ? auditData.Auditors.map(auditor => ({
          name: auditor.AuditorName,
          assignedSKUs: auditor.AllottedSKUs || 0,
          completedSKUs: auditor.CompletedSKUs || 0,
          completionRate: auditor.CompletionPercent || 0,
          matchRate: auditor.MatchRate || 0,
          valueCovered: auditor.ValueCovered || 0
        })) : [];

        // Transform mismatch details to deviations and contra
        const deviationMap = {};
        const contraItems = [];
        const productFormDataMap = {};
        
        if (auditData.MismatchDetails && Array.isArray(auditData.MismatchDetails)) {
          auditData.MismatchDetails.forEach(item => {
            const devType = item.Type || 'Other';
            if (!deviationMap[devType]) {
              deviationMap[devType] = { type: devType, count: 0, value: 0 };
            }
            deviationMap[devType].count++;
            // Calculate value based on difference and unit price
            const value = Math.abs(item.Difference || 0) * (item.Value ? (item.Value / Math.abs(item.Difference || 1)) : 150);
            deviationMap[devType].value += value;
            
            // Add to contra items with proper structure
            contraItems.push({
              skuCode: item.SKU,
              productName: item.ProductName,
              type: item.Type,
              quantity: Math.abs(item.Difference || 0),
              value: value,
              status: 'Pending'
            });
          });
        }

        // Get product form data from store coverage if available
        if (storeInventory && storeInventory.Deviations && Array.isArray(storeInventory.Deviations)) {
          storeInventory.Deviations.forEach(deviation => {
            const devType = deviation.DeviationType;
            if (deviation.ProductForms && Array.isArray(deviation.ProductForms)) {
              if (!productFormDataMap[devType]) {
                productFormDataMap[devType] = [];
              }
              deviation.ProductForms.forEach(pf => {
                const existingForm = productFormDataMap[devType].find(f => f.form === pf.ProductForm);
                if (existingForm) {
                  existingForm.count += pf.Count;
                  existingForm.value += pf.Value;
                } else {
                  productFormDataMap[devType].push({
                    form: pf.ProductForm,
                    count: pf.Count,
                    value: Math.round(pf.Value)
                  });
                }
              });
            }
          });
        }

        // Transform to match modal expected structure
        const transformedData = {
          storeId: auditData.StoreID,
          storeName: auditData.StoreName,
          state: auditData.State,
          supervisor: auditData.SupervisorName,
          auditProgress: {
            percentage: auditData.CompletionPercent || 0,
            completedSKUs: auditData.CompletedSKUs || 0,
            totalSKUs: auditData.TotalSKUs || 0
          },
          inventorySummary: {
            totalSKUs: auditData.TotalSKUs || 0,
            totalPIDs: auditData.TotalPIDs || 0,
            auditedSKUs: auditData.CompletedSKUs || 0,
            totalValue: storeInventory?.InventoryValue || transformedAuditors.reduce((sum, a) => sum + (a.valueCovered || 0), 0),
            totalQuantity: storeInventory?.TotalQuantity || auditData.CompletedSKUs || 0
          },
          auditors: transformedAuditors,
          deviations: Object.values(deviationMap),
          contra: contraItems,
          productFormData: productFormDataMap
        };
        
        setStoreData(transformedData);
      } else {
        setStoreData(null);
      }
    }
  }, [selectedStore, filters]);

  // Check if any filters are active
  const hasActiveFilters = filters.state || filters.store || filters.auditJobType || filters.auditProcessType || filters.auditStatus;

  // Apply filters to audit data
  const filteredAuditData = useMemo(() => {
    let data = [...liveAuditData];

    // Apply state filter
    if (filters.state) {
      data = data.filter(audit => audit.State === filters.state);
    }

    // Apply store type filter (HUB or REGULAR)
    if (filters.store) {
      data = data.filter(audit => {
        const storeInfo = storeCoverageData.find(s => s.StoreID === audit.StoreID);
        return storeInfo && storeInfo.StoreType === filters.store;
      });
    }

    // Apply audit job type filter
    if (filters.auditJobType) {
      data = data.filter(audit => audit.AuditJobType === filters.auditJobType);
    }

    // Apply audit process type filter
    if (filters.auditProcessType) {
      data = data.filter(audit => audit.AuditProcessType === filters.auditProcessType);
    }

    // Apply audit status filter
    if (filters.auditStatus) {
      data = data.filter(audit => audit.Status === filters.auditStatus);
    }

    return data;
  }, [filters, liveAuditData]);

  // Transform data to match component structure
  const transformedAuditData = useMemo(() => {
    return filteredAuditData.map(audit => {
      const startDate = new Date(audit.StartDate);
      const endDate = audit.EndDate ? new Date(audit.EndDate) : null;
      
      // Transform mismatch details to match component field names
      const transformedMismatchDetails = (audit.MismatchDetails || []).map(item => ({
        productId: item.ProductID,
        sku: item.SKU,
        productName: item.ProductName,
        productForm: item.ProductForm,
        type: item.Type,
        systemQty: item.SystemQty,
        physicalQty: item.PhysicalQty,
        difference: item.Difference,
        value: item.Value
      }));
      
      return {
        storeId: audit.StoreID,
        storeName: audit.StoreName,
        state: audit.State,
        supervisor: audit.SupervisorName,
        noOfAuditors: audit.NumberOfAuditors,
        auditors: audit.AuditorNames,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate ? endDate.toISOString().split('T')[0] : null,
        totalPIDs: audit.TotalPIDs,
        totalSKUs: audit.TotalSKUs,
        completedSKUs: audit.CompletedSKUs,
        progress: audit.CompletionPercent,
        duration: audit.DurationHours,
        deviations: audit.DeviationCount || 0,
        mismatch: audit.MismatchCount || 0,
        mismatchDetails: transformedMismatchDetails,
        auditJobType: audit.AuditJobType,
        processType: audit.AuditProcessType,
        status: audit.Status.toLowerCase().replace(/\s+/g, '-')
      };
    });
  }, [filteredAuditData]);

  // Calculate workflow stats from filtered data
  const workflowStats = useMemo(() => {
    const stats = {
      created: transformedAuditData.filter(a => a.status === 'created').length,
      inProgress: transformedAuditData.filter(a => a.status === 'in-progress').length,
      pending: transformedAuditData.filter(a => a.status === 'pending').length,
      completed: transformedAuditData.filter(a => a.status === 'completed').length
    };
    return stats;
  }, [transformedAuditData]);

  const allAuditData = useMemo(() => ({
    created: transformedAuditData,
    'in-progress': transformedAuditData.filter(audit => audit.status === 'in-progress'),
    pending: transformedAuditData.filter(audit => audit.status === 'pending'),
    completed: transformedAuditData.filter(audit => audit.status === 'completed')
  }), [transformedAuditData]);

  const auditTableData = allAuditData[selectedStatus] || [];

  const showWorkflowDetails = (status) => {
    const statusMap = {
      'Created': 'created',
      'In Progress': 'in-progress',
      'Pending': 'pending',
      'Completed': 'completed'
    };
    setSelectedStatus(statusMap[status]);
  };

  const toggleMismatchDetails = (storeId) => {
    setExpandedRows(prev => ({ ...prev, [storeId]: !prev[storeId] }));
  };

  const handleMismatchFilterChange = (storeId, filterValue) => {
    setMismatchFilters(prev => ({ ...prev, [storeId]: filterValue }));
  };

  const handleMismatchSearchChange = (storeId, searchValue) => {
    setMismatchSearchTerms(prev => ({ ...prev, [storeId]: searchValue }));
  };

  const filterMismatchDetails = (details, storeId) => {
    if (!details || details.length === 0) return [];

    const filterType = mismatchFilters[storeId] || 'all';
    const searchTerm = (mismatchSearchTerms[storeId] || '').toLowerCase();

    let filtered = details;

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(item =>
        item.type.toLowerCase().replace(/\s+/g, '-') === filterType.toLowerCase()
      );
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.productId.toLowerCase().includes(searchTerm) ||
        item.sku.toLowerCase().includes(searchTerm) ||
        item.productName.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  const showStoreDetails = (store) => {
    setSelectedStore(store);
    setShowStoreModal(true);
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'success';
    if (progress >= 60) return 'warning';
    return 'danger';
  };

  // Export audit data to Excel
  const exportAuditDataToExcel = () => {
    let dataToExport = [];
    let fileName = `Audit_${selectedStatus}_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    if (selectedStatus === 'completed') {
      dataToExport = auditTableData.map(audit => ({
        'Store ID': audit.storeId,
        'Store Name': audit.storeName,
        'State': audit.state,
        'Supervisor': audit.supervisor,
        'No of Auditors': audit.noOfAuditors,
        'Auditors': audit.auditors,
        'Start Date': audit.startDate,
        'End Date': audit.endDate,
        'Total PIDs': audit.totalPIDs,
        'Total SKUs': audit.totalSKUs,
        'Completed SKUs': audit.completedSKUs,
        'Duration (hrs)': audit.duration,
        'Deviations': audit.deviations,
        'Mismatch Count': audit.mismatch,
        'Audit Job Type': audit.auditJobType,
        'Process Type': audit.processType,
        'Status': 'Completed'
      }));
    } else {
      dataToExport = auditTableData.map(audit => ({
        'Store ID': audit.storeId,
        'Store Name': audit.storeName,
        'Supervisor': audit.supervisor,
        'Assigned Auditors': audit.auditors,
        'Start Date': audit.startDate,
        'Completed SKUs': audit.completedSKUs,
        'Total SKUs': audit.totalSKUs,
        'Progress (%)': audit.progress.toFixed(1),
        'Status': audit.status === 'in-progress' ? 'In Progress' : audit.status.charAt(0).toUpperCase() + audit.status.slice(1)
      }));
    }

    // Create worksheet
    const ws = utils.json_to_sheet(dataToExport);
    
    // Create workbook
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Audit Data');
    
    // Download file
    writeFile(wb, fileName);
  };

  // Export audit data to PDF
  const exportAuditDataToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(16);
    const statusTitle = selectedStatus === 'created' ? 'Created' : 
                       selectedStatus === 'in-progress' ? 'In Progress' : 
                       selectedStatus === 'pending' ? 'Pending' : 'Completed';
    doc.text(`Live Audit Schedule - ${statusTitle}`, 14, 20);
    
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    doc.text(`Total Audits: ${auditTableData.length}`, 14, 34);
    
    // Prepare table data
    let headers = [];
    let rows = [];
    
    if (selectedStatus === 'completed') {
      headers = [['Store ID', 'Store Name', 'State', 'Supervisor', 'Auditors', 'Start Date', 'End Date', 'PIDs', 'SKUs', 'Duration', 'Deviations', 'Mismatch']];
      rows = auditTableData.map(audit => [
        audit.storeId,
        audit.storeName,
        audit.state,
        audit.supervisor,
        audit.noOfAuditors,
        audit.startDate,
        audit.endDate,
        audit.totalPIDs,
        audit.totalSKUs,
        `${audit.duration}h`,
        audit.deviations,
        audit.mismatch
      ]);
    } else {
      headers = [['Store ID', 'Store Name', 'Supervisor', 'Assigned Auditors', 'Start Date', 'Completed', 'Total', 'Progress']];
      rows = auditTableData.map(audit => [
        audit.storeId,
        audit.storeName,
        audit.supervisor,
        audit.auditors,
        audit.startDate,
        audit.completedSKUs,
        audit.totalSKUs,
        `${audit.progress.toFixed(1)}%`
      ]);
    }
    
    // Create table
    autoTable(doc, {
      startY: 42,
      head: headers,
      body: rows,
      theme: 'striped',
      headStyles: { fillColor: [13, 110, 253] },
      styles: { fontSize: 8 },
      columnStyles: selectedStatus === 'completed' ? {
        0: { cellWidth: 18 },
        1: { cellWidth: 30 },
        2: { cellWidth: 12 },
        3: { cellWidth: 25 },
        4: { cellWidth: 12 },
        5: { cellWidth: 20 },
        6: { cellWidth: 20 },
        7: { cellWidth: 12 },
        8: { cellWidth: 12 },
        9: { cellWidth: 12 },
        10: { cellWidth: 15 },
        11: { cellWidth: 15 }
      } : {
        0: { cellWidth: 20 },
        1: { cellWidth: 35 },
        2: { cellWidth: 30 },
        3: { cellWidth: 35 },
        4: { cellWidth: 22 },
        5: { cellWidth: 18 },
        6: { cellWidth: 18 },
        7: { cellWidth: 20 }
      }
    });
    
    // Save PDF
    const fileName = `Audit_${selectedStatus}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  return (
    <Container fluid className="live-audit-tab py-4">
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
      {/* Audit Workflow Tiles */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <KPICard
            title="Created"
            value={workflowStats.created}
            subtitle="Not started"
            icon="fas fa-file-alt"
            color={selectedStatus === 'created' ? 'secondary' : 'secondary'}
            onClick={() => showWorkflowDetails('Created')}
            style={{
              border: selectedStatus === 'created' ? '2px solid #6c757d' : '1px solid #dee2e6',
              boxShadow: selectedStatus === 'created' ? '0 0 10px rgba(108, 117, 125, 0.3)' : 'none',
              opacity: selectedStatus === 'created' ? 1 : 0.6
            }}
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="Pending"
            value={workflowStats.pending}
            subtitle="Awaiting action"
            icon="fas fa-pause-circle"
            color={selectedStatus === 'pending' ? 'warning' : 'warning'}
            onClick={() => showWorkflowDetails('Pending')}
            style={{
              border: selectedStatus === 'pending' ? '2px solid #ffc107' : '1px solid #dee2e6',
              boxShadow: selectedStatus === 'pending' ? '0 0 10px rgba(255, 193, 7, 0.3)' : 'none',
              opacity: selectedStatus === 'pending' ? 1 : 0.6
            }}
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="In Progress"
            value={workflowStats.inProgress}
            subtitle="Actively running"
            icon="fas fa-spinner"
            color={selectedStatus === 'in-progress' ? 'primary' : 'primary'}
            onClick={() => showWorkflowDetails('In Progress')}
            style={{
              border: selectedStatus === 'in-progress' ? '2px solid #0d6efd' : '1px solid #dee2e6',
              boxShadow: selectedStatus === 'in-progress' ? '0 0 10px rgba(13, 110, 253, 0.3)' : 'none',
              opacity: selectedStatus === 'in-progress' ? 1 : 0.6
            }}
          />
        </Col>
        <Col md={3}>
          <KPICard
            title="Completed"
            value={workflowStats.completed}
            subtitle="Finalized"
            icon="fas fa-check-circle"
            color={selectedStatus === 'completed' ? 'success' : 'success'}
            onClick={() => showWorkflowDetails('Completed')}
            style={{
              border: selectedStatus === 'completed' ? '2px solid #198754' : '1px solid #dee2e6',
              boxShadow: selectedStatus === 'completed' ? '0 0 10px rgba(25, 135, 84, 0.3)' : 'none',
              opacity: selectedStatus === 'completed' ? 1 : 0.6
            }}
          />
        </Col>
      </Row>

      {/* Detailed Audit Table */}
      <Row className="g-0">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-table me-2 text-primary"></i>
                    Live Audit Schedule - {selectedStatus === 'created' ? 'Created' : selectedStatus === 'in-progress' ? 'In Progress' : selectedStatus === 'pending' ? 'Pending' : 'Completed'}
                  </h5>
                  <small className="text-muted">Click on any row to view auditor-wise allocation and real-time progress</small>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <Dropdown>
                    <Dropdown.Toggle
                      size="sm"
                      variant="success"
                      disabled={auditTableData.length === 0}
                      id="audit-export-dropdown"
                    >
                      <i className="fas fa-download me-1"></i>
                      Export Report
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={exportAuditDataToExcel}>
                        <i className="fas fa-file-excel text-success me-2"></i>
                        Export as Excel
                      </Dropdown.Item>
                      <Dropdown.Item onClick={exportAuditDataToPDF}>
                        <i className="fas fa-file-pdf text-danger me-2"></i>
                        Export as PDF
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Badge bg="primary" pill style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
                    {auditTableData.length} {auditTableData.length === 1 ? 'Audit' : 'Audits'}
                  </Badge>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-scroll-container">
                <Table hover className="mb-0 audit-table">
                  <thead className="bg-light">
                    <tr>
                      <th>Store ID</th>
                      <th>Store Name</th>
                      {selectedStatus === 'completed' && <th>State</th>}
                      <th>Supervisor</th>
                      {selectedStatus === 'completed' ? <th>Auditors</th> : <th>Assigned Auditors</th>}
                      <th>Start Date</th>
                      {selectedStatus === 'completed' && <th>End Date</th>}
                      {selectedStatus === 'completed' && <th>PIDs</th>}
                      {selectedStatus === 'completed' && <th>SKUs</th>}
                      {selectedStatus === 'completed' && <th>Duration</th>}
                      {selectedStatus === 'completed' && <th>Deviations</th>}
                      {selectedStatus === 'completed' && <th>Mismatch</th>}
                      {selectedStatus === 'created' && <th>Status</th>}
                      {selectedStatus !== 'completed' && <th>Audit Progress</th>}
                      {selectedStatus === 'completed' && <th>Job Type</th>}
                      {selectedStatus === 'completed' && <th>Process</th>}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditTableData.length > 0 ? (
                      auditTableData.map((audit, idx) => (
                        <React.Fragment key={idx}>
                          <tr
                            className="audit-row"
                            onClick={() => showStoreDetails(audit)}
                            style={{ cursor: 'pointer' }}
                          >
                            <td>
                              <Badge bg="light" text="dark" className="font-monospace">
                                {audit.storeId}
                              </Badge>
                            </td>
                            <td className="fw-semibold">{audit.storeName}</td>
                            {selectedStatus === 'completed' && (
                              <td>
                                <Badge bg="secondary">{audit.state}</Badge>
                              </td>
                            )}
                            <td>
                              <i className="fas fa-user-tie me-2 text-muted"></i>
                              {audit.supervisor}
                            </td>
                            <td>
                              {selectedStatus === 'completed' ? (
                                <Badge bg="info" pill>{audit.noOfAuditors}</Badge>
                              ) : (
                                <div className="d-flex align-items-center gap-2">
                                  {audit.auditors !== 'Not Assigned' ? (
                                    <>
                                      <Badge bg="info" pill>
                                        {audit.auditors.split(',').length}
                                      </Badge>
                                      <small className="text-muted">{audit.auditors}</small>
                                    </>
                                  ) : (
                                    <Badge bg="secondary">{audit.auditors}</Badge>
                                  )}
                                </div>
                              )}
                            </td>
                            <td>
                              <i className="fas fa-calendar me-2 text-muted"></i>
                              {audit.startDate}
                            </td>
                            {selectedStatus === 'completed' && (
                              <>
                                <td>
                                  <i className="fas fa-calendar-check me-2 text-muted"></i>
                                  {audit.endDate}
                                </td>
                                <td>
                                  <Badge bg="light" text="dark">{audit.totalPIDs.toLocaleString()}</Badge>
                                </td>
                                <td>
                                  <Badge bg="light" text="dark">{audit.totalSKUs.toLocaleString()}</Badge>
                                </td>
                                <td>
                                  <Badge bg="primary">{audit.duration}</Badge>
                                </td>
                                <td>
                                  <Badge bg="danger">{audit.deviations || 0}</Badge>
                                </td>
                                <td
                                  onClick={(e) => {
                                    if (audit.mismatchDetails && audit.mismatchDetails.length > 0) {
                                      e.stopPropagation();
                                      toggleMismatchDetails(audit.storeId);
                                    }
                                  }}
                                  style={{
                                    cursor: audit.mismatchDetails && audit.mismatchDetails.length > 0 ? 'pointer' : 'default',
                                    color: audit.mismatchDetails && audit.mismatchDetails.length > 0 ? '#0d6efd' : 'inherit'
                                  }}
                                >
                                  <span className="fw-semibold">{audit.mismatch}</span>
                                  {audit.mismatchDetails && audit.mismatchDetails.length > 0 && (
                                    <i className={`fas fa-chevron-${expandedRows[audit.storeId] ? 'up' : 'down'} ms-2`}></i>
                                  )}
                                </td>
                              </>
                            )}
                            {selectedStatus === 'created' && (
                              <td>
                                <Badge
                                  bg={
                                    audit.status === 'in-progress' ? 'primary' :
                                      audit.status === 'pending' ? 'warning' :
                                        audit.status === 'completed' ? 'success' :
                                          'secondary'
                                  }
                                >
                                  {audit.status === 'in-progress' ? 'In Progress' :
                                    audit.status === 'pending' ? 'Pending' :
                                      audit.status === 'completed' ? 'Completed' :
                                        audit.status}
                                </Badge>
                                {audit.status === 'pending' && audit.reason && (
                                  <div className="mt-1">
                                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                                      <i className="fas fa-exclamation-circle me-1"></i>
                                      {audit.reason}
                                    </small>
                                  </div>
                                )}
                              </td>
                            )}
                            {selectedStatus !== 'completed' && (
                              <td style={{ minWidth: '250px' }}>
                                <div className="mb-1">
                                  <small className="text-muted">
                                    {audit.completedSKUs.toLocaleString()} / {audit.totalSKUs.toLocaleString()} SKUs
                                  </small>
                                </div>
                                <ProgressBar
                                  now={audit.progress}
                                  variant={getProgressColor(audit.progress)}
                                  label={`${audit.progress.toFixed(1)}%`}
                                  style={{ height: '20px' }}
                                />
                              </td>
                            )}
                            {selectedStatus === 'completed' && (
                              <>
                                <td>
                                  <Badge bg="info">{audit.auditJobType}</Badge>
                                </td>
                                <td>
                                  <Badge bg="success">{audit.processType}</Badge>
                                </td>
                              </>
                            )}
                            <td>
                              {selectedStatus !== 'completed' ? (
                                <i className="fas fa-chevron-right text-primary"></i>
                              ) : (
                                <Badge bg="success">
                                  <i className="fas fa-check-circle me-1"></i>
                                  Complete
                                </Badge>
                              )}
                            </td>
                          </tr>
                          {/* Expandable Mismatch Details Row */}
                          {selectedStatus === 'completed' && expandedRows[audit.storeId] && audit.mismatchDetails && audit.mismatchDetails.length > 0 && (
                            <tr>
                              <td colSpan="14" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
                                <div className="mb-3 d-flex gap-3 align-items-center">
                                  <Form.Select
                                    value={mismatchFilters[audit.storeId] || 'all'}
                                    onChange={(e) => handleMismatchFilterChange(audit.storeId, e.target.value)}
                                    style={{ width: '200px' }}
                                  >
                                    <option value="all">All Mismatch Types</option>
                                    <option value="short">Short</option>
                                    <option value="excess">Excess</option>
                                    <option value="contra-short">Contra Short</option>
                                    <option value="contra-excess">Contra Excess</option>
                                  </Form.Select>

                                  <InputGroup style={{ width: '300px' }}>
                                    <InputGroup.Text>
                                      <i className="fas fa-search"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                      type="text"
                                      placeholder="Search Product ID, SKU, or Name..."
                                      value={mismatchSearchTerms[audit.storeId] || ''}
                                      onChange={(e) => handleMismatchSearchChange(audit.storeId, e.target.value)}
                                    />
                                  </InputGroup>
                                </div>

                                <Table bordered size="sm" className="mb-0">
                                  <thead className="table-secondary">
                                    <tr>
                                      <th>Product ID</th>
                                      <th>Product Form</th>
                                      <th>Product Name</th>
                                      <th>Mismatch Type</th>
                                      <th>System Qty</th>
                                      <th>Physical Qty</th>
                                      <th>Difference</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {filterMismatchDetails(audit.mismatchDetails, audit.storeId).length > 0 ? (
                                      filterMismatchDetails(audit.mismatchDetails, audit.storeId).map((item, itemIdx) => (
                                        <tr key={itemIdx}>
                                          <td><code>{item.productId}</code></td>
                                          <td><Badge bg="secondary">{item.productForm || 'N/A'}</Badge></td>
                                          <td>{item.productName}</td>
                                          <td>
                                            <Badge
                                              bg={
                                                item.type === 'Short' ? 'danger' :
                                                  item.type === 'Excess' ? 'warning' :
                                                    item.type === 'Contra Short' ? 'dark' :
                                                      'secondary'
                                              }
                                            >
                                              {item.type}
                                            </Badge>
                                          </td>
                                          <td className="text-end">{item.systemQty}</td>
                                          <td className="text-end">{item.physicalQty}</td>
                                          <td className="text-end">
                                            <span style={{ color: item.difference < 0 ? '#dc3545' : '#28a745' }}>
                                              {item.difference > 0 ? '+' : ''}{item.difference}
                                            </span>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="7" className="text-center text-muted py-3">
                                          <i className="fas fa-search me-2"></i>
                                          No matching products found
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </Table>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="14" className="text-center py-5">
                          <i className="fas fa-inbox fa-3x text-muted mb-3 d-block"></i>
                          <p className="text-muted">No audits found for this status</p>
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

      {/* Store Detail Modal */}
      <StoreDetailModal
        show={showStoreModal}
        onHide={() => setShowStoreModal(false)}
        storeData={storeData}
        auditStatus={selectedStore?.status}
      />
    </Container>
  );
};

export default LiveAuditSchedule;
