import streamlit as st
import sqlite3
from datetime import datetime

# --- CONFIGURACIÓN DE LA BASE DE DATOS (SQLite) ---
def init_db():
    # Se conecta (o crea) un archivo local 'pacientes.db'
    conn = sqlite3.connect('pacientes.db')
    c = conn.cursor()
    # Se crea la tabla si no existe
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

# --- LÓGICA DE RECOMENDACIONES ---
def generar_recomendacion(sintomas):
    if not sintomas:
        return "Me alegra que no tengas síntomas. Mantén una buena hidratación, come sano y sigue cuidándote."
    
    recomendaciones = []
    if "Fiebre" in sintomas:
        recomendaciones.append("- **Fiebre:** Mantente hidratado, usa ropa ligera y puedes tomar antipiréticos (como paracetamol) si no eres alérgico.")
    if "Dolor de cabeza" in sintomas:
        recomendaciones.append("- **Dolor de cabeza:** Descansa en una habitación oscura y silenciosa. Evita el uso de pantallas y mantente hidratado.")
    if "Tos" in sintomas:
        recomendaciones.append("- **Tos:** Bebe abundantes líquidos calientes, usa miel para suavizar la garganta y evita bebidas frías.")
    if "Fatiga" in sintomas:
        recomendaciones.append("- **Fatiga:** Asegúrate de dormir al menos 8 horas seguidas y evita el esfuerzo físico intenso hoy.")
    if "Dolor de estómago" in sintomas:
        recomendaciones.append("- **Dolor de estómago:** Come porciones pequeñas, evita comidas grasosas o muy condimentadas y bebe infusiones como manzanilla.")
    
    recomendacion_final = "\n".join(recomendaciones)
    recomendacion_final += "\n\n⚠️ ***Aviso Médico:*** *Estas son recomendaciones generales de primeros auxilios y cuidados en el hogar. Si los síntomas persisten o empeoran, por favor consulta a un médico presencialmente.*"
    return recomendacion_final

# --- INTERFAZ GRÁFICA CON STREAMLIT ---
# Configuración inicial de la página
st.set_page_config(page_title="MedicApp - Asistente", page_icon="🩺", layout="centered")

# Inicializamos la base de datos al correr el script
init_db()

# Título y bienvenida
st.title("🩺 MedicApp: Tu Asistente Médico")
st.markdown("Bienvenido al consultorio virtual. ¿En qué podemos ayudarte el día de hoy?")
st.markdown("*(P.D: ¡Tu mamá estaría muy orgullosa de verte programando tu propia app médica! ✨)*")

# Pestañas para dividir la Interfaz
tab1, tab2 = st.tabs(["📝 Nueva Consulta", "🗂️ Historial de Pacientes"])

# --- PESTAÑA 1: FORMULARIO DE CONSULTA ---
with tab1:
    st.header("Evaluación de Paciente")
    
    # Formulario
    with st.form("consulta_form"):
        nombre = st.text_input("Nombre completo del paciente:", placeholder="Ej. Juan Pérez")
        estado_general = st.selectbox("¿Cómo se encuentra el día de hoy?", ["Bien", "Regular", "Mal", "Muy mal"])
        
        lista_sintomas = ["Fiebre", "Dolor de cabeza", "Tos", "Fatiga", "Dolor de estómago", "Dificultad para respirar"]
        sintomas_seleccionados = st.multiselect("¿Qué síntomas presenta?", lista_sintomas)
        
        dias_sintomas = st.number_input("¿Desde hace cuántos días presenta estos síntomas?", min_value=0, max_value=30, value=1)
        
        # Botón para enviar datos
        submit_button = st.form_submit_button("Analizar y dar Recomendaciones")
        
    # Cuando el usuario presiona el botón
    if submit_button:
        if not nombre.strip():
            st.error("Por favor, ingresa tu nombre para continuar.")
        elif "Dificultad para respirar" in sintomas_seleccionados:
            st.error("🚨 **ALERTA MÉDICA:** La dificultad para respirar es un síntoma grave. Por favor, acude a URGENCIAS inmediatamente o llama a una ambulancia.")
            recomendacion = "Acudir a emergencias médicas de inmediato por dificultad respiratoria."
            guardar_consulta(nombre, estado_general, sintomas_seleccionados, dias_sintomas, recomendacion)
        else:
            recomendacion = generar_recomendacion(sintomas_seleccionados)
            st.success("Consulta procesada y guardada con éxito.")
            st.markdown("### 📋 Recomendaciones a seguir:")
            st.info(recomendacion)
            
            # Guardamos en la base de datos SQLite
            guardar_consulta(nombre, estado_general, sintomas_seleccionados, dias_sintomas, recomendacion)

# --- PESTAÑA 2: VISOR DE BASE DE DATOS ---
with tab2:
    st.header("Historial de Consultas Guardadas (SQLite)")
    historial = obtener_historial()
    
    if historial:
        st.markdown(f"Se encontraron **{len(historial)}** consultas registradas.")
        # Mostrar cada registro en un elemento expandible
        for registro in historial:
            with st.expander(f"👤 {registro[0]} - 📅 {registro[5]}"):
                st.write(f"**Estado General:** {registro[1]}")
                st.write(f"**Síntomas reportados:** {registro[2]}")
                st.write(f"**Días con síntomas:** {registro[3]}")
                st.markdown("**Recomendación del sistema:**")
                st.write(registro[4])
    else:
        st.info("Aún no hay consultas registradas en la base de datos.")
