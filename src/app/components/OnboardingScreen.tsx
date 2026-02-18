import React, { useState } from 'react';
import { Heart, Brain, Music, Users, Camera, Mic } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';
import * as Dialog from '@radix-ui/react-dialog';
import { SecurityBadge } from './SecurityBadge';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(0);
  const [showPermissions, setShowPermissions] = useState(false);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [selectedCoping, setSelectedCoping] = useState<string[]>([]);

  const feelings = [
    { id: 'happy', label: 'Feliz', icon: Heart, color: 'bg-[#B8E986]' },
    { id: 'calm', label: 'Tranquilo/a', icon: Brain, color: 'bg-[#8DD4F7]' },
    { id: 'anxious', label: 'Ansioso/a', icon: Brain, color: 'bg-[#B8B5FF]' },
    { id: 'sad', label: 'Triste', icon: Heart, color: 'bg-[#D4D2FF]' },
    { id: 'energetic', label: 'Con energía', icon: Heart, color: 'bg-[#FFE5B4]' },
    { id: 'stressed', label: 'Estresado/a', icon: Brain, color: 'bg-[#E8E5FF]' },
    { id: 'grateful', label: 'Agradecido/a', icon: Heart, color: 'bg-[#FFB5C5]' },
    { id: 'overwhelmed', label: 'Abrumado/a', icon: Brain, color: 'bg-[#F3F2FF]' },
  ];

  const copingMechanisms = [
    { id: 'music', label: 'Escuchar música', icon: Music, color: 'bg-[#B8B5FF]' },
    { id: 'meditation', label: 'Meditación', icon: Brain, color: 'bg-[#D4D2FF]' },
    { id: 'friends', label: 'Hablar con amigos', icon: Users, color: 'bg-[#E8E5FF]' },
    { id: 'breathing', label: 'Ejercicios de respiración', icon: Heart, color: 'bg-[#F3F2FF]' },
  ];

  const toggleFeeling = (id: string) => {
    setSelectedFeelings(prev =>
      prev.includes(id) ? prev.filter(feeling => feeling !== id) : [...prev, id]
    );
  };

  const toggleCoping = (id: string) => {
    setSelectedCoping(prev =>
      prev.includes(id) ? prev.filter(coping => coping !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step === 0 && selectedFeelings.length > 0) {
      setStep(1);
    } else if (step === 1 && selectedCoping.length > 0) {
      setShowPermissions(true);
    }
  };

  const handleAllowPermissions = () => {
    onComplete();
  };

  const progress = ((step + 1) / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress.Root
            className="relative overflow-hidden bg-white/50 rounded-full w-full h-3 shadow-inner"
            value={progress}
          >
            <Progress.Indicator
              className="bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] w-full h-full transition-transform duration-500 ease-out rounded-full"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-[#B8B5FF]/10">
          {step === 0 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="text-center space-y-3">
                <h1 className="text-3xl text-[#4A4A68]">¡Hola! 👋</h1>
                <p className="text-[#9B9BB3] text-lg">
                  ¿Cómo te has sentido últimamente?
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-8">
                {feelings.map((feeling) => {
                  const Icon = feeling.icon;
                  const isSelected = selectedFeelings.includes(feeling.id);
                  return (
                    <button
                      key={feeling.id}
                      onClick={() => toggleFeeling(feeling.id)}
                      className={`
                        ${feeling.color} rounded-[1.5rem] p-6 text-center transition-all duration-300
                        ${isSelected ? 'scale-105 shadow-lg ring-4 ring-[#B8B5FF]/30' : 'hover:scale-102 shadow-md'}
                      `}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-3 text-[#4A4A68]" />
                      <p className="text-sm text-[#4A4A68]">{feeling.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="text-center space-y-3">
                <h1 className="text-3xl text-[#4A4A68]">Entendido 💜</h1>
                <p className="text-[#9B9BB3] text-lg">
                  ¿Qué te ayuda a sentirte mejor?
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-8">
                {copingMechanisms.map((coping) => {
                  const Icon = coping.icon;
                  const isSelected = selectedCoping.includes(coping.id);
                  return (
                    <button
                      key={coping.id}
                      onClick={() => toggleCoping(coping.id)}
                      className={`
                        ${coping.color} rounded-[1.5rem] p-6 text-center transition-all duration-300
                        ${isSelected ? 'scale-105 shadow-lg ring-4 ring-[#B8B5FF]/30' : 'hover:scale-102 shadow-md'}
                      `}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-3 text-[#4A4A68]" />
                      <p className="text-sm text-[#4A4A68]">{coping.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={
              (step === 0 && selectedFeelings.length === 0) ||
              (step === 1 && selectedCoping.length === 0)
            }
            className="w-full mt-8 bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white rounded-[1.5rem] py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-102"
          >
            Continuar
          </button>
        </div>
      </div>

      {/* Permission Modal */}
      <Dialog.Root open={showPermissions} onOpenChange={setShowPermissions}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-[2rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Camera className="w-10 h-10 text-white" />
              </div>
              
              <div className="space-y-3">
                <Dialog.Title className="text-2xl text-[#4A4A68]">
                  Permisos de la app
                </Dialog.Title>
                <Dialog.Description className="text-[#9B9BB3]">
                  MindScan necesita acceso a tu cámara y micrófono para funciones futuras como meditaciones guiadas y análisis de voz.
                </Dialog.Description>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-4 p-4 bg-[#F8F7FF] rounded-[1.5rem]">
                  <Camera className="w-6 h-6 text-[#B8B5FF]" />
                  <div className="text-left flex-1">
                    <p className="text-sm text-[#4A4A68]">Cámara</p>
                    <p className="text-xs text-[#9B9BB3]">Para futuras funciones</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-[#F8F7FF] rounded-[1.5rem]">
                  <Mic className="w-6 h-6 text-[#B8B5FF]" />
                  <div className="text-left flex-1">
                    <p className="text-sm text-[#4A4A68]">Micrófono</p>
                    <p className="text-xs text-[#9B9BB3]">Para meditaciones guiadas</p>
                  </div>
                </div>
              </div>

              <SecurityBadge 
                message="Tus audios y datos están encriptados y son completamente privados. Nunca compartimos tu información personal." 
                variant="full"
                className="mt-4"
              />

              <div className="space-y-3 pt-4">
                <button
                  onClick={handleAllowPermissions}
                  className="w-full bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white rounded-[1.5rem] py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102"
                >
                  Permitir acceso
                </button>
                
                <button
                  onClick={handleAllowPermissions}
                  className="w-full text-[#9B9BB3] py-2 text-sm hover:text-[#4A4A68] transition-colors"
                >
                  Ahora no
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}