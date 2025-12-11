# 🎨 Visual Mock-up Description - Audit HOD Dashboard

## Dashboard Layout Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│  AUDIT HOD DASHBOARD                        Last Refreshed: [timestamp] │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                         [Refresh Now]    │
│  [FY: 2024-25 ▼] [State ▼] [Store ▼] [Job Type ▼] [Process ▼] [Status ▼]│
│  ℹ Export Available - All list and drill-down views support Export      │
└─────────────────────────────────────────────────────────────────────────┘
│                                                                           │
│  ┌─ Store Coverage ─┬─ Live Audit ─┬─ Auditor Performance ─┬─ Supervisor ─┐
│  │   (Active Tab)   │               │                       │   Approvals   │
│  └──────────────────┴───────────────┴───────────────────────┴──────────────┘
│                                                                           │
│  [Tab Content Area - Changes based on selected tab]                     │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## Tab 1: Store Coverage & Inventory - Visual Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         STORE COVERAGE TAB                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│  │ 🏪 TOTAL     │  │ ✅ COVERED   │  │ ⚠️ UNCOVERED │                  │
│  │    450       │  │    385       │  │    65        │                  │
│  │              │  │   85.6%      │  │   14.4%      │                  │
│  │ Active Stores│  │ of total     │  │ of total     │                  │
│  └──────────────┘  └──────────────┘  └──────────────┘                  │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 📊 STORE RECENCY ANALYSIS                                           ││
│  │ ─────────────────────────────────────────────────────────────────── ││
│  │                                                                      ││
│  │  0-3 Months    ████████████████████ 180 stores (46.8%)            ││
│  │  3-6 Months    ████████████ 125 stores (32.5%)                     ││
│  │  6-9 Months    ████ 55 stores (14.3%)                              ││
│  │  9-12 Months   ██ 25 stores (6.5%)                                 ││
│  │                                                                      ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│  │ 📦 TOTAL     │  │ 📊 TOTAL     │  │ 💰 INVENTORY │                  │
│  │   SKUs       │  │  QUANTITY    │  │    VALUE     │                  │
│  │   12,450     │  │   245,600    │  │  ₹34.57L     │                  │
│  └──────────────┘  └──────────────┘  └──────────────┘                  │
│                                                                           │
│  ┌──────────────────────────┐  ┌─────────────────────────────────────┐ │
│  │ 🥧 DEVIATION              │  │ 📋 DEVIATION SUMMARY                │ │
│  │    DISTRIBUTION           │  │                                     │ │
│  │                           │  │  Private - Invoiced        ₹45K → │ │
│  │      [Pie Chart]          │  │  Private - Contra Short    ₹32K → │ │
│  │   8 Segments              │  │  Private - Contra Excess   ₹28K → │ │
│  │   Color Coded             │  │  Private - Excess Sub      ₹15K → │ │
│  │   Interactive             │  │  Non-Pvt - Invoiced        ₹38K → │ │
│  │                           │  │  Non-Pvt - Contra Short    ₹27K → │ │
│  └──────────────────────────┘  │  Non-Pvt - Contra Excess   ₹22K → │ │
│                                 │  Non-Pvt - Excess Sub      ₹12K → │ │
│                                 └─────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## Tab 2: Live Audit Schedule - Visual Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      LIVE AUDIT SCHEDULE TAB                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │ 📄       │  │ 🔄       │  │ ⏸️       │  │ ✅       │               │
│  │ CREATED  │  │IN-PROGRESS│  │ PENDING  │  │COMPLETED │               │
│  │   45     │  │   128    │  │   37     │  │   240    │               │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘               │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 📊 LIVE AUDIT SCHEDULE TABLE                                        ││
│  │ ─────────────────────────────────────────────────────────────────── ││
│  │                                                                      ││
│  │ Store  │ Store Name      │ Supervisor │ Auditors │ Start │ Progress││
│  │ ────── │ ─────────────── │ ────────── │ ──────── │ ───── │ ────────││
│  │ MP001  │ Chennai Central │ Rajesh K   │ [3] A,P,S│ 12/01 │ ███ 77%││
│  │                                                      3250/4200 SKUs  ││
│  │                                                                      ││
│  │ MP002  │ Bangalore Hub   │ Lakshmi I  │ [2] D,A  │ 12/03 │ ██ 71% ││
│  │                                                      2800/3900 SKUs  ││
│  │                                                                      ││
│  │ MP003  │ Hyderabad Main  │ Mohammed A │ [4] R,S,K│ 12/05 │ ███ 78%││
│  │                                                      4100/5200 SKUs  ││
│  │                                                                      ││
│  │ [Click any row to view auditor-wise breakdown]                      ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘

