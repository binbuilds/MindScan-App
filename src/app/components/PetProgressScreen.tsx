import React from 'react';
import { ArrowLeft, Star, Crown, Sparkles, TrendingUp } from 'lucide-react';
import { CloudMascot } from './CloudMascot';

interface PetProgressScreenProps {
  onNavigate: (screen: string) => void;
  daysActive: number;
  completedMissions: number;
}

interface GrowthStage {
  id: number;
  name: string;
  daysRequired: number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const growthStages: GrowthStage[] = [
  {
    id: 1,
    name: 'Nubecita Bebé',
    daysRequired: 0,
    description: 'Tu nubecita acaba de nacer y necesita mucho cariño',
    icon: Sparkles,
    color: 'from-[#D4D2FF] to-[#E8E5FF]',
  },
  {
    id: 2,
    name: 'Nubecita Joven',
    daysRequired: 7,
    description: 'Tu nubecita está creciendo gracias a tu constancia',
    icon: Star,
    color: 'from-[#B8B5FF] to-[#D4D2FF]',
  },
  {
    id: 3,
    name: 'Nube Adulta',
    daysRequired: 21,
    description: 'Tu nube ha madurado y brilla con energía positiva',
    icon: Crown,
    color: 'from-[#8DD4F7] to-[#B8B5FF]',
  },
  {
    id: 4,
    name: 'Nube Campeona',
    daysRequired: 50,
    description: '¡Tu nube ha alcanzado su máximo esplendor!',
    icon: Crown,
    color: 'from-[#B8E986] to-[#8DD4F7]',
  },
];

export function PetProgressScreen({ onNavigate, daysActive, completedMissions }: PetProgressScreenProps) {
  const getCurrentStage = (): GrowthStage => {
    let currentStage = growthStages[0];
    for (const stage of growthStages) {
      if (daysActive >= stage.daysRequired) {
        currentStage = stage;
      }
    }
    return currentStage;
  };

  const getNextStage = (): GrowthStage | null => {
    const current = getCurrentStage();
    const currentIndex = growthStages.findIndex(s => s.id === current.id);
    return currentIndex < growthStages.length - 1 ? growthStages[currentIndex + 1] : null;
  };

  const currentStage = getCurrentStage();
  const nextStage = getNextStage();
  const daysUntilNext = nextStage ? nextStage.daysRequired - daysActive : 0;
  const progressPercent = nextStage 
    ? ((daysActive - currentStage.daysRequired) / (nextStage.daysRequired - currentStage.daysRequired)) * 100
    : 100;

  const CurrentIcon = currentStage.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] overflow-y-auto">
      <div className="max-w-md mx-auto pb-6">
        {/* Header */}
        <div className="bg-white rounded-b-[2rem] p-6 shadow-lg mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => onNavigate('home')}
              className="w-10 h-10 bg-[#F8F7FF] rounded-full flex items-center justify-center hover:bg-[#E8E5FF] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#B8B5FF]" />
            </button>
            <h1 className="text-2xl text-[#4A4A68]">Progreso de tu Nubecita</h1>
          </div>

          <p className="text-[#9B9BB3]">
            Tu constancia ayuda a tu nubecita a crecer y evolucionar
          </p>
        </div>

        <div className="px-6 space-y-6">
          {/* Current Stage Display */}
          <div className={`bg-gradient-to-br ${currentStage.color} rounded-[2rem] p-8 shadow-xl`}>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <CurrentIcon className="w-5 h-5 text-white" />
                <span className="text-white text-sm">Nivel {currentStage.id}</span>
              </div>
              <h2 className="text-2xl text-white mb-2">{currentStage.name}</h2>
              <p className="text-white/90 text-sm">{currentStage.description}</p>
            </div>

