import json
import random
from datetime import datetime, timedelta

# Configuration
random.seed(42)

# Master data
STATES = ["TN", "KA", "AP", "TS", "MH", "DL", "WB", "GJ", "RJ", "UP"]
STATE_NAMES = {
    "TN": "Tamil Nadu", "KA": "Karnataka", "AP": "Andhra Pradesh",
    "TS": "Telangana", "MH": "Maharashtra", "DL": "Delhi",
    "WB": "West Bengal", "GJ": "Gujarat", "RJ": "Rajasthan", "UP": "Uttar Pradesh"
}

STORE_TYPES = ["HUB", "REGULAR"]
BOX_MAPPING_TYPES = ["Box Mapping", "Non Box Mapping"]
AUDIT_JOB_TYPES = ["Full Audit", "Partial/Random Audit", "Select SKUs"]
AUDIT_PROCESS_TYPES = ["Product Audit", "Batch Audit", "Box Audit"]
AUDIT_STATUS = ["Completed", "In Progress", "Pending", "Created"]
DEVIATION_TYPES = ["Invoiced", "Contra Short", "Contra Excess", "Excess Submitted"]
PRODUCT_FORMS = ["Tablets", "Liquids", "Injection", "Ointments", "Powders", "Drops", "Inhalers", "Containers", "General", "Surgicals"]

SUPERVISORS = [
    {"id": "S001", "name": "Rajesh Kumar"},
    {"id": "S002", "name": "Lakshmi Iyer"},
    {"id": "S003", "name": "Mohammed Ali"},
    {"id": "S004", "name": "Pradeep Singh"},
    {"id": "S005", "name": "Vamsi Krishna"},
    {"id": "S006", "name": "Neha Sharma"},
    {"id": "S007", "name": "Kiran Patel"},
    {"id": "S008", "name": "Amit Verma"},
    {"id": "S009", "name": "Sourav Das"},
    {"id": "S010", "name": "Pooja Deshmukh"}
]

AUDITORS = [
    {"id": "A001", "name": "Amit Singh"},
    {"id": "A002", "name": "Priya Sharma"},
    {"id": "A003", "name": "Suresh Kumar"},
    {"id": "A004", "name": "Deepak Reddy"},
    {"id": "A005", "name": "Anitha Rao"},
    {"id": "A006", "name": "Ravi Varma"},
    {"id": "A007", "name": "Sneha Patel"},
    {"id": "A008", "name": "Vijay Kumar"},
    {"id": "A009", "name": "Pooja Desai"},
    {"id": "A010", "name": "Arun Nair"},
    {"id": "A011", "name": "Divya Singh"},
    {"id": "A012", "name": "Rohit Sharma"},
    {"id": "A013", "name": "Karan Mehta"},
    {"id": "A014", "name": "Hitesh Shah"},
    {"id": "A015", "name": "Nisha Gupta"}
]

def generate_store_name(state_code, index):
    cities = {
        "TN": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
        "KA": ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum"],
        "AP": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
        "TS": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
        "MH": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
        "DL": ["Delhi NCR", "Connaught Place", "Rohini", "Dwarka", "Saket"],
        "WB": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
        "GJ": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
        "RJ": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
        "UP": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"]
    }
    locations = ["Central", "Main", "Hub", "East", "West", "Clock Tower", "Market"]
    city = cities.get(state_code, ["City"])[index % len(cities.get(state_code, ["City"]))]
    location = locations[index % len(locations)]
    return f"{city}-{location}"

def generate_timestamp(days_ago):
    """Generate timestamp for a date in the past"""
    date = datetime.now() - timedelta(days=days_ago)
    return int(date.timestamp() * 1000)

