import React from 'react';
import { ArrowLeft, Trophy, Star, Award, Target, Sparkles, Lock } from 'lucide-react';

interface AchievementsScreenProps {
  onNavigate: (screen: string) => void;
  completedMissions: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  reward: string;
  category: 'missions' | 'streak' | 'special';
  unlocked: boolean;
  progress: number;
}

export function AchievementsScreen({ onNavigate, completedMissions }: AchievementsScreenProps) {
  // Calculate user progress
  const totalMissionsCompleted = completedMissions.length;
  const currentStreak = 1; // Mock streak - in real app would track consecutive days

  // Define achievements
  const achievements: Achievement[] = [
    {
      id: 'first-step',
      title: 'Primer Paso',
      description: 'Completa tu primera misión',
      icon: '🌱',
      requirement: 1,
      reward: 'Nube Bebé',
      category: 'missions',
      unlocked: totalMissionsCompleted >= 1,
      progress: Math.min(totalMissionsCompleted, 1),
    },
    {
      id: 'warrior',
      title: 'Guerrero del Bienestar',
      description: 'Completa 3 misiones',
      icon: '⚡',
      requirement: 3,
      reward: 'Nube Brillante',
      category: 'missions',
      unlocked: totalMissionsCompleted >= 3,
      progress: Math.min(totalMissionsCompleted, 3),
    },
    {
      id: 'dedicated',
      title: 'Dedicación Total',
      description: 'Completa 6 misiones',
      icon: '🌟',
      requirement: 6,
      reward: 'Nube Arcoíris',
      category: 'missions',
      unlocked: totalMissionsCompleted >= 6,
      progress: Math.min(totalMissionsCompleted, 6),
    },
    {
      id: 'master',
      title: 'Maestro de la Calma',
      description: 'Completa 10 misiones',
      icon: '👑',
      requirement: 10,
      reward: 'Nube Dorada',
      category: 'missions',
      unlocked: totalMissionsCompleted >= 10,
      progress: Math.min(totalMissionsCompleted, 10),
    },
    {
      id: 'streak-3',
      title: 'Constancia',
      description: 'Mantén una racha de 3 días',
      icon: '🔥',
      requirement: 3,
      reward: 'Corona de Fuego',
      category: 'streak',
      unlocked: currentStreak >= 3,
      progress: Math.min(currentStreak, 3),
    },
    {
      id: 'streak-7',
      title: 'Semana de Éxito',
      description: 'Mantén una racha de 7 días',
      icon: '💎',
      requirement: 7,
      reward: 'Diamante Brillante',
      category: 'streak',
      unlocked: currentStreak >= 7,
      progress: Math.min(currentStreak, 7),
    },
    {
      id: 'breath-master',
      title: 'Respiración Zen',
      description: 'Completa 5 ejercicios de respiración',
      icon: '🧘‍♀️',
      requirement: 5,
      reward: 'Aura de Paz',
      category: 'special',
      unlocked: false, // Would track specific mission type
      progress: 0,
    },
    {
      id: 'gratitude-master',
      title: 'Corazón Agradecido',
      description: 'Escribe 10 entradas de gratitud',
      icon: '💝',
      requirement: 10,
      reward: 'Corazón Dorado',
      category: 'special',
      unlocked: false,
      progress: 0,
    },
  ];

  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const lockedAchievements = achievements.filter((a) => !a.unlocked);

  // Mock rewards collection
  const rewards = [
    { id: 'baby-cloud', name: 'Nube Bebé', icon: '☁️', unlocked: totalMissionsCompleted >= 1 },
    { id: 'bright-cloud', name: 'Nube Brillante', icon: '✨', unlocked: totalMissionsCompleted >= 3 },
    { id: 'rainbow-cloud', name: 'Nube Arcoíris', icon: '🌈', unlocked: totalMissionsCompleted >= 6 },
    { id: 'golden-cloud', name: 'Nube Dorada', icon: '👑', unlocked: totalMissionsCompleted >= 10 },
    { id: 'fire-crown', name: 'Corona de Fuego', icon: '🔥', unlocked: currentStreak >= 3 },
    { id: 'diamond', name: 'Diamante Brillante', icon: '💎', unlocked: currentStreak >= 7 },
  ];

  const unlockedRewards = rewards.filter((r) => r.unlocked);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white/30 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-white" />
              <h1 className="text-xl text-white font-medium">Logros y Recompensas</h1>
            </div>
            <p className="text-white/80 text-sm mt-1">Tu progreso y colección</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="p-6 grid grid-cols-3 gap-4">
        <div className="bg-white rounded-[1.5rem] p-4 shadow-lg text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl text-[#4A4A68] mb-1">{unlockedAchievements.length}</div>
          <div className="text-xs text-[#9B9BB3]">Logros</div>
        </div>
        <div className="bg-white rounded-[1.5rem] p-4 shadow-lg text-center">
          <div className="text-3xl mb-2">🎁</div>
          <div className="text-2xl text-[#4A4A68] mb-1">{unlockedRewards.length}</div>
          <div className="text-xs text-[#9B9BB3]">Recompensas</div>
        </div>
        <div className="bg-white rounded-[1.5rem] p-4 shadow-lg text-center">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl text-[#4A4A68] mb-1">{currentStreak}</div>
          <div className="text-xs text-[#9B9BB3]">Días Racha</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-[1.5rem] p-1.5 flex gap-1 shadow-lg">
          <div className="flex-1 py-3 px-4 rounded-[1.2rem] bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white shadow-md text-center">
            Logros
          </div>
        </div>
      </div>

      {/* Achievements List */}
      <div className="flex-1 px-6 pb-6 space-y-6 overflow-y-auto">
        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#B8B5FF]" />
              <h2 className="text-lg text-[#4A4A68]">Desbloqueados</h2>
            </div>
            <div className="space-y-3">
              {unlockedAchievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className="bg-white rounded-[1.5rem] p-5 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] rounded-[1.2rem] flex items-center justify-center shadow-md flex-shrink-0">
                      <span className="text-3xl">{achievement.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-[#4A4A68] mb-1">{achievement.title}</h3>
                          <p className="text-sm text-[#9B9BB3]">{achievement.description}</p>
                        </div>
                        <div className="bg-gradient-to-br from-[#B8E986] to-[#8DD4F7] text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-md">
                          <Star className="w-3 h-3" />
                          Completado
                        </div>
                      </div>
                      <div className="mt-3 bg-[#F8F7FF] rounded-full p-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#B8B5FF]" />
                        <span className="text-sm text-[#4A4A68]">Recompensa: {achievement.reward}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-[#9B9BB3]" />
              <h2 className="text-lg text-[#4A4A68]">Por Desbloquear</h2>
            </div>
            <div className="space-y-3">
              {lockedAchievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className="bg-white/60 rounded-[1.5rem] p-5 shadow-md backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${(unlockedAchievements.length + index) * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-[#E8E5FF] rounded-[1.2rem] flex items-center justify-center shadow-md flex-shrink-0 relative">
                      <span className="text-3xl opacity-40">{achievement.icon}</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-[#9B9BB3]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#4A4A68] mb-1">{achievement.title}</h3>
                      <p className="text-sm text-[#9B9BB3] mb-3">{achievement.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[#9B9BB3]">Progreso</span>
                          <span className="text-xs text-[#4A4A68]">
                            {achievement.progress} / {achievement.requirement}
                          </span>
                        </div>
                        <div className="h-2 bg-[#E8E5FF] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] transition-all duration-500"
                            style={{ width: `${(achievement.progress / achievement.requirement) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-3 bg-[#F8F7FF] rounded-full p-2 flex items-center gap-2 opacity-60">
                        <Award className="w-4 h-4 text-[#9B9BB3]" />
                        <span className="text-sm text-[#9B9BB3]">Recompensa: {achievement.reward}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rewards Collection */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-[#B8B5FF]" />
            <h2 className="text-lg text-[#4A4A68]">Tu Colección</h2>
          </div>
          <div className="bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] rounded-[2rem] p-6 shadow-xl">
            <div className="grid grid-cols-3 gap-4">
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  className={`
                    bg-white/20 backdrop-blur-sm rounded-[1.2rem] p-4 text-center
                    ${reward.unlocked ? 'shadow-lg' : 'opacity-40'}
                  `}
                >
                  <div className="text-4xl mb-2">{reward.icon}</div>
                  <div className="text-xs text-white">{reward.name}</div>
                  {!reward.unlocked && (
                    <Lock className="w-3 h-3 text-white mx-auto mt-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-white rounded-[2rem] p-6 shadow-xl text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl">🌟</span>
          </div>
          <h3 className="text-lg text-[#4A4A68] mb-2">¡Sigue Avanzando!</h3>
          <p className="text-sm text-[#9B9BB3]">
            Cada logro es un paso hacia tu bienestar. Continúa completando misiones para desbloquear más recompensas.
          </p>
        </div>
      </div>

      {/* Animation styles */}
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