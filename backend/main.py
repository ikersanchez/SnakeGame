from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, leaderboard, spectate

app = FastAPI(
    title="Snake Game API",
    description="Backend API for the Multi-mode Snake Game",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:3000",  # Frontend URL
    "http://localhost:5173",  # Vite default
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(leaderboard.router)
app.include_router(spectate.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Snake Game API"}
