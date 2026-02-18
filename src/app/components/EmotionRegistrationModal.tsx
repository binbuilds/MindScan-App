import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface Emotion {
  id: string;
  emoji: string;
  label: string;
  color: string;
}

interface EmotionRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (emotion: string, note: string) => void;
}

const emotions: Emotion[] = [
  { id: 'feliz', emoji: '😊', label: 'Feliz', color: 'from-[#B8E986] to-[#E5F9F0]' },
  { id: 'tranquilo', emoji: '😌', label: 'Tranquilo', color: 'from-[#B8D4FF] to-[#E5F0FF]' },
  { id: 'emocionado', emoji: '🤩', label: 'Emocionado', color: 'from-[#FFE5B4] to-[#FFF9ED]' },
  { id: 'agradecido', emoji: '🥰', label: 'Agradecido', color: 'from-[#FFB5C5] to-[#FFF5F9]' },
  { id: 'triste', emoji: '😢', label: 'Triste', color: 'from-[#B8B5FF] to-[#E8E5FF]' },
  { id: 'ansioso', emoji: '😰', label: 'Ansioso', color: 'from-[#8DD4F7] to-[#E5F0FF]' },
  { id: 'enojado', emoji: '😠', label: 'Enojado', color: 'from-[#FF9494] to-[#FFE5E5]' },
  { id: 'estresado', emoji: '😫', label: 'Estresado', color: 'from-[#D4D2FF] to-[#F3F2FF]' },
  { id: 'cansado', emoji: '😴', label: 'Cansado', color: 'from-[#E8E5FF] to-[#F8F7FF]' },
  { id: 'confundido', emoji: '😕', label: 'Confundido', color: 'from-[#D4D2FF] to-[#E8E5FF]' },
];

export function EmotionRegistrationModal({ isOpen, onClose, onSubmit }: EmotionRegistrationModalProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedEmotion) {
      onSubmit(selectedEmotion, note);
      setSelectedEmotion(null);
      setNote('');
      onClose();
    }
  };

  const selectedEmotionData = emotions.find(e => e.id === selectedEmotion);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      {/* Modal Container - slides up from bottom on mobile */}
      <div 
        className="bg-white rounded-t-[2rem] sm:rounded-[2rem] w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-[2rem] sm:rounded-t-[2rem] p-6 pb-4 border-b border-[#E8E5FF] z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-[#4A4A68]">¿Cómo te sientes?</h2>
              <p className="text-sm text-[#9B9BB3] mt-1">Registra tu emoción actual</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#F8F7FF] flex items-center justify-center hover:bg-[#E8E5FF] transition-colors"
            >
              <X className="w-5 h-5 text-[#9B9BB3]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Emotion Grid */}
          <div>
            <label className="text-sm text-[#9B9BB3] mb-3 block">Selecciona una emoción</label>
            <div className="grid grid-cols-2 gap-3">
              {emotions.map((emotion) => (
                <button
                  key={emotion.id}
                  onClick={() => setSelectedEmotion(emotion.id)}
                  className={`
                    relative bg-gradient-to-br ${emotion.color} rounded-[1.5rem] p-4 transition-all duration-300
                    ${selectedEmotion === emotion.id 
                      ? 'ring-4 ring-[#B8B5FF] ring-offset-2 scale-105 shadow-xl' 
                      : 'hover:scale-102 shadow-md hover:shadow-lg'
                    }
                  `}
                >
                  {selectedEmotion === emotion.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#B8B5FF] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="text-4xl mb-2">{emotion.emoji}</div>
                  <div className="text-sm text-[#4A4A68] font-medium">{emotion.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Optional Note */}
          <div>
            <label className="text-sm text-[#9B9BB3] mb-2 block">
              Nota (opcional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="¿Qué te hizo sentir así? Escribe aquí..."
              rows={3}
              maxLength={200}
              className="w-full bg-[#F8F7FF] rounded-[1.5rem] p-4 text-[#4A4A68] placeholder:text-[#9B9BB3] outline-none focus:ring-2 focus:ring-[#B8B5FF] transition-all resize-none"
            />
            <div className="text-xs text-[#9B9BB3] mt-1 text-right">
              {note.length}/200
            </div>
          </div>

          {/* Info message */}
          {selectedEmotionData && (
            <div className={`bg-gradient-to-br ${selectedEmotionData.color} rounded-[1.5rem] p-4 animate-in fade-in duration-300`}>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{selectedEmotionData.emoji}</div>
                <div>
                  <p className="text-sm text-[#4A4A68] font-medium">
                    Has seleccionado: {selectedEmotionData.label}
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Registrar tus emociones te ayuda a entender patrones
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-[#F8F7FF] text-[#9B9BB3] py-4 rounded-[1.5rem] font-medium hover:bg-[#E8E5FF] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedEmotion}
              className={`
                flex-1 py-4 rounded-[1.5rem] font-medium transition-all duration-300
                ${selectedEmotion
                  ? 'bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white shadow-lg hover:shadow-xl'
                  : 'bg-[#E8E5FF] text-[#9B9BB3] cursor-not-allowed'
                }
              `}
            >
              Registrar Emoción
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
