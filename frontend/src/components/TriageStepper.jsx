import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, CheckCircle2, ShieldAlert } from 'lucide-react'

const STEPS = [
  {
    id: 'info',
    title: 'Información Básica',
    subtitle: 'Comencemos con tus datos'
  },
  {
    id: 'sintomas',
    title: 'Síntomas',
    subtitle: '¿Qué sientes hoy?'
  },
  {
    id: 'duracion',
    title: 'Duración',
    subtitle: '¿Hace cuánto tiempo?'
  }
]

const SINTOMAS_LIST = [
  "Fiebre", "Dolor de cabeza", "Tos", "Fatiga", 
  "Dolor de estómago", "Dolor muscular", "Dificultad para respirar"
]

export default function TriageStepper({ onComplete, onCancel }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    nombre: '',
    estado_general: 'Regular',
    sintomas: [],
    dias_sintomas: 1
  })

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(formData)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
    else onCancel()
  }

  const toggleSintoma = (s) => {
    setFormData(prev => ({
      ...prev,
      sintomas: prev.sintomas.includes(s)
        ? prev.sintomas.filter(item => item !== s)
        : [...prev.sintomas, s]
    }))
  }

  return (
    <div className="max-w-2xl mx-auto glass p-10 rounded-[40px] border-medic-border/50 shadow-2xl relative overflow-hidden">
      <div className="ecg-line opacity-20"></div>
      
      {/* Progress Bar */}
      <div className="flex justify-between mb-12 relative px-4">
        <div className="absolute top-5 left-8 right-8 h-px bg-medic-border/30 -z-10"></div>
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold transition-all duration-500 ${
              index < currentStep 
                ? 'bg-medic-success text-white shadow-lg shadow-medic-success/20' 
                : index === currentStep
                  ? 'bg-medic-primary text-white shadow-xl shadow-medic-primary/30 scale-110'
                  : 'bg-slate-900/50 text-medic-border border border-medic-border'
            }`}>
              {index < currentStep ? <CheckCircle2 size={18} /> : index + 1}
            </div>
            <span className={`text-[9px] uppercase font-black tracking-widest ${
              index <= currentStep ? 'text-medic-primary' : 'text-gray-600'
            }`}>
              {step.id}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="min-h-[320px]"
        >
          <div className="mb-10">
            <h2 className="text-4xl font-black tracking-tight mb-2 italic">
              {STEPS[currentStep].title}
            </h2>
            <p className="text-gray-400 font-medium">{STEPS[currentStep].subtitle}</p>
          </div>

          {currentStep === 0 && (
            <div className="space-y-8">
              <div className="group">
                <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em] group-focus-within:text-medic-primary transition-colors">Nombre del Paciente</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950/50 border border-medic-border p-5 rounded-2xl outline-none focus:border-medic-primary focus:ring-4 focus:ring-medic-primary/10 transition-all text-xl font-bold placeholder:text-gray-700"
                  placeholder="Ingrese nombre..."
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Estado General Detectado</label>
                <div className="grid grid-cols-2 gap-4">
                  {['Excelente', 'Regular', 'Mal', 'Crítico'].map(e => (
                    <button
                      key={e}
                      onClick={() => setFormData({...formData, estado_general: e})}
                      className={`p-5 rounded-2xl border-2 transition-all font-bold text-sm text-left px-6 ${
                        formData.estado_general === e 
                          ? 'border-medic-primary bg-medic-primary/10 text-medic-primary shadow-inner' 
                          : 'border-medic-border bg-slate-950/20 hover:border-gray-600 text-gray-400'
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SINTOMAS_LIST.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSintoma(s)}
                  className={`p-5 rounded-2xl border-2 transition-all text-left flex justify-between items-center group relative overflow-hidden ${
                    formData.sintomas.includes(s)
                      ? s === 'Dificultad para respirar' 
                        ? 'bg-medic-emergency border-medic-emergency text-white' 
                        : 'bg-medic-primary border-medic-primary text-white shadow-xl shadow-medic-primary/20'
                      : 'bg-slate-950/30 border-medic-border hover:border-medic-primary/50'
                  }`}
                >
                  <span className={`font-bold text-sm ${!formData.sintomas.includes(s) && 'text-gray-300'}`}>{s}</span>
                  {s === 'Dificultad para respirar' && (
                    <ShieldAlert 
                      size={18} 
                      className={formData.sintomas.includes(s) ? 'text-white' : 'text-medic-emergency'} 
                    />
                  )}
                  {formData.sintomas.includes(s) && (
                    <motion.div 
                      layoutId="pulse"
                      className="absolute inset-0 bg-white/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-12 py-8">
              <div className="text-center relative">
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                   <div className="w-32 h-32 bg-medic-primary/10 rounded-full blur-3xl animate-pulse"></div>
                </div>
                <span className="text-8xl font-black text-medic-primary mb-2 block tracking-tighter italic">{formData.dias_sintomas}</span>
                <span className="text-xs text-gray-500 font-black uppercase tracking-[0.3em]">Días de Evolución</span>
              </div>
              <div className="px-6">
                <input 
                  type="range" min="1" max="14" 
                  className="w-full h-1.5 bg-medic-border/50 rounded-lg appearance-none cursor-pointer accent-medic-primary"
                  value={formData.dias_sintomas}
                  onChange={(e) => setFormData({...formData, dias_sintomas: parseInt(e.target.value)})}
                />
                <div className="flex justify-between text-[10px] font-black text-gray-600 mt-6 tracking-widest uppercase">
                  <span>Agudo</span>
                  <span>Estable</span>
                  <span>Crónico</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4 mt-12 pt-10 border-t border-medic-border/30">
        <button 
          onClick={handleBack}
          className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-[0.2em] text-gray-400"
        >
          <ChevronLeft size={18} /> Atrás
        </button>
        <button 
          onClick={handleNext}
          disabled={currentStep === 0 && !formData.nombre}
          className="flex-grow flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-medic-primary hover:bg-medic-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all font-black text-[10px] uppercase tracking-[0.2em] text-white shadow-2xl shadow-medic-primary/40 disabled:opacity-30 disabled:grayscale"
        >
          {currentStep === STEPS.length - 1 ? 'Iniciar Análisis Final' : 'Siguiente Módulo'} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
