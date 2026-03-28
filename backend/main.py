from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
from datetime import datetime

app = FastAPI(title="MedicApp API", version="2.0")

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODELS ---
class ConsultaBase(BaseModel):
    nombre: str
    estado_general: str
    sintomas: List[str]
    dias_sintomas: int

class ConsultaCreate(ConsultaBase):
    pass

class Consulta(ConsultaBase):
    id: int
    recomendacion: str
    fecha: str
    urgencia: int # 1: Leve, 5: Crítico

# --- DATABASE INIT ---
def init_db():
    conn = sqlite3.connect('pacientes_v2.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS consultas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            estado_general TEXT,
            sintomas TEXT,
            dias_sintomas INTEGER,
            recomendacion TEXT,
            fecha TEXT,
            urgencia INTEGER
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# --- RECOMENDACIÓN LOGIC (Ported from v1) ---
def calcular_urgencia(sintomas: List[str]):
    if "Dificultad para respirar" in sintomas:
        return 5
    if len(sintomas) >= 3 or "Fiebre" in sintomas:
        return 3
    if not sintomas:
        return 1
    return 2

def generar_recomendacion(sintomas: List[str]):
    if not sintomas:
        return "No se reportan síntomas. Se recomienda mantener hábitos saludables e hidratación."
    
    recoms = {
        "Fiebre": "• Hidratación: Beber 2-3 litros de agua al día.\n• Control Térmico: Reposo y paños templados.",
        "Dolor de cabeza": "• Ambiente: Habitación oscura y sin ruido.\n• Descanso: Evitar pantallas.",
        "Tos": "• Suavizantes: Infusiones con miel y limón.\n• Ambiente: Humedad adecuada.",
        "Fatiga": "• Sueño: Mínimo 8-9 horas de descanso.",
        "Dolor de estómago": "• Dieta Blanda: Arroz, gelatina, manzana.",
        "Dolor muscular": "• Relajación: Agua tibia con sal."
    }
    
    result = "### Recomendaciones:\n\n"
    for s in sintomas:
        if s in recoms:
            result += f"{recoms[s]}\n\n"
    
    return result

# --- ENDPOINTS ---
@app.get("/")
def read_root():
    return {"status": "MedicApp API Online", "version": "2.0"}

@app.post("/triage", response_model=Consulta)
def create_triage(consulta: ConsultaCreate):
    urgencia = calcular_urgencia(consulta.sintomas)
    
    # Lógica de emergencia
    recomendacion = ""
    if urgencia == 5:
        recomendacion = "🚨 EMERGENCIA: Dificultad para respirar detectada. ACUDA A URGENCIAS INMEDIATAMENTE O LLAME AL 911."
    else:
        recomendacion = generar_recomendacion(consulta.sintomas)
    
    fecha_actual = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    sintomas_str = ", ".join(consulta.sintomas)
    
    conn = sqlite3.connect('pacientes_v2.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO consultas (nombre, estado_general, sintomas, dias_sintomas, recomendacion, fecha, urgencia)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (consulta.nombre, consulta.estado_general, sintomas_str, consulta.dias_sintomas, recomendacion, fecha_actual, urgencia))
    last_id = c.lastrowid
    conn.commit()
    conn.close()
    
    return {**consulta.dict(), "id": last_id, "recomendacion": recomendacion, "fecha": fecha_actual, "urgencia": urgencia}

@app.get("/history", response_model=List[Consulta])
def get_history():
    conn = sqlite3.connect('pacientes_v2.db')
    c = conn.cursor()
    c.execute('SELECT id, nombre, estado_general, sintomas, dias_sintomas, recomendacion, fecha, urgencia FROM consultas ORDER BY id DESC')
    rows = c.fetchall()
    conn.close()
    
    history = []
    for r in rows:
        history.append({
            "id": r[0],
            "nombre": r[1],
            "estado_general": r[2],
            "sintomas": r[3].split(", "),
            "dias_sintomas": r[4],
            "recomendacion": r[5],
            "fecha": r[6],
            "urgencia": r[7]
        })
    return history
