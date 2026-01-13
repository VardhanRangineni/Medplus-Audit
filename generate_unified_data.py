"""
Unified Data Generation Script
Generates a single comprehensive dataset that serves all 4 tabs:
- Store Coverage
- Live Audit Schedule
- Supervisor Approvals
- Auditor Performance

This ensures data consistency and enables cross-navigation between tabs.
"""

import json
import random
from datetime import datetime, timedelta
import time

# Configuration
random.seed(42)

# Master Reference Data
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
DEVIATION_TYPES = ["Short", "Excess", "Invoiced", "Contra Short", "Contra Excess"]
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
    {"id": "A014", "name": "Meena Iyer"},
    {"id": "A015", "name": "Sanjay Gupta"},
    {"id": "A016", "name": "Rekha Nambiar"},
    {"id": "A017", "name": "Rahul Verma"},
    {"id": "A018", "name": "Manoj Naidu"},
    {"id": "A019", "name": "Swati Pillai"},
    {"id": "A020", "name": "Naveen Kumar"},
    {"id": "A021", "name": "Asha Reddy"},
    {"id": "A022", "name": "Venkat Rao"},
    {"id": "A023", "name": "Gayatri Menon"},
    {"id": "A024", "name": "Harish Chandra"},
    {"id": "A025", "name": "Shilpa Joshi"},
    {"id": "A026", "name": "Prakash Das"},
    {"id": "A027", "name": "Vidya Balan"},
    {"id": "A028", "name": "Srinivas Murthy"},
    {"id": "A029", "name": "Anjali Kapoor"},
    {"id": "A030", "name": "Krishna Prasad"},
    {"id": "A031", "name": "Leela Devi"},
    {"id": "A032", "name": "Subhash Gowda"},
    {"id": "A033", "name": "Madhavi Rao"},
    {"id": "A034", "name": "Raghav Sinha"},
    {"id": "A035", "name": "Sumitra Patil"},
    {"id": "A036", "name": "Gopal Krishnan"},
    {"id": "A037", "name": "Nandini Gupta"},
    {"id": "A038", "name": "Rajiv Malhotra"},
    {"id": "A039", "name": "Kavita Deshmukh"},
    {"id": "A040", "name": "Bharat Singh"}
]

# City names for realistic store names
CITIES = {
    "TN": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Tirunelveli"],
    "KA": ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum", "Davangere"],
    "AP": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati"],
    "TS": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Mahbubnagar"],
    "MH": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur"],
    "DL": ["Delhi", "New Delhi", "Rohini", "Dwarka", "Karol Bagh"],
    "WB": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
    "GJ": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    "RJ": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
    "UP": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Allahabad"]
}

def generate_store_id(state, store_number):
    """Generate realistic store ID"""
    return f"IN{state}{random.choice(['HYD', 'BLR', 'CHN', 'DEL'])}{'0' * (5 - len(str(store_number)))}{store_number}"

def generate_store_name(city, area_number):
    """Generate realistic store name"""
    areas = ["Main Road", "Cross Road", "Market", "Circle", "Junction", "Plaza", "Square", "Layout", "Nagar", "Colony"]
    return f"MEDPLUS {random.choice(areas)} {city.upper()} {area_number}"

def get_recency_category(days):
    """Calculate recency category based on days since last audit"""
    if days <= 90:
        return "0-3 Months"
    elif days <= 180:
        return "3-6 Months"
    elif days <= 270:
        return "6-9 Months"
    elif days <= 365:
        return "9-12 Months"
    else:
        return "12+ Months"

def get_recency_quarter(timestamp):
    """Get quarter from timestamp"""
    dt = datetime.fromtimestamp(timestamp / 1000)
    month = dt.month
    if month <= 3:
        return "Jan - Mar"
    elif month <= 6:
        return "Apr - Jun"
    elif month <= 9:
        return "Jul - Sep"
    else:
        return "Oct - Dec"

def generate_product_forms_breakdown(total_count, total_value):
    """Generate product form breakdown"""
    forms = []
    remaining_count = total_count
    remaining_value = total_value
    
    # Select 3-7 random forms
    num_forms = random.randint(3, min(7, len(PRODUCT_FORMS)))
    selected_forms = random.sample(PRODUCT_FORMS, num_forms)
    
    for idx, form in enumerate(selected_forms):
        if idx == len(selected_forms) - 1:
            form_count = remaining_count
            form_value = remaining_value
        else:
            max_count = max(1, remaining_count - (len(selected_forms) - idx - 1))
            form_count = random.randint(1, max_count)
            form_value = round((form_count / total_count) * total_value, 2) if total_count > 0 else 0
            remaining_count -= form_count
            remaining_value -= form_value
        
        if form_count > 0:
            forms.append({
                "ProductForm": form,
                "Count": form_count,
                "Value": round(form_value, 2)
            })
    
    return forms

