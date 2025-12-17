import pandas as pd
import random
from datetime import datetime, timedelta, date, time

# ---------------- SUPERVISORS ----------------
supervisors = {
    "S001":"Aditya Reddy","S002":"Srinivas Rao","S003":"Karthik Reddy","S004":"Praveen Chowdary",
    "S005":"Vamsi Krishna","S006":"Harsha Varma","S007":"Sandeep Reddy","S008":"Naveen Goud",
    "S009":"Rohith Naidu","S010":"Sai Kumar"
}

# ---------------- AUDITORS ----------------
auditors = {
    "A011": "Raghu Babu","A012": "Chaitanya Reddy","A013": "Lokesh Rao","A014": "Mahesh Babu",
    "A015": "Bharath Reddy","A016": "Venkatesh Varma","A017": "Surya Teja","A018": "Manoj Naidu",
    "A019": "Arjun Reddy","A020": "Ravi Kumar","A021": "Santosh Rao","A022": "Pavan Kalyan",
    "A023": "Anil Kumar","A024": "Teja Reddy","A025": "Rahul Varma","A026": "Deepak Goud",
    "A027": "Sharath Reddy","A028": "Yogesh Naidu","A029": "Vinay Kumar","A030": "Sashank Reddy",
    "A031": "Ajay Rao","A032": "Gopi Krishna","A033": "Sriram Reddy","A034": "Rajesh Chowdary",
    "A035": "Sudheer Naidu","A036": "Kiran Kumar","A037": "Uday Varma","A038": "Balaji Reddy",
    "A039": "Srikanth Rao","A040": "Madhav Naidu","A041": "Charan Reddy","A042": "Tarun Varma",
    "A043": "Shankar Reddy","A044": "Jayanth Goud","A045": "Nikhil Reddy","A046": "Abhinay Naidu",
    "A047": "Rakesh Kumar","A048": "Suman Reddy","A049": "Jagadeesh Rao","A050": "Gopi Krishna"
}

# ---------------- STORES ----------------
stores = [
    "Hyd-Madhapur","Hyd-Kukatpally","Hyd-Ameerpet","Hyd-Begumpet","Hyd-Miyapur",
    "Hyd-Banjara Hills","Hyd-Secunderabad","Hyd-Dilsukhnagar","Hyd-Tarnaka","Hyd-Gachibowli"
]

audit_job_types = ["Full Audit", "Partial Audit", "Select SKUs"]

# ---------------- DATE RANGE ----------------
DATA_START = datetime(2022, 12, 16)
DATA_END   = datetime(2025, 12, 15)
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
TOTAL_AUDITS = 1000

# ---------------- DATA GENERATION ----------------
for _ in range(TOTAL_AUDITS):

    audit_id = f"AUD{audit_counter:05d}"
    audit_counter += 1

    store = random.choice(stores)
    audit_job_type = random.choice(audit_job_types)

    supervisor_id = random.choice(list(supervisors))
    supervisor_name = supervisors[supervisor_id]

    audit_start = rand_date().date()
    audit_end = min(audit_start + timedelta(days=random.randint(2, 5)), TODAY)

    # -------- STORE TOTALS --------
    store_total_pids = random.randint(2000, 6000)
    store_total_skus = store_total_pids * random.randint(3, 6)
    store_audit_value = random.randint(10_000_000, 50_000_000)

    auditor_list = random.sample(list(auditors), random.randint(2, 5))

    pid_split = split_exact(store_total_pids, len(auditor_list))
    sku_split = split_exact(store_total_skus, len(auditor_list))
    value_split = split_exact(store_audit_value, len(auditor_list))

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

        # ---------- SAMPLING / DEVIATION ----------
        appeared_qty = random.randint(80, 220)
        match_ratio = random.uniform(0.85, 0.97)

        matched_qty = int(appeared_qty * match_ratio)
        revised_qty = appeared_qty - matched_qty

        appeared_value = random.randint(25_000, 75_000)
        matched_value = int(appeared_value * match_ratio)
        revised_value = appeared_value - matched_value

        day_summary = generate_day_wise_summary(
            audit_start, audit_end, ap, asku, aval
        )

        rows.append({
            "AUDIT_ID": audit_id,
            "StoreName": store,
            "AuditJobType": audit_job_type,
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

            "AvgTimePerSKU": avg_time_sku,
            "AvgTimePerPID": avg_time_pid,

            "AppearedQty": appeared_qty,
            "MatchedQty": matched_qty,
            "RevisedQty": revised_qty,
            "AppearedValue": appeared_value,
            "MatchedValue": matched_value,
            "RevisedValue": revised_value,

            "DayWiseSummary": day_summary
        })

# ---------------- EXPORT ----------------
df = pd.DataFrame(rows)
df.to_json("audit_dataset.json", orient="records", indent=2)
