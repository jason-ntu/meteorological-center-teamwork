import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
#from google.cloud.firestore import GeoPoint

login = credentials.Certificate("./serviceAccountKey.json")

# initialize firebase
firebase_admin.initialize_app(login)

db = firestore.client()

collection_earthquake = db.collection("earthquake")
docs = db.collection('earthquake').stream()

'''
dic = {
    'each_location': {
        'south': {'PGA': '0', 'PGV': '0'},
        'middle': {'PGA': '0', 'PGV': '0'},
        'north': {'PGA': '0', 'PGV': '0'}
    },
    'time': '2023-04-20 7:00:00',
    'scale': '4',
    'depth': '5km',
    'magnitude': '6.3',
    'geopoint': '北緯,東經',
    'location': '東北方'
}
'''


def update_earthquake(dic):
    for doc in docs:
        new_id = int(doc.id) + 1
        if new_id <= 9:
            collection_earthquake.document(str(new_id)).set(doc.to_dict())
        else:
            continue
    collection_earthquake.document('0').set(dic)
