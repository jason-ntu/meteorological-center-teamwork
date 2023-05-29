import unittest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

class ElectricityTest(unittest.TestCase):
	def setUp(self):
			chrome_options = Options()
			chrome_options.add_argument('user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36"')
			chrome_options.add_argument('--headless')
			chrome_options.add_argument("--enable-javascript")
			chrome_options.add_argument("--no-sandbox")
			chrome_options.add_argument('--disable-dev-shm-usage')
			self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=chrome_options)
	
	def test_element(self):
			self.driver.get("https://www.taiwanstat.com/realtime/power/")
			update_time = self.driver.find_element(By.CSS_SELECTOR, '#main-content > div.note > li.update-at').text[5:-7]
			storage_rate = self.driver.find_element(By.CSS_SELECTOR, '#main-content > div.note > li:nth-child(3) > span').text
			info = self.driver.find_elements(By.CLASS_NAME, 'gauge-container')
			assert len(update_time) == 17
			assert storage_rate[-1] == "％"
			assert len(info) == 5
	def tearDown(self):
			self.driver.close()

if __name__ == "__main__":
	 unittest.main()