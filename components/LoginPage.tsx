
import React from 'react';
import FingerprintScanner from './FingerprintScanner';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm mx-auto bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden border border-slate-700">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-slate-50 mb-2">Welcome Back</h1>
          <p className="text-slate-400 mb-8">Authenticate to access your account</p>
          
          <FingerprintScanner onScanSuccess={onLoginSuccess} />

          <p className="mt-8 text-sm text-slate-500">
            Place your finger on the scanner to log in.
          </p>
        </div>
        <div className="bg-slate-900/50 px-8 py-4 text-center text-xs text-slate-600 border-t border-slate-700">
          <p>&copy; 2024 Secure Corp. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
