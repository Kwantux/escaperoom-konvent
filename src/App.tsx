
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { PanelPage } from './pages/PanelPage';
import SafetyWarn from './pages/SafetyWarn';
import AntennaWarn from './pages/AntennaWarn';
import EarthDestroyed from './pages/EarthDestroyed';
import SystemDestroyed from './pages/SystemDestroyed';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PathRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const path = params.get('p');
    
    if (path) {
      window.history.replaceState(null, '', path);
      navigate(path);
    }
  }, [navigate]);

  return null;
}

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <PathRedirect />
        <Routes>
          {/* <Route path="*" element={<Navigate to="/antenna" replace />} /> */}
          <Route path="/antenna" element={<AntennaWarn />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/warn" element={<SafetyWarn />} />
          <Route path="/panel" element={<PanelPage />} />
          <Route path="/earth-destroyed" element={<EarthDestroyed />} />
          <Route path="/system-destroyed" element={<SystemDestroyed />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
