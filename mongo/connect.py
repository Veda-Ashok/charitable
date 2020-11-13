import pymongo

client = pymongo.MongoClient('mongodb+srv://user:charitable123@charitable.ddnxi.mongodb.net/charitable?retryWrites=true&w=majority')

db = client["charitable"]

practice_org = db["practice_org"]

org = {
  "name": "Unicef",
  "mission": "We like to help",
}

practice_org.insert_one(org)