import pytest

def test_user_flow(client):
    # 1. Signup
    signup_resp = client.post("/auth/signup", json={"username": "integration_user"})
    assert signup_resp.status_code == 201
    user_data = signup_resp.json()
    assert user_data["username"] == "integration_user"
    
    # 2. Login
    login_resp = client.post("/auth/login", json={"username": "integration_user"})
    assert login_resp.status_code == 200
    assert login_resp.json()["username"] == "integration_user"

def test_leaderboard_flow(client):
    # 1. Submit multiple scores
    scores = [
        {"username": "player1", "score": 100},
        {"username": "player2", "score": 250},
        {"username": "player1", "score": 150},
    ]
    
    for s in scores:
        resp = client.post("/leaderboard", json=s)
        assert resp.status_code == 200

    # 2. Check leaderboard sorting and limit
    resp = client.get("/leaderboard")
    assert resp.status_code == 200
    data = resp.json()
    
    assert len(data) == 3
    assert data[0]["username"] == "player2"
    assert data[0]["score"] == 250
    assert data[1]["username"] == "player1"
    assert data[1]["score"] == 150
    assert data[2]["username"] == "player1"
    assert data[2]["score"] == 100

def test_spectate_state(client):
    resp = client.get("/spectate/state")
    assert resp.status_code == 200
    data = resp.json()
    assert "snake" in data
    assert "food" in data
    assert "username" in data
