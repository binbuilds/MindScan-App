import React, { useState } from 'react';
import { ArrowLeft, Send, User, Phone, Video, MoreVertical } from 'lucide-react';

interface ExpertChatScreenProps {
  onNavigate: (screen: string) => void;
  userName: string;
}

export function ExpertChatScreen({ onNavigate, userName }: ExpertChatScreenProps) {
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    // Simulación: aquí solo limpiamos el input
    // En una app real, aquí enviarías el mensaje
    alert('Función de chat en desarrollo. Tu mensaje sería: "' + inputText + '"');
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-[#F8F7FF] flex items-center justify-center hover:bg-[#E8E5FF] transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-[#B8B5FF]" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-[#4A4A68] font-semibold">Dra. María González</h2>
              <p className="text-xs text-[#9B9BB3]">Psicóloga Clínica • En línea</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-[#F8F7FF] flex items-center justify-center hover:bg-[#E8E5FF] transition-all duration-300">
            <Phone className="w-5 h-5 text-[#B8B5FF]" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#F8F7FF] flex items-center justify-center hover:bg-[#E8E5FF] transition-all duration-300">
            <Video className="w-5 h-5 text-[#B8B5FF]" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#F8F7FF] flex items-center justify-center hover:bg-[#E8E5FF] transition-all duration-300">
            <MoreVertical className="w-5 h-5 text-[#B8B5FF]" />
          </button>
        </div>
      </div>

      {/* Empty Chat Area - Estado vacío */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-24 h-24 bg-gradient-to-br from-[#B8B5FF]/20 to-[#D4D2FF]/20 rounded-full flex items-center justify-center mx-auto">
            <User className="w-12 h-12 text-[#B8B5FF]" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl text-[#4A4A68] font-semibold">
              Conectando con un experto...
            </h3>
            <p className="text-[#9B9BB3] text-sm">
              Estamos aquí para ti, {userName}. Un profesional de salud mental te atenderá pronto.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#B8B5FF]/10 to-[#D4D2FF]/10 rounded-[1.5rem] p-4 text-left space-y-2">
            <p className="text-sm text-[#4A4A68] font-semibold">Mientras tanto:</p>
            <ul className="text-sm text-[#9B9BB3] space-y-1">
              <li>• Tus conversaciones son completamente confidenciales</li>
              <li>• Puedes compartir lo que sientas necesario</li>
              <li>• No hay preguntas incorrectas</li>
            </ul>
          </div>

          <div className="flex items-center justify-center gap-2 text-[#B8B5FF] text-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-[#B8B5FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-[#B8B5FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-[#B8B5FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span>Conectando...</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/90 backdrop-blur-sm px-4 py-3 border-t border-[#E8E5FF]">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-[#F8F7FF] rounded-[1.5rem] px-4 py-3 flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-transparent outline-none text-[#4A4A68] placeholder-[#9B9BB3]"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={inputText.trim() === ''}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              inputText.trim() === ''
                ? 'bg-[#E8E5FF] cursor-not-allowed'
                : 'bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] hover:shadow-lg'
            }`}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <p className="text-xs text-center text-[#9B9BB3] mt-2">
          Chat confidencial • Conexión segura 🔒
        </p>
      </div>
    </div>
  );
}