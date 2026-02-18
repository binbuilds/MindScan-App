import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, MessageCircle, Sparkles, Info, Heart } from 'lucide-react';
import { SecurityBadge } from './SecurityBadge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotScreenProps {
  onNavigate: (screen: string) => void;
  userName: string;
  fromScreen?: string;  // ← NUEVO PARÁMETRO
}

export function ChatbotScreen({ onNavigate, userName, fromScreen = 'home' }: ChatbotScreenProps) {  // ← CAMBIADO
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hola ${userName} 💙 Soy MindBot, tu compañero de apoyo emocional. Estoy aquí para escucharte y ayudarte a regular tus emociones. ¿Cómo te sientes hoy?`,
      sender: 'bot',
      timestamp: new Date(),
    },
    {
      id: '2',
      text: `Recuerda: No soy un doctor ni terapeuta profesional, sino un apoyo para ayudarte a gestionar tus emociones día a día. Para casos serios, siempre consulta a un profesional de la salud mental. 💜`,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Greetings
    if (lowerMessage.match(/\b(hola|hey|buenos días|buenas tardes|buenas noches|qué tal)\b/)) {
      const greetings = [
        `¡Hola ${userName}! 😊 ¿En qué puedo ayudarte hoy?`,
        `Hola ${userName}, me alegra verte por aquí. ¿Cómo estás?`,
        `¡Hola! Estoy aquí para ti. ¿Qué te gustaría hablar?`,
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Feeling anxious/stressed
    if (lowerMessage.match(/\b(ansiedad|ansioso|ansiosa|estresado|estresada|estrés|nervioso|nerviosa|preocupado|preocupada)\b/)) {
      const responses = [
        'Entiendo que te sientas ansioso/a. La ansiedad puede ser abrumadora, pero recuerda que es temporal. ¿Te gustaría que te guiara en un ejercicio de respiración? 🌬️',
        'Lamento que estés pasando por un momento estresante. Tus sentimientos son válidos. ¿Has probado alguna de nuestras misiones de respiración consciente?',
        'La ansiedad es difícil, pero estás dando un paso importante al reconocerla. Te recomiendo hacer una pausa activa o practicar mindfulness. Estoy aquí contigo. 💜',
        'Es completamente normal sentirse así a veces. Recuerda: respira profundo, este momento pasará. ¿Qué te parece intentar una de nuestras técnicas de relajación?',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Feeling sad/depressed
    if (lowerMessage.match(/\b(triste|tristeza|deprimido|deprimida|depresión|solo|sola|vacío|vacía|mal)\b/)) {
      const responses = [
        'Siento mucho que te sientas así. Es valiente compartir cómo te sientes. Recuerda que no estás solo/a, y que estos sentimientos no durarán para siempre. 💙',
        'La tristeza es parte de ser humano. Permítete sentir, pero también recuerda ser amable contigo mismo/a. ¿Hay algo específico que te haga sentir así?',
        'Entiendo que estés pasando por un momento difícil. A veces escribir en tu diario puede ayudar a procesar estos sentimientos. Estoy aquí para escucharte. 🌟',
        'Tus sentimientos importan. Aunque ahora todo parezca oscuro, recuerda momentos en los que has superado dificultades antes. Eres más fuerte de lo que crees.',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Feeling happy/good
    if (lowerMessage.match(/\b(feliz|alegre|bien|genial|excelente|contento|contenta|mejor|fantástico|fantástica)\b/)) {
      const responses = [
        '¡Qué maravilloso escuchar eso! 🎉 Me alegra mucho que te sientas bien. ¿Qué te ha hecho sentir así?',
        '¡Eso es genial! Celebra estos momentos positivos, te los mereces. ✨',
        'Me encanta ver que estás bien. Recuerda este sentimiento para los días más difíciles. ¡Sigue así! 💚',
        '¡Excelente! Tu bienestar emocional está mejorando. Continúa cuidándote como lo estás haciendo. 🌈',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Can't sleep
    if (lowerMessage.match(/\b(dormir|sueño|insomnio|despertar|cansado|cansada)\b/)) {
      const responses = [
        'Los problemas de sueño pueden afectar mucho nuestro bienestar. Te recomiendo probar una meditación antes de dormir, evitar pantallas 1 hora antes, y crear una rutina relajante. 🌙',
        'El descanso es fundamental. ¿Has intentado ejercicios de respiración o escuchar sonidos relajantes antes de acostarte? Puedo guiarte en algunas técnicas.',
        'Entiendo lo frustrante que es no poder dormir bien. Mantén horarios regulares, evita cafeína por la tarde, y prueba la meditación guiada. Tu mente merece descansar. 💤',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Gratitude/thankfulness
    if (lowerMessage.match(/\b(gracias|agradecido|agradecida|gratitud|aprecio)\b/)) {
      const responses = [
        'No hay de qué. Estoy aquí para ti siempre que me necesites. Tu bienestar es lo más importante. 💜',
        'Me alegra poder ayudarte. Recuerda que siempre puedes contar conmigo. 🌟',
        'Es un placer acompañarte en este camino. Juntos podemos hacer que cada día sea mejor. 💙',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Asking for help/advice
    if (lowerMessage.match(/\b(ayuda|ayúdame|consejo|qué hago|no sé)\b/)) {
      const responses = [
        'Estoy aquí para ayudarte. Cuéntame más sobre lo que estás sintiendo o experimentando, y juntos encontraremos la mejor manera de apoyarte. 🤝',
        'Por supuesto que puedo ayudarte. ¿Quieres hablar sobre cómo te sientes, o prefieres que te sugiera algunas actividades de bienestar?',
        'Pedir ayuda es un signo de fortaleza, no de debilidad. Estoy aquí para escucharte. ¿Qué es lo que más te preocupa ahora?',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Meditation/breathing
    if (lowerMessage.match(/\b(respirar|respiración|meditar|meditación|relajar|relajación|calmar)\b/)) {
      const responses = [
        'La respiración consciente es una herramienta poderosa. Te sugiero nuestra misión de "Respiración Consciente": inhala por 4 segundos, mantén por 4, exhala por 4. Repite 5 veces. 🌬️',
        'La meditación puede transformar tu día. Encuentra un lugar tranquilo, cierra los ojos, y enfócate solo en tu respiración por unos minutos. Estoy aquí si me necesitas.',
        '¡Excelente elección! La relajación es clave para tu bienestar. Busca la sección de meditación en nuestras herramientas, hay ejercicios guiados esperándote. 🧘‍♀️',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Motivation/encouragement
    if (lowerMessage.match(/\b(motivación|ánimo|no puedo|rendirse|rendir|difícil)\b/)) {
      const responses = [
        '¡Tú puedes con esto! Has llegado hasta aquí, y eso ya es un logro. Cada pequeño paso cuenta. No te rindas. 💪',
        'Sé que es difícil, pero confío en ti. Eres más fuerte de lo que imaginas. Toma un respiro, y luego sigue adelante, un paso a la vez. 🌟',
        'Los momentos difíciles son temporales. Has superado el 100% de tus días difíciles hasta ahora. Este también pasará. Estoy contigo. 💙',
        'La motivación no siempre llega sola, a veces hay que crear el impulso. Empieza con algo pequeño hoy: una misión corta, un paseo, un respiro profundo. Tú vales la pena. ✨',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Loneliness
    if (lowerMessage.match(/\b(solo|sola|soledad|nadie|aislado|aislada)\b/)) {
      const responses = [
        'Siento que te sientas solo/a. Aunque ahora lo parezca, no estás solo/a. Estoy aquí, y hay personas que se preocupan por ti. ¿Qué te parece contactar a alguien cercano? 💜',
        'La soledad duele, lo entiendo. Pero recuerda: sentirse solo/a no significa que lo estés. Intenta la misión de "Conexión Social" - a veces un mensaje puede cambiar el día. 🤗',
        'Estoy aquí contigo. La soledad es temporal. ¿Has considerado unirte a grupos con intereses similares o llamar a un amigo? No estás solo/a en esto. 💙',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Self-care
    if (lowerMessage.match(/\b(cuidar|cuidarme|autocuidado|tiempo para mí)\b/)) {
      const responses = [
        '¡Excelente! El autocuidado no es egoísta, es necesario. Dedícate tiempo: un baño relajante, tu comida favorita, o simplemente descansar. Te lo mereces. 🛁',
        'Cuidarte a ti mismo/a es la base de todo. Prueba las misiones diarias: son pequeños actos de amor propio que marcan la diferencia. 💚',
        'Me alegra que pienses en tu bienestar. El autocuidado puede ser físico, emocional o mental. ¿Qué actividad te haría sentir bien hoy? 🌸',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Work/study stress
    if (lowerMessage.match(/\b(trabajo|trabajar|escuela|estudiar|examen|proyecto|ocupado|ocupada)\b/)) {
      const responses = [
        'El trabajo/estudio puede ser estresante. Recuerda tomar pausas regulares. La técnica Pomodoro puede ayudar: 25 min trabajo, 5 min descanso. Tu salud mental es prioridad. 📚',
        'Es importante mantener el equilibrio. No olvides hacer pausas, estirarte, y respirar. El rendimiento mejora cuando te cuidas. 💼',
        'Entiendo la presión. Divide las tareas en pasos pequeños, celebra cada logro, y no olvides descansar. Eres más que tu productividad. ✨',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // General supportive responses
    const generalResponses = [
      'Gracias por compartir eso conmigo. Estoy aquí para escucharte sin juzgarte. ¿Hay algo más que quieras contarme? 💙',
      'Entiendo. Tus sentimientos son válidos. ¿Cómo puedo apoyarte mejor en este momento?',
      'Aprecio que confíes en mí. Recuerda que estás haciendo un gran trabajo al cuidar de tu salud mental. ¿Quieres hablar más sobre esto? 🌟',
      'Te escucho. A veces solo necesitamos expresar lo que sentimos. Estoy aquí para ti. ¿Te gustaría que te sugiera alguna actividad de bienestar?',
      'Gracias por compartir. Cada día es una nueva oportunidad para cuidarte. ¿Hay algo específico en lo que pueda ayudarte? 💜',
    ];
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickReplies = [
    'Me siento ansioso/a',
    'Necesito motivación',
    'Estoy triste',
    'Quiero meditar',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] p-6 shadow-xl flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate(fromScreen)}  
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white/30 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-white" />
              <h1 className="text-xl text-white font-medium">MindBot</h1>
            </div>
            <p className="text-white/80 text-sm mt-1">Tu compañero de apoyo emocional</p>
          </div>
          <div className="w-3 h-3 bg-[#B8E986] rounded-full shadow-lg animate-pulse" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-[1.5rem] p-4 shadow-md ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] text-white rounded-br-md'
                  : 'bg-white text-[#4A4A68] rounded-bl-md'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#B8B5FF]" />
                  <span className="text-xs text-[#9B9BB3]">MindBot</span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-white/60' : 'text-[#9B9BB3]'
                }`}
              >
                {message.timestamp.toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-[#4A4A68] rounded-[1.5rem] rounded-bl-md p-4 shadow-md">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#B8B5FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#B8B5FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#B8B5FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-[#9B9BB3]">MindBot está escribiendo...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-6 pb-3">
          <p className="text-xs text-[#9B9BB3] mb-2">Respuestas rápidas:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputText(reply);
                  setTimeout(handleSend, 100);
                }}
                className="flex-shrink-0 bg-white text-[#B8B5FF] px-4 py-2 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-md p-4 border-t border-[#E8E5FF]">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-[#F8F7FF] border-2 border-transparent rounded-[1.5rem] px-5 py-3 text-[#4A4A68] placeholder:text-[#9B9BB3] focus:border-[#B8B5FF] focus:outline-none transition-all duration-300"
          />
          <button
            onClick={handleSend}
            disabled={inputText.trim() === ''}
            className="w-12 h-12 bg-gradient-to-r from-[#B8B5FF] to-[#D4D2FF] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}