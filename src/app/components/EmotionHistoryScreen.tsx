import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface EmotionHistoryScreenProps {
  onNavigate: (screen: string) => void;
  fromScreen?: string;
  emotionHistory?: Array<{
    emotion: string;
    note: string;
    date: Date;
  }>;
}

interface DayEmotion {
  day: number;
  emoji: string;
  emotion: string;
  mood: number; // 1-5 scale
  color: string;
  note?: string;
}

const emotionEmojis = {
  'muy-feliz': { emoji: '😊', label: 'Muy Feliz', mood: 5, color: '#B8E986' },
  'feliz': { emoji: '😊', label: 'Feliz', mood: 5, color: '#B8E986' },
  'tranquilo': { emoji: '😌', label: 'Tranquilo', mood: 4, color: '#B8D4FF' },
  'emocionado': { emoji: '🤩', label: 'Emocionado', mood: 5, color: '#FFE5B4' },
  'agradecido': { emoji: '🥰', label: 'Agradecido', mood: 5, color: '#FFB5C5' },
  'neutral': { emoji: '😐', label: 'Neutral', mood: 3, color: '#D4D2FF' },
  'triste': { emoji: '😢', label: 'Triste', mood: 2, color: '#B8B5FF' },
  'ansioso': { emoji: '😰', label: 'Ansioso', mood: 2, color: '#8DD4F7' },
  'enojado': { emoji: '😠', label: 'Enojado', mood: 1, color: '#FF9494' },
  'estresado': { emoji: '😫', label: 'Estresado', mood: 2, color: '#D4D2FF' },
  'cansado': { emoji: '😴', label: 'Cansado', mood: 2, color: '#E8E5FF' },
  'confundido': { emoji: '😕', label: 'Confundido', mood: 3, color: '#D4D2FF' },
};

