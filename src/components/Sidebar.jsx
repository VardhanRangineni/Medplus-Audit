import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import medplusIcon from '../assets/Group 1420.png';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    {
      path: '/',
      icon: 'fas fa-store',
      label: 'Store Coverage',
    },
    {
      path: '/live-audit',
      icon: 'fas fa-clipboard-list',
      label: 'Live Audit',
    },
    {
      path: '/auditor-performance',
      icon: 'fas fa-user-check',
      label: 'Auditor Performance',
    },
    {
      path: '/supervisor-approvals',
      icon: 'fas fa-user-shield',
      label: 'Supervisor',
    },
    {
      path: '/store-pid-allotment',
      icon: 'fas fa-tasks',
      label: 'Store PID Allotment',
      supervisorOnly: true
    }
  ];

  return (
    <aside 
      className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-header">
        <div className="logo-container">
          <img src={medplusIcon} alt="MedPlus" className="logo-icon" style={{ width: '32px', height: '32px' }} />
          {isExpanded && <span className="logo-text">Audit Dashboard</span>}
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            end={item.path === '/'}
          >
            <i className={item.icon}></i>
            {isExpanded && (
              <div className="nav-text">
                <span className="nav-label">{item.label}</span>
                <span className="nav-description">{item.description}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <i className="fas fa-user-circle"></i>
          {isExpanded && (
            <div className="user-details">
              <span className="user-name">HOD Admin</span>
              <span className="user-role">Audit Head</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
