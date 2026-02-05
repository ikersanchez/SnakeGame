.PHONY: help install sync run dev test test-integration clean init-db

help:
	@echo "SnakePro Backend - Available Commands:"
	@echo ""
	@echo "  make install         - Install all dependencies"
	@echo "  make sync            - Sync dependencies from lockfile"
	@echo "  make run             - Run the backend server on port 3000"
	@echo "  make dev             - Run the backend server with auto-reload (development)"
	@echo "  make test            - Run unit tests"
	@echo "  make test-integration - Run integration tests"
	@echo "  make test-v          - Run tests with verbose output"
	@echo "  make clean           - Remove cache and temporary files"
	@echo "  make init-db         - Initialize and seed the database"
	@echo ""

install:
	uv sync

sync:
	uv sync

run:
	uv run uvicorn main:app --port 3000

dev:
	uv run uvicorn main:app --reload --port 3000

init-db:
	uv run python db.py

test:
	uv run pytest tests

test-integration:
	uv run pytest tests_integration

test-v:
	uv run pytest -v

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	@echo "Cleaned cache and temporary files"
