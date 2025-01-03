import os
import pytest
from app import create_app
from app.models import db

@pytest.fixture
def app():
    os.environ["FLASK_ENV"] = "testing"
    test_app = create_app()
    with test_app.app_context():
        db.create_all()  # Setup test database
        yield test_app
        db.drop_all()  # Cleanup after tests

@pytest.fixture
def client(app):
    return app.test_client()