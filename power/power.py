from firestore import electricity
from browser.chrome import Chrome
from constant.field import Field
import json

driver = Chrome.get_driver()
real_time_usage = Chrome.get_real_time_usage(driver,"https://www.taiwanstat.com/realtime/power/")
print(real_time_usage)
json_formatted_str = json.dumps(real_time_usage, indent=2, ensure_ascii=False).encode('utf8')
print(json_formatted_str.decode())

electricity.update_time(real_time_usage["update_time"])
electricity.update_storage_rate(real_time_usage["storage_rate"])

for region, detail in real_time_usage["regions"].items():
	electricity.update_region(region, 
			  detail[Field.avg_usage_per_person.name],
			  detail[Field.estimated_supply.name],
			  detail[Field.real_time_generation.name],
				detail[Field.real_time_usage.name],
				detail[Field.supplied_population.name])