When you CLICK a row, this modal appears:
┌─────────────────────────────────────────────────────────────────────────┐
│  Chennai Central (MP001) - Live Audit Progress                      [X] │
├─────────────────────────────────────────────────────────────────────────┤
│  Supervisor: Rajesh Kumar  │  Started: 12/01  │  Days: 9               │
│  Progress: ████████████████████████ 77.4% (3250 / 4200 SKUs)          │
│  Value: ₹4,35,000 covered                                               │
│                                                                           │
│  AUDITOR-WISE BREAKDOWN:                                                 │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Auditor      │ Assigned │ Completed │ Rate │ Value Covered       │  │
│  │ ──────────── │ ──────── │ ───────── │ ──── │ ─────────────────── │  │
│  │ Amit Singh   │   1200   │    950    │ 79%  │ ₹125,000            │  │
│  │ Priya Reddy  │   1500   │   1250    │ 83%  │ ₹168,000            │  │
│  │ Suresh Kumar │   1500   │   1050    │ 70%  │ ₹142,000            │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                    [Export] [Close]      │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## Tab 3: Auditor Performance - Visual Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AUDITOR PERFORMANCE TAB                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│  │ ⏱️ AVG TIME  │  │ 🎯 MATCH     │  │ ✏️ EDIT      │                  │
│  │   PER SKU    │  │    RATE      │  │   RATE       │                  │
│  │   4.2 min    │  │   94.5%      │  │   8.3%       │                  │
│  └──────────────┘  └──────────────┘  └──────────────┘                  │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 📊 AUDITOR PRODUCTIVITY TABLE                                       ││
│  │ ─────────────────────────────────────────────────────────────────── ││
│  │                                                                      ││
│  │ ID   │ Name      │Allot│Comp│Completion│AvgTime│Match%│Edit%│ ►   ││
│  │──────│───────────│─────│────│──────────│───────│──────│─────│─────││
│  │AUD001│Amit Singh │2400 │2150│████ 89.6%│ 4.1m  │95.2% │7.5% │  ►  ││
│  │AUD002│Priya Reddy│2800 │2650│█████ 94.6│ 3.8m  │96.8% │6.2% │  ►  ││
│  │AUD003│Suresh K   │2200 │1850│███ 84.1% │ 5.2m  │91.5% │11.8%│  ►  ││
│  │AUD004│Deepak S   │2600 │2450│████ 94.2%│ 4.0m  │94.8% │8.1% │  ►  ││
│  │                                                                      ││
│  │ [Click any row to view PID-level workload]                          ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌──────────────────────────┐  ┌─────────────────────────────────────┐ │
│  │ 🏆 TOP PERFORMERS        │  │ ⚠️ NEEDS ATTENTION                  │ │
│  │                          │  │                                     │ │
│  │  1 Priya Reddy   94.6%  │  │  1 Ravi Verma    83.3%             │ │
│  │  2 Deepak Sharma 94.2%  │  │  2 Suresh Kumar  84.1%             │ │
│  │  3 Anitha Rao    93.6%  │  │  3 Vijay Kumar   85.2%             │ │
│  └──────────────────────────┘  └─────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## Tab 4: Supervisor Approvals - Visual Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   SUPERVISOR APPROVALS TAB                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│
│  │ 🛡️ SUP001    │  │ 🛡️ SUP002    │  │ 🛡️ SUP003    │  │ 🛡️ SUP004    ││
│  │ Rajesh Kumar │  │ Lakshmi Iyer │  │ Mohammed Ali │  │ Pradeep Singh││
│  │              │  │              │  │              │  │              ││
│  │ Stores: 12   │  │ Stores: 10   │  │ Stores: 15   │  │ Stores: 8    ││
│  │ ████████ 87.5│  │ █████████92.3│  │ ██████ 78.9% │  │ █████████94.1││
│  │              │  │              │  │              │  │              ││
│  │ Pending: 23  │  │ Pending: 15  │  │ Pending: 42  │  │ Pending: 11  ││
│  │ Unalloc: 145 │  │ Unalloc: 98  │  │ Unalloc: 287 │  │ Unalloc: 76  ││
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘│
│                                                                           │
│  ┌──────────────────────────┐  ┌─────────────────────────────────────┐ │
│  │ 🌊 RE-AUDIT LIFECYCLE    │  │ 📊 PID ALLOCATION                   │ │
│  │                          │  │                                     │ │
│  │ Initially: ██████ 1250   │  │ Rajesh K    ████████ 92.4%         │ │
│  │ Matched:   ████ 875      │  │ Total:2400 Alloc:2255 Unalloc:145  │ │
│  │ Edited:    ██ 245        │  │                                     │ │
│  │ Pending:   █ 130         │  │ Lakshmi I   █████████ 95.3%        │ │
│  │                          │  │ Total:2100 Alloc:2002 Unalloc:98   │ │
│  └──────────────────────────┘  │                                     │ │
│                                 │ Mohammed A  ████████ 91.0%         │ │
│                                 │ Total:3200 Alloc:2913 Unalloc:287  │ │
│                                 └─────────────────────────────────────┘ │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 📋 CONTRA APPROVAL DASHBOARD (Sorted by Value)                      ││
│  │ ─────────────────────────────────────────────────────────────────── ││
│  │                                                                      ││
│  │ Pri│Store│Store Name    │Type  │Items│Quantity│ VALUE (₹)      │ ► ││
│  │────│─────│──────────────│──────│─────│────────│────────────────│───││
│  │HIGH│MP005│Mumbai Central│Short │  52 │  1,480 │ ₹1,56,000      │ ► ││
│  │HIGH│MP001│Chennai Central│Short│  45 │  1,250 │ ₹1,25,000      │ ► ││
│  │HIGH│MP002│Bangalore Hub │Excess│  32 │    890 │ ₹78,500        │ ► ││
│  │MED │MP003│Hyderabad Main│Short │  28 │    650 │ ₹45,000        │ ► ││
│  │                                                                      ││
│  │ ** Click any row to view SKU-level details and approve/reject **    ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## Drill-Down Modal - Universal Template

