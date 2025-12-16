import React, { useState } from 'react';
import { Modal, Card, Badge, Table, Button, Dropdown } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AuditSpecificDetailModal = ({ show, onHide, audit, allData }) => {
    const [expandedAuditor, setExpandedAuditor] = useState(null);

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

    // Get all records with the same AUDIT_ID
    const participatingAuditors = allData ? allData.filter(d => d.AUDIT_ID === audit.AUDIT_ID) : [];

    // Aggregate metrics across all auditors for this audit
    const aggregatedMetrics = participatingAuditors.reduce((acc, r) => {
        acc.appearedCount += (r.AppearedCount || 0);
        acc.appearedQty += (r.AppearedQty || 0);
        acc.appearedValue += (r.AppearedValue || 0);
        acc.matchedCount += (r.MatchedCount || 0);
        acc.matchedQty += (r.MatchedQty || 0);
        acc.matchedValue += (r.MatchedValue || 0);
        acc.revisedCount += (r.RevisedCount || 0);
        acc.revisedQty += (r.RevisedQty || 0);
        acc.revisedValue += (r.RevisedValue || 0);
        acc.totalPIDs += (r.AuditorAllottedPIDs || 0);
        acc.totalSKUs += (r.AuditorAllottedSKUs || 0);
        return acc;
    }, {
        appearedCount: 0, appearedQty: 0, appearedValue: 0,
        matchedCount: 0, matchedQty: 0, matchedValue: 0,
        revisedCount: 0, revisedQty: 0, revisedValue: 0,
        totalPIDs: 0, totalSKUs: 0
    });

    const appeared = {
        count: aggregatedMetrics.appearedCount,
        qty: aggregatedMetrics.appearedQty,
        value: aggregatedMetrics.appearedValue
    };

    const matched = {
        count: aggregatedMetrics.matchedCount,
        qty: aggregatedMetrics.matchedQty,
        value: aggregatedMetrics.matchedValue
    };

    const revised = {
        count: aggregatedMetrics.revisedCount,
        qty: aggregatedMetrics.revisedQty,
        value: aggregatedMetrics.revisedValue
    };

    const handleDownloadExcel = () => {
        const wb = utils.book_new();

        // 1. Summary Sheet
        const summaryData = [
            ["Audit ID", audit.AUDIT_ID],
            ["Store Name", audit.StoreName],
            ["Start Date", formatDate(audit.AuditStartDate)],
            ["End Date", audit.Status === 'Completed' ? formatDate(audit.AuditEndDate) : '-'],
            ["Status", audit.Status],
            [],
            ["Re-Audit Category", "Count", "Qty", "Value"],
            ["Appeared", appeared.count, appeared.qty, appeared.value],
            ["Matched", matched.count, matched.qty, matched.value],
            ["Deviations", revised.count, revised.qty, revised.value],
        ];
        const wsSummary = utils.aoa_to_sheet(summaryData);
        wsSummary['!cols'] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 20 }];
        utils.book_append_sheet(wb, wsSummary, "Audit Summary");

        // 2. Participating Auditors Sheet
        const auditorsData = participatingAuditors.map(r => ({
            "ID": r.AuditorID,
            "Auditor Name": r.AuditorName,
            "PIDs": r.AuditorAllottedPIDs,
            "SKUs": r.AuditorAllottedSKUs,
            "Qty": r.AppearedQty,
            "Value (₹)": r.AppearedValue
        }));
        const wsAuditors = utils.json_to_sheet(auditorsData);
        wsAuditors['!cols'] = [{ wch: 15 }, { wch: 25 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 15 }];
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
        if (audit.Status === 'Completed') {
            doc.text(`Start Date: ${formatDate(audit.AuditStartDate)}`, 14, 34);
            doc.text(`End Date: ${formatDate(audit.AuditEndDate)}`, 14, 40);
            doc.text(`Status: ${audit.Status}`, 14, 46);
        } else {
            doc.text(`Date: ${formatDate(audit.AuditStartDate)}`, 14, 34);
            doc.text(`Status: ${audit.Status}`, 14, 40);
        }

        // Re-Audit Summary Table
        autoTable(doc, {
            startY: audit.Status === 'Completed' ? 52 : 46,
            head: [['Re-Audit Category', 'Count', 'Qty', 'Value (INR)']],
            body: [
                ['Appeared', appeared.count, appeared.qty, appeared.value],
                ['Matched', matched.count, matched.qty, matched.value],
                ['Deviations', revised.count, revised.qty, revised.value],
            ],
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] }
        });

        // Participating Auditors Table
        if (participatingAuditors.length > 0) {
            autoTable(doc, {
                startY: doc.lastAutoTable.finalY + 15,
                head: [['ID', 'Auditor Name', 'PIDs', 'SKUs', 'Qty', 'Value']],
                body: participatingAuditors.map(r => [
                    r.AuditorID,
                    r.AuditorName,
                    r.AuditorAllottedPIDs,
                    r.AuditorAllottedSKUs,
                    r.AppearedQty,
                    `₹${(r.AppearedValue || 0).toLocaleString('en-IN')}`
                ]),
                theme: 'striped',
                headStyles: { fillColor: [52, 73, 94] }
            });
        }

        doc.save(`Audit_${audit.AUDIT_ID}_Report.pdf`);
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg" backdrop="static" className="audit-specific-modal" backdropClassName="audit-specific-backdrop">
            <Modal.Header
                closeButton
                className="border-0 pb-0"
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: '0.5rem 0.5rem 0 0'
                }}
            >
                <div className="d-flex w-100 justify-content-between align-items-center pe-3">
                    <Modal.Title className="fw-bold h5 text-white">
                        <i className="fas fa-clipboard-list me-2"></i>
                        Audit Details
                    </Modal.Title>
                    <Dropdown>
                        <Dropdown.Toggle
                            size="sm"
                            className="d-flex align-items-center gap-2 fw-bold"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.3)',
                                backdropFilter: 'blur(10px)'
                            }}
                            id="audit-download-dropdown"
                        >
                            <i className="fas fa-download"></i> Export
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end" className="shadow-lg border-0">
                            <Dropdown.Item onClick={handleDownloadExcel} className="py-2">
                                <i className="fas fa-file-excel text-success me-2"></i> Export as Excel
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleDownloadPDF} className="py-2">
                                <i className="fas fa-file-pdf text-danger me-2"></i> Export as PDF
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Modal.Header>
            <Modal.Body className="p-4" style={{ backgroundColor: '#f8fafc' }}>
                {/* Hero Card */}
                <Card
                    className="border-0 mb-4 overflow-hidden"
                    style={{
                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                        borderRadius: '16px'
                    }}
                >
                    <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '12px',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white'
                                        }}
                                    >
                                        <i className="fas fa-file-invoice fa-lg"></i>
                                    </div>
                                    <div>
                                        <h4 className="fw-bold mb-0" style={{ color: '#1e293b' }}>{audit.AUDIT_ID}</h4>
                                        <span className="text-muted small">{audit.AuditJobType}</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap gap-4 mt-3">
                                    <div className="d-flex align-items-center text-muted">
                                        <i className="fas fa-store me-2" style={{ color: '#667eea' }}></i>
                                        <span className="fw-medium">{audit.StoreName}</span>
                                    </div>
                                    <div className="d-flex align-items-center text-muted">
                                        <i className="fas fa-calendar-alt me-2" style={{ color: '#10b981' }}></i>
                                        <span><strong>Start:</strong> {formatDate(audit.AuditStartDate)}</span>
                                    </div>
                                    <div className="d-flex align-items-center text-muted">
                                        <i className="fas fa-calendar-check me-2" style={{ color: '#059669' }}></i>
                                        <span><strong>End:</strong> {formatDate(audit.AuditEndDate)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-end">
                                <div className="text-muted small mb-1">Total Value</div>
                                <h3 className="fw-bold mb-0" style={{ color: '#059669' }}>
                                    ₹{appeared.value?.toLocaleString('en-IN')}
                                </h3>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                {/* Re-Audit Summary */}
                <div className="d-flex align-items-center gap-2 mb-3">
                    <div
                        style={{
                            width: '4px',
                            height: '20px',
                            borderRadius: '2px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        }}
                    ></div>
                    <h6 className="fw-bold mb-0 text-uppercase" style={{ fontSize: '0.85rem', color: '#475569', letterSpacing: '0.05em' }}>
                        Re-Audit Summary
                    </h6>
                </div>
                <Card
                    className="border-0 mb-4"
                    style={{
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        borderRadius: '12px'
                    }}
                >
                    <Card.Body className="p-0">
                        <Table responsive className="mb-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                            <thead style={{ backgroundColor: '#f1f5f9' }}>
                                <tr>
                                    <th className="py-3 ps-4 border-0 text-uppercase small fw-bold" style={{ color: '#64748b', letterSpacing: '0.05em' }}>Category</th>
                                    <th className="py-3 text-end border-0 text-uppercase small fw-bold" style={{ color: '#64748b', letterSpacing: '0.05em' }}>Count</th>
                                    <th className="py-3 text-end border-0 text-uppercase small fw-bold" style={{ color: '#64748b', letterSpacing: '0.05em' }}>Qty</th>
                                    <th className="py-3 text-end pe-4 border-0 text-uppercase small fw-bold" style={{ color: '#64748b', letterSpacing: '0.05em' }}>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td className="ps-4 py-3">
                                        <Badge pill bg="primary" className="me-2" style={{ width: '8px', height: '8px', padding: 0 }}></Badge>
                                        <span className="fw-medium">Appeared</span>
                                    </td>
                                    <td className="text-end py-3 fw-semibold">{appeared.count?.toLocaleString()}</td>
                                    <td className="text-end py-3 fw-semibold">{appeared.qty?.toLocaleString()}</td>
                                    <td className="text-end pe-4 py-3 fw-bold" style={{ color: '#0f172a' }}>₹{appeared.value?.toLocaleString('en-IN')}</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td className="ps-4 py-3">
                                        <Badge pill bg="success" className="me-2" style={{ width: '8px', height: '8px', padding: 0 }}></Badge>
                                        <span className="fw-medium">Matched</span>
                                    </td>
                                    <td className="text-end py-3 fw-semibold">{matched.count?.toLocaleString()}</td>
                                    <td className="text-end py-3 fw-semibold">{matched.qty?.toLocaleString()}</td>
                                    <td className="text-end pe-4 py-3 fw-bold" style={{ color: '#059669' }}>₹{matched.value?.toLocaleString('en-IN')}</td>
                                </tr>
                                <tr>
                                    <td className="ps-4 py-3">
                                        <Badge pill bg="warning" className="me-2" style={{ width: '8px', height: '8px', padding: 0 }}></Badge>
                                        <span className="fw-medium">Deviations</span>
                                    </td>
                                    <td className="text-end py-3 fw-semibold">{revised.count?.toLocaleString()}</td>
                                    <td className="text-end py-3 fw-semibold">{revised.qty?.toLocaleString()}</td>
                                    <td className="text-end pe-4 py-3 fw-bold" style={{ color: '#d97706' }}>₹{revised.value?.toLocaleString('en-IN')}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* Participating Auditors */}
                {participatingAuditors.length > 0 && (
                    <>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <div
                                style={{
                                    width: '4px',
                                    height: '20px',
                                    borderRadius: '2px',
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                }}
                            ></div>
                            <h6 className="fw-bold mb-0 text-uppercase" style={{ fontSize: '0.85rem', color: '#475569', letterSpacing: '0.05em' }}>
                                Participating Auditors
                            </h6>
                            <Badge bg="secondary" pill className="ms-2">{participatingAuditors.length}</Badge>
                        </div>
                        <Card
                            className="border-0"
                            style={{
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                borderRadius: '12px'
                            }}
                        >
                            <Card.Body className="p-0">
                                <Table hover responsive className="mb-0 hover-scale-row" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                                    <thead style={{ backgroundColor: '#f1f5f9' }}>
                                        <tr>
                                            <th className="py-3 ps-4 border-0 text-uppercase small fw-bold" style={{ color: '#64748b', letterSpacing: '0.05em' }}>ID</th>
                                            <th className="py-3 border-0 text-uppercase small fw-bold" style={{ color: '#64748b', letterSpacing: '0.05em' }}>Auditor Name</th>
                                            <th className="py-3 text-end border-0 text-uppercase small fw-bold" style={{ color: '#64748b', letterSpacing: '0.05em' }}>PIDs</th>
                                            <th className="py-3 text-end border-0 text-uppercase small fw-bold" style={{ color: '#64748b', letterSpacing: '0.05em' }}>SKUs</th>
                                            <th className="py-3 text-end border-0 text-uppercase small fw-bold" style={{ color: '#64748b', letterSpacing: '0.05em' }}>Qty</th>
                                            <th className="py-3 text-end pe-4 border-0 text-uppercase small fw-bold" style={{ color: '#64748b', letterSpacing: '0.05em' }}>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {participatingAuditors.map((record, idx) => (
                                            <React.Fragment key={idx}>
                                                <tr
                                                    className="align-middle"
                                                    style={{
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                        backgroundColor: expandedAuditor === idx ? '#f1f5f9' : 'transparent'
                                                    }}
                                                    onClick={() => setExpandedAuditor(expandedAuditor === idx ? null : idx)}
                                                >
                                                    <td className="ps-4 py-3">
                                                        <i className={`fas fa-chevron-${expandedAuditor === idx ? 'down' : 'right'} me-2 small`} style={{ color: '#94a3b8', transition: 'transform 0.2s' }}></i>
                                                        <Badge bg="light" text="dark" className="font-monospace px-2">{record.AuditorID}</Badge>
                                                    </td>
                                                    <td className="py-3">
                                                        <span className="fw-semibold" style={{ color: '#667eea' }}>{record.AuditorName}</span>
                                                    </td>
                                                    <td className="text-end py-3 font-monospace">{record.AuditorAllottedPIDs?.toLocaleString()}</td>
                                                    <td className="text-end py-3 font-monospace fw-medium">{record.AuditorAllottedSKUs?.toLocaleString()}</td>
                                                    <td className="text-end py-3 font-monospace">{record.AppearedQty?.toLocaleString()}</td>
                                                    <td className="text-end pe-4 py-3 fw-bold" style={{ color: '#059669' }}>₹{record.AppearedValue?.toLocaleString('en-IN')}</td>
                                                </tr>
                                                {expandedAuditor === idx && (
                                                    <tr>
                                                        <td colSpan={6} className="p-0" style={{ backgroundColor: '#f8fafc' }}>
                                                            <div className="p-3 ps-5">
                                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                                    <div style={{ width: '3px', height: '16px', borderRadius: '2px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
                                                                    <span className="fw-bold text-uppercase small" style={{ color: '#475569', letterSpacing: '0.05em' }}>Re-Audit Summary</span>
                                                                </div>
                                                                <Table size="sm" className="mb-0" style={{ maxWidth: '500px' }}>
                                                                    <thead style={{ backgroundColor: '#e2e8f0' }}>
                                                                        <tr>
                                                                            <th className="py-2 ps-3 border-0 small fw-bold" style={{ color: '#64748b' }}>Category</th>
                                                                            <th className="py-2 text-end border-0 small fw-bold" style={{ color: '#64748b' }}>Count</th>
                                                                            <th className="py-2 text-end border-0 small fw-bold" style={{ color: '#64748b' }}>Qty</th>
                                                                            <th className="py-2 text-end pe-3 border-0 small fw-bold" style={{ color: '#64748b' }}>Value</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr style={{ backgroundColor: 'white' }}>
                                                                            <td className="ps-3 py-2">
                                                                                <Badge pill bg="primary" className="me-2" style={{ width: '6px', height: '6px', padding: 0 }}></Badge>
                                                                                <span className="small">Appeared</span>
                                                                            </td>
                                                                            <td className="text-end py-2 small fw-medium">{record.AppearedCount?.toLocaleString()}</td>
                                                                            <td className="text-end py-2 small fw-medium">{record.AppearedQty?.toLocaleString()}</td>
                                                                            <td className="text-end pe-3 py-2 small fw-bold" style={{ color: '#0f172a' }}>₹{record.AppearedValue?.toLocaleString('en-IN')}</td>
                                                                        </tr>
                                                                        <tr style={{ backgroundColor: 'white' }}>
                                                                            <td className="ps-3 py-2">
                                                                                <Badge pill bg="success" className="me-2" style={{ width: '6px', height: '6px', padding: 0 }}></Badge>
                                                                                <span className="small">Matched</span>
                                                                            </td>
                                                                            <td className="text-end py-2 small fw-medium">{record.MatchedCount?.toLocaleString()}</td>
                                                                            <td className="text-end py-2 small fw-medium">{record.MatchedQty?.toLocaleString()}</td>
                                                                            <td className="text-end pe-3 py-2 small fw-bold" style={{ color: '#059669' }}>₹{record.MatchedValue?.toLocaleString('en-IN')}</td>
                                                                        </tr>
                                                                        <tr style={{ backgroundColor: 'white' }}>
                                                                            <td className="ps-3 py-2">
                                                                                <Badge pill bg="warning" className="me-2" style={{ width: '6px', height: '6px', padding: 0 }}></Badge>
                                                                                <span className="small">Deviations</span>
                                                                            </td>
                                                                            <td className="text-end py-2 small fw-medium">{record.RevisedCount?.toLocaleString()}</td>
                                                                            <td className="text-end py-2 small fw-medium">{record.RevisedQty?.toLocaleString()}</td>
                                                                            <td className="text-end pe-3 py-2 small fw-bold" style={{ color: '#d97706' }}>₹{record.RevisedValue?.toLocaleString('en-IN')}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0" style={{ backgroundColor: '#f8fafc' }}>
                <Button
                    variant="outline-secondary"
                    onClick={onHide}
                    className="px-4 py-2 fw-medium"
                    style={{ borderRadius: '8px' }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AuditSpecificDetailModal;
