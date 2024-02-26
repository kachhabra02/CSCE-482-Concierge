from flask import Flask, render_template, jsonify
import database

app = Flask(__name__)

@app.route("/")
def home():
    # return "Welcome to the MyConcierge Backend (Arpan Here!)", 200
    JOBS = database.load_jobs_from_db()
    return render_template('home.html', jobs=JOBS)

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"status": 404, "message": "Not Found"}), 404

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)