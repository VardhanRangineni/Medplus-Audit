import React, { useMemo, useState } from 'react';
import { Modal, Container, Row, Col, Card, Table, Badge, Form, Button, Dropdown } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AuditSpecificDetailModal from './AuditSpecificDetailModal';
import ModernDatePicker from './ModernDatePicker';
import { formatIndianCurrency, formatIndianNumber } from '../utils/formatters';

const SupervisorDetailModal = ({ show, onHide, supervisorId, allData }) => {
    // Removed local formatIndianCurrency to use shared utility

    // State for Date Selection
    // Initialize defaults: 1 year ago to today
    const startDefault = new Date();
    startDefault.setFullYear(startDefault.getFullYear() - 1);

    // Use Date objects for react-datepicker
    const [startDate, setStartDate] = useState(startDefault);
    const [endDate, setEndDate] = useState(new Date());

    // Store last valid range to revert on invalid selection
    const [lastValidRange, setLastValidRange] = useState({ start: startDefault, end: new Date() });
    const [dateWarning, setDateWarning] = useState('');

    const [selectedAudit, setSelectedAudit] = useState(null);
    const [showAuditDetail, setShowAuditDetail] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'AUDIT_ID', direction: 'ascending' });

    // Handle Date Changes with Validation
    const handleDateChange = (type, date) => {
        setDateWarning(''); // Clear previous warnings
        let newStart = startDate;
        let newEnd = endDate;

        if (type === 'start') newStart = date;
        else newEnd = date;

        // 1. Basic Update
        if (type === 'start') setStartDate(date);
        else setEndDate(date);

        // 2. Validation triggers only when BOTH dates are present
        if (newStart && newEnd) {
            // Check if Start is after End
            if (newStart > newEnd) {
                setDateWarning('From Date cannot be after To Date');
                setTimeout(() => {
                    setStartDate(lastValidRange.start);
                    setEndDate(lastValidRange.end);
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
                    setStartDate(lastValidRange.start);
                    setEndDate(lastValidRange.end);
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
            // Set time to start and end of dates
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);

            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);

            filtered = filtered.filter(d => {
                const recordDate = new Date(d.AuditStartDate);
                return recordDate >= start && recordDate <= end;
            });
        }
        return filtered;
    }, [supervisorId, allData, startDate, endDate]);

    // Aggregate records by AUDIT_ID - sum up PIDs, SKUs, Value
    const aggregatedRecords = useMemo(() => {
        const auditMap = {};
        supervisorRecords.forEach(record => {
            const auditId = record.AUDIT_ID;
            if (!auditMap[auditId]) {
                auditMap[auditId] = {
                    AUDIT_ID: auditId,
                    StoreID: record.StoreID,
                    StoreName: record.StoreName,
                    AuditStartDate: record.AuditStartDate,
                    AuditEndDate: record.AuditEndDate,
                    AuditJobType: record.AuditJobType,
                    Status: record.Status,
                    StoreAuditValue: record.StoreAuditValue || 0,
                    AuditorAllottedPIDs: 0,
                    AuditorAllottedSKUs: 0,
                    AppearedValue: 0,
                    AppearedQty: 0,
                    AppearedSKUs: 0,
                    MatchedSKUs: 0,
                    RevisedSKUs: 0,
                    AuditorIDs: new Set(),
                    SupervisedDates: new Set()
                };
            }
            auditMap[auditId].AuditorAllottedPIDs += (record.AuditorAllottedPIDs || 0);
            auditMap[auditId].AuditorAllottedSKUs += (record.AuditorAllottedSKUs || 0);
            auditMap[auditId].AppearedValue += (record.AppearedValue || 0);
            auditMap[auditId].AppearedQty += (record.AppearedQty || 0);
            auditMap[auditId].AppearedSKUs += (record.AppearedSKUs || 0);
            auditMap[auditId].MatchedSKUs += (record.MatchedSKUs || 0);
            auditMap[auditId].RevisedSKUs += (record.RevisedSKUs || 0);

            if (record.AuditorID) auditMap[auditId].AuditorIDs.add(record.AuditorID);
            if (record.DayWiseSummary) {
                Object.keys(record.DayWiseSummary).forEach(d => auditMap[auditId].SupervisedDates.add(d));
            }
        });
        return Object.values(auditMap).map(a => ({
            ...a,
            AuditorCount: a.AuditorIDs.size,
            DaysSupervisedCount: a.SupervisedDates.size || 1 // Fallback to 1 if no daily summary
        }));
    }, [supervisorRecords]);

    const sortedRecords = useMemo(() => {
        const sorted = [...aggregatedRecords];
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
    }, [aggregatedRecords, sortConfig]);

    // Specific Supervisor Details (Name from first record)
    const supervisorName = supervisorRecords.length > 0 ? supervisorRecords[0].SupervisorName : 'Unknown';

    // Calculate Metrics
    const metrics = useMemo(() => {
        const totalAudits = aggregatedRecords.length; // Count unique audits
        const totalSKUs = supervisorRecords.reduce((sum, r) => sum + (r.AuditorAllottedSKUs || 0), 0);
        const totalPIDs = supervisorRecords.reduce((sum, r) => sum + (r.AuditorAllottedPIDs || 0), 0);
        const totalValue = supervisorRecords.reduce((sum, r) => sum + (r.AuditorAuditedValue || 0), 0);

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
            acc.appeared.skus += (r.AppearedSKUs || 0);

            acc.matched.count += (r.MatchedCount || 0);
            acc.matched.qty += (r.MatchedQty || 0);
            acc.matched.value += (r.MatchedValue || 0);
            acc.matched.skus += (r.MatchedSKUs || 0);

            acc.revised.count += (r.RevisedCount || 0);
            acc.revised.qty += (r.RevisedQty || 0);
            acc.revised.value += (r.RevisedValue || 0);
            acc.revised.skus += (r.RevisedSKUs || 0);

            acc.pending.count += (r.PendingCount || 0);
            acc.pending.qty += (r.PendingQty || 0);
            acc.pending.value += (r.PendingValue || 0);

            return acc;
        }, {
            appeared: { count: 0, qty: 0, value: 0, skus: 0 },
            matched: { count: 0, qty: 0, value: 0, skus: 0 },
            revised: { count: 0, qty: 0, value: 0, skus: 0 },
            pending: { count: 0, qty: 0, value: 0 }
        });

        // Calculate Days Supervised
        const supervisedDates = new Set();
        const auditors = new Set();
        supervisorRecords.forEach(r => {
            if (r.DayWiseSummary) {
                Object.keys(r.DayWiseSummary).forEach(date => supervisedDates.add(date));
            }
            if (r.AuditorID) {
                auditors.add(r.AuditorID);
            }
        });
        const daysSupervised = supervisedDates.size;
        const totalAuditorsSupervised = auditors.size;

        return { totalAudits, totalSKUs, totalPIDs, totalValue, daysSupervised, totalAuditorsSupervised, statusBreakdown, deviations };
    }, [supervisorRecords, aggregatedRecords]);

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
            ["Total Auditors Supervised", metrics.totalAuditorsSupervised],
            ["Days Supervised", metrics.daysSupervised],
            ["Total PIDs", metrics.totalPIDs],
            ["Total SKUs", metrics.totalSKUs],
            ["Total Value (Rs.)", metrics.totalValue],
            [],
            ["Audit Accuracy", "Qty", "Value"],
            ["Appeared", metrics.deviations.appeared.qty, metrics.deviations.appeared.value],
            ["Matched", metrics.deviations.matched.qty, metrics.deviations.matched.value],
            ["Revised", metrics.deviations.revised.qty, metrics.deviations.revised.value],
            [],
            ["Audit History"],
            ["Store ID", "Store Name", "Audit Date", "Job Type", "Auditors", "Days", "PIDs", "SKUs", "Quantity", "Deviation Value (MRP Rs.)", "Audited Value (MRP Rs.)"]
        ];

        // Append Audit History Rows
        sortedRecords.forEach(r => {
            summaryData.push([
                r.StoreID,
                r.StoreName,
                formatDate(r.AuditStartDate),
                r.AuditJobType,
                r.AuditorCount,
                r.DaysSupervisedCount,
                r.AuditorAllottedPIDs,
                r.AuditorAllottedSKUs,
                r.AppearedQty || 0,
                r.AppearedValue || 0,
                r.StoreAuditValue || 0
            ]);
        });

        const wsSummary = utils.aoa_to_sheet(summaryData);
        wsSummary['!cols'] = [
            { wch: 20 }, { wch: 25 }, { wch: 15 }, { wch: 15 },
            { wch: 10 }, { wch: 8 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 15 }, { wch: 15 }
        ];
        utils.book_append_sheet(wb, wsSummary, "Supervisor Summary");

        writeFile(wb, `Supervisor_${supervisorId}_Report.xlsx`);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF({ orientation: 'landscape' });

        // Title
        doc.setFontSize(16);
        doc.text(`Supervisor Performance Report`, 14, 20);

        doc.setFontSize(10);
        doc.text(`Supervisor: ${supervisorName} (${supervisorId})`, 14, 28);
        doc.text(`Date Range: ${formatDate(startDate)} - ${formatDate(endDate)}`, 14, 34);

        // Metrics Summary Table
        autoTable(doc, {
            startY: 40,
            head: [['Metric', 'Value']],
            body: [
                ['Total Audits', metrics.totalAudits],
                ['Total Auditors Supervised', metrics.totalAuditorsSupervised],
                ['Days Supervised', metrics.daysSupervised],
                ['Total PIDs', metrics.totalPIDs.toLocaleString('en-IN')],
                ['Total SKUs', metrics.totalSKUs.toLocaleString('en-IN')],
                ['Total Value', formatIndianCurrency(metrics.totalValue).replace('₹', 'Rs. ')]
            ],
            theme: 'grid',
            headStyles: { fillColor: [78, 84, 200] }, // Matches the primary card gradient roughly
            margin: { left: 14 },
            columnStyles: {
                1: { halign: 'right' }
            }
        });

        // Deviation Summary Table
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Deviation Category', 'Qty', 'Value (Rs.)']],
            body: [
                ['Appeared', metrics.deviations.appeared.qty.toLocaleString('en-IN'), metrics.deviations.appeared.value.toLocaleString('en-IN')],
                ['Matched', metrics.deviations.matched.qty.toLocaleString('en-IN'), metrics.deviations.matched.value.toLocaleString('en-IN')],
                ['Revised', metrics.deviations.revised.qty.toLocaleString('en-IN'), metrics.deviations.revised.value.toLocaleString('en-IN')],
            ],
            theme: 'striped',
            headStyles: { fillColor: [41, 128, 185], halign: 'center' },
            bodyStyles: { halign: 'right' },
            columnStyles: { 0: { halign: 'left' } },
            margin: { left: 14 }
        });

        // Audit History Table
        if (sortedRecords.length > 0) {
            // New Page for History if needed, or just continue if space permits based on previous content?
            // User requested "all pages landscape", which is now set.
            // Let's add a page break if it's getting tight, or let autoTable handle it.
            // But let's verify if we need a dedicated page for History like we did for Auditor.
            // The Auditor one forced a new page. Let's force a new page here too for consistency with "put audit history in 2nd page" request from before, 
            // although the current prompt says "all pages... landscape".
            doc.addPage();
            doc.text("Audit History", 14, 15);

            autoTable(doc, {
                startY: 20,
                head: [['Store ID', 'Store Name', 'Audit Date', 'Job Type', 'Auditors Count', 'Days Supervised', 'Allocated PIDs', 'Allocated SKUs', 'Appeared Qty', 'Dev Value (MRP Rs.)', 'Audited Value (MRP Rs.)']],
                body: sortedRecords.map(r => [
                    r.StoreID,
                    r.StoreName,
                    formatDate(r.AuditStartDate),
                    r.AuditJobType,
                    r.AuditorCount,
                    r.DaysSupervisedCount,
                    (r.AuditorAllottedPIDs || 0).toLocaleString('en-IN'),
                    (r.AuditorAllottedSKUs || 0).toLocaleString('en-IN'),
                    (r.AppearedQty || 0).toLocaleString('en-IN'),
                    (r.AppearedValue || 0).toLocaleString('en-IN'),
                    (r.StoreAuditValue || 0).toLocaleString('en-IN')
                ]),
                theme: 'striped',
                headStyles: { fillColor: [52, 73, 94], halign: 'center' },
                bodyStyles: { halign: 'right' },
                margin: { left: 14 },
                columnStyles: {
                    0: { cellWidth: 25, halign: 'left' },
                    1: { cellWidth: 40, halign: 'left' },
                    2: { halign: 'center' },
                    3: { halign: 'left' }
                    // spread the rest
                }
            });
        }

        doc.save(`Supervisor_${supervisorId}_Report.pdf`);
    };

    return (
        <>
            <Modal show={show} onHide={onHide} size="xl" centered backdrop="static" className="supervisor-detail-modal">
                <Modal.Header closeButton style={{ zIndex: 10, position: 'relative' }}>
                    <div className="w-100">
                        <div className="d-flex justify-content-between align-items-start mb-3">
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
                                        selected={startDate}
                                        onChange={(date) => handleDateChange('start', date)}
                                        placeholderText="From date"
                                        maxDate={endDate}
                                    />
                                    <span className="small fw-bold text-muted">To</span>
                                    <ModernDatePicker
                                        selected={endDate}
                                        onChange={(date) => handleDateChange('end', date)}
                                        placeholderText="To date"
                                        minDate={startDate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Header>

                <Modal.Body className="bg-light p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    {/* Top Cards */}
                    <Row className="g-3 mb-4 row-cols-2 row-cols-md-3">
                        <Col>
                            <Card className="h-100 text-white bg-primary border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)' }}>
                                <Card.Body>
                                    <h6 className="text-white-50 text-uppercase mb-2" style={{ fontSize: '0.8rem' }}>TOTAL AUDITS</h6>
                                    <h2 className="display-6 fw-bold mb-0">{metrics.totalAudits}</h2>
                                    <i className="fas fa-clipboard-list position-absolute top-0 end-0 m-3 opacity-25 fa-2x"></i>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.8rem' }}>AUDITORS SUPERVISED</h6>
                                    <h2 className="fw-bold mb-0 text-dark">{metrics.totalAuditorsSupervised}</h2>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.8rem' }}>DAYS SUPERVISED</h6>
                                    <h2 className="fw-bold mb-0 text-dark">{metrics.daysSupervised}</h2>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.8rem' }}>TOTAL PIDS</h6>
                                    <h2 className="fw-bold mb-0 text-dark">{formatIndianNumber(metrics.totalPIDs, true)}</h2>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.8rem' }}>TOTAL SKUS</h6>
                                    <h2 className="fw-bold mb-0 text-dark">{formatIndianNumber(metrics.totalSKUs, true)}</h2>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.8rem' }}>TOTAL VALUE</h6>
                                    <h2 className="fw-bold mb-0 text-dark">{formatIndianCurrency(metrics.totalValue)}</h2>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Deviation Summary */}
                    <h6 className="text-muted text-uppercase mb-3 fw-bold" style={{ fontSize: '0.85rem' }}>Audit Accuracy</h6>
                    <Row className="g-3 mb-4">
                        <Col md={3}>
                            <Card className="border-0 shadow-sm border-start border-4 border-primary">
                                <Card.Body>
                                    <h6 className="text-primary fw-bold text-uppercase mb-3">APPEARED DEVIATIONS</h6>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>SKUs</span>
                                        <span className="fw-bold text-dark">{formatIndianNumber(metrics.deviations.appeared.skus, true)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>Qty</span>
                                        <span className="fw-bold text-dark">{formatIndianNumber(metrics.deviations.appeared.qty, true)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Value</span>
                                        <span className="fw-bold text-dark">{formatIndianCurrency(metrics.deviations.appeared.value)}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="border-0 shadow-sm border-start border-4 border-success">
                                <Card.Body>
                                    <h6 className="text-success fw-bold text-uppercase mb-3">MATCHED DEVIATIONS</h6>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>SKUs</span>
                                        <span className="fw-bold text-dark">{formatIndianNumber(metrics.deviations.matched.skus, true)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>Qty</span>
                                        <span className="fw-bold text-dark">{formatIndianNumber(metrics.deviations.matched.qty, true)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Value</span>
                                        <span className="fw-bold text-dark">{formatIndianCurrency(metrics.deviations.matched.value)}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="border-0 shadow-sm border-start border-4 border-warning">
                                <Card.Body>
                                    <h6 className="text-warning fw-bold text-uppercase mb-3">REVISED DEVIATIONS</h6>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>SKUs</span>
                                        <span className="fw-bold text-dark">{formatIndianNumber(metrics.deviations.revised.skus, true)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1 text-muted small">
                                        <span>Qty</span>
                                        <span className="fw-bold text-dark">{formatIndianNumber(metrics.deviations.revised.qty, true)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Value</span>
                                        <span className="fw-bold text-dark">{formatIndianCurrency(metrics.deviations.revised.value)}</span>
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
                                        <th className="border-0 py-3 ps-4" onClick={() => requestSort('StoreID')} style={{ cursor: 'pointer' }}>
                                            Store ID {getSortIcon('StoreID')}
                                        </th>
                                        <th className="border-0 py-3" onClick={() => requestSort('StoreName')} style={{ cursor: 'pointer' }}>
                                            Store Name {getSortIcon('StoreName')}
                                        </th>
                                        <th className="border-0 py-3" onClick={() => requestSort('AuditStartDate')} style={{ cursor: 'pointer' }}>
                                            Audit Date {getSortIcon('AuditStartDate')}
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
                                        <th className="border-0 py-3 text-end" onClick={() => requestSort('AppearedValue')} style={{ cursor: 'pointer' }}>
                                            Deviation Value (MRP) {getSortIcon('AppearedValue')}
                                        </th>
                                        <th className="border-0 py-3 text-end pe-4" onClick={() => requestSort('StoreAuditValue')} style={{ cursor: 'pointer' }}>
                                            Audited Value (MRP) {getSortIcon('StoreAuditValue')}
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
                                            <td className="text-end font-monospace">{formatIndianNumber(audit.AuditorAllottedPIDs, true)}</td>
                                            <td className="text-end fw-bold">{formatIndianNumber(audit.AuditorAllottedSKUs, true)}</td>
                                            <td className="text-end fw-bold">{formatIndianNumber(audit.AppearedQty, true)}</td>
                                            <td className="text-end fw-bold text-danger">{formatIndianCurrency(audit.AppearedValue)}</td>
                                            <td className="text-end pe-4 fw-bold">{formatIndianCurrency(audit.StoreAuditValue)}</td>
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

export default SupervisorDetailModal;
