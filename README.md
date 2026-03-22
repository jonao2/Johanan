# 🩺 SymptomaCheck - Asistente Médico Inteligente

Este proyecto es una plataforma de evaluación de síntomas y triaje médico, diseñada para ofrecer recomendaciones inmediatas basadas en la salud del usuario.

## 🚀 Instalación y Configuración

### 1. Entorno Backend (Python)
Para inicializar el proyecto y configurar el entorno virtual (VENV):

```powershell
# Clonar o entrar a la carpeta del proyecto
cd PATH_AL_PROYECTO

# Crear el entorno virtual (si no existe)
python -m venv venv

# ACTIVACIÓN DEL ENTORNO (Cada vez que empieces a trabajar):
.\venv\Scripts\activate.ps1

# Instalación de dependencias
pip install -r requirements.txt
```

### 2. Base de Datos (PostgreSQL)
Asegúrate de tener PostgreSQL corriendo en el puerto `5432`.
- **Usuario**: `postgres`
- **Contraseña**: `13diciembre`
- **Base de Datos**: El sistema creará las tablas necesarias automáticamente.

### 3. Frontend (React + Vite)
Requiere Node.js y npm instalados.
```bash
# Entrar a la carpeta del frontend (cuando se genere)
cd frontend
npm install
npm run dev
```

## 🛠️ Cómo Ejecutar

### Opción A: Prototipo Rápido (Streamlit)
Si deseas ejecutar la versión rápida en Python:
```powershell
streamlit run medicapp.py
```

### Opción B: Aplicación Moderna (FastAPI + React)
1. Iniciar Backend:
   ```powershell
   uvicorn main:app --reload
   ```
2. Iniciar Frontend (en otra terminal):
   ```powershell
   npm run dev
   ```

## 📝 Registro de Avance
Puedes seguir el progreso detallado del desarrollo en el archivo `avance.md`.

---
⚠️ **Disclaimer Legal:** *Esta aplicación es una herramienta informativa y no sustituye un diagnóstico médico profesional. En caso de emergencia, acuda inmediatamente a un centro de salud.*
