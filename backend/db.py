from typing import List, Optional
import uuid
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
import schemas

# Create tables
models.Base.metadata.create_all(bind=engine)

class SQLAlchemyDB:
    def get_db(self):
        return SessionLocal()

    def create_user(self, username: str) -> schemas.User:
        with self.get_db() as db_session:
            db_user = models.User(id=str(uuid.uuid4()), username=username)
            db_session.add(db_user)
            db_session.commit()
            db_session.refresh(db_user)
            return schemas.User.model_validate(db_user)

    def get_user_by_username(self, username: str) -> Optional[schemas.User]:
        with self.get_db() as db_session:
            db_user = db_session.query(models.User).filter(models.User.username == username).first()
            if db_user:
                return schemas.User.model_validate(db_user)
            return None

    def add_score(self, username: str, score: int) -> schemas.Score:
        with self.get_db() as db_session:
            db_score = models.Score(id=str(uuid.uuid4()), username=username, score=score)
            db_session.add(db_score)
            db_session.commit()
            db_session.refresh(db_score)
            return schemas.Score.model_validate(db_score)

    def get_top_scores(self, limit: int = 10) -> List[schemas.Score]:
        with self.get_db() as db_session:
            scores = db_session.query(models.Score).order_by(models.Score.score.desc()).limit(limit).all()
            return [schemas.Score.model_validate(s) for s in scores]

# Singleton instance
db = SQLAlchemyDB()

# Seed with fake data for testing if DB is empty
def seed_data():
    """Populate database with fake data for testing if empty"""
    with db.get_db() as db_session:
        user_count = db_session.query(models.User).count()
        if user_count > 0:
            return

        # Add some users
        users = [
            "VenomStrike",
            "CobraKing",
            "PythonMaster",
            "SerpentQueen",
            "ViperElite",
            "AnacondaPro",
            "RattlerAce"
        ]
        
        for username in users:
            db_user = models.User(id=str(uuid.uuid4()), username=username)
            db_session.add(db_user)
        
        db_session.commit()
        
        # Add some scores
        scores_data = [
            ("VenomStrike", 1250),
            ("CobraKing", 980),
            ("PythonMaster", 1420),
            ("SerpentQueen", 750),
            ("ViperElite", 1100),
            ("AnacondaPro", 890),
            ("RattlerAce", 1350),
            ("VenomStrike", 1180),
            ("CobraKing", 1050),
            ("PythonMaster", 920),
        ]
        
        for username, score in scores_data:
            db_score = models.Score(id=str(uuid.uuid4()), username=username, score=score)
            db_session.add(db_score)
            
        db_session.commit()

# Initialize seed data if not imported as a module (optional, still runs on import currently)
if __name__ == "__main__":
    print("Initializing and seeding database...")
    seed_data()
    print("Done.")
else:
    # Initialize seed data on import
    seed_data()
