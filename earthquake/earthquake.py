from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from fake_useragent import UserAgent
from datetime import datetime, timedelta
from geopy.distance import geodesic
from dateutil.parser import parse
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import requests
import urllib
import re
import json
import math
import hashlib
import time

login = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(login)
db = firestore.client()
collection_earthquake = db.collection("earthquake")


class ear:
    options = Options()
    def __init__(self):
        self.options.add_argument('--headless')
        self.options.add_argument('--no-sandbox')
        self.options.add_argument('--disable-gpu')
        self.options.add_argument('--window-size=1920,1080')
        self.options.add_argument('--ignore-certificate-errors')
        self.options.add_argument('--disable-extensions')
        self.options.add_argument('--disable-dev-shm-usage')

    def crawling(self):
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=self.options)
        ua = UserAgent()
        userAgent = ua.random
        driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        driver.execute_cdp_cmd('Network.setUserAgentOverride', {"userAgent": userAgent})

        locator = (By.ID, "table")
        driver.get('https://scweb.cwb.gov.tw/zh-tw/earthquake/data/')
        content = driver.execute_script('return document.getElementById("table").innerText;')
        html_content = driver.execute_script('return document.body.innerHTML')
        content = content.replace("\n", "")
        m = hashlib.md5()
        m.update(content.encode("utf-8"))
        hash_val = m.hexdigest()

        # print(content)
        data = content.split('\t')
        # print(data)
        data = data[6:]
        latest_week = []
        earthquake = []
        for i in range(len(data)//5):
            earthquake.append(data[5*i:5*i+5])
        # print(earthquake)

        
        for row in earthquake:
            timestamp = parse(row[1])
            now = datetime.now()
            one_week_ago = now - timedelta(days=7)
            if timestamp >= one_week_ago and timestamp <= now:
                latest_week.append(row)

        anchor = "https://scweb.cwb.gov.tw/zh-tw/earthquake/details/"

        # print(content)
        soup = BeautifulSoup(html_content, "html.parser")
        table = soup.find("table", {"id": "table"})
        table = soup.find("tbody")
        rows = table.find_all("tr")


        i = 0
        for row in rows:
            if i < len(latest_week):
                onclick_content = str(row.get("onclick"))
                # print(onclick_content)
                index = onclick_content.rfind("/") + 1
                result = onclick_content[index:-2]
                target = anchor + result
                # print(target)
                driver.get(target)
                text = driver.find_elements(By.CLASS_NAME, 'text')
                # print(text.get_attribute("innerHTML"))
                data = text[1].get_attribute("innerHTML").split()
                latest_week[i].append((data[1],data[-2])) #(北緯,東經)
                i = i + 1
            else: # pragma: no cover
                break

        list_of_factory = [[24.2115,120.618,1.063,1.0],[24.773,121.01,1.758,1.0],[23.1135,120.272,1.968,1.0]]

        for j in range(len(latest_week)):
            Location = [[], [], []] # [[中] [竹] [南]]
            for i in range(3):
                M = float(latest_week[j][2])
                dis = geodesic((list_of_factory[i][0],list_of_factory[i][1]), latest_week[j][-1]).km
                r = (dis**2 + float(latest_week[j][3]))**0.5
                s = list_of_factory[i][2]
                p = list_of_factory[i][-1]
                result = 1.657*math.exp(1.533*M)*(r**-1.607)*s*p
                Location[i].append(result)
                Location[i].append(result/8.6561)
            latest_week[j].append(Location)
        return latest_week
    
    def update_earthquake(self,dic):
        old = []
        docs = db.collection('earthquake').stream()
        for doc in docs:
            old.append(doc.to_dict())
        if len(old) <= 9: # pragma: no cover
            for i in range(len(old)):
                new_id = i+1
                collection_earthquake.document(str(new_id)).set(old[i])
        else:
            for i in range(9):
                new_id = i+1
                collection_earthquake.document(str(new_id)).set(old[i])
        collection_earthquake.document('0').set(dic)
        return "Done update_earthquake."
    
    def update(self,upload):
        upload_data = upload[:]
        upload_data.reverse()
        for _data in upload_data: # pragma: no cover
            dic = {
                'each_location': { # [[中] [北] [南]]
                    'south': {'PGA': str(_data[-1][-1][0]), 'PGV': str(_data[-1][-1][1])},
                    'middle': {'PGA': str(_data[-1][0][0]), 'PGV': str(_data[-1][0][1])},
                    'north': {'PGA': str(_data[-1][1][0]), 'PGV': str(_data[-1][1][1])}
                }, 
                'time': _data[1], 
                'scale': _data[2],
                'depth': _data[3], 
                'magnitude': _data[0], 
                'geopoint': '北緯' + _data[5][0] + ', 東經' + _data[5][1], 
                'location': _data[4] 
            }
            # [最大震度(string),台灣時間(string),規模(string),深度(string),位置(string),
            # (北緯(string),東京(string)),
            # [ [PGA(string),PGV(string)](中) , [PGA(string),PGV(string)](北) , [PGA(string),PGV(string)](南)] 
            # ]
            self.update_earthquake(dic)
        return "Done update."
    

# options = Options()
# options.add_argument('--headless')
# options.add_argument('--no-sandbox')
# options.add_argument('--disable-gpu')
# options.add_argument('--window-size=1920,1080')
# options.add_argument('--ignore-certificate-errors')
# options.add_argument('--disable-extensions')
# options.add_argument('--disable-dev-shm-usage')


# all_data = []
# def update_earthquake(dic):
#     old = []
#     docs = db.collection('earthquake').stream()
#     for doc in docs:
#         old.append(doc.to_dict())
#     if len(old) <= 9:
#         for i in range(len(old)):
#             new_id = i+1
#             collection_earthquake.document(str(new_id)).set(old[i])
#     else:
#         for i in range(9):
#             new_id = i+1
#             collection_earthquake.document(str(new_id)).set(old[i])
#     collection_earthquake.document('0').set(dic)

# def crawler():
#     driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=options)
#     ua = UserAgent()
#     userAgent = ua.random
#     driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
#     driver.execute_cdp_cmd('Network.setUserAgentOverride', {"userAgent": userAgent})

#     locator = (By.ID, "table")
#     driver.get('https://scweb.cwb.gov.tw/zh-tw/earthquake/data/')
#     content = driver.execute_script('return document.getElementById("table").innerText;')
#     html_content = driver.execute_script('return document.body.innerHTML')
#     content = content.replace("\n", "")
#     m = hashlib.md5()
#     m.update(content.encode("utf-8"))
#     hash_val = m.hexdigest()

#     # print(content)
#     data = content.split('\t')
#     # print(data)
#     data = data[6:]
#     latest_week = []
#     earthquake = []
#     for i in range(len(data)//5):
#         earthquake.append(data[5*i:5*i+5])
#     # print(earthquake)

    
#     for row in earthquake:
#         timestamp = parse(row[1])
#         now = datetime.now()
#         one_week_ago = now - timedelta(days=7)
#         if timestamp >= one_week_ago and timestamp <= now:
#             latest_week.append(row)

#     anchor = "https://scweb.cwb.gov.tw/zh-tw/earthquake/details/"

#     # print(content)
#     soup = BeautifulSoup(html_content, "html.parser")
#     table = soup.find("table", {"id": "table"})
#     table = soup.find("tbody")
#     rows = table.find_all("tr")


#     i = 0
#     for row in rows:
#         if i < len(latest_week):
#             onclick_content = str(row.get("onclick"))
#             # print(onclick_content)
#             index = onclick_content.rfind("/") + 1
#             result = onclick_content[index:-2]
#             target = anchor + result
#             # print(target)
#             driver.get(target)
#             text = driver.find_elements(By.CLASS_NAME, 'text')
#             # print(text.get_attribute("innerHTML"))
#             data = text[1].get_attribute("innerHTML").split()
#             latest_week[i].append((data[1],data[-2])) #(北緯,東經)
#             i = i + 1
#         else:
#             break

#     list_of_factory = [[24.2115,120.618,1.063,1.0],[24.773,121.01,1.758,1.0],[23.1135,120.272,1.968,1.0]]

#     for j in range(len(latest_week)):
#         Location = [[], [], []] # [[中] [竹] [南]]
#         for i in range(3):
#             M = float(latest_week[j][2])
#             dis = geodesic((list_of_factory[i][0],list_of_factory[i][1]), latest_week[j][-1]).km
#             r = (dis**2 + float(latest_week[j][3]))**0.5
#             s = list_of_factory[i][2]
#             p = list_of_factory[i][-1]
#             result = 1.657*math.exp(1.533*M)*(r**-1.607)*s*p
#             Location[i].append(result)
#             Location[i].append(result/8.6561)
#         latest_week[j].append(Location)
#     return latest_week

# def update(upload):
#     upload_data = upload[:]
#     upload_data.reverse()
#     for _data in upload_data:
#         dic = {
#             'each_location': { # [[中] [北] [南]]
#                 'south': {'PGA': str(_data[-1][-1][0]), 'PGV': str(_data[-1][-1][1])},
#                 'middle': {'PGA': str(_data[-1][0][0]), 'PGV': str(_data[-1][0][1])},
#                 'north': {'PGA': str(_data[-1][1][0]), 'PGV': str(_data[-1][1][1])}
#             }, 
#             'time': _data[1], 
#             'scale': _data[2],
#             'depth': _data[3], 
#             'magnitude': _data[0], 
#             'geopoint': '北緯' + _data[5][0] + ', 東經' + _data[5][1], 
#             'location': _data[4] 
#         }
#         # [最大震度(string),台灣時間(string),規模(string),深度(string),位置(string),
#         # (北緯(string),東京(string)),
#         # [ [PGA(string),PGV(string)](中) , [PGA(string),PGV(string)](北) , [PGA(string),PGV(string)](南)] 
#         # ]
#         update_earthquake(dic)

# all_data = crawler()
# update(all_data)
# while True:   
#     s = crawler()
#     if all_data != s:
#         all_data = s
#         update(all_data)
#     else:
#         print("Already up to date.")

# driver.close()