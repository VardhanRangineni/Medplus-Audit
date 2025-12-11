import { Modal, Button, Table, Form, InputGroup, Badge } from 'react-bootstrap';
import { useState } from 'react';
import StoreDetailModal from './StoreDetailModal';
import { mockDataService } from '../services/mockDataService';
import './DrillDownModal.css';

const DrillDownModal = ({ show, onHide, title, data, columns, enableStoreClick = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showStoreDetail, setShowStoreDetail] = useState(false);
  const [selectedStoreData, setSelectedStoreData] = useState(null);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortedData = [...(data || [])].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const exportToExcel = () => {
    // Convert data to CSV
    const headers = columns.map(col => col.label).join(',');
    const rows = filteredData.map(row =>
      columns.map(col => `"${row[col.key] || 'N/A'}"`).join(',')
    ).join('\n');
    
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleRowClick = async (row) => {
    if (!enableStoreClick || !row.storeId) return;
    
    try {
      const storeData = await mockDataService.getStoreDetailedInfo(row.storeId);
      if (storeData) {
        setSelectedStoreData(storeData);
        setShowStoreDetail(true);
      }
    } catch (error) {
      console.error('Error fetching store details:', error);
      alert('Failed to load store details. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" className="drill-down-modal">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>
          <i className="fas fa-table me-2 text-primary"></i>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Search and Export Controls */}
        <div className="d-flex justify-content-between mb-3">
          <InputGroup style={{ maxWidth: '400px' }}>
            <InputGroup.Text>
              <i className="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search in table..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          
          <div className="d-flex gap-2 align-items-center">
            <Badge bg="secondary">{filteredData.length} Records</Badge>
            <Button 
              variant="success" 
              size="sm"
              onClick={exportToExcel}
              className="d-flex align-items-center gap-2"
            >
              <i className="fas fa-file-excel"></i>
              Export to Excel
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive" style={{ maxHeight: '500px' }}>
          <Table striped bordered hover className="mb-0">
            <thead className="sticky-top bg-light">
              <tr>
                {columns.map((col) => (
                  <th 
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="sortable-header"
                  >
                    {col.label}
                    {sortConfig.key === col.key && (
                      <i className={`fas fa-sort-${sortConfig.direction === 'asc' ? 'up' : 'down'} ms-2`}></i>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <tr 
                    key={idx}
                    onClick={() => handleRowClick(row)}
                    className={enableStoreClick && row.storeId ? 'clickable-row' : ''}
                    style={{ cursor: enableStoreClick && row.storeId ? 'pointer' : 'default' }}
                  >
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.render ? col.render(row[col.key], row) : (row[col.key] || 'N/A')}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center text-muted py-4">
                    <i className="fas fa-inbox fa-2x mb-2 d-block"></i>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>

      {/* Nested Store Detail Modal */}
      {selectedStoreData && (
        <StoreDetailModal 
          show={showStoreDetail}
          onHide={() => setShowStoreDetail(false)}
          storeData={selectedStoreData}
        />
      )}
    </Modal>
  );
};

export default DrillDownModal;
