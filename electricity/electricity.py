from service.electricity_info import ElectricityInfo
import json

electricity_info = ElectricityInfo()
real_time_usage = electricity_info.get_real_time_usage("https://www.taiwanstat.com/realtime/power/")
electricity_info.update_real_time_usage(real_time_usage)
json_formatted_str = json.dumps(real_time_usage, indent=2, ensure_ascii=False).encode('utf8')
print(json_formatted_str.decode())