export function EmotionHistoryScreen({ onNavigate, fromScreen = 'home', emotionHistory = [] }: EmotionHistoryScreenProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Convert emotionHistory to monthData format
  const getMonthDataFromHistory = (): DayEmotion[] => {
    const currentMonthData: DayEmotion[] = [];
    
    emotionHistory.forEach((entry) => {
      const entryDate = new Date(entry.date);
      if (
        entryDate.getMonth() === currentMonth.getMonth() &&
        entryDate.getFullYear() === currentMonth.getFullYear()
      ) {
        const emotionData = emotionEmojis[entry.emotion as keyof typeof emotionEmojis];
        if (emotionData) {
          currentMonthData.push({
            day: entryDate.getDate(),
            emoji: emotionData.emoji,
            emotion: emotionData.label,
            mood: emotionData.mood,
            color: emotionData.color,
            note: entry.note,
          });
        }
      }
    });
    
    return currentMonthData;
  };

  const monthData = emotionHistory.length > 0 ? getMonthDataFromHistory() : [
    // Mock data for demo
    { day: 1, emoji: '😊', emotion: 'Muy Feliz', mood: 5, color: '#B8E986' },
    { day: 2, emoji: '🙂', emotion: 'Feliz', mood: 4, color: '#8DD4F7' },
    { day: 3, emoji: '😐', emotion: 'Neutral', mood: 3, color: '#D4D2FF' },
    { day: 4, emoji: '🙂', emotion: 'Feliz', mood: 4, color: '#8DD4F7' },
    { day: 5, emoji: '😊', emotion: 'Muy Feliz', mood: 5, color: '#B8E986' },
    { day: 6, emoji: '😔', emotion: 'Triste', mood: 2, color: '#B8B5FF' },
    { day: 7, emoji: '😐', emotion: 'Neutral', mood: 3, color: '#D4D2FF' },
    { day: 8, emoji: '🙂', emotion: 'Feliz', mood: 4, color: '#8DD4F7' },
    { day: 9, emoji: '😊', emotion: 'Muy Feliz', mood: 5, color: '#B8E986' },
    { day: 10, emoji: '😊', emotion: 'Muy Feliz', mood: 5, color: '#B8E986' },
  ];

  // Generate chart data for the last 30 days
  const chartData = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const dayData = monthData.find(d => d.day === day);
    return {
      day: day,
      mood: dayData?.mood || null,
      label: `Día ${day}`,
    };
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const averageMood = monthData.length > 0
    ? (monthData.reduce((sum, day) => sum + day.mood, 0) / monthData.length).toFixed(1)
    : '0';

  const getDayEmotion = (day: number): DayEmotion | undefined => {
    return monthData.find(d => d.day === day);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FE] to-[#E8E5FF] overflow-y-auto">
      <div className="max-w-md mx-auto pb-6">
        {/* Header */}
        <div className="bg-white rounded-b-[2rem] p-6 shadow-lg mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => onNavigate(fromScreen)} 
              className="w-10 h-10 bg-[#F8F7FF] rounded-full flex items-center justify-center hover:bg-[#E8E5FF] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#B8B5FF]" />
            </button>
            <h1 className="text-2xl text-[#4A4A68]">Historial de Emociones</h1>
          </div>

          <p className="text-[#9B9BB3]">
            Revisa cómo te has sentido este mes
          </p>
        </div>

        <div className="px-6 space-y-6">
          {/* Monthly Trend Chart */}
          <div className="bg-white rounded-[2rem] p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#B8B5FF]" />
              <h2 className="text-lg text-[#4A4A68]">Tendencia del mes</h2>
            </div>

            <div className="bg-gradient-to-br from-[#F8F9FE] to-[#E8E5FF] rounded-[1.5rem] p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#9B9BB3] mb-1">Ánimo promedio</p>
                  <p className="text-3xl text-[#B8B5FF]">{averageMood}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#9B9BB3] mb-1">Días registrados</p>
                  <p className="text-3xl text-[#8DD4F7]">{monthData.length}</p>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B8B5FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#B8B5FF" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E5FF" />
                <XAxis 
                  dataKey="day" 
                  stroke="#9B9BB3"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#E8E5FF' }}
                />
                <YAxis 
                  domain={[0, 5]}
                  stroke="#9B9BB3"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#E8E5FF' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '2px solid #B8B5FF',
                    borderRadius: '1rem',
                    padding: '8px 12px'
                  }}
                  labelStyle={{ color: '#4A4A68', fontWeight: 600 }}
                  itemStyle={{ color: '#B8B5FF' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#B8B5FF" 
                  strokeWidth={3}
                  fill="url(#moodGradient)"
                  connectNulls
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Calendar View */}
          <div className="bg-white rounded-[2rem] p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevMonth}
                className="w-10 h-10 bg-[#F8F7FF] rounded-full flex items-center justify-center hover:bg-[#E8E5FF] transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-[#B8B5FF]" />
              </button>
              
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#B8B5FF]" />
                <h2 className="text-lg text-[#4A4A68] capitalize">{monthName}</h2>
              </div>
              
              <button
                onClick={handleNextMonth}
                className="w-10 h-10 bg-[#F8F7FF] rounded-full flex items-center justify-center hover:bg-[#E8E5FF] transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-[#B8B5FF]" />
              </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs text-[#9B9BB3]">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before the first day of month */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              
              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEmotion = getDayEmotion(day);
                const isToday = day === new Date().getDate() && 
                               currentMonth.getMonth() === new Date().getMonth() &&
                               currentMonth.getFullYear() === new Date().getFullYear();
                
                return (
                  <div
                    key={day}
                    className={`
                      aspect-square rounded-[1rem] flex flex-col items-center justify-center
                      transition-all duration-300 hover:scale-105
                      ${dayEmotion 
                        ? 'bg-gradient-to-br shadow-md cursor-pointer' 
                        : 'bg-[#F8F9FE]'
                      }
                      ${isToday ? 'ring-2 ring-[#B8B5FF] ring-offset-2' : ''}
                    `}
                    style={dayEmotion ? {
                      backgroundImage: `linear-gradient(to bottom right, ${dayEmotion.color}40, ${dayEmotion.color}20)`
                    } : {}}
                  >
                    {dayEmotion ? (
                      <>
                        <span className="text-2xl mb-0.5">{dayEmotion.emoji}</span>
                        <span className="text-[10px] text-[#4A4A68]">{day}</span>
                      </>
                    ) : (
                      <span className="text-sm text-[#9B9BB3]">{day}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-6 border-t border-[#E8E5FF]">
              <p className="text-xs text-[#9B9BB3] mb-3">Leyenda:</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(emotionEmojis).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-lg">{value.emoji}</span>
                    <span className="text-xs text-[#4A4A68]">{value.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights Card */}
          <div className="bg-gradient-to-br from-[#B8B5FF] to-[#D4D2FF] rounded-[2rem] p-6 shadow-xl text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="text-lg mb-2">Reflexión del mes</h3>
                <p className="text-sm text-white/90">
                  {monthData.length > 0 
                    ? parseFloat(averageMood) >= 4
                      ? '¡Has tenido un mes excelente! Sigue cuidando de tu bienestar emocional. 💙'
                      : parseFloat(averageMood) >= 3
                      ? 'Tu mes ha tenido altibajos, pero estás avanzando. Recuerda que cada día es una nueva oportunidad. 💜'
                      : 'Parece que ha sido un mes difícil. Recuerda que está bien pedir ayuda y tomarte el tiempo que necesites. 💚'
                    : 'Empieza a registrar tus emociones diarias para ver tus tendencias mensuales.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}