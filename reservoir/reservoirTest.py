from unittest import TestCase, mock
from unittest.mock import MagicMock, patch
from datetime import datetime
from freezegun import freeze_time
from reservoir import Reservoir
import io

class ReserviorTestCase(TestCase):

    def setUp(self):
        self.reservoir = Reservoir()

    @freeze_time("2023-06-01 10:00:00")
    @patch.object(Reservoir, 'crawl')
    def test_update_minute_zero(self, mock_crawl):
        self.reservoir.update()
        mock_crawl.assert_called_once_with(datetime(2023, 6, 1, 10, 0, 0))

    @freeze_time("2023-06-01 10:30:00")
    @patch.object(Reservoir, 'crawl')
    def test_update_minute_n_zero(self, mock_crawl):
        self.reservoir.update()
        mock_crawl.assert_not_called()

    def test_update_firebase(self):
        self.assertEqual(self.reservoir.update_firebase('0', '9,332.75', '45.47 %', '2023-06-01 16:00:00'), "successfully update")

    @patch("sys.stdout", new_callable=io.StringIO)
    @patch.object(Reservoir, 'update_firebase')
    def test_get_targetInfo(self, mock_update_firebase, mock_stdout):
        reservoir_data = ("石門水庫", "time", "fake", "fake", "fake", "fake", "amount", "percentage")
        mock_driver = MagicMock()
        mock_table = MagicMock()
        mock_row = MagicMock()
        mock_cells = [MagicMock() for _ in range(8)]

        for i in range(0,8):
            mock_cells[i].text = reservoir_data[i]

        mock_driver.find_element.return_value = mock_table
        mock_table.find_elements.return_value = [mock_row]
        mock_row.find_elements.return_value = mock_cells

        self.reservoir.get_targetInfo(mock_driver)
        self.assertEqual(mock_update_firebase.call_count, 1)
        self.assertEqual(mock_stdout.getvalue(), "reservoir ['0', 'amount', 'percentage', 'time']\n")

    @patch("sys.stdout", new_callable=io.StringIO)
    @patch('selenium.webdriver.Chrome')
    @patch.object(Reservoir, 'get_targetInfo')
    def test_crawl(self, mock_get_targetInfo, mock_chrome, mock_stdout):
        mock_driver = mock.Mock()
        mock_chrome.return_value = mock_driver

        self.reservoir.crawl(datetime(2023, 6, 1, 10, 0, 0))
        self.assertEqual(mock_get_targetInfo.call_count, 1)

        mock_chrome.assert_called_once_with(service=mock.ANY, options=self.reservoir.options)
        mock_driver.get.assert_called_once_with('https://fhy.wra.gov.tw/ReservoirPage_2011/Statistics.aspx')

        mock_driver.close.assert_called_once()
