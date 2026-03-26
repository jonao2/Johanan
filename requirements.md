# Documentación de Requerimientos - MedicApp

## 1. Información General
- **Nombre del Proyecto:** MedicApp - Evaluador de Síntomas Inteligente
- **Carrera Objetivo:** Medicina / Ciencias de la Salud

## 2. Problemática Identificada
El triaje inicial en la atención médica primaria a menudo es ineficiente debido a la sobrecarga de pacientes con síntomas leves que podrían ser manejados en casa, mientras que casos críticos pueden retrasarse por falta de una evaluación rápida. Existe una necesidad de una herramienta accesible que oriente al usuario (estudiante o paciente) sobre la severidad de sus síntomas y los pasos a seguir de inmediato.

## 3. Funcionalidades Principales (MVP)
1. **Registro de Paciente y Síntomas:** Formulario intuitivo para ingresar datos básicos y malestares actuales.
2. **Sistema de Triage Dinámico:** Identificación automática de "Banderas Rojas" (síntomas de emergencia como dificultad respiratoria) que alertan al usuario para acudir a urgencias.
3. **Generación de Recomendaciones:** Sugerencias basadas en primeros auxilios y cuidados guiados para síntomas leves (fiebre, dolor de cabeza, etc.).
4. **Historial de Consultas:** Persistencia de datos en una base de datos local (SQLite) para seguimiento posterior de los pacientes.
5. **Disclaimer Médico:** Aviso legal obligatorio indicando que la herramienta es informativa y no reemplaza a un profesional.

## 4. Stack Tecnológico
- **Lenguaje:** Python 3.x
- **Frontend/Interfaz:** Streamlit (para una app de datos rápida y funcional).
- **Base de Datos:** SQLite (para almacenamiento ligero y portátil).
- **Procesamiento de Lógica:** Lógica condicional basada en protocolos de salud básicos.

## 5. Portabilidad
El software está diseñado para ejecutarse localmente mediante un entorno virtual de Python, pero su interfaz es compatible con navegadores web, lo que permite su uso en computadoras, tablets y smartphones mediante red local o despliegue en la nube.
