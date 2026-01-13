import { Card } from 'react-bootstrap';
import './KPICard.css';

const KPICard = ({ title, value, subtitle, icon, color = 'primary', onClick, trend }) => {
  return (
    <Card 
      className={`kpi-card border-0 shadow-sm h-100 ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="flex-grow-1">
            <p className="text-muted small mb-1 fw-semibold text-uppercase">{title}</p>
            <h2 className={`mb-0 fw-bold text-${color}`}>{value}</h2>
            {subtitle && (
              <div className="text-muted small mb-0 mt-1">{subtitle}</div>
            )}
          </div>
          {icon && (
            <div className={`kpi-icon bg-${color} bg-opacity-10 text-${color}`}>
              <i className={icon}></i>
            </div>
          )}
        </div>
        {trend && (
          <div className={`trend-indicator ${trend.direction}`}>
            <i className={`fas fa-arrow-${trend.direction === 'up' ? 'up' : 'down'} me-1`}></i>
            {trend.value}
          </div>
        )}
        {onClick && (
          <div className="text-end mt-auto">
            <small className="text-primary fw-semibold">
              Click for details <i className="fas fa-chevron-right ms-1"></i>
            </small>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default KPICard;
