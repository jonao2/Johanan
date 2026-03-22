# Script para iniciar la App de Streamlit
.\venv\Scripts\activate.ps1
if ($?) {
    streamlit run medicapp.py
} else {
    Write-Host "No se encontró el entorno virtual 'venv'. Ejecuta el proceso de instalación primero." -ForegroundColor Red
}
