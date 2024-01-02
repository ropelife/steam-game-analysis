<h1 align="center">Steam Game Analysis</h1>
Analyzed the steam games dataset containing information of published games on steam by applying various analytical queries to identify the most common genre played, performing sentiment assessment for each game, identifying discounts in text data. Also, identifying the top-selling games by involving various metrics to suit a specific criteria

## Software Design and NoSQL-Database and Tools Used

<img width="400" alt="Screenshot 2024-01-02 at 4 17 15 AM" src="https://github.com/achaud25/steam-game-analysis/assets/113392203/fe1d75f6-e4af-4303-b248-862f539fc9e6">


#### Performed Analysis for the following:

- <b>Games on Discount:</b> In the dataset, there is no field that explicitly mentions the discount. To infer this information, I've utilize the 'detailed_description' field, wherein we search for keywords related to discounts. Subsequently, extractingthe discount percentage using regular expressions, along with the original price, to compute the games that are on
discount.

![image](https://github.com/achaud25/steam-game-analysis/assets/113392203/88c43ede-39af-467c-9bc8-42a52176162c)

- <b>Most Liked Games:</b> To evaluate this, I have performed sentiment analysis on the ‘reviews’ field, and defined a set of positive and negative keywords which if matched with the ‘reviews’ would return the positive and negative count, along with the recommendation, positive_score and negative_score from the dataset, to calculate the overall sentiment score.
Sentiment score is calculated using the below;

![image](https://github.com/achaud25/steam-game-analysis/assets/113392203/5e4001d9-99d8-478a-8059-a3c72cad9824)

- <b>Most Common Genre Played:</b> To compute this, I have used the ‘genre’ field which is an array of genres, along with the total playtime of the users. This is done by using mongoDB aggregation pipeline which unwinds the genre, aggregates the playtime and counts the number of games for each genre. And then, sorts based on the total number of games.

   > pipeline = [{ "$unwind": "$genres" }, { "$group": { "_id": "$genres", "totalPlaytime": {"$sum": "$average_playtime_forever"}, "totalGames": {"$sum": 1} } }, { "$sort": {"totalGames": -1} }]

![image](https://github.com/achaud25/steam-game-analysis/assets/113392203/ae510f47-3ae0-4595-81cd-aa6d8462f9e6)

- <b>Top Selling Games:</b> To determine the top selling games, we have considered multiple metrics and applied specific criteria to evaluate their performance. It uses ‘positive’, upper range from ‘estimated_owners’, ‘average_playtime_forever’ and the ‘price’ field from the dataset.

![image](https://github.com/achaud25/steam-game-analysis/assets/113392203/f2949664-4c83-420f-884c-cc87e0440552)
