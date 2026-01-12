import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Button, Badge, Table, Dropdown } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import KPICard from '../components/KPICard';
import storeCoverageData from '../data/store_coverage_data.json';
import './StoreCoverage.css';

const StoreCoverage = ({ filters = {} }) => {
  const navigate = useNavigate();
  const [selectedDeviation, setSelectedDeviation] = useState(null);
  const [recencyView, setRecencyView] = useState('monthly'); // quarterly, half-yearly, yearly

  // Helper function to format numbers in Indian numbering system
  const formatIndianNumber = (num) => {
    if (num === null || num === undefined) return '0';
    const numStr = num.toString();
    const [intPart, decPart] = numStr.split('.');

    // Format integer part with Indian numbering
    let lastThree = intPart.substring(intPart.length - 3);
    const otherNumbers = intPart.substring(0, intPart.length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    const result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

    return decPart ? result + '.' + decPart : result;
  };

  // Check if any filters are active
  const hasActiveFilters = (filters.state && filters.state.length > 0) ||
    (filters.store && filters.store.length > 0) ||
    (filters.auditJobType && filters.auditJobType.length > 0) ||
    (filters.auditProcessType && filters.auditProcessType.length > 0) ||
    (filters.auditStatus && filters.auditStatus.length > 0);

  // Apply filters to store data
  const filteredStoreData = useMemo(() => {
    let data = [...storeCoverageData];

    // Apply state filter - handle both array and single value
    if (filters.state && filters.state.length > 0) {
      const stateArray = Array.isArray(filters.state) ? filters.state : [filters.state];
      data = data.filter(store => stateArray.includes(store.State));
    }

    // Apply store type filter (HUB or REGULAR) - handle both array and single value
    if (filters.store && filters.store.length > 0) {
      const storeArray = Array.isArray(filters.store) ? filters.store : [filters.store];
      data = data.filter(store => storeArray.includes(store.StoreType));
    }

    // Apply audit job type filter - handle both array and single value
    if (filters.auditJobType && filters.auditJobType.length > 0) {
      const jobTypeArray = Array.isArray(filters.auditJobType) ? filters.auditJobType : [filters.auditJobType];
      data = data.filter(store =>
        store.IsCovered && jobTypeArray.includes(store.LastAuditJobType)
      );
    }

    // Apply audit process type filter - handle both array and single value
    if (filters.auditProcessType && filters.auditProcessType.length > 0) {
      const processTypeArray = Array.isArray(filters.auditProcessType) ? filters.auditProcessType : [filters.auditProcessType];
      data = data.filter(store =>
        store.IsCovered && processTypeArray.includes(store.LastAuditProcessType)
      );
    }

    // Apply audit status filter - handle both array and single value
    if (filters.auditStatus && filters.auditStatus.length > 0) {
      const statusArray = Array.isArray(filters.auditStatus) ? filters.auditStatus : [filters.auditStatus];
      data = data.filter(store =>
        store.IsCovered && statusArray.includes(store.LastAuditStatus)
      );
    }

    return data;
  }, [filters, storeCoverageData]);

  // Calculate store stats from filtered data
  const storeStats = useMemo(() => {
    // Hardcoded values for audited stores
    const covered = 478;
    const activeAuditedStores = 410;
    const inactiveAuditedStores = 8;
    const uncovered = 60;

    // Assume all stores in data are active (can be enhanced with IsActive field if available)
    const activeStores = filteredStoreData.filter(s => s.IsActive !== false).length;
    const inactiveStores = filteredStoreData.filter(s => s.IsActive === false).length;
    const totalStores = activeAuditedStores + uncovered;

    const coveredPercentage = totalStores > 0 ? ((activeAuditedStores / totalStores) * 100).toFixed(1) : 0;
    const uncoveredPercentage = totalStores > 0 ? ((uncovered / totalStores) * 100).toFixed(1) : 0;

    return {
      totalStores,
      activeStores,
      inactiveStores,
      totalActive: activeStores, // Keep for backward compatibility
      covered,
      uncovered,
      coveredPercentage: parseFloat(coveredPercentage),
      uncoveredPercentage: parseFloat(uncoveredPercentage),
      activeAuditedStores,
      inactiveAuditedStores
    };
  }, [filteredStoreData]);

  // Calculate store breakdown by type and box mapping
  const storeBreakdown = useMemo(() => {
    const breakdown = [
      { storeType: 'STOCK HUB', boxType: 'Box Mapping', total: 0, covered: 0, uncovered: 0 },
      { storeType: 'NO STOCK HUB', boxType: 'Non Box Mapping', total: 0, covered: 0, uncovered: 0 },
      { storeType: 'REGULAR', boxType: 'Box Mapping', total: 0, covered: 0, uncovered: 0 },
      { storeType: 'REGULAR', boxType: 'Non Box Mapping', total: 0, covered: 0, uncovered: 0 }
    ];

    filteredStoreData.forEach(store => {
      const idx = breakdown.findIndex(b =>
        b.storeType === store.StoreType && b.boxType === store.BoxMapping
      );
      if (idx !== -1) {
        breakdown[idx].total++;
        if (store.IsCovered) {
          breakdown[idx].covered++;
        } else {
          breakdown[idx].uncovered++;
        }
      }
    });

    return breakdown;
  }, [filteredStoreData]);

  // Calculate recency data
  const recencyDataSets = useMemo(() => {
    const coveredStores = filteredStoreData.filter(s => s.IsCovered);

    const monthly = {
      'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0,
      'Oct': 0, 'Nov': 0, 'Dec': 0, 'Jan': 0, 'Feb': 0, 'Mar': 0
    };

    coveredStores.forEach(store => {
      if (store.LastAuditDate) {
        const date = new Date(store.LastAuditDate);
        const month = date.toLocaleString('default', { month: 'short' });
        if (monthly[month] !== undefined) {
          monthly[month]++;
        }
      }
    });

    const quarterly = {
      'Apr - Jun': coveredStores.filter(s => s.RecencyQuarter === 'Apr - Jun').length,
      'Jul - Sep': coveredStores.filter(s => s.RecencyQuarter === 'Jul - Sep').length,
      'Oct - Dec': coveredStores.filter(s => s.RecencyQuarter === 'Oct - Dec').length,
      'Jan - Mar': coveredStores.filter(s => s.RecencyQuarter === 'Jan - Mar').length
    };

    const halfYearly = {
      'Apr - Sep': quarterly['Apr - Jun'] + quarterly['Jul - Sep'],
      'Oct - Mar': quarterly['Oct - Dec'] + quarterly['Jan - Mar']
    };

    const total = coveredStores.length;

    return {
      monthly: Object.entries(monthly).map(([range, stores]) => ({
        range,
        stores,
        percentage: total > 0 ? parseFloat(((stores / total) * 100).toFixed(1)) : 0
      })),
      quarterly: Object.entries(quarterly).map(([range, stores]) => ({
        range,
        stores,
        percentage: total > 0 ? parseFloat(((stores / total) * 100).toFixed(1)) : 0
      })),
      'half-yearly': Object.entries(halfYearly).map(([range, stores]) => ({
        range,
        stores,
        percentage: total > 0 ? parseFloat(((stores / total) * 100).toFixed(1)) : 0
      }))
    };
  }, [filteredStoreData]);

  const recencyData = recencyDataSets[recencyView];

  // Calculate inventory data from filtered stores
  const inventoryData = useMemo(() => {
    const coveredStores = filteredStoreData.filter(s => s.IsCovered);
    const totalValueMRP = coveredStores.reduce((sum, s) => sum + s.InventoryValue, 0);
    const totalValueCost = totalValueMRP * 0.75; // Assuming cost is 75% of MRP
    return {
      totalSKUs: coveredStores.reduce((sum, s) => sum + s.TotalSKUs, 0),
      totalQuantity: coveredStores.reduce((sum, s) => sum + s.TotalQuantity, 0),
      totalValue: totalValueMRP,
      totalValueCost: totalValueCost,
      totalValueMRP: totalValueMRP
    };
  }, [filteredStoreData]);

  // Calculate deviation data from filtered stores
  const deviationData = useMemo(() => {
    const coveredStores = filteredStoreData.filter(s => s.IsCovered);
    const deviationMap = {
      'Short': { value: 0, count: 0 },
      'Excess': { value: 0, count: 0 },
      'Contra Short': { value: 0, count: 0 },
      'Contra Excess': { value: 0, count: 0 }
    };

    coveredStores.forEach(store => {
      if (store.Deviations && store.Deviations.length > 0) {
        store.Deviations.forEach(dev => {
          // Use dev.type from JSON
          if (deviationMap[dev.type]) {
            deviationMap[dev.type].value += dev.value || 0;
            deviationMap[dev.type].count += dev.count || 0;
          }
        });
      }
    });

    return Object.entries(deviationMap).map(([type, data]) => ({
      type,
      value: Math.round(data.value),
      count: data.count
    }));
  }, [filteredStoreData]);

  // Calculate product form data from filtered stores
  const productFormData = useMemo(() => {
    const coveredStores = filteredStoreData.filter(s => s.IsCovered);
    
    // All possible product forms
    const ALL_PRODUCT_FORMS = ["Tablets", "Liquids", "Injection", "Ointments", "Powders", "Drops", "Inhalers", "Containers", "General", "Surgicals"];
    
    const formDataMap = {
      'Short': {},
      'Excess': {},
      'Contra Short': {},
      'Contra Excess': {}
    };

    // Initialize all product forms with 0 for each deviation type
    Object.keys(formDataMap).forEach(devType => {
      ALL_PRODUCT_FORMS.forEach(form => {
        formDataMap[devType][form] = { value: 0, count: 0 };
      });
    });

    coveredStores.forEach(store => {
      if (store.Deviations && store.Deviations.length > 0) {
        store.Deviations.forEach(dev => {
          // Use dev.type (from JSON) instead of dev.DeviationType
          const devType = dev.type;
          if (formDataMap[devType] && dev.ProductForms && Array.isArray(dev.ProductForms)) {
            dev.ProductForms.forEach(pf => {
              if (formDataMap[devType][pf.ProductForm]) {
                formDataMap[devType][pf.ProductForm].value += pf.Value || 0;
                formDataMap[devType][pf.ProductForm].count += pf.Count || 0;
              }
            });
          }
        });
      }
    });

    // Convert to array format
    const result = {};
    Object.keys(formDataMap).forEach(devType => {
      // Include ALL forms - both with and without data
      result[devType] = Object.entries(formDataMap[devType])
        .map(([form, data]) => ({
          form,
          value: Math.round(data.value),
          count: data.count
        }))
        .sort((a, b) => b.value - a.value); // Sort by value descending
    });

    return result;
  }, [filteredStoreData]);

  const COLORS = ['#0d6efd', '#dc3545', '#ffc107', '#198754'];
  const FORM_COLORS = ['#8B5CF6', '#FF6B35', '#4ADE80', '#FF1493', '#3B82F6', '#FFD700', '#FF4500', '#00CED1', '#DA70D6', '#00BFFF'];

  // Function to export product form data to Excel
  const exportProductFormToExcel = () => {
    let dataToExport = [];
    let fileName = 'Product_Form_Overall.xlsx';

    if (selectedDeviation && productFormData[selectedDeviation.type] && productFormData[selectedDeviation.type].length > 0) {
      // Export specific deviation data
      dataToExport = productFormData[selectedDeviation.type].map(item => ({
        'Deviation Type': selectedDeviation.type,
        'Product Form': item.form,
        'Value (₹)': item.value,
        'Item Count': item.count
      }));
      fileName = `Product_Form_${selectedDeviation.type.replace(/\s+/g, '_')}.xlsx`;
    } else {
      // Export overall data - calculate from all deviation types
      const overallData = {};
      Object.values(productFormData).forEach(devForms => {
        devForms.forEach(item => {
          if (!overallData[item.form]) {
            overallData[item.form] = { value: 0, count: 0 };
          }
          overallData[item.form].value += item.value;
          overallData[item.form].count += item.count;
        });
      });

      dataToExport = Object.entries(overallData)
        .map(([form, data]) => ({
          'Product Form': form,
          'Value (₹)': data.value,
          'Item Count': data.count
        }))
        .sort((a, b) => b['Value (₹)'] - a['Value (₹)']);
    }

    if (dataToExport.length === 0) {
      alert('No data available to export');
      return;
    }

    // Create worksheet
    const ws = utils.json_to_sheet(dataToExport);

    // Create workbook
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Product Forms');

    // Download file
    writeFile(wb, fileName);
  };

  // Export product form data to PDF
  const exportProductFormToPDF = () => {
    const doc = new jsPDF();

    if (selectedDeviation && productFormData[selectedDeviation.type] && productFormData[selectedDeviation.type].length > 0) {
      // Export specific deviation data
      doc.setFontSize(16);
      doc.text(`Product Form Analysis: ${selectedDeviation.type}`, 14, 20);

      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
      doc.text(`Total Value: Rs. ${formatIndianNumber(selectedDeviation.value)}`, 14, 34);
      doc.text(`Total Items: ${selectedDeviation.count}`, 14, 40);

      autoTable(doc, {
        startY: 46,
        head: [['Product Form', 'Value (Rs.)', 'Item Count']],
        body: productFormData[selectedDeviation.type].map(item => [
          item.form,
          `Rs. ${formatIndianNumber(item.value)}`,
          item.count.toString()
        ]),
        theme: 'striped',
        headStyles: { fillColor: [13, 110, 253] }
      });

      doc.save(`Product_Form_${selectedDeviation.type.replace(/\s+/g, '_')}.pdf`);
    } else {
      // Export overall data
      const overallData = {};
      Object.values(productFormData).forEach(devForms => {
        devForms.forEach(item => {
          if (!overallData[item.form]) {
            overallData[item.form] = { value: 0, count: 0 };
          }
          overallData[item.form].value += item.value;
          overallData[item.form].count += item.count;
        });
      });

      const dataToExport = Object.entries(overallData)
        .map(([form, data]) => [form, `Rs. ${formatIndianNumber(data.value)}`, data.count.toString()])
        .sort((a, b) => {
          const aVal = parseInt(a[1].replace(/[Rs.,\s]/g, ''));
          const bVal = parseInt(b[1].replace(/[Rs.,\s]/g, ''));
          return bVal - aVal;
        });

      doc.setFontSize(16);
      doc.text('Overall Product Form Distribution', 14, 20);

      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
      doc.text('Across all deviation types', 14, 34);

      autoTable(doc, {
        startY: 40,
        head: [['Product Form', 'Value (Rs.)', 'Item Count']],
        body: dataToExport,
        theme: 'striped',
        headStyles: { fillColor: [13, 110, 253] }
      });

      doc.save('Product_Form_Overall.pdf');
    }
  };

  // Export store coverage summary to Excel
  const exportStoreCoverageToExcel = () => {
    const summaryData = [
      { 'Metric': 'Total Active Stores', 'Value': storeStats.totalActive },
      { 'Metric': 'Audited Stores', 'Value': storeStats.covered, 'Percentage': `${storeStats.coveredPercentage}%` },
      { 'Metric': 'Non Audited Stores', 'Value': storeStats.uncovered, 'Percentage': `${storeStats.uncoveredPercentage}%` }
    ];

    const inventorySummary = [
      { 'Metric': 'Total SKUs', 'Value': inventoryData.totalSKUs },
      { 'Metric': 'Total Quantity', 'Value': inventoryData.totalQuantity },
      { 'Metric': 'Total Inventory Value (₹)', 'Value': inventoryData.totalValue }
    ];

    const deviationSummary = deviationData.map(item => ({
      'Deviation Type': item.type,
      'Value (₹)': item.value,
      'Item Count': item.count
    }));

    // Create workbook with multiple sheets
    const wb = utils.book_new();

    // Store Coverage sheet
    const ws1 = utils.json_to_sheet(summaryData);
    utils.book_append_sheet(wb, ws1, 'Store Coverage');

    // Inventory Summary sheet
    const ws2 = utils.json_to_sheet(inventorySummary);
    utils.book_append_sheet(wb, ws2, 'Inventory Summary');

    // Deviation Summary sheet
    const ws3 = utils.json_to_sheet(deviationSummary);
    utils.book_append_sheet(wb, ws3, 'Audit Accuracy');

    // Add product-level details for each deviation type
    Object.keys(productFormData).forEach(deviationType => {
      if (productFormData[deviationType] && productFormData[deviationType].length > 0) {
        const productDetails = productFormData[deviationType].map(item => ({
          'Deviation Type': deviationType,
          'Product Form': item.form,
          'Value (₹)': item.value,
          'Item Count': item.count
        }));

        // Truncate sheet name to 31 characters (Excel limit)
        const sheetName = deviationType.length > 31 ? deviationType.substring(0, 28) + '...' : deviationType;
        const ws = utils.json_to_sheet(productDetails);
        utils.book_append_sheet(wb, ws, sheetName);
      }
    });

    // Download file
    const fileName = `Store_Coverage_Summary_${new Date().toISOString().split('T')[0]}.xlsx`;
    writeFile(wb, fileName);
  };

  // Export store coverage summary to PDF
  const exportStoreCoverageToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text('Store Coverage Summary Report', 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    // Store Coverage Summary
    doc.setFontSize(12);
    doc.text('Store Coverage', 14, 40);
    autoTable(doc, {
      startY: 44,
      head: [['Metric', 'Value', 'Percentage']],
      body: [
        ['Total Active Stores', storeStats.totalActive.toString(), '100%'],
        ['Audited Stores', storeStats.covered.toString(), `${storeStats.coveredPercentage}%`],
        ['Non Audited Stores', storeStats.uncovered.toString(), `${storeStats.uncoveredPercentage}%`]
      ],
      theme: 'grid',
      headStyles: { fillColor: [13, 110, 253] }
    });

    // Inventory Summary
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text('Inventory Summary', 14, finalY);
    autoTable(doc, {
      startY: finalY + 4,
      head: [['Metric', 'Value']],
      body: [
        ['Total SKUs', formatIndianNumber(inventoryData.totalSKUs)],
        ['Total Quantity', formatIndianNumber(inventoryData.totalQuantity)],
        ['Total Inventory Value', `Rs. ${formatIndianNumber(inventoryData.totalValue)}`]
      ],
      theme: 'grid',
      headStyles: { fillColor: [13, 110, 253] }
    });

    // Deviation Summary
    finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text('Audit Accuracy', 14, finalY);
    autoTable(doc, {
      startY: finalY + 4,
      head: [['Deviation Type', 'Value (Rs.)', 'Item Count']],
      body: deviationData.map(item => [
        item.type,
        `Rs. ${formatIndianNumber(item.value)}`,
        item.count.toString()
      ]),
      theme: 'striped',
      headStyles: { fillColor: [220, 53, 69] }
    });

    // Store Breakdown by Type
    finalY = doc.lastAutoTable.finalY + 10;
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFontSize(12);
    doc.text('Store Type & Box Mapping Breakdown', 14, finalY);
    autoTable(doc, {
      startY: finalY + 4,
      head: [['Store Type', 'Box Type', 'Total', 'Covered', 'Uncovered', 'Coverage %']],
      body: storeBreakdown.map(row => [
        row.storeType,
        row.boxType,
        row.total.toString(),
        row.covered.toString(),
        row.uncovered.toString(),
        `${((row.covered / row.total) * 100).toFixed(1)}%`
      ]),
      theme: 'grid',
      headStyles: { fillColor: [13, 110, 253] },
      styles: { fontSize: 9 }
    });

    // Product-Level Details for Each Deviation Type
    Object.keys(productFormData).forEach(deviationType => {
      if (productFormData[deviationType] && productFormData[deviationType].length > 0) {
        finalY = doc.lastAutoTable.finalY + 10;
        if (finalY > 250) {
          doc.addPage();
          finalY = 20;
        }
        doc.setFontSize(11);
        doc.text(`Product Forms: ${deviationType}`, 14, finalY);
        autoTable(doc, {
          startY: finalY + 4,
          head: [['Product Form', 'Value (Rs.)', 'Item Count']],
          body: productFormData[deviationType].map(item => [
            item.form,
            `Rs. ${formatIndianNumber(item.value)}`,
            item.count.toString()
          ]),
          theme: 'striped',
          headStyles: { fillColor: [46, 134, 193] },
          styles: { fontSize: 9 }
        });
      }
    });

    // Save PDF
    const fileName = `Store_Coverage_Summary_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  // Export recency analysis to Excel
  const exportRecencyAnalysisToExcel = () => {
    const dataToExport = recencyData.map(item => ({
      'Time Range': item.range,
      'Number of Stores': item.stores,
      'Percentage (%)': item.percentage
    }));

    // Create worksheet
    const ws = utils.json_to_sheet(dataToExport);

    // Create workbook
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Recency Analysis');

    // Download file
    const fileName = `Store_Recency_Analysis_${recencyView}_${new Date().toISOString().split('T')[0]}.xlsx`;
    writeFile(wb, fileName);
  };

  // Export recency analysis to PDF
  const exportRecencyAnalysisToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text(`Store Recency Analysis - ${recencyView.charAt(0).toUpperCase() + recencyView.slice(1)}`, 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    // Recency Data Table
    doc.setFontSize(12);
    doc.text('Recency Breakdown', 14, 40);
    autoTable(doc, {
      startY: 44,
      head: [['Time Range', 'Number of Stores', 'Percentage (%)']],
      body: recencyData.map(item => [
        item.range,
        item.stores.toString(),
        `${item.percentage}%`
      ]),
      theme: 'grid',
      headStyles: { fillColor: [13, 110, 253] }
    });

    // Summary
    const totalStores = recencyData.reduce((sum, item) => sum + item.stores, 0);
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text(`Total Audited Stores: ${totalStores}`, 14, finalY);

    // Save PDF
    const fileName = `Store_Recency_Analysis_${recencyView}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  // Drill-down handlers
  const showStoreDetails = (type) => {
    const typeMap = {
      'Total Stores': 'total-active-stores',
      'Total Active Stores': 'total-active-stores',
      'Active Stores': 'total-active-stores',
      'Audited Stores': 'covered-stores',
      'Non Audited Stores': 'uncovered-stores',
      'Covered Stores': 'covered-stores',
      'Uncovered Stores': 'uncovered-stores',
      'Stores - Oct - Dec': 'stores-recency-oct-dec',
      'Stores - Jul - Sep': 'stores-recency-jul-sep',
      'Stores - Apr - Jun': 'stores-recency-apr-jun',
      'Stores - Jan - Mar': 'stores-recency-jan-mar'
    };
    navigate(`/details?title=${encodeURIComponent(type)}&type=${typeMap[type]}`);
  };

  return (
    <Container fluid className="store-coverage-tab py-4">
      {/* KPI Summary Cards */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <KPICard
            title="Audited Stores"
            value={storeStats.activeAuditedStores + storeStats.inactiveAuditedStores}
            subtitle={(() => {
              const activeAudited = storeStats.activeAuditedStores;
              const inactiveAudited = storeStats.inactiveAuditedStores;
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                  <div style={{ textAlign: 'left' }}>
                    <div>Active: <strong style={{ color: 'black' }}>{activeAudited}</strong></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    Inactive: {inactiveAudited}
                  </div>
                </div>
              );
            })()}
            icon="fas fa-check-circle"
            color="success"
            onClick={() => showStoreDetails('Audited Stores')}
          />
        </Col>
        <Col md={4}>
          <KPICard
            title="Audit in progress"
            value={47}
            subtitle={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <div style={{ textAlign: 'left' }}>
                  <div>Live: <strong style={{ color: 'black' }}>12</strong></div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div>Scheduled: <strong style={{ color: 'black' }}>35</strong></div>
                </div>
              </div>
            }
            icon="fas fa-clock"
            color="primary"
            onClick={() => navigate('/live-audit')}
          />
        </Col>
        <Col md={4}>
          <KPICard
            title="Non Audited Stores"
            value={storeStats.uncovered}
            // subtitle={`${storeStats.uncoveredPercentage}% of total`}
            icon="fas fa-exclamation-triangle"
            color="danger"
            onClick={() => showStoreDetails('Non Audited Stores')}
          />
        </Col>
      </Row>

      {/* Inventory Summary */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <KPICard
            title="Total Audited SKUs"
            value={formatIndianNumber(inventoryData.totalSKUs)}
            subtitle="Across all audited stores"
            icon="fas fa-box"
            color="info"
          />
        </Col>
        <Col md={4}>
          <KPICard
            title="Total Audited Value (MRP)"
            value={`₹${(inventoryData.totalValueMRP / 10000000).toFixed(2)}Cr`}
            icon="fas fa-rupee-sign"
            color="success"
          />
        </Col>
        {/* <Col md={3}>
          <KPICard
            title="Total Value (MRP)"
            value={`₹${(inventoryData.totalValueMRP / 10000000).toFixed(2)}Cr`}
            subtitle="Including non-audited stores"
            icon="fas fa-money-bill-wave"
            color="warning"
          />
        </Col> */}
        <Col md={4}>
          <KPICard
            title="Total Deviation Value (MRP)"
            value={`₹${(deviationData.reduce((sum, item) => sum + item.value, 0) / 10000000).toFixed(2)}Cr`}
            subtitle="Across all deviations"
            icon="fas fa-chart-line"
            color="danger"
          />
        </Col>
      </Row>

      {/* Deviation analysis */}
      <h6 className="text-muted text-uppercase mb-3 fw-bold" style={{ fontSize: '0.85rem' }}>Deviation analysis</h6>

      {/* Deviation Breakdown */}
      <Row>
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-chart-bar me-2 text-primary"></i>
                Deviation Summary
              </h5>
            </Card.Header>
            <Card.Body>
              <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                <Table hover size="sm" className="mb-0">
                  <thead className="bg-light sticky-top">
                    <tr>
                      <th>Type</th>
                      <th className="text-end">SKUs (Count)</th>
                      <th className="text-end">Value (MRP)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deviationData.map((entry, index) => (
                      <tr
                        key={index}
                        onClick={() => setSelectedDeviation(entry)}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: selectedDeviation?.type === entry.type ? 'rgba(13, 110, 253, 0.1)' : 'transparent'
                        }}
                        className="deviation-row"
                      >
                        <td className="small">{entry.type}</td>
                        <td className="text-end">
                          <Badge bg="secondary" pill>{entry.count}</Badge>
                        </td>
                        <td className="text-end fw-semibold text-danger">
                          ₹{formatIndianNumber(entry.value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="text-center mt-3 text-muted small">
                <i className="fas fa-info-circle me-1"></i>
                Click on any deviation type to see product form breakdown
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-info-circle me-2 text-primary"></i>
                    {selectedDeviation ? 'Deviation Details' : 'Deviation Details'}
                  </h5>
                </div>
                <div className="d-flex gap-2">
                  {/* <Dropdown>
                    <Dropdown.Toggle
                      size="sm"
                      variant="success"
                      id="product-form-export-dropdown"
                    >
                      <i className="fas fa-download me-1"></i>
                      Export
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={exportProductFormToExcel}>
                        <i className="fas fa-file-excel text-success me-2"></i>
                        Export as Excel
                      </Dropdown.Item>
                      <Dropdown.Item onClick={exportProductFormToPDF}>
                        <i className="fas fa-file-pdf text-danger me-2"></i>
                        Export as PDF
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                  {selectedDeviation && (
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => setSelectedDeviation(null)}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              {selectedDeviation && productFormData[selectedDeviation.type] ? (
                <div>
                  <div className="mb-3">
                    <h6 className="text-primary mb-2">
                      <Badge bg="primary" className="me-2">{selectedDeviation.type}</Badge>
                      Product Form Breakdown
                    </h6>
                    <div className="text-muted small">
                      Total: ₹{formatIndianNumber(selectedDeviation.value)} | {selectedDeviation.count} items
                    </div>
                  </div>
                  <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                    <Table hover size="sm" className="mb-0">
                      <thead className="bg-light sticky-top">
                        <tr>
                          <th>Form</th>
                          <th className="text-end">SKUs (Count)</th>
                          <th className="text-end">Value (MRP)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productFormData[selectedDeviation.type]
                          .sort((a, b) => b.value - a.value)
                          .map((form, idx) => (
                            <tr key={idx}>
                              <td className="small">
                                <div className="d-flex align-items-center">
                                  <div
                                    style={{
                                      width: '12px',
                                      height: '12px',
                                      backgroundColor: FORM_COLORS[idx % FORM_COLORS.length],
                                      borderRadius: '2px',
                                      marginRight: '8px'
                                    }}
                                  />
                                  <span>{form.form}</span>
                                </div>
                              </td>
                              <td className="text-end">
                                <Badge bg="secondary" pill>{form.count > 0 ? form.count : '-'}</Badge>
                              </td>
                              <td className="text-end fw-semibold text-success">
                                {form.count > 0 ? `₹${formatIndianNumber(form.value)}` : '-'}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              ) : (
                /* Show Overall Product Form Distribution by default */
                (() => {
                  // Calculate overall product form data
                  const overallData = {};
                  Object.values(productFormData).forEach(devForms => {
                    devForms.forEach(item => {
                      if (!overallData[item.form]) {
                        overallData[item.form] = { value: 0, count: 0 };
                      }
                      overallData[item.form].value += item.value;
                      overallData[item.form].count += item.count;
                    });
                  });

                  const overallFormArray = Object.entries(overallData)
                    .filter(([form, data]) => data.count > 0) // Only show forms with data in overall view
                    .map(([form, data]) => ({ form, value: data.value, count: data.count }))
                    .sort((a, b) => b.value - a.value);

                  return (
                    <div>
                      <div className="mb-3">
                        <h6 className="text-primary mb-2">
                          Overall Product Form Distribution
                        </h6>
                        <div className="text-muted small">
                          Across all deviation types
                        </div>
                      </div>
                      {overallFormArray.length > 0 ? (
                        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                          <Table hover size="sm" className="mb-0">
                            <thead className="bg-light sticky-top">
                              <tr>
                                <th>Form</th>
                                <th className="text-end">SKUs (Count)</th>
                                <th className="text-end">Value (MRP)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {overallFormArray.map((form, idx) => (
                                <tr key={idx}>
                                  <td className="small">
                                    <div className="d-flex align-items-center">
                                      <div
                                        style={{
                                          width: '12px',
                                          height: '12px',
                                          backgroundColor: FORM_COLORS[idx % FORM_COLORS.length],
                                          borderRadius: '2px',
                                          marginRight: '8px'
                                        }}
                                      />
                                      <span>{form.form}</span>
                                    </div>
                                  </td>
                                  <td className="text-end">
                                    <Badge bg="secondary" pill>{form.count}</Badge>
                                  </td>
                                  <td className="text-end fw-semibold text-success">
                                    ₹{formatIndianNumber(form.value)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center text-muted py-5">
                          <i className="fas fa-inbox fa-3x mb-3 d-block"></i>
                          <p>No product form data available</p>
                          <small>Apply different filters or check data availability</small>
                        </div>
                      )}
                    </div>
                  );
                })()
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Store Recency Analysis */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-calendar-alt me-2 text-primary"></i>
                    Store Recency Analysis
                  </h5>
                  <small className="text-muted">Breakdown of audited stores in selected duration</small>
                </div>
                <div className="d-flex gap-2">
                  {/* <Dropdown>
                    <Dropdown.Toggle
                      size="sm"
                      variant="success"
                      id="recency-export-dropdown"
                    >
                      <i className="fas fa-download me-1"></i>
                      Export
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={exportRecencyAnalysisToExcel}>
                        <i className="fas fa-file-excel text-success me-2"></i>
                        Export as Excel
                      </Dropdown.Item>
                      <Dropdown.Item onClick={exportRecencyAnalysisToPDF}>
                        <i className="fas fa-file-pdf text-danger me-2"></i>
                        Export as PDF
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                  <div className="btn-group" role="group">
                    <Button
                      size="sm"
                      variant={recencyView === 'monthly' ? 'primary' : 'outline-primary'}
                      onClick={() => setRecencyView('monthly')}
                    >
                      <i className="fas fa-calendar-alt me-1"></i>
                      Monthly
                    </Button>
                    <Button
                      size="sm"
                      variant={recencyView === 'quarterly' ? 'primary' : 'outline-primary'}
                      onClick={() => setRecencyView('quarterly')}
                    >
                      <i className="fas fa-calendar-week me-1"></i>
                      Quarterly
                    </Button>
                    <Button
                      size="sm"
                      variant={recencyView === 'half-yearly' ? 'primary' : 'outline-primary'}
                      onClick={() => setRecencyView('half-yearly')}
                    >
                      <i className="fas fa-calendar me-1"></i>
                      Half-Yearly
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recencyData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="category" dataKey="range" />
                  <YAxis type="number" />
                  <Tooltip />
                  <Bar
                    dataKey="stores"
                    fill="#0d6efd"
                    radius={[5, 5, 0, 0]}
                    onClick={(data) => navigate(`/details?title=Audited%20Stores&type=covered-stores&recencyRange=${encodeURIComponent(data.range)}&recencyView=${recencyView}`)}
                    cursor="pointer"
                    label={{ position: 'top', fill: '#000', fontSize: 14 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container >
  );
};

export default StoreCoverage;
