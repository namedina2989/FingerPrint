import React, { useState, useEffect, useRef } from 'react';
import { Biller } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

interface OTPPageProps {
  biller: Biller;
  onSuccess: () => void;
  onBack: () => void;
}

type VerificationStatus = 'idle' | 'verifying' | 'success' | 'error';

const OTPPage: React.FC<OTPPageProps> = ({ biller, onSuccess, onBack }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    let interval: number;
    if (timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (status !== 'idle') setStatus('idle');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(paste)) {
        const newOtp = paste.split('');
        setOtp(newOtp);
        inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join('').length !== 6) {
        setStatus('error');
        return;
    }
    setStatus('verifying');
    setTimeout(() => {
      // Simulate success
      setStatus('success');
      setTimeout(onSuccess, 2000);
    }, 2000);
  };
  
  const getButtonText = () => {
    switch (status) {
        case 'verifying': return 'Verifying...';
        case 'success': return 'Payment Successful!';
        default: return 'Verify & Pay';
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 animate-fade-in">
      <div className="w-full max-w-md mx-auto">
        <button
          onClick={onBack}
          disabled={status === 'verifying' || status === 'success'}
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6 group disabled:opacity-50"
        >
          <ArrowLeftIcon />
          <span className="group-hover:underline">Back</span>
        </button>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden border border-slate-700 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-full mb-6">
              <ShieldCheckIcon />
          </div>
          <h1 className="text-3xl font-bold text-slate-50 mb-2">Enter OTP</h1>
          <p className="text-slate-400 mb-8">
            A 6-digit code has been sent to your registered mobile number.
          </p>

          <div className="flex justify-center gap-2 sm:gap-3 mb-6" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                // FIX: The ref callback should not return a value. The assignment is wrapped in a block statement to ensure it returns void.
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={status === 'verifying' || status === 'success'}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-slate-900/50 border-2 rounded-lg transition-all
                  ${status === 'error' && otp.join('').length !== 6 ? 'border-red-500/50' : 'border-slate-600'}
                  focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 outline-none`}
              />
            ))}
          </div>
          
           {status === 'error' && <p className="text-red-400 text-sm mb-4">Please enter a valid 6-digit OTP.</p>}


          <div className="mb-8">
            {timer > 0 ? (
              <p className="text-slate-500">Resend OTP in {timer}s</p>
            ) : (
              <button 
                onClick={() => setTimer(30)}
                className="text-cyan-400 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={otp.join('').length !== 6 || status === 'verifying' || status === 'success'}
            className={`w-full text-center px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out
              ${status === 'success' ? 'bg-green-500/80 text-white' : ''}
              ${status !== 'success' ? 'bg-cyan-600 text-white hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed' : ''}
            `}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
      <style>{`
          @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
          input[type=text] { caret-color: #22d3ee; }
      `}</style>
    </div>
  );
};

export default OTPPage;
