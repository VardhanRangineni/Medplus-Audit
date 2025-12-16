import pandas as pd
import random
from datetime import datetime, timedelta, date

# ---------------- SUPERVISORS ----------------
supervisors = {
    "S001": "Aditya Reddy", "S002": "Srinivas Rao", "S003": "Karthik Reddy",
    "S004": "Praveen Chowdary", "S005": "Vamsi Krishna", "S006": "Harsha Varma",
    "S007": "Sandeep Reddy", "S008": "Naveen Goud", "S009": "Rohith Naidu",
    "S010": "Sai Kumar"
}

# ---------------- AUDITORS ----------------
auditors = {
    "A011": "Raghu Babu", "A012": "Chaitanya Reddy", "A013": "Lokesh Rao",
    "A014": "Mahesh Babu", "A015": "Bharath Reddy", "A016": "Venkatesh Varma",
    "A017": "Surya Teja", "A018": "Manoj Naidu", "A019": "Arjun Reddy",
    "A020": "Ravi Kumar", "A021": "Santosh Rao", "A022": "Pavan Kalyan",
    "A023": "Anil Kumar", "A024": "Teja Reddy", "A025": "Rahul Varma",
    "A026": "Deepak Goud", "A027": "Sharath Reddy", "A028": "Yogesh Naidu",
    "A029": "Vinay Kumar", "A030": "Sashank Reddy", "A031": "Ajay Rao",
    "A032": "Gopi Krishna", "A033": "Sriram Reddy", "A034": "Rajesh Chowdary",
    "A035": "Sudheer Naidu", "A036": "Kiran Kumar", "A037": "Uday Varma",
    "A038": "Balaji Reddy", "A039": "Srikanth Rao", "A040": "Madhav Naidu",
    "A041": "Charan Reddy", "A042": "Tarun Varma", "A043": "Shankar Reddy",
    "A044": "Jayanth Goud", "A045": "Nikhil Reddy", "A046": "Abhinay Naidu",
    "A047": "Rakesh Kumar", "A048": "Suman Reddy", "A049": "Jagadeesh Rao",
    "A050": "Gopi Krishna"
}

# ---------------- STORES ----------------
stores = [
    "Hyd-Madhapur","Hyd-Kukatpally","Hyd-Ameerpet","Hyd-Begumpet","Hyd-Miyapur",
    "Hyd-Banjara Hills","Hyd-Secunderabad","Hyd-Dilsukhnagar","Hyd-Tarnaka","Hyd-Gachibowli",
    "Vizag-Dwaraka Nagar","Vizag-Gajuwaka","Vizag-MVP Colony","Vizag-Beach Road","Vizag-Seethammadhara",
    "Vijayawada-Benz Circle","Vijayawada-Governorpet","Vijayawada-PMG Circle","Vijayawada-Gunadala","Vijayawada-Kanuru",
    "Guntur-Brodipet","Guntur-Lodge Center","Guntur-Arundelpet","Guntur-Srinagar","Guntur-Nallapadu",
    "Nellore-AC Center","Nellore-Muthukur Road","Nellore-Magalapuram","Nellore-Kovur Road","Nellore-Balaji Nagar",
    "Tirupati-RC Road","Tirupati-Leela Mahal","Tirupati-MR Palli","Tirupati-Korramenugunta","Tirupati-Air Bypass",
    "Anantapur-Town","Anantapur-Clock Tower","Anantapur-Kamalapuram","Anantapur-Ramamurthy Circle","Anantapur-Saptagiri Circle",
    "Kurnool-Main Road","Kurnool-Adoni Road","Kurnool-Budhawarpet","Kurnool-Camp Road","Kurnool-Kallur Road",
    "Ongole-Gandhi Road","Ongole-Bus Stand","Ongole-Ring Road","Ongole-Madanur Road","Ongole-Kothapatnam Road"
]

audit_job_types = ["Full Audit", "Partial Audit", "Select SKUs"]

