import json
import random
import os

# -------- CONFIG --------
OUTPUT_PATH = "src/data/auditors.json"
os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

# -------- AUDITOR SOURCE DATA --------
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

# -------- STATUS LOGIC --------
statuses = ["Active", "Inactive", "Deactivated"]
weights = [0.6, 0.2, 0.2]  # realistic workforce split

# -------- GENERATION --------
auditor_list = []

for aud_id, name in auditors.items():
    auditor_list.append({
        "AuditorID": aud_id,
        "AuditorName": name,
        "Status": random.choices(statuses, weights=weights, k=1)[0]
    })

# -------- EXPORT --------
with open(OUTPUT_PATH, "w") as f:
    json.dump(auditor_list, f, indent=2)

print(f"Generated {len(auditor_list)} auditors → {OUTPUT_PATH}")
