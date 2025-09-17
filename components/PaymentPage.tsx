import React, { useState, useEffect } from 'react';
import { Biller } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import FingerprintScanner from './FingerprintScanner';

interface PaymentPageProps {
  biller: Biller;
  onBack: () => void;
  onAuthSuccess: () => void;
}

type FormStatus = 'idle' | 'error';

const sourceAccounts = [
  { id: '1', name: 'Primary Savings', number: '1234-5678-9012' },
  { id: '2', name: 'Everyday Checking', number: '9876-5432-1098' },
  { id: '3', name: 'Investment Fund', number: '5555-6666-7777' },
];

const PaymentPage: React.FC<PaymentPageProps> = ({ biller, onBack, onAuthSuccess }) => {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [sourceAccountNumber, setSourceAccountNumber] = useState('');
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    setShowPage(true);
  }, []);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (referenceNumber.trim() === '' || sourceAccountNumber.trim() === '') {
      setFormStatus('error');
      return;
    }
    setFormStatus('idle');
    setIsAuthenticating(true);
  };
  
  return (
    <>
    <div className={`flex items-center justify-center min-h-screen p-4 transition-opacity duration-500 ${showPage ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md mx-auto">
            <button 
                onClick={onBack}
                disabled={isAuthenticating}
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6 group disabled:opacity-50 disabled:hover:text-slate-400"
            >
                <ArrowLeftIcon />
                <span className="group-hover:underline">Back to Bills</span>
            </button>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden border border-slate-700">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <p className="text-slate-400 text-lg">You are paying</p>
                        <h1 className="text-4xl font-bold text-slate-50 mt-1">₱{biller.amount.toFixed(2)}</h1>
                        <p className="text-slate-300 text-xl mt-2">to <span className="font-semibold">{biller.name}</span></p>
                    </div>

                    <form onSubmit={handleConfirm}>
                        <div className="mb-4">
                            <label htmlFor="sourceAccount" className="block text-sm font-medium text-slate-300 mb-2">
                                Source Account
                            </label>
                             <div className="relative">
                                <select
                                    id="sourceAccount"
                                    value={sourceAccountNumber}
                                    onChange={(e) => {
                                        setSourceAccountNumber(e.target.value);
                                        if(formStatus === 'error') setFormStatus('idle');
                                    }}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all appearance-none disabled:opacity-50"
                                    aria-describedby="source-account-error"
                                >
                                    <option value="" disabled>Select a source account</option>
                                    {sourceAccounts.map(account => (
                                        <option key={account.id} value={account.number} className="bg-slate-800">
                                            {account.name} - **** {account.number.slice(-4)}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                     </svg>
                                </div>
                            </div>
                            {formStatus === 'error' && !sourceAccountNumber.trim() && <p id="source-account-error" className="text-red-400 text-sm mt-2">Please select a source account.</p>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="reference" className="block text-sm font-medium text-slate-300 mb-2">
                                Reference Number
                            </label>
                            <input
                                type="text"
                                id="reference"
                                value={referenceNumber}
                                onChange={(e) => {
                                    setReferenceNumber(e.target.value);
                                    if(formStatus === 'error') setFormStatus('idle');
                                }}
                                placeholder="Enter your reference number"
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                                aria-describedby="reference-error"
                            />
                            {formStatus === 'error' && !referenceNumber.trim() && <p id="reference-error" className="text-red-400 text-sm mt-2">Reference number is required.</p>}
                        </div>
                        
                        <button
                            type="submit"
                            disabled={!referenceNumber || !sourceAccountNumber}
                            className={`w-full text-center px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out
                            bg-cyan-600 text-white hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed
                            `}
                        >
                            Confirm Payment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    {isAuthenticating && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="w-full max-w-sm mx-auto bg-slate-800 rounded-2xl shadow-2xl p-8 text-center border border-slate-700">
                <h2 className="text-2xl font-bold text-slate-50 mb-2">Confirm Payment</h2>
                <p className="text-slate-400 mb-8">Please verify your identity to proceed.</p>
                <FingerprintScanner onScanSuccess={onAuthSuccess} />
                <button 
                    onClick={() => setIsAuthenticating(false)} 
                    className="mt-8 text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                >
                    Cancel
                </button>
            </div>
             <style>{`
                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    )}
    </>
  );
};

export default PaymentPage;
