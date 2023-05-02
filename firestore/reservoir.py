import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

login = credentials.Certificate("./serviceAccountKey.json")

# initialize firebase
firebase_admin.initialize_app(login)

db = firestore.client()
collection_reservoir = db.collection("reservoir")


# update one reservoir at once

def update_reservoir(id, amount, percentage, time):
    key = 'reservoir' + str(id)
    dic = {
        key: {
            'amount': amount,
            'percentage': percentage,
            'time': time
        }
    }
    collection_reservoir.document('last').update(dic)
