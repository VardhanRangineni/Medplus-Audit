import { useState, useEffect, useMemo } from 'react';
import { Modal, Table, Badge, Button, Form, Pagination, Dropdown, ButtonGroup } from 'react-bootstrap';

const PerformersListModal = ({ show, onHide, title, items, metricKey, metricLabel, initialSort = 'desc' }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [activeSort, setActiveSort] = useState(initialSort);

    const [selectedStatuses, setSelectedStatuses] = useState([]);

    // Derived All Statuses
    const allStatuses = useMemo(() => [...new Set(items.map(i => i.status))].filter(Boolean), [items]);

    // Reset state when show/items/initialSort changes
    useEffect(() => {
        if (show) {
            setCurrentPage(1);
            setActiveSort(initialSort);
            setSelectedStatuses(allStatuses); // Default select all
        }
    }, [show, items, initialSort]); // Dependencies updated, note: if allStatuses changes, we might want to update selectedStatuses logic too, but usually items change triggers this.

    // 1. Assign Ranks based on High-to-Low value (Best is Rank 1)
    const rankedItems = useMemo(() => {
        // Clone and sort descending to assign rank
        return [...items]
            .sort((a, b) => b.value - a.value)
            .map((item, index) => ({
                ...item,
                rank: index + 1
            }));
    }, [items]);

    // 2. Filter & Sort for Display
    const sortedDisplayItems = useMemo(() => {
        let filtered = rankedItems.filter(item => selectedStatuses.includes(item.status));

        if (activeSort === 'asc') {
            // Low to High
            return filtered.sort((a, b) => a.value - b.value);
        } else {
            // High to Low
            return filtered.sort((a, b) => b.value - a.value);
        }
    }, [rankedItems, activeSort, selectedStatuses]);

    const handleStatusToggle = (status) => {
        if (selectedStatuses.includes(status)) {
            setSelectedStatuses(prev => prev.filter(s => s !== status));
        } else {
            setSelectedStatuses(prev => [...prev, status]);
        }
    };

    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Inactive': return 'secondary';
            case 'Deactivated': return 'danger';
            default: return 'light';
        }
    };

    const totalPages = Math.ceil(sortedDisplayItems.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedDisplayItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className="border-0 pb-0 d-flex justify-content-between align-items-center">
                <Modal.Title className="fw-bold text-dark">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-2 p-0">
                {/* Controls Bar */}
                <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-white border-bottom flex-wrap gap-2">

                    {/* Sort Control */}
                    <div className="d-flex align-items-center">
                        <span className="small fw-bold text-muted me-2">Sort by:</span>
                        <Dropdown as={ButtonGroup} size="sm">
                            <Dropdown.Toggle variant="light" className="border text-dark fw-semibold" id="dropdown-basic">
                                {activeSort === 'desc' ? 'High to Low (Best First)' : 'Low to High (Needs Attention)'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setActiveSort('desc')} active={activeSort === 'desc'}>
                                    High to Low (Best First)
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setActiveSort('asc')} active={activeSort === 'asc'}>
                                    Low to High (Needs Attention)
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    {/* Status Filter Multi-Select */}
                    <div className="d-flex align-items-center">
                        <span className="small fw-bold text-muted me-2">Status:</span>
                        <Dropdown autoClose="outside" size="sm">
                            <Dropdown.Toggle variant="light" className="border text-dark fw-semibold" id="status-filter-dropdown">
                                {selectedStatuses.length === allStatuses.length ? 'All Selected' : `${selectedStatuses.length} Selected`}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ minWidth: '200px', maxHeight: '300px', overflowY: 'auto' }}>
                                <div className="px-3 py-1">
                                    <Form.Check
                                        type="checkbox"
                                        label="Select All"
                                        checked={selectedStatuses.length === allStatuses.length}
                                        onChange={() => {
                                            if (selectedStatuses.length === allStatuses.length) setSelectedStatuses([]);
                                            else setSelectedStatuses(allStatuses);
                                        }}
                                        className="fw-bold mb-2 pb-2 border-bottom"
                                    />
                                    {allStatuses.map(status => (
                                        <Form.Check
                                            key={status}
                                            type="checkbox"
                                            label={status}
                                            checked={selectedStatuses.includes(status)}
                                            onChange={() => handleStatusToggle(status)}
                                            className="mb-1"
                                        />
                                    ))}
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    {/* Pagination & Page Size */}
                    <div className="d-flex align-items-center gap-3">
                        <div className="d-flex align-items-center">
                            <span className="me-2 small text-muted">Show</span>
                            <Form.Select
                                size="sm"
                                style={{ width: '70px', boxShadow: 'none' }}
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </Form.Select>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="border-0"
                            >
                                <i className="fas fa-chevron-left"></i>
                            </Button>
                            <span className="small fw-bold text-muted">
                                {currentPage} / {totalPages || 1}
                            </span>
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                disabled={currentPage === totalPages || totalPages === 0}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="border-0"
                            >
                                <i className="fas fa-chevron-right"></i>
                            </Button>
                        </div>
                    </div>
                </div>

                <div style={{ maxHeight: '55vh', overflowY: 'auto' }}>
                    <Table hover className="mb-0 align-middle">
                        <thead className="bg-light sticky-top" style={{ top: 0, zIndex: 10 }}>
                            <tr>
                                <th style={{ width: '80px' }} className="text-center">Rank</th>
                                <th>Auditor Name</th>
                                <th className="text-end">{metricLabel || 'Value'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="text-center">
                                        <Badge bg="secondary" pill className="bg-opacity-25 text-dark fw-bold" style={{ width: '32px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {item.rank}
                                        </Badge>
                                    </td>
                                    <td className="fw-semibold">
                                        {item.name}
                                        <Badge bg={getStatusBadgeVariant(item.status)} className="ms-2" style={{ fontSize: '0.7rem' }}>
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td className="text-end font-monospace fw-bold text-dark">
                                        {typeof item.value === 'number' ? item.value.toFixed(1) : item.value}%
                                    </td>
                                </tr>
                            ))}
                            {currentItems.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="text-center py-4 text-muted">
                                        No performers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer className="border-0 bg-light py-2 justify-content-between">
                <div className="small text-muted">
                    Total {items.length} auditors
                </div>
                <Button variant="secondary" onClick={onHide} size="sm">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PerformersListModal;
