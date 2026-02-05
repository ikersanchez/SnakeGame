from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, leaderboard, spectate

app = FastAPI(
    title="Snake Game API",
    description="Backend API for the Multi-mode Snake Game",
    version="1.0.0"
)

import logging
import time
from fastapi import Request

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    logger.info(f"Incoming request: {request.method} {request.url.path}")
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(f"Completed request: {request.method} {request.url.path} - Status: {response.status_code} - Time: {process_time:.4f}s")
    return response

# CORS configuration
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"FATAL ERROR: {str(exc)}", exc_info=True)
    return {"detail": "Internal Server Error", "error": str(exc)}

# Include Routers
app.include_router(auth.router)
app.include_router(leaderboard.router)
app.include_router(spectate.router)

@app.get("/health")
async def health():
    try:
        from database import engine
        from sqlalchemy import text
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {"status": "error", "database": "disconnected", "detail": str(e)}

@app.get("/")
async def root():
    return {"message": "Welcome to Snake Game API"}
