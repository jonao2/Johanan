# MedicApp: Ecosistema de Telemedicina (Web Moderna)

**Fecha:** 2026-03-28  
**Estado:** Propuesta de Diseño  
**Visión:** Evolución del MVP de triaje (Streamlit) a una plataforma web profesional con FastAPI y React, enfocada en la resolución clínica y accesibilidad del paciente.

## 1. Objetivos del Sistema

*   **Pilar 1: Triaje Interactivo Inteligente:** Un cuestionario fluido asistido por IA que identifique banderas rojas.
*   **Pilar 2: Gestión de Citas:** Interfaz para que el paciente vea su agenda médica y solicite nuevas consultas.
*   **Pilar 3: Recursos de Salud (Farmacias):** Localización de servicios de farmacia cercanos con horarios de atención.
*   **Pilar 4: Historia Clínica Ligera (EHR):** Persistencia de registros previos del paciente para seguimiento evolutivo.

## 2. Arquitectura de Software

### Backend (FastAPI)
- **Lenguaje:** Python 3.x
- **Framework:** FastAPI
- **Base de Datos:** PostgreSQL (con SQLAlchemy/SQLModel)
- **Validación:** Pydantic para esquemas de datos.
- **Autenticación:** JWT para sesiones seguras de pacientes.

### Frontend (React + Vite)
- **Framework:** React.js
- **Estilos:** Tailwind CSS (Moderno, responsivo, estéticos premium).
- **Estado Global:** React Tasks/Context API.
- **Iconografía:** Lucide React o FontAwesome.

## 3. Componentes Clave

### A. Dashboard de Salud
- Vista general con indicadores de estado actual, próximas citas y accesos rápidos a triaje.

### B. Módulo de Triaje Dinámico
- Formulario reactivo que cambia preguntas basadas en respuestas anteriores (lógica de árbol de decisión AI).

### C. Portal de Farmacias
- Integración (mock inicial o Leaflet/Google Maps) para mostrar farmacias locales de turno.

## 4. Esquema de Datos (MVP Web)
- **User:** Perfil del paciente (nombre, edad, alergias).
- **Consulta:** Triaje realizado, síntomas, recomendación generada, timestamp.
- **Cita:** Fecha, hora, especialidad, estado (pendiente/realizada).

## 5. Plan de Verificación

### Pruebas Automatizadas
- Tests unitarios con `pytest` para la lógica de triaje del backend.
- Tests de integración para endpoints de FastAPI.

### Pruebas de Interfaz
- Verificación responsiva en móviles y escritorio.
- Flujo completo desde "Ingreso de síntoma" hasta "Recomendación/Cita".

---
⚠️ **Importante:** Se mantendrá el disclaimer legal en todas las vistas de triaje indicando que la app no sustituye a un médico.
