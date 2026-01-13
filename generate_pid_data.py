"""
Generate PID (Product ID) allotment data for all stores
This creates detailed PID-level data for the Store PID Allotment page
"""

import json
import random

# Load existing store data
with open('src/data/store_coverage_data.json', 'r') as f:
    stores = json.load(f)

# Load auditors
with open('src/data/auditors.json', 'r') as f:
    auditors = json.load(f)

# Load audit dataset to get auditor assignments
with open('src/data/audit_dataset.json', 'r') as f:
    audits = json.load(f)

random.seed(42)

# Generate location codes for PID descriptions
def generate_location_code():
    letter = random.choice(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])
    number1 = random.randint(1, 9)
    number2 = random.randint(10, 99)
    return f"{letter}{number1}-{number2}"

def generate_pid_data():
    """Generate PID data for all stores"""
    all_pid_data = {}
    pid_counter = 1
    
    print("Generating PID data for all stores...")
    
    for store in stores:
        store_id = store['StoreID']
        total_pids = store['TotalPIDs']
        
        # Skip uncovered stores
        if not store.get('IsCovered', False):
            continue
        
        # Get auditors assigned to this store from audit dataset
        store_audits = [a for a in audits if a['StoreID'] == store_id]
        assigned_auditors = []
        
        if store_audits:
            for audit in store_audits:
                # Get auditor names from the audit
                if 'AuditorNames' in audit:
                    names = audit['AuditorNames'].split(',')
                    ids = audit['AuditorIDs'].split(',') if 'AuditorIDs' in audit else []
                    for i, name in enumerate(names):
                        auditor_id = ids[i].strip() if i < len(ids) else f"A{random.randint(1, 40):03d}"
                        assigned_auditors.append({
                            'id': auditor_id,
                            'name': name.strip()
                        })
        
        # If no auditors found, assign some randomly
        if not assigned_auditors:
            num_auditors = random.randint(1, 3)
            assigned_auditors = random.sample(auditors, min(num_auditors, len(auditors)))
        
        # Generate PIDs for this store
        store_pids = []
        
        # Decide how many PIDs to assign to each auditor
        if assigned_auditors:
            # 40-60% of PIDs assigned, rest unassigned
            num_assigned_pids = int(total_pids * random.uniform(0.4, 0.6))
            num_unassigned_pids = total_pids - num_assigned_pids
            
            # Distribute assigned PIDs among auditors
            pids_per_auditor = []
            remaining_pids = num_assigned_pids
            for i in range(len(assigned_auditors)):
                if i == len(assigned_auditors) - 1:
                    pids_per_auditor.append(remaining_pids)
                else:
                    count = random.randint(max(1, remaining_pids // (len(assigned_auditors) - i) - 5),
                                         remaining_pids // (len(assigned_auditors) - i) + 5)
                    pids_per_auditor.append(count)
                    remaining_pids -= count
            
            # Generate assigned PIDs
            for auditor_idx, auditor in enumerate(assigned_auditors):
                for _ in range(pids_per_auditor[auditor_idx]):
                    sku_count = random.randint(50, 300)
                    
                    # Determine audit status
                    rand = random.random()
                    if rand < 0.15:  # 15% completed
                        audit_status = 'Completed'
                    elif rand < 0.45:  # 30% in progress
                        audit_status = 'In Progress'
                    else:  # 55% pending
                        audit_status = 'Pending'
                    
                    pid = {
                        'pid': f'PID{pid_counter:05d}',
                        'storeId': store_id,
                        'description': generate_location_code(),
                        'skuCount': sku_count,
                        'assignStatus': 'Assigned',
                        'auditStatus': audit_status,
                        'auditorId': auditor['id'] if isinstance(auditor, dict) else auditor,
                        'auditorName': auditor['name'] if isinstance(auditor, dict) else auditor
                    }
                    store_pids.append(pid)
                    pid_counter += 1
            
            # Generate unassigned PIDs
            for _ in range(num_unassigned_pids):
                sku_count = random.randint(50, 300)
                pid = {
                    'pid': f'PID{pid_counter:05d}',
                    'storeId': store_id,
                    'description': generate_location_code(),
                    'skuCount': sku_count,
                    'assignStatus': 'Not Assigned',
                    'auditStatus': 'Pending',
                    'auditorId': None,
                    'auditorName': None
                }
                store_pids.append(pid)
                pid_counter += 1
        
        all_pid_data[store_id] = store_pids
    
    return all_pid_data

# Generate the data
pid_data = generate_pid_data()

# Save to JSON file
with open('src/data/store_pid_data.json', 'w', encoding='utf-8') as f:
    json.dump(pid_data, f, indent=2)

print(f"\n✓ Generated PID data for {len(pid_data)} stores")
print(f"✓ Total PIDs: {sum(len(pids) for pids in pid_data.values())}")
print("✓ Data saved to src/data/store_pid_data.json")
