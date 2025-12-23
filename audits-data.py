import pandas as pd
import numpy as np
import json
import random
from datetime import datetime, timedelta, date, time

# ---------------- CONFIGURATION ----------------
TOTAL_AUDITS = 876
DATA_START = datetime(2022, 12, 16)
DATA_END = datetime(2025, 12, 15)
TODAY = date.today()
OUTPUT_PATH = "src/data/audit_dataset.json"

# ---------------- DATA PREPARATION ----------------

# Hardcoded Store Data (Exactly 45 stores from South Indian States)
store_data = [
    # --- Telangana (TS) ---
    {"StoreID": "INTSHYD00001", "Store Name": "MEDPLUS MADHAPUR", "State": "TS"},
    {"StoreID": "INTSHYD00002", "Store Name": "MEDPLUS KUKATPALLY", "State": "TS"},
    {"StoreID": "INTSHYD00003", "Store Name": "MEDPLUS BANJARA HILLS", "State": "TS"},
    {"StoreID": "INTSHYD00004", "Store Name": "MEDPLUS GACHIBOWLI", "State": "TS"},
    {"StoreID": "INTSHYD00005", "Store Name": "MEDPLUS JUBILEE HILLS", "State": "TS"},
    {"StoreID": "INTSHYD00006", "Store Name": "MEDPLUS KONDAPUR", "State": "TS"},
    {"StoreID": "INTSHYD00007", "Store Name": "MEDPLUS MIYAPUR", "State": "TS"},
    {"StoreID": "INTSHYD00008", "Store Name": "MEDPLUS SECUNDERABAD", "State": "TS"},
    {"StoreID": "INTSWGL00001", "Store Name": "MEDPLUS WARANGAL CHOWRASTA", "State": "TS"},
    {"StoreID": "INTSNZB00001", "Store Name": "MEDPLUS NIZAMABAD MAIN RD", "State": "TS"},

    # --- Andhra Pradesh (AP) ---
    {"StoreID": "INAPAML00004", "Store Name": "MEDPLUS AMALAPURAM", "State": "AP"},
    {"StoreID": "INAPATP00006", "Store Name": "MEDPLUS TOWER CLOCK CIRCLE ANANTAPUR", "State": "AP"},
    {"StoreID": "INAPBZA00009", "Store Name": "MEDPLUS NTR CIRCLE VIJAYAWADA", "State": "AP"},
    {"StoreID": "INAPBZA00012", "Store Name": "MEDPLUS LABBIPET", "State": "AP"},
    {"StoreID": "INAPCDP00001", "Store Name": "MEDPLUS KADAPA RLY STN ROAD", "State": "AP"},
    {"StoreID": "INAPGNT00015", "Store Name": "MEDPLUS BRODIPET GUNTUR", "State": "AP"},
    {"StoreID": "INAPKND00001", "Store Name": "MEDPLUS KAKINADA MAIN ROAD", "State": "AP"},
    {"StoreID": "INAPKUR00002", "Store Name": "MEDPLUS KURNOOL RS ROAD", "State": "AP"},
    {"StoreID": "INAPNEL00003", "Store Name": "MEDPLUS NELLORE TRUNK ROAD", "State": "AP"},
    {"StoreID": "INAPVSP00001", "Store Name": "MEDPLUS VISAKHAPATNAM MVP", "State": "AP"},

    # --- Karnataka (KA) ---
    {"StoreID": "INKABLR00001", "Store Name": "MEDPLUS INDIRANAGAR BANGALORE", "State": "KA"},
    {"StoreID": "INKABLR00002", "Store Name": "MEDPLUS KORAMANGALA", "State": "KA"},
    {"StoreID": "INKABLR00003", "Store Name": "MEDPLUS WHITEFIELD", "State": "KA"},
    {"StoreID": "INKABLR00004", "Store Name": "MEDPLUS JAYANAGAR", "State": "KA"},
    {"StoreID": "INKABLR00005", "Store Name": "MEDPLUS HSR LAYOUT", "State": "KA"},
    {"StoreID": "INKABLR00006", "Store Name": "MEDPLUS ELECTRONIC CITY", "State": "KA"},
    {"StoreID": "INKAMYS00001", "Store Name": "MEDPLUS MYSORE PALACE ROAD", "State": "KA"},
    {"StoreID": "INKAMNG00001", "Store Name": "MEDPLUS MANGALORE HAMPANKATTA", "State": "KA"},
    {"StoreID": "INKABEL00001", "Store Name": "MEDPLUS BELGAUM COLLEGE RD", "State": "KA"},

    # --- Tamil Nadu (TN) ---
    {"StoreID": "INTNCHN00001", "Store Name": "MEDPLUS ADYAR CHENNAI", "State": "TN"},
    {"StoreID": "INTNCHN00002", "Store Name": "MEDPLUS T NAGAR", "State": "TN"},
    {"StoreID": "INTNCHN00003", "Store Name": "MEDPLUS ANNA NAGAR", "State": "TN"},
    {"StoreID": "INTNCHN00004", "Store Name": "MEDPLUS VELACHERY", "State": "TN"},
    {"StoreID": "INTNCHN00005", "Store Name": "MEDPLUS MYLAPORE", "State": "TN"},
    {"StoreID": "INTNCBE00001", "Store Name": "MEDPLUS COIMBATORE RS PURAM", "State": "TN"},
    {"StoreID": "INTNMDU00001", "Store Name": "MEDPLUS MADURAI SIMMAKKAL", "State": "TN"},
    {"StoreID": "INTNSLM00001", "Store Name": "MEDPLUS SALEM NEW BUS STAND", "State": "TN"},

    # --- Kerala (KL) ---
    {"StoreID": "INKLCOK00001", "Store Name": "MEDPLUS ERNAKULAM MG ROAD", "State": "KL"},
    {"StoreID": "INKLCOK00002", "Store Name": "MEDPLUS EDAPPALLY KOCHI", "State": "KL"},
    {"StoreID": "INKLTRV00001", "Store Name": "MEDPLUS TRIVANDRUM STATUE", "State": "KL"},
    {"StoreID": "INKLTRV00002", "Store Name": "MEDPLUS PATTOM TRIVANDRUM", "State": "KL"},
    {"StoreID": "INKLCLT00001", "Store Name": "MEDPLUS CALICUT LINK ROAD", "State": "KL"},
    {"StoreID": "INKLTCR00001", "Store Name": "MEDPLUS THRISSUR ROUND", "State": "KL"},
    {"StoreID": "INKLKTM00001", "Store Name": "MEDPLUS KOTTAYAM KANJIKUZHY", "State": "KL"},
    {"StoreID": "INKLPLK00001", "Store Name": "MEDPLUS PALAKKAD TOWN", "State": "KL"}
]

