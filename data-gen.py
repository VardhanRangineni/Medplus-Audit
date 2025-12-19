import pandas as pd
import numpy as np
import json
import random
from datetime import datetime, timedelta, date, time
import os

# ---------------- CONFIGURATION ----------------
TOTAL_AUDITS = 876
DATA_START = datetime(2022, 12, 16)
DATA_END = datetime(2025, 12, 15)
TODAY = date.today()
OUTPUT_PATH = "src/data/audit_dataset.json"

# Ensure directory exists
os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

# ---------------- ENTITY DATA ----------------
supervisors = {f"S{i+1:03d}": name for i, name in enumerate([
    "Aditya Reddy", "Srinivas Rao", "Karthik Reddy", "Praveen Chowdary",
    "Vamsi Krishna", "Harsha Varma", "Sandeep Reddy", "Naveen Goud",
    "Rohith Naidu", "Sai Kumar", "Manoj Kumar", "Rakesh Sharma",
    "Vikram Singh", "Anand Raj", "Sathish Reddy"
])}

auditors = {f"A{i+11:03d}": name for i, name in enumerate([
    "Raghu Babu", "Chaitanya Reddy", "Lokesh Rao", "Mahesh Babu", "Bharath Reddy",
    "Venkatesh Varma", "Surya Teja", "Manoj Naidu", "Arjun Reddy", "Ravi Kumar",
    "Santosh Rao", "Pavan Kalyan", "Anil Kumar", "Teja Reddy", "Rahul Varma",
    "Deepak Goud", "Sharath Reddy", "Yogesh Naidu", "Vinay Kumar", "Sashank Reddy",
    "Ajay Rao", "Gopi Krishna", "Sriram Reddy", "Rajesh Chowdary", "Sudheer Naidu",
    "Kiran Kumar", "Uday Varma", "Balaji Reddy", "Srikanth Rao", "Madhav Naidu",
    "Charan Reddy", "Tarun Varma", "Shankar Reddy", "Jayanth Goud", "Nikhil Reddy",
    "Abhinay Naidu", "Rakesh Kumar", "Suman Reddy", "Jagadeesh Rao", "Gopi Krishna"
])}

stores = [
    "Hyd-Madhapur", "Hyd-Kukatpally", "Hyd-Ameerpet", "Hyd-Begumpet", "Hyd-Miyapur",
    "Hyd-Banjara Hills", "Hyd-Secunderabad", "Hyd-Dilsukhnagar", "Hyd-Tarnaka", "Hyd-Gachibowli",
    "Hyd-Jubilee Hills", "Hyd-Hitech City", "Hyd-Kondapur", "Hyd-Manikonda", "Hyd-Mehdipatnam",
    "Hyd-Charminar", "Hyd-LB Nagar", "Hyd-Uppal", "Hyd-Nagole", "Hyd-Ramanthapur",
    "Hyd-Amberpet", "Hyd-Musheerabad", "Hyd-Nampally", "Hyd-Abids", "Hyd-Koti",
    "Hyd-Malakpet", "Hyd-Saidabad", "Hyd-Santosh Nagar", "Hyd-Chandrayangutta", "Hyd-Falaknuma"
]
store_ids = {store: f"MP{i+1:04d}" for i, store in enumerate(stores)}

audit_job_types = ["Full Audit", "Partial Audit", "Select SKUs"]
audit_statuses = ["Completed", "In-Progress", "Pending", "Created"]
status_weights = [0.70, 0.20, 0.05, 0.05]

# ---------------- HELPER FUNCTIONS ----------------

def distribute_total(total, weights):
    """Distributes a total into parts based on weights, ensuring the sum matches exactly."""
    counts = np.floor(total * weights).astype(int)
    diff = total - counts.sum()
    # Add remainder to random indices
    indices = np.random.choice(len(weights), size=diff, replace=True)
    for idx in indices:
        counts[idx] += 1
    return counts.tolist()

def get_day_summary(start_date, end_date, pids, skus, value):
    """Generates day-wise breakdown dictionary."""
    days_count = (end_date - start_date).days + 1
    if days_count <= 0: return {}
    
    # Generate weights for day distribution
    day_weights = np.random.dirichlet(np.ones(days_count))
    
    p_dist = distribute_total(pids, day_weights)
    s_dist = distribute_total(skus, day_weights)
    v_dist = distribute_total(value, day_weights)
    
    summary = {}
    for i in range(days_count):
        curr_date = (start_date + timedelta(days=i)).isoformat()
        h_start = np.random.randint(8, 11)
        m_start = np.random.choice([0, 15, 30, 45])
        
        # Duration between 5.5 and 8 hours
        duration_hrs = 5.5 + (np.random.random() * 2.5)
        start_ts = time(h_start, m_start)
        
        summary[curr_date] = {
            "startTime": start_ts.strftime("%H:%M"),
            "endTime": (datetime.combine(date.min, start_ts) + timedelta(hours=duration_hrs)).strftime("%H:%M"),
            "pids": p_dist[i],
            "skus": s_dist[i],
            "value": v_dist[i]
        }
    return summary

# ---------------- MAIN GENERATION ----------------
rows = []
total_days_range = (DATA_END - DATA_START).days

