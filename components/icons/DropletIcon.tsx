import React from 'react';

const DropletIcon: React.FC = () => {
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
        d="M12 2.69l5.66 5.66a8 8 0 11-11.32 0L12 2.69z" 
      />
    </svg>
  );
};

export default DropletIcon;
