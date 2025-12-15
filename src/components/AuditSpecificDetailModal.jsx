import React from 'react';
import { Modal, Card, Badge, Table, Button } from 'react-bootstrap';

const AuditSpecificDetailModal = ({ show, onHide, audit, allData }) => {
    if (!audit) return null;

    const formatDate = (timestamp) => {
        if (!timestamp) return '-';
        return new Date(timestamp).toLocaleDateString('en-GB');
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'In-Progress': return 'warning'; // Changed to match image blue/primary usually but code used warning previously. Image shows Blue for In-Progress? No, image status badge is Blue for "In-Progress".
            // Wait, standard bootstrap "primary" is blue, "warning" is yellow.
            // Previous code used 'warning' (yellow) for In-Progress.
            // The image attached shows a BLUE "In-Progress" badge.
            // I will switch In-Progress to 'primary' (blue) to match the image if possible, or stick to 'primary'.
            // Let's use 'primary' for In-Progress to match the specific image provided in this turn.
            case 'Pending': return 'info';
            case 'Created': return 'secondary';
            default: return 'light';
        }
    };

    // Calculate generic averages for estimation
    const avgQty = audit.AppearedCount ? audit.AppearedQty / audit.AppearedCount : 0;
    const avgVal = audit.AppearedCount ? audit.AppearedValue / audit.AppearedCount : 0;

    const calculateMetrics = (count) => ({
        count: count || 0,
        qty: Math.round((count || 0) * avgQty),
        value: Math.round((count || 0) * avgVal)
    });

    const matched = calculateMetrics(audit.MatchedCount);
    const revised = calculateMetrics(audit.RevisedCount);
    const deviations = calculateMetrics(audit.PendingCount); // Mapping Pending to Deviations

    // For Appeared, use actuals if available, else calc (though actuals are there)
    const appeared = {
        count: audit.AppearedCount,
        qty: audit.AppearedQty,
        value: audit.AppearedValue
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg" backdrop="static" className="audit-specific-modal" backdropClassName="audit-specific-backdrop">
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-bold h5">Audit Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light p-4">
                {/* Top Card */}
                <Card className="border-0 shadow-sm mb-4">
                    <Card.Body className="d-flex justify-content-between align-items-start p-4">
                        <div>
                            <h4 className="fw-bold mb-3">{audit.AUDIT_ID}</h4>
                            <div className="text-muted mb-2">
                                <i className="fas fa-map-marker-alt me-2"></i>
                                {audit.StoreName}
                            </div>
                            <div className="text-muted">
                                <i className="fas fa-calendar-alt me-2"></i>
                                {formatDate(audit.AuditDate)}
                            </div>
                        </div>
                        <Badge bg={audit.Status === 'In-Progress' ? 'primary' : getStatusBadge(audit.Status)} className="px-3 py-2 rounded-pill">
                            {audit.Status}
                        </Badge>
                    </Card.Body>
                </Card>

                {/* Re-Audit Summary */}
                <h6 className="text-muted text-uppercase fw-bold mb-3" style={{ fontSize: '0.85rem' }}>RE-AUDIT SUMMARY</h6>
                <Card className="border-0 shadow-sm mb-4">
                    <Card.Body className="p-0">
                        <Table hover responsive className="mb-0">
                            <thead className="bg-white">
                                <tr>
                                    <th className="py-3 ps-4 text-dark">Re-Audit Category</th>
                                    <th className="py-3 text-end">Count</th>
                                    <th className="py-3 text-end">Qty</th>
                                    <th className="py-3 text-end pe-4">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="ps-4">Appeared</td>
                                    <td className="text-end">{appeared.count?.toLocaleString()}</td>
                                    <td className="text-end">{appeared.qty?.toLocaleString()}</td>
                                    <td className="text-end pe-4">₹{appeared.value?.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className="ps-4">Matched</td>
                                    <td className="text-end">{matched.count?.toLocaleString()}</td>
                                    <td className="text-end">{matched.qty?.toLocaleString()}</td>
                                    <td className="text-end pe-4">₹{matched.value?.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className="ps-4">Revised</td>
                                    <td className="text-end">{revised.count?.toLocaleString()}</td>
                                    <td className="text-end">{revised.qty?.toLocaleString()}</td>
                                    <td className="text-end pe-4">₹{revised.value?.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className="ps-4">Deviations</td>
                                    <td className="text-end">{deviations.count?.toLocaleString()}</td>
                                    <td className="text-end">{deviations.qty?.toLocaleString()}</td>
                                    <td className="text-end pe-4">₹{deviations.value?.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* Participating Auditors */}
                {allData && (
                    <>
                        <h6 className="text-muted text-uppercase fw-bold mb-3" style={{ fontSize: '0.85rem' }}>PARTICIPATING AUDITORS</h6>
                        <Card className="border-0 shadow-sm">
                            <Card.Body className="p-0">
                                <Table hover responsive className="mb-0">
                                    <thead className="bg-white">
                                        <tr>
                                            <th className="py-3 ps-4 text-dark">Auditor Name</th>
                                            <th className="py-3">ID</th>
                                            <th className="py-3 text-end">Allocated SKUs</th>
                                            <th className="py-3 text-end">Completion</th>
                                            <th className="py-3 text-end pe-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allData.filter(d => d.AUDIT_ID === audit.AUDIT_ID).map((record, idx) => (
                                            <tr key={idx}>
                                                <td className="ps-4 fw-bold text-primary">{record.AuditorName}</td>
                                                <td>{record.AuditorID}</td>
                                                <td className="text-end">{record.AuditorAllottedSKUs?.toLocaleString()}</td>
                                                <td className="text-end">
                                                    <Badge bg={record.CompletionPercent >= 90 ? 'success' : 'warning'} className="fw-normal">
                                                        {record.CompletionPercent}%
                                                    </Badge>
                                                </td>
                                                <td className="text-end pe-4">
                                                    <Badge bg={getStatusBadge(record.Status)} className="fw-normal px-2 rounded-pill">
                                                        {record.Status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer className="bg-light border-0">
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AuditSpecificDetailModal;
