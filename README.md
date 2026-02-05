# SnakePro

SnakePro is a modern, multi-mode Snake game built with a **FastAPI** backend and a **React** frontend. It features authentication, a global leaderboard, and a spectating mode.

## 🚀 Quick Start

To get the entire project running (both backend and frontend) with a single command:

1.  **Install root dependencies:**
    ```bash
    npm install
    ```

2.  **Start both servers:**
    ```bash
    npm run dev
    ```

The application will be available at:
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

- `frontend/`: React + Vite + TypeScript application.
- `backend/`: FastAPI + Pydantic + In-memory Mock Database.
- `openapi.yaml`: The API specification.

## 🛠️ Development

For detailed development instructions, available commands, and troubleshooting, please see:
- [QUICKSTART.md](./QUICKSTART.md) - General usage guide.
- [DEV_SETUP.md](./DEV_SETUP.md) - Details on the `concurrently` and `Makefile` setup.
- [AGENTS.md](./AGENTS.md) - Project guidelines for AI agents.

## ✅ Verification

You can run the backend tests to ensure everything is working correctly:
```bash
cd backend
make test
```