            <div className="relative max-w-[200px] mx-auto">
              <CloudMascot state="calm" className="w-full animate-float-calm" />
              {currentStage.id >= 3 && (
                <div className="absolute -top-4 -right-4 animate-pulse">
                  <Crown className="w-8 h-8 text-[#FCD34D] drop-shadow-lg" />
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-[1.5rem] p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-[#B8B5FF]" />
                <span className="text-xs text-[#9B9BB3]">Días activo</span>
              </div>
              <p className="text-3xl text-[#B8B5FF]">{daysActive}</p>
            </div>
            
            <div className="bg-white rounded-[1.5rem] p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-[#8DD4F7]" />
                <span className="text-xs text-[#9B9BB3]">Misiones totales</span>
              </div>
              <p className="text-3xl text-[#8DD4F7]">{completedMissions}</p>
            </div>
          </div>

          {/* Progress to Next Level */}
          {nextStage ? (
            <div className="bg-white rounded-[2rem] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-[#4A4A68]">Progreso al siguiente nivel</h3>
                <span className="text-sm text-[#9B9BB3]">{Math.round(progressPercent)}%</span>
              </div>

              <div className="relative h-3 bg-[#F8F9FE] rounded-full overflow-hidden mb-4">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#B8B5FF] to-[#8DD4F7] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="bg-gradient-to-br from-[#F8F9FE] to-[#E8E5FF] rounded-[1.5rem] p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 bg-gradient-to-br ${nextStage.color} rounded-xl`}>
                    <nextStage.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#4A4A68] mb-1">{nextStage.name}</h4>
                    <p className="text-xs text-[#9B9BB3] mb-2">{nextStage.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-[#B8B5FF]">{daysUntilNext} días</span>
                      <span className="text-[#9B9BB3]">para el próximo nivel</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#B8E986] to-[#8DD4F7] rounded-[2rem] p-6 shadow-xl text-white text-center">
              <Crown className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl mb-2">¡Nivel Máximo Alcanzado!</h3>
              <p className="text-white/90 text-sm">
                Tu nubecita ha alcanzado su máximo esplendor. ¡Sigue cuidándola con tu constancia!
              </p>
            </div>
          )}

          {/* All Stages Timeline */}
          <div className="bg-white rounded-[2rem] p-6 shadow-xl">
            <h3 className="text-lg text-[#4A4A68] mb-6">Todas las etapas</h3>
            <div className="space-y-4">
              {growthStages.map((stage, index) => {
                const StageIcon = stage.icon;
                const isCompleted = daysActive >= stage.daysRequired;
                const isCurrent = stage.id === currentStage.id;
                
                return (
                  <div key={stage.id} className="relative">
                    {index < growthStages.length - 1 && (
                      <div className="absolute left-[1.75rem] top-12 w-0.5 h-8 bg-[#E8E5FF]" />
                    )}
                    <div className={`flex items-start gap-4 ${isCurrent ? 'scale-105' : ''} transition-all duration-300`}>
                      <div className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg
                        ${isCompleted 
                          ? `bg-gradient-to-br ${stage.color}` 
                          : 'bg-[#F8F9FE]'
                        }
                      `}>
                        <StageIcon className={`w-6 h-6 ${isCompleted ? 'text-white' : 'text-[#9B9BB3]'}`} />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-[#4A4A68] ${isCurrent ? 'font-bold' : ''}`}>
                            {stage.name}
                          </h4>
                          {isCurrent && (
                            <span className="px-2 py-0.5 bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white text-xs rounded-full">
                              Actual
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#9B9BB3] mb-2">{stage.description}</p>
                        <p className="text-xs text-[#B8B5FF]">
                          {stage.daysRequired === 0 ? 'Nivel inicial' : `${stage.daysRequired} días`}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivation Card */}
          <div className="bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] rounded-[2rem] p-6 shadow-xl text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💪</span>
              </div>
              <div>
                <h3 className="text-lg mb-2">Sigue así</h3>
                <p className="text-sm text-white/90">
                  Tu constancia es la clave. Cada día que completas misiones y cuidas de tu bienestar,
                  tu nubecita crece más fuerte. ¡No te rindas!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-calm {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.03); }
        }
        .animate-float-calm {
          animation: float-calm 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}