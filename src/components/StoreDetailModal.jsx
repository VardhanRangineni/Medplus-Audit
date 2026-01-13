import { useState } from 'react';
import { Modal, Button, Row, Col, Card, Table, Badge, ProgressBar, Dropdown, OverlayTrigger, Tooltip as BootstrapTooltip } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatIndianCurrency, formatIndianNumber } from '../utils/formatters';
import './StoreDetailModal.css';

const StoreDetailModal = ({ show, onHide, storeData, auditStatus }) => {
  const [selectedDeviationType, setSelectedDeviationType] = useState(null);
  const [expandedAuditors, setExpandedAuditors] = useState({});

  console.log('StoreDetailModal render - show:', show, 'storeData:', storeData, 'auditStatus:', auditStatus);

  if (!storeData) {
    return (
      <Modal show={show} onHide={onHide} size="xl" className="store-detail-modal">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="fas fa-store me-2"></i>
            {auditStatus === 'in-progress' ? 'Ongoing Store Audits' : 'Store Audit Details'}
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
    auditors = [],
    productFormData: passedProductFormData = {},
    AppearedSKUs = 0, MatchedSKUs = 0, RevisedSKUs = 0,
    AppearedQty = 0, MatchedQty = 0, RevisedQty = 0,
    AppearedValue = 0, MatchedValue = 0, RevisedValue = 0,
    auditProcessType
  } = storeData;

  // Calculate total deviation value and count
  const totalDeviationValue = deviations.reduce((sum, dev) => sum + (dev.value || 0), 0);
  const totalDeviations = deviations.reduce((sum, dev) => sum + (dev.count || 0), 0);
  const totalContraValue = contra.reduce((sum, item) => sum + (item.value || 0), 0);

  // Calculate breakdown by type
  const deviationsByType = {
    deviations: deviations.filter(d => d.type === 'Short' || d.type === 'Excess').reduce((sum, d) => sum + (d.count || 0), 0),
    mismatch: deviations.filter(d => d.type === 'Contra Short' || d.type === 'Contra Excess').reduce((sum, d) => sum + (d.count || 0), 0)
  };

  const contraBreakdown = {
    contraShort: deviations.find(d => d.type === 'Contra Short')?.count || 0,
    contraExcess: deviations.find(d => d.type === 'Contra Excess')?.count || 0,
    short: deviations.find(d => d.type === 'Short')?.count || 0,
    excessShort: deviations.find(d => d.type === 'Excess')?.count || 0
  };

  // Prepare deviation chart data
  const deviationChartData = deviations.slice(0, 5).map((dev, idx) => ({
    name: dev.type || `Type ${idx + 1}`,
    value: dev.value || 0,
    count: dev.count || 0
  }));

  const COLORS = ['#dc3545', '#ffc107', '#0d6efd', '#198754', '#6f42c1'];
  const FORM_COLORS = ['#8B5CF6', '#FF6B35', '#4ADE80', '#FF1493', '#3B82F6', '#FFD700', '#FF4500', '#00CED1', '#DA70D6', '#00BFFF'];

  // Use passed product form data if available, otherwise use hardcoded fallback
  const productFormData = Object.keys(passedProductFormData).length > 0 ? passedProductFormData : {
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

  // Handle Excel Export
  const handleDownloadExcel = () => {
    const wb = utils.book_new();

    // ===== SHEET 1: Summary (Store Summary + Auditors) =====
    const summaryData = [
      ["Store Audit Details Report"],
      ["Store ID", storeId],
      ["Store Name", storeName],
      ["State", state],
      ["Audit Supervisor", supervisor || 'N/A'],
      [],
      ["Audit Progress"],
      ["Completion Percentage", `${auditProgress.percentage || 0}%`],
      ["Completed SKUs", auditProgress.completedSKUs || 0],
      ["Total SKUs", auditProgress.totalSKUs || 0],
      [],
      ["Inventory Summary"],
      ["Total SKUs", inventorySummary.totalSKUs || 0],
      ["Total PIDs", inventorySummary.totalPIDs || 0],
      ["Audited SKUs", inventorySummary.auditedSKUs || 0],
      ["Total Value (₹)", inventorySummary.totalValue || 0],
      ["Total Quantity", inventorySummary.totalQuantity || 0],
    ];

    // Add Auditors section to Summary sheet
    if (auditors && auditors.length > 0) {
      summaryData.push([]);
      summaryData.push([]);
      summaryData.push(["Auditors Information"]);
      summaryData.push(["Auditor Name", "Assigned SKUs", "Completed SKUs", "Completion Rate (%)", "Match Rate (%)"]);

      auditors.forEach(a => {
        summaryData.push([
          a.name,
          a.assignedSKUs || 0,
          a.completedSKUs || 0,
          a.completionRate || 0,
          a.matchRate || 0
        ]);
      });
    }

    const wsSummary = utils.aoa_to_sheet(summaryData);
    wsSummary['!cols'] = [{ wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 18 }, { wch: 15 }];
    utils.book_append_sheet(wb, wsSummary, "Summary");

    // ===== SHEET 2: Mismatches (Contra Short, Contra Excess, Excess Submitted with Remarks column) =====
    const remarksData = [];

    // Add header row with Initial Auditor, User ID, Remarks and Description columns
    remarksData.push([
      "Initial Auditor", "User ID", "Product Form", "Product ID", "SKU", "Product Name",
      "Batch No", "System Qty", "Physical Qty", "Difference", "Unit Price (₹)",
      "Total Value (₹)", "Expiry Date", "Remarks", "Description"
    ]);

    // Add data for specific deviation types: Contra Short, Contra Excess, Excess Submitted
    const remarksDeviationTypes = ['Contra Short', 'Contra Excess', 'Excess Submitted'];

    // Define options and mock data outside the loop
    const remarksOptions = ['Transit Issues', 'Sale', 'Mis-arrangement of Stock', 'Wrong Count', 'Others / Miscellaneous'];
    const sampleDescriptions = [
      'Item found in different location during count',
      'Product was sold during audit period',
      'Batch moved to different shelf',
      'Recount showed different quantity',
      'Product expired and replaced',
      'Damaged items removed from inventory',
      'Stock transferred to another store',
      ''
    ];
    const auditorNames = ['Auditor A', 'Auditor B', 'Auditor C', 'Auditor D'];
    const userIds = ['USR001', 'USR002', 'USR003', 'USR004', 'USR005'];

    remarksDeviationTypes.forEach(deviationType => {
      const deviationData = detailedProductData[deviationType];

      if (deviationData) {
        if (typeof deviationData === 'object' && !Array.isArray(deviationData)) {
          // Has product forms (like Contra Short)
          let productIndex = 0;
          Object.keys(deviationData).forEach(productForm => {
            deviationData[productForm].forEach(product => {
              const remarkIndex = productIndex % remarksOptions.length;
              const descIndex = productIndex % sampleDescriptions.length;

              remarksData.push([
                auditorNames[productIndex % auditorNames.length],
                userIds[productIndex % userIds.length],
                productForm,
                product.productId,
                product.sku,
                product.productName,
                product.batchNo,
                product.systemQty,
                product.physicalQty,
                product.difference || 0,
                product.unitPrice,
                product.totalValue,
                product.expiryDate,
                remarksOptions[remarkIndex],
                sampleDescriptions[descIndex]
              ]);
              productIndex++;
            });
          });
        } else if (Array.isArray(deviationData)) {
          // Direct array (like Contra Excess, Excess Submitted)
          deviationData.forEach((product, index) => {
            const remarkIndex = index % remarksOptions.length;
            const descIndex = index % sampleDescriptions.length;

            remarksData.push([
              auditorNames[index % auditorNames.length],
              userIds[index % userIds.length],
              "N/A",
              product.productId,
              product.sku,
              product.productName,
              product.batchNo,
              product.systemQty,
              product.physicalQty,
              product.difference || 0,
              product.unitPrice,
              product.totalValue,
              product.expiryDate,
              remarksOptions[remarkIndex],
              sampleDescriptions[descIndex]
            ]);
          });
        }
      }
    });

    if (remarksData.length > 1) { // More than just header
      const wsRemarks = utils.aoa_to_sheet(remarksData);
      wsRemarks['!cols'] = [
        { wch: 18 }, { wch: 12 }, { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 30 },
        { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 },
        { wch: 15 }, { wch: 12 }, { wch: 30 }, { wch: 35 } // Widths for all columns including Initial Investor, User ID, Remarks, Description
      ];

      // Add data validation for Remarks column (column N, index 13)
      const remarksColumnLetter = 'N';

      // Add data validation for all data rows (starting from row 2)
      for (let i = 2; i <= remarksData.length; i++) {
        const cellAddress = `${remarksColumnLetter}${i}`;
        if (!wsRemarks[cellAddress]) {
          wsRemarks[cellAddress] = { t: 's', v: '' };
        }
        if (!wsRemarks['!dataValidation']) {
          wsRemarks['!dataValidation'] = [];
        }
        wsRemarks['!dataValidation'].push({
          sqref: cellAddress,
          type: 'list',
          operator: 'equal',
          formula1: `"${remarksOptions.join(',')}"`,
          showDropDown: true
        });
      }

      utils.book_append_sheet(wb, wsRemarks, "Mismatches");
    }

    // ===== SHEET 3: Deviations (All deviation-related data) =====
    const allDeviationsData = [];

    // Add deviation summary section
    if (deviations && deviations.length > 0) {
      allDeviationsData.push(["Audit Accuracy"]);
      allDeviationsData.push(["Deviation Type", "Count", "Value (₹)"]);
      deviations.forEach(d => {
        allDeviationsData.push([d.type, d.count || 0, d.value || 0]);
      });
      allDeviationsData.push([]);
      allDeviationsData.push([]);
    }

    // Add detailed product-level deviations
    Object.keys(detailedProductData).forEach(deviationType => {
      const deviationData = detailedProductData[deviationType];

      allDeviationsData.push([`${deviationType} - Detailed Products`]);
      allDeviationsData.push([
        "Deviation Type", "Product Form", "Product ID", "SKU", "Product Name",
        "Batch No", "System Qty", "Physical Qty", "Difference", "Unit Price (₹)",
        "Total Value (₹)", "Expiry Date"
      ]);

      if (typeof deviationData === 'object' && !Array.isArray(deviationData)) {
        // Has product forms (like Invoiced, Contra Short)
        Object.keys(deviationData).forEach(productForm => {
          deviationData[productForm].forEach(product => {
            allDeviationsData.push([
              deviationType,
              productForm,
              product.productId,
              product.sku,
              product.productName,
              product.batchNo,
              product.systemQty,
              product.physicalQty,
              product.difference || 0,
              product.unitPrice,
              product.totalValue,
              product.expiryDate
            ]);
          });
        });
      } else if (Array.isArray(deviationData)) {
        // Direct array (like Contra Excess, Excess Submitted)
        deviationData.forEach(product => {
          allDeviationsData.push([
            deviationType,
            "N/A",
            product.productId,
            product.sku,
            product.productName,
            product.batchNo,
            product.systemQty,
            product.physicalQty,
            product.difference || 0,
            product.unitPrice,
            product.totalValue,
            product.expiryDate
          ]);
        });
      }

      allDeviationsData.push([]);
      allDeviationsData.push([]);
    });

    if (allDeviationsData.length > 0) {
      const wsDeviations = utils.aoa_to_sheet(allDeviationsData);
      wsDeviations['!cols'] = [
        { wch: 20 }, { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 30 },
        { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 },
        { wch: 15 }, { wch: 12 }
      ];
      utils.book_append_sheet(wb, wsDeviations, "Deviations");
    }

    // ===== SHEET 4: Product Form Analysis =====
    const productFormSummary = [];
    productFormSummary.push(["Product Form Analysis"]);
    productFormSummary.push(["Variation Type", "Product Form", "Count", "Value (₹)"]);

    Object.keys(productFormData).forEach(type => {
      const typeData = productFormData[type];
      if (typeData && Array.isArray(typeData)) {
        typeData.forEach(item => {
          if (item.form) {
            productFormSummary.push([type, item.form, item.count || 0, item.value || 0]);
          }
        });
      }
    });

    if (productFormSummary.length > 2) {
      const wsProductForm = utils.aoa_to_sheet(productFormSummary);
      wsProductForm['!cols'] = [{ wch: 20 }, { wch: 20 }, { wch: 10 }, { wch: 15 }];
      utils.book_append_sheet(wb, wsProductForm, "Audit Form wise");
    }

    writeFile(wb, `Store_${storeId}_${storeName.replace(/\s+/g, '_')}_Report.xlsx`);
  };

  // Handle PDF Export
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text(`Store Audit Details Report: ${storeName}`, 14, 20);

    doc.setFontSize(10);
    doc.text(`Store ID: ${storeId}`, 14, 28);
    doc.text(`State: ${state}`, 14, 34);
    doc.text(`Audit Supervisor: ${supervisor || 'N/A'}`, 14, 40);

    // Audit Progress
    doc.setFontSize(12);
    doc.text('Audit Progress', 14, 52);
    autoTable(doc, {
      startY: 56,
      head: [['Metric', 'Value']],
      body: [
        ['Completion Percentage', `${auditProgress.percentage || 0}%`],
        ['Completed SKUs', `${auditProgress.completedSKUs || 0}`],
        ['Total SKUs', `${auditProgress.totalSKUs || 0}`]
      ],
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] }
    });

    // Inventory Summary
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text('Inventory Summary', 14, finalY);
    autoTable(doc, {
      startY: finalY + 4,
      head: [['Metric', 'Value']],
      body: [
        ['Total SKUs', `${inventorySummary.totalSKUs || 0}`],
        ['Total PIDs', `${inventorySummary.totalPIDs || 0}`],
        ['Audited SKUs', `${inventorySummary.auditedSKUs || 0}`],
        ['Total Value', `Rs. ${(inventorySummary.totalValue || 0).toLocaleString()}`],
        ['Total Quantity', `${inventorySummary.totalQuantity || 0}`]
      ],
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] }
    });

    // Auditors
    if (auditors && auditors.length > 0) {
      finalY = doc.lastAutoTable.finalY + 10;
      if (finalY > 250) {
        doc.addPage();
        finalY = 20;
      }
      doc.setFontSize(12);
      doc.text('Auditors Breakdown', 14, finalY);
      autoTable(doc, {
        startY: finalY + 4,
        head: [['Auditor', 'Assigned SKUs', 'Completed', 'Completion %', 'Match %']],
        body: auditors.map(a => [
          a.name,
          a.assignedSKUs || 0,
          a.completedSKUs || 0,
          `${a.completionRate || 0}%`,
          `${a.matchRate || 0}%`
        ]),
        theme: 'striped',
        headStyles: { fillColor: [52, 152, 219] },
        styles: { fontSize: 8 }
      });
    }

    // Deviations
    if (deviations && deviations.length > 0) {
      finalY = doc.lastAutoTable.finalY + 10;
      if (finalY > 250) {
        doc.addPage();
        finalY = 20;
      }
      doc.setFontSize(12);
      doc.text('Deviations Breakdown', 14, finalY);
      autoTable(doc, {
        startY: finalY + 4,
        head: [['Deviation Type', 'Count', 'Value (Rs.)']],
        body: deviations.map(d => [
          d.type,
          d.count || 0,
          `Rs. ${(d.value || 0).toLocaleString()}`
        ]),
        theme: 'striped',
        headStyles: { fillColor: [231, 76, 60] }
      });
    }

    // Product-Level Details (by Deviation Type)
    Object.keys(detailedProductData).forEach(deviationType => {
      const deviationData = detailedProductData[deviationType];
      const productDetails = [];

      if (typeof deviationData === 'object' && !Array.isArray(deviationData)) {
        // Has product forms (like Invoiced, Contra Short)
        Object.keys(deviationData).forEach(productForm => {
          deviationData[productForm].forEach(product => {
            productDetails.push([
              productForm,
              product.productId,
              product.sku,
              product.productName.length > 20 ? product.productName.substring(0, 17) + '...' : product.productName,
              product.systemQty,
              product.physicalQty,
              product.difference || 0,
              `Rs. ${product.totalValue}`
            ]);
          });
        });
      } else if (Array.isArray(deviationData)) {
        // Direct array (like Contra Excess, Excess Submitted)
        deviationData.forEach(product => {
          productDetails.push([
            'N/A',
            product.productId,
            product.sku,
            product.productName.length > 20 ? product.productName.substring(0, 17) + '...' : product.productName,
            product.systemQty,
            product.physicalQty,
            product.difference || 0,
            `₹${product.totalValue}`
          ]);
        });
      }

      if (productDetails.length > 0) {
        finalY = doc.lastAutoTable.finalY + 10;
        if (finalY > 250) {
          doc.addPage();
          finalY = 20;
        }
        doc.setFontSize(11);
        doc.text(`Product Details: ${deviationType}`, 14, finalY);
        autoTable(doc, {
          startY: finalY + 4,
          head: [['Form', 'PID', 'SKU', 'Product', 'Sys Qty', 'Phy Qty', 'Diff', 'Value']],
          body: productDetails,
          theme: 'grid',
          headStyles: { fillColor: [46, 134, 193], fontSize: 8 },
          styles: { fontSize: 7 },
          columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 18 },
            2: { cellWidth: 18 },
            3: { cellWidth: 40 },
            4: { cellWidth: 15 },
            5: { cellWidth: 15 },
            6: { cellWidth: 12 },
            7: { cellWidth: 20 }
          }
        });
      }
    });

    doc.save(`Store_${storeId}_${storeName.replace(/\s+/g, '_')}_Report.pdf`);
  };

  // Handle deviation row click
  const handleDeviationClick = (deviationType) => {
    console.log('Deviation clicked:', deviationType);
    setSelectedDeviationType(selectedDeviationType === deviationType ? null : deviationType);
  };

  // Toggle auditor expansion
  const toggleAuditor = (auditorIndex) => {
    setExpandedAuditors(prev => ({
      ...prev,
      [auditorIndex]: !prev[auditorIndex]
    }));
  };

  // Generate PID data for each auditor with all details
  const generateAuditorDetails = (auditor, auditorIndex) => {
    const pidCount = Math.floor((auditor.assignedSKUs || 0) / 3); // Average 3 SKUs per PID
    const pids = [];
    const completionRate = auditor.completionRate || 0;

    for (let i = 0; i < pidCount; i++) {
      const skuCountForPID = Math.floor(Math.random() * 4) + 2; // 2-5 SKUs per PID

      // Determine status based on completion rate and random distribution
      let status;
      const randomValue = Math.random() * 100;
      if (randomValue < completionRate) {
        status = 'Completed';
      } else if (randomValue < completionRate + 20) {
        status = 'In Progress';
      } else {
        status = 'Created';
      }

      // Generate start time (between 8 AM and 5 PM)
      const startHour = Math.floor(Math.random() * 9) + 8; // 8-16
      const startMinute = Math.floor(Math.random() * 60);
      const startTime = `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;

      // Generate end time and duration based on status
      let endTime = 'N/A';
      let duration = 'N/A';

      if (status === 'Completed') {
        // Calculate duration (15-45 minutes per PID)
        const durationMinutes = Math.floor(Math.random() * 30) + 15;
        const endHour = startHour + Math.floor((startMinute + durationMinutes) / 60);
        const endMinute = (startMinute + durationMinutes) % 60;
        endTime = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;

        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;
        duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
      } else if (status === 'In Progress') {
        // For in-progress, show start time but no end time
        duration = 'Ongoing';
      }

      pids.push({
        pid: `PID${(auditorIndex + 1) * 1000 + i + 1}`,
        skuCount: skuCountForPID,
        status: status,
        startTime: status !== 'Created' ? startTime : 'N/A',
        endTime: endTime,
        duration: duration
      });
    }

    return pids;
  };

  // Determine active data for the chart
  const activeData = selectedDeviationType && productFormData[selectedDeviationType]
    ? productFormData[selectedDeviationType]
    : [
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
    ];

  const RADIAN = Math.PI / 180;

  // --- Layout & Renderer for Product Form Chart ---
  const productLabelLayout = (() => {
    const totalValue = activeData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    const slices = activeData.map((item, index) => {
      const value = item.value;
      const angleSpan = (value / totalValue) * 360;
      const midAngle = currentAngle + angleSpan / 2;
      currentAngle += angleSpan;
      const r = 100 + 30;
      const idealY = Math.sin(-midAngle * RADIAN) * r;
      return { index, midAngle, idealY, value, isRightSide: Math.cos(-midAngle * RADIAN) >= 0 };
    });

    const resolveSide = (items) => {
      items.sort((a, b) => a.idealY - b.idealY);
      const minSpacing = 30;
      for (let i = 1; i < items.length; i++) {
        if (items[i].idealY < items[i - 1].idealY + minSpacing) {
          items[i].idealY = items[i - 1].idealY + minSpacing;
        }
      }
      return items;
    };
    const leftItems = resolveSide(slices.filter(s => !s.isRightSide));
    const rightItems = resolveSide(slices.filter(s => s.isRightSide));
    const layoutMap = {};
    [...leftItems, ...rightItems].forEach(item => { layoutMap[item.index] = item.idealY; });
    return layoutMap;
  })();

  const renderProductLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value, fill }) => {
    const cos = Math.cos(-midAngle * RADIAN);
    const sin = Math.sin(-midAngle * RADIAN);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;

    const adjustedDy = productLabelLayout[index] !== undefined ? productLabelLayout[index] : (outerRadius + 30) * sin;
    const my = cy + adjustedDy;
    const mx = cx + (outerRadius + 40) * (cos >= 0 ? 1 : -1);

    // Fixed endpoint X
    const fixedOffset = outerRadius + 80;
    const ex = cx + (cos >= 0 ? 1 : -1) * fixedOffset;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={-10} textAnchor={textAnchor} fill="#333" fontSize="12" fontWeight="bold">
          {name}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={8} textAnchor={textAnchor} fill="#999" fontSize="11">
          {`${(percent * 100).toFixed(1)}%`}
        </text>
      </g>
    );
  };

  // --- Layout & Renderer for Deviation Chart ---
  const deviationLabelLayout = (() => {
    // Only compute if deviationChartData exists and has items
    if (!deviationChartData || deviationChartData.length === 0) return {};

    const totalValue = deviationChartData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    const slices = deviationChartData.map((item, index) => {
      const value = item.value;
      const angleSpan = totalValue ? (value / totalValue) * 360 : 0;
      const midAngle = currentAngle + angleSpan / 2;
      currentAngle += angleSpan;

      const r = 70 + 30; // outerRadius is 70 for deviation chart + 30
      // Assuming outerRadius 70 for calculation.
      const calcOuterRadius = 70;

      const idealY = Math.sin(-midAngle * RADIAN) * (calcOuterRadius + 30);
      return { index, midAngle, idealY, value, isRightSide: Math.cos(-midAngle * RADIAN) >= 0 };
    });

    const resolveSide = (items) => {
      items.sort((a, b) => a.idealY - b.idealY);
      const minSpacing = 30;
      for (let i = 1; i < items.length; i++) {
        if (items[i].idealY < items[i - 1].idealY + minSpacing) {
          items[i].idealY = items[i - 1].idealY + minSpacing;
        }
      }
      return items;
    };

    const leftItems = resolveSide(slices.filter(s => !s.isRightSide));
    const rightItems = resolveSide(slices.filter(s => s.isRightSide));
    const layoutMap = {};
    [...leftItems, ...rightItems].forEach(item => { layoutMap[item.index] = item.idealY; });
    return layoutMap;
  })();

  const renderDeviationLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value, fill }) => {
    const cos = Math.cos(-midAngle * RADIAN);
    const sin = Math.sin(-midAngle * RADIAN);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;

    // Use deviationLabelLayout
    const adjustedDy = deviationLabelLayout[index] !== undefined ? deviationLabelLayout[index] : (outerRadius + 30) * sin;
    const my = cy + adjustedDy;

    const mx = cx + (outerRadius + 40) * (cos >= 0 ? 1 : -1);

    // Fixed endpoint X
    const fixedOffset = outerRadius + 80;
    const ex = cx + (cos >= 0 ? 1 : -1) * fixedOffset;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={-10} textAnchor={textAnchor} fill="#333" fontSize="12" fontWeight="bold">
          {name}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={8} textAnchor={textAnchor} fill="#999" fontSize="11">
          {`${(percent * 100).toFixed(1)}%`}
        </text>
      </g>
    );
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" className="store-detail-modal">
      <Modal.Header closeButton className="bg-primary text-white">
        <div className="d-flex w-100 justify-content-between align-items-center pe-3">
          <Modal.Title>
            <i className="fas fa-store me-2"></i>
            {storeId} - {auditStatus === 'in-progress' ? 'Ongoing Store Audits' : 'Store Audit Details'}
          </Modal.Title>
          <Dropdown>
            <Dropdown.Toggle
              size="sm"
              className="d-flex align-items-center gap-2 fw-bold shadow-sm"
              style={{ backgroundColor: '#0dcaf0', color: 'white', border: 'none' }}
              id="store-download-dropdown"
            >
              <i className="fas fa-download"></i> Download Report
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleDownloadExcel}>
                <i className="fas fa-file-excel text-success me-2"></i> Export as Excel
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDownloadPDF}>
                <i className="fas fa-file-pdf text-danger me-2"></i> Export as PDF
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Modal.Header>
      <Modal.Body className="p-4">
        {/* Store Info Header */}
        <Card className="mb-3 border-0 shadow-sm">
          <Card.Body>
            {/* First Row: Store Name and State */}
            <Row className="mb-3 align-items-center">
              <Col md={8}>
                <div className="d-flex align-items-center mb-2">
                  <div className="text-muted small me-2 fw-bold" style={{ minWidth: '150px' }}>STORE NAME:</div>
                  <OverlayTrigger
                    placement="top"
                    overlay={<BootstrapTooltip>{storeName}</BootstrapTooltip>}
                  >
                    <div className="fw-bold" style={{ 
                      maxWidth: '400px', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap' 
                    }}>
                      {storeName}
                    </div>
                  </OverlayTrigger>
                </div>
              </Col>

              <Col md={4}>
                <div className="d-flex align-items-center mb-2">
                  <div className="text-muted small me-2 fw-bold" style={{ minWidth: '100px' }}>STATE:</div>
                  <div className="fw-bold">{state}</div>
                </div>
              </Col>
            </Row>

            {/* Second Row: Lead Supervisor, Auditor Count, Duration */}
            <Row className="mb-3 align-items-center">
              <Col md={4}>
                <div className="d-flex align-items-center mb-2">
                  <div className="text-muted small me-2 fw-bold" style={{ minWidth: '150px' }}>LEAD SUPERVISOR:</div>
                  <div className="fw-bold">
                    {supervisor || 'N/A'}
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="d-flex align-items-center mb-2">
                  <div className="text-muted small me-2 fw-bold" style={{ minWidth: '180px' }}>AUDITOR COUNT:</div>
                  <div className="fw-bold">{auditors?.length || 0}</div>
                </div>
              </Col>

              <Col md={4}>
                <div className="d-flex align-items-center mb-2">
                  <div className="text-muted small me-2 fw-bold" style={{ minWidth: '100px' }}>DURATION:</div>
                  <div className="fw-bold">
                    20/08/2026 - {auditStatus === 'completed' ? '25/08/2026' : 'Ongoing'}
                  </div>
                </div>
              </Col>
            </Row>

            {/* Third Row: Audit Job Type, Audit Process Type, Progress */}
            <Row className="align-items-center">
              <Col md={4}>
                <div className="d-flex align-items-center mb-2">
                  <div className="text-muted small me-2 fw-bold" style={{ minWidth: '150px' }}>AUDIT JOB TYPE:</div>
                  <div className="fw-bold">Full Audit</div>
                </div>
              </Col>

              <Col md={4}>
                <div className="d-flex align-items-center mb-2">
                  <div className="text-muted small me-2 fw-bold" style={{ minWidth: '180px' }}>AUDIT PROCESS TYPE:</div>
                  <div className="fw-bold">
                    {auditProcessType || 'Batch Audit'}
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="mb-2">
                  {auditStatus === 'completed' ? (
                    <div className="d-flex align-items-center">
                      <div className="text-muted small me-2 fw-bold" style={{ minWidth: '100px' }}>PROGRESS:</div>
                      <h5 className="fw-bold text-success mb-0">Completed</h5>
                    </div>
                  ) : (
                    <>
                      <div className="text-muted small mb-1 fw-bold">PROGRESS:</div>
                      <div className="d-flex align-items-center">
                        <h5 className="fw-bold text-primary mb-0 me-3">{auditProgress.percentage || 0}%</h5>
                        <ProgressBar
                          className="flex-grow-1"
                          now={auditProgress.percentage || 0}
                          variant="primary"
                          style={{ height: '8px' }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Mini Dashboard - KPIs */}
        <Row className="g-3 mb-4">
          {/* Card 1: Audited SKUs */}
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-muted small mb-1 fw-bold">AUDITED SKUS</div>
                <h3 className="mb-0 text-primary">{inventorySummary.auditedSKUs?.toLocaleString() || '0'}</h3>
                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
                  <small className="text-muted d-block fw-bold">TOTAL SKUS</small>
                  <span className="fw-bold text-dark">{inventorySummary.totalSKUs?.toLocaleString() || '0'}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2: Audited Qty */}
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-muted small mb-1 fw-bold">AUDITED QTY</div>
                <h3 className="mb-0 text-info">{formatIndianNumber(AppearedQty || 0, true)}</h3>
                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
                  <small className="text-muted d-block fw-bold">TOTAL QTY</small>
                  <span className="fw-bold text-dark">{formatIndianNumber(inventorySummary.totalQuantity || AppearedQty || 0, true)}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 3: Audited Value at MRP */}
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-muted small mb-1 fw-bold">AUDITED VALUE AT MRP</div>
                <h3 className="mb-0 text-success">
                  {inventorySummary.totalValue >= 10000000
                    ? `₹${(inventorySummary.totalValue / 10000000).toFixed(2)}Cr`
                    : inventorySummary.totalValue >= 100000
                      ? `₹${(inventorySummary.totalValue / 100000).toFixed(2)}L`
                      : `₹${formatIndianNumber(inventorySummary.totalValue || 0)}`}
                </h3>
                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
                  <small className="text-muted d-block fw-bold">INVENTORY VALUE AT MRP</small>
                  <span className="fw-bold text-dark">
                    {inventorySummary.totalValue >= 10000000
                      ? `₹${(inventorySummary.totalValue / 10000000).toFixed(2)}Cr`
                      : inventorySummary.totalValue >= 100000
                        ? `₹${(inventorySummary.totalValue / 100000).toFixed(2)}L`
                        : `₹${formatIndianNumber(inventorySummary.totalValue || 0)}`}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 4: Total Deviations */}
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className="text-muted small mb-1 fw-bold">TOTAL DEVIATIONS</div>
                <h3 className="mb-0 text-danger">
                  {RevisedSKUs || 0}
                </h3>
                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
                  <small className="text-muted d-block fw-bold">DEVIATION VALUE AT MRP</small>
                  <span className="text-danger fw-bold">
                    {RevisedValue >= 10000000
                      ? `₹${(RevisedValue / 10000000).toFixed(2)}Cr`
                      : RevisedValue >= 100000
                        ? `₹${(RevisedValue / 100000).toFixed(2)}L`
                        : `₹${formatIndianNumber(RevisedValue || 0)}`}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Audit Accuracy Section */}
        {auditStatus === 'completed' && (
          <>
            <Row className="g-3 mb-4">
                <Col md={4}>
                  <Card className="border-0 shadow-sm border-start border-4 border-primary">
                    <Card.Body>
                      <h6 className="text-primary fw-bold text-uppercase mb-3">APPEARED MISMATCHES</h6>
                      <div className="d-flex justify-content-between mb-1 text-muted small">
                        <span>SKUs</span>
                        <span className="fw-bold text-dark">{formatIndianNumber(storeData.AppearedSKUs || 0, true)}</span>
                      </div>
                      <div className="d-flex justify-content-between text-muted small">
                        <span>Value (MRP)</span>
                        <span className="fw-bold text-dark">{formatIndianCurrency(storeData.AppearedValue || 0)}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="border-0 shadow-sm border-start border-4 border-warning">
                    <Card.Body>
                      <h6 className="text-warning fw-bold text-uppercase mb-3">REVISED MISMATCHES</h6>
                      <div className="d-flex justify-content-between mb-1 text-muted small">
                        <span>SKUs</span>
                        <span className="fw-bold text-dark">{formatIndianNumber(storeData.RevisedSKUs || 0, true)}</span>
                      </div>
                      <div className="d-flex justify-content-between text-muted small">
                        <span>Value (MRP)</span>
                        <span className="fw-bold text-dark">{formatIndianCurrency(storeData.RevisedValue || 0)}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="border-0 shadow-sm border-start border-4 border-success">
                    <Card.Body>
                      <h6 className="text-success fw-bold text-uppercase mb-3">FINAL DEVIATIONS</h6>
                      <div className="d-flex justify-content-between mb-1 text-muted small">
                        <span>SKUs</span>
                        <span className="fw-bold text-dark">{formatIndianNumber(storeData.MatchedSKUs || 0, true)}</span>
                      </div>
                      <div className="d-flex justify-content-between text-muted small">
                        <span>Value (MRP)</span>
                        <span className="fw-bold text-dark">{formatIndianCurrency(storeData.MatchedValue || 0)}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}

        {/* PIDs, Mismatches, Deviations Summary - Show for in-progress */}
        {auditStatus === 'in-progress' && (
          <Row className="g-3 mb-4">
            {/* Card 1: PIDs */}
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <h6 className="fw-bold text-primary mb-3" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <i className="fas fa-box me-2"></i>PIDs
                  </h6>
                  <Row className="g-2">
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded">
                        <div className="text-muted small mb-1">Total PIDs</div>
                        <h5 className="mb-0 fw-bold">
                          {formatIndianNumber(inventorySummary.totalPIDs, true)}
                        </h5>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded">
                        <div className="text-muted small mb-1">Pending PIDs</div>
                        <h5 className="mb-0 fw-bold text-warning">
                          {formatIndianNumber(((inventorySummary.totalPIDs || 0) - Math.floor((inventorySummary.totalPIDs || 0) * ((auditProgress.percentage || 0) / 100))), true)}
                        </h5>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded">
                        <div className="text-muted small mb-1">Total SKUs</div>
                        <h5 className="mb-0 fw-bold">
                          {formatIndianNumber(inventorySummary.totalSKUs, true)}
                        </h5>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded">
                        <div className="text-muted small mb-1">Pending SKUs</div>
                        <h5 className="mb-0 fw-bold text-warning">
                          {formatIndianNumber(((inventorySummary.totalSKUs || 0) - (auditProgress.completedSKUs || 0)), true)}
                        </h5>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Card 2: Mismatches */}
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <h6 className="fw-bold text-danger mb-3" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <i className="fas fa-exclamation-circle me-2"></i>Mismatches
                  </h6>
                  <Row className="g-2">
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded">
                        <div className="text-muted small mb-1">Appeared</div>
                        <h5 className="mb-0 fw-bold">
                          {formatIndianNumber(deviations.filter(d => d.type === 'Contra Short' || d.type === 'Contra Excess').reduce((sum, d) => sum + (d.count || 0), 0), true)}
                        </h5>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded">
                        <div className="text-muted small mb-1">Pending</div>
                        <h5 className="mb-0 fw-bold text-warning">
                          {(() => {
                            const totalMismatch = deviations.filter(d => d.type === 'Contra Short' || d.type === 'Contra Excess').reduce((sum, d) => sum + (d.count || 0), 0);
                            const completionRate = (auditProgress.percentage || 0) / 100;
                            return formatIndianNumber(Math.ceil(totalMismatch * (1 - completionRate * 0.7)), true);
                          })()}
                        </h5>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded">
                        <div className="text-muted small mb-1">Revised</div>
                        <h5 className="mb-0 fw-bold text-success">
                          {(() => {
                            const totalMismatch = deviations.filter(d => d.type === 'Contra Short' || d.type === 'Contra Excess').reduce((sum, d) => sum + (d.count || 0), 0);
                            const completionRate = (auditProgress.percentage || 0) / 100;
                            return formatIndianNumber(Math.floor(totalMismatch * completionRate * 0.7), true);
                          })()}
                        </h5>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded">
                        <div className="text-muted small mb-1">Deviations</div>
                        <h5 className="mb-0 fw-bold text-warning">
                          {deviations.filter(d => d.type === 'Short' || d.type === 'Excess').reduce((sum, d) => sum + (d.count || 0), 0).toLocaleString()}
                        </h5>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Card 3: Deviations */}
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <h6 className="fw-bold text-warning mb-3" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <i className="fas fa-exclamation-triangle me-2"></i>Deviations
                  </h6>
                  <Row className="g-2">
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded">
                        <div className="text-muted small mb-1">Total</div>
                        <h5 className="mb-0 fw-bold">
                          {deviations.filter(d => d.type === 'Short' || d.type === 'Excess').reduce((sum, d) => sum + (d.count || 0), 0).toLocaleString()}
                        </h5>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded">
                        <div className="text-muted small mb-1">Pending</div>
                        <h5 className="mb-0 fw-bold text-warning">
                          {(() => {
                            const totalDevCount = deviations.filter(d => d.type === 'Short' || d.type === 'Excess').reduce((sum, d) => sum + (d.count || 0), 0);
                            const completionRate = (auditProgress.percentage || 0) / 100;
                            return Math.ceil(totalDevCount * (1 - completionRate * 0.8)).toLocaleString();
                          })()}
                        </h5>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="p-3 bg-light rounded">
                        <div className="text-muted small mb-1">Submitted</div>
                        <h5 className="mb-0 fw-bold text-success">
                          {(() => {
                            const totalDevCount = deviations.filter(d => d.type === 'Short' || d.type === 'Excess').reduce((sum, d) => sum + (d.count || 0), 0);
                            const completionRate = (auditProgress.percentage || 0) / 100;
                            return Math.floor(totalDevCount * completionRate * 0.8).toLocaleString();
                          })()}
                        </h5>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

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
                    <th style={{ width: '30px' }}></th>
                    <th>Emp ID</th>
                    <th>Auditor Name</th>
                    {(auditStatus === 'in-progress' || auditStatus === 'completed') && (
                      <>
                        <th>Audited SKUs</th>
                        <th>Audited Qty (Units)</th>
                        <th>Audited Val (MRP)</th>
                        {auditStatus === 'in-progress' && <th>Progress (%)</th>}
                        <th>Audit Accuracy (%)</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {auditors.map((auditor, auditorIdx) => {
                    const isExpanded = expandedAuditors[auditorIdx];
                    // Only generate PID data for in-progress audits
                    const pidData = (isExpanded && auditStatus === 'in-progress') ? generateAuditorDetails(auditor, auditorIdx) : [];

                    return (
                      <>
                        {/* Main Auditor Row */}
                        <tr key={auditorIdx} style={{ cursor: (auditStatus === 'in-progress' || auditStatus === 'completed') ? 'pointer' : 'default' }}>
                          <td onClick={() => (auditStatus === 'in-progress' || auditStatus === 'completed') && toggleAuditor(auditorIdx)}>
                            {(auditStatus === 'in-progress' || auditStatus === 'completed') && (
                              <i className={`fas fa-chevron-${isExpanded ? 'down' : 'right'} text-primary`}></i>
                            )}
                          </td>
                          <td className="fw-semibold">{auditor.empId || `EMP${String(auditorIdx + 1).padStart(3, '0')}`}</td>
                          <td className="fw-semibold" onClick={() => (auditStatus === 'in-progress' || auditStatus === 'completed') && toggleAuditor(auditorIdx)}>
                            {auditor.name}
                          </td>
                          {(auditStatus === 'in-progress' || auditStatus === 'completed') && (
                            <>
                              <td>{auditor.completedSKUs?.toLocaleString()}</td>
                              <td>{Math.floor((auditor.completedSKUs || 0) * 10.5).toLocaleString()}</td>
                              <td>{formatIndianCurrency((auditor.completedSKUs || 0) * 450)}</td>
                              {auditStatus === 'in-progress' && (
                                <td style={{ minWidth: '150px' }}>
                                  <ProgressBar
                                    now={auditor.completionRate || 0}
                                    label={`${(auditor.completionRate || 0).toFixed(1)}%`}
                                    variant={auditor.completionRate >= 80 ? 'success' : 'warning'}
                                    style={{ height: '20px' }}
                                  />
                                </td>
                              )}
                              <td>
                                <Badge bg={auditor.matchRate >= 95 ? 'success' : auditor.matchRate >= 90 ? 'warning' : 'danger'}>
                                  {auditor.matchRate?.toFixed(1)}%
                                </Badge>
                              </td>
                            </>
                          )}
                        </tr>

                        {/* Re-audit Summary for Completed Audit */}
                        {isExpanded && auditStatus === 'completed' && (
                          <tr key={`${auditorIdx}-summary`} style={{ backgroundColor: '#f8f9fa' }}>
                            <td colSpan="7" className="p-4">
                              <div className="border-start border-4 border-primary ps-3 mb-3">
                                <h6 className="fw-bold text-primary mb-0 text-uppercase">Re-Audit Summary</h6>
                              </div>
                              <Table bordered size="sm" className="mb-0 bg-white" style={{ maxWidth: '800px' }}>
                                <thead className="bg-light">
                                  <tr>
                                    <th className="py-2 text-primary">CATEGORY</th>
                                    <th className="py-2 text-end text-primary">SKUS</th>
                                    <th className="py-2 text-end text-primary">VALUE (MRP)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="py-2 fw-semibold">Appeared</td>
                                    <td className="py-2 text-end">{auditor.assignedSKUs || 70}</td>
                                    <td className="py-2 text-end fw-bold">₹2.29 L</td>
                                  </tr>
                                  <tr>
                                    <td className="py-2 fw-semibold">Revised</td>
                                    <td className="py-2 text-end">{auditor.completedSKUs || 67}</td>
                                    <td className="py-2 text-end fw-bold text-success">₹2.20 L</td>
                                  </tr>
                                  <tr>
                                    <td className="py-2 fw-semibold">Deviations</td>
                                    <td className="py-2 text-end">{(auditor.assignedSKUs - auditor.completedSKUs) || 3}</td>
                                    <td className="py-2 text-end fw-bold text-warning">₹9,174</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </td>
                          </tr>
                        )}

                        {/* Expanded PID Rows */}
                        {isExpanded && pidData.map((pid, pidIdx) => (
                          <tr
                            key={`${auditorIdx}-pid-${pidIdx}`}
                            style={{ backgroundColor: '#f8f9fa' }}
                          >
                            <td></td>
                            <td className="ps-4">
                              <i className="fas fa-box text-secondary me-2"></i>
                              <strong>{pid.pid}</strong>
                            </td>
                            {(auditStatus === 'in-progress' || auditStatus === 'completed') && (
                              <>
                                <td>
                                  <Badge bg="info">{pid.skuCount} SKUs</Badge>
                                </td>
                                <td>
                                  <Badge bg={pid.status === 'Completed' ? 'success' : pid.status === 'In Progress' ? 'warning' : 'secondary'}>
                                    {pid.status}
                                  </Badge>
                                  <div className="text-muted small mt-1">
                                    <i className="far fa-clock me-1"></i>Start: {pid.startTime}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-muted small">
                                    <i className="far fa-clock me-1 text-danger"></i>End: {pid.endTime}
                                  </div>
                                  <div className="fw-semibold small mt-1">
                                    <i className="fas fa-hourglass-half me-1 text-warning"></i>{pid.duration}
                                  </div>
                                </td>
                                <td></td>
                              </>
                            )}
                          </tr>
                        ))}
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        {/* Deviations and Contra Side by Side - Show only for completed */}
        {auditStatus === 'completed' && (
          <>
            <h6 className="text-muted text-uppercase mb-3 fw-bold" style={{ fontSize: '0.85rem' }}>Deviation analysis</h6>
            <Row className="g-3">
              {/* Deviations Section */}
              <Col lg={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-light">
                  <h6 className="mb-0 fw-bold">
                    <i className="fas fa-exclamation-triangle me-2 text-danger"></i>
                    Deviations Summary
                  </h6>
                </Card.Header>
                <Card.Body>
                  {deviations.length > 0 ? (
                    <>
                      {/* Deviation Chart */}
                      {/* Deviation Chart Removed */}


                      {/* Deviation Table */}
                      <div className="mt-3" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                        <Table hover size="sm" className="mb-0">
                          <thead className="bg-light sticky-top">
                            <tr>
                              <th>Type</th>
                              <th className="text-end">SKUs (Count)</th>
                              <th className="text-end">Value (MRP)</th>
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
                      <div className="text-center mt-3 text-muted small">
                        <i className="fas fa-info-circle me-1"></i>
                        Click on any deviation type to see specific breakdown
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
                          Audit Form Breakdown
                        </>
                      ) : (
                        <>
                          <i className="fas fa-chart-pie me-2 text-info"></i>
                          Deviation Details
                        </>
                      )}
                    </h6>
                    {selectedDeviationType && (
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => setSelectedDeviationType(null)}
                      >
                        Clear
                      </Button>
                    )}
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

                      {/* Product Form Chart Removed */}

                      <div className="mt-3" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                        <Table hover size="sm" className="mb-0">
                          <thead className="bg-light sticky-top">
                            <tr>
                              <th>Form</th>
                              <th className="text-end">SKUs (Count)</th>
                              <th className="text-end">Value (MRP)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeData.map((form, idx) => (
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
                                  ₹{form.value.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  ) : (
                    /* Show Overall Product Form Distribution by default */
                    <div>
                      <div className="mb-3">
                        <h6 className="text-primary mb-2">
                         Audit Form Wise Deviation
                        </h6>
                        <div className="text-muted small">
                          Across all deviation types
                        </div>
                      </div>
                      {/* Overall Product Form Chart Removed */}

                      <div className="mt-3" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                        <Table hover size="sm" className="mb-0">
                          <thead className="bg-light sticky-top">
                            <tr>
                              <th>Form</th>
                              <th className="text-end">SKUs (Count)</th>
                              <th className="text-end">Value (MRP)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeData.map((form, idx) => (
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
                                  ₹{form.value.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>

                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal >
  );
};

export default StoreDetailModal;
