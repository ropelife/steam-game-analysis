from pymongo import MongoClient

client = MongoClient("mongodb+srv://admin:admin@cluster0.dnn7gqy.mongodb.net/?retryWrites=true&w=majority")
db = client["steamgameanalysis"]
collection = db["steamgameanalysiscollection"]

doc = collection.find({}, {"name": 1, "price": 1, "header_image": 1, "release_date": 1, "positive": 1, "average_playtime_forever": 1, "estimated_owners": 1})

result = list()

for d in doc:
    pos = d.get("positive")
    upper_range = int(d.get("estimated_owners").split('-')[1].strip())
    avg_player_time = d.get("average_playtime_forever")
    price = d.get("price")
    if (pos > 100 and
        upper_range > 50000 and
        avg_player_time > 50 and
        price == 0.0):
        game_result = {
            "name": d.get("name"),
            "release_date": d.get("release_date"),
            "price": d.get("price"),
            "header_image": d.get("header_image"),
        }
        result.append(game_result)

if result:
    top_seller = result[:10]
    print(top_seller)
