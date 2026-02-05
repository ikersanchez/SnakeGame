from typing import List
from fastapi import APIRouter
from schemas import Score, ScoreCreate
from db import db

router = APIRouter(prefix="/leaderboard", tags=["leaderboard"])

@router.get("", response_model=List[Score])
async def get_leaderboard():
    return db.get_top_scores()

@router.post("", response_model=Score)
async def submit_score(score_data: ScoreCreate):
    return db.add_score(score_data.username, score_data.score)