```
┌─────────────────────────────────────────────────────────────────────────┐
│  📊 [Dynamic Title Based on Context]                                [X] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  🔍 [Search box...]                           [125 Records] [📊 Export] │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Column 1 ▲ │ Column 2 ▼ │ Column 3   │ Column 4   │ Column 5    │  ││
│  │────────────│────────────│────────────│────────────│──────────────│  ││
│  │ Data Row 1                                                        │  ││
│  │ Data Row 2 (hover effect)                                         │  ││
│  │ Data Row 3                                                        │  ││
│  │ Data Row 4                                                        │  ││
│  │ ...                                                               │  ││
│  │ [Scrollable up to 500px height]                                  │  ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│                                              [Close]                      │
└───────────────────────────────────────────────────────────────────────────┘

Features:
✅ Sortable columns (click header)
✅ Real-time search across all columns
✅ Export to Excel button
✅ Record count badge
✅ Responsive scroll
✅ Hover effects on rows
✅ Clean, modern design
```

---

## Color Palette Reference

```
┌────────────────────────────────────────┐
│ PRIMARY (Blue)    #0d6efd  ███████████ │
│ SUCCESS (Green)   #198754  ███████████ │
│ WARNING (Yellow)  #ffc107  ███████████ │
│ DANGER (Red)      #dc3545  ███████████ │
│ INFO (Cyan)       #0dcaf0  ███████████ │
│ SECONDARY (Gray)  #6c757d  ███████████ │
│ LIGHT (BG)        #f8f9fa  ███████████ │
│ WHITE             #ffffff  ███████████ │
└────────────────────────────────────────┘
```

---

## Interactive Elements Legend

