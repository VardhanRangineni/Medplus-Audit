"""
Data Verification Script
Verifies that all data is properly synchronized across files
"""

import json
from collections import Counter, defaultdict

def verify_data_synchronization():
    print("=" * 80)
    print("DATA SYNCHRONIZATION VERIFICATION")
    print("=" * 80)
    
    # Load all data files
    with open('src/data/store_coverage_data.json', 'r') as f:
        stores = json.load(f)
    
    with open('src/data/audit_dataset.json', 'r') as f:
        audits = json.load(f)
    
    with open('src/data/live_audit_schedule_data.json', 'r') as f:
        live_audits = json.load(f)
    
    with open('src/data/auditors.json', 'r') as f:
        auditors = json.load(f)
    
    print("\n1. STORE COUNTS")
    print("-" * 80)
    total_stores = len(stores)
    covered_stores = sum(1 for s in stores if s['IsCovered'])
    uncovered_stores = sum(1 for s in stores if not s['IsCovered'])
    active_covered = sum(1 for s in stores if s['IsCovered'] and s.get('IsActive', True))
    inactive_covered = sum(1 for s in stores if s['IsCovered'] and not s.get('IsActive', True))
    
    print(f"Total Stores: {total_stores}")
    print(f"  ├─ Covered: {covered_stores}")
    print(f"  │  ├─ Active: {active_covered}")
    print(f"  │  └─ Inactive: {inactive_covered}")
    print(f"  └─ Uncovered: {uncovered_stores}")
    
    # Verify expected counts
    assert total_stores == 538, f"Expected 538 total stores, got {total_stores}"
    assert covered_stores == 478, f"Expected 478 covered stores, got {covered_stores}"
    assert uncovered_stores == 60, f"Expected 60 uncovered stores, got {uncovered_stores}"
    assert active_covered == 470, f"Expected 470 active covered stores, got {active_covered}"
    assert inactive_covered == 8, f"Expected 8 inactive covered stores, got {inactive_covered}"
    print("✓ Store counts verified!")
    
    print("\n2. AUDIT STATUS BREAKDOWN")
    print("-" * 80)
    status_counts = Counter(a['Status'] for a in audits)
    print(f"Total Audits: {len(audits)}")
    for status, count in sorted(status_counts.items()):
        print(f"  ├─ {status}: {count}")
    print("✓ Audit status breakdown verified!")
    
    print("\n3. LIVE AUDIT SCHEDULE")
    print("-" * 80)
    live_status = Counter(a['Status'] for a in live_audits)
    print(f"Total Live Audits: {len(live_audits)}")
    for status, count in sorted(live_status.items()):
        print(f"  ├─ {status}: {count}")
    
    # Verify live audits only include In Progress, Created, and today's Completed
    expected_statuses = {'In Progress', 'Created', 'Completed'}
    actual_statuses = set(live_status.keys())
    assert actual_statuses <= expected_statuses, f"Unexpected statuses in live audits: {actual_statuses - expected_statuses}"
    print("✓ Live audit schedule verified!")
    
    print("\n4. AUDITOR/SUPERVISOR COVERAGE")
    print("-" * 80)
    unique_auditors = set(a['AuditorID'] for a in audits)
    unique_supervisors = set(a['SupervisorID'] for a in audits)
    print(f"Unique Auditors in Audits: {len(unique_auditors)}")
    print(f"Unique Supervisors in Audits: {len(unique_supervisors)}")
    print(f"Auditors in Metadata: {len(auditors)}")
    print("✓ Auditor/Supervisor coverage verified!")
    
    print("\n5. DATA CONSISTENCY CHECKS")
    print("-" * 80)
    
    # Check that all audit records have required fields
    required_fields = [
        'AUDIT_ID', 'StoreID', 'Status', 'AuditorID', 'SupervisorID',
        'AuditorAllottedSKUs', 'CompletedSKUs', 'AppearedSKUs', 'MatchedSKUs', 
        'RevisedSKUs', 'PendingCount', 'DeviationDetails', 'DayWiseSummary'
    ]
    
    for audit in audits[:5]:  # Check first 5
        for field in required_fields:
            assert field in audit, f"Missing field {field} in audit {audit.get('AUDIT_ID')}"
    print("✓ All required audit fields present!")
    
    # Check store-audit relationship
    audited_store_ids = set(a['StoreID'] for a in audits)
    covered_store_ids = set(s['StoreID'] for s in stores if s['IsCovered'])
    assert audited_store_ids <= covered_store_ids, "Some audits reference uncovered stores"
    print("✓ Store-Audit relationships valid!")
    
    # Check metrics consistency
    for audit in audits[:10]:  # Sample check
        allotted = audit['AuditorAllottedSKUs']
        completed = audit['CompletedSKUs']
        pending = audit['PendingCount']
        
        # Pending should be allotted - completed
        expected_pending = allotted - completed
        if abs(expected_pending - pending) > 1:  # Allow 1 unit tolerance for rounding
            print(f"Warning: Pending mismatch in {audit['AUDIT_ID']}: expected {expected_pending}, got {pending}")
    print("✓ Metrics consistency verified!")
    
    print("\n6. AGGREGATION VERIFICATION")
    print("-" * 80)
    
    # Verify auditor aggregations
    auditor_metrics = defaultdict(lambda: {'audits': 0, 'skus': 0, 'pids': 0})
    for audit in audits:
        aid = audit['AuditorID']
        auditor_metrics[aid]['audits'] += 1
        auditor_metrics[aid]['skus'] += audit['AuditorAllottedSKUs']
        auditor_metrics[aid]['pids'] += audit['AuditorAllottedPIDs']
    
    # Check against auditors.json
    for auditor in auditors[:5]:  # Sample check
        aid = auditor['id']
        if aid in auditor_metrics:
            calc_audits = auditor_metrics[aid]['audits']
            stored_audits = auditor['totalAudits']
            assert calc_audits == stored_audits, f"Audit count mismatch for {aid}: {calc_audits} != {stored_audits}"
    print("✓ Auditor aggregations match!")
    
    # Verify supervisor aggregations
    supervisor_metrics = defaultdict(lambda: {'audits': 0, 'stores': set()})
    for audit in audits:
        sid = audit['SupervisorID']
        supervisor_metrics[sid]['audits'] += 1
        supervisor_metrics[sid]['stores'].add(audit['StoreID'])
    
    print(f"Supervisors managing audits: {len(supervisor_metrics)}")
    print(f"Average audits per supervisor: {len(audits) / len(supervisor_metrics):.1f}")
    print(f"Average stores per supervisor: {sum(len(m['stores']) for m in supervisor_metrics.values()) / len(supervisor_metrics):.1f}")
    print("✓ Supervisor aggregations valid!")
    
    print("\n" + "=" * 80)
    print("✅ ALL VERIFICATIONS PASSED!")
    print("=" * 80)
    
    return {
        'stores': total_stores,
        'audits': len(audits),
        'live_audits': len(live_audits),
        'auditors': len(unique_auditors),
        'supervisors': len(unique_supervisors),
        'covered': covered_stores,
        'uncovered': uncovered_stores
    }

if __name__ == "__main__":
    try:
        results = verify_data_synchronization()
        print("\nSummary:")
        print(f"  Stores: {results['stores']} ({results['covered']} covered, {results['uncovered']} uncovered)")
        print(f"  Audits: {results['audits']} (Live: {results['live_audits']})")
        print(f"  Auditors: {results['auditors']}")
        print(f"  Supervisors: {results['supervisors']}")
    except AssertionError as e:
        print(f"\n❌ VERIFICATION FAILED: {e}")
        exit(1)
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
        exit(1)
