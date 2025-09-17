import React, { useState, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import PaymentPage from './components/PaymentPage';
import SuccessPage from './components/SuccessPage';
import { Page, Biller } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);
  const [selectedBiller, setSelectedBiller] = useState<Biller | null>(null);

  const handleLoginSuccess = useCallback(() => {
    setCurrentPage(Page.Home);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentPage(Page.Login);
    setSelectedBiller(null);
  }, []);

  const handlePayNow = useCallback((biller: Biller) => {
    setSelectedBiller(biller);
    setCurrentPage(Page.Payment);
  }, []);

  const handleBackToHome = useCallback(() => {
    setSelectedBiller(null);
    setCurrentPage(Page.Home);
  }, []);

  const handleAuthSuccess = useCallback(() => {
    if (selectedBiller) {
      setCurrentPage(Page.Success);
    }
  }, [selectedBiller]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Login:
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case Page.Home:
        return <HomePage onLogout={handleLogout} onPayNow={handlePayNow} />;
      case Page.Payment:
        return selectedBiller 
          ? <PaymentPage 
              biller={selectedBiller} 
              onBack={handleBackToHome} 
              onAuthSuccess={handleAuthSuccess}
            />
          : <HomePage onLogout={handleLogout} onPayNow={handlePayNow} />;
      case Page.Success:
        return selectedBiller
          ? <SuccessPage
              biller={selectedBiller}
              onDone={handleBackToHome}
            />
          : <HomePage onLogout={handleLogout} onPayNow={handlePayNow} />;
      default:
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {renderPage()}
    </div>
  );
}

export default App;