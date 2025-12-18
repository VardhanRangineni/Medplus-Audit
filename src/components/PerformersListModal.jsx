import { useState, useEffect } from 'react';
import { Modal, Table, Badge, Button, Form, Pagination } from 'react-bootstrap';

const PerformersListModal = ({ show, onHide, title, items, metricKey, metricLabel, variant }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Reset pagination when items change or modal opens/closes
    useEffect(() => {
        if (show) {
            setCurrentPage(1);
        }
    }, [show, items]);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className={`fw-bold text-${variant}`}>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-2 p-0">
                {/* Pagination Controls on Top */}
                <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-white border-bottom">
                    <div className="d-flex align-items-center">
                        <span className="me-2 small text-muted">Show</span>
                        <Form.Select
                            size="sm"
                            style={{ width: '70px', boxShadow: 'none' }}
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1); // Reset to first page
                            }}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </Form.Select>
                        <span className="ms-2 small text-muted">entries</span>
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
                            Page {currentPage} of {totalPages || 1}
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

                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    <Table hover className="mb-0 align-middle">
                        <thead className="bg-light sticky-top" style={{ top: 0, zIndex: 10 }}>
                            <tr>
                                <th style={{ width: '80px' }} className="text-center">Rank</th>
                                <th>Auditor Name</th>
                                <th className="text-end">{metricLabel}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, idx) => {
                                // Calculate global rank
                                const rank = indexOfFirstItem + idx + 1;
                                return (
                                    <tr key={idx}>
                                        <td className="text-center">
                                            <Badge bg={variant} pill style={{ width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {rank}
                                            </Badge>
                                        </td>
                                        <td className="fw-semibold">{item.name}</td>
                                        <td className="text-end font-monospace fw-bold text-dark">
                                            {typeof item.value === 'number' ? item.value.toFixed(1) : item.value}%
                                        </td>
                                    </tr>
                                );
                            })}
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
                    Showing {items.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, items.length)} of {items.length} entries
                </div>
                <Button variant="secondary" onClick={onHide} size="sm">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PerformersListModal;
