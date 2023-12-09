from flask import Flask, jsonify
import subprocess
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/game_genre_analysis', methods=['GET'])
def game_genre_analysis():
    try:
        result = subprocess.check_output(['python3', 'gameGenreAnalysis.py'], text=True)
        top_20_genres = json.loads(result.strip().replace("'", "\""))
        return jsonify({'result': top_20_genres})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/most_liked_games', methods=['GET'])
def most_liked_games():
    try:
        result = subprocess.check_output(['python3', 'mostLiked.py'], text=True)
        top_10_games = json.loads(result.strip().replace("'", '"'))
        return jsonify({'result': top_10_games})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/top_selling_games', methods=['GET'])
def top_sellers():
    try:
        result = subprocess.check_output(['python3', 'topSeller.py'], text=True)
        top_seller = json.loads(result.strip().replace("'", '"'))
        return jsonify({'result': top_seller})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/games_on_discount', methods=['GET'])
def discount_games():
    try:
        result = subprocess.check_output(['python3', 'gamesOnDiscount.py'], text=True)
        corrected_output = result.replace("True", "true").replace("False", "false")
        discounted_games = json.loads(corrected_output.strip().replace("'", '"'))
        return jsonify({'result': discounted_games})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)