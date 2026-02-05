import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from main import app
from db import db
import models

client = TestClient(app)

import pytest

@pytest.fixture(autouse=True)
def setup_db():
    # Clear database before each test
    with db.get_db() as session:
        session.query(models.Score).delete()
        session.query(models.User).delete()
        session.commit()
    yield

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Snake Game API"}

def test_signup():
    response = client.post(
        "/auth/signup",
        json={"username": "testuser"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["username"] == "testuser"
    assert "id" in data

    # Test duplicate signup
    response = client.post(
        "/auth/signup",
        json={"username": "testuser"}
    )
    assert response.status_code == 400

def test_login():
    # Ensure user exists
    client.post("/auth/signup", json={"username": "loginuser"})
    
    response = client.post(
        "/auth/login",
        json={"username": "loginuser"}
    )
    assert response.status_code == 200
    assert response.json()["username"] == "loginuser"

    # Test login non-existent
    response = client.post(
        "/auth/login",
        json={"username": "nouser"}
    )
    assert response.status_code == 404

def test_leaderboard():
    # Add some scores
    db.add_score("alice", 100)
    db.add_score("bob", 200)

    response = client.get("/leaderboard")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["username"] == "bob" # Sorted by score desc
    assert data[0]["score"] == 200

def test_spectate():
    response = client.get("/spectate/state")
    assert response.status_code == 200
    data = response.json()
    assert "snake" in data
    assert "food" in data
    assert "score" in data
    assert "username" in data
