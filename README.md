# Steam Game Analysis
Analyzed the steam games dataset containing information of published games on steam by applying various analytical queries to identify the most common genre played, performing sentiment assessment for each game, identifying discounts in text data. Also, identifying the top-selling games by involving various metrics to suit a specific criteria

## Software Design and NoSQL-Database and Tools Used
<img width="400" alt="Screenshot 2024-01-02 at 4 17 15 AM" src="https://github.com/achaud25/steam-game-analysis/assets/113392203/fe1d75f6-e4af-4303-b248-862f539fc9e6">

### Performed Analysis
- Games on Discount: In the dataset, there is no field that explicitly mentions the discount. To infer this information, I've utilize the 'detailed_description' field, wherein we search for keywords related to discounts. Subsequently, extractingthe discount percentage using regular expressions, along with the original price, to compute the games that are on
discount.

- Most Liked Games: To evaluate this, I have performed sentiment analysis on the ‘reviews’ field, and defined a set of positive and negative keywords which if matched with the ‘reviews’ would return the positive and negative count, along with the recommendation, positive_score and negative_score from the dataset, to calculate the overall sentiment score.
Sentiment score is calculated using the below;
  <img width="433" alt="Screenshot 2024-01-02 at 4 29 46 AM" src="https://github.com/achaud25/steam-game-analysis/assets/113392203/46e1f70a-36db-43a9-b4b2-f7e52c14d252">

-  Most Common Genre Played: To compute this, I have used the ‘genre’ field which is an array of genres, along with the total playtime of the users. This is done by using mongoDB aggregation pipeline which unwinds the genre, aggregates the playtime and counts the number of games for each genre. And then, sorts based on the total number of games.
  > pipeline = [{ "$unwind": "$genres" }, { "$group": { "_id": "$genres", "totalPlaytime": {"$sum": "$average_playtime_forever"}, "totalGames": {"$sum": 1} } }, { "$sort": {"totalGames": -1} }]

- Top Selling Games: To determine the top selling games, we have considered multiple metrics and applied specific criteria to evaluate their performance. It uses ‘positive’, upper range from ‘estimated_owners’, ‘average_playtime_forever’ and the ‘price’ field from the dataset.
