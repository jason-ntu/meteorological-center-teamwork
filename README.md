# Cloud_Native-Project

![CI](https://github.com/jhwu0513/Cloud_Native-Project/actions/workflows/CI.yml/badge.svg)
## How to use

- Start all the services.

    ``` sh
    docker-compose up
    ```

- Close all the services.

    ``` sh
    docker-compose up
    ```

- Crawler services
  - There are three crawler services for crawling information about earthquake, electricity, and reservoir, respectively.
  - The crawled data are stored into collections (with corresponding names) in firestore dadabase.

- Alarm service
  - This service generates alarms according to the data provided in firebase collections.
  - The generated alarms are stored back into a collection named alarms.
  - Raw alarms can be found on [3031 port of localhost](http://localhost:3001). The preview will update instantly without refreshment.
  - Each alarm in firebase contains the following fields:    
      - description: this will be shown on homepage.
      - order: start from 1, keep growing until larger than 10, and then the field will be deleted.
      - service：value of either "svc_earthquake", "svc_electricity", or "svc_reservoir".
      - severity：value of either "low", "medium", or "high".
  - New alarms will be generated automatically when there is an update of any collection or there is a refreshment of the page on [3031 port of localhost](http://localhost:3001).
  - FIXME: 
      - [ ] 畫面重新整理時不應該進行偵測
      - [ ] order 會重複
      - [ ] order 會超過10但沒被刪除
  - TODO:
      - [ ] 水庫名稱要 mapping
      - [ ] 加入彈跳通知

- UI service
  - The UI is available on [3000 port of localhost](http://localhost:3000).
  - homepage: provides the information of the top 10 alarms, as shown below:
      ![homepage](./img/homepage.jpg)
  - earthquake, electricity, and reservoir pages will show the corresponding information.

---
## User Story

```
FEATURE: 網站導覽
AS A 使用者
I WANT 快速瞭解網站有哪些頁面
SO THAT 我可以找到自己要的資料

GIVEN 我正在網站裡
WHEN 進入首頁
THEN 應該要看到水庫資訊、電力資訊跟地震資訊的按鍵

GIVEN 我正在網站首頁
WHEN 點擊進入某個頁面的按鍵
THEN 應該要進入相對應的頁面
```

```
FEATURE: 回到首頁
AS A 使用者
I WANT 回到網站首頁
SO THAT 我可以進到其他頁面

GIVEN 我正在某一個子頁面
WHEN 我滑到頁面上特定的區域
THEN 應該要看到「首頁」按鍵

GIVEN 我正在某一個頁面
WHEN 點擊「首頁」
THEN 我應該回到網站首頁
```

```
FEATURE: 水庫剩餘量監控
AS A 廠務工程師
I WANT 即時查看水庫剩餘水量
SO THAT 我可以評估可能的供水危機

GIVEN 我正在網站首頁
WHEN 我進入水庫資訊頁面
THEN 應該要看到各水庫的剩餘水量及百分比
```

```
FEATURE: 電力負載狀況監控
AS A 廠務工程師
I WANT 即時查看電力負載狀況
SO THAT 我可以評估可能的供電危機

GIVEN 我正在網站首頁
WHEN 我進入電力頁面
THEN 應該要看到各地的即時供電量、用電量、供應人數以及人均用電量
```

```
FEATURE: 地震震度監控
AS A 廠務工程師
I WANT 查看最近的地震紀錄
SO THAT 我可以評估目前各地災情

GIVEN 我正在網站首頁
WHEN 我進入地震頁面
THEN 應該要看到近期地震之位置、深度、規模、強度
```

```
FEATURE: 警示水量異常
AS A 廠務工程師
I WANT 即時收到水量警示
SO THAT 我可以根據警示調整工廠的用水計畫

GIVEN 我正在網站裡
WHEN 某水庫剩餘水量低於30%或高於90%、低於20%、低於10%
THEN 網站分別會顯示輕微、中等、嚴重的水情警示
```

```
FEATURE: 警示電力不足
AS A 廠務工程師
I WANT 即時收到缺電警示
SO THAT 我可以根據警示調整工廠的用電策略

GIVEN 我正在網站裡
WHEN 剩餘電量少於 10%、6%、3%
THEN 網站分別會顯示輕微、中等、嚴重的缺電警示
```

```
FEATURE: 警示地震
AS A 廠務工程師
I WANT 即時收到地震警示
SO THAT 我可以根據警示制定緊急應對計劃

GIVEN 我正在網站裡
WHEN 地震發生
THEN 網站應該跳出地震警示

GIVEN 我正在網站裡
WHEN 地震發生且震度大於3級、4級、5級
THEN 網站分別會顯示輕微、中等、嚴重的地震警示
```