```
┌─────────────────────────────────────────────┐
│ 🖱️ Clickable KPI Card                      │
│   → Opens drill-down modal                 │
│                                             │
│ 📊 Clickable Chart Segment                 │
│   → Opens filtered drill-down              │
│                                             │
│ 📋 Clickable Table Row                     │
│   → Opens detailed view modal              │
│                                             │
│ 🔽 Dropdown Filter                         │
│   → Apply filter across dashboard          │
│                                             │
│ 🔄 Refresh Button                          │
│   → Fetch latest data                      │
│                                             │
│ 📤 Export Button                           │
│   → Download Excel/CSV                     │
│                                             │
│ 🔍 Search Box                              │
│   → Filter table rows in real-time         │
│                                             │
│ ▲▼ Sort Indicators                         │
│   → Click to sort ascending/descending     │
└─────────────────────────────────────────────┘
```

---

## Badge & Status Indicators

```
Priority Badges:
┌──────┬──────┬──────┐
│ HIGH │ MED  │ LOW  │
│ RED  │YELLOW│GREEN │
└──────┴──────┴──────┘

Status Badges:
┌───────────┬───────────┬─────────┐
│ Completed │In Progress│ Pending │
│   GREEN   │   BLUE    │ YELLOW  │
└───────────┴───────────┴─────────┘

Performance Badges:
┌──────────┬──────────┬──────────┐
│  ≥90%    │  80-89%  │  <80%    │
│  GREEN   │  YELLOW  │   RED    │
└──────────┴──────────┴──────────┘
```

---

## Progress Bar Variations

```
High Completion (Green):
████████████████████ 95%

Medium Completion (Yellow):
████████████         75%

Low Completion (Red):
██████               45%

Stacked (Allocated/Unallocated):
██████████████▓▓     [Green: 85%, Red: 15%]
```

---

## Typography & Spacing

```
┌─────────────────────────────────────┐
│ H1: Dashboard Title    32px Bold    │
│ H2: Section Headers    24px Bold    │
│ H3: Card Titles        20px Bold    │
│ H4: Subsections        18px SemiBold│
│ Body: Regular Text     14px Regular │
│ Small: Subtitles       12px Regular │
│                                     │
│ Card Padding:          1rem (16px)  │
│ Card Gap:              1rem (16px)  │
│ Section Spacing:       1.5rem       │
└─────────────────────────────────────┘
```

---

## Responsive Breakpoints Visual

```
DESKTOP (≥1200px)
┌──────────────────────────────────────┐
│ [KPI] [KPI] [KPI] [KPI]              │
│ [Chart────────] [Chart──────]        │
│ [Table──────────────────────────]    │
└──────────────────────────────────────┘

TABLET (768-1199px)
┌────────────────────────┐
│ [KPI] [KPI]            │
│ [KPI] [KPI]            │
│ [Chart────────────]    │
│ [Chart────────────]    │
│ [Table→Scroll→→]       │
└────────────────────────┘

MOBILE (<768px)
┌────────────┐
│ [KPI]      │
│ [KPI]      │
│ [KPI]      │
│ [Chart───] │
│ [Accordion]│
│ [Table→→→] │
└────────────┘
```

---

## Animation & Transitions

```
Hover Effects:
- Cards: translateY(-5px) + shadow increase
- Rows: background color change
- Buttons: scale(1.05)

Transitions:
- All: 0.2-0.3s ease
- Modal: fadeIn animation
- Tab Switch: smooth content transition

Loading States:
- Skeleton screens for charts
- Spinner for data refresh
- Progress indicators for exports
```

---

## Accessibility Features

```
✅ Keyboard Navigation
   - Tab through all interactive elements
   - Enter to activate buttons/links
   - Escape to close modals

✅ ARIA Labels
   - Meaningful button labels
   - Table headers properly marked
   - Modal roles defined

✅ Color Contrast
   - WCAG AA compliant
   - Text readable on all backgrounds

✅ Screen Reader Support
   - Alt text for icons
   - Live regions for updates
   - Skip navigation links
```

---

**This visual mock-up describes the complete UI/UX design of the Audit HOD Dashboard. All elements are fully implemented and functional in the React application.**
