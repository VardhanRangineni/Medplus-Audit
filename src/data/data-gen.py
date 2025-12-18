import pandas as pd
import random
from datetime import datetime, timedelta, date, time

# ---------------- SUPERVISORS ----------------
supervisors = {
    "S001": "Aditya Reddy", "S002": "Srinivas Rao", "S003": "Karthik Reddy", "S004": "Praveen Chowdary",
    "S005": "Vamsi Krishna", "S006": "Harsha Varma", "S007": "Sandeep Reddy", "S008": "Naveen Goud",
    "S009": "Rohith Naidu", "S010": "Sai Kumar", "S011": "Manoj Kumar", "S012": "Rakesh Sharma",
    "S013": "Vikram Singh", "S014": "Anand Raj", "S015": "Sathish Reddy"
}

# ---------------- AUDITORS ----------------
auditors = {
    "A011": "Raghu Babu", "A012": "Chaitanya Reddy", "A013": "Lokesh Rao", "A014": "Mahesh Babu",
    "A015": "Bharath Reddy", "A016": "Venkatesh Varma", "A017": "Surya Teja", "A018": "Manoj Naidu",
    "A019": "Arjun Reddy", "A020": "Ravi Kumar", "A021": "Santosh Rao", "A022": "Pavan Kalyan",
    "A023": "Anil Kumar", "A024": "Teja Reddy", "A025": "Rahul Varma", "A026": "Deepak Goud",
    "A027": "Sharath Reddy", "A028": "Yogesh Naidu", "A029": "Vinay Kumar", "A030": "Sashank Reddy",
    "A031": "Ajay Rao", "A032": "Gopi Krishna", "A033": "Sriram Reddy", "A034": "Rajesh Chowdary",
    "A035": "Sudheer Naidu", "A036": "Kiran Kumar", "A037": "Uday Varma", "A038": "Balaji Reddy",
    "A039": "Srikanth Rao", "A040": "Madhav Naidu", "A041": "Charan Reddy", "A042": "Tarun Varma",
    "A043": "Shankar Reddy", "A044": "Jayanth Goud", "A045": "Nikhil Reddy", "A046": "Abhinay Naidu",
    "A047": "Rakesh Kumar", "A048": "Suman Reddy", "A049": "Jagadeesh Rao", "A050": "Gopi Krishna"
}

# ---------------- STORES ----------------
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

# ---------------- DATE RANGE ----------------
DATA_START = datetime(2022, 12, 16)
DATA_END = datetime(2025, 12, 15)
TODAY = date.today()

def rand_date():
    return DATA_START + timedelta(days=random.randint(0, (DATA_END - DATA_START).days))

# ---------- SAFE EXACT SPLITTER ----------
def split_exact(total, parts):
    base = total // parts
    remainder = total % parts
    arr = [base] * parts
    for i in range(remainder):
        arr[i] += 1
    random.shuffle(arr)
    return arr

# ---------- DAY-WISE SUMMARY ----------
def generate_day_wise_summary(start_date, end_date, pids, skus, value):
    days = (end_date - start_date).days + 1
    dates = [start_date + timedelta(days=i) for i in range(days)]

    pid_split = split_exact(pids, days)
    sku_split = split_exact(skus, days)
    val_split = split_exact(value, days)

    summary = {}
    for d, p, s, v in zip(dates, pid_split, sku_split, val_split):
        start_dt = datetime.combine(
            d, time(random.randint(8, 10), random.choice([0, 15, 30, 45]))
        )
        end_dt = start_dt + timedelta(hours=random.uniform(5.5, 8.0))

        summary[d.isoformat()] = {
            "startTime": start_dt.strftime("%H:%M"),
            "endTime": end_dt.strftime("%H:%M"),
            "pids": p,
            "skus": s,
            "value": v
        }
    return summary

rows = []
audit_counter = 1
TOTAL_AUDITS = 876  # Changed from 1000 to be less "round"

