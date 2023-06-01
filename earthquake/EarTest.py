import unittest
from earthquake import ear

class EarthquakeTestCase(unittest.TestCase):
    def setUp(self):
        self.ear = ear()

    def test_crawler(self):
        self.assertIsInstance(self.ear.crawling(), list)
        print("Complete Crawler Test")

    def test_update_earthquake(self):
        self.assertEqual(self.ear.update_earthquake({}),"Done update_earthquake.")
        print("Complete update_earthquake Test")
    
    def test_update(self):
        self.assertEqual(self.ear.update([]),"Done update.")
        print("Complete update Test")
    
    def tearDown(self):
        pass

if __name__ == '__main__': # pragma: no cover
    unittest.main()
