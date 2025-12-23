import json
import random

# Load stores master file
with open('src/assets/stores.json', 'r', encoding='utf-8') as f:
    stores_master = json.load(f)

# Create a mapping of store IDs to store data
stores_by_id = {store['StoreID']: store for store in stores_master}

# Get unique cities and their stores
stores_by_city = {}
for store in stores_master:
    city = store['City']
    if city not in stores_by_city:
        stores_by_city[city] = []
    stores_by_city[city].append(store)

# Function to get real store data for replacement
def get_replacement_stores(count):
    # Get a mix of stores from different cities
    cities = list(stores_by_city.keys())
    replacement_stores = []
    
    # Prioritize getting Hyderabad, Vijayawada, Chennai, Bangalore stores
    priority_cities = ['HYD', 'BZA', 'MAS', 'BLR', 'VSK', 'RJY', 'GNT', 'KRN', 'NLR', 'TIR']
    
    for city in priority_cities:
        if city in stores_by_city and len(replacement_stores) < count:
            available = min(len(stores_by_city[city]), (count - len(replacement_stores)) // len(priority_cities) + 5)
            replacement_stores.extend(random.sample(stores_by_city[city], min(available, len(stores_by_city[city]))))
    
    # If we need more, add from other cities
    if len(replacement_stores) < count:
        for city in cities:
            if city not in priority_cities and len(replacement_stores) < count:
                available = min(3, count - len(replacement_stores), len(stores_by_city[city]))
                if available > 0:
                    replacement_stores.extend(random.sample(stores_by_city[city], available))
    
    return replacement_stores[:count]

# Update audit_dataset.json
print("Updating audit_dataset.json...")
with open('src/data/audit_dataset.json', 'r', encoding='utf-8') as f:
    audit_data = json.load(f)

# Get unique store names in audit data
unique_stores = {}
for record in audit_data:
    store_id = record['StoreID']
    store_name = record['StoreName']
    if store_id not in unique_stores:
        unique_stores[store_id] = store_name

# Create mapping from old to new
store_mapping = {}
replacement_stores = get_replacement_stores(len(unique_stores))
for idx, (old_store_id, old_store_name) in enumerate(unique_stores.items()):
    if idx < len(replacement_stores):
        real_store = replacement_stores[idx]
        store_mapping[old_store_id] = {
            'StoreID': real_store['StoreID'],
            'StoreName': real_store['Store Name'],
            'State': real_store['State'],
            'City': real_store['City']
        }

# Update audit dataset
for record in audit_data:
    old_store_id = record['StoreID']
    if old_store_id in store_mapping:
        new_data = store_mapping[old_store_id]
        record['StoreID'] = new_data['StoreID']
        record['StoreName'] = new_data['StoreName']

with open('src/data/audit_dataset.json', 'w', encoding='utf-8') as f:
    json.dump(audit_data, f, indent=2, ensure_ascii=False)

print(f"Updated {len(store_mapping)} stores in audit_dataset.json")

# Update store_coverage_data.json
print("\nUpdating store_coverage_data.json...")
with open('src/data/store_coverage_data.json', 'r', encoding='utf-8') as f:
    coverage_data = json.load(f)

# Get unique stores
unique_coverage_stores = {}
for record in coverage_data:
    store_id = record['StoreID']
    if store_id not in unique_coverage_stores:
        unique_coverage_stores[store_id] = record['StoreName']

# Create new mapping
coverage_mapping = {}
replacement_stores_coverage = get_replacement_stores(len(unique_coverage_stores))
for idx, (old_store_id, old_store_name) in enumerate(unique_coverage_stores.items()):
    if idx < len(replacement_stores_coverage):
        real_store = replacement_stores_coverage[idx]
        coverage_mapping[old_store_id] = {
            'StoreID': real_store['StoreID'],
            'StoreName': real_store['Store Name'],
            'State': real_store['State'],
            'StateName': real_store['State'],
            'City': real_store['City']
        }

# Update coverage data
for record in coverage_data:
    old_store_id = record['StoreID']
    if old_store_id in coverage_mapping:
        new_data = coverage_mapping[old_store_id]
        record['StoreID'] = new_data['StoreID']
        record['StoreName'] = new_data['StoreName']
        record['State'] = new_data['City']  # State is stored as city code
        record['StateName'] = new_data['State']

with open('src/data/store_coverage_data.json', 'w', encoding='utf-8') as f:
    json.dump(coverage_data, f, indent=2, ensure_ascii=False)

print(f"Updated {len(coverage_mapping)} stores in store_coverage_data.json")

# Update live_audit_schedule_data.json
print("\nUpdating live_audit_schedule_data.json...")
with open('src/data/live_audit_schedule_data.json', 'r', encoding='utf-8') as f:
    schedule_data = json.load(f)

# Get unique stores
unique_schedule_stores = {}
for record in schedule_data:
    store_id = record['StoreID']
    if store_id not in unique_schedule_stores:
        unique_schedule_stores[store_id] = record['StoreName']

# Create new mapping
schedule_mapping = {}
replacement_stores_schedule = get_replacement_stores(len(unique_schedule_stores))
for idx, (old_store_id, old_store_name) in enumerate(unique_schedule_stores.items()):
    if idx < len(replacement_stores_schedule):
        real_store = replacement_stores_schedule[idx]
        schedule_mapping[old_store_id] = {
            'StoreID': real_store['StoreID'],
            'StoreName': real_store['Store Name'],
            'State': real_store['City'],
            'StateName': real_store['State']
        }

# Update schedule data
for record in schedule_data:
    old_store_id = record['StoreID']
    if old_store_id in schedule_mapping:
        new_data = schedule_mapping[old_store_id]
        record['StoreID'] = new_data['StoreID']
        record['StoreName'] = new_data['StoreName']
        record['State'] = new_data['State']
        record['StateName'] = new_data['StateName']

with open('src/data/live_audit_schedule_data.json', 'w', encoding='utf-8') as f:
    json.dump(schedule_data, f, indent=2, ensure_ascii=False)

print(f"Updated {len(schedule_mapping)} stores in live_audit_schedule_data.json")

print("\n✅ All data files updated with real store names from store master!")
print("\nStore mapping summary:")
print(f"- audit_dataset.json: {len(store_mapping)} stores")
print(f"- store_coverage_data.json: {len(coverage_mapping)} stores")
print(f"- live_audit_schedule_data.json: {len(schedule_mapping)} stores")
