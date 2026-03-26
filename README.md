# 🩺 MedicApp - Asistente Médico Inteligente

Este proyecto es una plataforma de evaluación de síntomas y triaje médico, diseñada para ofrecer recomendaciones inmediatas basadas en la salud del usuario y optimizar el flujo de trabajo en la carrera de **Medicina**.

## 📄 Requerimientos del Proyecto
Los detalles formales sobre la problemática, el MVP y el stack tecnológico se encuentran en el archivo [requirements.md](file:///c:/Users/Usuario/Downloads/codigos/Johanan/requirements.md).

## 🚀 Cómo Ejecutar (Cualquier Dispositivo)

### Opción 1: Maqueta Interactiva (Universal)
Para una demostración rápida en **cualquier dispositivo** (incluyendo móviles sin Python):
1. Abrir el archivo [index.html](file:///c:/Users/Usuario/Downloads/codigos/Johanan/index.html) en cualquier navegador moderno.
2. No requiere conexión a internet ni servidor.

### Opción 2: Aplicación Completa (Streamlit + SQLite)
Requiere entorno Python:
1. Activar el entorno virtual: `.\venv\Scripts\activate.ps1`
2. Instalar dependencias: `pip install -r requirements.txt`
3. Ejecutar: `streamlit run medicapp.py`

## 🤖 Registro de Proceso de IA
Este proyecto fue desarrollado y asistido integralmente por herramientas de Inteligencia Artificial (**Antigravity**). La IA ayudó en las siguientes áreas:
- **Diseño de Lógica de Triage:** Generación del árbol de decisiones para identificar síntomas de "Bandera Roja".
- **Optimización de Interfaz:** Creación de estilos personalizados para Streamlit y desarrollo de la maqueta HTML/Tailwind responsiva.
- **Persistencia de Datos:** Implementación del sistema de base de datos SQLite para el historial de pacientes.
- **Documentación:** Redacción de requerimientos y guías de usuario siguiendo estándares profesionales.

## 🛠️ Stack Tecnológico
- **Python / Streamlit** (Backend y UI principal)
- **SQLite** (Base de datos local)
- **HTML5 / CSS3 / Tailwind** (Maqueta de portabilidad universal)

---
⚠️ **Disclaimer Legal:** *Esta aplicación es una herramienta informativa y no sustituye un diagnóstico médico profesional. En caso de emergencia, acuda inmediatamente a un centro de salud.*

