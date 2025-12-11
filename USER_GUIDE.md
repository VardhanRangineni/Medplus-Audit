# 👤 User Guide - Audit HOD Dashboard

## Welcome, Audit Head of Department!

This guide will help you navigate and utilize the Audit HOD Dashboard effectively to monitor audit operations, track performance, and make data-driven decisions.

---

## 🎯 Quick Navigation

- [Getting Started](#getting-started)
- [Understanding the Dashboard](#understanding-the-dashboard)
- [Using Filters](#using-filters)
- [Tab 1: Store Coverage](#tab-1-store-coverage--inventory)
- [Tab 2: Live Audits](#tab-2-live-audit-schedule)
- [Tab 3: Auditor Performance](#tab-3-auditor-performance)
- [Tab 4: Supervisor Approvals](#tab-4-supervisor-approvals)
- [Exporting Data](#exporting-data)
- [Tips & Best Practices](#tips--best-practices)

---

## Getting Started

### Accessing the Dashboard

1. **Open your web browser** (Chrome, Firefox, or Edge recommended)
2. **Navigate to the dashboard URL** provided by your IT team
3. **Log in** with your credentials
4. The dashboard will load showing the Store Coverage tab by default

### Dashboard Overview

The dashboard is divided into:
- **Global Header** - Filters and controls (always visible)
- **Tab Navigation** - Four main sections
- **Content Area** - Data, charts, and tables

---

## Understanding the Dashboard

### What You'll See

```
Top Section (Global Header):
├─ Filter Controls (Financial Year, State, Store, etc.)
├─ Last Refreshed Timestamp
├─ Refresh Button
└─ Export Availability Notice

Middle Section (Tab Navigation):
├─ Store Coverage & Inventory
├─ Live Audit Schedule & Status
├─ Auditor Performance & Productivity
└─ Supervisor Approvals & Re-audit

Bottom Section (Content Area):
└─ KPI cards, charts, tables specific to selected tab
```

---

## Using Filters

### Applying Filters

**Step 1: Select Financial Year** (Required)
- Dropdown at top left
- Default: Current financial year
- This filter is mandatory

**Step 2: Choose Optional Filters**
- **State:** Filter by geographical location
- **Store:** Filter specific stores (updates based on State)
- **Audit Job Type:** Full or Partial audits
- **Audit Process Type:** Product or Batch based
- **Audit Status:** Created, In Progress, Pending, Completed

**Step 3: View Results**
- Filters apply automatically when you change them
- All tabs update based on your filter selections
- The "Last Refreshed" timestamp updates

### Refreshing Data

**Manual Refresh:**
- Click the **"Refresh Now"** button in the top right
- Data will update across all tabs
- Timestamp shows when data was last updated

**Auto-Refresh:**
- Dashboard automatically refreshes every 2 minutes
- No action needed on your part

---

## Tab 1: Store Coverage & Inventory

### What This Tab Shows

This tab gives you an overview of:
- How many stores have been audited
- When stores were last audited
- Inventory summary across stores
- Deviations found during audits

### Key Metrics

**Total Active Stores**
- Count of all operational stores
- Click to see complete store list

**Covered Stores**
- Number of stores audited (with percentage)
- Shows audit coverage rate
- Click to see list of covered stores with last audit dates

**Uncovered Stores**
- Stores not yet audited (with percentage)
- Highlighted in red for attention
- Click to see which stores need auditing

### Store Recency Chart

**What it shows:** How recently stores were audited

**Four Time Buckets:**
- **0-3 Months** (Green): Recently audited - good
- **3-6 Months** (Yellow): Moderate - acceptable
- **6-9 Months** (Orange): Aging - needs attention
- **9-12 Months** (Red): Overdue - critical

**How to use:**
- Click any bar to see specific stores in that time range
- Prioritize stores in 9-12 month range for immediate audit

### Inventory Summary

**Three Key Numbers:**
1. **Total SKUs** - How many unique products tracked
2. **Total Quantity** - Total units in inventory
3. **Total Inventory Value** - Total worth (in Rupees)

These are aggregate numbers across all covered stores.

### Deviation Breakdown

**What are deviations?**
Differences between system records and physical counts.

**Types:**
- **Invoiced** - Items received but not in system
- **Contra Short** - Physical less than system (shortage)
- **Contra Excess** - Physical more than system (excess)
- **Excess Submitted** - Reported excess items

**Private vs Non-Private:**
- Private: Store brand products
- Non-Private: Other brands

**How to use:**
- **Pie Chart:** Visual distribution of deviations by value
- **List View:** See specific counts and values
- **Click any item** to see SKU-level details

### Common Actions

✅ **To find uncovered stores:**
1. Click "Uncovered Stores" KPI card
2. Review the list
3. Export to Excel to share with team
4. Prioritize high-value stores

✅ **To check aging audits:**
1. Look at Recency Chart
2. Click red/orange bars for overdue stores
3. Export list for follow-up

✅ **To investigate deviations:**
1. Click any deviation type in list
2. See SKU-level details
3. Sort by value to find high-impact items
4. Export for detailed analysis

---

## Tab 2: Live Audit Schedule

### What This Tab Shows

Real-time status of ongoing audits:
- Which audits are running
- Progress of each audit
- Auditor assignments
- Completion rates

### Audit Workflow Tiles

**Four Status Categories:**

1. **Created** (Gray)
   - Audits set up but not started
   - Click to see which stores

2. **In Progress** (Blue)
   - Audits currently running
   - Most important for monitoring
   - Click to see active audits

3. **Pending** (Yellow)
   - Audits paused or awaiting action
   - May need intervention
   - Click to see what's stuck

4. **Completed** (Green)
   - Finalized audits
   - Click to see recent completions

### Audit Table

**Columns Explained:**

- **Store ID/Name:** Which store is being audited
- **Supervisor:** Who's overseeing the audit
- **Auditors:** How many and who (badge shows count)
- **Start Date:** When audit began
- **Progress Bar:** Visual completion status
  - Green (≥80%): On track
  - Yellow (60-79%): Moderate progress
  - Red (<60%): Slow progress - may need attention

### Live Audit Details

**To View Auditor Breakdown:**
1. Click any row in the audit table
2. Modal opens showing:
   - Overall store progress
   - Each auditor's assigned SKUs
   - Completion rate per auditor
   - Value covered by each auditor
3. Identify bottlenecks or slow auditors

### Common Actions

✅ **To monitor daily progress:**
1. Check "In Progress" tile count
2. Review progress bars in table
3. Click stores with red progress bars
4. Follow up with supervisors on slow audits

✅ **To balance workload:**
1. Click any in-progress audit
2. See auditor breakdown
3. Check if one auditor is behind
4. Communicate with supervisor to redistribute

✅ **To track completion:**
1. Monitor "Completed" tile number
2. Compare to daily/weekly targets
3. Export completed audits for reporting

---

## Tab 3: Auditor Performance

### What This Tab Shows

Individual auditor productivity and quality metrics:
- Speed of work
- Accuracy of counts
- Quality of data entry

### Performance Cards

**Three Key Metrics:**

1. **Average Time per SKU**
   - How long auditors take per item
   - Lower is better (more efficient)
   - Benchmark: <5 minutes is good

2. **Match Rate**
   - Accuracy when re-audited
   - Higher is better (more accurate)
   - Benchmark: ≥93% is good

3. **Edit Rate**
   - How often entries need correction
   - Lower is better (better quality)
   - Benchmark: ≤10% is good

### Productivity Table

**Understanding the Metrics:**

- **Allotted SKUs:** Total work assigned
- **Completed SKUs:** Work finished
- **Completion %:** Progress rate (with color-coded bar)
- **Avg Time/SKU:** Personal efficiency
- **Match Rate %:** Personal accuracy
- **Edit Rate %:** Personal quality

**Color Coding:**
- **Green badges:** Meeting/exceeding standards
- **Yellow badges:** Borderline performance
- **Red badges:** Below standards - needs attention

### PID Workload View

**To See Auditor Details:**
1. Click any auditor row
2. Modal shows all assigned PIDs (products/batches)
3. See:
   - Which PIDs are complete
   - Which are in progress
   - Which are delayed
   - Time spent on each

**Bottleneck Indicators:**
- Red "Delayed" badges show problem areas
- High deviation counts may indicate difficult products
- Zero progress on old assignments needs follow-up

### Performance Insights

**Top Performers (Green Box):**
- Your best auditors
- Consider for training others
- Suitable for complex audits

**Needs Attention (Yellow Box):**
- Auditors struggling
- May need training or support
- Monitor closely or reassign work

### Common Actions

✅ **To identify training needs:**
1. Look at "Needs Attention" box
2. Click auditor to see PID details
3. Check if specific product types are problematic
4. Arrange targeted training

✅ **To reward high performers:**
1. Review "Top Performers" box
2. Click to see their detailed metrics
3. Export data for HR/management review
4. Consider for bonuses or recognition

✅ **To investigate low productivity:**
1. Sort table by Completion %
2. Click low-performing auditor
3. Check PID workload for patterns
4. Identify if it's speed, accuracy, or workload issue

✅ **To balance team performance:**
1. Compare Avg Time/SKU across auditors
2. Identify outliers (very fast or very slow)
3. Investigate why (training, shortcuts, thoroughness)
4. Standardize best practices

---

## Tab 4: Supervisor Approvals

### What This Tab Shows

Supervisor workload and critical approval items:
- Supervisor performance
- Re-audit results
- Contra items needing approval (critical)
- PID allocation status

### Supervisor Cards

**Each Card Shows:**
- Supervisor name and ID
- Number of stores managed
- Overall audit completion rate (progress bar)
- Pending approvals count (yellow badge)
- Unallocated PIDs count (red badge)

**Click any card to see:**
- List of managed stores
- Individual store completion rates
- Recent activity

### Re-audit Waterfall

**Understanding the Flow:**

1. **Initially Appeared:** All deviations found
2. **Matched:** Confirmed as correct (no action)
3. **Edited:** Supervisor corrected the data
4. **Pending:** Awaiting supervisor decision

**What to Watch:**
- High "Pending" count means supervisors need to act
- High "Edited" count may indicate auditor quality issues
- Low "Matched" rate suggests systemic problems

### PID Allocation

**What it Shows:**
- How well supervisors are distributing work
- Green bar: Allocated PIDs
- Red bar: Unallocated PIDs

**Red Flags:**
- Large red sections mean work not distributed
- Can cause audit delays
- Supervisor may need support

### Contra Approval Dashboard (CRITICAL)

**What are Contras?**
- **Contra Short:** Physical stock is less (shortage)
- **Contra Excess:** Physical stock is more (overage)

**Why Important?**
- Financial impact (shown in Value column)
- Requires supervisor approval
- Affects inventory accuracy

**Priority System:**
- **Red (HIGH):** Value >₹1,00,000 - urgent
- **Yellow (MEDIUM):** Value ₹50,000-₹1,00,000
- **Green (LOW):** Value <₹50,000

**How the Table Works:**
- **Sorted by Value** (highest first) - so you see biggest issues first
- Shows both **Quantity** and **Value** for each contra
- Click any row to see SKU-level breakdown

### Common Actions

✅ **To expedite high-value approvals:**
1. Look at Contra Approval table
2. Focus on red priority rows
3. Click row to see details
4. Contact supervisor to fast-track approval

✅ **To monitor supervisor workload:**
1. Review supervisor cards
2. Check pending approvals count
3. Check unallocated PIDs count
4. Redistribute work if one supervisor is overloaded

✅ **To reduce pending re-audits:**
1. Look at Re-audit Waterfall
2. Check "Pending" count
3. Export pending items list
4. Send reminders to supervisors

✅ **To improve PID allocation:**
1. Review PID Allocation section
2. Identify supervisors with high unallocated %
3. Investigate why (capacity, training, system issues)
4. Take corrective action

---

## Exporting Data

### How to Export

**From Any Drill-Down Modal:**

1. Click a metric, chart, or table row to open details
2. In the modal, you'll see **"Export to Excel"** button (green)
3. Click the button
4. File downloads as CSV (opens in Excel)
5. Filename includes date stamp

**What Gets Exported:**
- All visible columns
- All rows (not just what you see on screen)
- Filtered data (based on search if you used it)

### Common Export Scenarios

✅ **Weekly Coverage Report:**
1. Tab 1: Click "Covered Stores"
2. Export list with last audit dates
3. Use for weekly management meeting

✅ **Auditor Performance Review:**
1. Tab 3: Export productivity table
2. Use for quarterly performance reviews
3. Share with HR/management

✅ **High-Value Contra Report:**
1. Tab 4: Contra Approval table
2. Filter by HIGH priority
3. Export for finance team review

✅ **Daily Progress Report:**
1. Tab 2: Click "In Progress"
2. Export current status
3. Share with operations team

---

## Tips & Best Practices

### Daily Routine (Recommended)

**Morning Check (5 minutes):**
1. Open dashboard, check "Last Refreshed" time
2. Tab 2: Review "In Progress" count and progress bars
3. Tab 4: Check high-priority contra items
4. Flag any red items for follow-up

**Mid-Day Review (10 minutes):**
1. Tab 1: Check if any new stores became overdue
2. Tab 3: Review auditor completion rates
3. Follow up on slow progress

**End of Day (10 minutes):**
1. Tab 2: Check completed vs. target
2. Export daily progress for records
3. Plan next day priorities

### Weekly Activities

**Monday:**
- Review previous week's completions
- Set current week targets
- Assign overdue stores to supervisors

**Wednesday:**
- Mid-week progress check
- Adjust resources if behind
- Address any bottlenecks

**Friday:**
- Week-end review
- Export performance data
- Prepare reports for management

### Monthly Reviews

**First Week of Month:**
1. Tab 1: Full coverage analysis
2. Identify chronic problem stores
3. Export aging audit report

**Mid-Month:**
1. Tab 3: Detailed auditor performance review
2. Plan training for low performers
3. Recognize high performers

**End of Month:**
1. Comprehensive data export for all metrics
2. Management report preparation
3. Set next month targets

### Troubleshooting

**Issue: Data looks old**
- Solution: Click "Refresh Now" button
- Check "Last Refreshed" timestamp

**Issue: No data showing**
- Solution: Check if filters are too restrictive
- Reset filters to "All" and try again

**Issue: Can't export**
- Solution: Ensure pop-ups are not blocked
- Try different browser if issue persists

**Issue: Progress bars not updating**
- Solution: This is real-time data
- Refresh the page or wait for auto-refresh

---

## Understanding Visual Cues

### Color Meanings

**Green:**
- ✅ Good performance
- ✅ On track
- ✅ Completed
- ✅ High match rate

**Yellow:**
- ⚠️ Moderate performance
- ⚠️ Needs attention
- ⚠️ Pending action
- ⚠️ Borderline metrics

**Red:**
- ❌ Low performance
- ❌ Critical issue
- ❌ Overdue
- ❌ Below standards

**Blue:**
- ℹ️ In progress
- ℹ️ Active
- ℹ️ Information

**Gray:**
- ⏸️ Not started
- ⏸️ Inactive
- ⏸️ Neutral

### Icons Reference

- 🏪 Stores
- 👤 Auditors/Users
- 🛡️ Supervisors
- 📊 Charts/Analytics
- ⏱️ Time metrics
- 🎯 Accuracy metrics
- ✏️ Edit/Quality metrics
- 📋 Lists/Tables
- 🔍 Search
- 📤 Export
- 🔄 Refresh

---

## Keyboard Shortcuts

- **Tab:** Navigate between elements
- **Enter:** Activate button/link
- **Escape:** Close open modal
- **Ctrl+F:** Browser search (works in tables)

---

## Support & Help

**For Technical Issues:**
- Clear browser cache and reload
- Try different browser (Chrome recommended)
- Contact IT support team

**For Data Questions:**
- Verify filters are set correctly
- Check "Last Refreshed" time
- Contact data team for backend issues

**For Process Questions:**
- Refer to this user guide
- Contact audit process team
- Consult functional specification document

---

## Glossary

**SKU:** Stock Keeping Unit (unique product identifier)  
**PID:** Product ID or Batch ID  
**Contra Short:** Physical inventory less than system  
**Contra Excess:** Physical inventory more than system  
**Match Rate:** Percentage of accurate audit counts  
**Edit Rate:** Frequency of data corrections  
**HOD:** Head of Department (you!)  
**KPI:** Key Performance Indicator  
**Re-audit:** Second audit to verify accuracy

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────┐
│             QUICK REFERENCE CARD                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Daily Priority Checks:                             │
│ ✓ In-Progress Audits (Tab 2)                      │
│ ✓ High-Priority Contras (Tab 4)                   │
│ ✓ Overdue Stores (Tab 1)                          │
│                                                     │
│ Weekly Reviews:                                    │
│ ✓ Coverage Rate (Tab 1)                           │
│ ✓ Auditor Performance (Tab 3)                     │
│ ✓ Pending Approvals (Tab 4)                       │
│                                                     │
│ Red Flags to Watch:                                │
│ 🚩 Red progress bars (slow audits)                │
│ 🚩 High unallocated PIDs (work stuck)             │
│ 🚩 High-value contras (financial impact)          │
│ 🚩 Low match rates (quality issues)               │
│                                                     │
│ Quick Actions:                                     │
│ 👉 Click any metric for details                   │
│ 👉 Use filters to focus view                      │
│ 👉 Export for sharing/reporting                   │
│ 👉 Refresh for latest data                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

**Remember:** This dashboard is your command center for audit operations. Check it daily, use filters to focus on issues, and take proactive action on red-flagged items. Your oversight directly improves audit quality and efficiency!

**Happy Monitoring! 📊**
