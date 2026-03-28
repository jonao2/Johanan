# Spec: MedicApp v2.0 - Piloto de Emergencia

**Fecha:** 2026-03-28  
**Estado:** Propuesta de Diseño Final  
**Visión:** Evolución del MVP a una interfaz técnica, rápida y moderna basada en el concepto de "Piloto de Emergencia" (FastAPI + React).

## 1. Objetivos del Sistema (Potenciación)

*   **Identidad Visual Premium:** Estilo "Emergency Pilot" con base oscura, glassmorphism y tipografía moderna (Outfit).
*   **Action Hub:** Dashboard dinámico que prioriza la resolución del triaje (Citas, Mapas, Emergencia) según el nivel de urgencia detectado.
*   **Triaje Stepper:** Interfaz por pasos para reducir la carga cognitiva del paciente.
*   **Ecosistema Real:** Conexión con Backend para historial y agendamiento (mock inicial).

## 2. Decisiones Técnicas

### Frontend (React + Vite + Tailwind 4)
- **Tema:** Modo Oscuro Técnico (Base: `#0f172a`, Accent: Blue/Red).
- **Componentes:** Sidebar persistente (Desktop), Navbar flotante (Mobile).
- **Lógica de Estilos:** Uso de Tailwind 4 con `@import "tailwindcss";` para evitar problemas de compatibilidad.

### Backend (FastAPI)
- **Rutas:** `/triage`, `/history`, `/appointments`.
- **Evolución:** Persistencia en SQLite v2 e inicio de lógica para geolocalización de farmacias.

## 3. Estructura de Componentes

### Sidebar (Firma)
- Logo: MedicApp Pulse (Stethoscope SVG).
- Menú: Dashboard, Historial, Recursos.
- Estado: Indicador de conectividad API.

### Dashboard (Canvas)
- **Action Hub:** Banner dinámico con el "Siguiente Paso Sugerido".
- **Stat Cards:** Consultas hechas, Nivel de Riesgo Promedio.
- **Timeline:** Registro visual de triajes previos.

## 4. Plan de Verificación

### Manual Verification
1.  Corregir el archivo `frontend/src/index.css` para que use el motor de Tailwind 4.
2.  Levantar el servidor con `npm run dev` y confirmar que el sidebar y los efectos de vidrio son visibles.
3.  Realizar un triaje de "Fiebre" y verificar que el Dashboard sugiere "Cuidarse en Casa".
4.  Realizar un triaje de "Dificultad Respiratoria" y verificar que el Dashboard cambia a modo "ALERTA" con botón de emergencia.

---
⚠️ **Importante:** Se eliminará el disclaimer legal estático y se reemplazará por uno dinámico dentro del flujo de triaje.
