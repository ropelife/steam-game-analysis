from pymongo import MongoClient

client = MongoClient("mongodb+srv://admin:admin@cluster0.dnn7gqy.mongodb.net/?retryWrites=true&w=majority")
db = client["steamgameanalysis"]
collection = db["steamgameanalysiscollection"]

# mongoDB aggregation pipelines
query = [
    {
        "$unwind": "$genres"
    },
    {
        "$group": {
            "_id": "$genres",
            "totalPlaytime": {"$sum": "$average_playtime_forever"},
            "totalGames": {"$sum": 1}
        }
    },
    {
        "$sort": {"totalGames": -1}
    }
]

result = list(collection.aggregate(query))

if result:
    top_20_genres = result[:20]
    print(top_20_genres)
else:
    print("No data available for analysis.")
