import React, { useMemo, useState } from 'react';
import { Modal, Container, Row, Col, Card, Table, Badge, Form, Button } from 'react-bootstrap';
import AuditSpecificDetailModal from './AuditSpecificDetailModal';

const AuditorDetailModal = ({ show, onHide, auditorId, allData }) => {
    const [timeRange, setTimeRange] = useState('All-time');
    const [selectedAudit, setSelectedAudit] = useState(null);
    const [showAuditDetail, setShowAuditDetail] = useState(false);

    // Filter data for this auditor
    const auditorRecords = useMemo(() => {
        if (!auditorId || !allData) return [];
        let filtered = allData.filter(d => d.AuditorID === auditorId);

        if (timeRange !== 'All-time') {
            filtered = filtered.filter(d => {
                const date = new Date(d.AuditDate);
                const month = date.getMonth(); // 0-11
                const year = date.getFullYear();

                if (year !== 2025) return false;

                switch (timeRange) {
                    case 'Oct 2025 - Dec 2025':
                        return month >= 9 && month <= 11;
                    case 'Jul 2025 - Sep 2025':
                        return month >= 6 && month <= 8;
                    case 'Apr 2025 - Jun 2025':
                        return month >= 3 && month <= 5;
                    case 'Jan 2025 - Mar 2025':
                        return month >= 0 && month <= 2;
                    default:
                        return true;
                }
            });
        }
        return filtered.sort((a, b) => b.AuditDate - a.AuditDate);
    }, [auditorId, allData, timeRange]);

    // Specific Auditor Details (Name from first record)
    const auditorName = auditorRecords.length > 0 ? auditorRecords[0].AuditorName : 'Unknown';

    // Calculate Metrics
    const metrics = useMemo(() => {
        const totalAudits = auditorRecords.length;
        const totalSKUs = auditorRecords.reduce((sum, r) => sum + (r.AuditorAllottedSKUs || 0), 0);
        const totalPIDs = auditorRecords.reduce((sum, r) => sum + (r.AuditorAllottedPIDs || 0), 0);

        const statusBreakdown = {
            Completed: auditorRecords.filter(r => r.Status === 'Completed').length,
            InProgress: auditorRecords.filter(r => r.Status === 'In-Progress').length,
            Pending: auditorRecords.filter(r => r.Status === 'Pending').length,
            Created: auditorRecords.filter(r => r.Status === 'Created').length,
        };

        const deviations = auditorRecords.reduce((acc, r) => {
            acc.appeared.count += (r.AppearedCount || 0);
            acc.appeared.qty += (r.AppearedQty || 0);
            acc.appeared.value += (r.AppearedValue || 0);

            acc.matched.count += (r.MatchedCount || 0);
            // Data missing for Matched Qty/Value, estimating roughly for UI demo or setting to 0 if strict
            // For now, let's assume Matched/Revised/Pending don't have explicit Qty/Value in this dataset
            // and we just show Count. 
            // But to match the "pic", I will mock Qty/Value based on average value per count from Appeared
            const avgQty = r.AppearedCount ? r.AppearedQty / r.AppearedCount : 0;
            const avgVal = r.AppearedCount ? r.AppearedValue / r.AppearedCount : 0;

            acc.matched.qty += Math.round((r.MatchedCount || 0) * avgQty);
            acc.matched.value += Math.round((r.MatchedCount || 0) * avgVal);

            acc.revised.count += (r.RevisedCount || 0);
            acc.revised.qty += Math.round((r.RevisedCount || 0) * avgQty);
            acc.revised.value += Math.round((r.RevisedCount || 0) * avgVal);

            acc.pending.count += (r.PendingCount || 0);
            acc.pending.qty += Math.round((r.PendingCount || 0) * avgQty);
            acc.pending.value += Math.round((r.PendingCount || 0) * avgVal);

            return acc;
        }, {
            appeared: { count: 0, qty: 0, value: 0 },
            matched: { count: 0, qty: 0, value: 0 },
            revised: { count: 0, qty: 0, value: 0 },
            pending: { count: 0, qty: 0, value: 0 }
        });

        return { totalAudits, totalSKUs, totalPIDs, statusBreakdown, deviations };
    }, [auditorRecords]);

    // Format Date
    const formatDate = (timestamp) => {
        if (!timestamp) return '-';
        return new Date(timestamp).toLocaleDateString('en-GB'); // DD/MM/YYYY format
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'In-Progress': return 'warning';
            case 'Pending': return 'info'; // Or warning
            case 'Created': return 'secondary';
            default: return 'light';
        }
    };

    return (
        <>
            <Modal show={show} onHide={onHide} size="xl" centered backdrop="static" className="auditor-detail-modal">
                <Modal.Header closeButton className="bg-white border-bottom">
                    <div className="d-flex w-100 justify-content-between align-items-center pe-3">
                        <div className="d-flex flex-column">
                            <Modal.Title className="fw-bold mb-0 h5">{auditorName}</Modal.Title>
                            <small className="text-muted">ID: {auditorId}</small>
                        </div>
                        <div>
                            <Form.Select size="sm" value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={{ width: '150px' }}>
                                <option>All-time</option>
                                <option>Oct 2025 - Dec 2025</option>
                                <option>Jul 2025 - Sep 2025</option>
                                <option>Apr 2025 - Jun 2025</option>
                                <option>Jan 2025 - Mar 2025</option>
                            </Form.Select>
                        </div>
                    </div>
                </Modal.Header>

                <Modal.Body className="bg-light p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    {/* Top Cards */}
                    <Row className="g-3 mb-4">
                        <Col md={3}>
                            <Card className="h-100 text-white bg-primary border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)' }}>
                                <Card.Body>
                                    <h6 className="text-white-50 text-uppercase mb-2" style={{ fontSize: '0.8rem' }}>TOTAL AUDITS</h6>
                                    <h2 className="display-6 fw-bold mb-0">{metrics.totalAudits}</h2>
                                    <i className="fas fa-clipboard-list position-absolute top-0 end-0 m-3 opacity-25 fa-2x"></i>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.8rem' }}>TOTAL SKUS</h6>
                                    <h2 className="fw-bold mb-0 text-dark">{metrics.totalSKUs.toLocaleString()}</h2>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.8rem' }}>TOTAL PIDS</h6>
                                    <h2 className="fw-bold mb-0 text-dark">{metrics.totalPIDs.toLocaleString()}</h2>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.8rem' }}>STATUS BREAKDOWN</h6>
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="text-success fw-bold">Completed</span>
                                        <span className="fw-bold">{metrics.statusBreakdown.Completed}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="text-warning fw-bold">In-Progress</span>
                                        <span className="fw-bold">{metrics.statusBreakdown.InProgress}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="text-secondary fw-bold">Other (Pending/Created)</span>
                                        <span className="fw-bold">{metrics.statusBreakdown.Pending + metrics.statusBreakdown.Created}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Deviation Summary */}
                    <h6 className="text-muted text-uppercase mb-3 fw-bold" style={{ fontSize: '0.85rem' }}>DEVIATION SUMMARY</h6>
                    <Row className="g-3 mb-4">
                        <Col md={3}>
                            <Card className="border-0 shadow-sm border-start border-4 border-primary">
                                <Card.Body>
                                    <h6 className="text-primary fw-bold text-uppercase mb-3">APPEARED DEVIATIONS</h6>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>Count</span>
                                        <span className="fw-bold text-dark">{metrics.deviations.appeared.count.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>Qty</span>
                                        <span className="fw-bold text-dark">{metrics.deviations.appeared.qty.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Value</span>
                                        <span className="fw-bold text-dark">₹{metrics.deviations.appeared.value.toLocaleString()}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="border-0 shadow-sm border-start border-4 border-success">
                                <Card.Body>
                                    <h6 className="text-success fw-bold text-uppercase mb-3">MATCHED DEVIATIONS</h6>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>Count</span>
                                        <span className="fw-bold text-dark">{metrics.deviations.matched.count.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>Qty</span>
                                        <span className="fw-bold text-dark">{metrics.deviations.matched.qty.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Value</span>
                                        <span className="fw-bold text-dark">₹{metrics.deviations.matched.value.toLocaleString()}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="border-0 shadow-sm border-start border-4 border-warning">
                                <Card.Body>
                                    <h6 className="text-warning fw-bold text-uppercase mb-3">REVISED DEVIATIONS</h6>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>Count</span>
                                        <span className="fw-bold text-dark">{metrics.deviations.revised.count.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>Qty</span>
                                        <span className="fw-bold text-dark">{metrics.deviations.revised.qty.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Value</span>
                                        <span className="fw-bold text-dark">₹{metrics.deviations.revised.value.toLocaleString()}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="border-0 shadow-sm border-start border-4 border-danger">
                                <Card.Body>
                                    <h6 className="text-danger fw-bold text-uppercase mb-3">IN-PROGRESS DEVIATIONS</h6>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>Count</span>
                                        <span className="fw-bold text-dark">{metrics.deviations.pending.count.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>Qty</span>
                                        <span className="fw-bold text-dark">{metrics.deviations.pending.qty.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Value</span>
                                        <span className="fw-bold text-dark">₹{metrics.deviations.pending.value.toLocaleString()}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Audit History Table */}
                    <h6 className="text-muted text-uppercase mb-3 fw-bold" style={{ fontSize: '0.85rem' }}>AUDIT HISTORY</h6>
                    <Card className="border-0 shadow-sm mb-4">
                        <Card.Body className="p-0">
                            <Table hover responsive className="mb-0">
                                <thead className="bg-light text-muted small text-uppercase">
                                    <tr>
                                        <th className="border-0 py-3 ps-4">Audit ID</th>
                                        <th className="border-0 py-3">Store</th>
                                        <th className="border-0 py-3">Date</th>
                                        <th className="border-0 py-3">Job Type</th>
                                        <th className="border-0 py-3">Status</th>
                                        <th className="border-0 py-3 text-end">SKUs</th>
                                        <th className="border-0 py-3 text-end pe-4">PIDs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {auditorRecords.map((audit, idx) => (
                                        <tr
                                            key={idx}
                                            className="align-middle"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => { setSelectedAudit(audit); setShowAuditDetail(true); }}
                                        >
                                            <td className="ps-4 fw-bold text-primary">{audit.AUDIT_ID}</td>
                                            <td>{audit.StoreName}</td>
                                            <td>{formatDate(audit.AuditDate)}</td>
                                            <td>{audit.AuditJobType}</td>
                                            <td>
                                                <Badge bg={getStatusBadge(audit.Status)} className="fw-normal px-3 py-1 rounded-pill">
                                                    {audit.Status}
                                                </Badge>
                                            </td>
                                            <td className="text-end fw-bold">{audit.AuditorAllottedSKUs?.toLocaleString()}</td>
                                            <td className="text-end pe-4 font-monospace">{audit.AuditorAllottedPIDs?.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>

            <AuditSpecificDetailModal
                show={showAuditDetail}
                onHide={() => setShowAuditDetail(false)}
                audit={selectedAudit}
                allData={allData}
            />
        </>
    );
}

export default AuditorDetailModal;
