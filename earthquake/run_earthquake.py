from earthquake import ear

crawl = ear()
all_data = crawl.crawling()
crawl.update(all_data)
while True:   
    s = crawl.crawling()
    if all_data != s:
        all_data = s
        crawl.update(all_data)
    else:
        print("Already up to date.")

driver.close()