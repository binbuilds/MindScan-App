import React from 'react';

interface CloudMascotProps {
  state: 'distressed' | 'calm';
  className?: string;
}

export function CloudMascot({ state, className = '' }: CloudMascotProps) {
  if (state === 'distressed') {
    return (
      <div className={`relative ${className}`}>
        {/* Main Cloud Body */}
        <svg
          viewBox="0 0 200 150"
          className="w-full h-full drop-shadow-2xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud base - grey and droopy with softer shapes */}
          <defs>
            <filter id="glow-distressed">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path
            d="M 50 85 Q 42 92 52 100 L 148 100 Q 158 92 148 85 Q 162 75 162 58 Q 162 38 142 32 Q 142 18 122 18 Q 108 18 100 28 Q 88 18 72 22 Q 53 28 48 48 Q 33 53 38 68 Q 38 78 50 85 Z"
            fill="#C5CBD6"
            opacity="0.95"
          />
          
          {/* Bigger, cuter sad eyes with highlights */}
          <g>
            {/* Left eye */}
            <ellipse cx="75" cy="58" rx="10" ry="12" fill="#4A4A68" />
            <ellipse cx="73" cy="55" rx="3" ry="3" fill="#FFFFFF" opacity="0.8" />
            {/* Tiny tear */}
            <ellipse cx="75" cy="72" rx="2.5" ry="3.5" fill="#8DD4F7" opacity="0.7" />
            
            {/* Right eye */}
            <ellipse cx="125" cy="58" rx="10" ry="12" fill="#4A4A68" />
            <ellipse cx="123" cy="55" rx="3" ry="3" fill="#FFFFFF" opacity="0.8" />
            {/* Tiny tear */}
            <ellipse cx="125" cy="72" rx="2.5" ry="3.5" fill="#8DD4F7" opacity="0.7" />
          </g>
          
          {/* Sad eyebrows */}
          <path
            d="M 65 48 Q 75 45 85 48"
            stroke="#6B7280"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 115 48 Q 125 45 135 48"
            stroke="#6B7280"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Small frown mouth */}
          <path
            d="M 85 82 Q 100 78 115 82"
            stroke="#6B7280"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Rosy cheeks even when sad */}
          <ellipse cx="60" cy="72" rx="10" ry="7" fill="#D4D2FF" opacity="0.4" />
          <ellipse cx="140" cy="72" rx="10" ry="7" fill="#D4D2FF" opacity="0.4" />
          
          {/* Smaller, cuter rain drops */}
          <g opacity="0.6">
            <ellipse cx="65" cy="112" rx="3" ry="5" fill="#8DD4F7" />
            <ellipse cx="100" cy="118" rx="3" ry="5" fill="#8DD4F7" />
            <ellipse cx="135" cy="112" rx="3" ry="5" fill="#8DD4F7" />
            <ellipse cx="82" cy="115" rx="2.5" ry="4" fill="#B8B5FF" />
            <ellipse cx="118" cy="115" rx="2.5" ry="4" fill="#B8B5FF" />
          </g>
          
          {/* Tiny cute lightning bolts */}
          <g opacity="0.7">
            <path d="M 145 48 L 141 58 L 146 58 L 143 68 L 151 56 L 147 56 L 145 48 Z" fill="#FCD34D" />
            <path d="M 52 52 L 48 62 L 53 62 L 50 72 L 58 60 L 54 60 L 52 52 Z" fill="#FCD34D" />
          </g>
        </svg>
      </div>
    );
  }

  // Calm state
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 150"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-calm">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#F0F4FF', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Cloud base - fluffy and rounded */}
        <path
          d="M 50 80 Q 42 86 52 95 L 148 95 Q 158 86 148 80 Q 162 70 162 55 Q 162 35 142 29 Q 142 15 122 15 Q 108 15 100 25 Q 88 15 72 19 Q 53 25 48 45 Q 33 50 38 65 Q 38 75 50 80 Z"
          fill="url(#cloudGradient)"
          filter="url(#glow-calm)"
        />
        
        {/* Cute happy eyes with sparkles */}
        <g>
          {/* Left eye - closed happy eye */}
          <path
            d="M 68 52 Q 75 56 82 52"
            stroke="#4A4A68"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Small sparkle */}
          <circle cx="85" cy="50" r="1.5" fill="#4A4A68" />
          
          {/* Right eye - closed happy eye */}
          <path
            d="M 118 52 Q 125 56 132 52"
            stroke="#4A4A68"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Small sparkle */}
          <circle cx="115" cy="50" r="1.5" fill="#4A4A68" />
        </g>
        
        {/* Big kawaii smile */}
        <path
          d="M 75 72 Q 100 85 125 72"
          stroke="#4A4A68"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Open mouth area (white) */}
        <path
          d="M 80 72 Q 100 82 120 72 Q 100 78 80 72 Z"
          fill="#FFFFFF"
          opacity="0.8"
        />
        
        {/* Rosy cheeks - bigger and pinker */}
        <ellipse cx="58" cy="68" rx="12" ry="8" fill="#FFB5C5" opacity="0.6" />
        <ellipse cx="142" cy="68" rx="12" ry="8" fill="#FFB5C5" opacity="0.6" />
        
        {/* Small blush marks */}
        <line x1="50" y1="68" x2="55" y2="68" stroke="#FFB5C5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="51" y1="71" x2="54" y2="71" stroke="#FFB5C5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="145" y1="68" x2="150" y2="68" stroke="#FFB5C5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="146" y1="71" x2="149" y2="71" stroke="#FFB5C5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        
        {/* Rainbow behind cloud - more vibrant */}
        <g opacity="0.7">
          <path d="M 25 88 Q 100 35 175 88" stroke="#FF9494" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 30 93 Q 100 43 170 93" stroke="#FCD34D" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 35 98 Q 100 50 165 98" stroke="#B8E986" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 40 103 Q 100 57 160 103" stroke="#8DD4F7" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 45 108 Q 100 64 155 108" stroke="#D4D2FF" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
        
        {/* Kawaii sparkles */}
        <g opacity="0.9">
          {/* Big sparkle top right */}
          <path d="M 165 32 L 168 40 L 176 43 L 168 46 L 165 54 L 162 46 L 154 43 L 162 40 Z" fill="#FCD34D" />
          {/* Medium sparkle top left */}
          <path d="M 35 35 L 37 41 L 43 43 L 37 45 L 35 51 L 33 45 L 27 43 L 33 41 Z" fill="#FFB5C5" />
          {/* Small sparkles */}
          <circle cx="155" cy="25" r="2" fill="#8DD4F7" />
          <circle cx="45" cy="28" r="2" fill="#B8B5FF" />
          <circle cx="170" cy="48" r="1.5" fill="#FFFFFF" />
          <circle cx="30" cy="50" r="1.5" fill="#FFFFFF" />
        </g>
        
        {/* Small hearts floating */}
        <g opacity="0.6">
          <path d="M 20 65 Q 20 62 22 62 Q 24 62 24 65 Q 24 68 22 70 Q 20 68 20 65 Z" fill="#FFB5C5" />
          <path d="M 176 60 Q 176 57 178 57 Q 180 57 180 60 Q 180 63 178 65 Q 176 63 176 60 Z" fill="#FFB5C5" />
        </g>
      </svg>
    </div>
  );
}