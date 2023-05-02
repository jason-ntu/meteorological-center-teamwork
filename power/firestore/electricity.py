import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

login = credentials.Certificate("/Users/afrithero/Coding_Projects/Python/Cloud_Native-Project/power/firestore/serviceAccountKey.json")

# initialize firebase
firebase_admin.initialize_app(login)

db = firestore.client()
collection_electricity = db.collection("electricity")

def update_region(region, avg_usage_per_person, estimated_supply, real_time_generation, real_time_usage, supplied_population):
    key = 'region.' + region
    dic = {
        key: {
            'avg_usage_per_person': avg_usage_per_person,
            'estimated_supply': estimated_supply,
            'real_time_generation': real_time_generation,
            'real_time_usage': real_time_usage,
            'supplied_population': supplied_population
        }
    }
    collection_electricity.document('last').update(dic)


def update_storage_rate(storage_rate):
    dic = {'storage_rate': storage_rate}
    collection_electricity.document('last').update(dic)


def update_time(update_time):
    dic = {'update_time': update_time}
    collection_electricity.document('last').update(dic)
