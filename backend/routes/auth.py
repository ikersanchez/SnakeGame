from fastapi import APIRouter, HTTPException, status
from schemas import User, UserCreate, UserLogin
from db import db

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", response_model=User, status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserCreate):
    existing_user = db.get_user_by_username(user_data.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists"
        )
    new_user = db.create_user(user_data.username)
    return new_user

@router.post("/login", response_model=User)
async def login(user_data: UserLogin):
    user = db.get_user_by_username(user_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user
