import React from 'react';
import LogoutIcon from './icons/LogoutIcon';
import ZapIcon from './icons/ZapIcon';
import WifiIcon from './icons/WifiIcon';
import DropletIcon from './icons/DropletIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import { Biller } from '../types';


interface HomePageProps {
  onLogout: () => void;
  onPayNow: (biller: Biller) => void;
}

const billers: Biller[] = [
  { id: '1', name: 'Meralco', category: 'Electricity', amount: 5198.25, nextDueDate: 'July 28, 2024' },
  { id: '2', name: 'Globe Internet', category: 'Internet', amount: 1499.99, nextDueDate: 'July 30, 2024' },
  { id: '3', name: 'Maynilad', category: 'Water', amount: 900, nextDueDate: 'August 05, 2024' },
  { id: '4', name: 'Tax for Crocs', category: 'Credit Card', amount: 40000, nextDueDate: 'August 10, 2024' },
];

const categoryIcons: { [key in Biller['category']]: React.ReactNode } = {
  Electricity: <ZapIcon />,
  Internet: <WifiIcon />,
  Water: <DropletIcon />,
  'Credit Card': <CreditCardIcon />,
};

const categoryColors: { [key in Biller['category']]: string } = {
  Electricity: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300',
  Internet: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  Water: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
  'Credit Card': 'border-purple-500/30 bg-purple-500/10 text-purple-300',
};


const HomePage: React.FC<HomePageProps> = ({ onLogout, onPayNow }) => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 sm:p-8 pt-16">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 mb-4 animate-fade-in-down">
          Welcome Back
        </h1>
        <p className="text-xl text-slate-300 mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          Here are your upcoming bills.
        </p>

        <div className="text-left animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <h2 className="text-2xl font-bold text-slate-100 mb-6">Upcoming Bills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {billers.map((biller, index) => (
              <div 
                key={biller.id} 
                className={`bg-slate-800/50 border border-slate-700 rounded-lg p-6 shadow-lg transition-all duration-300 hover:border-cyan-500/50 hover:scale-[1.02] animate-fade-in-up`}
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`flex items-center gap-3 mb-2`}>
                      <span className={`inline-flex p-2 rounded-full ${categoryColors[biller.category]}`}>
                        {categoryIcons[biller.category]}
                      </span>
                      <p className="text-lg font-semibold text-slate-100">{biller.name}</p>
                    </div>
                    <p className="text-sm text-slate-400">{biller.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-2xl font-bold text-slate-50">₱{biller.amount.toFixed(2)}</p>
                      <p className="text-xs text-slate-500">Due {biller.nextDueDate}</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-end">
                    <button 
                        onClick={() => onPayNow(biller)}
                        className="px-5 py-2 bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-sm font-semibold hover:bg-cyan-600/40 hover:text-cyan-200 transition-all duration-300">
                        Pay Now
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="mt-16 inline-flex items-center gap-2 px-6 py-3 bg-red-600/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-600/40 hover:text-red-200 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500 animate-fade-in-up"
          style={{ animationDelay: '1.8s' }}
        >
          <LogoutIcon />
          Logout
        </button>
      </div>
      <style>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.5s ease-out forwards; opacity: 0; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; opacity: 0; }
      `}</style>
    </div>
  );
};

export default HomePage;