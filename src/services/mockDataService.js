// Mock Data Service - Replace with actual API calls
// src/services/mockDataService.js

export const mockDataService = {
  // Store Coverage Data
  getStoreCoverageStats: async (filters) => {
    // Replace with: return await api.get('/api/stores/coverage', { params: filters })
    return {
      totalActive: 450,
      covered: 385,
      uncovered: 65,
      coveredPercentage: 85.6,
      uncoveredPercentage: 14.4
    };
  },

  getStoreRecencyData: async (filters) => {
    // Replace with: return await api.get('/api/stores/recency', { params: filters })
    return [
      { range: '0-3 Months', stores: 180, percentage: 46.8 },
      { range: '3-6 Months', stores: 125, percentage: 32.5 },
      { range: '6-9 Months', stores: 55, percentage: 14.3 },
      { range: '9-12 Months', stores: 25, percentage: 6.5 }
    ];
  },

  getInventoryData: async (filters) => {
    // Replace with: return await api.get('/api/inventory/summary', { params: filters })
    return {
      totalSKUs: 12450,
      totalQuantity: 245600,
      totalValue: 3456789.50
    };
  },

  getDeviationData: async (filters) => {
    // Replace with: return await api.get('/api/deviations', { params: filters })
    return [
      { type: 'Private - Invoiced', value: 45000, count: 245 },
      { type: 'Private - Contra Short', value: 32000, count: 178 },
      // ... more data
    ];
  },

  // Live Audit Schedule Data
  getAuditWorkflowStats: async (filters) => {
    // Replace with: return await api.get('/api/audits/workflow-stats', { params: filters })
    return {
      created: 45,
      inProgress: 128,
      pending: 37,
      completed: 240
    };
  },

  getAuditScheduleData: async (filters) => {
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

  getLiveAuditProgress: async (storeId, filters) => {
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
  getPerformanceMetrics: async (filters) => {
    // Replace with: return await api.get('/api/auditors/metrics', { params: filters })
    return {
      avgTimePerSKU: '4.2 min',
      matchRate: 94.5,
      editRate: 8.3
    };
  },

  getAuditorProductivityData: async (filters) => {
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

  getAuditorPIDDetails: async (auditorId, filters) => {
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
  getSupervisorData: async (filters) => {
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

  getReauditData: async (filters) => {
    // Replace with: return await api.get('/api/reaudits/lifecycle', { params: filters })
    return [
      { stage: 'Initially Appeared', count: 1250, color: '#dc3545' },
      { stage: 'Matched (Verified)', count: 875, color: '#198754' },
      { stage: 'Edited (Modified)', count: 245, color: '#ffc107' },
      { stage: 'Pending (Awaiting)', count: 130, color: '#0d6efd' }
    ];
  },

  getContraApprovalData: async (filters) => {
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
  getStoreDetails: async (type, filters) => {
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

  getSKUDeviationDetails: async (deviationType, filters) => {
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
  }
};

// API Configuration Template
export const apiConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
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
