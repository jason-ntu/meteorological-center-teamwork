from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import StaleElementReferenceException
from fake_useragent import UserAgent
import datetime
import time

def get_info(driver):
    reservoirs = ["石門水庫","寶山第二水庫","永和山水庫","鯉魚潭水庫","德基水庫","南化水庫","曾文水庫","烏山頭水庫"]
    results = []
    table = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH,'//*[@id="ctl00_cphMain_gvList"]')))
    rows = table.find_elements(By.XPATH,'.//tr')
    # 水情時間[1]、有效蓄水量(萬立方公尺)[6]、蓄水百分比(%)[7]
    for row in rows:
        cells = row.find_elements(By.XPATH,'.//td')
        if(len(cells)>0):
            if cells[0].text in reservoirs:
                info = []
                info.append(cells[0].text)
                info.append(cells[1].text)
                info.append(cells[6].text)
                info.append(cells[7].text)
                results.append(info)
    for info_list in results:
        print(info_list)

if __name__ == '__main__':
    options = Options()
    options.add_argument('--headless')
    options.add_argument("--incognito")
    options.add_argument("--nogpu")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1280,1280")
    options.add_argument("--no-sandbox")
    options.add_argument("--enable-javascript")
    options.add_experimental_option('useAutomationExtension', False)
    options.add_argument('--disable-blink-features=AutomationControlled')

    # 創建一個ChromeDriver對象

    ua = UserAgent()
    userAgent = ua.random

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    driver.execute_cdp_cmd('Network.setUserAgentOverride', {"userAgent": userAgent})

    locator = (By.ID, "table")
    driver.get('https://fhy.wra.gov.tw/ReservoirPage_2011/Statistics.aspx')
    wait = WebDriverWait(driver, 10)

    print("\n水庫    水情時間    有效蓄水量(萬立方公尺)    蓄水百分比(%)")
    print("----------------------------------------------------------")
    for i in range(0,8):
        select_year = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="ctl00_cphMain_ucDate_cboYear"]')))
        select_month = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="ctl00_cphMain_ucDate_cboMonth"]')))
        select_day = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="ctl00_cphMain_ucDate_cboDay"]')))

        today = datetime.date.today()
        offset = datetime.timedelta(days=i)
        proc_day = today - offset

        if proc_day.month == 2 and proc_day.day == 29 and not (proc_day.year % 4 == 0 and (proc_day.year % 100 != 0 or proc_day.year % 400 == 0)):
            proc_day = proc_day.replace(day=28)
        elif proc_day.month in (4, 6, 9, 11) and proc_day.day == 31:
            proc_day = proc_day.replace(day=30)
        print(proc_day.strftime('%Y-%m-%d'), end = " ..... ")

        select = Select(select_year)
        select.select_by_value(str(proc_day.year))
        select = Select(select_month)
        select.select_by_value(str(proc_day.month))
        select = Select(select_day)
        select.select_by_value(str(proc_day.day))
        btn_query = wait.until(EC.element_to_be_clickable((By.ID, 'ctl00_cphMain_btnQuery')))
        btn_query.click()
        while True:
            try:
                btn_query.get_attribute('class')
            except StaleElementReferenceException:
                print('searching done')
                break
        get_info(driver)
        print()

    driver.close()