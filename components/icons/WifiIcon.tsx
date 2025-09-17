import React from 'react';

const WifiIcon: React.FC = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0" 
      />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );
};

export default WifiIcon;
