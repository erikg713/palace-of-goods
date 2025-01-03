from app.models import User

def test_user_model(app):
    user = User(username="test_user", email="test@example.com")
    assert user.username == "test_user"
    assert user.email == "test@example.com"