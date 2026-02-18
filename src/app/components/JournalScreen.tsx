import React, { useState } from 'react';
import { ArrowLeft, Mic, Palette, Save, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { SecurityBadge } from './SecurityBadge';

interface JournalScreenProps {
  onNavigate: (screen: string) => void;
  fromScreen?: string;  // ← NUEVO PARÁMETRO
}

interface JournalEntry {
  id: string;
  text: string;
  date: Date;
  theme: string;
}

const themes = [
  { id: 'lavender', name: 'Lavanda', bg: 'bg-gradient-to-br from-[#E8E5FF] to-[#F3F2FF]', accent: 'text-[#B8B5FF]', border: 'border-[#B8B5FF]/30' },
  { id: 'sky', name: 'Cielo', bg: 'bg-gradient-to-br from-[#E5F0FF] to-[#F0F8FF]', accent: 'text-[#8DD4F7]', border: 'border-[#8DD4F7]/30' },
  { id: 'rose', name: 'Rosa', bg: 'bg-gradient-to-br from-[#FFF5F9] to-[#FFE5F0]', accent: 'text-[#FFB5C5]', border: 'border-[#FFB5C5]/30' },
  { id: 'cream', name: 'Crema', bg: 'bg-gradient-to-br from-[#FFF9F0] to-[#FFF5F0]', accent: 'text-[#D4A574]', border: 'border-[#D4A574]/30' },
  { id: 'mint', name: 'Menta', bg: 'bg-gradient-to-br from-[#E5F9F0] to-[#F0F9F5]', accent: 'text-[#4A9B7F]', border: 'border-[#4A9B7F]/30' },
];

export function JournalScreen({ onNavigate, fromScreen = 'home' }: JournalScreenProps) {  // ← CAMBIADO
  const [entryText, setEntryText] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      text: 'Hoy fue un día especial. Me sentí más en paz conmigo mismo/a.',
      date: new Date(Date.now() - 86400000),
      theme: 'lavender',
    },
  ]);

  const handleSave = () => {
    if (entryText.trim()) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        text: entryText,
        date: new Date(),
        theme: selectedTheme.id,
      };
      setEntries([newEntry, ...entries]);
      setEntryText('');
    }
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // In a real app, this would trigger voice recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setEntryText(prev => prev + ' [Texto de audio simulado: Me siento bien hoy]');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] overflow-y-auto">
      <div className="max-w-md mx-auto pb-6">
        {/* Header */}
        <div className="bg-white rounded-b-[2rem] p-6 shadow-lg mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => onNavigate(fromScreen)}  
              className="w-10 h-10 bg-[#F8F7FF] rounded-full flex items-center justify-center hover:bg-[#E8E5FF] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#B8B5FF]" />
            </button>
            <h1 className="text-2xl text-[#4A4A68]">Mi Diario Privado</h1>
          </div>

          <SecurityBadge 
            message="Tus entradas están encriptadas y son completamente privadas" 
            variant="compact"
          />
        </div>

        <div className="px-6 space-y-6">
          {/* New Entry Card */}
          <div className={`${selectedTheme.bg} rounded-[2rem] p-6 shadow-xl border-2 ${selectedTheme.border}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className={`w-5 h-5 ${selectedTheme.accent}`} />
                <span className="text-sm text-[#6B7280]">
                  {new Date().toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <button
                onClick={() => setShowThemePicker(!showThemePicker)}
                className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <Palette className={`w-4 h-4 ${selectedTheme.accent}`} />
              </button>
            </div>

            {/* Theme Picker */}
            {showThemePicker && (
              <div className="mb-4 bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-3 animate-in fade-in duration-300">
                <p className="text-xs text-[#9B9BB3] mb-2">Elige tu tema:</p>
                <div className="flex gap-2">
                  {themes.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setSelectedTheme(theme);
                        setShowThemePicker(false);
                      }}
                      className={`w-10 h-10 ${theme.bg} rounded-full border-2 ${
                        theme.id === selectedTheme.id ? theme.border + ' scale-110' : 'border-transparent'
                      } transition-all duration-300 hover:scale-105`}
                      title={theme.name}
                    />
                  ))}
                </div>
              </div>
            )}

            <textarea
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
              placeholder="¿Cómo te sientes hoy? Escribe tus pensamientos aquí..."
              className="w-full bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4 min-h-[150px] text-[#4A4A68] placeholder-[#9B9BB3] resize-none focus:outline-none focus:ring-2 focus:ring-[#B8B5FF]/30 transition-all"
            />

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleVoiceInput}
                className={`flex-1 ${
                  isRecording 
                    ? 'bg-gradient-to-r from-[#FF9494] to-[#FFB5C5] animate-pulse' 
                    : 'bg-white/80 hover:bg-white'
                } rounded-[1.25rem] py-3 px-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
              >
                <Mic className={`w-5 h-5 ${isRecording ? 'text-white' : selectedTheme.accent}`} />
                <span className={`text-sm ${isRecording ? 'text-white' : 'text-[#4A4A68]'}`}>
                  {isRecording ? 'Grabando...' : 'Usar voz'}
                </span>
              </button>

              <button
                onClick={handleSave}
                disabled={!entryText.trim()}
                className="bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white rounded-[1.25rem] py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                <span className="text-sm">Guardar</span>
              </button>
            </div>

            <SecurityBadge 
              message="Los audios están encriptados y son privados" 
              variant="compact"
              className="mt-3"
            />
          </div>

          {/* Previous Entries */}
          <div className="space-y-4">
            <h2 className="text-lg text-[#4A4A68] px-2">Entradas anteriores</h2>
            
            {entries.map((entry) => {
              const entryTheme = themes.find(t => t.id === entry.theme) || themes[0];
              return (
                <div
                  key={entry.id}
                  className={`${entryTheme.bg} rounded-[1.5rem] p-5 shadow-lg border ${entryTheme.border} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className={`w-4 h-4 ${entryTheme.accent}`} />
                      <span className="text-xs text-[#6B7280]">
                        {entry.date.toLocaleDateString('es-ES', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="w-8 h-8 bg-white/60 rounded-full flex items-center justify-center hover:bg-[#FF9494]/20 transition-colors group"
                    >
                      <Trash2 className="w-4 h-4 text-[#9B9BB3] group-hover:text-[#FF9494]" />
                    </button>
                  </div>
                  
                  <p className="text-[#4A4A68] leading-relaxed">{entry.text}</p>
                </div>
              );
            })}

            {entries.length === 0 && (
              <div className="text-center py-12 text-[#9B9BB3]">
                <p>Aún no hay entradas.</p>
                <p className="text-sm mt-2">Empieza a escribir tu primer entrada arriba 💜</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-from-bottom-4 {
          from {
            transform: translateY(1rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-in {
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fade-in;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .slide-in-from-bottom-4 {
          animation-name: slide-in-from-bottom-4;
        }
      `}</style>
    </div>
  );
}