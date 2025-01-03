def test_home(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"Welcome to Palace of Goods" in response.data