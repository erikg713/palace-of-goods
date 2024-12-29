from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize SQLAlchemy
db = SQLAlchemy()

def init_db(app: Flask):
    """
    Initialize the database with the Flask app.
    """
    # Set the database URL from environment variables
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    
    # Optional settings for better performance and debugging
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Bind SQLAlchemy to the app
    db.init_app(app)
