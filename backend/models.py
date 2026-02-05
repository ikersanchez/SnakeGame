from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    
    scores = relationship("Score", back_populates="user")

class Score(Base):
    __tablename__ = "scores"

    id = Column(String, primary_key=True, index=True)
    username = Column(String, ForeignKey("users.username"))
    score = Column(Integer)
    
    user = relationship("User", back_populates="scores")
