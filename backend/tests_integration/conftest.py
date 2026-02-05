import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from fastapi.testclient import TestClient

# Set environment variable BEFORE importing app/db
os.environ["DATABASE_URL"] = "sqlite:///./test_snake_pro.db"

from main import app
from db import db
import models

@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    # Ensure tables are created in the test database
    from database import engine
    models.Base.metadata.create_all(bind=engine)
    yield
    # Optional: cleanup test database file after session
    if os.path.exists("./test_snake_pro.db"):
        os.remove("./test_snake_pro.db")

@pytest.fixture(autouse=True)
def clean_db():
    # Clear database before EACH test
    with db.get_db() as session:
        session.query(models.Score).delete()
        session.query(models.User).delete()
        session.commit()
    yield

@pytest.fixture
def client():
    return TestClient(app)
