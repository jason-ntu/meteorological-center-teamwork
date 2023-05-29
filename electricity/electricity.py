from service.electricity_info import ElectricityInfo
import json
import datetime

def crawl():
	electricity_info = ElectricityInfo()
	real_time_usage = electricity_info.get_real_time_usage("https://www.taiwanstat.com/realtime/power/")
	electricity_info.update_real_time_usage(real_time_usage)
	json_formatted_str = json.dumps(real_time_usage, indent=2, ensure_ascii=False).encode('utf8')
	# print(json_formatted_str.decode())

if __name__ == '__main__':
	# while True:
	# 	now = datetime.datetime.now()
	# 	if now.minute == 10:
	# 		crawl()
	crawl()