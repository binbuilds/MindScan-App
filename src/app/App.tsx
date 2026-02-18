import React, { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeScreen } from './components/HomeScreen';
import { ToolsScreen } from './components/ToolsScreen';
import { MissionsScreen } from './components/MissionsScreen';
import { ChatbotScreen } from './components/ChatbotScreen';
import { AchievementsScreen } from './components/AchievementsScreen';
import { RecursosScreen } from './components/RecursosScreen';
import { JournalScreen } from './components/JournalScreen';
import { EmotionHistoryScreen } from './components/EmotionHistoryScreen';
import { PetProgressScreen } from './components/PetProgressScreen';
import { ExpertChatScreen } from './components/ExpertChatScreen';
import { Menu } from 'lucide-react';
import BotonEmergencia from './components/BotonEmergencia';
import { MeditationScreen } from './components/MeditationScreen';  // <-- Añadir esta línea
type Screen = 'login' | 'onboarding' | 'home' | 'tools' | 'missions' | 'chatbot' | 'achievements' | 'meditation' | 'journal' | 'history' | 'recursos' | 'pet' | 'expert-chat';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userName, setUserName] = useState('');
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [cloudMood, setCloudMood] = useState<'calm' | 'distressed'>('distressed');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');
  const [emotionHistory, setEmotionHistory] = useState<Array<{
    emotion: string;
    note: string;
    date: Date;
  }>>([]);

  // Calculate cloud mood based on completed missions
  useEffect(() => {
    // If user completes 3 or more missions, the cloud becomes calm
    if (completedMissions.length >= 3) {
      setCloudMood('calm');
    } else {
      setCloudMood('distressed');
    }
  }, [completedMissions]);

  const handleLogin = (name: string) => {
    setUserName(name);
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: string) => {
  setPreviousScreen(currentScreen);  
  setCurrentScreen(screen as Screen);
  setShowDemoMenu(false);
};

  const handleMissionComplete = (missionId: string) => {
    if (!completedMissions.includes(missionId)) {
      setCompletedMissions([...completedMissions, missionId]);
    }
  };

  const handleEmotionRegistered = (emotion: string, note: string) => {
    setEmotionHistory([
      { emotion, note, date: new Date() },
      ...emotionHistory
    ]);
  };
  
  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#F8F9FE] relative overflow-hidden">
      {/* Botón de emergencia - solo visible en home */}
      <BotonEmergencia currentScreen={currentScreen} />
      
      {/* Demo Navigation Button - Only show after login */}
      {currentScreen !== 'login' && (
        <button
          onClick={() => setShowDemoMenu(!showDemoMenu)}
          className="fixed top-4 right-4 z-50 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
        >
          <Menu className="w-5 h-5 text-[#B8B5FF]" />
        </button>
      )}

      {/* Demo Menu */}
      {showDemoMenu && (
        <div className="fixed top-16 right-4 z-50 bg-white rounded-[1.5rem] shadow-2xl p-4 space-y-2 animate-in fade-in zoom-in duration-300">
          <p className="text-xs text-[#9B9BB3] mb-2 px-2">Navegación Demo</p>
          {[
            { id: 'login', label: 'Login' },
            { id: 'onboarding', label: 'Onboarding' },
            { id: 'home', label: 'Inicio' },
            { id: 'missions', label: 'Misiones' },
            { id: 'tools', label: 'Herramientas' },
            { id: 'chatbot', label: 'Chatbot' },
            { id: 'achievements', label: 'Logros' },
            { id: 'recursos', label: 'Recursos' },
            { id: 'pet', label: 'Progreso de Mascota' },
            { id: 'expert-chat', label: 'Chat Experto' },
          ].map((screen) => (
            <button
              key={screen.id}
              onClick={() => handleNavigate(screen.id)}
              className={`
                w-full text-left px-4 py-2 rounded-xl transition-all duration-300
                ${currentScreen === screen.id 
                  ? 'bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white' 
                  : 'text-[#4A4A68] hover:bg-[#F8F7FF]'
                }
              `}
            >
              <span className="text-sm">{screen.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Mobile Frame */}
      <div className="relative h-screen">
        {currentScreen === 'login' && (
          <LoginScreen onLogin={handleLogin} />
        )}
        
        {currentScreen === 'onboarding' && (
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        )}
        
        {currentScreen === 'home' && (
          <HomeScreen 
            onNavigate={handleNavigate} 
            userName={userName}
            cloudMood={cloudMood}
            completedMissionsToday={completedMissions.length}
            onEmotionRegistered={handleEmotionRegistered}
          />
        )}
        
        {currentScreen === 'missions' && (
          <MissionsScreen 
            onNavigate={handleNavigate}
            onMissionComplete={handleMissionComplete}
            completedMissions={completedMissions}
          />
        )}
        
        {currentScreen === 'tools' && (
          <ToolsScreen onNavigate={handleNavigate} />
        )}
        
        {currentScreen === 'chatbot' && (
          <ChatbotScreen onNavigate={handleNavigate} userName={userName} fromScreen={previousScreen}/>
        )}
        
        {currentScreen === 'achievements' && (
          <AchievementsScreen onNavigate={handleNavigate} completedMissions={completedMissions} />
        )}
        
        {currentScreen === 'meditation' && (
          <MeditationScreen onNavigate={handleNavigate} />   // <-- Ahora usa el componente real
        )}
        
        {currentScreen === 'journal' && (
          <JournalScreen onNavigate={handleNavigate} fromScreen={previousScreen} />
        )}
        
        {currentScreen === 'history' && (
          <EmotionHistoryScreen 
            onNavigate={handleNavigate} 
            fromScreen={previousScreen}
            emotionHistory={emotionHistory}
          />
        )}
        
        {currentScreen === 'recursos' && (
          <RecursosScreen onNavigate={handleNavigate} />
        )}
        
        {currentScreen === 'pet' && (
          <PetProgressScreen 
            onNavigate={handleNavigate} 
            daysActive={15} 
            completedMissions={completedMissions.length} 
          />
        )}

        {/* ESTE ES EL QUE FALTABA - Chat con Experto */}
        {currentScreen === 'expert-chat' && (
          <ExpertChatScreen onNavigate={handleNavigate} userName={userName} />
        )}
      </div>
    </div>
  );
}

// Placeholder components for other screens
function MeditationPlaceholder({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] rounded-full flex items-center justify-center mx-auto shadow-xl">
          <span className="text-5xl">🧘‍♀️</span>
        </div>
        <h2 className="text-2xl text-[#4A4A68]">Meditación y Respiración</h2>
        <p className="text-[#9B9BB3]">Esta sección está en desarrollo</p>
        <button
          onClick={() => onNavigate('tools')}
          className="bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white rounded-[1.5rem] py-3 px-8 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Volver
        </button>
      </div>
    </div>
  );
}