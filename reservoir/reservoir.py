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
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

login = credentials.Certificate("../serviceAccountKey.json")
# initialize firebase
firebase_admin.initialize_app(login)
db = firestore.client()
collection_reservoir = db.collection("reservoir")

class Reservoir:
    options = Options()
    def __init__(self): # pragma: no cover
        self.options.add_argument('--headless')
        self.options.add_argument("--incognito")
        self.options.add_argument("--nogpu")
        self.options.add_argument("--disable-gpu")
        self.options.add_argument("--window-size=1280,1280")
        self.options.add_argument("--no-sandbox")
        self.options.add_argument("--enable-javascript")
        self.options.add_experimental_option('useAutomationExtension', False)
        self.options.add_argument('--disable-blink-features=AutomationControlled')

    def update(self):
        now = datetime.datetime.now()
        if now.minute == 0:
            self.crawl(now)
        time.sleep(60)

    def update_firebase(self, id, amount, percentage, time):
        key = 'reservoir' + str(id)
        dic = {
            key: {
                'amount': amount,
                'percentage': percentage,
                'time': time
            }
        }
        collection_reservoir.document('last').update(dic)
        return "successfully update"

    def get_targetInfo(self,driver):
        reservoirs = ["石門水庫","寶山第二水庫","永和山水庫","鯉魚潭水庫","德基水庫","南化水庫","曾文水庫","烏山頭水庫"]
        results = []
        table = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH,'//*[@id="ctl00_cphMain_gvList"]')))
        rows = table.find_elements(By.XPATH,'.//tr')
        index = 0
        for row in rows:
            cells = row.find_elements(By.XPATH,'.//td')
            if(len(cells)>0):
                if cells[0].text in reservoirs:
                    info = []
                    info.append(str(index))
                    info.append(cells[6].text)
                    info.append(cells[7].text)
                    info.append(cells[1].text)
                    results.append(info)
                    index = index + 1

        for info in results:
            self.update_firebase(info[0], info[1], info[2], info[3])
            print("reservoir", end=' ')
            print(info)

    def crawl(self, now):
        ua = UserAgent()
        userAgent = ua.random

        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=self.options)
        driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        driver.execute_cdp_cmd('Network.setUserAgentOverride', {"userAgent": userAgent})

        locator = (By.ID, "table")
        driver.get('https://fhy.wra.gov.tw/ReservoirPage_2011/Statistics.aspx')
        wait = WebDriverWait(driver, 10)

        print("------------------------------------------------------------")
        self.get_targetInfo(driver)
        driver.close()

if __name__ == '__main__': # pragma: no cover
    _reservior = Reservoir()
    while True:
        _reservior.update()