import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, InputGroup, Table, Button, Badge, Alert, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import StoreDetailModal from '../components/StoreDetailModal';
import { mockDataService } from '../services/mockDataService';
import storeCoverageData from '../data/store_coverage_data.json';
import auditDataset from '../data/audit_dataset.json';
import liveAuditSchedule from '../data/live_audit_schedule_data.json';

const DetailsPage = ({ filters = {} }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title') || 'Details';
  const type = searchParams.get('type') || '';
  const deviationParam = searchParams.get('deviationType');
  const recencyRangeParam = searchParams.get('recencyRange');
  const recencyViewParam = searchParams.get('recencyView');

  // Check if any filters are active
  const hasActiveFilters = filters.state || filters.store || filters.auditJobType || filters.auditProcessType || filters.auditStatus;

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStore, setFilterStore] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterAuditJobType, setFilterAuditJobType] = useState('');
  const [filterProcessType, setFilterProcessType] = useState('');
  const [filterBoxType, setFilterBoxType] = useState('');
  const [filterStoreStatus, setFilterStoreStatus] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [showStoreDetail, setShowStoreDetail] = useState(false);
  const [selectedStoreData, setSelectedStoreData] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [mismatchFilters, setMismatchFilters] = useState({});
  const [mismatchSearchTerms, setMismatchSearchTerms] = useState({});
  const [showTableFilters, setShowTableFilters] = useState(false);

  // Generate a deterministic pseudo-random created date from StoreID (stable across reloads)
  const randomDateForId = (id) => {
    if (!id) return new Date(2018, 0, 1).toISOString().split('T')[0];
    let h = 0;
    for (let i = 0; i < id.length; i++) {
      h = ((h << 5) - h) + id.charCodeAt(i);
      h |= 0;
    }
    const start = new Date(2015, 0, 1).getTime(); // 2015-01-01
    const end = new Date(2023, 11, 31).getTime(); // 2023-12-31
    const range = end - start;
    const t = start + (Math.abs(h) % range);
    return new Date(t).toISOString().split('T')[0];
  };

  // Mock data based on type
  const getData = () => {
    // Helper to get deterministic box type
    const getBoxType = (id) => {
      let h = 0;
      for (let i = 0; i < (id || '').length; i++) {
        h = ((h << 5) - h) + id.charCodeAt(i);
        h |= 0;
      }
      return ['Dynamic', 'Non Dynamic', 'Regular'][Math.abs(h) % 3];
    };

    const getAuditCount = (id) => {
      let h = 0;
      for (let i = 0; i < (id || '').length; i++) {
        h = ((h << 5) - h) + id.charCodeAt(i);
        h |= 0;
      }
      return (Math.abs(h) % 4) + 1;
    };

    const getAuditJobType = (id) => {
      const options = ['Expensive Category SKUs', 'Expiry', 'Full', 'partial', 'Returnable', 'Selected Skus', 'Slow Moving'];
      let h = 0;
      for (let i = 0; i < (id || '').length; i++) {
        h = ((h << 5) - h) + id.charCodeAt(i);
        h |= 0;
      }
      return options[Math.abs(h) % options.length];
    };

    // Helper to get latest audit info for a store
    // Returns a single supervisor and 3-5 auditors (deterministically generated when missing)
    const getLatestAuditInfo = (storeId) => {
      const audits = auditDataset.filter(a => a.StoreID === storeId);

      // Helper to compute a small deterministic hash from id
      const seedFromId = (id) => {
        let h = 0;
        for (let i = 0; i < (id || '').length; i++) {
          h = ((h << 5) - h) + id.charCodeAt(i);
          h |= 0;
        }
        return Math.abs(h);
      };

      // Pools to synthesise names when data is missing
      const supervisorPool = ['Anil Kumar', 'Karthik Reddy', 'Sudheer Naidu', 'Rajesh Chowdary', 'Priya Sharma', 'Sandeep Reddy', 'Meena Iyer', 'Vikram Singh', 'Pooja Deshmukh', 'Ramesh Babu'];
      const auditorPool = ['Anil Kumar', 'Sudheer Naidu', 'Rajesh Chowdary', 'Neha Kapoor', 'Vikram Singh', 'Pooja Sharma', 'Amit Verma', 'Karthik Reddy', 'Priya Reddy', 'Ravi Teja', 'Santosh Rao', 'Teja Reddy', 'Divya Shah', 'Sneha Reddy', 'Deepak Sharma'];

      // Deterministically pick N items from an array (wraps around)
      const pickDeterministic = (arr, pickCount, id) => {
        const result = [];
        if (!arr || arr.length === 0) return result;
        const seed = seedFromId(id);
        let idx = seed % arr.length;
        for (let i = 0; i < pickCount; i++) {
          result.push(arr[idx % arr.length]);
          idx++;
        }
        // ensure uniqueness while preserving order
        return Array.from(new Set(result));
      };

      if (!audits || audits.length === 0) {
        // synthesize a supervisor and 3-5 auditors
        const seed = seedFromId(storeId);
        const count = 3 + (seed % 3); // 3-5
        const auditors = pickDeterministic(auditorPool, count, storeId).join(', ');
        const supervisor = supervisorPool[seed % supervisorPool.length];
        return { supervisor, auditors };
      }

      // Pick the audit with latest end date (or start date)
      const parsed = audits.map(a => ({
        ...a,
        sortDate: a.AuditEndDate ? new Date(a.AuditEndDate).getTime() : (a.AuditStartDate ? new Date(a.AuditStartDate).getTime() : 0)
      })).sort((x, y) => y.sortDate - x.sortDate);
      const latest = parsed[0];

      // Collect unique auditors from audits
      const uniqueAuditors = Array.from(new Set(audits.map(a => a.AuditorName).filter(Boolean)));

      // Determine desired auditor count (3-5)
      const desiredCount = 3 + (seedFromId(storeId) % 3);
      let auditorsList = [];

      if (uniqueAuditors.length >= desiredCount) {
        // pick deterministic subset from available auditors
        auditorsList = pickDeterministic(uniqueAuditors, desiredCount, storeId);
      } else {
        // include all available auditors then supplement from pool deterministically
        auditorsList = uniqueAuditors.slice();
        const need = Math.max(0, desiredCount - auditorsList.length);
        if (need > 0) {
          const supplement = pickDeterministic(auditorPool.filter(n => !auditorsList.includes(n)), need, storeId + '-supp');
          auditorsList = auditorsList.concat(supplement);
        }
      }

      // Supervisor: prefer latest.SupervisorName, else pick one from parsed audits, else deterministic
      let supervisor = latest.SupervisorName || (audits.map(a => a.SupervisorName).find(Boolean));
      if (!supervisor) supervisor = supervisorPool[seedFromId(storeId) % supervisorPool.length];

      return { supervisor, auditors: auditorsList.join(', ') };
    };

    if (type === 'total-active-stores') {
      // Get all stores from store coverage data
      return storeCoverageData.map(store => ({
        storeId: store.StoreID,
        city: store.State || '',
        storeName: store.StoreName,
        state: store.StateName,
        storeType: store.StoreType,
        boxType: getBoxType(store.StoreID),
        storeCreatedDate: store.StoreCreatedDate ? new Date(store.StoreCreatedDate).toISOString().split('T')[0] : randomDateForId(store.StoreID),
        lastAuditedDate: store.LastAuditDate ? new Date(store.LastAuditDate).toISOString().split('T')[0] : 'Never',
        status: store.IsActive !== false ? 'Active' : 'Inactive',
        skus: store.TotalSKUs,
        quantity: store.TotalQuantity,
        inventoryValueMRP: store.InventoryValue
      }));
    } else if (type === 'covered-stores') {
      // Get only covered stores
      return storeCoverageData
        .filter(store => store.IsCovered)
        .map(store => ({
          storeId: store.StoreID,
          storeIdName: `${store.StoreID}-${store.StoreName}`,
          city: store.State || '',
          storeName: store.StoreName,
          state: store.StateName,
          storeType: store.StoreType,
          boxType: getBoxType(store.StoreID),
          storeCreatedDate: store.StoreCreatedDate ? new Date(store.StoreCreatedDate).toISOString().split('T')[0] : randomDateForId(store.StoreID),
          lastAuditedDate: store.LastAuditDate ? new Date(store.LastAuditDate).toISOString().split('T')[0] : 'Never',
          auditJobType: getAuditJobType(store.StoreID),
          leadSupervisor: getLatestAuditInfo(store.StoreID).supervisor,
          cycle: store.AuditCycle || getAuditCount(store.StoreID),
          skus: store.TotalSKUs,
          quantity: store.TotalQuantity,
          mismatch: store.TotalDeviationCount || 0,
          deviation: store.TotalDeviationCount || 0,
          deviations: store.Deviations || [],
          rawLastAuditDate: store.LastAuditDate,
          recencyQuarter: store.RecencyQuarter,
          deviationValueMRP: store.TotalDeviationValue || 0,
          short: 0,
          shortValue: 0,
          excess: 0,
          excessValue: 0,
          contraExcess: 0,
          contraExcessValue: 0,
          contraShort: 0,
          contraShortValue: 0,
          status: store.IsActive !== false ? 'Active' : 'Inactive',
          inventoryValueMRP: store.InventoryValue
        }));
    } else if (type === 'uncovered-stores') {
      // Calculate days since last audit or store creation for uncovered stores
      const calculateDaysSince = (lastAuditDate, createdDate) => {
        const today = new Date('2024-12-18'); // Current date
        let referenceDate;

        if (lastAuditDate && lastAuditDate !== 'N/A') {
          referenceDate = new Date(lastAuditDate);
        } else {
          referenceDate = new Date(createdDate);
        }

        const diffTime = Math.abs(today - referenceDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
      };

      const formatDaysOrMonths = (days) => {
        if (days < 30) {
          return `${days} day${days !== 1 ? 's' : ''}`;
        } else {
          const months = Math.floor(days / 30);
          return `${months} month${months !== 1 ? 's' : ''}`;
        }
      };

      // Get uncovered stores from real data
      return storeCoverageData
        .filter(store => !store.IsCovered)
        .map(store => ({
          storeId: store.StoreID,
          city: store.State || '',
          storeName: store.StoreName,
          state: store.StateName,
          storeType: store.StoreType,
          boxType: getBoxType(store.StoreID),
          storeCreatedDate: store.StoreCreatedDate ? new Date(store.StoreCreatedDate).toISOString().split('T')[0] : randomDateForId(store.StoreID),
          lastAuditedDate: store.LastAuditDate ? new Date(store.LastAuditDate).toISOString().split('T')[0] : 'N/A',
          daysSinceCreation: store.StoreCreatedDate ? formatDaysOrMonths(calculateDaysSince(store.LastAuditDate, store.StoreCreatedDate)) : 'N/A',
          status: store.IsActive !== false ? 'Active' : 'Inactive',
          skus: store.TotalSKUs,
          quantity: store.TotalQuantity,
          inventoryValueMRP: store.InventoryValue
        }));
    } else if (type === 'stores-recency-oct-dec') {
      // Get stores audited in Oct-Dec quarter
      return storeCoverageData
        .filter(store => store.IsCovered && store.RecencyQuarter === 'Oct - Dec')
        .map(store => {
          const latest = getLatestAuditInfo(store.StoreID);
          const lastAuditDate = store.LastAuditDate ? new Date(store.LastAuditDate) : null;
          const msPerDay = 1000 * 60 * 60 * 24;
          const days = lastAuditDate ? Math.abs(Math.ceil((Date.now() - lastAuditDate.getTime()) / msPerDay)) : 'N/A';
          return {
            storeId: store.StoreID,
            storeName: store.StoreName,
            state: store.StateName || store.State,
            city: store.State || '',
            lastAudit: lastAuditDate ? lastAuditDate.toISOString().split('T')[0] : 'Never',
            daysSinceLastAudit: days,
            skus: store.TotalSKUs,
            quantity: store.TotalQuantity,
            auditors: latest.auditors,
            deviationCount: store.TotalDeviationCount || store.TotalDeviationCount === 0 ? store.TotalDeviationCount : (store.DeviationCount || 0),
            supervisor: latest.supervisor
          };
        });
    } else if (type === 'stores-recency-jul-sep') {
      // Get stores audited in Jul-Sep quarter
      return storeCoverageData
        .filter(store => store.IsCovered && store.RecencyQuarter === 'Jul - Sep')
        .map(store => {
          const latest = getLatestAuditInfo(store.StoreID);
          const lastAuditDate = store.LastAuditDate ? new Date(store.LastAuditDate) : null;
          const msPerDay = 1000 * 60 * 60 * 24;
          const days = lastAuditDate ? Math.abs(Math.ceil((Date.now() - lastAuditDate.getTime()) / msPerDay)) : 'N/A';
          return {
            storeId: store.StoreID,
            storeName: store.StoreName,
            state: store.StateName || store.State,
            city: store.State || '',
            lastAudit: lastAuditDate ? lastAuditDate.toISOString().split('T')[0] : 'Never',
            daysSinceLastAudit: days,
            skus: store.TotalSKUs,
            quantity: store.TotalQuantity,
            auditors: latest.auditors,
            deviationCount: store.TotalDeviationCount || store.TotalDeviationCount === 0 ? store.TotalDeviationCount : (store.DeviationCount || 0),
            supervisor: latest.supervisor
          };
        });
    } else if (type === 'stores-recency-apr-jun') {
      // Get stores audited in Apr-Jun quarter
      return storeCoverageData
        .filter(store => store.IsCovered && store.RecencyQuarter === 'Apr - Jun')
        .map(store => {
          const latest = getLatestAuditInfo(store.StoreID);
          const lastAuditDate = store.LastAuditDate ? new Date(store.LastAuditDate) : null;
          const msPerDay = 1000 * 60 * 60 * 24;
          const days = lastAuditDate ? Math.abs(Math.ceil((Date.now() - lastAuditDate.getTime()) / msPerDay)) : 'N/A';
          return {
            storeId: store.StoreID,
            storeName: store.StoreName,
            state: store.StateName || store.State,
            city: store.State || '',
            lastAudit: lastAuditDate ? lastAuditDate.toISOString().split('T')[0] : 'Never',
            daysSinceLastAudit: days,
            skus: store.TotalSKUs,
            quantity: store.TotalQuantity,
            auditors: latest.auditors,
            deviationCount: store.TotalDeviationCount || store.TotalDeviationCount === 0 ? store.TotalDeviationCount : (store.DeviationCount || 0),
            supervisor: latest.supervisor
          };
        });
    } else if (type === 'stores-recency-jan-mar') {
      // Get stores audited in Jan-Mar quarter
      return storeCoverageData
        .filter(store => store.IsCovered && store.RecencyQuarter === 'Jan - Mar')
        .map(store => {
          const latest = getLatestAuditInfo(store.StoreID);
          const lastAuditDate = store.LastAuditDate ? new Date(store.LastAuditDate) : null;
          const msPerDay = 1000 * 60 * 60 * 24;
          const days = lastAuditDate ? Math.abs(Math.ceil((Date.now() - lastAuditDate.getTime()) / msPerDay)) : 'N/A';
          return {
            storeId: store.StoreID,
            storeName: store.StoreName,
            state: store.StateName || store.State,
            city: store.State || '',
            lastAudit: lastAuditDate ? lastAuditDate.toISOString().split('T')[0] : 'Never',
            daysSinceLastAudit: days,
            skus: store.TotalSKUs,
            quantity: store.TotalQuantity,
            auditors: latest.auditors,
            deviationCount: store.TotalDeviationCount || store.TotalDeviationCount === 0 ? store.TotalDeviationCount : (store.DeviationCount || 0),
            supervisor: latest.supervisor
          };
        });
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
        {
          storeId: 'MP006',
          storeName: 'Delhi NCR',
          state: 'DL',
          supervisor: 'Amit Verma',
          noOfAuditors: 3,
          startDate: '2024-11-20',
          endDate: '2024-11-28',
          totalPIDs: 1850,
          totalSKUs: 4500,
          duration: 192,
          mismatch: 12,
          mismatchDetails: [
            { productId: 'PID001', sku: 'SKU12345', productName: 'Paracetamol 500mg', type: 'Short', systemQty: 100, physicalQty: 95, difference: -5 },
            { productId: 'PID002', sku: 'SKU12346', productName: 'Ibuprofen 400mg', type: 'Excess', systemQty: 50, physicalQty: 53, difference: 3 },
            { productId: 'PID003', sku: 'SKU12347', productName: 'Aspirin 75mg', type: 'Contra Short', systemQty: 80, physicalQty: 78, difference: -2 },
            { productId: 'PID004', sku: 'SKU12348', productName: 'Vitamin C Tablets', type: 'Contra Excess', systemQty: 120, physicalQty: 122, difference: 2 },
            { productId: 'PID005', sku: 'SKU12349', productName: 'Calcium Supplements', type: 'Short', systemQty: 60, physicalQty: 57, difference: -3 }
          ],
          auditJobType: 'Full Audit',
          processType: 'Product Audit'
        },
        {
          storeId: 'MP008',
          storeName: 'Kolkata East',
          state: 'WB',
          supervisor: 'Sourav Das',
          noOfAuditors: 2,
          startDate: '2024-11-22',
          endDate: '2024-11-30',
          totalPIDs: 1650,
          totalSKUs: 3800,
          duration: 192,
          mismatch: 18,
          mismatchDetails: [
            { productId: 'PID006', sku: 'SKU22345', productName: 'Metformin 500mg', type: 'Short', systemQty: 200, physicalQty: 192, difference: -8 },
            { productId: 'PID007', sku: 'SKU22346', productName: 'Amlodipine 5mg', type: 'Excess', systemQty: 75, physicalQty: 79, difference: 4 },
            { productId: 'PID008', sku: 'SKU22347', productName: 'Atorvastatin 10mg', type: 'Contra Short', systemQty: 90, physicalQty: 87, difference: -3 },
            { productId: 'PID009', sku: 'SKU22348', productName: 'Losartan 50mg', type: 'Contra Excess', systemQty: 110, physicalQty: 113, difference: 3 }
          ],
          auditJobType: 'Partial/Random Audit',
          processType: 'Batch Audit'
        },
        {
          storeId: 'MP009',
          storeName: 'Nagpur Central',
          state: 'MH',
          supervisor: 'Pooja Deshmukh',
          noOfAuditors: 2,
          startDate: '2024-11-25',
          endDate: '2024-12-02',
          totalPIDs: 1420,
          totalSKUs: 3200,
          duration: 168,
          mismatch: 8,
          mismatchDetails: [
            { productId: 'PID010', sku: 'SKU32345', productName: 'Omeprazole 20mg', type: 'Short', systemQty: 150, physicalQty: 147, difference: -3 },
            { productId: 'PID011', sku: 'SKU32346', productName: 'Pantoprazole 40mg', type: 'Excess', systemQty: 85, physicalQty: 87, difference: 2 },
            { productId: 'PID012', sku: 'SKU32347', productName: 'Ranitidine 150mg', type: 'Contra Short', systemQty: 70, physicalQty: 68, difference: -2 }
          ],
          auditJobType: 'Full Audit',
          processType: 'Product Audit'
        },
        {
          storeId: 'MP010',
          storeName: 'Bhopal Main',
          state: 'MP',
          supervisor: 'Anil Shukla',
          noOfAuditors: 3,
          startDate: '2024-11-26',
          endDate: '2024-12-03',
          totalPIDs: 1280,
          totalSKUs: 2900,
          duration: 168,
          mismatch: 15,
          mismatchDetails: [
            { productId: 'PID013', sku: 'SKU42345', productName: 'Azithromycin 500mg', type: 'Short', systemQty: 130, physicalQty: 124, difference: -6 },
            { productId: 'PID014', sku: 'SKU42346', productName: 'Amoxicillin 250mg', type: 'Excess', systemQty: 95, physicalQty: 100, difference: 5 },
            { productId: 'PID015', sku: 'SKU42347', productName: 'Ciprofloxacin 500mg', type: 'Contra Short', systemQty: 80, physicalQty: 78, difference: -2 },
            { productId: 'PID016', sku: 'SKU42348', productName: 'Doxycycline 100mg', type: 'Contra Excess', systemQty: 60, physicalQty: 62, difference: 2 }
          ],
          auditJobType: 'Select SKUs',
          processType: 'Batch Audit'
        }
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
    const matchesBoxType = !filterBoxType || item.boxType === filterBoxType;
    const matchesStoreStatus = !filterStoreStatus || item.status === filterStoreStatus;
    const matchesCity = !filterCity || item.city === filterCity;

    // URL Parameter Filters
    const matchesDeviationParam = !deviationParam || (item.deviations && item.deviations.some(d => d.DeviationType === deviationParam));

    let matchesRecencyParam = true;
    if (recencyRangeParam) {
      if (recencyViewParam === 'monthly' && item.rawLastAuditDate) {
        const date = new Date(item.rawLastAuditDate);
        const month = date.toLocaleString('default', { month: 'short' });
        matchesRecencyParam = month === recencyRangeParam;
      } else if (recencyViewParam === 'quarterly') {
        matchesRecencyParam = item.recencyQuarter === recencyRangeParam;
      } else if (recencyViewParam === 'half-yearly') {
        const q = item.recencyQuarter;
        if (recencyRangeParam === 'Apr - Sep') matchesRecencyParam = (q === 'Apr - Jun' || q === 'Jul - Sep');
        if (recencyRangeParam === 'Oct - Mar') matchesRecencyParam = (q === 'Oct - Dec' || q === 'Jan - Mar');
      }
    }

    return matchesSearch && matchesStore && matchesState && matchesAuditJobType && matchesProcessType && matchesBoxType && matchesStoreStatus && matchesCity && matchesDeviationParam && matchesRecencyParam;
  });

  const states = [...new Set(data.map(item => item.state).filter(Boolean))];
  const auditJobTypes = [...new Set(data.map(item => item.auditJobType).filter(Boolean))];
  const processTypes = [...new Set(data.map(item => item.processType).filter(Boolean))];
  const boxTypes = [...new Set(data.map(item => item.boxType).filter(Boolean))];
  const storeStatuses = [...new Set(data.map(item => item.status).filter(Boolean))];
  const cities = [...new Set(data.map(item => item.city).filter(Boolean))];

  const handleDownloadExcel = () => {
    const wb = utils.book_new();
    const headers = [
      "Store ID-Name", "CITY", "STATE", "HUB TYPE", "STORE STATUS", "BOX TYPE",
      "STORE CREATED DATE", "LAST AUDITED DATE", "AUDIT JOB TYPE", "LEAD SUPERVISOR", "NO.OF AUDITS", "AUDIT SKUS (count)",
      "AUDIT QUANTITY (units)", "DEVIATION ITEMS VALUE MRP (₹)", "AUDIT VALUE MRP (₹)", "MISMATCH ITEMS", "DEVIATION ITEMS"
    ];

    const dataToExport = filteredData.map(row => {
      // Logic for Covered Stores and Uncovered Stores specific headers
      if (type === 'covered-stores' || type === 'uncovered-stores') {
        return {
          "Store ID-Name": row.storeIdName,
          "CITY": row.city,
          "STATE": row.state,
          "HUB TYPE": row.storeType,
          "STORE STATUS": row.status,
          "BOX TYPE": row.boxType,
          "STORE CREATED DATE": row.storeCreatedDate,
          "LAST AUDITED DATE": row.lastAuditedDate,
          "AUDIT JOB TYPE": row.auditJobType,
          "LEAD SUPERVISOR": row.leadSupervisor,
          "NO.OF AUDITS": row.cycle || 0,
          "AUDIT SKUS (count)": row.skus,
          "AUDIT QUANTITY (units)": row.quantity,
          "DEVIATION ITEMS VALUE MRP (₹)": row.deviationValueMRP || 0,
          "AUDIT VALUE MRP (₹)": row.inventoryValueMRP,
          "MISMATCH ITEMS": row.mismatch || 0,
          "DEVIATION ITEMS": row.deviation || 0
        };
      } else {
        // Default generic export for other views
        const newRow = {};
        Object.entries(row).forEach(([key, value]) => {
          if (key !== 'mismatchDetails') {
            newRow[formatColumnHeader(key)] = value;
          }
        });
        return newRow;
      }
    });

    // Rename keys to match specific requested headers with duplicate "VALUE" names strictly for Excel
    // Note: JS Objects keys must be unique. `xlsx` handles array of arrays better for duplicate headers.

    let ws;
    if (type === 'covered-stores' || type === 'uncovered-stores') {
      const aoaData = [headers];
      dataToExport.forEach(r => {
        aoaData.push([
          r["Store ID-Name"], r["CITY"], r["STATE"], r["HUB TYPE"], r["STORE STATUS"], r["BOX TYPE"],
          r["STORE CREATED DATE"], r["LAST AUDITED DATE"], r["AUDIT JOB TYPE"], r["LEAD SUPERVISOR"], r["NO.OF AUDITS"], r["AUDIT SKUS (count)"],
          r["AUDIT QUANTITY (units)"], r["DEVIATION ITEMS VALUE MRP (₹)"], r["AUDIT VALUE MRP (₹)"], r["MISMATCH ITEMS"], r["DEVIATION ITEMS"]
        ]);
      });
      ws = utils.aoa_to_sheet(aoaData);
    } else {
      ws = utils.json_to_sheet(dataToExport);
    }

    utils.book_append_sheet(wb, ws, title.substring(0, 31));
    writeFile(wb, `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape for more columns
    doc.setFontSize(16);
    doc.text(title, 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

    let headers = [];
    let tableData = [];

    if (type === 'covered-stores' || type === 'uncovered-stores') {
      // Use abbreviated headers for PDF to fit
      headers = [
        "ID-Name", "City", "State", "Type", "Status", "Box",
        "Created", "Audited", "Job Type", "Sup", "Cnt", "SKUs",
        "Qty", "Dev Val", "Aud Val", "Mis", "Dev"
      ];

      tableData = filteredData.map(row => {
        return [
          row.storeIdName, row.city, row.state, row.storeType, row.status, row.boxType,
          row.storeCreatedDate, row.lastAuditedDate, row.auditJobType, row.leadSupervisor, row.cycle || 0, row.skus,
          row.quantity, '₹' + (row.deviationValueMRP || 0).toLocaleString('en-IN'), '₹' + (row.inventoryValueMRP || 0).toLocaleString('en-IN'),
          row.mismatch || 0, row.deviation || 0
        ];
      });

    } else {
      headers = Object.keys(filteredData[0] || {})
        .filter(key => key !== 'mismatchDetails')
        .map(key => formatColumnHeader(key));

      tableData = filteredData.map(row =>
        Object.entries(row)
          .filter(([key]) => key !== 'mismatchDetails')
          .map(([key, value]) => {
            if (typeof value === 'number') return value.toLocaleString('en-IN');
            return value;
          })
      );
    }

    autoTable(doc, {
      startY: 35,
      head: [headers],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 7, cellPadding: 1, overflow: 'linebreak' },
      columnStyles: {
        0: { cellWidth: 12 }, // ID column
        1: { cellWidth: 20 }, // Store name
        // Compact columns for values
      }
    });

    doc.save(`${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterStore('');
    setFilterState('');
    setFilterAuditJobType('');
    setFilterProcessType('');
    setFilterBoxType('');
    setFilterStoreStatus('');
    setFilterCity('');
  };

  const clearUrlFilters = () => {
    navigate(`/details?title=${encodeURIComponent(title)}&type=${type}`, { replace: true });
  };

  const toggleMismatchDetails = (storeId) => {
    setExpandedRows(prev => ({
      ...prev,
      [storeId]: !prev[storeId]
    }));
  };

  const handleMismatchFilterChange = (storeId, filterValue) => {
    setMismatchFilters(prev => ({
      ...prev,
      [storeId]: filterValue
    }));
  };

  const handleMismatchSearchChange = (storeId, searchValue) => {
    setMismatchSearchTerms(prev => ({
      ...prev,
      [storeId]: searchValue
    }));
  };

  const filterMismatchDetails = (details, storeId) => {
    const filter = mismatchFilters[storeId] || '';
    const search = mismatchSearchTerms[storeId]?.toLowerCase() || '';

    return details.filter(detail => {
      const matchesFilter = !filter || detail.type === filter;
      const matchesSearch = !search ||
        detail.productId.toLowerCase().includes(search) ||
        detail.sku.toLowerCase().includes(search) ||
        detail.productName.toLowerCase().includes(search) ||
        detail.type.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });
  };

  // Add units to column headers based on field names
  const formatColumnHeader = (key) => {
    // Handle specific column name mappings
    if (key === 'storeId') return 'STORE ID';
    if (key === 'storeIdName') return 'Store ID-Name';
    if (key === 'storeName') return 'STORE NAME';
    if (key === 'city') return 'CITY';
    if (key === 'state') return 'STATE';
    if (key === 'state') return 'STATE';
    if (key === 'storeType') return 'HUB TYPE';
    if (key === 'boxType') return 'BOX TYPE';
    if (key === 'storeCreatedDate') return 'STORE CREATED DATE';
    if (key === 'lastAuditedDate') return 'LAST AUDITED DATE';
    if (key === 'lastAudit') return 'LAST AUDIT';
    if (key === 'cycle') return 'NO.OF AUDITS';
    if (key === 'auditJobType') return 'AUDIT JOB TYPE';
    if (key === 'leadSupervisor') return 'LEAD SUPERVISOR';
    if (key === 'skus') return 'AUDIT SKUS (count)';
    if (key === 'quantity') return 'AUDIT QUANTITY (units)';
    if (key === 'inventoryValueMRP') return 'AUDIT VALUE MRP (₹)';
    if (key === 'mismatch') return 'MISMATCH ITEMS';
    if (key === 'deviation') return 'DEVIATION ITEMS';
    if (key === 'deviationValueMRP') return 'DEVIATION ITEMS VALUE MRP (₹)';
    if (key === 'deviationCount') return 'DEVIATION ITEMS COUNT (items)';

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
    if (key.includes('sku') || key.includes('SKU') || key.includes('PID')) return label + ' (count)';

    return label;
  };

  // Helper function to filter out deviation detail columns from table display
  const shouldHideColumn = (key) => {
    const hiddenColumns = ['short', 'shortValue', 'excess', 'excessValue', 'contraExcess', 'contraExcessValue', 'contraShort', 'contraShortValue'];
    return hiddenColumns.includes(key);
  };

  // Define column order for store coverage views
  const getOrderedColumns = (data) => {
    if (!data || data.length === 0) return [];

    const allKeys = Object.keys(data[0]);

    // For covered-stores and uncovered-stores, use specific order
    if (type === 'covered-stores' || type === 'uncovered-stores') {
      const orderedKeys = [
        'storeIdName',
        'city',
        'state',
        'storeType',
        'status',
        'boxType',
        'storeCreatedDate',
        'lastAuditedDate',
        'auditJobType',
        'leadSupervisor',
        'cycle',
        'skus',
        'quantity',
        'deviationValueMRP',
        'inventoryValueMRP',
        'mismatch',
        'deviation'
      ];

      // Include only columns that exist in the data and match the ordered list
      return orderedKeys.filter(key => allKeys.includes(key));
    }

    // For store recency analysis views, use specific order
    if (type.startsWith('stores-recency-')) {
      const orderedKeys = [
        'storeId',
        'storeName',
        'state',
        'city',
        'lastAudit',
        'daysSinceLastAudit',
        'supervisor',
        'auditors',
        'skus',
        'quantity',
        'deviationCount'
      ];

      // Include only columns that exist in the data and match the ordered list
      return orderedKeys.filter(key => allKeys.includes(key));
    }

    // For other views, use default order but exclude hidden columns
    return allKeys.filter(key => key !== 'mismatchDetails' && !shouldHideColumn(key));
  };

  // Determine if store click is enabled for this view
  const isStoreClickable = [
    'audit-created',
    'audit-in-progress',
    'audit-pending',
    'audit-completed',
    'covered-stores'
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
                  <span></span>
                )}
              </p>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => { resetFilters(); clearUrlFilters(); }}
                className="me-1"
              >
                Clear
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowTableFilters(!showTableFilters)}
              >
                <i className="fas fa-filter me-1"></i>
                Table Filters
                <i className={`fas fa-chevron-${showTableFilters ? 'up' : 'down'} ms-1`}></i>
              </Button>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <i className="fas fa-download me-2"></i>Export Report
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleDownloadExcel}>
                    <i className="fas fa-file-excel text-success me-2"></i>Export as Excel
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleDownloadPDF}>
                    <i className="fas fa-file-pdf text-danger me-2"></i>Export as PDF
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Col>
      </Row>

      {showTableFilters && (
        <Card className="mb-3">
          <Card.Body>
            <Row className="g-2">
              <Col md={2}>
                <Form.Label className="small mb-1">Search</Form.Label>
                <InputGroup size="sm">
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
              {states.length > 0 && (
                <Col md={2}>
                  <Form.Label className="small mb-1">State</Form.Label>
                  <Form.Select size="sm" value={filterState} onChange={(e) => setFilterState(e.target.value)}>
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </Form.Select>
                </Col>
              )}
              {cities.length > 0 && (
                <Col md={2}>
                  <Form.Label className="small mb-1">City</Form.Label>
                  <Form.Select size="sm" value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </Form.Select>
                </Col>
              )}
              {/* Store Type Filter (Derived from StoreType) */}
              {(() => {
                const storeTypes = [...new Set(data.map(item => item.storeType).filter(Boolean))];
                return storeTypes.length > 0 && (
                  <Col md={2}>
                    <Form.Label className="small mb-1">Store Type</Form.Label>
                    <Form.Select size="sm" value={filterStore} onChange={(e) => setFilterStore(e.target.value)}>
                      <option value="">Select Store Type</option>
                      {storeTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Form.Select>
                  </Col>
                );
              })()}
              {auditJobTypes.length > 0 && (
                <Col md={2}>
                  <Form.Label className="small mb-1">Audit Type</Form.Label>
                  <Form.Select size="sm" value={filterAuditJobType} onChange={(e) => setFilterAuditJobType(e.target.value)}>
                    <option value="">Select Audit Type</option>
                    {auditJobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Col>
              )}
              {boxTypes.length > 0 && (
                <Col md={2}>
                  <Form.Label className="small mb-1">Box Type</Form.Label>
                  <Form.Select size="sm" value={filterBoxType} onChange={(e) => setFilterBoxType(e.target.value)}>
                    <option value="">Select Box Type</option>
                    {boxTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Col>
              )}
              {storeStatuses.length > 0 && (
                <Col md={2}>
                  <Form.Label className="small mb-1">Status</Form.Label>
                  <Form.Select size="sm" value={filterStoreStatus} onChange={(e) => setFilterStoreStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    {storeStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </Form.Select>
                </Col>
              )}

              {processTypes.length > 0 && (
                <Col md={2}>
                  <Form.Label className="small mb-1">Process Type</Form.Label>
                  <Form.Select size="sm" value={filterProcessType} onChange={(e) => setFilterProcessType(e.target.value)}>
                    <option value="">All Process Types</option>
                    {processTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Col>
              )}
            </Row>
            <Row className="mt-3">
              <Col className="d-flex justify-content-end gap-2">
                <Button variant="primary" size="sm" onClick={() => setShowTableFilters(false)}>
                  Apply
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card >
      )}

      <Card>
        <Card.Body className="p-0">
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <Table striped hover responsive className="mb-0">
              <thead style={{ position: 'sticky', top: 0, background: 'white', zIndex: 1 }}>
                <tr>
                  {getOrderedColumns(filteredData).map(key => (
                    <th key={key}>{formatColumnHeader(key)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, idx) => (
                    <>
                      <tr
                        key={idx}
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
                        {getOrderedColumns(filteredData).map((key, i) => {
                          const value = row[key];
                          return (
                            <td
                              key={i}
                              onClick={(e) => {
                                if (key === 'mismatch' && row.mismatchDetails) {
                                  e.stopPropagation();
                                  toggleMismatchDetails(row.storeId);
                                } else if (isStoreClickable && row.storeId) {
                                  handleRowClick(row);
                                }
                              }}
                              style={{
                                cursor: key === 'mismatch' && row.mismatchDetails ? 'pointer' : 'inherit',
                                color: key === 'mismatch' && row.mismatchDetails ? '#0d6efd' : 'inherit',
                                fontWeight: key === 'mismatch' && row.mismatchDetails ? '600' : 'inherit'
                              }}
                            >
                              {key === 'status' ? (
                                <Badge bg="success">{value}</Badge>
                              ) : key === 'inventoryValue' || key === 'inventoryValueMRP' || key === 'value' || key === 'deviationValueMRP' ? (
                                `₹${Number(value).toLocaleString()}`
                              ) : key === 'mismatch' && row.mismatchDetails ? (
                                <span>
                                  {value} <i className={`fas fa-chevron-${expandedRows[row.storeId] ? 'up' : 'down'} ms-2`}></i>
                                </span>
                              ) : key === 'auditors' && value && value !== 'Not Assigned' ? (
                                <div className="d-flex align-items-center gap-2">
                                  {value !== 'Not Assigned' ? (
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip id={`tooltip-auditors-${row.storeId}`} style={{ maxWidth: '420px' }}>
                                          <div style={{ textAlign: 'left', padding: '8px' }}>
                                            {(() => {
                                              const auditorList = value.split(',').map(a => a.trim());
                                              const rows = [];
                                              for (let i = 0; i < auditorList.length; i += 3) {
                                                const chunk = auditorList.slice(i, i + 3);
                                                rows.push(
                                                  <div key={i} style={{ marginBottom: '6px' }}>
                                                    {chunk.join(', ')}
                                                  </div>
                                                );
                                              }
                                              return rows;
                                            })()}
                                          </div>
                                        </Tooltip>
                                      }
                                    >
                                      <span className="d-inline-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                                        <small className="text-muted mb-0">
                                          {(() => {
                                            const auditorList = value.split(',');
                                            const count = auditorList.length;
                                            if (count > 3) {
                                              return auditorList.slice(0, 3).map(a => a.trim()).join(', ') + '...';
                                            }
                                            return value;
                                          })()}
                                        </small>
                                        <Badge bg="info" pill style={{ cursor: 'pointer' }}>
                                          {value.split(',').length}
                                        </Badge>
                                      </span>
                                    </OverlayTrigger>
                                  ) : (
                                    <Badge bg="secondary">{value}</Badge>
                                  )}
                                </div>
                              ) : (
                                value
                              )}
                            </td>
                          );
                        })}
                      </tr>
                      {expandedRows[row.storeId] && row.mismatchDetails && (
                        <tr key={`${idx}-details`}>
                          <td colSpan="100" style={{ backgroundColor: '#f8f9fa', padding: 0 }}>
                            <div style={{ padding: '15px', borderLeft: '4px solid #0d6efd' }}>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="mb-0 text-primary">
                                  <i className="fas fa-list-alt me-2"></i>
                                  Product Level Mismatch Details
                                </h6>
                                <div className="d-flex gap-2">
                                  <Form.Select
                                    size="sm"
                                    style={{ width: '200px' }}
                                    value={mismatchFilters[row.storeId] || ''}
                                    onChange={(e) => handleMismatchFilterChange(row.storeId, e.target.value)}
                                  >
                                    <option value="">All Mismatch Types</option>
                                    <option value="Short">Short</option>
                                    <option value="Excess">Excess</option>
                                    <option value="Contra Short">Contra Short</option>
                                    <option value="Contra Excess">Contra Excess</option>
                                  </Form.Select>
                                  <InputGroup size="sm" style={{ width: '250px' }}>
                                    <InputGroup.Text>
                                      <i className="fas fa-search"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                      type="text"
                                      placeholder="Search products..."
                                      value={mismatchSearchTerms[row.storeId] || ''}
                                      onChange={(e) => handleMismatchSearchChange(row.storeId, e.target.value)}
                                    />
                                  </InputGroup>
                                </div>
                              </div>
                              <Table bordered size="sm" style={{ marginBottom: 0 }}>
                                <thead className="table-light">
                                  <tr>
                                    <th>Product ID</th>
                                    <th>SKU</th>
                                    <th>Product Name</th>
                                    <th>Mismatch Type</th>
                                    <th>System Qty</th>
                                    <th>Physical Qty</th>
                                    <th>Difference</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filterMismatchDetails(row.mismatchDetails, row.storeId).length > 0 ? (
                                    filterMismatchDetails(row.mismatchDetails, row.storeId).map((detail, detailIdx) => (
                                      <tr key={detailIdx}>
                                        <td>{detail.productId}</td>
                                        <td>{detail.sku}</td>
                                        <td>{detail.productName}</td>
                                        <td>
                                          <Badge
                                            bg={
                                              detail.type === 'Short' || detail.type === 'Contra Short'
                                                ? 'danger'
                                                : 'warning'
                                            }
                                          >
                                            {detail.type}
                                          </Badge>
                                        </td>
                                        <td>{detail.systemQty}</td>
                                        <td>{detail.physicalQty}</td>
                                        <td style={{
                                          color: detail.difference < 0 ? '#dc3545' : '#198754',
                                          fontWeight: '600'
                                        }}>
                                          {detail.difference > 0 ? '+' : ''}{detail.difference}
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="7" className="text-center py-3 text-muted">
                                        <i className="fas fa-filter me-2"></i>
                                        No products match the current filter
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
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
        auditStatus="completed"
      />
    </Container >
  );
};

export default DetailsPage;
