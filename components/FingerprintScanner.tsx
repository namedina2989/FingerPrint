
import React, { useState, useEffect, useCallback } from 'react';
import { ScanStatus } from '../types';
import FingerprintIcon from './icons/FingerprintIcon';

interface FingerprintScannerProps {
  onScanSuccess: () => void;
}

const FingerprintScanner: React.FC<FingerprintScannerProps> = ({ onScanSuccess }) => {
  const [status, setStatus] = useState<ScanStatus>(ScanStatus.Idle);

  const getStatusText = () => {
    switch (status) {
      case ScanStatus.Scanning:
        return 'Scanning...';
      case ScanStatus.Success:
        return 'Authenticated';
      case ScanStatus.Error:
        return 'Authentication Failed';
      case ScanStatus.Idle:
      default:
        return 'Ready to Scan';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case ScanStatus.Scanning:
        return 'text-blue-400';
      case ScanStatus.Success:
        return 'text-green-400';
      case ScanStatus.Error:
        return 'text-red-400';
      case ScanStatus.Idle:
      default:
        return 'text-slate-400';
    }
  };
  
  const handleScan = useCallback(() => {
    if (status === ScanStatus.Idle || status === ScanStatus.Error) {
      setStatus(ScanStatus.Scanning);
    }
  }, [status]);

  useEffect(() => {
    let timer: number;
    if (status === ScanStatus.Scanning) {
      timer = window.setTimeout(() => {
        // Simulate a successful scan
        setStatus(ScanStatus.Success);
      }, 2000);
    } else if (status === ScanStatus.Success) {
      timer = window.setTimeout(() => {
        onScanSuccess();
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [status, onScanSuccess]);

  const isScanning = status === ScanStatus.Scanning;

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <button
        onClick={handleScan}
        disabled={status === ScanStatus.Scanning || status === ScanStatus.Success}
        className="relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out group focus:outline-none"
      >
        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isScanning ? 'bg-cyan-500/20 animate-pulse' : 
          status === ScanStatus.Success ? 'bg-green-500/20' : 
          status === ScanStatus.Error ? 'bg-red-500/20' : 
          'bg-slate-700/50 group-hover:bg-cyan-500/10'
        }`}></div>
        
        <div className={`absolute inset-2 rounded-full border-2 transition-all duration-300 ${
            isScanning ? 'border-cyan-400' : 
            status === ScanStatus.Success ? 'border-green-400' :
            status === ScanStatus.Error ? 'border-red-400' :
            'border-slate-600 group-hover:border-cyan-500'
        }`}></div>
        
        <div className="relative z-10">
          <FingerprintIcon status={status} />
        </div>
      </button>
      <div className={`text-lg font-medium transition-colors duration-300 ${getStatusColor()}`}>
        {getStatusText()}
      </div>
    </div>
  );
};

export default FingerprintScanner;
