import React from 'react';
import { Modal, Card, Badge, Table, Button, Dropdown } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AuditSpecificDetailModal = ({ show, onHide, audit, allData }) => {
    if (!audit) return null;

    const formatDate = (timestamp) => {
        if (!timestamp) return '-';
        return new Date(timestamp).toLocaleDateString('en-GB');
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'In-Progress': return 'primary'; // Mapped to primary as per earlier logic/comment
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
    const deviations = calculateMetrics(audit.PendingCount);

    const appeared = {
        count: audit.AppearedCount,
        qty: audit.AppearedQty,
        value: audit.AppearedValue
    };

    const participatingAuditors = allData ? allData.filter(d => d.AUDIT_ID === audit.AUDIT_ID) : [];

    const handleDownloadExcel = () => {
        const wb = utils.book_new();

        // 1. Summary Sheet
        const summaryData = [
            ["Audit ID", audit.AUDIT_ID],
            ["Store Name", audit.StoreName],
            ["Date", formatDate(audit.AuditDate)],
            ["Status", audit.Status],
            [],
            ["Re-Audit Category", "Count", "Qty", "Value"],
            ["Appeared", appeared.count, appeared.qty, appeared.value],
            ["Matched", matched.count, matched.qty, matched.value],
            ["Revised", revised.count, revised.qty, revised.value],
            ["Deviations", deviations.count, deviations.qty, deviations.value],
        ];
        const wsSummary = utils.aoa_to_sheet(summaryData);
        wsSummary['!cols'] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 20 }];
        utils.book_append_sheet(wb, wsSummary, "Audit Summary");

        // 2. Participating Auditors Sheet
        const auditorsData = participatingAuditors.map(r => ({
            "Auditor Name": r.AuditorName,
            "ID": r.AuditorID,
            "Allocated SKUs": r.AuditorAllottedSKUs,
            "Completion %": `${r.CompletionPercent}%`,
            "Status": r.Status
        }));
        const wsAuditors = utils.json_to_sheet(auditorsData);
        wsAuditors['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];
        utils.book_append_sheet(wb, wsAuditors, "Participating Auditors");

        writeFile(wb, `Audit_${audit.AUDIT_ID}_Report.xlsx`);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(16);
        doc.text(`Audit Details: ${audit.AUDIT_ID}`, 14, 20);

        doc.setFontSize(10);
        doc.text(`Store: ${audit.StoreName}`, 14, 28);
        doc.text(`Date: ${formatDate(audit.AuditDate)}`, 14, 34);
        doc.text(`Status: ${audit.Status}`, 14, 40);

        // Re-Audit Summary Table
        autoTable(doc, {
            startY: 45,
            head: [['Re-Audit Category', 'Count', 'Qty', 'Value (INR)']],
            body: [
                ['Appeared', appeared.count, appeared.qty, appeared.value],
                ['Matched', matched.count, matched.qty, matched.value],
                ['Revised', revised.count, revised.qty, revised.value],
                ['Deviations', deviations.count, deviations.qty, deviations.value],
            ],
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] }
        });

        // Participating Auditors Table
        if (participatingAuditors.length > 0) {
            autoTable(doc, {
                startY: doc.lastAutoTable.finalY + 15,
                head: [['Auditor Name', 'ID', 'Make SKUs', 'Comp %', 'Status']],
                body: participatingAuditors.map(r => [
                    r.AuditorName,
                    r.AuditorID,
                    r.AuditorAllottedSKUs,
                    `${r.CompletionPercent}%`,
                    r.Status
                ]),
                theme: 'striped',
                headStyles: { fillColor: [52, 73, 94] }
            });
        }

        doc.save(`Audit_${audit.AUDIT_ID}_Report.pdf`);
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg" backdrop="static" className="audit-specific-modal" backdropClassName="audit-specific-backdrop">
            <Modal.Header closeButton className="border-0 pb-0">
                <div className="d-flex w-100 justify-content-between align-items-center pe-3">
                    <Modal.Title className="fw-bold h5">Audit Details</Modal.Title>
                    <Dropdown>
                        <Dropdown.Toggle
                            size="sm"
                            className="d-flex align-items-center gap-2 fw-bold shadow-sm"
                            style={{ backgroundColor: '#0dcaf0', color: 'white', border: 'none' }}
                            id="audit-download-dropdown"
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
                </div>
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
                {participatingAuditors.length > 0 && (
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
                                        {participatingAuditors.map((record, idx) => (
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
