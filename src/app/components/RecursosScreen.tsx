import React, { useState } from 'react';
import { ArrowLeft, Wind, Brain, Heart, BookOpen, Sparkles, Play, Clock, Info, MessageSquare, MessageCircle, Book, Calendar } from 'lucide-react';

interface RecursosScreenProps {
  onNavigate: (screen: string) => void;
}

interface Exercise {
  id: string;
  title: string;
  duration: string;
  type: 'rápido' | 'profundo';
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  isQuick?: boolean;
}

export function RecursosScreen({ onNavigate }: RecursosScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

  const categories = [
    { id: 'all', label: 'Todo', icon: Sparkles },
    { id: 'breathing', label: 'Respiración', icon: Wind },
    { id: 'meditation', label: 'Meditación', icon: Brain },
    { id: 'grounding', label: 'Grounding', icon: Heart },
    { id: 'info', label: 'Información', icon: BookOpen },
  ];

  const exercises: Exercise[] = [
    {
      id: 'box-breathing',
      title: 'Respiración Cuadrada',
      duration: '3 min',
      type: 'rápido',
      category: 'breathing',
      description: 'Técnica de respiración 4-4-4-4 para calmar la ansiedad rápidamente.',
      icon: Wind,
      color: 'from-[#B8D4FF] to-[#E5F0FF]',
      isQuick: true,
    },
    {
      id: 'deep-breathing',
      title: 'Respiración Profunda',
      duration: '5 min',
      type: 'rápido',
      category: 'breathing',
      description: 'Respiración diafragmática para reducir el estrés.',
      icon: Wind,
      color: 'from-[#8DD4F7] to-[#B8D4FF]',
      isQuick: true,
    },
    {
      id: 'breathing-long',
      title: 'Respiración Guiada Completa',
      duration: '15 min',
      type: 'profundo',
      category: 'breathing',
      description: 'Sesión completa de respiración guiada para relajación profunda.',
      icon: Wind,
      color: 'from-[#6BB5FF] to-[#A8D8FF]',
      isQuick: false,
    },
    {
      id: '54321-technique',
      title: 'Técnica 5-4-3-2-1',
      duration: '4 min',
      type: 'rápido',
      category: 'meditation',
      description: 'Técnica de anclaje sensorial para crisis de ansiedad.',
      icon: Brain,
      color: 'from-[#B8B5FF] to-[#D4D2FF]',
      isQuick: true,
    },
    {
      id: 'body-scan',
      title: 'Escaneo Corporal',
      duration: '10 min',
      type: 'profundo',
      category: 'meditation',
      description: 'Meditación guiada para conectar con tu cuerpo y liberar tensiones.',
      icon: Brain,
      color: 'from-[#B8B5FF] to-[#D4D2FF]',
      isQuick: false,
    },
    {
      id: 'mindful-meditation',
      title: 'Meditación Mindfulness',
      duration: '15 min',
      type: 'profundo',
      category: 'meditation',
      description: 'Practica la atención plena y el momento presente.',
      icon: Brain,
      color: 'from-[#D4D2FF] to-[#E8E5FF]',
      isQuick: false,
    },
    {
      id: 'quick-grounding',
      title: 'Grounding Rápido',
      duration: '3 min',
      type: 'rápido',
      category: 'grounding',
      description: 'Ejercicio rápido para regresar al presente.',
      icon: Heart,
      color: 'from-[#FFE5F0] to-[#FFF5F9]',
      isQuick: true,
    },
    {
      id: 'grounding-walk',
      title: 'Caminar Consciente',
      duration: '8 min',
      type: 'profundo',
      category: 'grounding',
      description: 'Ejercicio de conexión con el presente mientras caminas.',
      icon: Heart,
      color: 'from-[#FFB5C5] to-[#FFE5F0]',
      isQuick: false,
    },
    {
      id: 'stress-info',
      title: 'Entender el Estrés',
      duration: '5 min',
      type: 'rápido',
      category: 'info',
      description: 'Aprende cómo funciona el estrés y por qué tu cuerpo reacciona así.',
      icon: BookOpen,
      color: 'from-[#FFF9F0] to-[#FFF5F0]',
      isQuick: true,
    },
    {
      id: 'anxiety-info',
      title: 'Comprender la Ansiedad',
      duration: '6 min',
      type: 'rápido',
      category: 'info',
      description: 'Información sobre la ansiedad y estrategias para manejarla.',
      icon: BookOpen,
      color: 'from-[#E5F9F0] to-[#F0F9F5]',
      isQuick: true,
    },
  ];

  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : exercises.filter(ex => ex.category === selectedCategory);

  const quickExercises = filteredExercises.filter(ex => ex.isQuick === true);
  const deepExercises = filteredExercises.filter(ex => ex.type === 'profundo');
  const nonQuickExercises = filteredExercises.filter(ex => !ex.isQuick && ex.type !== 'profundo');

  // Función para obtener el nombre de la categoría
  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.label : 'Todos';
  };

  if (activeExercise) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] p-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setActiveExercise(null)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-[#B8B5FF]" />
            </button>
            <h1 className="text-2xl text-[#4A4A68]">Ejercicio</h1>
          </div>

          {/* Exercise Content */}
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
                    <span className="px-2 py-0.5 bg-[#E8E5FF] rounded-full text-xs text-[#B8B5FF]">
                      {activeExercise.type}
                    </span>
                    {activeExercise.isQuick && (
                      <span className="px-2 py-0.5 bg-green-100 rounded-full text-xs text-green-800">
                        Solución Rápida
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-[#6B7280] leading-relaxed">{activeExercise.description}</p>

              {/* Exercise Instructions */}
              <div className="bg-[#F8F9FE] rounded-[1.5rem] p-6 space-y-4 mt-6">
                <h3 className="text-lg text-[#4A4A68] flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#B8B5FF]" />
                  Cómo hacerlo
                </h3>
                
                {activeExercise.id === 'box-breathing' && (
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#B8B5FF] rounded-full flex items-center justify-center text-white flex-shrink-0">1</div>
                      <div>
                        <p className="text-[#4A4A68]">Inhala por la nariz durante 4 segundos</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#B8B5FF] rounded-full flex items-center justify-center text-white flex-shrink-0">2</div>
                      <div>
                        <p className="text-[#4A4A68]">Mantén el aire durante 4 segundos</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#B8B5FF] rounded-full flex items-center justify-center text-white flex-shrink-0">3</div>
                      <div>
                        <p className="text-[#4A4A68]">Exhala por la boca durante 4 segundos</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#B8B5FF] rounded-full flex items-center justify-center text-white flex-shrink-0">4</div>
                      <div>
                        <p className="text-[#4A4A68]">Pausa durante 4 segundos antes de repetir</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeExercise.id === '54321-technique' && (
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#FFB5C5] rounded-full flex items-center justify-center text-white flex-shrink-0">5</div>
                      <div>
                        <p className="text-[#4A4A68]">Nombra 5 cosas que puedas VER</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#FFB5C5] rounded-full flex items-center justify-center text-white flex-shrink-0">4</div>
                      <div>
                        <p className="text-[#4A4A68]">Nombra 4 cosas que puedas TOCAR</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#FFB5C5] rounded-full flex items-center justify-center text-white flex-shrink-0">3</div>
                      <div>
                        <p className="text-[#4A4A68]">Nombra 3 cosas que puedas OÍR</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#FFB5C5] rounded-full flex items-center justify-center text-white flex-shrink-0">2</div>
                      <div>
                        <p className="text-[#4A4A68]">Nombra 2 cosas que puedas OLER</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#FFB5C5] rounded-full flex items-center justify-center text-white flex-shrink-0">1</div>
                      <div>
                        <p className="text-[#4A4A68]">Nombra 1 cosa que puedas SABOREAR</p>
                      </div>
                    </div>
                  </div>
                )}

                {!['box-breathing', '54321-technique'].includes(activeExercise.id) && (
                  <p className="text-[#6B7280]">
                    Encuentra un lugar cómodo y tranquilo. Sigue las instrucciones del video y tómate tu tiempo.
                  </p>
                )}
              </div>

              <button
                className="w-full bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white rounded-[1.5rem] py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2"
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
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] pb-6 overflow-y-auto">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white rounded-b-[2rem] p-6 shadow-lg mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => onNavigate('home')}
              className="w-10 h-10 bg-[#F8F7FF] rounded-full flex items-center justify-center hover:bg-[#E8E5FF] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#B8B5FF]" />
            </button>
            <h1 className="text-2xl text-[#4A4A68]">Recursos</h1>
          </div>

          <p className="text-[#9B9BB3]">
            Accede a ejercicios y contenido para tu bienestar emocional
          </p>
        </div>

        <div className="px-6 space-y-6">
          {/* Chat con Experto - Destacado al inicio */}
          <button
            onClick={() => onNavigate('expert-chat')}
            className="w-full bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] rounded-[1.5rem] p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-102 flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-white font-bold text-lg">Chat con Experto</h3>
              <p className="text-white/90 text-sm">Habla con un profesional ahora</p>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">→</span>
            </div>
          </button>

          {/* Herramientas adicionales */}
          <div className="space-y-3">
            <h2 className="text-lg text-[#4A4A68] font-semibold">Herramientas</h2>
            
            {/* Chatbot MindBot */}
            <button
              onClick={() => onNavigate('chatbot')}
              className="w-full bg-white rounded-[1.5rem] p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#B8B5FF]/20 to-[#D4D2FF]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-[#B8B5FF]" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-[#4A4A68] font-semibold">Habla con MindBot</h3>
                <p className="text-[#9B9BB3] text-sm">Comparte cómo te sientes y recibe apoyo</p>
              </div>
              <span className="text-[#9B9BB3]">›</span>
            </button>

            {/* Meditación y Respiración */}
            <button
              onClick={() => onNavigate('meditation')}
              className="w-full bg-white rounded-[1.5rem] p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#B8B5FF]/20 to-[#D4D2FF]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Wind className="w-6 h-6 text-[#B8B5FF]" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-[#4A4A68] font-semibold">Meditación y Respiración</h3>
                <p className="text-[#9B9BB3] text-sm">Ejercicios guiados para calmar tu mente</p>
              </div>
              <span className="text-[#9B9BB3]">›</span>
            </button>

            {/* Mi Diario Privado */}
            <button
              onClick={() => onNavigate('journal')}
              className="w-full bg-white rounded-[1.5rem] p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#B8B5FF]/20 to-[#D4D2FF]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Book className="w-6 h-6 text-[#B8B5FF]" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-[#4A4A68] font-semibold">Mi Diario Privado</h3>
                <p className="text-[#9B9BB3] text-sm">Escribe tus pensamientos y emociones</p>
              </div>
              <span className="text-[#9B9BB3]">›</span>
            </button>

            {/* Historial de Emociones */}
            <button
              onClick={() => onNavigate('history')}
              className="w-full bg-white rounded-[1.5rem] p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#B8B5FF]/20 to-[#D4D2FF]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-[#B8B5FF]" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-[#4A4A68] font-semibold">Historial de Emociones</h3>
                <p className="text-[#9B9BB3] text-sm">Revisa tu progreso emocional</p>
              </div>
              <span className="text-[#9B9BB3]">›</span>
            </button>
          </div>


          {/* Recordatorio motivacional */}
          <div className="bg-gradient-to-r from-[#B8B5FF]/20 to-[#D4D2FF]/20 rounded-[1.5rem] p-5 mt-4">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-[#B8B5FF] mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-[#4A4A68] font-semibold mb-1">Recuerda...</h4>
                <p className="text-[#9B9BB3] text-sm">
                  Cada pequeño paso cuenta. Está bien tomarse un tiempo para cuidar de tu salud mental. Estamos aquí para ti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}