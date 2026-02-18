import React, { useState } from 'react';
import { CloudMascot } from './CloudMascot';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login' || authMode === 'signup') {
      if (name.trim().length > 0) {
        setIsSubmitting(true);
        // Simulate a brief loading state for a smooth transition
        setTimeout(() => {
          onLogin(name.trim());
        }, 500);
      }
    } else if (authMode === 'reset') {
      // Simulate password reset
      setIsSubmitting(true);
      setTimeout(() => {
        alert('Enlace de recuperación enviado a tu correo 💜');
        setAuthMode('login');
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Cloud Mascot */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#B8B5FF]/20 to-[#D4D2FF]/20 blur-3xl rounded-full scale-110"></div>
          <div className="relative animate-float-calm mx-auto w-48">
            <CloudMascot state="calm" className="w-full" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center space-y-3 animate-in fade-in duration-700">
          <h1 className="text-4xl text-[#4A4A68]">Bienvenido a</h1>
          <h2 className="text-3xl text-[#B8B5FF]">MindScan</h2>
          <p className="text-[#9B9BB3] pt-2">
            Tu compañero de bienestar emocional
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="bg-white/60 backdrop-blur-sm rounded-[1.5rem] p-1.5 flex gap-1 shadow-lg">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-3 px-4 rounded-[1.2rem] transition-all duration-300 ${
              authMode === 'login'
                ? 'bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white shadow-md'
                : 'text-[#9B9BB3] hover:text-[#4A4A68]'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-3 px-4 rounded-[1.2rem] transition-all duration-300 ${
              authMode === 'signup'
                ? 'bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white shadow-md'
                : 'text-[#9B9BB3] hover:text-[#4A4A68]'
            }`}
          >
            Crear Cuenta
          </button>
          <button
            onClick={() => setAuthMode('reset')}
            className={`flex-1 py-3 px-4 rounded-[1.2rem] transition-all duration-300 ${
              authMode === 'reset'
                ? 'bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white shadow-md'
                : 'text-[#9B9BB3] hover:text-[#4A4A68]'
            }`}
          >
            Recuperar
          </button>
        </div>

        {/* Login/Signup Form */}
        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-[#B8B5FF]/10 animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '200ms' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {authMode === 'reset' ? (
              /* Password Reset Form */
              <>
                <div className="text-center mb-4">
                  <h3 className="text-lg text-[#4A4A68] mb-2">Recuperar Contraseña</h3>
                  <p className="text-sm text-[#9B9BB3]">
                    Te enviaremos un enlace para restablecer tu contraseña
                  </p>
                </div>
                <div className="space-y-3">
                  <label htmlFor="reset-email" className="block text-[#4A4A68] text-sm">
                    Correo Electrónico
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="w-full px-6 py-4 bg-[#F8F7FF] border-2 border-transparent rounded-[1.5rem] text-[#4A4A68] placeholder:text-[#9B9BB3] focus:border-[#B8B5FF] focus:outline-none transition-all duration-300"
                    autoComplete="email"
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={email.trim().length === 0 || isSubmitting}
                  className="w-full bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white rounded-[1.5rem] py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-102"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Enlace'}
                </button>
              </>
            ) : (
              /* Login/Signup Form */
              <>
                <div className="space-y-3">
                  <label htmlFor="name" className="block text-[#4A4A68] text-sm">
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Escribe tu nombre"
                    className="w-full px-6 py-4 bg-[#F8F7FF] border-2 border-transparent rounded-[1.5rem] text-[#4A4A68] placeholder:text-[#9B9BB3] focus:border-[#B8B5FF] focus:outline-none transition-all duration-300"
                    autoComplete="given-name"
                    disabled={isSubmitting}
                  />
                </div>

                {authMode === 'signup' && (
                  <div className="space-y-3">
                    <label htmlFor="email" className="block text-[#4A4A68] text-sm">
                      Correo Electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full px-6 py-4 bg-[#F8F7FF] border-2 border-transparent rounded-[1.5rem] text-[#4A4A68] placeholder:text-[#9B9BB3] focus:border-[#B8B5FF] focus:outline-none transition-all duration-300"
                      autoComplete="email"
                      disabled={isSubmitting}
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <label htmlFor="password" className="block text-[#4A4A68] text-sm">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-6 py-4 bg-[#F8F7FF] border-2 border-transparent rounded-[1.5rem] text-[#4A4A68] placeholder:text-[#9B9BB3] focus:border-[#B8B5FF] focus:outline-none transition-all duration-300"
                    autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={name.trim().length === 0 || password.trim().length === 0 || isSubmitting}
                  className="w-full bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white rounded-[1.5rem] py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-102"
                >
                  {isSubmitting ? 'Iniciando...' : authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </button>
              </>
            )}
          </form>

          <p className="text-xs text-[#9B9BB3] text-center mt-6">
            Al continuar, aceptas nuestros términos de servicio y política de privacidad
          </p>
        </div>

        {/* App Features */}
        <div className="grid grid-cols-3 gap-4 pt-4 animate-in fade-in duration-700" style={{ animationDelay: '400ms' }}>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white rounded-[1rem] flex items-center justify-center mx-auto shadow-md">
              <span className="text-2xl">🧘‍♀️</span>
            </div>
            <p className="text-xs text-[#9B9BB3]">Meditación</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white rounded-[1rem] flex items-center justify-center mx-auto shadow-md">
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-xs text-[#9B9BB3]">Diario</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white rounded-[1rem] flex items-center justify-center mx-auto shadow-md">
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-xs text-[#9B9BB3]">Progreso</p>
          </div>
        </div>
      </div>

      {/* Floating animation styles */}
      <style>{`
        @keyframes float-calm {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.02); }
        }
        .animate-float-calm {
          animation: float-calm 4s ease-in-out infinite;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}