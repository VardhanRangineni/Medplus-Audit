import React, { useMemo, useState } from 'react';
import { Modal, Container, Row, Col, Card, Table, Badge, Form, Button, Dropdown } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AuditSpecificDetailModal from './AuditSpecificDetailModal';

const SupervisorDetailModal = ({ show, onHide, supervisorId, allData }) => {

    // Initialize defaults: 1 year ago to today
    const today = new Date().toISOString().split('T')[0];
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const oneYearAgo = lastYear.toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(oneYearAgo);
    const [endDate, setEndDate] = useState(today);
    const [selectedAudit, setSelectedAudit] = useState(null);
    const [showAuditDetail, setShowAuditDetail] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'AUDIT_ID', direction: 'ascending' });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <i className="fas fa-sort text-muted ms-1 small"></i>;
        return sortConfig.direction === 'ascending'
            ? <i className="fas fa-sort-up text-primary ms-1 small"></i>
            : <i className="fas fa-sort-down text-primary ms-1 small"></i>;
    };

    // Filter data for this supervisor
    const supervisorRecords = useMemo(() => {
        if (!supervisorId || !allData) return [];
        let filtered = allData.filter(d => d.SupervisorID === supervisorId);


        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            // Set end date to end of day to include records on that day
            end.setHours(23, 59, 59, 999);

            filtered = filtered.filter(d => {
                const date = new Date(d.AuditDate);
                return date >= start && date <= end;
            });
        }
        return filtered;
    }, [supervisorId, allData, startDate, endDate]);

    const sortedRecords = useMemo(() => {
        const sorted = [...supervisorRecords];
        if (sortConfig.key) {
            sorted.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sorted;
    }, [supervisorRecords, sortConfig]);

    // Specific Supervisor Details (Name from first record)
    const supervisorName = supervisorRecords.length > 0 ? supervisorRecords[0].SupervisorName : 'Unknown';

    // Calculate Metrics
    const metrics = useMemo(() => {
        const totalAudits = supervisorRecords.length;
        const totalSKUs = supervisorRecords.reduce((sum, r) => sum + (r.AuditorAllottedSKUs || 0), 0);
        const totalPIDs = supervisorRecords.reduce((sum, r) => sum + (r.AuditorAllottedPIDs || 0), 0);

        const statusBreakdown = {
            Completed: supervisorRecords.filter(r => r.Status === 'Completed').length,
            InProgress: supervisorRecords.filter(r => r.Status === 'In-Progress').length,
            Pending: supervisorRecords.filter(r => r.Status === 'Pending').length,
            Created: supervisorRecords.filter(r => r.Status === 'Created').length,
        };

        const deviations = supervisorRecords.reduce((acc, r) => {
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
    }, [supervisorRecords]);

    // Format Date
    const formatDate = (timestamp) => {
        if (!timestamp) return '-';
        return new Date(timestamp).toLocaleDateString('en-GB');
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'In-Progress': return 'warning';
            case 'Pending': return 'info';
            case 'Created': return 'secondary';
            default: return 'light';
        }
    };

    const handleDownloadExcel = () => {
        const wb = utils.book_new();

        // 1. Supervisor Summary Sheet
        const summaryData = [
            ["Supervisor Name", supervisorName],
            ["Supervisor ID", supervisorId],
            ["Date Range", `${formatDate(startDate)} - ${formatDate(endDate)}`],
            [],
            ["Metrics Summary"],
            ["Total Audits", metrics.totalAudits],
            ["Total SKUs", metrics.totalSKUs],
            ["Total PIDs", metrics.totalPIDs],
            [],
            ["Status Breakdown"],
            ["Completed", metrics.statusBreakdown.Completed],
            ["In-Progress", metrics.statusBreakdown.InProgress],
            ["Pending/Created", metrics.statusBreakdown.Pending + metrics.statusBreakdown.Created],
            [],
            ["Deviation Summary", "Count", "Qty", "Value"],
            ["Appeared", metrics.deviations.appeared.count, metrics.deviations.appeared.qty, metrics.deviations.appeared.value],
            ["Matched", metrics.deviations.matched.count, metrics.deviations.matched.qty, metrics.deviations.matched.value],
            ["Revised", metrics.deviations.revised.count, metrics.deviations.revised.qty, metrics.deviations.revised.value],
            ["In-Progress/Pending", metrics.deviations.pending.count, metrics.deviations.pending.qty, metrics.deviations.pending.value],
        ];
        const wsSummary = utils.aoa_to_sheet(summaryData);
        wsSummary['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 20 }];
        utils.book_append_sheet(wb, wsSummary, "Supervisor Summary");

        // 2. Audit History Sheet
        const historyData = sortedRecords.map(r => ({
            "Audit ID": r.AUDIT_ID,
            "Store Name": r.StoreName,
            "Date": formatDate(r.AuditDate),
            "Job Type": r.AuditJobType,
            "Status": r.Status,
            "SKUs": r.AuditorAllottedSKUs,
            "PIDs": r.AuditorAllottedPIDs
        }));
        const wsHistory = utils.json_to_sheet(historyData);
        wsHistory['!cols'] = [{ wch: 15 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 10 }, { wch: 10 }];
        utils.book_append_sheet(wb, wsHistory, "Audit History");

        writeFile(wb, `Supervisor_${supervisorId}_Report.xlsx`);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(16);
        doc.text(`Supervisor Report: ${supervisorName}`, 14, 20);

        doc.setFontSize(10);
        doc.text(`ID: ${supervisorId}`, 14, 28);
        doc.text(`Date Range: ${formatDate(startDate)} - ${formatDate(endDate)}`, 14, 34);

        // Metrics Summary Table
        autoTable(doc, {
            startY: 40,
            head: [['Metric', 'Value']],
            body: [
                ['Total Audits', metrics.totalAudits],
                ['Total SKUs', metrics.totalSKUs.toLocaleString()],
                ['Total PIDs', metrics.totalPIDs.toLocaleString()],
                ['Completed', metrics.statusBreakdown.Completed],
                ['In-Progress', metrics.statusBreakdown.InProgress]
            ],
            theme: 'grid',
            headStyles: { fillColor: [78, 84, 200] } // Matches the primary card gradient roughly
        });

        // Deviation Summary Table
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Deviation Category', 'Count', 'Qty', 'Value (INR)']],
            body: [
                ['Appeared', metrics.deviations.appeared.count, metrics.deviations.appeared.qty, metrics.deviations.appeared.value],
                ['Matched', metrics.deviations.matched.count, metrics.deviations.matched.qty, metrics.deviations.matched.value],
                ['Revised', metrics.deviations.revised.count, metrics.deviations.revised.qty, metrics.deviations.revised.value],
                ['In-Progress', metrics.deviations.pending.count, metrics.deviations.pending.qty, metrics.deviations.pending.value],
            ],
            theme: 'striped',
            headStyles: { fillColor: [41, 128, 185] }
        });

        // Audit History Table
        if (sortedRecords.length > 0) {
            autoTable(doc, {
                startY: doc.lastAutoTable.finalY + 15,
                head: [['Audit ID', 'Store', 'Date', 'Type', 'Status', 'SKUs', 'PIDs']],
                body: sortedRecords.map(r => [
                    r.AUDIT_ID,
                    r.StoreName,
                    formatDate(r.AuditDate),
                    r.AuditJobType,
                    r.Status,
                    r.AuditorAllottedSKUs,
                    r.AuditorAllottedPIDs
                ]),
                theme: 'striped',
                headStyles: { fillColor: [52, 73, 94] }
            });
        }

        doc.save(`Supervisor_${supervisorId}_Report.pdf`);
    };

    return (
        <>
            <Modal show={show} onHide={onHide} size="xl" centered backdrop="static" className="supervisor-detail-modal">
                <Modal.Header closeButton className="bg-white border-bottom">
                    <div className="d-flex w-100 justify-content-between align-items-center pe-3">
                        <div className="d-flex flex-column">
                            <Modal.Title className="fw-bold mb-0 h5">{supervisorName}</Modal.Title>
                            <small className="text-muted">ID: {supervisorId}</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <Dropdown>
                                <Dropdown.Toggle
                                    size="sm"
                                    className="d-flex align-items-center gap-2 fw-bold shadow-sm"
                                    style={{ backgroundColor: '#0dcaf0', color: 'white', border: 'none' }}
                                    id="supervisor-download-dropdown"
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
                            <div className="d-flex align-items-center gap-1">
                                <span className="small fw-bold text-muted">From:</span>
                                <Form.Control
                                    type="date"
                                    size="sm"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    style={{ width: '130px' }}
                                />
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <span className="small fw-bold text-muted">To:</span>
                                <Form.Control
                                    type="date"
                                    size="sm"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    style={{ width: '130px' }}
                                />
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
                                        <span className="text-secondary fw-bold">Other</span>
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
                                <thead
                                    className="bg-light text-muted small text-uppercase sticky-top"
                                    style={{ top: 0, zIndex: 1 }}
                                >

                                    <tr>
                                        <th className="border-0 py-3 ps-4" onClick={() => requestSort('AUDIT_ID')} style={{ cursor: 'pointer' }}>
                                            Audit ID {getSortIcon('AUDIT_ID')}
                                        </th>
                                        <th className="border-0 py-3" onClick={() => requestSort('StoreName')} style={{ cursor: 'pointer' }}>
                                            Store {getSortIcon('StoreName')}
                                        </th>
                                        <th className="border-0 py-3" onClick={() => requestSort('AuditDate')} style={{ cursor: 'pointer' }}>
                                            Date {getSortIcon('AuditDate')}
                                        </th>
                                        <th className="border-0 py-3" onClick={() => requestSort('AuditJobType')} style={{ cursor: 'pointer' }}>
                                            Job Type {getSortIcon('AuditJobType')}
                                        </th>
                                        <th className="border-0 py-3" onClick={() => requestSort('Status')} style={{ cursor: 'pointer' }}>
                                            Status {getSortIcon('Status')}
                                        </th>
                                        <th className="border-0 py-3 text-end" onClick={() => requestSort('AuditorAllottedSKUs')} style={{ cursor: 'pointer' }}>
                                            SKUs {getSortIcon('AuditorAllottedSKUs')}
                                        </th>
                                        <th className="border-0 py-3 text-end pe-4" onClick={() => requestSort('AuditorAllottedPIDs')} style={{ cursor: 'pointer' }}>
                                            PIDs {getSortIcon('AuditorAllottedPIDs')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedRecords.map((audit, idx) => (
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

export default SupervisorDetailModal;
