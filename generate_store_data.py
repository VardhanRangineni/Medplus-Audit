import json
import random
import math

# File paths
INPUT_FILE = r'c:\Users\win\Documents\Medplus-Audit\src\data\store_coverage_data.json'
OUTPUT_FILE = r'c:\Users\win\Documents\Medplus-Audit\src\data\store_coverage_data.json'

def generate_data():
    try:
        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            stores = json.load(f)
    except FileNotFoundError:
        print("Input file not found.")
        return

    # Process each store
    for store in stores:
        # 1. Base Inventory Metrics
        store['TotalSKUs'] = random.randint(1500, 5000)
        store['TotalQuantity'] = store['TotalSKUs'] * random.randint(20, 80)
        avg_price = random.uniform(50, 300)
        store['InventoryValue'] = round(store['TotalQuantity'] * avg_price, 2)
        
        # 2. Audit Status & Types
        store['LastAuditStatus'] = random.choice(['Completed', 'Completed', 'Completed', 'In Progress', 'Pending'])
        store['LastAuditJobType'] = random.choice(['Full Audit', 'Select SKUs', 'Specific Criteria'])
        store['LastAuditProcessType'] = random.choice(['Batch Audit', 'Product Audit'])
        
        if store['LastAuditStatus'] == 'Pending':
            store['LastAuditDate'] = None
            store['DaysSinceLastAudit'] = random.randint(300, 600)
            store['Deviations'] = []
            store['RevisedSKUs'] = 0
            store['MatchedSKUs'] = 0
            store['AppearedSKUs'] = 0
            store['RevisedValue'] = 0
            store['MatchedValue'] = 0
            store['AppearedValue'] = 0
            store['TotalDeviationCount'] = 0
            store['TotalDeviationValue'] = 0
            continue

        # 3. Deviation Metrics
        # "Revised" = Final Deviations (Short/Excess)
        # "Matched" = Mismatches (Contra/Rectified)
        # "Appeared" = Total initial issues = Revised + Matched
        
        revised_rate = random.uniform(0.01, 0.05) # 1-5%
        matched_rate = random.uniform(0.01, 0.05) # 1-5%
        
        revised_skus = int(store['TotalSKUs'] * revised_rate)
        matched_skus = int(store['TotalSKUs'] * matched_rate)
        appeared_skus = revised_skus + matched_skus
        
        revised_value = round(revised_skus * avg_price * random.uniform(0.8, 1.2), 2)
        matched_value = round(matched_skus * avg_price * random.uniform(0.8, 1.2), 2)
        appeared_value = revised_value + matched_value
        
        store['RevisedSKUs'] = revised_skus
        store['MatchedSKUs'] = matched_skus
        store['AppearedSKUs'] = appeared_skus
        
        store['RevisedValue'] = revised_value
        store['MatchedValue'] = matched_value
        store['AppearedValue'] = appeared_value
        
        # User requested: "TOTAL IS SUM OF DEVIATIONS AND MISMATCHES"
        store['TotalDeviationCount'] = appeared_skus 
        store['TotalDeviationValue'] = appeared_value
        
        # 4. Generate Detailed Deviations Array
        deviations_list = []
        
        # Product forms available
        PRODUCT_FORMS = ["Tablets", "Liquids", "Injection", "Ointments", "Powders", "Drops", "Inhalers", "Containers", "General", "Surgicals"]
        
        # Helper function to generate product form breakdown
        def generate_product_forms(total_count, total_value):
            forms = []
            remaining_count = total_count
            remaining_value = total_value
            
            # Randomly select 3-7 product forms
            num_forms = random.randint(3, min(7, len(PRODUCT_FORMS)))
            selected_forms = random.sample(PRODUCT_FORMS, num_forms)
            
            for idx, form in enumerate(selected_forms):
                if idx == len(selected_forms) - 1:
                    # Last form gets remaining
                    form_count = remaining_count
                    form_value = remaining_value
                else:
                    # Distribute randomly but ensure we have enough left
                    max_count = max(1, remaining_count - (len(selected_forms) - idx - 1))
                    form_count = random.randint(1, max_count)
                    form_value = round((form_count / total_count) * total_value, 2)
                    remaining_count -= form_count
                    remaining_value -= form_value
                
                forms.append({
                    "ProductForm": form,
                    "Count": form_count,
                    "Value": round(form_value, 2)
                })
            
            return forms
        
        # Revised Breakdown (Short vs Excess)
        short_count = int(revised_skus * 0.7)
        excess_count = revised_skus - short_count
        
        if short_count > 0:
            short_value = round(short_count * avg_price * 1.1, 2)
            deviations_list.append({
                "type": "Short",
                "count": short_count,
                "value": short_value,
                "ProductForms": generate_product_forms(short_count, short_value)
            })
        if excess_count > 0:
            excess_value = round(excess_count * avg_price * 0.9, 2)
            deviations_list.append({
                "type": "Excess",
                "count": excess_count,
                "value": excess_value,
                "ProductForms": generate_product_forms(excess_count, excess_value)
            })
            
        # Matched Breakdown (Contra Short vs Contra Excess)
        contra_short_count = int(matched_skus * 0.6)
        contra_excess_count = matched_skus - contra_short_count
        
        if contra_short_count > 0:
            contra_short_value = round(contra_short_count * avg_price * 1.05, 2)
            deviations_list.append({
                "type": "Contra Short",
                "count": contra_short_count,
                "value": contra_short_value,
                "ProductForms": generate_product_forms(contra_short_count, contra_short_value)
            })
        if contra_excess_count > 0:
            contra_excess_value = round(contra_excess_count * avg_price * 0.95, 2)
            deviations_list.append({
                "type": "Contra Excess",
                "count": contra_excess_count,
                "value": contra_excess_value,
                "ProductForms": generate_product_forms(contra_excess_count, contra_excess_value)
            })
            
        store['Deviations'] = deviations_list
        
        # Recency (Keep somewhat random but tied to date)
        if not store.get('LastAuditDate'):
             store['LastAuditDate'] = 1735880235560 - random.randint(0, 30000000000)

    # Write back
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(stores, f, indent=2)

    print(f"Successfully processed {len(stores)} stores.")

if __name__ == "__main__":
    generate_data()
