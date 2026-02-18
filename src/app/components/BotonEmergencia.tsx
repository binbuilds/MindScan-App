import React, { useState } from 'react';
import { AlertCircle, X, Phone, User } from 'lucide-react';

interface BotonEmergenciaProps {
  currentScreen: string;
}

const BotonEmergencia = ({ currentScreen }: BotonEmergenciaProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    phone: ''
  });
  const [tempContact, setTempContact] = useState({ name: '', phone: '' });

  // Solo mostrar en la pantalla de inicio
  if (currentScreen !== 'home') return null;

  const handleSOSClick = () => {
    if (!emergencyContact.name || !emergencyContact.phone) {
      setShowConfig(true);
    } else {
      setShowModal(true);
    }
  };

  const handleSaveContact = () => {
    setEmergencyContact(tempContact);
    setShowConfig(false);
    setShowModal(true);
  };

  const sendEmergencyNotification = () => {
    alert(`¡Notificación de emergencia enviada a ${emergencyContact.name} (${emergencyContact.phone})!`);
    setShowModal(false);
  };

  return (
    <>
      {/* Botón SOS - Reposicionado */}
      <button 
        onClick={handleSOSClick}
        className="absolute top-20 left-6 z-40 bg-gradient-to-r from-[#9D99FF] to-[#B8B5FF] text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
      >
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm">SOS Emergencia</span>
      </button>

      {/* Modal de Configuración de Contacto */}
      {showConfig && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-[#4A4A68] font-bold">Configurar Contacto de Emergencia</h3>
              <button
                onClick={() => setShowConfig(false)}
                className="w-8 h-8 rounded-full bg-[#F8F7FF] flex items-center justify-center hover:bg-[#E8E5FF] transition-colors"
              >
                <X className="w-5 h-5 text-[#9B9BB3]" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#9B9BB3] mb-2 block">Nombre del contacto</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9BB3]" />
                  <input
                    type="text"
                    value={tempContact.name}
                    onChange={(e) => setTempContact({...tempContact, name: e.target.value})}
                    placeholder="Ej: Mamá, Juan, etc."
                    className="w-full bg-[#F8F7FF] rounded-[1rem] py-3 pl-10 pr-4 text-[#4A4A68] outline-none focus:ring-2 focus:ring-[#B8B5FF] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-[#9B9BB3] mb-2 block">Número de teléfono</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9BB3]" />
                  <input
                    type="tel"
                    value={tempContact.phone}
                    onChange={(e) => setTempContact({...tempContact, phone: e.target.value})}
                    placeholder="Ej: +593 999 999 999"
                    className="w-full bg-[#F8F7FF] rounded-[1rem] py-3 pl-10 pr-4 text-[#4A4A68] outline-none focus:ring-2 focus:ring-[#B8B5FF] transition-all"
                  />
                </div>
              </div>

              <p className="text-xs text-[#9B9BB3] bg-[#F8F7FF] rounded-xl p-3">
                💡 Este contacto recibirá una notificación cuando presiones el botón SOS
              </p>

              <button
                onClick={handleSaveContact}
                disabled={!tempContact.name || !tempContact.phone}
                className={`w-full py-3 rounded-[1rem] font-semibold transition-all duration-300 ${
                  tempContact.name && tempContact.phone
                    ? 'bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white shadow-lg hover:shadow-xl'
                    : 'bg-[#E8E5FF] text-[#9B9BB3] cursor-not-allowed'
                }`}
              >
                Guardar Contacto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Emergencia */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-sm shadow-2xl">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl text-[#4A4A68] font-bold">¿Enviar alerta de emergencia?</h3>
              
              <div className="bg-[#F8F7FF] rounded-[1.5rem] p-4 text-left">
                <p className="text-sm text-[#9B9BB3] mb-2">Se notificará a:</p>
                <p className="text-[#4A4A68] font-semibold">{emergencyContact.name}</p>
                <p className="text-[#9B9BB3] text-sm">{emergencyContact.phone}</p>
              </div>

              <p className="text-sm text-[#9B9BB3]">
                Tu contacto recibirá un mensaje indicando que necesitas ayuda con tu ubicación actual.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-[#F8F7FF] text-[#9B9BB3] py-3 rounded-[1rem] font-semibold hover:bg-[#E8E5FF] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={sendEmergencyNotification}
                  className="flex-1 bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white py-3 rounded-[1rem] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Enviar SOS
                </button>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setTempContact(emergencyContact);
                  setShowConfig(true);
                }}
                className="text-sm text-[#B8B5FF] hover:underline"
              >
                Cambiar contacto de emergencia
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BotonEmergencia;