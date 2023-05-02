from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from constant.field import Field
from model import electricity

class PowerInfo:
		
		def __init__(self):
			pass

		def __get_driver(self): 
			chrome_options = Options()
			chrome_options.add_argument('user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36"')
			chrome_options.add_argument('--headless')
			chrome_options.add_argument("--enable-javascript")
			chrome_options.add_argument("--no-sandbox")
			driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=chrome_options)
			return driver
	
		def get_real_time_usage(self, url):
			driver = self.__get_driver()
			driver.get(url)
			update_time = driver.find_element(By.CSS_SELECTOR, '#main-content > div.note > li.update-at').text[5:-7]
			storage_rate = driver.find_element(By.CSS_SELECTOR, '#main-content > div.note > li:nth-child(3) > span').text
			real_time_usage = {"update_time":update_time,"storage_rate":storage_rate}

			real_time_usage_detail = {"all":None, "north":None, "west":None, "east":None, "south":None}
			for i in driver.find_elements(By.CLASS_NAME, 'gauge-container'):
				detail = {}
				raw = i.text.split("\n")
				for j in range(4,9,1):
					info = raw[j].split("：")
					key = info[0]
					if "用電" in key:
						key = Field.real_time_usage.name
					elif "供電" in key:
						key = Field.estimated_supply.name
					elif "發電" in key:
						key = Field.real_time_generation.name
					elif "人均耗電" in key:
						key = Field.avg_usage_per_person.name
					elif "供給人數" in key:
						key = Field.supplied_population.name
					value = info[1]
					detail[key] = value
				if "全台灣" in raw[0]:
					real_time_usage_detail["all"] = detail
				elif "北部" in raw[0]:
					real_time_usage_detail["north"] = detail
				elif "中部" in raw[0]:
					real_time_usage_detail["west"] = detail
				elif "南部" in raw[0]:
					real_time_usage_detail["south"] = detail
				elif "東部" in raw[0]:
					real_time_usage_detail["east"] = detail
			real_time_usage["regions"] = real_time_usage_detail
			
			driver.close()
			
			return real_time_usage
		
		def update_real_time_usage(self, real_time_usage):
			electricity.update_time(real_time_usage["update_time"])
			electricity.update_storage_rate(real_time_usage["storage_rate"])

			for region, detail in real_time_usage["regions"].items():
				electricity.update_region(region, 
							detail[Field.avg_usage_per_person.name],
							detail[Field.estimated_supply.name],
							detail[Field.real_time_generation.name],
							detail[Field.real_time_usage.name],
							detail[Field.supplied_population.name])
