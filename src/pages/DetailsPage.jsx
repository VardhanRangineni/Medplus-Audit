import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, InputGroup, Table, Button, Badge } from 'react-bootstrap';
import StoreDetailModal from '../components/StoreDetailModal';
import { mockDataService } from '../services/mockDataService';

const DetailsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title') || 'Details';
  const type = searchParams.get('type') || '';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStore, setFilterStore] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterAuditJobType, setFilterAuditJobType] = useState('');
  const [filterProcessType, setFilterProcessType] = useState('');
  const [showStoreDetail, setShowStoreDetail] = useState(false);
  const [selectedStoreData, setSelectedStoreData] = useState(null);

  // Mock data based on type
  const getData = () => {
    if (type === 'total-active-stores') {
      return [
        { storeId: 'MP001', storeName: 'Chennai Central', state: 'TN', storeType: 'Hub', status: 'Active', manager: 'Rajesh Kumar', inventoryValue: 125000 },
        { storeId: 'MP002', storeName: 'Bangalore Hub', state: 'KA', storeType: 'Hub', status: 'Active', manager: 'Lakshmi Iyer', inventoryValue: 198000 },
        { storeId: 'MP003', storeName: 'Hyderabad Main', state: 'TS', storeType: 'Retail', status: 'Active', manager: 'Mohammed Ali', inventoryValue: 167000 },
        { storeId: 'MP004', storeName: 'Mumbai Central', state: 'MH', storeType: 'Hub', status: 'Active', manager: 'Pradeep Singh', inventoryValue: 215000 },
        { storeId: 'MP005', storeName: 'Pune West', state: 'MH', storeType: 'Retail', status: 'Active', manager: 'Anjali Deshmukh', inventoryValue: 89000 }
      ];
    } else if (type === 'covered-stores') {
      return [
        { storeId: 'MP001', storeName: 'Chennai Central', state: 'TN', lastAudit: '2024-11-15', auditAge: 25, auditor: 'Amit Singh', deviationCount: 12 },
        { storeId: 'MP002', storeName: 'Bangalore Hub', state: 'KA', lastAudit: '2024-11-20', auditAge: 20, auditor: 'Priya Reddy', deviationCount: 8 },
        { storeId: 'MP003', storeName: 'Hyderabad Main', state: 'TS', lastAudit: '2024-10-28', auditAge: 43, auditor: 'Suresh Kumar', deviationCount: 15 }
      ];
    } else if (type === 'uncovered-stores') {
      return [
        { storeId: 'MP015', storeName: 'Jaipur Pink City', state: 'RJ', lastAudit: 'Never', auditAge: 0, reason: 'New Store', planDate: '2024-12-20' },
        { storeId: 'MP022', storeName: 'Lucknow Central', state: 'UP', lastAudit: 'Never', auditAge: 0, reason: 'New Store', planDate: '2024-12-25' }
      ];
    } else if (type === 'stores-recency-oct-dec') {
      return [
        { storeId: 'MP001', storeName: 'Chennai Central', state: 'TN', lastAudit: '2024-11-15', auditAge: 26, auditor: 'Amit Singh', deviationCount: 12, supervisor: 'Rajesh Kumar' },
        { storeId: 'MP002', storeName: 'Bangalore Hub', state: 'KA', lastAudit: '2024-11-20', auditAge: 21, auditor: 'Priya Reddy', deviationCount: 8, supervisor: 'Lakshmi Iyer' },
        { storeId: 'MP004', storeName: 'Mumbai Central', state: 'MH', lastAudit: '2024-10-15', auditAge: 57, auditor: 'Deepak Sharma', deviationCount: 15, supervisor: 'Pradeep Singh' },
        { storeId: 'MP005', storeName: 'Pune West', state: 'MH', lastAudit: '2024-11-05', auditAge: 36, auditor: 'Anitha Rao', deviationCount: 10, supervisor: 'Anjali Deshmukh' },
        { storeId: 'MP006', storeName: 'Delhi NCR', state: 'DL', lastAudit: '2024-11-28', auditAge: 13, auditor: 'Ravi Teja', deviationCount: 6, supervisor: 'Amit Verma' }
      ];
    } else if (type === 'stores-recency-jul-sep') {
      return [
        { storeId: 'MP003', storeName: 'Hyderabad Main', state: 'TS', lastAudit: '2024-09-15', auditAge: 87, auditor: 'Suresh Kumar', deviationCount: 18, supervisor: 'Mohammed Ali' },
        { storeId: 'MP007', storeName: 'Ahmedabad Main', state: 'GJ', lastAudit: '2024-08-20', auditAge: 113, auditor: 'Vijay Patil', deviationCount: 22, supervisor: 'Kiran Patel' },
        { storeId: 'MP008', storeName: 'Kolkata East', state: 'WB', lastAudit: '2024-09-10', auditAge: 92, auditor: 'Pooja Deshmukh', deviationCount: 14, supervisor: 'Sourav Das' },
        { storeId: 'MP009', storeName: 'Nagpur Central', state: 'MH', lastAudit: '2024-07-25', auditAge: 139, auditor: 'Arun Mehta', deviationCount: 20, supervisor: 'Pooja Deshmukh' }
      ];
    } else if (type === 'stores-recency-apr-jun') {
      return [
        { storeId: 'MP010', storeName: 'Bhopal Main', state: 'MP', lastAudit: '2024-06-18', auditAge: 176, auditor: 'Divya Shah', deviationCount: 28, supervisor: 'Anil Shukla' },
        { storeId: 'MP012', storeName: 'Surat Hub', state: 'GJ', lastAudit: '2024-05-22', auditAge: 203, auditor: 'Ramesh Gupta', deviationCount: 32, supervisor: 'Dipak Shah' },
        { storeId: 'MP018', storeName: 'Coimbatore Main', state: 'TN', lastAudit: '2024-04-10', auditAge: 245, auditor: 'Sneha Reddy', deviationCount: 35, supervisor: 'Ramesh Babu' }
      ];
    } else if (type === 'stores-recency-jan-mar') {
      return [
        { storeId: 'MP033', storeName: 'Chandigarh Hub', state: 'PB', lastAudit: '2024-03-05', auditAge: 281, auditor: 'Karthik Kumar', deviationCount: 42, supervisor: 'Meera Kapoor' },
        { storeId: 'MP041', storeName: 'Indore Main', state: 'MP', lastAudit: '2024-01-20', auditAge: 326, auditor: 'Meena Iyer', deviationCount: 48, supervisor: 'Rahul Joshi' }
      ];
    } else if (type === 'audit-created') {
      return [
        { storeId: 'MP015', storeName: 'Jaipur Pink City', state: 'RJ', supervisor: 'Vikram Singh', createdDate: '2024-12-08', scheduledDate: '2024-12-15', totalSKUs: 3200, auditors: 'Not Assigned', auditJobType: 'Full Audit', processType: 'Product Audit' },
        { storeId: 'MP022', storeName: 'Lucknow Central', state: 'UP', supervisor: 'Sanjay Gupta', createdDate: '2024-12-09', scheduledDate: '2024-12-16', totalSKUs: 2800, auditors: 'Not Assigned', auditJobType: 'Partial/Random Audit', processType: 'Batch Audit' },
        { storeId: 'MP033', storeName: 'Chandigarh Hub', state: 'PB', supervisor: 'Meera Kapoor', createdDate: '2024-12-10', scheduledDate: '2024-12-18', totalSKUs: 4100, auditors: 'Not Assigned', auditJobType: 'Full Audit', processType: 'Product Audit' },
        { storeId: 'MP041', storeName: 'Indore Main', state: 'MP', supervisor: 'Rahul Joshi', createdDate: '2024-12-10', scheduledDate: '2024-12-20', totalSKUs: 3500, auditors: 'Not Assigned', auditJobType: 'Select SKUs', processType: 'Batch Audit' }
      ];
    } else if (type === 'audit-in-progress') {
      return [
        { storeId: 'MP001', storeName: 'Chennai Central', state: 'TN', supervisor: 'Rajesh Kumar', startDate: '2024-12-01', progress: 77.4, completedSKUs: 3250, totalSKUs: 4200, daysRunning: 10, auditJobType: 'Full Audit', processType: 'Product Audit' },
        { storeId: 'MP002', storeName: 'Bangalore Hub', state: 'KA', supervisor: 'Lakshmi Iyer', startDate: '2024-12-03', progress: 71.8, completedSKUs: 2800, totalSKUs: 3900, daysRunning: 8, auditJobType: 'Full Audit', processType: 'Batch Audit' },
        { storeId: 'MP003', storeName: 'Hyderabad Main', state: 'TS', supervisor: 'Mohammed Ali', startDate: '2024-12-05', progress: 78.8, completedSKUs: 4100, totalSKUs: 5200, daysRunning: 6, auditJobType: 'Partial/Random Audit', processType: 'Product Audit' },
        { storeId: 'MP004', storeName: 'Pune West', state: 'MH', supervisor: 'Pradeep Singh', startDate: '2024-12-07', progress: 59.7, completedSKUs: 1850, totalSKUs: 3100, daysRunning: 4, auditJobType: 'Select SKUs', processType: 'Batch Audit' },
        { storeId: 'MP005', storeName: 'Mumbai Central', state: 'MH', supervisor: 'Neha Sharma', startDate: '2024-12-08', progress: 61.5, completedSKUs: 2950, totalSKUs: 4800, daysRunning: 3, auditJobType: 'Full Audit', processType: 'Product Audit' }
      ];
    } else if (type === 'audit-pending') {
      return [
        { storeId: 'MP007', storeName: 'Ahmedabad Main', state: 'GJ', supervisor: 'Kiran Patel', pausedDate: '2024-12-06', reason: 'Inventory Mismatch', completedSKUs: 1200, totalSKUs: 3600, daysOnHold: 5, auditJobType: 'Full Audit', processType: 'Product Audit' },
        { storeId: 'MP012', storeName: 'Surat Hub', state: 'GJ', supervisor: 'Dipak Shah', pausedDate: '2024-12-07', reason: 'Staff Shortage', completedSKUs: 950, totalSKUs: 2800, daysOnHold: 4, auditJobType: 'Partial/Random Audit', processType: 'Batch Audit' },
        { storeId: 'MP018', storeName: 'Coimbatore Main', state: 'TN', supervisor: 'Ramesh Babu', pausedDate: '2024-12-08', reason: 'System Issue', completedSKUs: 1850, totalSKUs: 4200, daysOnHold: 3, auditJobType: 'Select SKUs', processType: 'Product Audit' }
      ];
    } else if (type === 'audit-completed') {
      return [
        { storeId: 'MP006', storeName: 'Delhi NCR', state: 'DL', supervisor: 'Amit Verma', startDate: '2024-11-20', endDate: '2024-11-28', totalSKUs: 4500, duration: 8, deviations: 12, auditJobType: 'Full Audit', processType: 'Product Audit' },
        { storeId: 'MP008', storeName: 'Kolkata East', state: 'WB', supervisor: 'Sourav Das', startDate: '2024-11-22', endDate: '2024-11-30', totalSKUs: 3800, duration: 8, deviations: 18, auditJobType: 'Partial/Random Audit', processType: 'Batch Audit' },
        { storeId: 'MP009', storeName: 'Nagpur Central', state: 'MH', supervisor: 'Pooja Deshmukh', startDate: '2024-11-25', endDate: '2024-12-02', totalSKUs: 3200, duration: 7, deviations: 8, auditJobType: 'Full Audit', processType: 'Product Audit' },
        { storeId: 'MP010', storeName: 'Bhopal Main', state: 'MP', supervisor: 'Anil Shukla', startDate: '2024-11-26', endDate: '2024-12-03', totalSKUs: 2900, duration: 7, deviations: 15, auditJobType: 'Select SKUs', processType: 'Batch Audit' }
      ];
    } else if (type === 'audit-progress') {
      const storeName = searchParams.get('store') || '';
      const storeAuditorMap = {
        'Chennai Central': [
          { auditor: 'Amit Singh', assignedSKUs: 1200, completedSKUs: 950, completionRate: 79.2, valueCovered: 125000, matchRate: 95.2 },
          { auditor: 'Priya Reddy', assignedSKUs: 1500, completedSKUs: 1250, completionRate: 83.3, valueCovered: 168000, matchRate: 96.8 },
          { auditor: 'Suresh Kumar', assignedSKUs: 1500, completedSKUs: 1050, completionRate: 70.0, valueCovered: 142000, matchRate: 91.5 }
        ],
        'Bangalore Hub': [
          { auditor: 'Deepak Sharma', assignedSKUs: 1950, completedSKUs: 1400, completionRate: 71.8, valueCovered: 185000, matchRate: 94.8 },
          { auditor: 'Anitha Rao', assignedSKUs: 1950, completedSKUs: 1400, completionRate: 71.8, valueCovered: 175000, matchRate: 93.5 }
        ],
        'Hyderabad Main': [
          { auditor: 'Ravi Teja', assignedSKUs: 1300, completedSKUs: 1025, completionRate: 78.8, valueCovered: 142000, matchRate: 92.3 },
          { auditor: 'Sneha Reddy', assignedSKUs: 1300, completedSKUs: 1025, completionRate: 78.8, valueCovered: 138000, matchRate: 95.7 },
          { auditor: 'Karthik Kumar', assignedSKUs: 1300, completedSKUs: 1025, completionRate: 78.8, valueCovered: 156000, matchRate: 91.2 },
          { auditor: 'Meena Iyer', assignedSKUs: 1300, completedSKUs: 1025, completionRate: 78.8, valueCovered: 148000, matchRate: 94.1 }
        ],
        'Pune West': [
          { auditor: 'Vijay Patil', assignedSKUs: 1550, completedSKUs: 925, completionRate: 59.7, valueCovered: 98000, matchRate: 88.5 },
          { auditor: 'Pooja Deshmukh', assignedSKUs: 1550, completedSKUs: 925, completionRate: 59.7, valueCovered: 102000, matchRate: 90.2 }
        ],
        'Mumbai Central': [
          { auditor: 'Arun Mehta', assignedSKUs: 1600, completedSKUs: 983, completionRate: 61.5, valueCovered: 135000, matchRate: 93.8 },
          { auditor: 'Divya Shah', assignedSKUs: 1600, completedSKUs: 983, completionRate: 61.5, valueCovered: 128000, matchRate: 92.1 },
          { auditor: 'Ramesh Gupta', assignedSKUs: 1600, completedSKUs: 984, completionRate: 61.5, valueCovered: 142000, matchRate: 94.5 }
        ]
      };
      return storeAuditorMap[storeName] || [];
    } else if (type === 'deviation-private---invoiced') {
      return [
        { skuCode: 'MED001', productName: 'Paracetamol 500mg', store: 'Chennai Central', state: 'TN', systemQty: 500, physicalQty: 480, variance: -20, value: 2400, auditor: 'Amit Singh', auditDate: '2024-12-01' },
        { skuCode: 'MED045', productName: 'Vitamin D3 Tablets', store: 'Bangalore Hub', state: 'KA', systemQty: 300, physicalQty: 285, variance: -15, value: 3200, auditor: 'Priya Reddy', auditDate: '2024-12-03' },
        { skuCode: 'MED089', productName: 'Calcium Supplements', store: 'Mumbai Central', state: 'MH', systemQty: 450, physicalQty: 420, variance: -30, value: 4100, auditor: 'Suresh Kumar', auditDate: '2024-12-05' },
        { skuCode: 'MED123', productName: 'Iron Tablets', store: 'Hyderabad Main', state: 'TS', systemQty: 200, physicalQty: 190, variance: -10, value: 1800, auditor: 'Deepak Sharma', auditDate: '2024-12-06' }
      ];
    } else if (type === 'deviation-private---contra-short') {
      return [
        { skuCode: 'MED002', productName: 'Ibuprofen 400mg', store: 'Chennai Central', state: 'TN', systemQty: 600, physicalQty: 550, variance: -50, value: 5500, auditor: 'Amit Singh', auditDate: '2024-12-01', contraStatus: 'Pending' },
        { skuCode: 'MED056', productName: 'Multivitamin Capsules', store: 'Pune West', state: 'MH', systemQty: 400, physicalQty: 370, variance: -30, value: 3800, auditor: 'Anitha Rao', auditDate: '2024-12-04', contraStatus: 'Approved' },
        { skuCode: 'MED078', productName: 'Omega-3 Fish Oil', store: 'Delhi NCR', state: 'DL', systemQty: 250, physicalQty: 230, variance: -20, value: 2900, auditor: 'Ravi Teja', auditDate: '2024-12-07', contraStatus: 'Pending' }
      ];
    } else if (type === 'deviation-private---contra-excess') {
      return [
        { skuCode: 'MED003', productName: 'Cough Syrup 100ml', store: 'Bangalore Hub', state: 'KA', systemQty: 150, physicalQty: 180, variance: 30, value: 3200, auditor: 'Priya Reddy', auditDate: '2024-12-02', contraStatus: 'Approved' },
        { skuCode: 'MED067', productName: 'Antiseptic Cream', store: 'Kolkata East', state: 'WB', systemQty: 200, physicalQty: 235, variance: 35, value: 4100, auditor: 'Sneha Reddy', auditDate: '2024-12-05', contraStatus: 'Pending' },
        { skuCode: 'MED091', productName: 'Hand Sanitizer 500ml', store: 'Ahmedabad Main', state: 'GJ', systemQty: 300, physicalQty: 325, variance: 25, value: 2800, auditor: 'Karthik Kumar', auditDate: '2024-12-08', contraStatus: 'Approved' }
      ];
    } else if (type === 'deviation-private---excess-submitted') {
      return [
        { skuCode: 'MED004', productName: 'Bandages 10cm', store: 'Hyderabad Main', state: 'TS', systemQty: 500, physicalQty: 550, variance: 50, value: 4200, auditor: 'Mohammed Ali', auditDate: '2024-12-03', submitDate: '2024-12-04', status: 'Submitted' },
        { skuCode: 'MED082', productName: 'Cotton Swabs Pack', store: 'Jaipur Pink City', state: 'RJ', systemQty: 350, physicalQty: 385, variance: 35, value: 2900, auditor: 'Meena Iyer', auditDate: '2024-12-06', submitDate: '2024-12-07', status: 'Submitted' }
      ];
    } else if (type === 'deviation-non-private---invoiced') {
      return [
        { skuCode: 'GEN001', productName: 'Aspirin Generic 75mg', store: 'Chennai Central', state: 'TN', systemQty: 800, physicalQty: 760, variance: -40, value: 3800, auditor: 'Amit Singh', auditDate: '2024-12-01' },
        { skuCode: 'GEN023', productName: 'Generic Antibiotic', store: 'Mumbai Central', state: 'MH', systemQty: 600, physicalQty: 575, variance: -25, value: 4500, auditor: 'Vijay Patil', auditDate: '2024-12-04' },
        { skuCode: 'GEN045', productName: 'Pain Relief Generic', store: 'Bangalore Hub', state: 'KA', systemQty: 450, physicalQty: 430, variance: -20, value: 3200, auditor: 'Pooja Deshmukh', auditDate: '2024-12-06' }
      ];
    } else if (type === 'deviation-non-private---contra-short') {
      return [
        { skuCode: 'GEN002', productName: 'Generic Diabetes Med', store: 'Pune West', state: 'MH', systemQty: 500, physicalQty: 465, variance: -35, value: 4800, auditor: 'Pradeep Singh', auditDate: '2024-12-02', contraStatus: 'Approved' },
        { skuCode: 'GEN034', productName: 'BP Control Generic', store: 'Hyderabad Main', state: 'TS', systemQty: 400, physicalQty: 375, variance: -25, value: 3500, auditor: 'Arun Mehta', auditDate: '2024-12-05', contraStatus: 'Pending' }
      ];
    } else if (type === 'deviation-non-private---contra-excess') {
      return [
        { skuCode: 'GEN003', productName: 'Generic Antacid', store: 'Delhi NCR', state: 'DL', systemQty: 300, physicalQty: 340, variance: 40, value: 3600, auditor: 'Divya Shah', auditDate: '2024-12-03', contraStatus: 'Approved' },
        { skuCode: 'GEN056', productName: 'Generic Eye Drops', store: 'Kolkata East', state: 'WB', systemQty: 250, physicalQty: 280, variance: 30, value: 2900, auditor: 'Ramesh Gupta', auditDate: '2024-12-07', contraStatus: 'Pending' }
      ];
    } else if (type === 'deviation-non-private---excess-submitted') {
      return [
        { skuCode: 'GEN004', productName: 'Generic Cough Syrup', store: 'Chennai Central', state: 'TN', systemQty: 200, physicalQty: 230, variance: 30, value: 2800, auditor: 'Amit Singh', auditDate: '2024-12-04', submitDate: '2024-12-05', status: 'Submitted' },
        { skuCode: 'GEN067', productName: 'Generic Cold Relief', store: 'Bangalore Hub', state: 'KA', systemQty: 350, physicalQty: 375, variance: 25, value: 2400, auditor: 'Priya Reddy', auditDate: '2024-12-08', submitDate: '2024-12-09', status: 'Submitted' }
      ];
    }
    return [];
  };

  const data = getData();
  
  const filteredData = data.filter(item => {
    const matchesSearch = Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStore = !filterStore || item.storeName?.includes(filterStore);
    const matchesState = !filterState || item.state === filterState;
    const matchesAuditJobType = !filterAuditJobType || item.auditJobType === filterAuditJobType;
    const matchesProcessType = !filterProcessType || item.processType === filterProcessType;
    return matchesSearch && matchesStore && matchesState && matchesAuditJobType && matchesProcessType;
  });

  const states = [...new Set(data.map(item => item.state).filter(Boolean))];
  const auditJobTypes = [...new Set(data.map(item => item.auditJobType).filter(Boolean))];
  const processTypes = [...new Set(data.map(item => item.processType).filter(Boolean))];

  const exportToExcel = () => {
    console.log('Exporting to Excel...', filteredData);
    alert('Export functionality would download Excel file here');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterStore('');
    setFilterState('');
    setFilterAuditJobType('');
    setFilterProcessType('');
  };

  // Add units to column headers based on field names
  const formatColumnHeader = (key) => {
    // First, handle the splitting while preserving common acronyms
    let label = key
      // Replace camelCase with spaces, but preserve consecutive capitals (acronyms)
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Don't split consecutive uppercase letters that are acronyms
      .replace(/([A-Z])([A-Z][a-z])/g, '$1$2')
      .toUpperCase()
      .trim();
    
    // Add units based on field names
    if (key.includes('value') || key.includes('Value')) return label + ' (₹)';
    if (key.includes('quantity') || key.includes('Quantity') || key.includes('Qty')) return label + ' (units)';
    if (key.includes('progress') || key.includes('Progress')) return label + ' (%)';
    if (key.includes('completionRate') || key.includes('matchRate') || key.includes('editRate')) return label + ' (%)';
    if (key.includes('time') || key.includes('Time') || key.includes('duration') || key.includes('Duration')) return label + ' (hrs)';
    if (key.includes('age') || key.includes('Age') || key.includes('days') || key.includes('Days')) return label + ' (days)';
    if (key.includes('count') || key.includes('Count')) return label + ' (items)';
    if (key.includes('sku') || key.includes('SKU')) return label + ' (count)';
    
    return label;
  };

  // Determine if store click is enabled for this view
  const isStoreClickable = [
    'total-active-stores',
    'covered-stores',
    'uncovered-stores',
    'stores-recency-oct-dec',
    'stores-recency-jul-sep',
    'stores-recency-apr-jun',
    'stores-recency-jan-mar',
    'audit-created',
    'audit-in-progress',
    'audit-pending',
    'audit-completed'
  ].includes(type);

  const handleRowClick = async (row) => {
    console.log('Row clicked:', row);
    console.log('Is clickable:', isStoreClickable);
    console.log('Store ID:', row.storeId);
    
    if (!isStoreClickable || !row.storeId) {
      console.log('Click ignored - not clickable or no storeId');
      return;
    }
    
    try {
      console.log('Fetching store data for:', row.storeId);
      const storeData = await mockDataService.getStoreDetailedInfo(row.storeId);
      console.log('Store data received:', storeData);
      if (storeData) {
        setSelectedStoreData(storeData);
        setShowStoreDetail(true);
      } else {
        console.log('No store data returned');
      }
    } catch (error) {
      console.error('Error fetching store details:', error);
      alert('Error loading store details: ' + error.message);
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Button variant="outline-primary" onClick={() => navigate(-1)} className="mb-2">
                <i className="fas fa-arrow-left me-2"></i>Back
              </Button>
              <h2 className="mb-0">{title}</h2>
              <p className="text-muted">
                Showing {filteredData.length} of {data.length} records
                {isStoreClickable && (
                  <span className="ms-2 text-primary">
                    <i className="fas fa-info-circle me-1"></i>
                    Click on any store row to view detailed information
                  </span>
                )}
              </p>
            </div>
            <Button variant="success" onClick={exportToExcel}>
              <i className="fas fa-file-excel me-2"></i>Export to Excel
            </Button>
          </div>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search across all fields..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={2}>
              <Form.Select value={filterState} onChange={(e) => setFilterState(e.target.value)}>
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Control
                placeholder="Filter by store..."
                value={filterStore}
                onChange={(e) => setFilterStore(e.target.value)}
              />
            </Col>
            {auditJobTypes.length > 0 && (
              <Col md={2}>
                <Form.Select value={filterAuditJobType} onChange={(e) => setFilterAuditJobType(e.target.value)}>
                  <option value="">All Audit Types</option>
                  {auditJobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Col>
            )}
            {processTypes.length > 0 && (
              <Col md={2}>
                <Form.Select value={filterProcessType} onChange={(e) => setFilterProcessType(e.target.value)}>
                  <option value="">All Process Types</option>
                  {processTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Col>
            )}
            <Col md={1}>
              <Button variant="outline-secondary" className="w-100" onClick={resetFilters}>
                <i className="fas fa-redo me-2"></i>Reset
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body className="p-0">
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <Table striped hover responsive className="mb-0">
              <thead style={{ position: 'sticky', top: 0, background: 'white', zIndex: 1 }}>
                <tr>
                  {Object.keys(filteredData[0] || {}).map(key => (
                    <th key={key}>{formatColumnHeader(key)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, idx) => (
                    <tr 
                      key={idx}
                      onClick={() => handleRowClick(row)}
                      style={{ 
                        cursor: isStoreClickable && row.storeId ? 'pointer' : 'default',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (isStoreClickable && row.storeId) {
                          e.currentTarget.style.backgroundColor = '#e7f3ff';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '';
                      }}
                    >
                      {Object.entries(row).map(([key, value], i) => (
                        <td key={i}>
                          {key === 'status' ? (
                            <Badge bg="success">{value}</Badge>
                          ) : key === 'inventoryValue' || key === 'value' ? (
                            `₹${Number(value).toLocaleString()}`
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="100" className="text-center py-5">
                      <i className="fas fa-inbox fa-3x text-muted mb-3 d-block"></i>
                      <p className="text-muted">No records found matching your criteria</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Store Detail Modal */}
      <StoreDetailModal 
        show={showStoreDetail}
        onHide={() => setShowStoreDetail(false)}
        storeData={selectedStoreData}
      />
    </Container>
  );
};

export default DetailsPage;
