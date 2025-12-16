import React, { useMemo, useState } from 'react';
import { Modal, Container, Row, Col, Card, Table, Badge, Form, Button, Dropdown } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AuditSpecificDetailModal from './AuditSpecificDetailModal';

const AuditorDetailModal = ({ show, onHide, auditorId, allData }) => {
    // State for Date Selection
    // Initialize defaults: 1 year ago to today
    const startDefault = new Date();
    startDefault.setFullYear(startDefault.getFullYear() - 1);
    const startStr = startDefault.toISOString().split('T')[0];
    const endStr = new Date().toISOString().split('T')[0];

    const [fromDate, setFromDate] = useState(startStr);
    const [toDate, setToDate] = useState(endStr);
    // Store last valid range to revert on invalid selection
    const [lastValidRange, setLastValidRange] = useState({ start: startStr, end: endStr });
    const [dateWarning, setDateWarning] = useState('');

    const [selectedAudit, setSelectedAudit] = useState(null);
    const [showAuditDetail, setShowAuditDetail] = useState(false);

    // Handle Date Changes with Validation
    const handleDateChange = (type, value) => {
        setDateWarning(''); // Clear previous warnings
        let newStart = fromDate;
        let newEnd = toDate;

        if (type === 'start') newStart = value;
        else newEnd = value;

        // 1. Basic Update
        if (type === 'start') setFromDate(value);
        else setToDate(value);

        // 2. Validation triggers only when BOTH dates are present
        if (newStart && newEnd) {
            const startD = new Date(newStart);
            const endD = new Date(newEnd);

            // Check if Start is after End
            if (startD > endD) {
                setDateWarning('From Date cannot be after To Date');
                setTimeout(() => {
                    setFromDate(lastValidRange.start);
                    setToDate(lastValidRange.end);
                    setDateWarning('');
                }, 2000);
                return;
            }

            // Check Interval > 1 Year (365 days)
            const oneYearms = 365 * 24 * 60 * 60 * 1000;
            const diff = endD - startD;

            if (diff > oneYearms) {
                setDateWarning("Interval can't be more than 1 year");
                setTimeout(() => {
                    setFromDate(lastValidRange.start);
                    setToDate(lastValidRange.end);
                    setDateWarning('');
                }, 2000);
                return;
            }

            // If Valid, update the "Last Valid" state
            setLastValidRange({ start: newStart, end: newEnd });
        } else {
            // Intermediate state is valid (clearing filter)
            setLastValidRange({ start: newStart, end: newEnd });
        }
    };

    // Filter data for this auditor
    const auditorRecords = useMemo(() => {
        if (!auditorId || !allData) return [];
        let filtered = allData.filter(d => d.AuditorID === auditorId);

        if (fromDate && toDate) {
            const startStr = fromDate;
            const endStr = toDate;

            // Basic validity check
            const startD = new Date(startStr);
            const endD = new Date(endStr);

            if (!isNaN(startD) && !isNaN(endD)) {
                filtered = filtered.filter(d => {
                    // Ensure d.AuditDate is handled correctly
                    const recordDateStr = new Date(d.AuditDate).toISOString().split('T')[0];
                    return recordDateStr >= startStr && recordDateStr <= endStr;
                });
            }
        }
        return filtered.sort((a, b) => b.AuditDate - a.AuditDate);
    }, [auditorId, allData, fromDate, toDate]);

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

    const handleDownloadExcel = () => {
        const wb = utils.book_new();

        // 1. Summary Sheet
        const summaryData = [
            ["Auditor Name", auditorName],
            ["Auditor ID", auditorId],
            ["Generated On", new Date().toLocaleString()],
            ["Period", `${fromDate} to ${toDate}`],
            [],
            ["Metric", "Value"],
            ["Total Audits", metrics.totalAudits],
            ["Total SKUs", metrics.totalSKUs],
            ["Total PIDs", metrics.totalPIDs],
            [],
            ["Status Breakdown", "Count"],
            ["Completed", metrics.statusBreakdown.Completed],
            ["In-Progress", metrics.statusBreakdown.InProgress],
            ["Pending", metrics.statusBreakdown.Pending],
            ["Created", metrics.statusBreakdown.Created],
            [],
            ["Deviation Summary", "Count", "Qty", "Value"],
            ["Appeared", metrics.deviations.appeared.count, metrics.deviations.appeared.qty, metrics.deviations.appeared.value],
            ["Matched", metrics.deviations.matched.count, metrics.deviations.matched.qty, metrics.deviations.matched.value],
            ["Revised", metrics.deviations.revised.count, metrics.deviations.revised.qty, metrics.deviations.revised.value],
            ["In-Progress", metrics.deviations.pending.count, metrics.deviations.pending.qty, metrics.deviations.pending.value],
        ];
        const wsSummary = utils.aoa_to_sheet(summaryData);

        // Set column widths for Summary
        wsSummary['!cols'] = [
            { wch: 25 }, // Metric
            { wch: 20 }, // Value / Count
            { wch: 15 }, // Qty
            { wch: 15 }  // Value
        ];

        utils.book_append_sheet(wb, wsSummary, "Summary");

        // 2. Detailed Data Sheet
        const detailedData = auditorRecords.map(r => ({
            "Audit ID": r.AUDIT_ID,
            "Store Name": r.StoreName,
            "Date": new Date(r.AuditDate).toLocaleDateString('en-GB'),
            "Job Type": r.AuditJobType,
            "Status": r.Status,
            "Allocated SKUs": r.AuditorAllottedSKUs,
            "Allocated PIDs": r.AuditorAllottedPIDs,
            "Audit Completion %": r.CompletionPercent,
        }));
        const wsDetails = utils.json_to_sheet(detailedData);

        // Set column widths for Details
        wsDetails['!cols'] = [
            { wch: 15 }, // Audit ID
            { wch: 30 }, // Store Name
            { wch: 15 }, // Date
            { wch: 25 }, // Job Type
            { wch: 15 }, // Status
            { wch: 15 }, // SKUs
            { wch: 15 }, // PIDs
            { wch: 20 }  // Completion
        ];

        utils.book_append_sheet(wb, wsDetails, "Audit Details");

        writeFile(wb, `Auditor_${auditorName.replace(/\s+/g, '_')}_metrics.xlsx`);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(16);
        doc.text("Auditor Performance Report", 14, 20);

        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
        doc.text(`Auditor: ${auditorName} (${auditorId})`, 14, 34);
        doc.text(`Period: ${fromDate} to ${toDate}`, 14, 40);

        // Metrics Table
        autoTable(doc, {
            startY: 46,
            head: [['Category', 'Details']],
            body: [
                ['Total Audits', metrics.totalAudits],
                ['Total SKUs', metrics.totalSKUs.toLocaleString()],
                ['Total PIDs', metrics.totalPIDs.toLocaleString()],
                ['Completed Audits', metrics.statusBreakdown.Completed],
                ['In-Progress Audits', metrics.statusBreakdown.InProgress],
            ],
            theme: 'striped',
            headStyles: { fillColor: [41, 128, 185] }
        });

        // Deviation Summary Table
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Deviation Stage', 'Count', 'Qty', 'Value (INR)']],
            body: [
                ['Appeared', metrics.deviations.appeared.count, metrics.deviations.appeared.qty, metrics.deviations.appeared.value],
                ['Matched', metrics.deviations.matched.count, metrics.deviations.matched.qty, metrics.deviations.matched.value],
                ['Revised', metrics.deviations.revised.count, metrics.deviations.revised.qty, metrics.deviations.revised.value],
                ['In-Progress', metrics.deviations.pending.count, metrics.deviations.pending.qty, metrics.deviations.pending.value],
            ],
            theme: 'grid',
            headStyles: { fillColor: [243, 156, 18] }
        });

        // Audit History Table
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Audit ID', 'Store', 'Date', 'Status', 'SKUs', 'Comp %']],
            body: auditorRecords.map(r => [
                r.AUDIT_ID,
                r.StoreName,
                new Date(r.AuditDate).toLocaleDateString('en-GB'),
                r.Status,
                r.AuditorAllottedSKUs,
                `${r.CompletionPercent}%`
            ]),
            theme: 'plain',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [52, 73, 94], textColor: 255 }
        });

        doc.save(`Auditor_${auditorName.replace(/\s+/g, '_')}_Report.pdf`);
    };

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
                        <div className="d-flex gap-2 align-items-center">
                            <Dropdown>
                                <Dropdown.Toggle
                                    size="sm"
                                    className="d-flex align-items-center gap-2 fw-bold shadow-sm"
                                    style={{ backgroundColor: '#0dcaf0', color: 'white', border: 'none' }}
                                    id="download-dropdown"
                                >
                                    <i className="fas fa-download"></i> Download Report
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleDownloadExcel}>
                                        <i className="fas fa-file-excel text-success me-2"></i> Export as Excel
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleDownloadPDF}>
                                        <i className="fas fa-file-pdf text-danger me-2"></i> Export as PDF
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <div className="d-flex align-items-center gap-2 position-relative">
                                {/* Warning Message Overlay */}
                                {dateWarning && (
                                    <div className="position-absolute px-2 py-1 bg-danger text-white rounded small shadow"
                                        style={{ top: '100%', right: 0, zIndex: 10, whiteSpace: 'nowrap', marginTop: '4px', fontSize: '0.75rem' }}>
                                        <i className="fas fa-exclamation-circle me-1"></i> {dateWarning}
                                    </div>
                                )}

                                <div className="d-flex align-items-center">
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-text bg-white border-end-0 text-muted ps-2 pe-1">
                                            <i className="fas fa-calendar-alt"></i>
                                        </span>
                                        <Form.Control
                                            type="date"
                                            placeholder="From date"
                                            className="border-start-0 ps-1"
                                            value={fromDate}
                                            onChange={(e) => handleDateChange('start', e.target.value)}
                                            style={{ width: '135px', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                        />
                                    </div>
                                </div>
                                <span className="text-muted small fw-bold">-</span>
                                <div className="d-flex align-items-center">
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-text bg-white border-end-0 text-muted ps-2 pe-1">
                                            <i className="fas fa-calendar-alt"></i>
                                        </span>
                                        <Form.Control
                                            type="date"
                                            placeholder="To date"
                                            className="border-start-0 ps-1"
                                            value={toDate}
                                            onChange={(e) => handleDateChange('end', e.target.value)}
                                            style={{ width: '135px', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>
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
                            <Table hover responsive className="mb-0 hover-scale-row">
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
