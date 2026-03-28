import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PlusCircle, 
  History, 
  LayoutDashboard, 
  Stethoscope, 
  Activity, 
  MapPin, 
  ShieldAlert,
  ChevronRight,
  User,
  Calendar,
  Settings,
  AlertTriangle,
  ArrowRight
} from 'lucide-react'
import TriageStepper from './components/TriageStepper'

const API_URL = 'http://localhost:8000'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/history`)
      setHistory(response.data)
    } catch (error) {
      console.error("Error fetching history:", error)
    }
  }

  const handleTriageComplete = async (formData) => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/triage`, formData)
      setResult(response.data)
      setActiveTab('result')
      fetchHistory()
    } catch (error) {
      console.error("Error submitting triage:", error)
      alert("Error al conectar con el servidor backend.")
    } finally {
      setLoading(false)
    }
  }

  const lastUrgencia = history.length > 0 ? history[0].urgencia : 1

  return (
    <div className="flex h-screen w-full bg-medic-bg text-[#f8fafc] overflow-hidden selection:bg-medic-primary/30">
      {/* Persistent Sidebar */}
      <aside className="w-20 lg:w-64 bg-slate-950/40 border-r border-medic-border flex flex-col items-center lg:items-stretch p-6 backdrop-blur-3xl z-20">
        <div className="flex items-center gap-3 mb-12 text-medic-primary">
          <div className="p-2.5 bg-medic-primary/10 rounded-2xl animate-pulse-heart">
            <Stethoscope size={28} />
          </div>
          <span className="text-2xl font-black tracking-tighter hidden lg:block italic">MEDIC<span className="text-white">APP</span></span>
        </div>

        <nav className="space-y-4 flex-grow">
          <SidebarItem 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            icon={<LayoutDashboard size={22} />}
            label="Dashboard"
          />
          <SidebarItem 
            active={activeTab === 'triage'} 
            onClick={() => setActiveTab('triage')}
            icon={<Activity size={22} />}
            label="Nuevo Triaje"
          />
          <SidebarItem 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')}
            icon={<History size={22} />}
            label="Historial"
          />
          <div className="h-px bg-medic-border my-6"></div>
          <SidebarItem icon={<Calendar size={22} />} label="Citas" disabled />
          <SidebarItem icon={<MapPin size={22} />} label="Farmacias" disabled />
        </nav>

        <div className="mt-auto space-y-4">
          <SidebarItem icon={<Settings size={22} />} label="Ajustes" />
          <div className="p-4 glass rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-medic-primary to-blue-400 rounded-xl flex items-center justify-center text-white font-bold">
              J
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-bold">Johanan</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Plan Premium</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="flex-grow overflow-y-auto relative custom-scrollbar">
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medic-primary/10 blur-[120px] -z-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-medic-emergency/5 blur-[80px] -z-10 rounded-full"></div>

        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
          <header className="flex justify-between items-start mb-12 relative">
            <div className="ecg-line"></div>
            <div>
              <p className="text-medic-primary font-bold tracking-[0.4em] mb-3 uppercase text-[10px] opacity-80 flex items-center gap-2">
                <span className="w-8 h-px bg-medic-primary/40"></span> Pilot Command Center
              </p>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter italic">
                {activeTab === 'dashboard' ? 'Overview' : activeTab.toUpperCase()}
              </h1>
            </div>
            <AnimatePresence>
              {lastUrgencia >= 4 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-medic-emergency/10 border border-medic-emergency/30 px-6 py-4 rounded-3xl flex items-center gap-4 text-medic-emergency backdrop-blur-md"
                >
                  <div className="w-3 h-3 bg-medic-emergency rounded-full animate-ping"></div>
                  <span className="font-extrabold text-xs tracking-widest uppercase">Crítico: Acción Inmediata</span>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Action Hub Banner */}
                <div className={`p-8 rounded-[40px] border relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 ${
                  lastUrgencia >= 4 ? 'bg-medic-emergency/20 border-medic-emergency/40' : 'bg-medic-primary/10 border-medic-primary/30'
                }`}>
                  <div className="relative z-10">
                    <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase mb-4 w-fit ${
                      lastUrgencia >= 4 ? 'bg-medic-emergency text-white' : 'bg-medic-primary text-white'
                    }`}>
                      {lastUrgencia >= 4 ? 'Acción Requerida' : 'Estado Actual'}
                    </div>
                    <h2 className="text-4xl font-black mb-4 leading-tight">
                      {lastUrgencia >= 4 
                        ? 'Tu salud requiere atención inmediata.' 
                        : 'Tu estado general parece estable.'}
                    </h2>
                    <p className="text-slate-300 max-w-md mb-8">
                      {lastUrgencia >= 4 
                        ? 'Hemos detectado síntomas críticos. El sistema sugiere agendar una cita de urgencia o acudir a un centro clínico.' 
                        : 'Continúa monitoreando tus signos vitales y realiza un nuevo triaje si notas cambios.'}
                    </p>
                    <button 
                      onClick={() => setActiveTab('triage')}
                      className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-2xl transition-all hover:scale-105 ${
                        lastUrgencia >= 4 
                          ? 'bg-medic-emergency text-white shadow-medic-emergency/20' 
                          : 'bg-medic-primary text-white shadow-medic-primary/30'
                      }`}
                    >
                      {lastUrgencia >= 4 ? 'Ver Centros de Urgencia' : 'Nuevo Triaje'} <ChevronRight size={20} />
                    </button>
                  </div>
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
                    </svg>
                    <div className={`absolute inset-0 flex items-center justify-center text-8xl font-black ${
                      lastUrgencia >= 4 ? 'text-medic-emergency' : 'text-medic-primary'
                    }`}>
                      {lastUrgencia}
                    </div>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <StatCard label="Consultas Semanales" value={history.length} change="+2" />
                  <StatCard label="Puntaje de Bienestar" value="84%" change="-4%" trend="down" />
                  <div className="glass p-8 rounded-[35px] flex flex-col justify-center">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6 border-b border-medic-border pb-4">Actividad Reciente</p>
                    <div className="space-y-4">
                      {history.slice(0, 3).map(h => (
                        <div key={h.id} className="flex items-center gap-4 text-sm">
                          <span className={`w-2 h-2 rounded-full ${h.urgencia >= 4 ? 'bg-medic-emergency' : 'bg-medic-primary'}`}></span>
                          <span className="font-bold flex-grow">{h.fecha.split(' ')[0]}</span>
                          <span className="text-gray-500 italic">Evaluado</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Evolution Chart (SVG-based) */}
                <div className="glass p-10 rounded-[40px]">
                   <h3 className="text-xl font-bold mb-8">Evolución de Síntomas</h3>
                   <div className="h-48 w-full relative">
                      <svg className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <motion.path 
                          d="M0 100 Q 200 40 400 80 T 800 20 L 1200 60" 
                          fill="none" 
                          stroke="#3b82f6" 
                          strokeWidth="4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <path d="M0 100 Q 200 40 400 80 T 800 20 L 1200 60 L 1200 200 L 0 200 Z" fill="url(#gradient)" />
                      </svg>
                      <div className="absolute top-0 left-0 w-full h-full flex justify-between items-end text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] pt-4">
                        <span>Lunes</span>
                        <span>Miercoles</span>
                        <span>Viernes</span>
                        <span>Hoy</span>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'triage' && (
              <motion.div 
                key="triage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              >
                <TriageStepper 
                  onComplete={handleTriageComplete} 
                  onCancel={() => setActiveTab('dashboard')} 
                />
              </motion.div>
            )}

            {activeTab === 'result' && result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
              >
                <div className={`p-10 rounded-[45px] border-l-[12px] shadow-2xl ${
                  result.urgencia >= 4 ? 'bg-medic-emergency/10 border-medic-emergency glass' : 'bg-medic-primary/10 border-medic-primary glass'
                }`}>
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <span className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-1">Informe Final</span>
                      <h2 className="text-4xl font-black">Evaluación Médica</h2>
                    </div>
                    <div className="p-4 glass-light rounded-2xl text-center">
                      <span className="text-3xl font-black block">{result.urgencia}</span>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">NIVEL RIESGO</span>
                    </div>
                  </div>

                  {result.urgencia >= 4 ? (
                    <div className="space-y-6 mb-10">
                       <div className="p-6 bg-medic-emergency border border-medic-emergency/20 rounded-[30px] flex gap-4 shadow-xl">
                          <AlertTriangle className="text-white flex-shrink-0" size={32} />
                          <div>
                            <h4 className="text-xl font-bold text-white mb-2">Protocolo de Gravedad Detecado</h4>
                            <p className="text-rose-100 font-medium">{result.recomendacion}</p>
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-center">
                          <div className="p-4 glass rounded-2xl text-medic-emergency border-medic-emergency/30">Llamar 911</div>
                          <div className="p-4 glass rounded-2xl text-medic-emergency border-medic-emergency/30">Hospital Cercano</div>
                       </div>
                    </div>
                  ) : (
                    <div className="p-8 glass-light rounded-[35px] border border-white/5 mb-10">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <History size={20} className="text-medic-primary" /> Sugerencia del Asistente
                      </h3>
                      <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">{result.recomendacion}</div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setActiveTab('dashboard')}
                      className="flex-grow py-5 bg-white/5 hover:bg-white/10 rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
                    >
                      Aceptar y Salir
                    </button>
                    <button 
                      onClick={() => setActiveTab('triage')}
                      className={`flex-grow py-5 rounded-2xl font-black uppercase text-xs tracking-widest text-white shadow-xl transition-all ${
                        result.urgencia >= 4 ? 'bg-medic-emergency shadow-medic-emergency/20' : 'bg-medic-primary shadow-medic-primary/20'
                      }`}
                    >
                      Nuevo Triaje
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div 
                key="history"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {history.length > 0 ? history.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass group p-6 rounded-[30px] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-medic-primary/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center shrink-0 ${
                        item.urgencia >= 4 ? 'bg-medic-emergency/20 text-medic-emergency' : 'bg-medic-primary/20 text-medic-primary'
                      }`}>
                        {item.urgencia >= 4 ? <ShieldAlert size={28} /> : <Activity size={28} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-xl font-bold">{item.nombre}</h4>
                          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-gray-400 font-bold uppercase tracking-wider">{item.fecha.split(' ')[0]}</span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Síntomas: <span className="text-gray-300">{item.sintomas.join(', ')}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="text-right hidden md:block">
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Urgency</p>
                          <p className={`font-black text-xl ${item.urgencia >= 4 ? 'text-medic-emergency' : 'text-medic-primary'}`}>LEVEL {item.urgencia}</p>
                       </div>
                       <ChevronRight className="text-gray-700 group-hover:text-medic-primary transition-all" />
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-32 glass rounded-[40px] border-dashed">
                    <p className="text-gray-500 font-bold italic">No se han encontrado registros en el historial de vuelo.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

function SidebarItem({ active, onClick, icon, label, disabled = false }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`group w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all relative ${
        active 
          ? 'bg-medic-primary text-white shadow-2xl shadow-medic-primary/40' 
          : disabled 
            ? 'text-gray-700 cursor-not-allowed'
            : 'text-gray-500 hover:bg-white/5 hover:text-medic-primary'
      }`}
    >
      <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      <span className="text-sm lg:block hidden flex-grow text-left">{label}</span>
      {active && <motion.div layoutId="activeInd" className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full lg:block hidden" />}
      {disabled && <span className="absolute right-2 text-[8px] bg-medic-border px-1.5 py-0.5 rounded-full text-gray-500 lg:block hidden">LOCK</span>}
    </button>
  )
}

function StatCard({ label, value, change, trend = 'up' }) {
  return (
    <div className="glass p-8 rounded-[35px] relative overflow-hidden group hover:border-medic-primary/30 transition-all">
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-medic-primary/5 rounded-full blur-2xl group-hover:bg-medic-primary/10 transition-all"></div>
      <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-end gap-3 mt-2">
        <h3 className="text-4xl font-black">{value}</h3>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg mb-1 ${
          trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
        }`}>
          {change}
        </span>
      </div>
    </div>
  )
}

export default App