def generate_store_coverage_data():
    """Generate comprehensive store coverage data"""
    stores = []
    store_id_counter = 1
    
    for state_code in STATES:
        # Generate 45-50 stores per state
        num_stores = random.randint(45, 50)
        
        for i in range(num_stores):
            store_id = f"MP{store_id_counter:04d}"
            store_name = generate_store_name(state_code, i)
            store_type = random.choice(STORE_TYPES)
            box_mapping = random.choice(BOX_MAPPING_TYPES)
            
            # 85% stores are covered, 15% uncovered
            is_covered = random.random() < 0.856
            
            store_data = {
                "StoreID": store_id,
                "StoreName": store_name,
                "State": state_code,
                "StateName": STATE_NAMES[state_code],
                "StoreType": store_type,
                "BoxMapping": box_mapping,
                "IsCovered": is_covered,
                "TotalSKUs": random.randint(2800, 5500),
                "TotalPIDs": random.randint(800, 1850),
                "TotalQuantity": random.randint(50000, 300000),
                "InventoryValue": round(random.uniform(500000, 5000000), 2)
            }
            
            if is_covered:
                # Last audit date (within last year)
                days_ago = random.randint(1, 365)
                store_data["LastAuditDate"] = generate_timestamp(days_ago)
                store_data["DaysSinceLastAudit"] = days_ago
                
                # Categorize by recency
                if days_ago <= 90:
                    store_data["RecencyCategory"] = "0-3 Months"
                    store_data["RecencyQuarter"] = "Oct - Dec"
                elif days_ago <= 180:
                    store_data["RecencyCategory"] = "3-6 Months"
                    store_data["RecencyQuarter"] = "Jul - Sep"
                elif days_ago <= 270:
                    store_data["RecencyCategory"] = "6-9 Months"
                    store_data["RecencyQuarter"] = "Apr - Jun"
                else:
                    store_data["RecencyCategory"] = "9-12 Months"
                    store_data["RecencyQuarter"] = "Jan - Mar"
                
                # Audit details
                store_data["LastAuditJobType"] = random.choice(AUDIT_JOB_TYPES)
                store_data["LastAuditProcessType"] = random.choice(AUDIT_PROCESS_TYPES)
                store_data["LastAuditStatus"] = "Completed"
                
                # Deviation data
                num_deviations = random.randint(0, 4)
                deviations = []
                total_deviation_value = 0
                total_deviation_count = 0
                
                for _ in range(num_deviations):
                    deviation_type = random.choice(DEVIATION_TYPES)
                    deviation_count = random.randint(20, 100)
                    deviation_value = round(random.uniform(5000, 50000), 2)
                    
                    # Product form breakdown
                    forms = []
                    remaining_count = deviation_count
                    remaining_value = deviation_value
                    
                    num_forms = random.randint(3, 7)
                    selected_forms = random.sample(PRODUCT_FORMS, num_forms)
                    
                    for idx, form in enumerate(selected_forms):
                        if idx == len(selected_forms) - 1:
                            # Last form gets remaining
                            form_count = remaining_count
                            form_value = remaining_value
                        else:
                            form_count = random.randint(1, remaining_count // 2)
                            form_value = round(random.uniform(100, remaining_value / 2), 2)
                            remaining_count -= form_count
                            remaining_value -= form_value
                        
                        forms.append({
                            "ProductForm": form,
                            "Count": form_count,
                            "Value": round(form_value, 2)
                        })
                    
                    deviations.append({
                        "DeviationType": deviation_type,
                        "Count": deviation_count,
                        "Value": round(deviation_value, 2),
                        "ProductForms": forms
                    })
                    
                    total_deviation_value += deviation_value
                    total_deviation_count += deviation_count
                
                store_data["Deviations"] = deviations
                store_data["TotalDeviationValue"] = round(total_deviation_value, 2)
                store_data["TotalDeviationCount"] = total_deviation_count
            else:
                store_data["LastAuditDate"] = None
                store_data["DaysSinceLastAudit"] = None
                store_data["RecencyCategory"] = "N/A"
                store_data["RecencyQuarter"] = None
                store_data["LastAuditJobType"] = None
                store_data["LastAuditProcessType"] = None
                store_data["LastAuditStatus"] = None
                store_data["Deviations"] = []
                store_data["TotalDeviationValue"] = 0
                store_data["TotalDeviationCount"] = 0
            
            stores.append(store_data)
            store_id_counter += 1
    
    return stores

def generate_live_audit_schedule_data():
    """Generate comprehensive live audit schedule data"""
    audits = []
    audit_id_counter = 1
    store_id_counter = 1
    
    # Generate audits for different states
    for state_code in STATES:
        # 2-5 audits per state
        num_audits = random.randint(2, 5)
        
        for i in range(num_audits):
            audit_id = f"AUD{audit_id_counter:05d}"
            store_id = f"MP{store_id_counter:04d}"
            store_name = generate_store_name(state_code, i)
            
            supervisor = random.choice(SUPERVISORS)
            audit_job_type = random.choice(AUDIT_JOB_TYPES)
            audit_process_type = random.choice(AUDIT_PROCESS_TYPES)
            status = random.choice(AUDIT_STATUS)
            
            total_skus = random.randint(2800, 5500)
            total_pids = random.randint(800, 1850)
            
            # Number of auditors (1-4)
            num_auditors = random.randint(1, 4)
            assigned_auditors = random.sample(AUDITORS, num_auditors)
            
            audit_data = {
                "AuditID": audit_id,
                "StoreID": store_id,
                "StoreName": store_name,
                "State": state_code,
                "StateName": STATE_NAMES[state_code],
                "SupervisorID": supervisor["id"],
                "SupervisorName": supervisor["name"],
                "AuditJobType": audit_job_type,
                "AuditProcessType": audit_process_type,
                "Status": status,
                "TotalSKUs": total_skus,
                "TotalPIDs": total_pids,
                "NumberOfAuditors": num_auditors
            }
            
            # Status-specific data
            if status == "Created":
                audit_data["StartDate"] = generate_timestamp(random.randint(1, 5))
                audit_data["EndDate"] = None
                audit_data["CompletedSKUs"] = 0
                audit_data["CompletionPercent"] = 0
                audit_data["DurationHours"] = 0
                audit_data["Auditors"] = []
                audit_data["AuditorNames"] = "Not Assigned"
                
            elif status == "Pending":
                days_ago = random.randint(1, 10)
                audit_data["StartDate"] = generate_timestamp(days_ago)
                audit_data["EndDate"] = None
                audit_data["CompletedSKUs"] = 0
                audit_data["CompletionPercent"] = 0
                audit_data["DurationHours"] = days_ago * 24
                audit_data["Auditors"] = [
                    {
                        "AuditorID": aud["id"],
                        "AuditorName": aud["name"],
                        "AllottedSKUs": 0,
                        "AllottedPIDs": 0,
                        "CompletedSKUs": 0,
                        "CompletionPercent": 0,
                        "ValueCovered": 0,
                        "Status": "Pending"
                    } for aud in assigned_auditors
                ]
                audit_data["AuditorNames"] = ", ".join([a["name"] for a in assigned_auditors])
                
            elif status == "In Progress":
                days_ago = random.randint(1, 15)
                audit_data["StartDate"] = generate_timestamp(days_ago)
                audit_data["EndDate"] = None
                
                # Calculate completion (30-90%)
                completion_percent = round(random.uniform(30, 90), 1)
                completed_skus = int(total_skus * completion_percent / 100)
                
                audit_data["CompletedSKUs"] = completed_skus
                audit_data["CompletionPercent"] = completion_percent
                audit_data["DurationHours"] = days_ago * 24
                
                # Auditor-wise breakdown
                auditors_data = []
                remaining_skus = total_skus
                remaining_pids = total_pids
                
                for idx, aud in enumerate(assigned_auditors):
                    if idx == len(assigned_auditors) - 1:
                        # Last auditor gets remaining
                        allotted_skus = remaining_skus
                        allotted_pids = remaining_pids
                    else:
                        allotted_skus = random.randint(remaining_skus // (len(assigned_auditors) - idx + 1), 
                                                       remaining_skus // (len(assigned_auditors) - idx))
                        allotted_pids = random.randint(remaining_pids // (len(assigned_auditors) - idx + 1),
                                                       remaining_pids // (len(assigned_auditors) - idx))
                        remaining_skus -= allotted_skus
                        remaining_pids -= allotted_pids
                    
                    auditor_completion = round(random.uniform(40, 95), 1)
                    auditor_completed = int(allotted_skus * auditor_completion / 100)
                    
                    auditors_data.append({
                        "AuditorID": aud["id"],
                        "AuditorName": aud["name"],
                        "AllottedSKUs": allotted_skus,
                        "AllottedPIDs": allotted_pids,
                        "CompletedSKUs": auditor_completed,
                        "CompletionPercent": auditor_completion,
                        "ValueCovered": round(random.uniform(50000, 500000), 2),
                        "AvgTimePerSKU": round(random.uniform(2.5, 6.0), 1),
                        "MatchRate": round(random.uniform(80, 98), 1),
                        "EditRate": round(random.uniform(2, 15), 1),
                        "Status": "In Progress"
                    })
                
                audit_data["Auditors"] = auditors_data
                audit_data["AuditorNames"] = ", ".join([a["name"] for a in assigned_auditors])
                
            elif status == "Completed":
                # Start date 20-60 days ago
                start_days_ago = random.randint(20, 60)
                duration_days = random.randint(5, 12)
                
                audit_data["StartDate"] = generate_timestamp(start_days_ago)
                audit_data["EndDate"] = generate_timestamp(start_days_ago - duration_days)
                audit_data["CompletedSKUs"] = total_skus
                audit_data["CompletionPercent"] = 100
                audit_data["DurationHours"] = duration_days * 24
                
                # Generate mismatches (5-20)
                num_mismatches = random.randint(5, 20)
                mismatches = []
                
                for j in range(num_mismatches):
                    mismatch_type = random.choice(["Short", "Excess", "Contra Short", "Contra Excess"])
                    system_qty = random.randint(50, 200)
                    
                    if "Short" in mismatch_type:
                        physical_qty = system_qty - random.randint(1, 10)
                    else:
                        physical_qty = system_qty + random.randint(1, 8)
                    
                    mismatches.append({
                        "ProductID": f"PID{random.randint(1000, 9999)}",
                        "SKU": f"SKU{random.randint(10000, 99999)}",
                        "ProductName": f"Medicine {random.choice(['A', 'B', 'C', 'D'])} {random.randint(50, 500)}mg",
                        "ProductForm": random.choice(PRODUCT_FORMS),
                        "Type": mismatch_type,
                        "SystemQty": system_qty,
                        "PhysicalQty": physical_qty,
                        "Difference": physical_qty - system_qty,
                        "Value": round(random.uniform(1000, 10000), 2)
                    })
                
                audit_data["MismatchCount"] = num_mismatches
                audit_data["MismatchDetails"] = mismatches
                
                # Deviation count (3-7)
                audit_data["DeviationCount"] = random.randint(3, 7)
                
                # Auditor-wise breakdown
                auditors_data = []
                remaining_skus = total_skus
                remaining_pids = total_pids
                
                for idx, aud in enumerate(assigned_auditors):
                    if idx == len(assigned_auditors) - 1:
                        allotted_skus = remaining_skus
                        allotted_pids = remaining_pids
                    else:
                        allotted_skus = random.randint(remaining_skus // (len(assigned_auditors) - idx + 1),
                                                       remaining_skus // (len(assigned_auditors) - idx))
                        allotted_pids = random.randint(remaining_pids // (len(assigned_auditors) - idx + 1),
                                                       remaining_pids // (len(assigned_auditors) - idx))
                        remaining_skus -= allotted_skus
                        remaining_pids -= allotted_pids
                    
                    auditors_data.append({
                        "AuditorID": aud["id"],
                        "AuditorName": aud["name"],
                        "AllottedSKUs": allotted_skus,
                        "AllottedPIDs": allotted_pids,
                        "CompletedSKUs": allotted_skus,
                        "CompletionPercent": 100,
                        "ValueCovered": round(random.uniform(100000, 800000), 2),
                        "AvgTimePerSKU": round(random.uniform(3.0, 5.5), 1),
                        "MatchRate": round(random.uniform(85, 98), 1),
                        "EditRate": round(random.uniform(2, 12), 1),
                        "Status": "Completed"
                    })
                
                audit_data["Auditors"] = auditors_data
                audit_data["AuditorNames"] = ", ".join([a["name"] for a in assigned_auditors])
            
            audits.append(audit_data)
            audit_id_counter += 1
            store_id_counter += 1
    
    return audits

def main():
    print("🚀 Generating Store Coverage Data...")
    store_coverage_data = generate_store_coverage_data()
    print(f"✅ Generated {len(store_coverage_data)} store records")
    
    print("\n🚀 Generating Live Audit Schedule Data...")
    live_audit_data = generate_live_audit_schedule_data()
    print(f"✅ Generated {len(live_audit_data)} audit records")
    
    # Save to JSON files
    print("\n💾 Saving to JSON files...")
    
    with open('src/data/store_coverage_data.json', 'w', encoding='utf-8') as f:
        json.dump(store_coverage_data, f, indent=2, ensure_ascii=False)
    print(f"✅ Saved: src/data/store_coverage_data.json")
    
    with open('src/data/live_audit_schedule_data.json', 'w', encoding='utf-8') as f:
        json.dump(live_audit_data, f, indent=2, ensure_ascii=False)
    print(f"✅ Saved: src/data/live_audit_schedule_data.json")
    
    # Print summary
    print("\n" + "="*60)
    print("📊 DATA GENERATION SUMMARY")
    print("="*60)
    
    print("\n🏪 STORE COVERAGE DATA:")
    print(f"  Total Stores: {len(store_coverage_data)}")
    covered = sum(1 for s in store_coverage_data if s['IsCovered'])
    print(f"  Covered: {covered} ({covered/len(store_coverage_data)*100:.1f}%)")
    print(f"  Uncovered: {len(store_coverage_data) - covered}")
    
    states_count = {}
    for store in store_coverage_data:
        state = store['State']
        states_count[state] = states_count.get(state, 0) + 1
    print(f"  States: {len(states_count)} ({', '.join(states_count.keys())})")
    
    print("\n📅 LIVE AUDIT SCHEDULE DATA:")
    print(f"  Total Audits: {len(live_audit_data)}")
    
    status_count = {}
    for audit in live_audit_data:
        status = audit['Status']
        status_count[status] = status_count.get(status, 0) + 1
    
    for status, count in status_count.items():
        print(f"  {status}: {count}")
    
    print("\n✨ All data files generated successfully!")
    print("="*60)

if __name__ == "__main__":
    main()
