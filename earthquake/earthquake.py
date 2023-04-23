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
import requests
import urllib
import re
import json
import math
import hashlib
import time

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


data = []

def crawler():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=options)
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
        else:
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

    # for i in latest_week:
    #     print(i)
    return latest_week[0]

data = crawler()
while True:   
    s = crawler()
    if data != s:
        data = s
        print("1")
    else:
        print("0")

# crawler()

driver.close()