# ---------------- DATA GENERATION ----------------
for _ in range(TOTAL_AUDITS):

    audit_id = f"AUD{audit_counter:05d}"
    audit_counter += 1

    store = random.choice(stores)
    store_id = store_ids[store]
    audit_job_type = random.choice(audit_job_types)
    
    # Weighted status to have fewer pending/created
    status = random.choices(audit_statuses, weights=[70, 20, 5, 5], k=1)[0]

    supervisor_id = random.choice(list(supervisors))
    supervisor_name = supervisors[supervisor_id]

    audit_start = rand_date().date()
    audit_end = min(audit_start + timedelta(days=random.randint(2, 5)), TODAY)

    # If status is created or pending, end date might not be set or relevant, but keeping structurally consistant for now
    
    # -------- STORE TOTALS --------
    store_total_pids = random.randint(2000, 6000)
    store_total_skus = store_total_pids * random.randint(3, 6)
    store_audit_value = random.randint(10_000_000, 50_000_000)

    auditor_list = random.sample(list(auditors), random.randint(2, 5))

    pid_split = split_exact(store_total_pids, len(auditor_list))
    sku_split = split_exact(store_total_skus, len(auditor_list))
    value_split = split_exact(store_audit_value, len(auditor_list))

    # Add PendingCount logic roughly
    pending_count_total = 0
    if status in ["Pending", "In-Progress"]:
         pending_count_total = random.randint(5, 50)

    for aud_id, ap, asku, aval in zip(auditor_list, pid_split, sku_split, value_split):

        # ---------- REALISTIC SPEED PROFILE ----------
        speed_profile = random.choices(
            ["fast", "average", "slow"],
            weights=[35, 45, 20],
            k=1
        )[0]

        if speed_profile == "fast":
            avg_time_sku = random.uniform(2.6, 3.5)
            avg_time_pid = random.uniform(6.5, 8.5)
        elif speed_profile == "average":
            avg_time_sku = random.uniform(3.5, 4.8)
            avg_time_pid = random.uniform(8.5, 11.5)
        else:
            avg_time_sku = random.uniform(4.8, 6.2)
            avg_time_pid = random.uniform(11.5, 15.5)

        avg_time_sku = round(avg_time_sku, 2)
        avg_time_pid = round(avg_time_pid, 2)

        # Completed logic
        completed_skus = int(asku * random.uniform(0.9, 1.0)) if status == "Completed" else int(asku * random.uniform(0.1, 0.7))
        completion_percent = round((completed_skus / asku) * 100, 1) if asku > 0 else 0

        # ---------- APPEARED / MATCHED / REVISED LOGIC ----------
        # Logic update per request:
        # AppearedSKU's is much less than CompletedSkus
        # AppearedValue is much less than AuditorAuditedValue
        # Appeared = Matched + Revised
        # Matched is high (most of Appeared)
        
        # 1. Appeared SKUs
        # Much less than CompletedSKUs (e.g., 5% to 15%)
        # Ensure at least some if CompletedSKUs is high enough
        if completed_skus > 10:
             appeared_skus = int(completed_skus * random.uniform(0.05, 0.15))
        else:
             appeared_skus = 0
             
        # 2. Matched SKUs (High portion of Appeared, e.g., 90-98%)
        if appeared_skus > 0:
            match_ratio_skus = random.uniform(0.90, 0.98)
            matched_skus = int(appeared_skus * match_ratio_skus)
            revised_skus = appeared_skus - matched_skus
        else:
            matched_skus = 0
            revised_skus = 0
            
        # 3. Appeared Value
        # Much less than AuditorAuditedValue (e.g., 2% to 8%)
        if aval > 1000:
             appeared_value = int(aval * random.uniform(0.02, 0.08))
        else:
             appeared_value = 0
             
        # 4. Matched/Revised Value
        if appeared_value > 0:
            match_ratio_val = random.uniform(0.90, 0.98) 
            matched_value = int(appeared_value * match_ratio_val)
            revised_value = appeared_value - matched_value
        else:
            matched_value = 0
            revised_value = 0

        # 5. Qty (keeping consistent with value/sku roughly or just generating)
        # AppearedQty should be related to AppearedSKUs. Avg qty/sku ~ 8-25
        if appeared_skus > 0:
            appeared_qty = int(appeared_skus * random.uniform(8, 25))
            # Matched Qty high portion
            match_ratio_qty = random.uniform(0.90, 0.98)
            matched_qty = int(appeared_qty * match_ratio_qty)
            revised_qty = appeared_qty - matched_qty
        else:
            appeared_qty = 0
            matched_qty = 0
            revised_qty = 0
            
        # Pending logic per auditor
        pending_count = 0 
        pending_qty = 0
        pending_val = 0
        
        if pending_count_total > 0:
            pending_count = random.randint(0, min(10, pending_count_total))
            pending_count_total -= pending_count
            if pending_count > 0:
                 pending_qty = pending_count * random.randint(1, 5)
                 pending_val = pending_qty * random.randint(100, 500)

        day_summary = generate_day_wise_summary(
            audit_start, audit_end, ap, asku, aval
        )

        rows.append({
            "AUDIT_ID": audit_id,
            "StoreID": store_id,
            "StoreName": store,
            "AuditJobType": audit_job_type,
            "Status": status,
            "AuditStartDate": audit_start.isoformat(),
            "AuditEndDate": audit_end.isoformat(),

            "SupervisorID": supervisor_id,
            "SupervisorName": supervisor_name,

            "StoreTotalPIDs": store_total_pids,
            "StoreTotalSKUs": store_total_skus,
            "StoreAuditValue": store_audit_value,

            "AuditorID": aud_id,
            "AuditorName": auditors[aud_id],
            "AuditorAllottedPIDs": ap,
            "AuditorAllottedSKUs": asku,
            "AuditorAuditedValue": aval,
            
            "CompletedSKUs": completed_skus,
            "CompletionPercent": completion_percent,

            "AvgTimePerSKU": avg_time_sku,
            "AvgTimePerPID": avg_time_pid,

            "AppearedSKUs": appeared_skus,
            "MatchedSKUs": matched_skus,
            "RevisedSKUs": revised_skus,

            "AppearedQty": appeared_qty,
            "MatchedQty": matched_qty,
            "RevisedQty": revised_qty,
            "AppearedValue": appeared_value,
            "MatchedValue": matched_value,
            "RevisedValue": revised_value,
            
            "PendingCount": pending_count,
            "PendingQty": pending_qty,
            "PendingValue": pending_val,

            "DayWiseSummary": day_summary
        })

# ---------------- EXPORT ----------------
df = pd.DataFrame(rows)
df.to_json("audit_dataset.json", orient="records", indent=2)
