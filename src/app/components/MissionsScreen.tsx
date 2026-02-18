import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, Wind, Smile, Users, Sparkles, Check } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'breathing' | 'gratitude' | 'movement' | 'social' | 'mindfulness' | 'affirmation';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  points: number;
}

interface MissionsScreenProps {
  onNavigate: (screen: string) => void;
  onMissionComplete: (missionId: string) => void;
  completedMissions: string[];
}

export function MissionsScreen({ onNavigate, onMissionComplete, completedMissions }: MissionsScreenProps) {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const missions: Mission[] = [
    {
      id: 'breathing',
      title: 'Respiración Consciente',
      description: 'Practica 3 minutos de respiración profunda para calmar tu mente',
      duration: '3 min',
      category: 'breathing',
      icon: Wind,
      color: '#8DD4F7',
      bgColor: '#E8F7FF',
      points: 10,
    },
    {
      id: 'gratitude',
      title: 'Diario de Gratitud',
      description: 'Escribe 3 cosas por las que te sientes agradecido/a hoy',
      duration: '5 min',
      category: 'gratitude',
      icon: Heart,
      color: '#FFB5C5',
      bgColor: '#FFF0F3',
      points: 15,
    },
    {
      id: 'movement',
      title: 'Pausa Activa',
      description: 'Haz 5 minutos de estiramientos o una caminata corta',
      duration: '5 min',
      category: 'movement',
      icon: Sparkles,
      color: '#B8E986',
      bgColor: '#F1FFE8',
      points: 15,
    },
    {
      id: 'affirmation',
      title: 'Afirmaciones Positivas',
      description: 'Lee y repite afirmaciones que fortalezcan tu autoestima',
      duration: '2 min',
      category: 'affirmation',
      icon: Star,
      color: '#FFE5B4',
      bgColor: '#FFF9ED',
      points: 10,
    },
    {
      id: 'social',
      title: 'Conexión Social',
      description: 'Envía un mensaje a alguien que te importa',
      duration: '5 min',
      category: 'social',
      icon: Users,
      color: '#D4D2FF',
      bgColor: '#F3F2FF',
      points: 15,
    },
    {
      id: 'mindfulness',
      title: 'Momento Mindful',
      description: 'Dedica 1 minuto a observar tus pensamientos sin juzgarlos',
      duration: '1 min',
      category: 'mindfulness',
      icon: Smile,
      color: '#B8B5FF',
      bgColor: '#E8E5FF',
      points: 10,
    },
  ];

  const totalPoints = completedMissions.length * 10;
  const completionRate = Math.round((completedMissions.length / missions.length) * 100);

  if (selectedMission) {
    return (
      <MissionDetail
        mission={selectedMission}
        onBack={() => setSelectedMission(null)}
        onComplete={() => {
          onMissionComplete(selectedMission.id);
          setSelectedMission(null);
        }}
        isCompleted={completedMissions.includes(selectedMission.id)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] overflow-y-auto">
      {/* Header */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-[#B8B5FF]" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl text-[#4A4A68]">Misiones Diarias</h1>
            <p className="text-sm text-[#9B9BB3]">Completa actividades para mejorar tu bienestar</p>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] rounded-[2rem] p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">Tu progreso hoy</p>
              <p className="text-white text-3xl font-bold">{completedMissions.length}/{missions.length}</p>
            </div>
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Star className="w-10 h-10 text-white" fill="white" />
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-white/90 text-sm mt-2">{completionRate}% completado • {totalPoints} puntos</p>
        </div>
      </div>

      {/* Mission Cards */}
      <div className="px-6 pb-24 space-y-4">
        {missions.map((mission) => {
          const isCompleted = completedMissions.includes(mission.id);
          const Icon = mission.icon;

          return (
            <button
              key={mission.id}
              onClick={() => !isCompleted && setSelectedMission(mission)}
              disabled={isCompleted}
              className={`
                w-full bg-white rounded-[2rem] p-5 shadow-lg hover:shadow-xl transition-all duration-300
                ${isCompleted ? 'opacity-60' : 'hover:scale-102 active:scale-98'}
              `}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: mission.bgColor }}
                >
                  {isCompleted ? (
                    <Check className="w-8 h-8" style={{ color: mission.color }} />
                  ) : (
                    <Icon className="w-8 h-8" style={{ color: mission.color }} />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[#4A4A68] font-medium">{mission.title}</h3>
                    {isCompleted && (
                      <span className="text-xs bg-[#B8E986]/20 text-[#5A8F2E] px-2 py-1 rounded-full">
                        ✓ Completada
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#9B9BB3] mb-2">{mission.description}</p>
                  <div className="flex items-center gap-3 text-xs text-[#9B9BB3]">
                    <span>⏱️ {mission.duration}</span>
                    <span>⭐ +{mission.points} puntos</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Motivational Message */}
      {completedMissions.length === missions.length && (
        <div className="fixed bottom-24 left-0 right-0 px-6 animate-in slide-in-from-bottom duration-500">
          <div className="bg-gradient-to-r from-[#B8E986] to-[#8DD4F7] rounded-[2rem] p-6 shadow-2xl">
            <div className="text-center space-y-2">
              <p className="text-2xl">🎉</p>
              <h3 className="text-white font-bold text-lg">¡Increíble trabajo!</h3>
              <p className="text-white/90 text-sm">Has completado todas las misiones de hoy. Tu nube está radiante.</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}

interface MissionDetailProps {
  mission: Mission;
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

function MissionDetail({ mission, onBack, onComplete, isCompleted }: MissionDetailProps) {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const Icon = mission.icon;

  const startMission = () => {
    setIsActive(true);
    setProgress(0);

    // Simulate progress over time
    const duration = parseInt(mission.duration) * 60 * 1000; // Convert to milliseconds
    const interval = 100; // Update every 100ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, interval);
  };

  const getActivityContent = () => {
    switch (mission.category) {
      case 'breathing':
        return (
          <div className="space-y-4">
            <p className="text-[#4A4A68] text-center">Sigue este patrón de respiración:</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-[#E8F7FF] p-4 rounded-[1.5rem]">
                <div className="w-8 h-8 bg-[#8DD4F7] rounded-full flex items-center justify-center text-white font-bold">1</div>
                <p className="text-[#4A4A68]">Inhala profundo por 4 segundos</p>
              </div>
              <div className="flex items-center gap-3 bg-[#E8F7FF] p-4 rounded-[1.5rem]">
                <div className="w-8 h-8 bg-[#8DD4F7] rounded-full flex items-center justify-center text-white font-bold">2</div>
                <p className="text-[#4A4A68]">Mantén el aire por 4 segundos</p>
              </div>
              <div className="flex items-center gap-3 bg-[#E8F7FF] p-4 rounded-[1.5rem]">
                <div className="w-8 h-8 bg-[#8DD4F7] rounded-full flex items-center justify-center text-white font-bold">3</div>
                <p className="text-[#4A4A68]">Exhala lentamente por 4 segundos</p>
              </div>
            </div>
          </div>
        );
      case 'gratitude':
        return (
          <div className="space-y-4">
            <p className="text-[#4A4A68] text-center">Reflexiona sobre estas preguntas:</p>
            <div className="space-y-3">
              <div className="bg-[#FFF0F3] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68]">💝 ¿Qué persona te hizo sonreír hoy?</p>
              </div>
              <div className="bg-[#FFF0F3] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68]">🌟 ¿Qué logro, por pequeño que sea, tuviste?</p>
              </div>
              <div className="bg-[#FFF0F3] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68]">🌈 ¿Qué te hace sentir afortunado/a?</p>
              </div>
            </div>
          </div>
        );
      case 'movement':
        return (
          <div className="space-y-4">
            <p className="text-[#4A4A68] text-center">Movimientos sugeridos:</p>
            <div className="space-y-3">
              <div className="bg-[#F1FFE8] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68]">🙆‍♀️ Estira los brazos hacia arriba</p>
              </div>
              <div className="bg-[#F1FFE8] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68]">🔄 Rota el cuello suavemente</p>
              </div>
              <div className="bg-[#F1FFE8] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68]">🚶‍♀️ Camina en tu lugar</p>
              </div>
            </div>
          </div>
        );
      case 'affirmation':
        return (
          <div className="space-y-4">
            <p className="text-[#4A4A68] text-center">Repite estas afirmaciones:</p>
            <div className="space-y-3">
              <div className="bg-[#FFF9ED] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68] text-center italic">"Soy suficiente tal como soy"</p>
              </div>
              <div className="bg-[#FFF9ED] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68] text-center italic">"Merezco amor y respeto"</p>
              </div>
              <div className="bg-[#FFF9ED] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68] text-center italic">"Estoy orgulloso/a de mi progreso"</p>
              </div>
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="space-y-4">
            <p className="text-[#4A4A68] text-center">Ideas para conectar:</p>
            <div className="space-y-3">
              <div className="bg-[#F3F2FF] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68]">💌 Envía un mensaje de agradecimiento</p>
              </div>
              <div className="bg-[#F3F2FF] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68]">📞 Llama a alguien que extrañas</p>
              </div>
              <div className="bg-[#F3F2FF] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68]">🤗 Comparte cómo te sientes</p>
              </div>
            </div>
          </div>
        );
      case 'mindfulness':
        return (
          <div className="space-y-4">
            <p className="text-[#4A4A68] text-center">Práctica de atención plena:</p>
            <div className="space-y-3">
              <div className="bg-[#E8E5FF] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68]">🧘 Encuentra una posición cómoda</p>
              </div>
              <div className="bg-[#E8E5FF] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68]">👁️ Observa tus pensamientos sin juzgarlos</p>
              </div>
              <div className="bg-[#E8E5FF] p-4 rounded-[1.5rem]">
                <p className="text-[#4A4A68]">🌊 Déjalos pasar como nubes en el cielo</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF]">
      {/* Header */}
      <div className="p-6">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 text-[#B8B5FF]" />
        </button>
      </div>

      {/* Mission Hero */}
      <div className="px-6 pb-6">
        <div
          className="w-full rounded-[2rem] p-8 shadow-xl flex flex-col items-center"
          style={{ backgroundColor: mission.bgColor }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-lg"
            style={{ backgroundColor: mission.color }}
          >
            <Icon className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl text-[#4A4A68] text-center mb-2">{mission.title}</h2>
          <p className="text-[#9B9BB3] text-center mb-4">{mission.description}</p>
          <div className="flex items-center gap-4 text-sm text-[#9B9BB3]">
            <span>⏱️ {mission.duration}</span>
            <span>⭐ +{mission.points} puntos</span>
          </div>
        </div>
      </div>

      {/* Activity Content */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-[2rem] p-6 shadow-lg">
          {getActivityContent()}
        </div>
      </div>

      {/* Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white to-transparent">
        {!isActive && !isCompleted && (
          <button
            onClick={startMission}
            className="w-full bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white rounded-[1.5rem] py-4 px-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-102"
          >
            Comenzar Misión
          </button>
        )}

        {isActive && (
          <div className="space-y-3">
            <div className="w-full bg-white rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-[#9B9BB3] text-sm">
              {progress < 100 ? 'En progreso...' : '¡Completada!'} {Math.round(progress)}%
            </p>
          </div>
        )}

        {isCompleted && (
          <button
            onClick={onBack}
            className="w-full bg-[#B8E986] text-white rounded-[1.5rem] py-4 px-6 shadow-xl"
          >
            ✓ Completada
          </button>
        )}
      </div>

      <style>{`
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}