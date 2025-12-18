import React, { useMemo, useState } from 'react';
import { Modal, Container, Row, Col, Card, Table, Badge, Form, Button, Dropdown } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AuditSpecificDetailModal from './AuditSpecificDetailModal';
import ModernDatePicker from './ModernDatePicker';

const AuditorDetailModal = ({ show, onHide, auditorId, allData }) => {
    const formatIndianCurrency = (value) => {
        if (value === undefined || value === null) return '0';
        const val = Number(value);
        if (val >= 10000000) return (val / 10000000).toFixed(2) + ' Cr';
        if (val >= 100000) return (val / 100000).toFixed(2) + ' L';
        return val.toLocaleString('en-IN');
    };
    // State for Date Selection
    // State for Date Selection
    // Initialize defaults: 1 year ago to today
    const startDefault = new Date();
    startDefault.setFullYear(startDefault.getFullYear() - 1);

    // Use Date objects for react-datepicker
    const [fromDate, setFromDate] = useState(startDefault);
    const [toDate, setToDate] = useState(new Date());

    // Store last valid range to revert on invalid selection
    const [lastValidRange, setLastValidRange] = useState({ start: startDefault, end: new Date() });
    const [dateWarning, setDateWarning] = useState('');

    const [selectedAudit, setSelectedAudit] = useState(null);
    const [showAuditDetail, setShowAuditDetail] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'AuditStartDate', direction: 'descending' });

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

    // Handle Date Changes with Validation
    const handleDateChange = (type, date) => {
        setDateWarning(''); // Clear previous warnings
        let newStart = fromDate;
        let newEnd = toDate;

        if (type === 'start') newStart = date;
        else newEnd = date;

        // 1. Basic Update
        if (type === 'start') setFromDate(date);
        else setToDate(date);

        // 2. Validation triggers only when BOTH dates are present
        if (newStart && newEnd) {
            // Check if Start is after End
            if (newStart > newEnd) {
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
            const diff = newEnd - newStart;

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
            // Set time to start and end of days for accurate comparison
            const start = new Date(fromDate);
            start.setHours(0, 0, 0, 0);

            const end = new Date(toDate);
            end.setHours(23, 59, 59, 999);

            filtered = filtered.filter(d => {
                const recordDate = new Date(d.AuditStartDate);
                return recordDate >= start && recordDate <= end;
            });
        }
        return filtered;
    }, [auditorId, allData, fromDate, toDate]);

    const sortedRecords = useMemo(() => {
        const sorted = [...auditorRecords];
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
    }, [auditorRecords, sortConfig]);

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
            acc.appeared.qty += (r.AppearedQty || 0);
            acc.appeared.value += (r.AppearedValue || 0);

            acc.matched.qty += (r.MatchedQty || 0);
            acc.matched.value += (r.MatchedValue || 0);

            acc.revised.qty += (r.RevisedQty || 0);
            acc.revised.value += (r.RevisedValue || 0);

            acc.pending.qty += (r.PendingQty || 0);
            acc.pending.value += (r.PendingValue || 0);

            return acc;
        }, {
            appeared: { qty: 0, value: 0 },
            matched: { qty: 0, value: 0 },
            revised: { qty: 0, value: 0 },
            pending: { qty: 0, value: 0 }
        });

        return { totalAudits, totalSKUs, totalPIDs, statusBreakdown, deviations };
    }, [auditorRecords]);

    const handleDownloadExcel = () => {
        const wb = utils.book_new();

        // 1. Audit History Headers (Extended)
        const historyHeaders = [
            "Store ID", "Store Name", "Date", "Job Type", "Allocated PIDs", "Allocated SKUs",
            "Appeared Dev Qty", "Appeared Dev Value",
            "Matched Dev Qty", "Matched Dev Value",
            "Revised Dev Qty", "Revised Dev Value",
            "Matched Rate (%)", "Edit Rate (%)"
        ];

        // 2. Combined Data Construction
        const summaryData = [
            ["Auditor Name", auditorName],
            ["Auditor ID", auditorId],
            ["Generated On", new Date().toLocaleString()],
            ["Period", `${fromDate ? new Date(fromDate).toLocaleDateString('en-GB') : '-'} to ${toDate ? new Date(toDate).toLocaleDateString('en-GB') : '-'}`],
            [],
            ["Metric", "Value"],
            ["Total Audits", metrics.totalAudits],
            ["Total PIDs", metrics.totalPIDs],
            ["Total SKUs", metrics.totalSKUs],
            [],
            ["Status Breakdown", "Count"],
            ["Completed", metrics.statusBreakdown.Completed],
            ["In-Progress", metrics.statusBreakdown.InProgress],
            ["Pending", metrics.statusBreakdown.Pending],
            ["Created", metrics.statusBreakdown.Created],
            [],
            ["Deviation Summary", "Qty", "Value"],
            ["Appeared", metrics.deviations.appeared.qty, metrics.deviations.appeared.value],
            ["Matched", metrics.deviations.matched.qty, metrics.deviations.matched.value],
            ["Revised", metrics.deviations.revised.qty, metrics.deviations.revised.value],
            ["In-Progress", metrics.deviations.pending.qty, metrics.deviations.pending.value],
            [],
            ["Audit History"],
            historyHeaders
        ];

        // Append Audit History Rows with calculations
        auditorRecords.forEach(r => {
            const appearedQty = r.AppearedQty || 0;
            const matchedQty = r.MatchedQty || 0;
            const matchRate = appearedQty > 0 ? ((matchedQty / appearedQty) * 100).toFixed(2) : '0.00';
            const editRate = (100 - parseFloat(matchRate)).toFixed(2);

            summaryData.push([
                r.StoreID || r.AUDIT_ID,
                r.StoreName,
                new Date(r.AuditStartDate).toLocaleDateString('en-GB'),
                r.AuditJobType,
                r.AuditorAllottedPIDs,
                r.AuditorAllottedSKUs,
                r.AppearedQty || 0, r.AppearedValue || 0,
                r.MatchedQty || 0, r.MatchedValue || 0,
                r.RevisedQty || 0, r.RevisedValue || 0,
                matchRate + '%',
                editRate + '%'
            ]);
        });

        const ws = utils.aoa_to_sheet(summaryData);

        // Set column widths
        ws['!cols'] = [
            { wch: 25 }, { wch: 30 }, { wch: 15 }, { wch: 25 },
            { wch: 15 }, { wch: 15 },
            { wch: 18 }, { wch: 18 },
            { wch: 18 }, { wch: 18 },
            { wch: 18 }, { wch: 18 },
            { wch: 15 }, { wch: 15 }
        ];

        utils.book_append_sheet(wb, ws, "Auditor Report");
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
        doc.text(`Period: ${fromDate ? new Date(fromDate).toLocaleDateString('en-GB') : '-'} to ${toDate ? new Date(toDate).toLocaleDateString('en-GB') : '-'}`, 14, 40);

        // Metrics Table
        autoTable(doc, {
            startY: 46,
            head: [['Category', 'Details']],
            body: [
                ['Total Audits', metrics.totalAudits],
                ['Total PIDs', metrics.totalPIDs.toLocaleString()],
                ['Total SKUs', metrics.totalSKUs.toLocaleString()],
                ['Completed Audits', metrics.statusBreakdown.Completed],
                ['In-Progress Audits', metrics.statusBreakdown.InProgress],
            ],
            theme: 'striped',
            headStyles: { fillColor: [41, 128, 185] }
        });

        // Deviation Summary Table
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Deviation Stage', 'Qty', 'Value (Rs.)']],
            body: [
                ['Appeared', metrics.deviations.appeared.qty.toLocaleString('en-IN'), metrics.deviations.appeared.value.toLocaleString('en-IN')],
                ['Matched', metrics.deviations.matched.qty.toLocaleString('en-IN'), metrics.deviations.matched.value.toLocaleString('en-IN')],
                ['Revised', metrics.deviations.revised.qty.toLocaleString('en-IN'), metrics.deviations.revised.value.toLocaleString('en-IN')],
            ],
            theme: 'grid',
            headStyles: { fillColor: [243, 156, 18] }
        });

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Store ID', 'Store', 'Date', 'Type', 'App. Qty', 'App. Val', 'Mat. Qty', 'Mat. Val', 'Rev. Qty', 'Rev. Val', 'Match %', 'Edit %']],
            body: auditorRecords.map(r => {
                const appearedQty = r.AppearedQty || 0;
                const matchedQty = r.MatchedQty || 0;
                const matchRate = appearedQty > 0 ? ((matchedQty / appearedQty) * 100).toFixed(2) : '0.00';
                const editRate = (100 - parseFloat(matchRate)).toFixed(2);

                return [
                    r.StoreID || r.AUDIT_ID,
                    r.StoreName,
                    new Date(r.AuditStartDate).toLocaleDateString('en-GB'),
                    r.AuditJobType,
                    (r.AppearedQty || 0).toLocaleString('en-IN'), (r.AppearedValue || 0).toLocaleString('en-IN'),
                    (r.MatchedQty || 0).toLocaleString('en-IN'), (r.MatchedValue || 0).toLocaleString('en-IN'),
                    (r.RevisedQty || 0).toLocaleString('en-IN'), (r.RevisedValue || 0).toLocaleString('en-IN'),
                    matchRate + '%',
                    editRate + '%'
                ]
            }),
            theme: 'plain',
            styles: { fontSize: 6, cellPadding: 1 },
            headStyles: { fillColor: [52, 73, 94], textColor: 255 },
            columnStyles: {
                0: { cellWidth: 15 },
                1: { cellWidth: 20 },
                2: { cellWidth: 15 },
                // Compact other columns
            }
        });

        const pdfFileName = `Auditor_${auditorName.replace(/\s+/g, '_')}_Report_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(pdfFileName);
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
                <Modal.Header closeButton style={{ zIndex: 10, position: 'relative' }}>
                    <div className="w-100">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="d-flex flex-column">
                                <Modal.Title className="fw-bold mb-0 h5">{auditorName}</Modal.Title>
                                <small className="text-muted">ID: {auditorId}</small>
                            </div>
                            <div className="d-flex align-items-center gap-2">
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

                                    <span className="small fw-bold text-muted">From</span>
                                    <ModernDatePicker
                                        selected={fromDate}
                                        onChange={(date) => handleDateChange('start', date)}
                                        placeholderText="From date"
                                        maxDate={toDate}
                                    />
                                    <span className="small fw-bold text-muted">To</span>
                                    <ModernDatePicker
                                        selected={toDate}
                                        onChange={(date) => handleDateChange('end', date)}
                                        placeholderText="To date"
                                        minDate={fromDate}
                                    />
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
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.8rem' }}>TOTAL PIDS</h6>
                                    <h2 className="fw-bold mb-0 text-dark">{formatIndianCurrency(metrics.totalPIDs)}</h2>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.8rem' }}>TOTAL SKUS</h6>
                                    <h2 className="fw-bold mb-0 text-dark">{formatIndianCurrency(metrics.totalSKUs)}</h2>
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
                                        <span>Qty</span>
                                        <span className="fw-bold text-dark">{formatIndianCurrency(metrics.deviations.appeared.qty)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Value</span>
                                        <span className="fw-bold text-dark">₹{formatIndianCurrency(metrics.deviations.appeared.value)}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="border-0 shadow-sm border-start border-4 border-success">
                                <Card.Body>
                                    <h6 className="text-success fw-bold text-uppercase mb-3">MATCHED DEVIATIONS</h6>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>Qty</span>
                                        <span className="fw-bold text-dark">{formatIndianCurrency(metrics.deviations.matched.qty)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Value</span>
                                        <span className="fw-bold text-dark">₹{formatIndianCurrency(metrics.deviations.matched.value)}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="border-0 shadow-sm border-start border-4 border-warning">
                                <Card.Body>
                                    <h6 className="text-warning fw-bold text-uppercase mb-3">REVISED DEVIATIONS</h6>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>Qty</span>
                                        <span className="fw-bold text-dark">{formatIndianCurrency(metrics.deviations.revised.qty)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Value</span>
                                        <span className="fw-bold text-dark">₹{formatIndianCurrency(metrics.deviations.revised.value)}</span>
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
                                        <th className="border-0 py-3 ps-4" onClick={() => requestSort('StoreID')} style={{ cursor: 'pointer' }}>
                                            Store ID {getSortIcon('StoreID')}
                                        </th>
                                        <th className="border-0 py-3" onClick={() => requestSort('StoreName')} style={{ cursor: 'pointer' }}>
                                            Store {getSortIcon('StoreName')}
                                        </th>
                                        <th className="border-0 py-3" onClick={() => requestSort('AuditStartDate')} style={{ cursor: 'pointer' }}>
                                            Date {getSortIcon('AuditStartDate')}
                                        </th>
                                        <th className="border-0 py-3" onClick={() => requestSort('AuditJobType')} style={{ cursor: 'pointer' }}>
                                            Job Type {getSortIcon('AuditJobType')}
                                        </th>
                                        <th className="border-0 py-3 text-end" onClick={() => requestSort('AuditorAllottedPIDs')} style={{ cursor: 'pointer' }}>
                                            PIDs {getSortIcon('AuditorAllottedPIDs')}
                                        </th>
                                        <th className="border-0 py-3 text-end" onClick={() => requestSort('AuditorAllottedSKUs')} style={{ cursor: 'pointer' }}>
                                            SKUs {getSortIcon('AuditorAllottedSKUs')}
                                        </th>
                                        <th className="border-0 py-3 text-end" onClick={() => requestSort('AppearedQty')} style={{ cursor: 'pointer' }}>
                                            QTY {getSortIcon('AppearedQty')}
                                        </th>
                                        <th className="border-0 py-3 text-end pe-4" onClick={() => requestSort('AuditorAuditedValue')} style={{ cursor: 'pointer' }}>
                                            Audited Value {getSortIcon('AuditorAuditedValue')}
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
                                            <td className="ps-4 fw-bold text-primary">{audit.StoreID || audit.AUDIT_ID}</td>
                                            <td>{audit.StoreName}</td>
                                            <td>{formatDate(audit.AuditStartDate)}</td>
                                            <td>{audit.AuditJobType}</td>
                                            <td className="text-end font-monospace">{formatIndianCurrency(audit.AuditorAllottedPIDs)}</td>
                                            <td className="text-end fw-bold">{formatIndianCurrency(audit.AuditorAllottedSKUs)}</td>
                                            <td className="text-end fw-bold">{formatIndianCurrency(audit.AppearedQty)}</td>
                                            <td className="text-end pe-4 fw-bold">₹{formatIndianCurrency(audit.AuditorAuditedValue)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal >

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
