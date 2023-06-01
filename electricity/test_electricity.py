import unittest
from service.electricity_info import ElectricityInfo
from selenium.common.exceptions import NoSuchElementException

class ElectricityTest(unittest.TestCase):
	
	@classmethod
	def setUpClass(cls):
			cls.electricity_service = ElectricityInfo()

	def test_get_web_element(self):
			url = "https://www.taiwanstat.com/realtime/power/"
			self.assertTrue(self.electricity_service.get_web_element(url), 'NoSuchElementException')
	
	def test_parse_real_time_usage(self):
			real_time_usage = self.electricity_service.parse_real_time_usage()
			self.assertEqual(len(real_time_usage['update_time']), 17)
			self.assertEqual(real_time_usage['storage_rate'][-1], "％")
			self.assertEqual(real_time_usage['regions']['all']['real_time_usage'][-1], '瓩')
			self.assertEqual(real_time_usage['regions']['all']['estimated_supply'][-1], '瓩')
			self.assertEqual(real_time_usage['regions']['all']['real_time_generation'][-1], '瓩')
			self.assertEqual(real_time_usage['regions']['all']['avg_usage_per_person'][-1], '瓦')
			self.assertEqual(real_time_usage['regions']['all']['supplied_population'][-1], '人')

if __name__ == "__main__":
	 unittest.main()