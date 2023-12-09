from pymongo import MongoClient

client = MongoClient("mongodb+srv://admin:admin@cluster0.dnn7gqy.mongodb.net/?retryWrites=true&w=majority")
db = client["steamgameanalysis"]
collection = db["steamgameanalysiscollection"]

collection.create_index("reviews")

doc = collection.find({}, {"name": 1, "reviews": 1, "header_image": 1, "price": 1, "positive": 1, "negative": 1, "recommendations": 1})

pos_words = ["like", "love", "enjoy", "great", "awesome"]
neg_words = ["hate", "dislike", "terrible", "bad", "awful"]

result = []

for d in doc:
    detailed_description = d.get("reviews", "").lower()
    recommendations = d.get("recommendations")
    
    # positive and negative votes from the dataset
    positive = d.get("positive")
    negative = d.get("negative")

    # calculating positive and negative feedback from reviews
    pc = sum(1 for w in pos_words if w in detailed_description)
    nc = sum(1 for w in neg_words if w in detailed_description)

    if recommendations is not None and recommendations!=0:

        sentiment_score = ((positive * pc) - (negative * nc)) / recommendations

        if sentiment_score > 0:

            game_result = {
                "name": d.get("name"),
                "sentiment_score": sentiment_score,
                "header_image": d.get("header_image"),
                "price": d.get("price"),
                "positive": d.get("positive"),
            }

            result.append(game_result)

top_12_games = result[:12]
print(top_12_games)