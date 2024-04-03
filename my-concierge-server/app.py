from flask import Flask, render_template, jsonify, request
import database
import random

app = Flask(__name__)

@app.route("/")
def home():
    restaurants = database.get_restaurants()
    return render_template('home.html', restaurants=restaurants)

@app.route('/api/resource/prompt', methods=['GET'])
def prompt():
    prompt = request.args.get('prompt')
    original_user_preference_vector_str = request.args.get('original_user_preference_vector')
    original_user_preference_vector = [int(x) for x in original_user_preference_vector_str.strip('[]').split(',')]

    # final_user_preference_vector = getUserPreferenceVector(prompt, original_user_preference_vector) // Incorporate Will's Code
    
    final_user_preference_vector = [random.randint(0, 5) for _ in range(32)]
    data = {
        'prompt': prompt,
        'original_user_preference_vector': original_user_preference_vector,
        'final_user_preference_vector': final_user_preference_vector,
    }
    return jsonify(data)

@app.route('/api/resource/reccomendation', methods=['GET'])
def reccomendation():
    location = request.args.get('location')
    user_preference_vector_str = request.args.get('user_preference_vector')
    user_preference_vector = [int(x) for x in user_preference_vector_str.strip('[]').split(',')]    
    # return getReccomendation(location, user_preference_vector) // Incorporate Krish's Code
    
    # delete code below, only for testing purposes
    user_preference_vector = [random.randint(0, 5) for _ in range(32)]
    data = {
        'location': location,
        'user_preference_vector': user_preference_vector,
    }
    return jsonify(data)

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"status": 404, "message": "Not Found"}), 404

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)