def generate_day_wise_summary(start_date, end_date, total_pids, total_skus, total_value):
    """Generate day-wise audit summary"""
    days = (end_date - start_date).days + 1
    day_wise = {}
    
    remaining_pids = max(1, total_pids)
    remaining_skus = max(1, total_skus)
    remaining_value = max(0, total_value)
    
    for i in range(days):
        current_date = start_date + timedelta(days=i)
        date_str = current_date.strftime("%Y-%m-%d")
        
        if i == days - 1 or remaining_skus <= 0:
            # Last day gets remaining
            day_pids = max(0, remaining_pids)
            day_skus = max(0, remaining_skus)
            day_value = max(0, remaining_value)
        else:
            # Distribute randomly
            min_skus = max(1, min(remaining_skus // (days - i), remaining_skus))
            day_pids = random.randint(1, max(1, remaining_pids)) if remaining_pids > 0 else 0
            day_skus = random.randint(min_skus, remaining_skus) if remaining_skus > 0 else 0
            day_value = round(remaining_value * (day_skus / remaining_skus), 2) if remaining_skus > 0 else 0
            
            remaining_pids = max(0, remaining_pids - day_pids)
            remaining_skus = max(0, remaining_skus - day_skus)
            remaining_value = max(0, remaining_value - day_value)
        
        start_hour = random.randint(8, 10)
        work_hours = random.randint(4, 8)
        end_hour = start_hour + work_hours
        
        day_wise[date_str] = {
            "startTime": f"{start_hour:02d}:{random.randint(0, 59):02d}",
            "endTime": f"{end_hour:02d}:{random.randint(0, 59):02d}",
            "pids": day_pids,
            "skus": day_skus,
            "value": round(day_value, 2)
        }
    
    return day_wise

def generate_unified_dataset():
    """Generate unified dataset for all 4 tabs"""
    
    print("Generating unified audit dataset...")
    print("=" * 60)
    
    # Generate stores
    num_stores = 150  # Total stores
    stores = []
    audit_records = []
    audit_id_counter = 1
    
    # Distribution: 70% covered, 30% uncovered
    num_covered = int(num_stores * 0.7)
    
    for store_num in range(1, num_stores + 1):
        state = random.choice(STATES)
        city = random.choice(CITIES[state])
        
        store = {
            "StoreID": generate_store_id(state, store_num),
            "StoreName": generate_store_name(city, store_num),
            "City": city,
            "State": state,
            "StateName": STATE_NAMES[state],
            "StoreType": random.choice(STORE_TYPES),
            "BoxMapping": random.choice(BOX_MAPPING_TYPES),
            "IsCovered": store_num <= num_covered,
            "StoreCreatedDate": int((datetime.now() - timedelta(days=random.randint(365, 1825))).timestamp() * 1000),
            "TotalPIDs": random.randint(1000, 5000),
            "TotalSKUs": 0,  # Will calculate
            "TotalQuantity": 0,  # Will calculate
            "InventoryValue": 0  # Will calculate
        }
        
        # Calculate SKUs and inventory
        store["TotalSKUs"] = store["TotalPIDs"] * random.randint(3, 5)
        store["TotalQuantity"] = store["TotalSKUs"] * random.randint(20, 80)
        avg_price = random.uniform(50, 300)
        store["InventoryValue"] = round(store["TotalQuantity"] * avg_price, 2)
        
        if store["IsCovered"]:
            # Generate audit records for covered stores
            num_audits = random.randint(1, 3)  # 1-3 audits per store
            
            for audit_num in range(num_audits):
                supervisor = random.choice(SUPERVISORS)
                auditor = random.choice(AUDITORS)
                
                # Audit dates
                days_ago = random.randint(30, 365)
                audit_end = datetime.now() - timedelta(days=days_ago)
                audit_start = audit_end - timedelta(days=random.randint(1, 5))
                
                status = random.choices(
                    AUDIT_STATUS,
                    weights=[70, 15, 10, 5],  # Mostly completed
                    k=1
                )[0]
                
                # Auditor allocation (20-40% of store SKUs)
                allotted_skus = int(store["TotalSKUs"] * random.uniform(0.2, 0.4))
                allotted_pids = int(allotted_skus / random.randint(3, 5))
                allotted_value = round(allotted_skus * avg_price, 2)
                
                # Completion metrics
                if status == "Completed":
                    completion_percent = random.uniform(95, 100)
                    completed_skus = int(allotted_skus * (completion_percent / 100))
                elif status == "In Progress":
                    completion_percent = random.uniform(50, 90)
                    completed_skus = int(allotted_skus * (completion_percent / 100))
                else:
                    completion_percent = 0
                    completed_skus = 0
                
                # Time metrics
                avg_time_per_sku = round(random.uniform(2.5, 5.0), 1)
                avg_time_per_pid = round(avg_time_per_sku * random.uniform(3, 5), 2)
                
                # Deviation metrics
                appeared_skus = int(completed_skus * random.uniform(0.05, 0.15))  # 5-15%
                matched_skus = int(appeared_skus * random.uniform(0.7, 0.9))  # 70-90% matched
                revised_skus = appeared_skus - matched_skus
                
                appeared_qty = appeared_skus * random.randint(5, 20)
                matched_qty = int(appeared_qty * random.uniform(0.7, 0.9))
                revised_qty = appeared_qty - matched_qty
                
                appeared_value = round(appeared_skus * avg_price, 2)
                matched_value = round(matched_skus * avg_price, 2)
                revised_value = appeared_value - matched_value
                
                # Pending
                pending_skus = allotted_skus - completed_skus
                pending_qty = pending_skus * random.randint(5, 20)
                pending_value = round(pending_skus * avg_price, 2)
                
                # Day-wise summary
                day_wise = generate_day_wise_summary(
                    audit_start, audit_end,
                    allotted_pids, completed_skus, allotted_value
                )
                
                # Deviation details
                deviation_details = []
                if revised_skus > 0:
                    # Short deviations
                    short_skus = int(revised_skus * random.uniform(0.4, 0.7))
                    short_value = round(short_skus * avg_price, 2)
                    if short_skus > 0:
                        deviation_details.append({
                            "type": "Short",
                            "count": short_skus,
                            "value": short_value,
                            "ProductForms": generate_product_forms_breakdown(short_skus, short_value)
                        })
                    
                    # Excess deviations
                    excess_skus = revised_skus - short_skus
                    excess_value = revised_value - short_value
                    if excess_skus > 0:
                        deviation_details.append({
                            "type": "Excess",
                            "count": excess_skus,
                            "value": excess_value,
                            "ProductForms": generate_product_forms_breakdown(excess_skus, excess_value)
                        })
                
                if matched_skus > 0:
                    # Contra Short
                    contra_short_skus = int(matched_skus * 0.5)
                    contra_short_value = round(contra_short_skus * avg_price, 2)
                    if contra_short_skus > 0:
                        deviation_details.append({
                            "type": "Contra Short",
                            "count": contra_short_skus,
                            "value": contra_short_value,
                            "ProductForms": generate_product_forms_breakdown(contra_short_skus, contra_short_value)
                        })
                    
                    # Contra Excess
                    contra_excess_skus = matched_skus - contra_short_skus
                    contra_excess_value = matched_value - contra_short_value
                    if contra_excess_skus > 0:
                        deviation_details.append({
                            "type": "Contra Excess",
                            "count": contra_excess_skus,
                            "value": contra_excess_value,
                            "ProductForms": generate_product_forms_breakdown(contra_excess_skus, contra_excess_value)
                        })
                
                audit_record = {
                    "AUDIT_ID": f"AUD{audit_id_counter:05d}",
                    "StoreID": store["StoreID"],
                    "StoreName": store["StoreName"],
                    "City": store["City"],
                    "State": store["State"],
                    "StateName": store["StateName"],
                    "StoreType": store["StoreType"],
                    "BoxMapping": store["BoxMapping"],
                    "AuditJobType": random.choice(AUDIT_JOB_TYPES),
                    "AuditProcessType": random.choice(AUDIT_PROCESS_TYPES),
                    "Status": status,
                    "AuditStartDate": audit_start.strftime("%Y-%m-%d"),
                    "AuditEndDate": audit_end.strftime("%Y-%m-%d"),
                    "SupervisorID": supervisor["id"],
                    "SupervisorName": supervisor["name"],
                    "StoreTotalPIDs": store["TotalPIDs"],
                    "StoreTotalSKUs": store["TotalSKUs"],
                    "StoreTotalQuantity": store["TotalQuantity"],
                    "StoreInventoryValue": store["InventoryValue"],
                    "StoreAuditValue": round(store["InventoryValue"], 2),
                    "AuditorID": auditor["id"],
                    "AuditorName": auditor["name"],
                    "AuditorAllottedPIDs": allotted_pids,
                    "AuditorAllottedSKUs": allotted_skus,
                    "AuditorAuditedValue": allotted_value,
                    "CompletedSKUs": completed_skus,
                    "CompletionPercent": round(completion_percent, 1),
                    "AvgTimePerSKU": avg_time_per_sku,
                    "AvgTimePerPID": avg_time_per_pid,
                    "AppearedSKUs": appeared_skus,
                    "MatchedSKUs": matched_skus,
                    "RevisedSKUs": revised_skus,
                    "AppearedQty": appeared_qty,
                    "MatchedQty": matched_qty,
                    "RevisedQty": revised_qty,
                    "AppearedValue": appeared_value,
                    "MatchedValue": matched_value,
                    "RevisedValue": revised_value,
                    "PendingCount": pending_skus,
                    "PendingQty": pending_qty,
                    "PendingValue": pending_value,
                    "DayWiseSummary": day_wise,
                    "DeviationDetails": deviation_details
                }
                
                audit_records.append(audit_record)
                audit_id_counter += 1
                
                # Update store's last audit info (keep the most recent)
                if audit_num == 0 or not hasattr(store, 'LastAuditDate'):
                    store["LastAuditDate"] = int(audit_end.timestamp() * 1000)
                    store["LastAuditStatus"] = status
                    store["LastAuditJobType"] = audit_record["AuditJobType"]
                    store["LastAuditProcessType"] = audit_record["AuditProcessType"]
                    store["DaysSinceLastAudit"] = days_ago
                    store["RecencyCategory"] = get_recency_category(days_ago)
                    store["RecencyQuarter"] = get_recency_quarter(store["LastAuditDate"])
                    store["RevisedSKUs"] = revised_skus
                    store["MatchedSKUs"] = matched_skus
                    store["AppearedSKUs"] = appeared_skus
                    store["RevisedValue"] = revised_value
                    store["MatchedValue"] = matched_value
                    store["AppearedValue"] = appeared_value
                    store["TotalDeviationCount"] = appeared_skus
                    store["TotalDeviationValue"] = appeared_value
                    store["Deviations"] = deviation_details
        else:
            # Uncovered store - no audit data
            store["LastAuditDate"] = None
            store["LastAuditStatus"] = "Pending"
            store["LastAuditJobType"] = None
            store["LastAuditProcessType"] = None
            store["DaysSinceLastAudit"] = random.randint(400, 800)
            store["RecencyCategory"] = "12+ Months"
            store["RecencyQuarter"] = None
            store["RevisedSKUs"] = 0
            store["MatchedSKUs"] = 0
            store["AppearedSKUs"] = 0
            store["RevisedValue"] = 0
            store["MatchedValue"] = 0
            store["AppearedValue"] = 0
            store["TotalDeviationCount"] = 0
            store["TotalDeviationValue"] = 0
            store["Deviations"] = []
        
        stores.append(store)
        
        if store_num % 10 == 0:
            print(f"Generated {store_num}/{num_stores} stores...")
    
    # Save unified audit dataset (for Supervisor & Auditor tabs)
    print(f"\nSaving {len(audit_records)} audit records...")
    with open('src/data/audit_dataset.json', 'w', encoding='utf-8') as f:
        json.dump(audit_records, f, indent=2)
    
    # Save store coverage data (for Store Coverage & Live Audit tabs)
    print(f"Saving {len(stores)} stores...")
    with open('src/data/store_coverage_data.json', 'w', encoding='utf-8') as f:
        json.dump(stores, f, indent=2)
    
    # Generate auditors metadata
    print("Generating auditors metadata...")
    auditors_data = []
    for auditor in AUDITORS:
        auditor_records = [r for r in audit_records if r["AuditorID"] == auditor["id"]]
        total_audits = len(auditor_records)
        total_skus = sum(r["CompletedSKUs"] for r in auditor_records)
        
        auditors_data.append({
            "id": auditor["id"],
            "name": auditor["name"],
            "totalAudits": total_audits,
            "totalSKUs": total_skus,
            "avgAccuracy": round(random.uniform(85, 98), 1)
        })
    
    with open('src/data/auditors.json', 'w', encoding='utf-8') as f:
        json.dump(auditors_data, f, indent=2)
    
    # Generate live audit schedule data (ongoing/upcoming audits)
    print("Generating live audit schedule...")
    live_audits = [r for r in audit_records if r["Status"] in ["In Progress", "Created"]]
    with open('src/data/live_audit_schedule_data.json', 'w', encoding='utf-8') as f:
        json.dump(live_audits, f, indent=2)
    
    print("\n" + "=" * 60)
    print("✓ Data generation complete!")
    print(f"  - {len(stores)} stores")
    print(f"  - {len(audit_records)} audit records")
    print(f"  - {len(auditors_data)} auditors")
    print(f"  - {len(live_audits)} live audits")
    print("=" * 60)

if __name__ == "__main__":
    generate_unified_dataset()
