import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
#from google.cloud.firestore import GeoPoint

login = credentials.Certificate("./serviceAccountKey.json")

# initialize firebase
firebase_admin.initialize_app(login)

db = firestore.client()

collection_earthquake = db.collection("earthquake")


def update_earthquake(dic):
    old = []
    docs = db.collection('earthquake').stream()
    for doc in docs:
        old.append(doc.to_dict())
    if len(old) <= 9:
        for i in range(len(old)):
            new_id = i+1
            collection_earthquake.document(str(new_id)).set(old[i])
    else:
        for i in range(9):
            new_id = i+1
            collection_earthquake.document(str(new_id)).set(old[i])
    collection_earthquake.document('0').set(dic)


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

for i in range(10):
    update_earthquake(dic)