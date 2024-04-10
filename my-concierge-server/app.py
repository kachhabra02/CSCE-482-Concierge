from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import database
import nlp
import recommender

app = Flask(__name__)
CORS(app)

@app.route("/api")
def home():
    restaurants = database.getRestaurants('Philadelphia')
    return render_template('home.html', restaurants=restaurants)

@app.route('/api/prompt', methods=['GET'])
def prompt():
    prompt = request.args.get('prompt')
    original_user_preference_vector_str = request.args.get('user_preference_vector')
    original_user_preference_vector = [int(x) for x in original_user_preference_vector_str.split('-')]

    updated_user_preference_vector, chat_response = nlp.getUserPreferenceVector(prompt, original_user_preference_vector)

    print(updated_user_preference_vector)
    data = {
        'response': chat_response,
        'updated_user_preference_vector': updated_user_preference_vector
    }
    return jsonify(data)

@app.route('/api/recommendation', methods=['GET'])
def reccomendation():
    location = request.args.get('location')
    user_preference_vector_str = request.args.get('user_preference_vector')
    user_preference_vector = [int(x) for x in user_preference_vector_str.split('-')]   

    recommended_restaurants = recommender.getRecommendations(location, user_preference_vector)

    data = {
        'recommended_restaurants': recommended_restaurants,
    }
    return jsonify(data)

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"status": 404, "message": "Not Found"}), 404

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)