# ---------------- DATE RANGE ----------------
DATA_START = datetime(2022, 12, 16)
DATA_END = datetime(2025, 12, 15)
TODAY = date.today()

def rand_date():
    return DATA_START + timedelta(days=random.randint(0, (DATA_END - DATA_START).days))

rows = []
audit_counter = 1
TOTAL_AUDITS = 1000

# ---------------- DATA GENERATION ----------------
for _ in range(TOTAL_AUDITS):

    audit_id = f"AUD{audit_counter:05d}"
    audit_counter += 1

    supervisor_id = random.choice(list(supervisors))
    supervisor_name = supervisors[supervisor_id]
    store = random.choice(stores)

    # ✅ one job type per audit id
    audit_job_type = random.choice(audit_job_types)

    audit_start = rand_date().date()
    audit_end = min(audit_start + timedelta(days=random.randint(0, 5)), TODAY)

    total_pids = random.randint(100, 500)
    total_skus = total_pids * random.randint(2, 6)

    auditor_list = random.sample(list(auditors), random.randint(2, 5))
    pids_left = total_pids

    for idx, aud_id in enumerate(auditor_list):

        remaining = len(auditor_list) - idx
        allotted_pids = pids_left if remaining == 1 else random.randint(1, pids_left - (remaining - 1))
        allotted_skus = allotted_pids * random.randint(2, 6)
        pids_left -= allotted_pids

        # ---------- AVG TIME PER SKU ----------
        speed_profile = random.choices(
            ["fast", "average", "slow"],
            weights=[55, 30, 15],
            k=1
        )[0]

        if speed_profile == "fast":
            avg_time_sku = random.uniform(3.2, 4.4)
        elif speed_profile == "average":
            avg_time_sku = random.uniform(4.4, 5.2)
        else:
            avg_time_sku = random.uniform(5.2, 6.8)

        # ---------- MATCH RATE LOGIC ----------
        appeared_count = random.randint(15, 50)

        high_accuracy = random.random() < 0.30
        if high_accuracy:
            match_ratio = random.uniform(0.91, 0.97)
        else:
            match_ratio = random.uniform(0.80, 0.90)

        matched_count = int(appeared_count * match_ratio)
        revised_count = appeared_count - matched_count

        appeared_qty = random.randint(30, 150)
        unit_price = random.randint(100, 800)

        matched_qty = int(appeared_qty * match_ratio)
        revised_qty = appeared_qty - matched_qty

        appeared_value = appeared_qty * unit_price
        matched_value = matched_qty * unit_price
        revised_value = revised_qty * unit_price

        match_rate_percent = round(match_ratio * 100, 1)
        edit_rate_percent = round(100 - match_rate_percent, 1)

        rows.append([
            audit_id, store,
            audit_start, audit_end,
            supervisor_id, supervisor_name,
            aud_id, auditors[aud_id],
            audit_job_type, "Completed",

            total_skus, total_pids,
            allotted_skus, allotted_pids,

            round(avg_time_sku, 1),
            match_rate_percent, edit_rate_percent,

            appeared_count, matched_count, revised_count,
            appeared_qty, appeared_value,
            matched_qty, matched_value,
            revised_qty, revised_value
        ])

# ---------------- DATAFRAME ----------------
columns = [
    "AUDIT_ID","StoreName","AuditStartDate","AuditEndDate",
    "SupervisorID","SupervisorName",
    "AuditorID","AuditorName",
    "AuditJobType","Status",
    "TotalSKUs","TotalPIDs",
    "AuditorAllottedSKUs","AuditorAllottedPIDs",
    "AvgTimePerSKU",
    "MatchRatePercent","EditRatePercent",
    "AppearedCount","MatchedCount","RevisedCount",
    "AppearedQty","AppearedValue",
    "MatchedQty","MatchedValue",
    "RevisedQty","RevisedValue"
]

df = pd.DataFrame(rows, columns=columns)

# ---------------- EXPORT ----------------
df.to_json("audit_dataset.json", orient="records", indent=2)
