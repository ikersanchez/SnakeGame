from fastapi import APIRouter
from schemas import SpectateState, Point

router = APIRouter(prefix="/spectate", tags=["spectate"])

@router.get("/state", response_model=SpectateState)
async def get_spectate_state():
    # Return a dummy state for now
    return SpectateState(
        snake=[Point(x=10, y=10), Point(x=10, y=11), Point(x=10, y=12)],
        food=Point(x=15, y=15),
        score=100,
        username="BotPlayer"
    )
