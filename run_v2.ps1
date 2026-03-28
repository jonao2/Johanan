# Script para ejecutar MedicApp V2 (FastAPI + Vite)

Write-Host "Iniciando MedicApp V2..." -ForegroundColor Cyan

# 1. Iniciar Backend (FastAPI) en segundo plano
Write-Host "Lanzando Backend en el puerto 8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; uvicorn main:app --reload --port 8000"

# 2. Iniciar Frontend (Vite)
Write-Host "Lanzando Frontend en el puerto 5173..." -ForegroundColor Green
cd frontend
npm run dev
