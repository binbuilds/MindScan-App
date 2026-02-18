import React from 'react';
import { Wind, BookHeart, Calendar, Home, BookOpen, BarChart3, Sparkles, MessageCircle, Brain } from 'lucide-react';

interface ToolsScreenProps {
  onNavigate: (screen: string) => void;
}

export function ToolsScreen({ onNavigate }: ToolsScreenProps) {
  const tools = [
    {
      id: 'meditation',
      title: 'Meditación y Respiración',
      description: 'Ejercicios guiados para calmar tu mente',
      icon: Brain,
      gradient: 'from-[#B8B5FF] to-[#D4D2FF]',
      bgColor: 'bg-[#F8F7FF]',
    },
    {
      id: 'chatbot',
      title: 'Habla con MindBot',
      description: 'Comparte cómo te sientes y recibe apoyo',
      icon: MessageCircle,
      gradient: 'from-[#8DD4F7] to-[#B8B5FF]',
      bgColor: 'bg-[#E8F7FF]',
    },
    {
      id: 'journal',
      title: 'Mi Diario Privado',
      description: 'Escribe tus pensamientos y emociones',
      icon: BookHeart,
      gradient: 'from-[#D4D2FF] to-[#E8E5FF]',
      bgColor: 'bg-[#F8F9FE]',
    },
    {
      id: 'history',
      title: 'Historial de Emociones',
      description: 'Revisa tu progreso emocional',
      icon: Calendar,
      gradient: 'from-[#E8E5FF] to-[#F3F2FF]',
      bgColor: 'bg-[#F3F2FF]',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] flex flex-col">
      {/* Header */}
      <div className="p-6 space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#B8B5FF]" />
          <h1 className="text-3xl text-[#4A4A68]">Herramientas</h1>
        </div>
        <p className="text-[#9B9BB3]">
          Recursos para tu bienestar emocional
        </p>
      </div>

      {/* Recomendado - Soluciones Rápidas */}
      <div className="px-6 mb-6">
        <button
          onClick={() => onNavigate('recursos')}
          className="w-full bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] rounded-[2rem] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-102 group"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full">
              ✨ Recomendado
            </span>
          </div>
          <div className="flex items-center gap-5">
            {/* Icon */}
            <div className="w-16 h-16 rounded-[1.2rem] flex items-center justify-center bg-white/30 backdrop-blur-sm shadow-lg">
              <Wind className="w-8 h-8 text-white" />
            </div>
            
            {/* Content */}
            <div className="flex-1 text-left">
              <h3 className="text-lg text-white mb-1">
                Soluciones Rápidas
              </h3>
              <p className="text-sm text-white/90">
                Ejercicios de respiración y contenido de apoyo
              </p>
            </div>
            
            {/* Arrow */}
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
              <svg 
                className="w-4 h-4 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Tools Grid */}
      <div className="flex-1 px-6 pb-6 space-y-4">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => onNavigate(tool.id)}
                className="w-full bg-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-102 group"
              >
                <div className="flex items-center gap-5">
                  {/* Icon */}
                  <div className={`
                    w-16 h-16 rounded-[1.2rem] flex items-center justify-center 
                    bg-gradient-to-br ${tool.gradient} shadow-lg
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3 className="text-lg text-[#4A4A68] mb-1">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-[#9B9BB3]">
                      {tool.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="w-8 h-8 rounded-full bg-[#F8F7FF] flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#B8B5FF] group-hover:to-[#D4D2FF] transition-all duration-300">
                    <svg 
                      className="w-4 h-4 text-[#9B9BB3] group-hover:text-white transition-colors duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          );
        })}

        {/* Motivational Card */}
        <div className="mt-8 bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] rounded-[2rem] p-6 shadow-xl text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">💜</span>
            </div>
            <div>
              <h3 className="text-lg mb-2">Recuerda...</h3>
              <p className="text-sm text-white/90">
                Cada pequeño paso cuenta. Está bien tomarse un tiempo para cuidar de tu salud mental. Estamos aquí para ti.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white/80 backdrop-blur-md rounded-t-[2rem] shadow-2xl px-6 py-4">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center gap-2 text-[#9B9BB3] hover:text-[#B8B5FF] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-white rounded-[1rem] flex items-center justify-center shadow-md hover:shadow-lg">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-xs">Inicio</span>
          </button>
          
          <button
            onClick={() => onNavigate('recursos')}
            className="flex flex-col items-center gap-2 text-[#B8B5FF] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] rounded-[1rem] flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-white" />
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

      {/* Animation styles */}
      <style>{`
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
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