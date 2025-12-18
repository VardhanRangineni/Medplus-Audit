import { Modal, Table, Badge, Button } from 'react-bootstrap';

const PerformersListModal = ({ show, onHide, title, items, metricKey, metricLabel, variant }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className="border-0">
                <Modal.Title className={`fw-bold text-${variant}`}>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
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
                            {items.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="text-center">
                                        <Badge bg={variant} pill style={{ width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {idx + 1}
                                        </Badge>
                                    </td>
                                    <td className="fw-semibold">{item.name}</td>
                                    <td className="text-end font-monospace fw-bold text-dark">
                                        {typeof item.value === 'number' ? item.value.toFixed(1) : item.value}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer className="border-0 bg-light py-2">
                <Button variant="secondary" onClick={onHide} size="sm">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PerformersListModal;
