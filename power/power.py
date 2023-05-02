from service.power_info import PowerInfo
import json

power_info = PowerInfo()
real_time_usage = power_info.get_real_time_usage("https://www.taiwanstat.com/realtime/power/")
power_info.update_real_time_usage(real_time_usage)
json_formatted_str = json.dumps(real_time_usage, indent=2, ensure_ascii=False).encode('utf8')
print(json_formatted_str.decode())