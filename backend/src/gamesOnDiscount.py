from pymongo import MongoClient
import re

client = MongoClient("mongodb+srv://admin:admin@cluster0.dnn7gqy.mongodb.net/?retryWrites=true&w=majority")
db = client["steamgameanalysis"]
collection = db["steamgameanalysiscollection"]

collection.create_index("detailed_description")

doc = collection.find({}, {"name": 1, "short_description":1 ,"detailed_description": 1, "price": 1, "header_image": 1, "windows": 1, "mac": 1 })

result = []

extract_percentage = re.compile(r'(\d+)%')

for d in doc:
    detailed_description = d.get("detailed_description", "").lower()
    original_price = d.get("price")

    if any(w in detailed_description for w in ["discount", "Discount", "discounted", "Discounted"]):
        search_res = extract_percentage.search(detailed_description)

        if search_res and original_price > 0:
            discount_percent = int(search_res.group(1))
            discounted_price = original_price - (original_price * (discount_percent / 100))
            game_result = {
                "name": d.get("name"),
                "price": d.get("price"),
                "short_description": d.get("short_description"),
                "header_image": d.get("header_image"),
                "discounted_price": "{:.2f}".format(discounted_price),
                "windows": d.get("windows"),
                "mac": d.get("mac"),
            }

            result.append(game_result)

discounted_games = result[:10]
print(discounted_games)
