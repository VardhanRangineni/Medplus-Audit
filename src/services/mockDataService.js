// Mock Data Service - Replace with actual API calls
// src/services/mockDataService.js

export const mockDataService = {
  // Store Coverage Data
  getStoreCoverageStats: async (_filters) => {
    // Replace with: return await api.get('/api/stores/coverage', { params: filters })
    return {
      totalActive: 450,
      covered: 385,
      uncovered: 65,
      coveredPercentage: 85.6,
      uncoveredPercentage: 14.4
    };
  },

  getStoreRecencyData: async (_filters) => {
    // Replace with: return await api.get('/api/stores/recency', { params: filters })
    return [
      { range: '0-3 Months', stores: 180, percentage: 46.8 },
      { range: '3-6 Months', stores: 125, percentage: 32.5 },
      { range: '6-9 Months', stores: 55, percentage: 14.3 },
      { range: '9-12 Months', stores: 25, percentage: 6.5 }
    ];
  },

  getInventoryData: async (_filters) => {
    // Replace with: return await api.get('/api/inventory/summary', { params: filters })
    return {
      totalSKUs: 12450,
      totalQuantity: 245600,
      totalValue: 3456789.50
    };
  },

  getDeviationData: async (_filters) => {
    // Replace with: return await api.get('/api/deviations', { params: filters })
    return [
      { type: 'Private - Invoiced', value: 45000, count: 245 },
      { type: 'Private - Contra Short', value: 32000, count: 178 },
      // ... more data
    ];
  },

  // Live Audit Schedule Data
  getAuditWorkflowStats: async (_filters) => {
    // Replace with: return await api.get('/api/audits/workflow-stats', { params: filters })
    return {
      created: 45,
      inProgress: 128,
      pending: 37,
      completed: 240
    };
  },

  getAuditScheduleData: async (_filters) => {
    // Replace with: return await api.get('/api/audits/schedule', { params: filters })
    return [
      {
        storeId: 'MP001',
        storeName: 'Chennai Central',
        supervisor: 'Rajesh Kumar',
        auditors: 'Amit, Priya, Suresh',
        startDate: '2024-12-01',
        completedSKUs: 3250,
        totalSKUs: 4200,
        progress: 77.4
      },
      // ... more data
    ];
  },

  getLiveAuditProgress: async (storeId, _filters) => {
    // Replace with: return await api.get(`/api/audits/${storeId}/progress`, { params: filters })
    return {
      store: { id: storeId, name: 'Chennai Central' },
      auditors: [
        { 
          name: 'Amit Singh', 
          assignedSKUs: 1200, 
          completedSKUs: 950, 
          completionRate: 79.2, 
          valueCovered: 125000 
        },
        // ... more auditors
      ]
    };
  },

  // Auditor Performance Data
  getPerformanceMetrics: async (_filters) => {
    // Replace with: return await api.get('/api/auditors/metrics', { params: filters })
    return {
      avgTimePerSKU: '4.2 min',
      matchRate: 94.5,
      editRate: 8.3
    };
  },

  getAuditorProductivityData: async (_filters) => {
    // Replace with: return await api.get('/api/auditors/productivity', { params: filters })
    return [
      {
        auditorId: 'AUD001',
        auditorName: 'Amit Singh',
        allottedSKUs: 2400,
        completedSKUs: 2150,
        completionRate: 89.6,
        avgTime: 4.1,
        matchRate: 95.2,
        editRate: 7.5
      },
      // ... more auditors
    ];
  },

  getAuditorPIDDetails: async (_auditorId, _filters) => {
    // Replace with: return await api.get(`/api/auditors/${auditorId}/pids`, { params: filters })
    return [
      { 
        pid: 'PID12345', 
        productName: 'Aspirin 100mg', 
        assignedQty: 250, 
        completedQty: 250, 
        timeSpent: '18 min', 
        status: 'Completed',
        deviations: 2,
        delay: 'On Time'
      },
      // ... more PIDs
    ];
  },

  // Supervisor Approvals Data
  getSupervisorData: async (_filters) => {
    // Replace with: return await api.get('/api/supervisors', { params: filters })
    return [
      {
        supervisorId: 'SUP001',
        supervisorName: 'Rajesh Kumar',
        storesManaged: 12,
        auditCompletion: 87.5,
        pendingApprovals: 23,
        totalPIDs: 2400,
        unallocatedPIDs: 145
      },
      // ... more supervisors
    ];
  },

  getReauditData: async (_filters) => {
    // Replace with: return await api.get('/api/reaudits/lifecycle', { params: filters })
    return [
      { stage: 'Initially Appeared', count: 1250, color: '#dc3545' },
      { stage: 'Matched (Verified)', count: 875, color: '#198754' },
      { stage: 'Edited (Modified)', count: 245, color: '#ffc107' },
      { stage: 'Pending (Awaiting)', count: 130, color: '#0d6efd' }
    ];
  },

  getContraApprovalData: async (_filters) => {
    // Replace with: return await api.get('/api/contra/approvals', { params: filters })
    return [
      { 
        storeId: 'MP001', 
        storeName: 'Chennai Central', 
        contraType: 'Short', 
        itemCount: 45, 
        quantity: 1250, 
        value: 125000,
        priority: 'High'
      },
      // ... more contra items
    ];
  },

  // Drill-down Details
  getStoreDetails: async (_type, _filters) => {
    // Replace with: return await api.get('/api/stores/details', { params: { type, ...filters } })
    return [
      { 
        storeId: 'MP001', 
        storeName: 'Chennai Central', 
        state: 'TN', 
        lastAudit: '2024-11-15', 
        auditAge: 25, 
        deviationCount: 45, 
        inventoryValue: 125000 
      },
      // ... more stores
    ];
  },

  getSKUDeviationDetails: async (_deviationType, _filters) => {
    // Replace with: return await api.get('/api/deviations/sku-details', { params: { deviationType, ...filters } })
    return [
      { 
        storeId: 'MP001', 
        storeName: 'Chennai Central', 
        skuCode: 'SKU12345', 
        productName: 'Product A', 
        quantity: 150, 
        value: 12500, 
        deviationType: 'Invoiced' 
      },
      // ... more SKUs
    ];
  },

  // Store-Specific Details for Nested Drill-down
  getStoreDetailedInfo: async (storeId, _filters) => {
    // Replace with: return await api.get(`/api/stores/${storeId}/details`, { params: filters })
    const storeDataMap = {
      'MP001': {
        storeId: 'MP001',
        storeName: 'Chennai Central',
        state: 'TN',
        supervisor: 'Rajesh Kumar',
        auditProgress: {
          percentage: 77.4,
          completedSKUs: 3250,
          totalSKUs: 4200
        },
        inventorySummary: {
          totalSKUs: 4200,
          auditedSKUs: 3250,
          totalValue: 525000,
          totalQuantity: 45600
        },
        auditors: [
          { name: 'Amit Singh', assignedSKUs: 1400, completedSKUs: 1100, completionRate: 78.6, matchRate: 95.2 },
          { name: 'Priya Reddy', assignedSKUs: 1400, completedSKUs: 1100, completionRate: 78.6, matchRate: 96.8 },
          { name: 'Suresh Kumar', assignedSKUs: 1400, completedSKUs: 1050, completionRate: 75.0, matchRate: 91.5 }
        ],
        deviations: [
          { type: 'Invoiced', count: 15, value: 12500 },
          { type: 'Contra Short', count: 8, value: 8200 },
          { type: 'Contra Excess', count: 5, value: 6100 },
          { type: 'Excess Submitted', count: 3, value: 3200 }
        ],
        contra: [
          { skuCode: 'MED001', productName: 'Paracetamol 500mg', type: 'Short', quantity: 20, value: 2400, status: 'Pending' },
          { skuCode: 'MED002', productName: 'Ibuprofen 400mg', type: 'Short', quantity: 15, value: 1800, status: 'Approved' },
          { skuCode: 'MED003', productName: 'Cough Syrup 100ml', type: 'Excess', quantity: 10, value: 1200, status: 'Pending' },
          { skuCode: 'MED004', productName: 'Vitamin D3', type: 'Short', quantity: 25, value: 3000, status: 'Approved' },
          { skuCode: 'MED005', productName: 'Calcium Tablets', type: 'Excess', quantity: 12, value: 1400, status: 'Pending' }
        ]
      },
      'MP002': {
        storeId: 'MP002',
        storeName: 'Bangalore Hub',
        state: 'KA',
        supervisor: 'Lakshmi Iyer',
        auditProgress: {
          percentage: 71.8,
          completedSKUs: 2800,
          totalSKUs: 3900
        },
        inventorySummary: {
          totalSKUs: 3900,
          auditedSKUs: 2800,
          totalValue: 628000,
          totalQuantity: 52300
        },
        auditors: [
          { name: 'Deepak Sharma', assignedSKUs: 1950, completedSKUs: 1400, completionRate: 71.8, matchRate: 94.8 },
          { name: 'Anitha Rao', assignedSKUs: 1950, completedSKUs: 1400, completionRate: 71.8, matchRate: 93.5 }
        ],
        deviations: [
          { type: 'Invoiced', count: 22, value: 18200 },
          { type: 'Contra Short', count: 16, value: 14500 },
          { type: 'Contra Excess', count: 9, value: 9800 },
          { type: 'Excess Submitted', count: 7, value: 6100 }
        ],
        contra: [
          { skuCode: 'MED010', productName: 'Aspirin 100mg', type: 'Short', quantity: 35, value: 4200, status: 'Pending' },
          { skuCode: 'MED011', productName: 'Antacid Tablets', type: 'Excess', quantity: 28, value: 3300, status: 'Approved' },
          { skuCode: 'MED012', productName: 'Cold Relief Syrup', type: 'Short', quantity: 42, value: 5000, status: 'Pending' },
          { skuCode: 'MED013', productName: 'Pain Relief Gel 30g', type: 'Excess', quantity: 19, value: 2300, status: 'Approved' },
          { skuCode: 'MED014', productName: 'Antibiotic Cream', type: 'Short', quantity: 31, value: 3700, status: 'Pending' },
          { skuCode: 'MED015', productName: 'Fever Reducer', type: 'Excess', quantity: 22, value: 2600, status: 'Approved' }
        ]
      },
      'MP003': {
        storeId: 'MP003',
        storeName: 'Hyderabad Main',
        state: 'TS',
        supervisor: 'Mohammed Ali',
        auditProgress: {
          percentage: 78.8,
          completedSKUs: 4100,
          totalSKUs: 5200
        },
        inventorySummary: {
          totalSKUs: 5200,
          auditedSKUs: 4100,
          totalValue: 725000,
          totalQuantity: 63800
        },
        auditors: [
          { name: 'Ravi Teja', assignedSKUs: 1300, completedSKUs: 1025, completionRate: 78.8, matchRate: 92.3 },
          { name: 'Sneha Reddy', assignedSKUs: 1300, completedSKUs: 1025, completionRate: 78.8, matchRate: 95.7 },
          { name: 'Karthik Kumar', assignedSKUs: 1300, completedSKUs: 1025, completionRate: 78.8, matchRate: 91.2 },
          { name: 'Meena Iyer', assignedSKUs: 1300, completedSKUs: 1025, completionRate: 78.8, matchRate: 94.1 }
        ],
        deviations: [
          { type: 'Invoiced', count: 28, value: 24600 },
          { type: 'Contra Short', count: 19, value: 17800 },
          { type: 'Contra Excess', count: 12, value: 11200 },
          { type: 'Excess Submitted', count: 8, value: 7400 }
        ],
        contra: [
          { skuCode: 'MED020', productName: 'Diabetes Medicine 10mg', type: 'Short', quantity: 48, value: 6400, status: 'Approved' },
          { skuCode: 'MED021', productName: 'BP Control 5mg', type: 'Short', quantity: 38, value: 5100, status: 'Pending' },
          { skuCode: 'MED022', productName: 'Cholesterol Tablets', type: 'Excess', quantity: 33, value: 4400, status: 'Approved' },
          { skuCode: 'MED023', productName: 'Thyroid Medicine 50mcg', type: 'Short', quantity: 41, value: 5500, status: 'Pending' },
          { skuCode: 'MED024', productName: 'Heart Medicine', type: 'Excess', quantity: 27, value: 3600, status: 'Approved' },
          { skuCode: 'MED025', productName: 'Kidney Support Tablets', type: 'Short', quantity: 29, value: 3900, status: 'Pending' },
          { skuCode: 'MED026', productName: 'Liver Protection', type: 'Excess', quantity: 24, value: 3200, status: 'Approved' }
        ]
      },
      'MP004': {
        storeId: 'MP004',
        storeName: 'Pune West',
        state: 'MH',
        supervisor: 'Pradeep Singh',
        auditProgress: {
          percentage: 59.7,
          completedSKUs: 1850,
          totalSKUs: 3100
        },
        inventorySummary: {
          totalSKUs: 3100,
          auditedSKUs: 1850,
          totalValue: 410000,
          totalQuantity: 38900
        },
        auditors: [
          { name: 'Vijay Patil', assignedSKUs: 1550, completedSKUs: 925, completionRate: 59.7, matchRate: 88.5 },
          { name: 'Pooja Deshmukh', assignedSKUs: 1550, completedSKUs: 925, completionRate: 59.7, matchRate: 90.2 }
        ],
        deviations: [
          { type: 'Invoiced', count: 18, value: 15400 },
          { type: 'Contra Short', count: 11, value: 9800 },
          { type: 'Contra Excess', count: 6, value: 5200 },
          { type: 'Excess Submitted', count: 4, value: 3400 }
        ],
        contra: [
          { skuCode: 'MED030', productName: 'Multivitamin Capsules', type: 'Short', quantity: 26, value: 3100, status: 'Pending' },
          { skuCode: 'MED031', productName: 'Omega-3 Fish Oil', type: 'Excess', quantity: 17, value: 2000, status: 'Approved' },
          { skuCode: 'MED032', productName: 'Protein Powder 500g', type: 'Short', quantity: 21, value: 2500, status: 'Pending' },
          { skuCode: 'MED033', productName: 'Glucosamine Tablets', type: 'Excess', quantity: 14, value: 1700, status: 'Approved' }
        ]
      },
      'MP005': {
        storeId: 'MP005',
        storeName: 'Mumbai Central',
        state: 'MH',
        supervisor: 'Neha Sharma',
        auditProgress: {
          percentage: 61.5,
          completedSKUs: 2950,
          totalSKUs: 4800
        },
        inventorySummary: {
          totalSKUs: 4800,
          auditedSKUs: 2950,
          totalValue: 685000,
          totalQuantity: 57200
        },
        auditors: [
          { name: 'Arun Mehta', assignedSKUs: 1600, completedSKUs: 983, completionRate: 61.5, matchRate: 93.8 },
          { name: 'Divya Shah', assignedSKUs: 1600, completedSKUs: 983, completionRate: 61.5, matchRate: 92.1 },
          { name: 'Ramesh Gupta', assignedSKUs: 1600, completedSKUs: 984, completionRate: 61.5, matchRate: 94.5 }
        ],
        deviations: [
          { type: 'Invoiced', count: 25, value: 21800 },
          { type: 'Contra Short', count: 14, value: 12400 },
          { type: 'Contra Excess', count: 10, value: 8900 },
          { type: 'Excess Submitted', count: 6, value: 5300 }
        ],
        contra: [
          { skuCode: 'MED040', productName: 'Eye Drops 10ml', type: 'Short', quantity: 32, value: 3800, status: 'Approved' },
          { skuCode: 'MED041', productName: 'Ear Drops 5ml', type: 'Excess', quantity: 23, value: 2800, status: 'Pending' },
          { skuCode: 'MED042', productName: 'Nasal Spray', type: 'Short', quantity: 37, value: 4400, status: 'Approved' },
          { skuCode: 'MED043', productName: 'Throat Lozenges', type: 'Excess', quantity: 28, value: 3300, status: 'Pending' },
          { skuCode: 'MED044', productName: 'Cough Drops', type: 'Short', quantity: 19, value: 2300, status: 'Approved' }
        ]
      },
      'MP007': {
        storeId: 'MP007',
        storeName: 'Ahmedabad Main',
        state: 'GJ',
        supervisor: 'Kiran Patel',
        auditProgress: { percentage: 0, completedSKUs: 0, totalSKUs: 3600 },
        inventorySummary: { totalSKUs: 3600, auditedSKUs: 0, totalValue: 485000, totalQuantity: 42000 },
        auditors: [],
        deviations: [],
        contra: []
      },
      'MP006': {
        storeId: 'MP006',
        storeName: 'Delhi NCR',
        state: 'DL',
        supervisor: 'Amit Verma',
        auditProgress: { percentage: 100, completedSKUs: 4500, totalSKUs: 4500 },
        inventorySummary: { totalSKUs: 4500, auditedSKUs: 4500, totalValue: 895000, totalQuantity: 68500 },
        auditors: [
          { name: 'Rahul Singh', assignedSKUs: 1500, completedSKUs: 1500, completionRate: 100, matchRate: 96.2 },
          { name: 'Neha Kapoor', assignedSKUs: 1500, completedSKUs: 1500, completionRate: 100, matchRate: 94.8 },
          { name: 'Vikas Sharma', assignedSKUs: 1500, completedSKUs: 1500, completionRate: 100, matchRate: 95.5 }
        ],
        deviations: [
          { type: 'Invoiced', count: 11, value: 9800 },
          { type: 'Contra Short', count: 6, value: 5400 },
          { type: 'Excess Submitted', count: 2, value: 1800 }
        ],
        contra: [
          { skuCode: 'MED050', productName: 'Bandages 10cm Roll', type: 'Short', quantity: 18, value: 2200, status: 'Approved' },
          { skuCode: 'MED051', productName: 'Gauze Pads Pack', type: 'Short', quantity: 14, value: 1700, status: 'Approved' },
          { skuCode: 'MED052', productName: 'Medical Tape', type: 'Short', quantity: 22, value: 2600, status: 'Approved' }
        ]
      },
      'MP007': {
        storeId: 'MP007',
        storeName: 'Ahmedabad Main',
        state: 'GJ',
        supervisor: 'Kiran Patel',
        auditProgress: { percentage: 0, completedSKUs: 0, totalSKUs: 3600 },
        inventorySummary: { totalSKUs: 3600, auditedSKUs: 0, totalValue: 485000, totalQuantity: 42000 },
        auditors: [],
        deviations: [],
        contra: []
      },
      'MP008': {
        storeId: 'MP008',
        storeName: 'Kolkata East',
        state: 'WB',
        supervisor: 'Sourav Das',
        auditProgress: { percentage: 100, completedSKUs: 3800, totalSKUs: 3800 },
        inventorySummary: { totalSKUs: 3800, auditedSKUs: 3800, totalValue: 725000, totalQuantity: 58900 },
        auditors: [
          { name: 'Debashis Roy', assignedSKUs: 1900, completedSKUs: 1900, completionRate: 100, matchRate: 93.8 },
          { name: 'Tanmoy Sen', assignedSKUs: 1900, completedSKUs: 1900, completionRate: 100, matchRate: 95.2 }
        ],
        deviations: [
          { type: 'Invoiced', count: 20, value: 17500 },
          { type: 'Contra Short', count: 13, value: 11800 },
          { type: 'Contra Excess', count: 8, value: 7200 },
          { type: 'Excess Submitted', count: 5, value: 4400 }
        ],
        contra: [
          { skuCode: 'MED070', productName: 'Antibiotics Amoxicillin', type: 'Short', quantity: 36, value: 4800, status: 'Approved' },
          { skuCode: 'MED071', productName: 'Painkillers Tramadol', type: 'Short', quantity: 29, value: 3900, status: 'Pending' },
          { skuCode: 'MED072', productName: 'Antihistamine Tablets', type: 'Excess', quantity: 21, value: 2500, status: 'Approved' },
          { skuCode: 'MED073', productName: 'Antiseptic Solution', type: 'Short', quantity: 25, value: 3000, status: 'Pending' }
        ]
      },
      'MP009': {
        storeId: 'MP009',
        storeName: 'Nagpur Central',
        state: 'MH',
        supervisor: 'Pooja Deshmukh',
        auditProgress: { percentage: 100, completedSKUs: 3200, totalSKUs: 3200 },
        inventorySummary: { totalSKUs: 3200, auditedSKUs: 3200, totalValue: 595000, totalQuantity: 48200 },
        auditors: [
          { name: 'Sachin Bhosale', assignedSKUs: 1600, completedSKUs: 1600, completionRate: 100, matchRate: 94.5 },
          { name: 'Madhuri Joshi', assignedSKUs: 1600, completedSKUs: 1600, completionRate: 100, matchRate: 96.1 }
        ],
        deviations: [
          { type: 'Invoiced', count: 7, value: 6100 },
          { type: 'Contra Short', count: 4, value: 3700 },
          { type: 'Contra Excess', count: 2, value: 1800 }
        ],
        contra: [
          { skuCode: 'MED080', productName: 'Ayurvedic Syrup', type: 'Short', quantity: 16, value: 1900, status: 'Approved' },
          { skuCode: 'MED081', productName: 'Herbal Tablets', type: 'Short', quantity: 20, value: 2400, status: 'Approved' },
          { skuCode: 'MED082', productName: 'Digestive Enzymes', type: 'Excess', quantity: 12, value: 1500, status: 'Pending' }
        ]
      },
      'MP010': {
        storeId: 'MP010',
        storeName: 'Bhopal Main',
        state: 'MP',
        supervisor: 'Anil Shukla',
        auditProgress: { percentage: 100, completedSKUs: 2900, totalSKUs: 2900 },
        inventorySummary: { totalSKUs: 2900, auditedSKUs: 2900, totalValue: 515000, totalQuantity: 41500 },
        auditors: [
          { name: 'Rajat Tiwari', assignedSKUs: 1450, completedSKUs: 1450, completionRate: 100, matchRate: 92.8 },
          { name: 'Kavita Singh', assignedSKUs: 1450, completedSKUs: 1450, completionRate: 100, matchRate: 94.3 }
        ],
        deviations: [
          { type: 'Invoiced', count: 16, value: 13900 },
          { type: 'Contra Short', count: 9, value: 7800 },
          { type: 'Contra Excess', count: 5, value: 4300 },
          { type: 'Excess Submitted', count: 3, value: 2600 }
        ],
        contra: [
          { skuCode: 'MED090', productName: 'Calcium Supplements', type: 'Short', quantity: 28, value: 3400, status: 'Pending' },
          { skuCode: 'MED091', productName: 'Vitamin B Complex', type: 'Short', quantity: 23, value: 2800, status: 'Approved' },
          { skuCode: 'MED092', productName: 'Iron Tablets', type: 'Excess', quantity: 17, value: 2000, status: 'Pending' },
          { skuCode: 'MED093', productName: 'Zinc Supplements', type: 'Short', quantity: 19, value: 2300, status: 'Approved' }
        ]
      },
      'MP012': {
        storeId: 'MP012',
        storeName: 'Surat Hub',
        state: 'GJ',
        supervisor: 'Dipak Shah',
        auditProgress: { percentage: 0, completedSKUs: 0, totalSKUs: 2800 },
        inventorySummary: { totalSKUs: 2800, auditedSKUs: 0, totalValue: 425000, totalQuantity: 35800 },
        auditors: [
          { name: 'Hitesh Patel', assignedSKUs: 1400, completedSKUs: 0, completionRate: 0, matchRate: 0 },
          { name: 'Nisha Modi', assignedSKUs: 1400, completedSKUs: 0, completionRate: 0, matchRate: 0 }
        ],
        deviations: [],
        contra: []
      },
      'MP015': {
        storeId: 'MP015',
        storeName: 'Jaipur Pink City',
        state: 'RJ',
        supervisor: 'Vikram Singh',
        auditProgress: { percentage: 0, completedSKUs: 0, totalSKUs: 3200 },
        inventorySummary: { totalSKUs: 3200, auditedSKUs: 0, totalValue: 485000, totalQuantity: 38900 },
        auditors: [],
        deviations: [],
        contra: []
      },
      'MP018': {
        storeId: 'MP018',
        storeName: 'Coimbatore Main',
        state: 'TN',
        supervisor: 'Ramesh Babu',
        auditProgress: { percentage: 44.0, completedSKUs: 1850, totalSKUs: 4200 },
        inventorySummary: { totalSKUs: 4200, auditedSKUs: 1850, totalValue: 625000, totalQuantity: 51200 },
        auditors: [
          { name: 'Kumar Raja', assignedSKUs: 2100, completedSKUs: 925, completionRate: 44.0, matchRate: 87.5 },
          { name: 'Lakshmi Priya', assignedSKUs: 2100, completedSKUs: 925, completionRate: 44.0, matchRate: 89.8 }
        ],
        deviations: [
          { type: 'Invoiced', count: 14, value: 12100 },
          { type: 'Contra Short', count: 10, value: 8600 },
          { type: 'Contra Excess', count: 6, value: 5100 },
          { type: 'Excess Submitted', count: 3, value: 2600 }
        ],
        contra: [
          { skuCode: 'MED110', productName: 'Cough Syrups 200ml', type: 'Short', quantity: 27, value: 3200, status: 'Pending' },
          { skuCode: 'MED111', productName: 'Capsules Antibiotic', type: 'Short', quantity: 33, value: 4000, status: 'Pending' },
          { skuCode: 'MED112', productName: 'Lozenges Cherry', type: 'Excess', quantity: 18, value: 2200, status: 'Approved' },
          { skuCode: 'MED113', productName: 'Nasal Decongestant', type: 'Short', quantity: 21, value: 2500, status: 'Pending' }
        ]
      },
      'MP022': {
        storeId: 'MP022',
        storeName: 'Lucknow Central',
        state: 'UP',
        supervisor: 'Sanjay Gupta',
        auditProgress: { percentage: 0, completedSKUs: 0, totalSKUs: 2800 },
        inventorySummary: { totalSKUs: 2800, auditedSKUs: 0, totalValue: 395000, totalQuantity: 32500 },
        auditors: [],
        deviations: [],
        contra: []
      },
      'MP033': {
        storeId: 'MP033',
        storeName: 'Chandigarh Hub',
        state: 'PB',
        supervisor: 'Meera Kapoor',
        auditProgress: { percentage: 0, completedSKUs: 0, totalSKUs: 4100 },
        inventorySummary: { totalSKUs: 4100, auditedSKUs: 0, totalValue: 615000, totalQuantity: 49800 },
        auditors: [],
        deviations: [],
        contra: []
      },
      'MP041': {
        storeId: 'MP041',
        storeName: 'Indore Main',
        state: 'MP',
        supervisor: 'Rahul Joshi',
        auditProgress: { percentage: 0, completedSKUs: 0, totalSKUs: 3500 },
        inventorySummary: { totalSKUs: 3500, auditedSKUs: 0, totalValue: 525000, totalQuantity: 42800 },
        auditors: [],
        deviations: [],
        contra: []
      },
      'MP006': {
        storeId: 'MP006',
        storeName: 'Delhi NCR',
        state: 'DL',
        supervisor: 'Amit Verma',
        auditProgress: { percentage: 100, completedSKUs: 4500, totalSKUs: 4500 },
        inventorySummary: { totalSKUs: 4500, auditedSKUs: 4500, totalValue: 685000, totalQuantity: 58900 },
        auditors: [
          { name: 'Rohit', assignedSKUs: 1500, completedSKUs: 1500, completionRate: 100, matchRate: 97.3 },
          { name: 'Sneha', assignedSKUs: 1500, completedSKUs: 1500, completionRate: 100, matchRate: 98.1 },
          { name: 'Karan', assignedSKUs: 1500, completedSKUs: 1500, completionRate: 100, matchRate: 96.8 }
        ],
        deviations: [
          { type: 'Invoiced', count: 8, value: 6800 },
          { type: 'Contra Short', count: 3, value: 2400 },
          { type: 'Contra Excess', count: 1, value: 800 }
        ],
        contra: [
          { skuCode: 'SKU12345', productName: 'Paracetamol 500mg', type: 'Short', quantity: 5, value: 600, status: 'Approved' },
          { skuCode: 'SKU12347', productName: 'Aspirin 75mg', type: 'Short', quantity: 2, value: 240, status: 'Pending' },
          { skuCode: 'SKU12348', productName: 'Vitamin C Tablets', type: 'Excess', quantity: 2, value: 180, status: 'Approved' }
        ]
      },
      'MP008': {
        storeId: 'MP008',
        storeName: 'Kolkata East',
        state: 'WB',
        supervisor: 'Sourav Das',
        auditProgress: { percentage: 100, completedSKUs: 3800, totalSKUs: 3800 },
        inventorySummary: { totalSKUs: 3800, auditedSKUs: 3800, totalValue: 542000, totalQuantity: 48600 },
        auditors: [
          { name: 'Ankit', assignedSKUs: 1900, completedSKUs: 1900, completionRate: 100, matchRate: 95.3 },
          { name: 'Rina', assignedSKUs: 1900, completedSKUs: 1900, completionRate: 100, matchRate: 95.8 }
        ],
        deviations: [
          { type: 'Invoiced', count: 12, value: 9800 },
          { type: 'Contra Short', count: 4, value: 3200 },
          { type: 'Contra Excess', count: 2, value: 1600 }
        ],
        contra: [
          { skuCode: 'SKU22345', productName: 'Metformin 500mg', type: 'Short', quantity: 8, value: 960, status: 'Pending' },
          { skuCode: 'SKU22346', productName: 'Amlodipine 5mg', type: 'Excess', quantity: 4, value: 480, status: 'Approved' }
        ]
      },
      'MP009': {
        storeId: 'MP009',
        storeName: 'Nagpur Central',
        state: 'MH',
        supervisor: 'Pooja Deshmukh',
        auditProgress: { percentage: 100, completedSKUs: 3200, totalSKUs: 3200 },
        inventorySummary: { totalSKUs: 3200, auditedSKUs: 3200, totalValue: 468000, totalQuantity: 41200 },
        auditors: [
          { name: 'Manoj', assignedSKUs: 1600, completedSKUs: 1600, completionRate: 100, matchRate: 97.8 },
          { name: 'Kavita', assignedSKUs: 1600, completedSKUs: 1600, completionRate: 100, matchRate: 97.5 }
        ],
        deviations: [
          { type: 'Invoiced', count: 5, value: 4200 },
          { type: 'Contra Short', count: 2, value: 1600 },
          { type: 'Contra Excess', count: 1, value: 800 }
        ],
        contra: [
          { skuCode: 'SKU32345', productName: 'Omeprazole 20mg', type: 'Short', quantity: 3, value: 360, status: 'Approved' }
        ]
      }
    };

    return storeDataMap[storeId] || null;
  }
};

// API Configuration Template
export const apiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    // Add authentication headers
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
};

// Example API Integration with Axios
/*
import axios from 'axios';

const api = axios.create(apiConfig);

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
*/
