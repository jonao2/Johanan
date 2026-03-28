# MedicApp v2.0 - Startup Script

Write-Host "🚀 Iniciando Ecosistema MedicApp v2.0..." -ForegroundColor Cyan

# 1. Iniciar Backend (FastAPI)
Write-Host "📦 Levantando Backend (FastAPI)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", ".\.venv\Scripts\python -m uvicorn backend.main:app --reload --port 8000"

# 2. Iniciar Frontend (Vite)
Write-Host "💻 Levantando Frontend (React)..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "✅ ¡Todo listo! La aplicación estará disponible en http://localhost:5173" -ForegroundColor Yellow
Write-Host "La API está corriendo en http://localhost:8000" -ForegroundColor Gray
