import React from 'react';
import { Shield, Lock } from 'lucide-react';

interface SecurityBadgeProps {
  message?: string;
  variant?: 'compact' | 'full';
  className?: string;
}

export function SecurityBadge({ 
  message = "Tus datos están encriptados y son privados", 
  variant = 'compact',
  className = '' 
}: SecurityBadgeProps) {
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B8E6D5]/20 border border-[#B8E6D5]/40 ${className}`}>
        <Shield className="w-3.5 h-3.5 text-[#4A9B7F]" />
        <span className="text-xs text-[#4A9B7F]">{message}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 p-4 rounded-[1.25rem] bg-gradient-to-br from-[#E5F9F0] to-[#F0F9F5] border border-[#B8E6D5]/30 ${className}`}>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
        <Lock className="w-5 h-5 text-[#4A9B7F]" />
      </div>
      <div className="flex-1 pt-1">
        <h4 className="text-sm text-[#4A9B7F] mb-1">🔒 Tu privacidad es prioridad</h4>
        <p className="text-xs text-[#6B7280] leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
