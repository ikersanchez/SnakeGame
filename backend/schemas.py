import uuid
from typing import List
from pydantic import BaseModel, ConfigDict

class User(BaseModel):
    id: str
    username: str
    
    model_config = ConfigDict(from_attributes=True)

class Score(BaseModel):
    id: str
    username: str
    score: int
    
    model_config = ConfigDict(from_attributes=True)

class Point(BaseModel):
    x: int
    y: int

class SpectateState(BaseModel):
    snake: List[Point]
    food: Point
    score: int
    username: str

class UserCreate(BaseModel):
    username: str

class UserLogin(BaseModel):
    username: str

class ScoreCreate(BaseModel):
    username: str
    score: int
