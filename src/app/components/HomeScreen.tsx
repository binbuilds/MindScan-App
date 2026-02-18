import React from 'react';
import { Volume2, Home, BookOpen, BarChart3, Target, MessageSquare, Trophy, Wind, Heart } from 'lucide-react';
import { CloudMascot } from './CloudMascot';
import { EmotionRegistrationModal } from './EmotionRegistrationModal';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  userName: string;
  cloudMood: 'calm' | 'distressed';
  completedMissionsToday: number;
  onEmotionRegistered?: (emotion: string, note: string) => void;
}

export function HomeScreen({ onNavigate, userName, cloudMood, completedMissionsToday, onEmotionRegistered }: HomeScreenProps) {
  const [soundEnabled, setSoundEnabled] = React.useState(false);
  const [showEmotionModal, setShowEmotionModal] = React.useState(false);

  const handleEmotionSubmit = (emotion: string, note: string) => {
    if (onEmotionRegistered) {
      onEmotionRegistered(emotion, note);
    }
    // Show success feedback
    setTimeout(() => {
      onNavigate('history');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-[#4A4A68]">Hola, {userName} 👋</h2>
          <button 
            onClick={() => setShowEmotionModal(true)}
            className="text-sm text-[#B8B5FF] mt-1 hover:underline flex items-center gap-1"
          >
            ¿Cómo te sientes hoy? <Heart className="w-4 h-4" />
          </button>
        </div>
        
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md
            ${soundEnabled ? 'bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] text-white shadow-lg' : 'bg-white text-[#9B9BB3]'}
          `}
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Cloud Mascot Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <div className="w-full max-w-sm">
          <button
            onClick={() => onNavigate('pet')}
            className="relative w-full group"
          >
            {/* Soft glow behind cloud */}
            <div className={`absolute inset-0 blur-3xl rounded-full scale-110 ${
              cloudMood === 'calm' 
                ? 'bg-gradient-to-br from-[#B8E986]/30 to-[#8DD4F7]/30' 
                : 'bg-gradient-to-br from-[#B8B5FF]/20 to-[#D4D2FF]/20'
            }`}></div>
            
            <div className={cloudMood === 'calm' ? 'relative animate-float-calm group-hover:scale-105 transition-transform duration-300' : 'relative animate-float-distressed group-hover:scale-105 transition-transform duration-300'}>
              <CloudMascot state={cloudMood} className="w-full" />
            </div>
            
            {/* Tap indicator */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs text-[#B8B5FF]">Toca para ver progreso ✨</span>
            </div>
          </button>
          
          <div className="text-center mt-8 space-y-3">
            <p className="text-xl text-[#4A4A68]">
              {cloudMood === 'calm' ? '¡Tu nubecita está feliz!' : 'Tu nubecita necesita cariño'}
            </p>
            <p className="text-sm text-[#9B9BB3] px-4">
              {cloudMood === 'calm' 
                ? '¡Excelente trabajo! Sigue cuidando de ti mismo/a. 💙' 
                : 'Parece que has estado pasando por un momento difícil. Vamos a trabajar juntos para sentirte mejor. 💜'
              }
            </p>
          </div>

          {/* Daily Progress */}
          {completedMissionsToday > 0 && (
            <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-[1.5rem] px-4 py-3 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#B8B5FF]" />
                <span className="text-sm text-[#4A4A68]">Misiones completadas hoy</span>
              </div>
              <span className="text-lg font-bold text-[#B8B5FF]">{completedMissionsToday}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 space-y-3">
        {/* Emotion Registration Button - Prominent */}
        <button
          onClick={() => setShowEmotionModal(true)}
          className="w-full bg-gradient-to-r from-[#FFB5C5] to-[#FFE5F0] text-white rounded-[1.5rem] py-5 px-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-102 flex items-center justify-between"
        >
          <span className="text-lg">Registrar mi emoción</span>
          <Heart className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => onNavigate('missions')}
          className="w-full bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white rounded-[1.5rem] py-5 px-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-102 flex items-center justify-between"
        >
          <span className="text-lg">Ver Misiones Diarias</span>
          <Target className="w-6 h-6" />
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('achievements')}
            className="bg-white text-[#B8B5FF] rounded-[1.5rem] py-4 px-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            <span>Logros</span>
          </button>
          
          <button
            onClick={() => onNavigate('expert-chat')}
            className="bg-white text-[#B8B5FF] rounded-[1.5rem] py-4 px-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Chat Experto</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white/80 backdrop-blur-md rounded-t-[2rem] shadow-2xl px-6 py-4">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center gap-2 text-[#B8B5FF] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] rounded-[1rem] flex items-center justify-center shadow-md">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Inicio</span>
          </button>
          
          <button
            onClick={() => onNavigate('recursos')}
            className="flex flex-col items-center gap-2 text-[#9B9BB3] hover:text-[#B8B5FF] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-white rounded-[1rem] flex items-center justify-center shadow-md hover:shadow-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs">Recursos</span>
          </button>
          
          <button
            onClick={() => onNavigate('history')}
            className="flex flex-col items-center gap-2 text-[#9B9BB3] hover:text-[#B8B5FF] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-white rounded-[1rem] flex items-center justify-center shadow-md hover:shadow-lg">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="text-xs">Historial</span>
          </button>
        </div>
      </nav>

      {/* Emotion Registration Modal */}
      <EmotionRegistrationModal
        isOpen={showEmotionModal}
        onClose={() => setShowEmotionModal(false)}
        onSubmit={handleEmotionSubmit}
      />

      {/* Floating animation styles */}
      <style>{`
        @keyframes float-distressed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-calm {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.03); }
        }
        .animate-float-distressed {
          animation: float-distressed 3s ease-in-out infinite;
        }
        .animate-float-calm {
          animation: float-calm 4s ease-in-out infinite;
        }
        .hover\\\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}