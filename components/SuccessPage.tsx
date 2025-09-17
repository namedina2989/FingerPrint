import React, { useState, useEffect } from 'react';
import { Biller } from '../types';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface SuccessPageProps {
  biller: Biller;
  onDone: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ biller, onDone }) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    setShowPage(true);
  }, []);

  return (
    <div className={`flex items-center justify-center min-h-screen p-4 transition-opacity duration-500 ${showPage ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md mx-auto text-center">
             <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-green-500/10 overflow-hidden border border-slate-700 p-8">
                <div className="flex justify-center mb-6">
                    <CheckCircleIcon />
                </div>
                <h1 className="text-3xl font-bold text-slate-50 mb-3">
                    Payment Successful!
                </h1>
                <p className="text-slate-300 text-lg">
                    You have successfully paid <span className="font-bold text-white">₱{biller.amount.toFixed(2)}</span> to <span className="font-bold text-white">{biller.name}</span>.
                </p>
                <p className="text-slate-400 text-sm mt-2">
                    A confirmation has been sent to your registered email and mobile number.
                </p>
                <div className="mt-10">
                    <button
                        onClick={onDone}
                        className="w-full max-w-xs mx-auto text-center px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out bg-cyan-600 text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SuccessPage;
