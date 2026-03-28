# Especificación de Diseño: MedicApp - Expediente y Triaje Profundo

## 1. Visión General
MedicApp es una aplicación de evaluación clínica y pre-triaje que tiene como objetivo escalar de un Minimum Viable Product (basado en reglas fijas) a una plataforma de grado médico. Este documento especifica la evolución del caso de uso "A" (Expediente y Triaje Profundo), para servir como herramienta robusta tanto a estudiantes de ciencias de la salud, como a pacientes reales, enfocando su eficiencia en la prevención de riesgos y detección temprana de banderas rojas.

## 2. Arquitectura del Sistema
La plataforma transicionará hacia un stack moderno:
- **Frontend (Web):** React.js (Single Page Application) priorizando el diseño móvil (`Mobile-First`) y permitiendo navegación rápida entre el historial y los cuestionarios de evaluación clínica.
- **Backend (Lógica Médica):** FastAPI (Python) que actúa como motor de triaje, sirviendo los árboles de decisiones en formato JSON y evaluando el estado del paciente en milisegundos.
- **Base de Datos:** PostgreSQL (o SQLite robusto inicial) para esquematizar adecuadamente la historia clínica (Electronic Health Record - EHR), roles de usuarios y logs de auditoría médica.

## 3. Componentes Principales
### 3.1. Cuestionario Dinámico de Triaje
El formulario dejará de ser estático. Se estructurará mediante grafos o árboles condicionales (basado en el Sistema de Triaje de Manchester):
- Si el paciente selecciona un síntoma genérico (ej. "Dolor Abdominal"), la siguiente pregunta en el frontend obligará a calificar el dolor (1-10) y su irradiación temporal.
- Esto reduce el registro de basura y afina la prioridad de triaje devuelta.

### 3.2. Historial de Episodios Médicos (EHR Line)
Los usuarios poseerán una vista de línea de vida donde podrán revisar incidentes pasados:
- **Registro por Evento:** Fecha, categoría asignada (Color), y recomendación provista.
- Facilita el seguimiento de problemas crónicos para médicos reales que soliciten visualizar el historial generado por la app.

### 3.3. Control de Acceso (RBAC)
- **Rol Paciente:** Genera consultas y visualiza únicamente sus episodios previos con lenguaje sin jerga clínica.
- **Rol Clínico/Estudiante:** Analiza triajes agregados, sin identificadores del paciente, viendo explícitamente el porcentaje de "Banderas Rojas" generadas por día y el árbol de reglas ejecutado en cada consulta.

## 4. Fallbacks Críticos y Casos de Borde
Siendo un software sanitario, prima la seguridad del usuario y el principio de "No Hacer Daño":
1. **Regla de Sobre-Triaje:** En caso de recibir dos síntomas contradictorios o que caen en un punto ciego del árbol paramétrico, la aplicación elevará el caso automáticamente al riesgo superior (ej: De "Amarillo" a "Naranja").
2. **Caídas de Red:** Si el motor backend FastAPI no responde en 3 segundos, la interfaz React debe lanzar en pantalla completa el mensaje de fallo seguro: "Sistema fuera de línea. Asuma riesgo alto y llame a emergencias ante la duda." La aplicación NUNCA se quedará procesando indefinidamente asumiendo que el usuario está seguro.

## 5. Estrategia de Pruebas y Validación Clínica
- **Pruebas Unitarias Estrictas:** Cobertura 100% sobre el módulo de asignación de categorías del backend.
- **Casos Pre-programados:** Se desarrollará un test de regresión para asegurar que pacientes ficticios infartados (ej. disnea + dolor torácico) arrojen invariablemente el Nivel de Emergencia Rojo. No se aprobarán despliegues si alguna "Bandera Roja" falla silenciosamente.