store_list = [s["Store Name"] for s in store_data]

# Supervisor Data
supervisors = {f"S{i+1:03d}": name for i, name in enumerate([
    "Aditya Reddy", "Srinivas Rao", "Karthik Reddy", "Praveen Chowdary",
    "Vamsi Krishna", "Harsha Varma", "Sandeep Reddy", "Naveen Goud",
    "Rohith Naidu", "Sai Kumar", "Manoj Kumar", "Rakesh Sharma",
    "Vikram Singh", "Anand Raj", "Sathish Reddy"
])}

# Auditor Data
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

audit_job_types = ["Full Audit", "Partial Audit", "Select SKUs"]
audit_statuses = ["Completed", "In-Progress", "Pending", "Created"]
status_weights = [0.70, 0.20, 0.05, 0.05]

# ---------------- HELPER FUNCTIONS ----------------

def distribute_total(total, weights):
    """Distributes a total into parts based on weights, ensuring the sum matches exactly."""
    counts = np.floor(total * weights).astype(int)
    diff = total - counts.sum()
    indices = np.random.choice(len(weights), size=diff, replace=True)
    for idx in indices:
        counts[idx] += 1
    return counts.tolist()

def get_day_summary(start_date, end_date, pids, skus, value):
    """Generates day-wise breakdown dictionary."""
    days_count = (end_date - start_date).days + 1
    if days_count <= 0: return {}
    
    day_weights = np.random.dirichlet(np.ones(days_count))
    p_dist = distribute_total(pids, day_weights)
    s_dist = distribute_total(skus, day_weights)
    v_dist = distribute_total(value, day_weights)
    
    summary = {}
    for i in range(days_count):
        curr_date = (start_date + timedelta(days=i)).isoformat()
        h_start = np.random.randint(8, 11)
        m_start = np.random.choice([0, 15, 30, 45])
        duration_hrs = 5.5 + (np.random.random() * 2.5)
        start_ts = time(h_start, m_start)
        
        summary[curr_date] = {
            "startTime": start_ts.strftime("%H:%M"),
            "endTime": (datetime.combine(date.min, start_ts) + timedelta(hours=duration_hrs)).strftime("%H:%M"),
            "pids": int(p_dist[i]),
            "skus": int(s_dist[i]),
            "value": int(v_dist[i])
        }
    return summary

