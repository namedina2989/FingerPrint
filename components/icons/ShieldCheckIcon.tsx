import React from 'react';

const ShieldCheckIcon: React.FC = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-8 w-8 text-cyan-400" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={1.5}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.917l9-3.462 9 3.462a12.02 12.02 0 00-2.382-9.975z" 
      />
    </svg>
  );
};

export default ShieldCheckIcon;
