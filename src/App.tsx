
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { PanelPage } from './pages/PanelPage';
import SafetyWarn from './pages/SafetyWarn';
import AntennaWarn from './pages/AntennaWarn';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/panel" element={<PanelPage />} />
          <Route path="/warn" element={<SafetyWarn />} />
          <Route path="/antenna" element={<AntennaWarn />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
