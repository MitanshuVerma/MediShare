import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import MediShare from './pages/MediShare';
import Admin from './pages/Admin';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/medishare/*" element={<div className="pt-20"><MediShare /></div>} />
            <Route path="/admin/*" element={<div className="pt-20"><Admin /></div>} />
            {/* Direct convenience aliases */}
            <Route path="/verify" element={<Navigate to="/medishare/verify" replace />} />
            <Route path="/generate" element={<Navigate to="/medishare/generate" replace />} />
            <Route path="/reports" element={<Navigate to="/medishare/reports" replace />} />
            <Route path="/donations" element={<Navigate to="/medishare/donations" replace />} />
            <Route path="/store" element={<Navigate to="/medishare/store" replace />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

