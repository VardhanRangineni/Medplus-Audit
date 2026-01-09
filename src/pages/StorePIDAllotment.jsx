import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Modal, Alert } from 'react-bootstrap';
import Select from 'react-select';
import './StorePIDAllotment.css';
import storesData from '../data/store_coverage_data.json';

const StorePIDAllotment = () => {
  // Supervisor's assigned stores - derived from imported data
  const supervisorStores = useMemo(() =>
    storesData.map(store => ({
      storeId: store.StoreID,
      storeName: store.StoreName,
      state: store.StateName,
      totalPIDs: store.TotalPIDs
    })),
    []);

  const [selectedStoreId, setSelectedStoreId] = useState(storesData[0]?.StoreID || '');
  const selectedStore = supervisorStores.find(s => s.storeId === selectedStoreId) || supervisorStores[0];
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [isSelectFocused, setIsSelectFocused] = useState(false);

  const availableAuditors = [
    { id: 'AUD001', name: 'Amit Singh', totalAssignedSKUs: 1245, completedCount: 843, isSupervisor: true },
    { id: 'AUD002', name: 'Priya Reddy', totalAssignedSKUs: 956, completedCount: 723 },
    { id: 'AUD003', name: 'Suresh Kumar', totalAssignedSKUs: 1534, completedCount: 1102, isLeadSupervisor: true },
    { id: 'AUD004', name: 'Deepak Sharma', totalAssignedSKUs: 1089, completedCount: 892 },
    { id: 'AUD005', name: 'Anitha Rao', totalAssignedSKUs: 734, completedCount: 589 }
  ];

  // Initial PID data with store IDs, descriptions and statuses
  const allPIDsData = {
    'INTGHYD01093': [
      { pid: 'PID001', storeId: 'INTGHYD01093', description: 'A1-56', skuCount: 245, assignStatus: 'Assigned', auditStatus: 'In Progress', auditorId: 'AUD001', auditorName: 'Amit Singh' },
      { pid: 'PID002', storeId: 'INTGHYD01093', description: 'B6-7', skuCount: 189, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID003', storeId: 'INTGHYD01093', description: 'C2-89', skuCount: 312, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID004', storeId: 'INTGHYD01093', description: 'A3-45', skuCount: 156, assignStatus: 'Assigned', auditStatus: 'Pending', auditorId: 'AUD002', auditorName: 'Priya Reddy' },
      { pid: 'PID005', storeId: 'INTGHYD01093', description: 'D1-23', skuCount: 278, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID006', storeId: 'INTGHYD01093', description: 'B8-90', skuCount: 201, assignStatus: 'Assigned', auditStatus: 'Pending', auditorId: 'AUD003', auditorName: 'Suresh Kumar' },
      { pid: 'PID007', storeId: 'INTGHYD01093', description: 'E5-67', skuCount: 167, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID008', storeId: 'INTGHYD01093', description: 'A2-34', skuCount: 234, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID009', storeId: 'INTGHYD01093', description: 'C7-12', skuCount: 198, assignStatus: 'Assigned', auditStatus: 'Completed', auditorId: 'AUD001', auditorName: 'Amit Singh' },
      { pid: 'PID010', storeId: 'INTGHYD01093', description: 'F3-78', skuCount: 289, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID011', storeId: 'INTGHYD01093', description: 'B4-56', skuCount: 176, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID012', storeId: 'INTGHYD01093', description: 'D8-91', skuCount: 223, assignStatus: 'Assigned', auditStatus: 'Pending', auditorId: 'AUD002', auditorName: 'Priya Reddy' },
      { pid: 'PID013', storeId: 'INTGHYD01093', description: 'A5-23', skuCount: 145, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID014', storeId: 'INTGHYD01093', description: 'E2-45', skuCount: 267, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID015', storeId: 'INTGHYD01093', description: 'C9-67', skuCount: 192, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null }
    ],
    'INTGHYD50061': [
      { pid: 'PID016', storeId: 'INTGHYD50061', description: 'A4-12', skuCount: 198, assignStatus: 'Assigned', auditStatus: 'In Progress', auditorId: 'AUD001', auditorName: 'Amit Singh' },
      { pid: 'PID017', storeId: 'INTGHYD50061', description: 'B2-34', skuCount: 234, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID018', storeId: 'INTGHYD50061', description: 'C5-67', skuCount: 276, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID019', storeId: 'INTGHYD50061', description: 'D3-89', skuCount: 189, assignStatus: 'Assigned', auditStatus: 'Completed', auditorId: 'AUD003', auditorName: 'Suresh Kumar' },
      { pid: 'PID020', storeId: 'INTGHYD50061', description: 'E1-45', skuCount: 312, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID021', storeId: 'INTGHYD50061', description: 'F6-23', skuCount: 156, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID022', storeId: 'INTGHYD50061', description: 'G2-78', skuCount: 245, assignStatus: 'Assigned', auditStatus: 'Pending', auditorId: 'AUD002', auditorName: 'Priya Reddy' },
      { pid: 'PID023', storeId: 'INTGHYD50061', description: 'H4-56', skuCount: 201, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID024', storeId: 'INTGHYD50061', description: 'I1-90', skuCount: 223, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID025', storeId: 'INTGHYD50061', description: 'J5-34', skuCount: 267, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID026', storeId: 'INTGHYD50061', description: 'K3-12', skuCount: 178, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID027', storeId: 'INTGHYD50061', description: 'L7-89', skuCount: 289, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null }
    ],
    'INTGHYD00601': [
      { pid: 'PID028', storeId: 'INTGHYD00601', description: 'A2-78', skuCount: 234, assignStatus: 'Assigned', auditStatus: 'In Progress', auditorId: 'AUD004', auditorName: 'Deepak Sharma' },
      { pid: 'PID029', storeId: 'INTGHYD00601', description: 'B5-23', skuCount: 198, assignStatus: 'Assigned', auditStatus: 'Pending', auditorId: 'AUD005', auditorName: 'Anitha Rao' },
      { pid: 'PID030', storeId: 'INTGHYD00601', description: 'C1-45', skuCount: 312, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID031', storeId: 'INTGHYD00601', description: 'D6-89', skuCount: 267, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID032', storeId: 'INTGHYD00601', description: 'E3-12', skuCount: 189, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID033', storeId: 'INTGHYD00601', description: 'F7-56', skuCount: 245, assignStatus: 'Assigned', auditStatus: 'Completed', auditorId: 'AUD001', auditorName: 'Amit Singh' },
      { pid: 'PID034', storeId: 'INTGHYD00601', description: 'G4-34', skuCount: 278, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID035', storeId: 'INTGHYD00601', description: 'H1-67', skuCount: 201, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID036', storeId: 'INTGHYD00601', description: 'I5-90', skuCount: 223, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID037', storeId: 'INTGHYD00601', description: 'J2-23', skuCount: 156, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID038', storeId: 'INTGHYD00601', description: 'K6-78', skuCount: 289, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID039', storeId: 'INTGHYD00601', description: 'L3-45', skuCount: 234, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID040', storeId: 'INTGHYD00601', description: 'M7-12', skuCount: 198, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID041', storeId: 'INTGHYD00601', description: 'N4-89', skuCount: 267, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID042', storeId: 'INTGHYD00601', description: 'O1-56', skuCount: 176, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID043', storeId: 'INTGHYD00601', description: 'P5-34', skuCount: 245, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID044', storeId: 'INTGHYD00601', description: 'Q2-67', skuCount: 212, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID045', storeId: 'INTGHYD00601', description: 'R6-90', skuCount: 298, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null }
    ],
    'INTGHYD00921': [
      { pid: 'PID046', storeId: 'INTGHYD00921', description: 'A6-45', skuCount: 256, assignStatus: 'Assigned', auditStatus: 'In Progress', auditorId: 'AUD002', auditorName: 'Priya Reddy' },
      { pid: 'PID047', storeId: 'INTGHYD00921', description: 'B3-78', skuCount: 189, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID048', storeId: 'INTGHYD00921', description: 'C7-23', skuCount: 234, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID049', storeId: 'INTGHYD00921', description: 'D4-56', skuCount: 298, assignStatus: 'Assigned', auditStatus: 'Pending', auditorId: 'AUD003', auditorName: 'Suresh Kumar' },
      { pid: 'PID050', storeId: 'INTGHYD00921', description: 'E1-89', skuCount: 212, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID051', storeId: 'INTGHYD00921', description: 'F5-12', skuCount: 267, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID052', storeId: 'INTGHYD00921', description: 'G2-34', skuCount: 178, assignStatus: 'Assigned', auditStatus: 'Completed', auditorId: 'AUD004', auditorName: 'Deepak Sharma' },
      { pid: 'PID053', storeId: 'INTGHYD00921', description: 'H6-67', skuCount: 245, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID054', storeId: 'INTGHYD00921', description: 'I3-90', skuCount: 223, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID055', storeId: 'INTGHYD00921', description: 'J7-45', skuCount: 289, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID056', storeId: 'INTGHYD00921', description: 'K4-78', skuCount: 201, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID057', storeId: 'INTGHYD00921', description: 'L1-23', skuCount: 234, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID058', storeId: 'INTGHYD00921', description: 'M5-56', skuCount: 198, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID059', storeId: 'INTGHYD00921', description: 'N2-89', skuCount: 276, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null }
    ],
    'INTGHYD00895': [
      { pid: 'PID060', storeId: 'INTGHYD00895', description: 'A3-67', skuCount: 245, assignStatus: 'Assigned', auditStatus: 'In Progress', auditorId: 'AUD005', auditorName: 'Anitha Rao' },
      { pid: 'PID061', storeId: 'INTGHYD00895', description: 'B7-12', skuCount: 198, assignStatus: 'Assigned', auditStatus: 'Pending', auditorId: 'AUD001', auditorName: 'Amit Singh' },
      { pid: 'PID062', storeId: 'INTGHYD00895', description: 'C4-45', skuCount: 289, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID063', storeId: 'INTGHYD00895', description: 'D1-78', skuCount: 234, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID064', storeId: 'INTGHYD00895', description: 'E5-23', skuCount: 267, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID065', storeId: 'INTGHYD00895', description: 'F2-56', skuCount: 201, assignStatus: 'Assigned', auditStatus: 'Completed', auditorId: 'AUD002', auditorName: 'Priya Reddy' },
      { pid: 'PID066', storeId: 'INTGHYD00895', description: 'G6-89', skuCount: 278, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID067', storeId: 'INTGHYD00895', description: 'H3-34', skuCount: 189, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID068', storeId: 'INTGHYD00895', description: 'I7-67', skuCount: 223, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID069', storeId: 'INTGHYD00895', description: 'J4-90', skuCount: 256, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID070', storeId: 'INTGHYD00895', description: 'K1-12', skuCount: 212, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID071', storeId: 'INTGHYD00895', description: 'L5-45', skuCount: 298, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID072', storeId: 'INTGHYD00895', description: 'M2-78', skuCount: 176, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID073', storeId: 'INTGHYD00895', description: 'N6-23', skuCount: 245, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID074', storeId: 'INTGHYD00895', description: 'O3-56', skuCount: 234, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null },
      { pid: 'PID075', storeId: 'INTGHYD00895', description: 'P7-89', skuCount: 267, assignStatus: 'Not Assigned', auditStatus: 'Pending', auditorId: null, auditorName: null }
    ]
  };

  const [allPIDs, setAllPIDs] = useState(allPIDsData);

  // Get PIDs for the selected store
  const pids = allPIDs[selectedStoreId] || [];

  const setPids = (updater) => {
    setAllPIDs(prev => ({
      ...prev,
      [selectedStoreId]: typeof updater === 'function' ? updater(prev[selectedStoreId] || []) : updater
    }));
  };
  const [selectedPIDs, setSelectedPIDs] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showBulkReassignModal, setShowBulkReassignModal] = useState(false);
  const [selectedAuditor, setSelectedAuditor] = useState('');
  const [reassignPID, setReassignPID] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'notAssigned', 'reassign'
  const [alertMessage, setAlertMessage] = useState({ show: false, type: '', message: '' });
  const [sortField, setSortField] = useState(''); // '', 'assignStatus', 'auditStatus'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'

  // Filter PIDs based on search and active filter
  const filteredPIDs = useMemo(() => {
    let filtered = pids;

    // Apply filter buttons
    if (activeFilter === 'notAssigned') {
      filtered = filtered.filter(pid => pid.assignStatus === 'Not Assigned');
    } else if (activeFilter === 'reassign') {
      filtered = filtered.filter(pid => pid.assignStatus === 'Assigned' && pid.auditStatus === 'Pending');
    }

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(pid =>
        pid.pid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pid.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pid.auditorName && pid.auditorName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let compareValue = 0;
        if (sortField === 'assignStatus') {
          compareValue = a.assignStatus.localeCompare(b.assignStatus);
        } else if (sortField === 'auditStatus') {
          compareValue = a.auditStatus.localeCompare(b.auditStatus);
        }
        return sortOrder === 'asc' ? compareValue : -compareValue;
      });
    }

    return filtered;
  }, [searchTerm, pids, activeFilter, sortField, sortOrder]);

  // Statistics
  const stats = useMemo(() => {
    const total = pids.length;
    const assigned = pids.filter(p => p.assignStatus === 'Assigned').length;
    const notAssigned = pids.filter(p => p.assignStatus === 'Not Assigned').length;
    const inProgress = pids.filter(p => p.auditStatus === 'In Progress').length;
    const completed = pids.filter(p => p.auditStatus === 'Completed').length;

    return { total, assigned, notAssigned, inProgress, completed };
  }, [pids]);

  // Calculate total SKU count for selected PIDs
  const selectedSKUCount = useMemo(() => {
    return pids
      .filter(pid => selectedPIDs.includes(pid.pid))
      .reduce((total, pid) => total + pid.skuCount, 0);
  }, [selectedPIDs, pids]);

  // Calculate assignable and reassignable counts from selected PIDs
  const selectedCounts = useMemo(() => {
    const selectedPIDsData = pids.filter(p => selectedPIDs.includes(p.pid));
    const assignable = selectedPIDsData.filter(p => p.assignStatus === 'Not Assigned').length;
    const reassignable = selectedPIDsData.filter(p => p.assignStatus === 'Assigned' && p.auditStatus === 'Pending').length;
    return { assignable, reassignable };
  }, [selectedPIDs, pids]);

  const handleSelectPID = (pidId) => {
    setSelectedPIDs(prev => {
      if (prev.includes(pidId)) {
        return prev.filter(id => id !== pidId);
      } else {
        return [...prev, pidId];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      let selectablePIDs;
      if (activeFilter === 'notAssigned') {
        // For assign: only select PIDs with 'Not Assigned' status
        selectablePIDs = filteredPIDs
          .filter(p => p.assignStatus === 'Not Assigned')
          .map(p => p.pid);
      } else if (activeFilter === 'reassign') {
        // For reassign: only select PIDs that are 'Assigned' and 'Pending'
        selectablePIDs = filteredPIDs
          .filter(p => p.assignStatus === 'Assigned' && p.auditStatus === 'Pending')
          .map(p => p.pid);
      } else if (activeFilter === 'all') {
        // For all filter: only select PIDs with 'Not Assigned' status (not reassign)
        selectablePIDs = filteredPIDs
          .filter(p => p.assignStatus === 'Not Assigned')
          .map(p => p.pid);
      }
      setSelectedPIDs(selectablePIDs);
    } else {
      setSelectedPIDs([]);
    }
  };

  const openAssignModal = (skipValidation = false) => {
    if (!skipValidation) {
      if (selectedPIDs.length === 0) {
        showAlert('warning', 'Please select at least one PID to assign');
        return;
      }

      // Check if there are any assignable PIDs
      if (selectedCounts.assignable === 0) {
        showAlert('warning', 'None of the selected PIDs can be assigned. Only unassigned PIDs can be assigned.');
        return;
      }
    }

    setShowAssignModal(true);
  };

  const formatAuditorOptionLabel = (option) => (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        {option.auditor.isLeadSupervisor && (
          <span
            className="rounded-circle bg-danger text-white d-inline-flex align-items-center justify-content-center me-2"
            style={{ width: '24px', height: '24px', fontSize: '12px', fontWeight: 'bold' }}
            title="Lead Supervisor"
          >
            LS
          </span>
        )}
        {option.auditor.isSupervisor && !option.auditor.isLeadSupervisor && (
          <span
            className="rounded-circle bg-warning text-dark d-inline-flex align-items-center justify-content-center me-2"
            style={{ width: '24px', height: '24px', fontSize: '12px', fontWeight: 'bold' }}
            title="Supervisor"
          >
            S
          </span>
        )}
        <div>
          <div className="fw-semibold">
            <span className="text-muted small me-1">{option.auditor.id} -</span>
            {option.auditor.name}
          </div>
          <small className="text-muted">
            Assigned SKUs: {option.auditor.totalAssignedSKUs.toLocaleString()} | Completed: {option.auditor.completedCount.toLocaleString()}
          </small>
        </div>
      </div>
    </div>
  );

  const openBulkReassignModal = () => {
    if (selectedPIDs.length === 0) {
      showAlert('warning', 'Please select at least one PID to reassign');
      return;
    }

    // Check if there are any reassignable PIDs
    if (selectedCounts.reassignable === 0) {
      showAlert('warning', 'None of the selected PIDs can be reassigned. Only assigned PIDs with "Pending" status can be reassigned.');
      return;
    }

    setShowBulkReassignModal(true);
  };

  const handleAssign = () => {
    if (!selectedAuditor) {
      showAlert('danger', 'Please select an auditor');
      return;
    }

    const auditor = availableAuditors.find(a => a.id === selectedAuditor);

    // Filter to only assign PIDs that are not assigned
    const assignablePIDs = pids.filter(p => selectedPIDs.includes(p.pid) && p.assignStatus === 'Not Assigned').map(p => p.pid);

    setPids(prev =>
      prev.map(pid =>
        assignablePIDs.includes(pid.pid)
          ? {
            ...pid,
            assignStatus: 'Assigned',
            auditStatus: 'Pending',
            auditorId: selectedAuditor,
            auditorName: auditor.name
          }
          : pid
      )
    );

    showAlert('success', `Successfully assigned ${assignablePIDs.length} PID(s) to ${auditor.name}`);
    setSelectedPIDs([]);
    setSelectedAuditor('');
    setShowAssignModal(false);
  };

  const openReassignModal = (pid) => {
    if (pid.auditStatus === 'In Progress' || pid.auditStatus === 'Completed') {
      showAlert('warning', `Cannot reassign - PID picking has already ${pid.auditStatus === 'Completed' ? 'completed' : 'started'}`);
      return;
    }
    setReassignPID(pid);
    setShowReassignModal(true);
  };

  const handleReassign = () => {
    if (!selectedAuditor) {
      showAlert('danger', 'Please select an auditor');
      return;
    }

    const auditor = availableAuditors.find(a => a.id === selectedAuditor);

    setPids(prev =>
      prev.map(pid =>
        pid.pid === reassignPID.pid
          ? {
            ...pid,
            auditorId: selectedAuditor,
            auditorName: auditor.name,
            auditStatus: 'Pending'
          }
          : pid
      )
    );

    showAlert('success', `Successfully reassigned ${reassignPID.pid} to ${auditor.name}`);
    setReassignPID(null);
    setSelectedAuditor('');
    setShowReassignModal(false);
  };

  const handleBulkReassign = () => {
    if (!selectedAuditor) {
      showAlert('danger', 'Please select an auditor');
      return;
    }

    const auditor = availableAuditors.find(a => a.id === selectedAuditor);

    // Filter to only reassign PIDs that are assigned and not started
    const reassignablePIDs = pids.filter(p =>
      selectedPIDs.includes(p.pid) &&
      p.assignStatus === 'Assigned' &&
      p.auditStatus === 'Pending'
    ).map(p => p.pid);

    setPids(prev =>
      prev.map(pid =>
        reassignablePIDs.includes(pid.pid)
          ? {
            ...pid,
            auditorId: selectedAuditor,
            auditorName: auditor.name,
            auditStatus: 'Pending'
          }
          : pid
      )
    );

    showAlert('success', `Successfully reassigned ${reassignablePIDs.length} PID(s) to ${auditor.name}`);
    setSelectedPIDs([]);
    setSelectedAuditor('');
    setShowBulkReassignModal(false);
  };

  const showAlert = (type, message) => {
    setAlertMessage({ show: true, type, message });
    setTimeout(() => {
      setAlertMessage({ show: false, type: '', message: '' });
    }, 4000);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle sort order if same field
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getAssignStatusBadge = (status) => {
    return status === 'Assigned' ? (
      <Badge bg="success">Assigned</Badge>
    ) : (
      <Badge bg="secondary">Not Assigned</Badge>
    );
  };

  const getAuditStatusBadge = (status) => {
    const variants = {
      'Pending': 'warning',
      'In Progress': 'primary',
      'Completed': 'success'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const handleStoreChange = (storeId) => {
    setSelectedStoreId(storeId);
    setSelectedPIDs([]);
    setSearchTerm('');
    setActiveFilter('all');
    setShowStoreDropdown(false);
  };

  return (
    <Container fluid className="store-pid-allotment py-4">
      {/* Store Selector */}
      <Row className="mb-3">
        <Col md={6}>
          <label className="form-label fw-semibold">
            <i className="fas fa-store me-2"></i>
            Select Store
          </label>
          <Select
            options={supervisorStores.map(store => ({
              value: store.storeId,
              label: `${store.storeName} - ${store.state}`,
              store: store
            }))}
            value={{
              value: selectedStore.storeId,
              label: `${selectedStore.storeName} - ${selectedStore.state}`,
              store: selectedStore
            }}
            onChange={(option) => handleStoreChange(option.value)}
            formatOptionLabel={(option) => (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">{option.store.storeName}</div>
                  <small className="text-muted">{option.store.state} | {option.store.storeId}</small>
                </div>
                <Badge bg="info" className="ms-2">{allPIDs[option.value]?.length || 0} PIDs</Badge>
              </div>
            )}
            isSearchable
            placeholder="Search and select store..."
            controlShouldRenderValue={!isSelectFocused}
            onFocus={() => setIsSelectFocused(true)}
            onBlur={() => setIsSelectFocused(false)}
            onMenuClose={() => setIsSelectFocused(false)}
          />
        </Col>
      </Row>

      {/* Store Header */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-primary">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div>
                    <h3 className="mb-1 text-primary">
                      <i className="fas fa-store me-2"></i>
                      {selectedStore.storeName}
                    </h3>
                    <p className="text-muted mb-0">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      {selectedStore.state} | Store ID: {selectedStore.storeId}
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-primary">{stats.total}</div>
                    <small className="text-muted">Total PIDs</small>
                  </div>
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-success">{stats.assigned}</div>
                    <small className="text-muted">Assigned</small>
                  </div>
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-secondary">{stats.notAssigned}</div>
                    <small className="text-muted">Unassigned</small>
                  </div>
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-info">{stats.inProgress}</div>
                    <small className="text-muted">In Progress</small>
                  </div>
                  <div className="text-center">
                    <div className="fs-4 fw-bold text-success">{stats.completed}</div>
                    <small className="text-muted">Completed</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {alertMessage.show && (
        <Alert variant={alertMessage.type} dismissible onClose={() => setAlertMessage({ show: false, type: '', message: '' })}>
          {alertMessage.message}
        </Alert>
      )}

      {/* PID Table */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <Row className="mb-3">
                <Col>
                  <h5 className="mb-0">
                    <i className="fas fa-list-check me-2 text-primary"></i>
                    PID Management
                  </h5>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={3}>
                  <Form.Control
                    type="text"
                    placeholder="Search by PID, description, or auditor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="sm"
                  />
                </Col>
                <Col md={5}>
                  <div className="d-flex gap-2">
                    <Button
                      variant={activeFilter === 'all' ? 'primary' : 'outline-primary'}
                      size="sm"
                      onClick={() => { setActiveFilter('all'); setSelectedPIDs([]) }}
                    >
                      <i className="fas fa-list me-1"></i>
                      All PIDs
                    </Button>
                    <Button
                      variant={activeFilter === 'notAssigned' ? 'primary' : 'outline-primary'}
                      size="sm"
                      onClick={() => { setActiveFilter('notAssigned'); setSelectedPIDs([]) }}
                    >
                      <i className="fas fa-user-plus me-1"></i>
                      Not Assigned
                    </Button>
                    <Button
                      variant={activeFilter === 'reassign' ? 'primary' : 'outline-primary'}
                      size="sm"
                      onClick={() => { setActiveFilter('reassign'); setSelectedPIDs([]) }}
                    >
                      <i className="fas fa-exchange-alt me-1"></i>
                      Reassign
                    </Button>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex gap-2 justify-content-end">
                    {(activeFilter === 'notAssigned' || activeFilter === 'all') && selectedCounts.assignable > 0 && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={openAssignModal}
                        disabled={selectedCounts.assignable === 0}
                      >
                        <i className="fas fa-user-plus me-1"></i>
                        Bulk Assign ({selectedCounts.assignable})
                      </Button>
                    )}
                    {activeFilter === 'reassign' && (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={openBulkReassignModal}
                        disabled={selectedCounts.reassignable === 0}
                      >
                        <i className="fas fa-exchange-alt me-1"></i>
                        Bulk Reassign ({selectedCounts.reassignable})
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
              {selectedPIDs.length > 0 && (
                <Row className="mt-3">
                  <Col>
                    <div className="selected-pids-summary">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <i className="fas fa-check-circle text-success me-2"></i>
                          <strong>{selectedPIDs.length}</strong> PID{selectedPIDs.length !== 1 ? 's' : ''} Selected
                        </div>
                        <div className="total-sku-count">
                          <i className="fas fa-boxes me-2"></i>
                          Total SKUs: <strong className="text-primary">{selectedSKUCount.toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
            </Card.Header>
            <Card.Body className="p-0">
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <Table striped hover responsive className="mb-0">
                  <thead style={{ position: 'sticky', top: 0, background: 'white', zIndex: 1 }}>
                    <tr>
                      <th style={{ width: '50px' }}>
                        <Form.Check
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectedPIDs.length > 0 && (
                            activeFilter === 'notAssigned' ? selectedPIDs.length === filteredPIDs.filter(p => p.assignStatus === 'Not Assigned').length :
                              activeFilter === 'reassign' ? selectedPIDs.length === filteredPIDs.filter(p => p.assignStatus === 'Assigned' && p.auditStatus === 'Pending').length :
                                activeFilter === 'all' ? selectedPIDs.length === filteredPIDs.filter(p => p.assignStatus === 'Not Assigned').length :
                                  false
                          )}
                        />
                      </th>
                      <th>PID</th>
                      <th>SKU Count</th>
                      <th>Description</th>
                      <th
                        onClick={() => handleSort('assignStatus')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                        className="sortable-header"
                      >
                        Assign Status
                        {sortField === 'assignStatus' && (
                          <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                        )}
                      </th>
                      <th
                        onClick={() => handleSort('auditStatus')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                        className="sortable-header"
                      >
                        Audit Status
                        {sortField === 'auditStatus' && (
                          <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>
                        )}
                      </th>
                      <th>Auditor</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPIDs.length > 0 ? (
                      filteredPIDs.map((pid) => (
                        <tr key={pid.pid}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={selectedPIDs.includes(pid.pid)}
                              onChange={() => handleSelectPID(pid.pid)}
                              disabled={
                                activeFilter === 'notAssigned' ? pid.assignStatus !== 'Not Assigned' :
                                  activeFilter === 'reassign' ? !(pid.assignStatus === 'Assigned' && pid.auditStatus === 'Pending') :
                                    activeFilter === 'all' ? pid.assignStatus !== 'Not Assigned' :
                                      true
                              }
                            />
                          </td>
                          <td>
                            <strong className="text-primary">{pid.pid}</strong>
                          </td>
                          <td>
                            <Badge bg="info" className="fw-normal">{pid.skuCount}</Badge>
                          </td>
                          <td>{pid.description}</td>
                          <td>{getAssignStatusBadge(pid.assignStatus)}</td>
                          <td>{getAuditStatusBadge(pid.auditStatus)}</td>
                          <td>
                            {pid.auditorName ? (
                              <div className="d-flex align-items-center">
                                {(() => {
                                  const auditor = availableAuditors.find(a => a.id === pid.auditorId);
                                  return (
                                    <>
                                      {auditor?.isLeadSupervisor && (
                                        <span
                                          className="rounded-circle bg-danger text-white d-inline-flex align-items-center justify-content-center me-2"
                                          style={{ width: '24px', height: '24px', fontSize: '12px', fontWeight: 'bold' }}
                                          title="Lead Supervisor"
                                        >
                                          LS
                                        </span>
                                      )}
                                      {auditor?.isSupervisor && !auditor?.isLeadSupervisor && (
                                        <span
                                          className="rounded-circle bg-warning text-dark d-inline-flex align-items-center justify-content-center me-2"
                                          style={{ width: '24px', height: '24px', fontSize: '12px', fontWeight: 'bold' }}
                                          title="Supervisor"
                                        >
                                          S
                                        </span>
                                      )}
                                      <span>
                                        <span className="text-muted small me-1">{pid.auditorId} -</span>
                                        {pid.auditorName}
                                      </span>
                                    </>
                                  );
                                })()}
                              </div>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                          <td>
                            {pid.assignStatus === 'Not Assigned' ? (
                              <Button
                                size="sm"
                                variant="outline-success"
                                onClick={() => {
                                  setSelectedPIDs([pid.pid]);
                                  openAssignModal(true);
                                }}
                                disabled={selectedPIDs.length > 0}
                              >
                                <i className="fas fa-user-plus me-1"></i>
                                Assign
                              </Button>
                            ) : pid.assignStatus === 'Assigned' && pid.auditStatus === 'Pending' ? (
                              <Button
                                size="sm"
                                variant="outline-warning"
                                onClick={() => openReassignModal(pid)}
                                disabled={selectedPIDs.length > 0}
                              >
                                <i className="fas fa-exchange-alt me-1"></i>
                                Reassign
                              </Button>
                            ) : null}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4 text-muted">
                          <i className="fas fa-search fa-3x mb-3 d-block"></i>
                          No PIDs found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Assign Modal */}
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-user-plus me-2"></i>
            Assign PIDs to Auditor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info">
            <div className="d-flex align-items-start">
              <strong className="text-nowrap me-2">Selected PIDs ({selectedCounts.assignable}):</strong>
              <span className="text-muted">{pids.filter(p => selectedPIDs.includes(p.pid) && p.assignStatus === 'Not Assigned').map(p => p.pid).join(', ')}</span>
            </div>
          </Alert>
          <Form.Group>
            <Form.Label>Select Auditor <span className="text-danger">*</span></Form.Label>
            <Select
              options={availableAuditors.map(auditor => ({
                value: auditor.id,
                label: `${auditor.id} - ${auditor.name}`,
                auditor: auditor
              }))}
              value={selectedAuditor ? {
                value: selectedAuditor,
                label: `${selectedAuditor} - ${availableAuditors.find(a => a.id === selectedAuditor)?.name}`,
                auditor: availableAuditors.find(a => a.id === selectedAuditor)
              } : null}
              onChange={(option) => setSelectedAuditor(option ? option.value : '')}
              formatOptionLabel={formatAuditorOptionLabel}
              placeholder="Choose auditor..."
              isSearchable
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAssign}>
            <i className="fas fa-check me-1"></i>
            Assign PIDs
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reassign Modal */}
      <Modal show={showReassignModal} onHide={() => setShowReassignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-exchange-alt me-2"></i>
            Reassign PID
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reassignPID && (
            <>
              <Alert variant="info">
                <strong>PID:</strong> {reassignPID.pid}
                <br />
                <div className="d-flex align-items-center">
                  <strong className="me-2">Current Auditor:</strong>
                  {(() => {
                    const auditor = availableAuditors.find(a => a.id === reassignPID.auditorId);
                    if (!auditor) return reassignPID.auditorName;

                    return (
                      <>
                        {auditor.isLeadSupervisor && (
                          <span
                            className="rounded-circle bg-danger text-white d-inline-flex align-items-center justify-content-center me-2"
                            style={{ width: '24px', height: '24px', fontSize: '12px', fontWeight: 'bold' }}
                            title="Lead Supervisor"
                          >
                            LS
                          </span>
                        )}
                        {auditor.isSupervisor && !auditor.isLeadSupervisor && (
                          <span
                            className="rounded-circle bg-warning text-dark d-inline-flex align-items-center justify-content-center me-2"
                            style={{ width: '24px', height: '24px', fontSize: '12px', fontWeight: 'bold' }}
                            title="Supervisor"
                          >
                            S
                          </span>
                        )}
                        <span>
                          <span className="text-muted small me-1">{auditor.id} -</span>
                          {auditor.name}
                        </span>
                      </>
                    );
                  })()}
                </div>
              </Alert>
              <Form.Group>
                <Form.Label>Select New Auditor <span className="text-danger">*</span></Form.Label>
                <Select
                  options={availableAuditors
                    .filter(a => a.id !== reassignPID.auditorId)
                    .map(auditor => ({
                      value: auditor.id,
                      label: `${auditor.id} - ${auditor.name}`,
                      auditor: auditor
                    }))}
                  value={selectedAuditor ? {
                    value: selectedAuditor,
                    label: `${selectedAuditor} - ${availableAuditors.find(a => a.id === selectedAuditor)?.name}`,
                    auditor: availableAuditors.find(a => a.id === selectedAuditor)
                  } : null}
                  onChange={(option) => setSelectedAuditor(option ? option.value : '')}
                  formatOptionLabel={formatAuditorOptionLabel}
                  placeholder="Choose auditor..."
                  isSearchable
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReassignModal(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleReassign}>
            <i className="fas fa-exchange-alt me-1"></i>
            Confirm Reassignment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Bulk Reassign Modal */}
      <Modal show={showBulkReassignModal} onHide={() => setShowBulkReassignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-exchange-alt me-2"></i>
            Bulk Reassign PIDs
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <strong>Selected PIDs for Reassignment:</strong> {selectedCounts.reassignable}
            <br />
            <small className="text-muted">{pids.filter(p => selectedPIDs.includes(p.pid) && p.assignStatus === 'Assigned' && p.auditStatus === 'Pending').map(p => p.pid).join(', ')}</small>
          </Alert>
          <Form.Group>
            <Form.Label>Select New Auditor <span className="text-danger">*</span></Form.Label>
            <Form.Select
              value={selectedAuditor}
              onChange={(e) => setSelectedAuditor(e.target.value)}
            >
              <option value="">Choose auditor...</option>
              {availableAuditors.map(auditor => (
                <option key={auditor.id} value={auditor.id}>
                  {auditor.name} - Total Assigned SKUs: {auditor.totalAssignedSKUs.toLocaleString()} | Completed: {auditor.completedCount.toLocaleString()}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBulkReassignModal(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleBulkReassign}>
            <i className="fas fa-exchange-alt me-1"></i>
            Confirm Bulk Reassignment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StorePIDAllotment;



