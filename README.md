# Cloud_Native-Project

Guides for users:

- Install the required packages.

    ``` sh
    pip install -r requirements.txt
    ```

- Crawl the data of reservoirs.

    ``` sh
    cd reservoir
    python3 reservoir.py
    ```

- Crawl the data of electricity.

    ``` sh
    cd electricity
    python3 electricity.py
    ```

- crawl the data of erathquake.

    ``` sh
    cd earthquake
    python3 erathquake.py
    ```
    - Build docker container of erathquake
    ```
    make
    ```
    - Clear docker container and image of earthquake & Clear firestore data of earthquake
    ```
    make clean
    ```

Guides for developers:
- [How to write to firestore?](/write_to_firestore.pdf)