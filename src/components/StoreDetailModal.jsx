import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Card, Table, Badge, ProgressBar } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './StoreDetailModal.css';

const StoreDetailModal = ({ show, onHide, storeData, auditStatus }) => {
  const [selectedDeviationType, setSelectedDeviationType] = useState(null);

  // Reset filter when modal closes or data changes
  useEffect(() => {
    if (!show) {
      setSelectedDeviationType(null);
    }
  }, [show, storeData]);

  console.log('StoreDetailModal render - show:', show, 'storeData:', storeData, 'auditStatus:', auditStatus);

  if (!storeData) {
    return (
      <Modal show={show} onHide={onHide} size="xl" className="store-detail-modal">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="fas fa-store me-2"></i>
            Store Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="text-center text-muted py-5">
            <i className="fas fa-info-circle fa-3x mb-3 d-block"></i>
            <p>No store data available</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const {
    storeId,
    storeName,
    state,
    supervisor,
    deviations = [],
    contra = [],
    auditProgress = {},
    inventorySummary = {},
    auditors = []
  } = storeData;

  // Calculate total deviation value
  const totalDeviationValue = deviations.reduce((sum, dev) => sum + (dev.value || 0), 0);
  const totalContraValue = contra.reduce((sum, item) => sum + (item.value || 0), 0);

  // Prepare deviation chart data
  const deviationChartData = deviations.slice(0, 5).map((dev, idx) => ({
    name: dev.type || `Type ${idx + 1}`,
    value: dev.value || 0,
    count: dev.count || 0
  }));

  const COLORS = ['#dc3545', '#ffc107', '#0d6efd', '#198754', '#6f42c1'];
  const FORM_COLORS = ['#8B5CF6', '#FF6B35', '#4ADE80', '#FF1493', '#3B82F6', '#FFD700', '#FF4500', '#00CED1', '#DA70D6', '#00BFFF'];

  // Product form breakdown for each deviation type (10 Audit Forms)
  const productFormData = {
    'Invoiced': [
      { form: 'Tablets', value: 35000, count: 198 },
      { form: 'Liquids', value: 28000, count: 145 },
      { form: 'Injection', value: 22000, count: 88 },
      { form: 'Ointments', value: 15000, count: 72 },
      { form: 'Powders', value: 12000, count: 58 },
      { form: 'Drops', value: 9000, count: 45 },
      { form: 'Inhalers', value: 8000, count: 38 },
      { form: 'Containers', value: 18000, count: 95 },
      { form: 'General', value: 14000, count: 52 },
      { form: 'Surgicals', value: 11000, count: 48 }
    ],
    'Contra Short': [
      { form: 'Tablets', value: 25000, count: 142 },
      { form: 'Liquids', value: 18000, count: 98 },
      { form: 'Injection', value: 15000, count: 62 },
      { form: 'Ointments', value: 10000, count: 52 },
      { form: 'Powders', value: 8000, count: 42 },
      { form: 'Drops', value: 6000, count: 32 },
      { form: 'Inhalers', value: 5500, count: 28 },
      { form: 'Containers', value: 12000, count: 68 },
      { form: 'General', value: 9000, count: 38 },
      { form: 'Surgicals', value: 7500, count: 35 }
    ],
    'Contra Excess': [
      { form: 'Tablets', value: 22000, count: 125 },
      { form: 'Liquids', value: 15000, count: 82 },
      { form: 'Injection', value: 13000, count: 55 },
      { form: 'Ointments', value: 8500, count: 45 },
      { form: 'Powders', value: 7000, count: 38 },
      { form: 'Drops', value: 5200, count: 28 },
      { form: 'Inhalers', value: 4800, count: 24 },
      { form: 'Containers', value: 10000, count: 58 },
      { form: 'General', value: 7500, count: 32 },
      { form: 'Surgicals', value: 6500, count: 30 }
    ],
    'Excess Submitted': [
      { form: 'Tablets', value: 12000, count: 68 },
      { form: 'Liquids', value: 9000, count: 52 },
      { form: 'Injection', value: 7500, count: 32 },
      { form: 'Ointments', value: 5000, count: 28 },
      { form: 'Powders', value: 4200, count: 22 },
      { form: 'Drops', value: 3000, count: 18 },
      { form: 'Inhalers', value: 2800, count: 15 },
      { form: 'Containers', value: 6000, count: 35 },
      { form: 'General', value: 4500, count: 20 },
      { form: 'Surgicals', value: 3800, count: 18 }
    ]
  };

  // Detailed product-level data for each deviation type and product form (10 Audit Forms)
  const detailedProductData = {
    'Invoiced': {
      'Tablets': [
        { productId: 'PID001', sku: 'SKU10001', productName: 'Paracetamol 500mg', batchNo: 'BT12345', systemQty: 500, physicalQty: 500, unitPrice: 2.5, totalValue: 1250, expiryDate: '2026-03-15' },
        { productId: 'PID002', sku: 'SKU10002', productName: 'Ibuprofen 400mg', batchNo: 'BT12346', systemQty: 300, physicalQty: 300, unitPrice: 3.2, totalValue: 960, expiryDate: '2026-04-20' },
        { productId: 'PID003', sku: 'SKU10003', productName: 'Aspirin 75mg', batchNo: 'BT12347', systemQty: 450, physicalQty: 450, unitPrice: 1.8, totalValue: 810, expiryDate: '2026-02-10' },
        { productId: 'PID004', sku: 'SKU10004', productName: 'Metformin 500mg', batchNo: 'BT12348', systemQty: 600, physicalQty: 600, unitPrice: 2.2, totalValue: 1320, expiryDate: '2026-05-30' }
      ],
      'Liquids': [
        { productId: 'PID005', sku: 'SKU20001', productName: 'Cough Syrup 100ml', batchNo: 'BT22345', systemQty: 200, physicalQty: 200, unitPrice: 45, totalValue: 9000, expiryDate: '2025-12-15' },
        { productId: 'PID006', sku: 'SKU20002', productName: 'Antacid Suspension', batchNo: 'BT22346', systemQty: 150, physicalQty: 150, unitPrice: 38, totalValue: 5700, expiryDate: '2026-01-20' },
        { productId: 'PID007', sku: 'SKU20003', productName: 'Paediatric Syrup', batchNo: 'BT22347', systemQty: 180, physicalQty: 180, unitPrice: 52, totalValue: 9360, expiryDate: '2026-02-28' }
      ],
      'Injection': [
        { productId: 'PID008', sku: 'SKU40001', productName: 'Insulin Injection 10ml', batchNo: 'BT42345', systemQty: 100, physicalQty: 100, unitPrice: 320, totalValue: 32000, expiryDate: '2026-01-30' },
        { productId: 'PID009', sku: 'SKU40002', productName: 'Antibiotic Injection', batchNo: 'BT42346', systemQty: 150, physicalQty: 150, unitPrice: 180, totalValue: 27000, expiryDate: '2026-03-15' },
        { productId: 'PID010', sku: 'SKU40003', productName: 'B12 Injection', batchNo: 'BT42347', systemQty: 120, physicalQty: 120, unitPrice: 95, totalValue: 11400, expiryDate: '2026-04-25' }
      ],
      'Ointments': [
        { productId: 'PID011', sku: 'SKU50001', productName: 'Pain Relief Gel 30g', batchNo: 'BT52345', systemQty: 200, physicalQty: 200, unitPrice: 85, totalValue: 17000, expiryDate: '2026-05-10' },
        { productId: 'PID012', sku: 'SKU50002', productName: 'Antiseptic Cream', batchNo: 'BT52346', systemQty: 180, physicalQty: 180, unitPrice: 65, totalValue: 11700, expiryDate: '2026-06-20' },
        { productId: 'PID013', sku: 'SKU50003', productName: 'Skin Ointment', batchNo: 'BT52347', systemQty: 150, physicalQty: 150, unitPrice: 72, totalValue: 10800, expiryDate: '2026-07-15' }
      ],
      'Powders': [
        { productId: 'PID014', sku: 'SKU60001', productName: 'Antibiotic Powder', batchNo: 'BT62345', systemQty: 100, physicalQty: 100, unitPrice: 125, totalValue: 12500, expiryDate: '2026-02-28' },
        { productId: 'PID015', sku: 'SKU60002', productName: 'Protein Powder 500g', batchNo: 'BT62346', systemQty: 80, physicalQty: 80, unitPrice: 450, totalValue: 36000, expiryDate: '2026-09-30' },
        { productId: 'PID016', sku: 'SKU60003', productName: 'Antacid Powder', batchNo: 'BT62347', systemQty: 120, physicalQty: 120, unitPrice: 58, totalValue: 6960, expiryDate: '2026-04-15' }
      ],
      'Drops': [
        { productId: 'PID017', sku: 'SKU70001', productName: 'Eye Drops 10ml', batchNo: 'BT72345', systemQty: 250, physicalQty: 250, unitPrice: 125, totalValue: 31250, expiryDate: '2026-01-20' },
        { productId: 'PID018', sku: 'SKU70002', productName: 'Ear Drops 15ml', batchNo: 'BT72346', systemQty: 180, physicalQty: 180, unitPrice: 95, totalValue: 17100, expiryDate: '2026-03-10' },
        { productId: 'PID019', sku: 'SKU70003', productName: 'Nasal Drops', batchNo: 'BT72347', systemQty: 200, physicalQty: 200, unitPrice: 88, totalValue: 17600, expiryDate: '2026-02-25' }
      ],
      'Inhalers': [
        { productId: 'PID020', sku: 'SKU80001', productName: 'Asthma Inhaler', batchNo: 'BT82345', systemQty: 80, physicalQty: 80, unitPrice: 580, totalValue: 46400, expiryDate: '2026-08-15' },
        { productId: 'PID021', sku: 'SKU80002', productName: 'Steroid Inhaler', batchNo: 'BT82346', systemQty: 60, physicalQty: 60, unitPrice: 650, totalValue: 39000, expiryDate: '2026-09-20' },
        { productId: 'PID022', sku: 'SKU80003', productName: 'Bronchodilator', batchNo: 'BT82347', systemQty: 70, physicalQty: 70, unitPrice: 520, totalValue: 36400, expiryDate: '2026-07-30' }
      ],
      'Containers': [
        { productId: 'PID023', sku: 'SKU30001', productName: 'Medicine Container 500ml', batchNo: 'BT32345', systemQty: 150, physicalQty: 150, unitPrice: 45, totalValue: 6750, expiryDate: '2027-12-31' },
        { productId: 'PID024', sku: 'SKU30002', productName: 'Storage Container 1L', batchNo: 'BT32346', systemQty: 100, physicalQty: 100, unitPrice: 65, totalValue: 6500, expiryDate: '2028-06-30' },
        { productId: 'PID025', sku: 'SKU30003', productName: 'Pill Container Box', batchNo: 'BT32347', systemQty: 200, physicalQty: 200, unitPrice: 35, totalValue: 7000, expiryDate: '2027-09-15' }
      ],
      'General': [
        { productId: 'PID026', sku: 'SKU90001', productName: 'First Aid Kit', batchNo: 'BT92345', systemQty: 80, physicalQty: 80, unitPrice: 350, totalValue: 28000, expiryDate: '2027-03-31' },
        { productId: 'PID027', sku: 'SKU90002', productName: 'Thermometer Digital', batchNo: 'BT92346', systemQty: 120, physicalQty: 120, unitPrice: 180, totalValue: 21600, expiryDate: '2028-12-31' },
        { productId: 'PID028', sku: 'SKU90003', productName: 'Medical Supplies Kit', batchNo: 'BT92347', systemQty: 60, physicalQty: 60, unitPrice: 420, totalValue: 25200, expiryDate: '2027-06-30' }
      ],
      'Surgicals': [
        { productId: 'PID029', sku: 'SKU00001', productName: 'Surgical Gloves Box', batchNo: 'BT02345', systemQty: 100, physicalQty: 100, unitPrice: 250, totalValue: 25000, expiryDate: '2027-12-31' },
        { productId: 'PID030', sku: 'SKU00002', productName: 'Surgical Mask Box', batchNo: 'BT02346', systemQty: 150, physicalQty: 150, unitPrice: 180, totalValue: 27000, expiryDate: '2027-06-30' },
        { productId: 'PID031', sku: 'SKU00003', productName: 'Bandage Roll', batchNo: 'BT02347', systemQty: 200, physicalQty: 200, unitPrice: 45, totalValue: 9000, expiryDate: '2028-01-31' }
      ]
    },
    'Contra Short': {
      'Tablets': [
        { productId: 'PID032', sku: 'SKU10011', productName: 'Cetirizine 10mg', batchNo: 'BT12349', systemQty: 300, physicalQty: 285, difference: -15, unitPrice: 2.8, totalValue: 798, expiryDate: '2026-03-25' },
        { productId: 'PID033', sku: 'SKU10012', productName: 'Diclofenac 50mg', batchNo: 'BT12350', systemQty: 250, physicalQty: 242, difference: -8, unitPrice: 3.5, totalValue: 847, expiryDate: '2026-04-15' }
      ],
      'Liquids': [
        { productId: 'PID034', sku: 'SKU20011', productName: 'Antibiotic Syrup', batchNo: 'BT22347', systemQty: 120, physicalQty: 112, difference: -8, unitPrice: 55, totalValue: 6160, expiryDate: '2025-12-30' }
      ],
      'Injection': [
        { productId: 'PID035', sku: 'SKU40011', productName: 'Pain Injection', batchNo: 'BT42348', systemQty: 100, physicalQty: 95, difference: -5, unitPrice: 150, totalValue: 14250, expiryDate: '2026-03-30' }
      ],
      'Ointments': [
        { productId: 'PID036', sku: 'SKU50011', productName: 'Burn Ointment', batchNo: 'BT52348', systemQty: 150, physicalQty: 145, difference: -5, unitPrice: 78, totalValue: 11310, expiryDate: '2026-06-15' }
      ],
      'Powders': [
        { productId: 'PID037', sku: 'SKU60011', productName: 'Digestive Powder', batchNo: 'BT62348', systemQty: 90, physicalQty: 87, difference: -3, unitPrice: 68, totalValue: 5916, expiryDate: '2026-05-25' }
      ],
      'Drops': [
        { productId: 'PID038', sku: 'SKU70011', productName: 'Allergy Eye Drops', batchNo: 'BT72348', systemQty: 140, physicalQty: 135, difference: -5, unitPrice: 110, totalValue: 14850, expiryDate: '2026-02-15' }
      ],
      'Inhalers': [
        { productId: 'PID039', sku: 'SKU80011', productName: 'Emergency Inhaler', batchNo: 'BT82348', systemQty: 50, physicalQty: 48, difference: -2, unitPrice: 620, totalValue: 29760, expiryDate: '2026-08-30' }
      ],
      'Containers': [
        { productId: 'PID040', sku: 'SKU30011', productName: 'Sterile Container', batchNo: 'BT32348', systemQty: 100, physicalQty: 97, difference: -3, unitPrice: 55, totalValue: 5335, expiryDate: '2027-10-15' }
      ],
      'General': [
        { productId: 'PID041', sku: 'SKU90011', productName: 'Medical Tape Roll', batchNo: 'BT92348', systemQty: 180, physicalQty: 175, difference: -5, unitPrice: 32, totalValue: 5600, expiryDate: '2027-04-20' }
      ],
      'Surgicals': [
        { productId: 'PID042', sku: 'SKU00011', productName: 'Suture Kit', batchNo: 'BT02348', systemQty: 80, physicalQty: 77, difference: -3, unitPrice: 320, totalValue: 24640, expiryDate: '2027-09-30' }
      ]
    },
    'Contra Excess': [
      { productId: 'PID043', sku: 'SKU10021', productName: 'Atorvastatin 10mg', batchNo: 'BT12351', systemQty: 200, physicalQty: 208, difference: 8, unitPrice: 4.2, totalValue: 873.6, expiryDate: '2026-06-30' },
      { productId: 'PID044', sku: 'SKU20021', productName: 'Pain Relief Syrup', batchNo: 'BT22348', systemQty: 100, physicalQty: 105, difference: 5, unitPrice: 48, totalValue: 5040, expiryDate: '2026-01-15' },
      { productId: 'PID045', sku: 'SKU40021', productName: 'Vitamin Injection', batchNo: 'BT42349', systemQty: 80, physicalQty: 85, difference: 5, unitPrice: 165, totalValue: 14025, expiryDate: '2026-04-10' },
      { productId: 'PID046', sku: 'SKU30021', productName: 'Storage Box Set', batchNo: 'BT32349', systemQty: 120, physicalQty: 127, difference: 7, unitPrice: 72, totalValue: 9144, expiryDate: '2028-02-28' }
    ],
    'Excess Submitted': [
      { productId: 'PID047', sku: 'SKU10031', productName: 'Ranitidine 150mg', batchNo: 'BT12352', systemQty: 150, physicalQty: 158, difference: 8, unitPrice: 2.9, totalValue: 458.2, expiryDate: '2026-04-10' },
      { productId: 'PID048', sku: 'SKU50031', productName: 'Muscle Relaxant Gel', batchNo: 'BT52349', systemQty: 90, physicalQty: 95, difference: 5, unitPrice: 92, totalValue: 8740, expiryDate: '2026-08-15' },
      { productId: 'PID049', sku: 'SKU70031', productName: 'Vitamin D Drops', batchNo: 'BT72349', systemQty: 110, physicalQty: 115, difference: 5, unitPrice: 105, totalValue: 12075, expiryDate: '2026-05-30' },
      { productId: 'PID050', sku: 'SKU90031', productName: 'BP Monitor', batchNo: 'BT92349', systemQty: 40, physicalQty: 43, difference: 3, unitPrice: 580, totalValue: 24940, expiryDate: '2028-11-30' }
    ]
  };

  // Export detailed product-level data to Excel
  const exportProductDetailsToExcel = () => {
    let dataToExport = [];
    let fileName = `${storeId}_Product_Form_Details.xlsx`;

    if (selectedDeviationType) {
      // Export specific deviation and form breakdown
      const formData = detailedProductData[selectedDeviationType];

      if (formData) {
        // If formData is an object with forms, export all forms for this deviation
        if (typeof formData === 'object' && !Array.isArray(formData)) {
          Object.keys(formData).forEach(formType => {
            formData[formType].forEach(product => {
              dataToExport.push({
                'Store ID': storeId,
                'Store Name': storeName,
                'Deviation Type': selectedDeviationType,
                'Product Form': formType,
                'Product ID': product.productId,
                'SKU': product.sku,
                'Product Name': product.productName,
                'Batch No': product.batchNo,
                'System Qty': product.systemQty,
                'Physical Qty': product.physicalQty,
                'Difference': product.difference || 0,
                'Unit Price (₹)': product.unitPrice,
                'Total Value (₹)': product.totalValue,
                'Expiry Date': product.expiryDate
              });
            });
          });
        } else {
          // If formData is an array (for Contra Excess, Excess Submitted)
          formData.forEach(product => {
            dataToExport.push({
              'Store ID': storeId,
              'Store Name': storeName,
              'Deviation Type': selectedDeviationType,
              'Product ID': product.productId,
              'SKU': product.sku,
              'Product Name': product.productName,
              'Batch No': product.batchNo,
              'System Qty': product.systemQty,
              'Physical Qty': product.physicalQty,
              'Difference': product.difference,
              'Unit Price (₹)': product.unitPrice,
              'Total Value (₹)': product.totalValue,
              'Expiry Date': product.expiryDate
            });
          });
        }
      }
      fileName = `${storeId}_${selectedDeviationType.replace(/\s+/g, '_')}_Products.xlsx`;
    } else {
      // Export all products across all deviations
      Object.keys(detailedProductData).forEach(deviationType => {
        const formData = detailedProductData[deviationType];

        if (typeof formData === 'object' && !Array.isArray(formData)) {
          Object.keys(formData).forEach(formType => {
            formData[formType].forEach(product => {
              dataToExport.push({
                'Store ID': storeId,
                'Store Name': storeName,
                'Deviation Type': deviationType,
                'Product Form': formType,
                'Product ID': product.productId,
                'SKU': product.sku,
                'Product Name': product.productName,
                'Batch No': product.batchNo,
                'System Qty': product.systemQty,
                'Physical Qty': product.physicalQty,
                'Difference': product.difference || 0,
                'Unit Price (₹)': product.unitPrice,
                'Total Value (₹)': product.totalValue,
                'Expiry Date': product.expiryDate
              });
            });
          });
        } else if (Array.isArray(formData)) {
          formData.forEach(product => {
            dataToExport.push({
              'Store ID': storeId,
              'Store Name': storeName,
              'Deviation Type': deviationType,
              'Product ID': product.productId,
              'SKU': product.sku,
              'Product Name': product.productName,
              'Batch No': product.batchNo,
              'System Qty': product.systemQty,
              'Physical Qty': product.physicalQty,
              'Difference': product.difference,
              'Unit Price (₹)': product.unitPrice,
              'Total Value (₹)': product.totalValue,
              'Expiry Date': product.expiryDate
            });
          });
        }
      });
      fileName = `${storeId}_All_Products_Details.xlsx`;
    }

    // Create worksheet
    const ws = window.XLSX.utils.json_to_sheet(dataToExport);

    // Set column widths
    ws['!cols'] = [
      { wch: 10 },  // Store ID
      { wch: 20 },  // Store Name
      { wch: 18 },  // Deviation Type
      { wch: 15 },  // Product Form
      { wch: 12 },  // Product ID
      { wch: 12 },  // SKU
      { wch: 30 },  // Product Name
      { wch: 12 },  // Batch No
      { wch: 12 },  // System Qty
      { wch: 12 },  // Physical Qty
      { wch: 10 },  // Difference
      { wch: 12 },  // Unit Price
      { wch: 15 },  // Total Value
      { wch: 12 }   // Expiry Date
    ];

    // Create workbook
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, 'Product Details');

    // Download file
    window.XLSX.writeFile(wb, fileName);
  };

  // Calculate contra summary
  const contraShort = contra.filter(c => c.type === 'Short').reduce((sum, c) => sum + (c.value || 0), 0);
  const contraExcess = contra.filter(c => c.type === 'Excess').reduce((sum, c) => sum + (c.value || 0), 0);

  // Filter contra items based on selected deviation type
  const getFilteredContraItems = () => {
    console.log('Filtering contra items:', { selectedDeviationType, totalContraItems: contra.length });

    if (!selectedDeviationType) return contra;

    // Map deviation type to contra type
    if (selectedDeviationType === 'Contra Short') {
      const filtered = contra.filter(c => c.type === 'Short');
      console.log('Filtered Contra Short:', filtered.length, 'items');
      return filtered;
    } else if (selectedDeviationType === 'Contra Excess') {
      const filtered = contra.filter(c => c.type === 'Excess');
      console.log('Filtered Contra Excess:', filtered.length, 'items');
      return filtered;
    }
    return contra;
  };

  const filteredContraItems = getFilteredContraItems();

  // Handle deviation row click
  const handleDeviationClick = (deviationType) => {
    console.log('Deviation clicked:', deviationType);
    setSelectedDeviationType(selectedDeviationType === deviationType ? null : deviationType);
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" className="store-detail-modal">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <i className="fas fa-store me-2"></i>
          {storeName} - Store Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {/* Store Info Header */}
        <Card className="mb-3 border-0 shadow-sm">
          <Card.Body>
            <Row>
              <Col md={3}>
                <div className="text-muted small">Store ID</div>
                <div className="fw-bold fs-5">
                  <Badge bg="dark" className="font-monospace">{storeId}</Badge>
                </div>
              </Col>
              <Col md={3}>
                <div className="text-muted small">State</div>
                <div className="fw-bold fs-5">{state}</div>
              </Col>
              <Col md={3}>
                <div className="text-muted small">Supervisor</div>
                <div className="fw-bold fs-5">
                  <i className="fas fa-user-tie me-2 text-primary"></i>
                  {supervisor || 'N/A'}
                </div>
              </Col>
              <Col md={3}>
                <div className="text-muted small">Audit Progress</div>
                <div className="fw-bold fs-5">{auditProgress.percentage || 0}%</div>
                <ProgressBar
                  now={auditProgress.percentage || 0}
                  variant={auditProgress.percentage >= 80 ? 'success' : auditProgress.percentage >= 60 ? 'warning' : 'danger'}
                  style={{ height: '8px' }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Mini Dashboard - KPIs */}
        <Row className="g-3 mb-4">
          <Col md={auditStatus === 'completed' ? 3 : 6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-muted small mb-1">Total SKUs</div>
                <h3 className="mb-0 text-primary">{inventorySummary.totalSKUs?.toLocaleString() || '0'}</h3>
                <small className="text-muted">Audited: {inventorySummary.auditedSKUs?.toLocaleString() || '0'}</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={auditStatus === 'completed' ? 3 : 6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-muted small mb-1">Inventory Value</div>
                <h3 className="mb-0 text-success">₹{(inventorySummary.totalValue / 1000 || 0).toFixed(0)}K</h3>
                <small className="text-muted">Total Value</small>
              </Card.Body>
            </Card>
          </Col>
          {auditStatus === 'completed' && (
            <>
              <Col md={3}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <div className="text-muted small mb-1">Total Deviations</div>
                    <h3 className="mb-0 text-danger">{deviations.length}</h3>
                    <small className="text-muted">₹{(totalDeviationValue / 1000).toFixed(0)}K</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <div className="text-muted small mb-1">Contra Items</div>
                    <h3 className="mb-0 text-warning">{contra.length}</h3>
                    <small className="text-muted">₹{(totalContraValue / 1000).toFixed(0)}K</small>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>

        {/* Auditors Working on Store - Show for in-progress, pending, and completed */}
        {auditStatus !== 'created' && auditors && auditors.length > 0 && (
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-light">
              <h6 className="mb-0 fw-bold">
                <i className="fas fa-users me-2 text-primary"></i>
                Assigned Auditors
              </h6>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover className="mb-0" size="sm">
                <thead>
                  <tr>
                    <th>Auditor Name</th>
                    {(auditStatus === 'in-progress' || auditStatus === 'completed') && (
                      <>
                        <th>Assigned SKUs (count)</th>
                        <th>Completed SKUs (count)</th>
                        <th>Progress (%)</th>
                        <th>Match Rate (%)</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {auditors.map((auditor, idx) => (
                    <tr key={idx}>
                      <td className="fw-semibold">{auditor.name}</td>
                      {(auditStatus === 'in-progress' || auditStatus === 'completed') && (
                        <>
                          <td>{auditor.assignedSKUs?.toLocaleString()}</td>
                          <td>{auditor.completedSKUs?.toLocaleString()}</td>
                          <td style={{ minWidth: '150px' }}>
                            <ProgressBar
                              now={auditor.completionRate || 0}
                              label={`${(auditor.completionRate || 0).toFixed(1)}%`}
                              variant={auditor.completionRate >= 80 ? 'success' : 'warning'}
                              style={{ height: '20px' }}
                            />
                          </td>
                          <td>
                            <Badge bg={auditor.matchRate >= 95 ? 'success' : auditor.matchRate >= 90 ? 'warning' : 'danger'}>
                              {auditor.matchRate?.toFixed(1)}%
                            </Badge>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        {/* Deviations and Contra Side by Side - Show only for completed */}
        {auditStatus === 'completed' && (
          <Row className="g-3">
            {/* Deviations Section */}
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-light">
                  <h6 className="mb-0 fw-bold">
                    <i className="fas fa-exclamation-triangle me-2 text-danger"></i>
                    Deviations Breakdown
                  </h6>
                </Card.Header>
                <Card.Body>
                  {deviations.length > 0 ? (
                    <>
                      {/* Deviation Chart */}
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={deviationChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.count}`}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="value"
                            onClick={(data) => handleDeviationClick(data.name)}
                            style={{ cursor: 'pointer' }}
                          >
                            {deviationChartData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                style={{ cursor: 'pointer' }}
                              />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>

                      {/* Deviation Table */}
                      <div className="mt-3" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                        <Table hover size="sm" className="mb-0">
                          <thead className="bg-light sticky-top">
                            <tr>
                              <th>Type</th>
                              <th className="text-end">Count (items)</th>
                              <th className="text-end">Value (₹)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {deviations.map((dev, idx) => (
                              <tr
                                key={idx}
                                onClick={() => handleDeviationClick(dev.type)}
                                style={{
                                  cursor: 'pointer',
                                  backgroundColor: selectedDeviationType === dev.type ? 'rgba(13, 110, 253, 0.1)' : 'transparent'
                                }}
                                className="deviation-row"
                              >
                                <td className="small">{dev.type}</td>
                                <td className="text-end">
                                  <Badge bg="secondary" pill>{dev.count}</Badge>
                                </td>
                                <td className="text-end fw-semibold text-danger">
                                  ₹{(dev.value || 0).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-muted py-4">
                      <i className="fas fa-check-circle fa-3x mb-2 d-block text-success"></i>
                      <p className="mb-0">No deviations found</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Right Panel - Product Form Breakdown or Contra Section */}
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-bold">
                      {selectedDeviationType ? (
                        <>
                          <i className="fas fa-pills me-2 text-info"></i>
                          <Badge bg="primary" className="me-2">{selectedDeviationType}</Badge>
                          Product Form Breakdown
                        </>
                      ) : (
                        <>
                          <i className="fas fa-chart-pie me-2 text-info"></i>
                          Product Form Analysis
                        </>
                      )}
                    </h6>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="success"
                        onClick={exportProductDetailsToExcel}
                      >
                        <i className="fas fa-file-excel me-1"></i>
                        Export Products
                      </Button>
                      {selectedDeviationType && (
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => setSelectedDeviationType(null)}
                        >
                          Clear Filter
                        </Button>
                      )}
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  {selectedDeviationType && productFormData[selectedDeviationType] ? (
                    /* Product Form Breakdown for Selected Deviation */
                    <div>
                      <div className="text-muted small mb-3">
                        {(() => {
                          const selectedDev = deviations.find(d => d.type === selectedDeviationType);
                          return selectedDev ? `Total: ₹${selectedDev.value.toLocaleString()} | ${selectedDev.count} items` : '';
                        })()}
                      </div>
                      <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                          <Pie
                            data={productFormData[selectedDeviationType]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            labelLine={false}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="form"
                          >
                            {productFormData[selectedDeviationType].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={FORM_COLORS[index % FORM_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="mt-3">
                        {productFormData[selectedDeviationType].map((form, idx) => (
                          <div key={idx} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
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
                              <span className="fw-semibold">{form.form}</span>
                            </div>
                            <div className="text-end">
                              <div className="fw-bold text-success">₹{form.value.toLocaleString()}</div>
                              <div className="text-muted small">{form.count} items</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Show Overall Product Form Distribution by default */
                    <div>
                      <div className="mb-3">
                        <h6 className="text-primary mb-2">
                          Overall Product Form Distribution
                        </h6>
                        <div className="text-muted small">
                          Across all deviation types
                        </div>
                      </div>
                      <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                          <Pie
                            data={[
                              { form: 'Tablets', value: 94000, count: 533 },
                              { form: 'Liquids', value: 70000, count: 377 },
                              { form: 'Injection', value: 57500, count: 237 },
                              { form: 'Ointments', value: 38500, count: 197 },
                              { form: 'Powders', value: 31200, count: 160 },
                              { form: 'Drops', value: 23200, count: 123 },
                              { form: 'Inhalers', value: 21100, count: 105 },
                              { form: 'Containers', value: 46000, count: 256 },
                              { form: 'General', value: 35000, count: 142 },
                              { form: 'Surgicals', value: 28800, count: 131 }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            labelLine={false}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="form"
                          >
                            {[
                              { form: 'Tablets', value: 94000, count: 533 },
                              { form: 'Liquids', value: 70000, count: 377 },
                              { form: 'Injection', value: 57500, count: 237 },
                              { form: 'Ointments', value: 38500, count: 197 },
                              { form: 'Powders', value: 31200, count: 160 },
                              { form: 'Drops', value: 23200, count: 123 },
                              { form: 'Inhalers', value: 21100, count: 105 },
                              { form: 'Containers', value: 46000, count: 256 },
                              { form: 'General', value: 35000, count: 142 },
                              { form: 'Surgicals', value: 28800, count: 131 }
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={FORM_COLORS[index % FORM_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="mt-3" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                        {[
                          { form: 'Tablets', value: 94000, count: 533 },
                          { form: 'Liquids', value: 70000, count: 377 },
                          { form: 'Injection', value: 57500, count: 237 },
                          { form: 'Ointments', value: 38500, count: 197 },
                          { form: 'Powders', value: 31200, count: 160 },
                          { form: 'Drops', value: 23200, count: 123 },
                          { form: 'Inhalers', value: 21100, count: 105 },
                          { form: 'Containers', value: 46000, count: 256 },
                          { form: 'General', value: 35000, count: 142 },
                          { form: 'Surgicals', value: 28800, count: 131 }
                        ].map((form, idx) => (
                          <div key={idx} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
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
                              <span className="fw-semibold">{form.form}</span>
                            </div>
                            <div className="text-end">
                              <div className="fw-bold text-success">₹{form.value.toLocaleString()}</div>
                              <div className="text-muted small">{form.count} items</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-3 text-muted small">
                        <i className="fas fa-info-circle me-1"></i>
                        Click on any deviation segment to see specific breakdown
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StoreDetailModal;