# Bulk generate supervisor and auditor keys to speed up random access
sup_keys = list(supervisors.keys())
aud_keys = list(auditors.keys())

print(f"Generating {TOTAL_AUDITS} audits...")

for i in range(1, TOTAL_AUDITS + 1):
    audit_id = f"AUD{i:05d}"
    store = random.choice(stores)
    status = np.random.choice(audit_statuses, p=status_weights)
    
    # Dates
    start_dt = (DATA_START + timedelta(days=np.random.randint(0, total_days_range))).date()
    duration = np.random.randint(2, 6)
    end_dt = min(start_dt + timedelta(days=duration), TODAY)
    
    # Store Metrics
    st_pids = np.random.randint(2000, 6001)
    st_skus = st_pids * np.random.randint(3, 7)
    st_val = np.random.randint(10_000_000, 50_000_001)
    
    # Auditors for this audit
    num_auditors = np.random.randint(2, 6)
    assigned_auditors = random.sample(aud_keys, num_auditors)
    
    # Distribute store totals among auditors
    aud_weights = np.random.dirichlet(np.ones(num_auditors))
    pid_splits = distribute_total(st_pids, aud_weights)
    sku_splits = distribute_total(st_skus, aud_weights)
    val_splits = distribute_total(st_val, aud_weights)
    
    sup_id = random.choice(sup_keys)
    
    # Pending context
    pending_total = np.random.randint(5, 51) if status in ["Pending", "In-Progress"] else 0

    for idx, aud_id in enumerate(assigned_auditors):
        ap, asku, aval = pid_splits[idx], sku_splits[idx], val_splits[idx]
        
        # Speed Profile
        profile = np.random.choice(["fast", "average", "slow"], p=[0.35, 0.45, 0.20])
        if profile == "fast":
            t_sku, t_pid = np.random.uniform(2.6, 3.5), np.random.uniform(6.5, 8.5)
        elif profile == "average":
            t_sku, t_pid = np.random.uniform(3.5, 4.8), np.random.uniform(8.5, 11.5)
        else:
            t_sku, t_pid = np.random.uniform(4.8, 6.2), np.random.uniform(11.5, 15.5)

        # Completion
        comp_ratio = np.random.uniform(0.9, 1.0) if status == "Completed" else np.random.uniform(0.1, 0.7)
        c_skus = int(asku * comp_ratio)
        c_perc = round((c_skus / asku * 100), 1) if asku > 0 else 0

        # Accuracy Metrics (Appeared/Matched/Revised)
        app_skus = int(c_skus * np.random.uniform(0.05, 0.15)) if c_skus > 10 else 0
        m_ratio = np.random.uniform(0.90, 0.98)
        
        match_skus = int(app_skus * m_ratio)
        rev_skus = app_skus - match_skus
        
        app_val = int(aval * np.random.uniform(0.02, 0.08)) if aval > 1000 else 0
        match_val = int(app_val * m_ratio)
        rev_val = app_val - match_val
        
        app_qty = int(app_skus * np.random.uniform(8, 25))
        match_qty = int(app_qty * m_ratio)
        rev_qty = app_qty - match_qty

        # Pending calculation
        p_count = min(np.random.randint(0, 11), pending_total)
        pending_total -= p_count
        p_qty = p_count * np.random.randint(1, 6) if p_count > 0 else 0
        p_val = p_qty * np.random.randint(100, 501)

        rows.append({
            "AUDIT_ID": audit_id,
            "StoreID": store_ids[store],
            "StoreName": store,
            "AuditJobType": random.choice(audit_job_types),
            "Status": status,
            "AuditStartDate": start_dt.isoformat(),
            "AuditEndDate": end_dt.isoformat(),
            "SupervisorID": sup_id,
            "SupervisorName": supervisors[sup_id],
            "StoreTotalPIDs": st_pids,
            "StoreTotalSKUs": st_skus,
            "StoreAuditValue": st_val,
            "AuditorID": aud_id,
            "AuditorName": auditors[aud_id],
            "AuditorAllottedPIDs": ap,
            "AuditorAllottedSKUs": asku,
            "AuditorAuditedValue": aval,
            "CompletedSKUs": c_skus,
            "CompletionPercent": c_perc,
            "AvgTimePerSKU": round(t_sku, 2),
            "AvgTimePerPID": round(t_pid, 2),
            "AppearedSKUs": app_skus,
            "MatchedSKUs": match_skus,
            "RevisedSKUs": rev_skus,
            "AppearedQty": app_qty,
            "MatchedQty": match_qty,
            "RevisedQty": rev_qty,
            "AppearedValue": app_val,
            "MatchedValue": match_val,
            "RevisedValue": rev_val,
            "PendingCount": p_count,
            "PendingQty": p_qty,
            "PendingValue": p_val,
            "DayWiseSummary": get_day_summary(start_dt, end_dt, ap, asku, aval)
        })

# ---------------- EXPORT ----------------
print(f"Total records created: {len(rows)}. Saving to {OUTPUT_PATH}...")
with open(OUTPUT_PATH, 'w') as f:
    json.dump(rows, f, indent=2)

print("Done!")