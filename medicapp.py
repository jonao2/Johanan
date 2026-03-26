import streamlit as st
import sqlite3
from datetime import datetime

# --- CONFIGURACIÓN DE LA PÁGINA ---
st.set_page_config(
    page_title="MedicApp - Triage Inteligente",
    page_icon="🩺",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# --- ESTILOS CSS PREMIUM ---
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Outfit', sans-serif;
    }
    
    .stApp {
        background-color: #f8faff;
    }
    
    .main-header {
        background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        padding: 2rem;
        border-radius: 1.5rem;
        color: white;
        text-align: center;
        margin-bottom: 2rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .stButton>button {
        width: 100%;
        border-radius: 0.75rem;
        padding: 0.75rem 0;
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        border: none;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .stButton>button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .card {
        background: white;
        padding: 1.5rem;
        border-radius: 1rem;
        border: 1px solid #e5e7eb;
        margin-bottom: 1rem;
    }
</style>
""", unsafe_allow_html=True)

# --- CONFIGURACIÓN DE LA BASE DE DATOS (SQLite) ---
def init_db():
    conn = sqlite3.connect('pacientes.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS consultas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            estado_general TEXT,
            sintomas TEXT,
            dias_sintomas INTEGER,
            recomendacion TEXT,
            fecha TEXT
        )
    ''')
    conn.commit()
    conn.close()

def guardar_consulta(nombre, estado, sintomas, dias, recomendacion):
    conn = sqlite3.connect('pacientes.db')
    c = conn.cursor()
    fecha_actual = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    sintomas_str = ", ".join(sintomas) if sintomas else "Ninguno"
    
    c.execute('''
        INSERT INTO consultas (nombre, estado_general, sintomas, dias_sintomas, recomendacion, fecha)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (nombre, estado, sintomas_str, dias, recomendacion, fecha_actual))
    conn.commit()
    conn.close()

def obtener_historial():
    conn = sqlite3.connect('pacientes.db')
    c = conn.cursor()
    c.execute('SELECT nombre, estado_general, sintomas, dias_sintomas, recomendacion, fecha FROM consultas ORDER BY id DESC')
    datos = c.fetchall()
    conn.close()
    return datos

# --- LÓGICA DE RECOMENDACIONES REFINADA ---
def generar_recomendacion(sintomas):
    if not sintomas:
        return "No se reportan síntomas. Se recomienda mantener hábitos saludables e hidratación."
    
    recoms = {
        "Fiebre": "• **Hidratación:** Beber 2-3 litros de agua al día.\n• **Control Térmico:** Reposo y paños de agua templada.\n• **Medicación:** Paracetamol (500mg - 1g) cada 8h si no hay alergias.",
        "Dolor de cabeza": "• **Ambiente:** Habitación oscura y sin ruido.\n• **Descanso:** Evitar pantallas por al menos 2 horas.\n• **Relajación:** Masajes suaves en las sienes.",
        "Tos": "• **Suavizantes:** Infusiones con miel y limón.\n• **Ambiente:** Mantener humedad en la habitación.\n• **Cuidado:** Evitar cambios bruscos de temperatura.",
        "Fatiga": "• **Sueño:** Mínimo 8-9 horas de descanso reparador.\n• **Nutrición:** Incrementar consumo de frutas cítricas y vegetales verdes.",
        "Dolor de estómago": "• **Dieta Blanda:** Arroz blanco, gelatina, manzana cocida.\n• **Hidratación:** Suero oral si hay deshidratación.\n• **Infusiones:** Manzanilla o anís estrellado.",
        "Dolor muscular": "• **Baños:** Agua tibia con sal para relajar fibras.\n• **Movilidad:** Estiramientos muy leves, no forzar."
    }
    
    result = "### 📋 Guía de cuidados inmediatos:\n\n"
    for s in sintomas:
        if s in recoms:
            result += f"{recoms[s]}\n\n"
    
    return result

# --- INTERFAZ PRINCIPAL ---
init_db()

st.markdown("""
    <div class="main-header">
        <h1>🩺 MedicApp: Triage Inteligente</h1>
        <p>Evaluación rápida y profesional para el cuidado de tu salud</p>
    </div>
""", unsafe_allow_html=True)

tab1, tab2, tab3 = st.tabs(["📝 Nueva Consulta", "🗂️ Historial Clínico", "🤖 Sobre la IA"])

with tab1:
    st.markdown("### Evaluación del Paciente")
    with st.container():
        with st.form("consulta_form", clear_on_submit=True):
            col1, col2 = st.columns(2)
            with col1:
                nombre = st.text_input("Nombre Completo:", placeholder="Ej. Johanan...")
            with col2:
                estado = st.selectbox("Estado General:", ["Excelente", "Regular", "Mal", "Crítico"])
            
            sintomas_list = ["Fiebre", "Dolor de cabeza", "Tos", "Fatiga", "Dolor de estómago", "Dolor muscular", "Dificultad para respirar"]
            sintomas_sel = st.multiselect("Seleccione los síntomas presentados:", sintomas_list)
            
            dias = st.slider("Días con molestias:", 0, 14, 1)
            
            submit = st.form_submit_button("Realizar Triage")
    
    if submit:
        if not nombre:
            st.warning("Por favor ingrese el nombre del paciente.")
        elif "Dificultad para respirar" in sintomas_sel:
            st.error("🚨 **ALERTA DE EMERGENCIA:** Se ha detectado dificultad respiratoria. Por favor, acuda a un centro hospitalario INMEDIATAMENTE.")
            guardar_consulta(nombre, estado, sintomas_sel, dias, "EMERGENCIA: Dificultad para respirar - Derivación a urgencias.")
        else:
            rec = generar_recomendacion(sintomas_sel)
            st.success("Triage completado con éxito.")
            st.markdown(rec)
            st.info("⚠️ *Importante: Esta guía no reemplaza un diagnóstico médico profesional.*")
            guardar_consulta(nombre, estado, sintomas_sel, dias, rec)

with tab2:
    st.markdown("### Consultas Registradas")
    data = obtener_historial()
    if data:
        for r in data:
            with st.expander(f"👤 {r[0]} | 📅 {r[5]}"):
                st.write(f"**Estado:** {r[1]} | **Síntomas:** {r[2]}")
                st.markdown(r[4])
    else:
        st.write("No hay registros disponibles en la base de datos.")

with tab3:
    st.markdown("### ¿Cómo ayudó la IA en este proyecto?")
    st.write("""
    Este proyecto utiliza **Agentes de IA (Antigravity)** para optimizar el desarrollo:
    - **Lógica Médica:** Estructuración de recomendaciones basadas en protocolos estándar.
    - **Diseño UI:** Implementación de estilos modernos y responsivos mediante CSS inyectado.
    - **Optimización de Código:** Generación limpia de la base de datos y manejo de estados.
    - **Documentación Automática:** Creación de archivos de requerimientos y manuales.
    """)
    st.markdown("---")
    st.write("✨ *Desarrollado para la carrera de Medicina - 2026*")
