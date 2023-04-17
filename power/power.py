from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

def chrome_driver():
    # Chrome 瀏覽器參數設定
    chrome_options = Options()
    chrome_options.add_argument('user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36"')
    chrome_options.add_argument('--headless')
    chrome_options.add_argument("--enable-javascript")
    chrome_options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=chrome_options)
    return driver

driver = chrome_driver()
driver.get("https://www.taipower.com.tw/tc/page.aspx?mid=206&cid=403&cchk=1f5269ec-633e-471c-9727-22345366f0be")
ifram_loc = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '/html/body/form/div[5]/div[3]/div[2]/div/div[4]/div[1]/div/div/p/iframe')))

driver.switch_to.frame(ifram_loc)

region_code = ['n','c','s','e']
today_usage_by_region = {region: None for region in region_code}

for region in region_code:
    usage = {"今日發電":None, "今日用電":None}
    raw = driver.find_element(By.CSS_SELECTOR, '#genloadcol_{}'.format(region)).text
    power_total = raw.split("\n")[-2]
    power_usage = raw.split("\n")[-1]
    usage["今日發電"] = power_total
    usage["今日用電"] = power_usage
    today_usage_by_region[region] = usage

driver.get("https://www.taiwanstat.com/realtime/power/")

update_time = driver.find_element(By.CSS_SELECTOR, '#main-content > div.note > li.update-at').text[5:-7]
storage_rate = driver.find_element(By.CSS_SELECTOR, '#main-content > div.note > li:nth-child(3) > span').text
real_time_usage = {"update_time":update_time,"storage_rate":storage_rate}

real_time_usage_detail = {}
for i in driver.find_elements(By.CLASS_NAME, 'gauge-container'):
	detail = {}
	raw = i.text.split("\n")
	for j in range(4,9,1):
		info = raw[j].split("：")
		key = info[0]
		value = info[1]
		detail[key] = value
	real_time_usage_detail[raw[0]] = detail
real_time_usage["region"] = real_time_usage_detail

print(today_usage_by_region)
print(real_time_usage)