# ---------------- MAIN GENERATION ----------------
rows = []
total_days_range = (DATA_END - DATA_START).days

sup_keys = list(supervisors.keys())
aud_keys = list(auditors.keys())

print(f"Generating {TOTAL_AUDITS} audits using 45 stores from TS, TN, KA, AP, KL...")

for i in range(1, TOTAL_AUDITS + 1):
    audit_id = f"AUD{i:05d}"
    store_info = random.choice(store_data)
    store_name = store_info["Store Name"]
    store_id = store_info["StoreID"]
    state = store_info["State"]
    status = np.random.choice(audit_statuses, p=status_weights)
    
    start_dt = (DATA_START + timedelta(days=np.random.randint(0, total_days_range))).date()
    duration = np.random.randint(2, 6)
    end_dt = min(start_dt + timedelta(days=duration), TODAY)
    
    st_pids = np.random.randint(2000, 6001)
    st_skus = st_pids * np.random.randint(3, 7)
    st_val = np.random.randint(10_000_000, 50_000_001)
    
    num_auditors = np.random.randint(2, 6)
    assigned_auditors = random.sample(aud_keys, num_auditors)
    aud_weights = np.random.dirichlet(np.ones(num_auditors))
    pid_splits = distribute_total(st_pids, aud_weights)
    sku_splits = distribute_total(st_skus, aud_weights)
    val_splits = distribute_total(st_val, aud_weights)
    
    sup_id = random.choice(sup_keys)
    pending_total = np.random.randint(5, 51) if status in ["Pending", "In-Progress"] else 0

    for idx, aud_id in enumerate(assigned_auditors):
        ap, asku, aval = pid_splits[idx], sku_splits[idx], val_splits[idx]
        profile = np.random.choice(["fast", "average", "slow"], p=[0.35, 0.45, 0.20])
        
        if profile == "fast":
            t_sku, t_pid = np.random.uniform(2.6, 3.5), np.random.uniform(6.5, 8.5)
        elif profile == "average":
            t_sku, t_pid = np.random.uniform(3.5, 4.8), np.random.uniform(8.5, 11.5)
        else:
            t_sku, t_pid = np.random.uniform(4.8, 6.2), np.random.uniform(11.5, 15.5)

        comp_ratio = np.random.uniform(0.9, 1.0) if status == "Completed" else np.random.uniform(0.1, 0.7)
        c_skus = int(asku * comp_ratio)
        c_perc = round((c_skus / asku * 100), 1) if asku > 0 else 0

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

        p_count = min(np.random.randint(0, 11), pending_total)
        pending_total -= p_count
        p_qty = p_count * np.random.randint(1, 6) if p_count > 0 else 0
        p_val = p_qty * np.random.randint(100, 501)

        rows.append({
            "AUDIT_ID": audit_id,
            "StoreID": store_id,
            "StoreName": store_name,
            "State": state,
            "AuditJobType": random.choice(audit_job_types),
            "Status": status,
            "AuditStartDate": start_dt.isoformat(),
            "AuditEndDate": end_dt.isoformat(),
            "SupervisorID": sup_id,
            "SupervisorName": supervisors[sup_id],
            "StoreTotalPIDs": int(st_pids),
            "StoreTotalSKUs": int(st_skus),
            "StoreAuditValue": int(st_val),
            "AuditorID": aud_id,
            "AuditorName": auditors[aud_id],
            "AuditorAllottedPIDs": int(ap),
            "AuditorAllottedSKUs": int(asku),
            "AuditorAuditedValue": int(aval),
            "CompletedSKUs": int(c_skus),
            "CompletionPercent": c_perc,
            "AvgTimePerSKU": round(t_sku, 2),
            "AvgTimePerPID": round(t_pid, 2),
            "AppearedSKUs": int(app_skus),
            "MatchedSKUs": int(match_skus),
            "RevisedSKUs": int(rev_skus),
            "AppearedQty": int(app_qty),
            "MatchedQty": int(match_qty),
            "RevisedQty": int(rev_qty),
            "AppearedValue": int(app_val),
            "MatchedValue": int(match_val),
            "RevisedValue": int(rev_val),
            "PendingCount": int(p_count),
            "PendingQty": int(p_qty),
            "PendingValue": int(p_val),
            "DayWiseSummary": get_day_summary(start_dt, end_dt, ap, asku, aval)
        })

# ---------------- EXPORT ----------------
print(f"Total records created: {len(rows)}. Saving to {OUTPUT_PATH}...")
with open(OUTPUT_PATH, 'w') as f:
    json.dump(rows, f, indent=2)

print("Generation Complete!")