from flask import Flask
from config.database import init_db, db

# Initialize Flask app
app = Flask(__name__)

# Initialize the database
init_db(app)

@app.route("/")
def home():
    return "Welcome to the Palace of Goods!"

if __name__ == "__main__":
    with app.app_context():
        # Create database tables if they don’t exist
        db.create_all()
    app.run(debug=True)
