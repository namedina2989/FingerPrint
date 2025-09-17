import React from 'react';

const CheckCircleIcon: React.FC = () => {
  return (
    <div className="w-24 h-24">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* Circle */}
        <circle 
          className="stroke-green-500/30"
          cx="50" 
          cy="50" 
          r="45" 
          strokeWidth="5" 
          fill="none" 
        />
        {/* Animated Checkmark */}
        <path 
          className="stroke-green-400"
          d="M30 50 L45 65 L70 40" 
          strokeWidth="6" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            animation: 'draw-checkmark 0.5s 0.2s ease-out forwards'
          }}
        />
      </svg>
      <style>{`
        @keyframes draw-checkmark {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CheckCircleIcon;
