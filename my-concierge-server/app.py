from flask import Flask, render_template, jsonify
import database

app = Flask(__name__)

@app.route("/")
def home():
    restaurants = database.get_restaurants()
    return render_template('home.html', restaurants=restaurants)

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"status": 404, "message": "Not Found"}), 404

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)