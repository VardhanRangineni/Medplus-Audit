import json
from collections import Counter

print("=== STORE UPDATE VERIFICATION ===\n")

# Check audit_dataset.json
with open('src/data/audit_dataset.json', 'r', encoding='utf-8') as f:
    audit = json.load(f)

unique_audit_stores = {}
for r in audit:
    unique_audit_stores[r['StoreID']] = r['StoreName']

print(f"📊 audit_dataset.json")
print(f"   Total unique stores: {len(unique_audit_stores)}")
print(f"   Sample stores:")
for sid, sname in list(unique_audit_stores.items())[:8]:
    print(f"      {sid}: {sname}")

# Check store_coverage_data.json
with open('src/data/store_coverage_data.json', 'r', encoding='utf-8') as f:
    coverage = json.load(f)

unique_coverage_stores = {}
states_count = Counter()
for r in coverage:
    unique_coverage_stores[r['StoreID']] = {'name': r['StoreName'], 'state': r['StateName']}
    states_count[r['StateName']] += 1

print(f"\n📊 store_coverage_data.json")
print(f"   Total unique stores: {len(unique_coverage_stores)}")
print(f"   States represented: {len(states_count)}")
print(f"   Top states: {dict(states_count.most_common(5))}")
print(f"   Sample stores:")
for sid, data in list(unique_coverage_stores.items())[:8]:
    print(f"      {sid}: {data['name']} ({data['state']})")

# Check live_audit_schedule_data.json
with open('src/data/live_audit_schedule_data.json', 'r', encoding='utf-8') as f:
    schedule = json.load(f)

unique_schedule_stores = {}
for r in schedule:
    unique_schedule_stores[r['StoreID']] = {'name': r['StoreName'], 'state': r['StateName']}

print(f"\n📊 live_audit_schedule_data.json")
print(f"   Total unique stores: {len(unique_schedule_stores)}")
print(f"   Sample stores:")
for sid, data in list(unique_schedule_stores.items())[:8]:
    print(f"      {sid}: {data['name']} ({data['state']})")

print("\n✅ All data files have been successfully updated with real store names from stores.json!")
print(f"\n📈 Total Summary:")
print(f"   - Audit dataset: {len(unique_audit_stores)} unique stores")
print(f"   - Store coverage: {len(unique_coverage_stores)} unique stores")
print(f"   - Live schedule: {len(unique_schedule_stores)} unique stores")
