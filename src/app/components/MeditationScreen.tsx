import React, { useState } from 'react';
import { ArrowLeft, Wind, Brain, Play, Clock, Sparkles, Heart } from 'lucide-react';

interface MeditationScreenProps {
  onNavigate: (screen: string) => void;
}

export function MeditationScreen({ onNavigate }: MeditationScreenProps) {
  const [selectedType, setSelectedType] = useState<'todos' | 'respiración' | 'meditación'>('todos');
  const [activeExercise, setActiveExercise] = useState<any>(null);

  const exercises = [
    {
      id: 'box-breathing',
      title: 'Respiración Cuadrada',
      duration: '3 min',
      type: 'respiración',
      description: 'Técnica 4-4-4-4 para calmar la ansiedad rápidamente.',
      icon: Wind,
      color: 'from-[#B8D4FF] to-[#E5F0FF]',
      isQuick: true,
    },
    {
      id: 'deep-breathing',
      title: 'Respiración Profunda',
      duration: '5 min',
      type: 'respiración',
      description: 'Respiración diafragmática para reducir el estrés.',
      icon: Wind,
      color: 'from-[#8DD4F7] to-[#B8D4FF]',
      isQuick: true,
    },
    {
      id: 'breathing-long',
      title: 'Respiración Guiada Completa',
      duration: '15 min',
      type: 'respiración',
      description: 'Sesión completa de respiración guiada para relajación profunda.',
      icon: Wind,
      color: 'from-[#6BB5FF] to-[#A8D8FF]',
      isQuick: false,
    },
    {
      id: '54321-technique',
      title: 'Técnica 5-4-3-2-1',
      duration: '4 min',
      type: 'meditación',
      description: 'Técnica de anclaje sensorial para crisis de ansiedad.',
      icon: Brain,
      color: 'from-[#B8B5FF] to-[#D4D2FF]',
      isQuick: true,
    },
    {
      id: 'body-scan',
      title: 'Escaneo Corporal',
      duration: '10 min',
      type: 'meditación',
      description: 'Meditación guiada para conectar con tu cuerpo y liberar tensiones.',
      icon: Brain,
      color: 'from-[#B8B5FF] to-[#D4D2FF]',
      isQuick: false,
    },
    {
      id: 'mindful-meditation',
      title: 'Meditación Mindfulness',
      duration: '15 min',
      type: 'meditación',
      description: 'Practica la atención plena y el momento presente.',
      icon: Brain,
      color: 'from-[#D4D2FF] to-[#E8E5FF]',
      isQuick: false,
    },
  ];

  const filteredExercises = selectedType === 'todos' 
    ? exercises 
    : exercises.filter(ex => ex.type === selectedType);

  const quickExercises = filteredExercises.filter(ex => ex.isQuick);

  if (activeExercise) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setActiveExercise(null)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-[#B8B5FF]" />
            </button>
            <h1 className="text-2xl text-[#4A4A68]">Ejercicio</h1>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-xl">
            <div className={`w-full aspect-video bg-gradient-to-br ${activeExercise.color} rounded-[1.5rem] flex items-center justify-center mb-6`}>
              <Play className="w-16 h-16 text-white drop-shadow-lg" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 bg-gradient-to-br ${activeExercise.color} rounded-2xl`}>
                  <activeExercise.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl text-[#4A4A68]">{activeExercise.title}</h2>
                  <div className="flex items-center gap-2 text-[#9B9BB3] text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{activeExercise.duration}</span>
                  </div>
                </div>
              </div>

              <p className="text-[#6B7280] leading-relaxed">{activeExercise.description}</p>

              <button
                className="w-full bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white rounded-[1.5rem] py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Comenzar Ejercicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] overflow-y-auto">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-b-[2rem] p-6 shadow-lg mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => onNavigate('recursos')}
              className="w-10 h-10 bg-[#F8F7FF] rounded-full flex items-center justify-center hover:bg-[#E8E5FF] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#B8B5FF]" />
            </button>
            <div>
              <h1 className="text-2xl text-[#4A4A68]">Meditación y Respiración</h1>
              <p className="text-[#9B9BB3] text-sm">Ejercicios guiados para calmar tu mente</p>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-6 pb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'todos', label: 'Todos', icon: Sparkles },
              { id: 'respiración', label: 'Respiración', icon: Wind },
              { id: 'meditación', label: 'Meditación', icon: Brain },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as any)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300
                  ${selectedType === type.id 
                    ? 'bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white shadow-lg scale-105' 
                    : 'bg-white text-[#9B9BB3] hover:bg-[#F8F7FF]'
                  }
                `}
              >
                <type.icon className="w-4 h-4" />
                <span className="text-sm">{type.label}</span>
              </button>
            ))}
          </div>

          {quickExercises.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#B8B5FF]" />
                <h2 className="text-lg text-[#4A4A68]">Soluciones Rápidas</h2>
                <span className="text-xs text-[#9B9BB3]">(menos de 5 min)</span>
              </div>
              
              <div className="grid gap-3">
                {quickExercises.map((exercise) => {
                  const Icon = exercise.icon;
                  return (
                    <button
                      key={exercise.id}
                      onClick={() => setActiveExercise(exercise)}
                      className="bg-white rounded-[1.5rem] p-4 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-gradient-to-br ${exercise.color} rounded-2xl flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-[#4A4A68] font-medium">{exercise.title}</h3>
                            <span className="px-2 py-0.5 bg-green-100 rounded-full text-xs text-green-800">
                              Rápido
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[#9B9BB3] text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{exercise.duration}</span>
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <p className="text-[#6B7280] text-sm mt-3">{exercise.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-lg text-[#4A4A68]">
              {selectedType === 'todos' ? 'Todos los Ejercicios' : `Ejercicios de ${selectedType}`}
            </h2>
            
            <div className="grid gap-3">
              {filteredExercises.map((exercise) => {
                const Icon = exercise.icon;
                return (
                  <button
                    key={exercise.id}
                    onClick={() => setActiveExercise(exercise)}
                    className="bg-white rounded-[1.5rem] p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-gradient-to-br ${exercise.color} rounded-2xl flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-[#4A4A68] font-medium mb-1">{exercise.title}</h3>
                        <div className="flex items-center gap-2 text-[#9B9BB3] text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{exercise.duration}</span>
                        </div>
                      </div>
                      <Play className="w-5 h-5 text-[#B8B5FF]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#B8B5FF]/20 to-[#D4D2FF]/20 rounded-[1.5rem] p-5">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-[#B8B5FF] mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-[#4A4A68] font-semibold mb-1">Recuerda...</h4>
                <p className="text-[#9B9BB3] text-sm">
                  Cada pequeño paso cuenta. Está bien tomarse un tiempo para cuidar de tu salud mental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}