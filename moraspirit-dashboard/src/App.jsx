import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import MemberDetails from './components/MemberDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <header className="app-header">
          <div className="header-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="header-text">
            <span className="header-eyebrow">Web Pillar · Technical Task</span>
            <h1 className="header-title">MoraSpirit</h1>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/member/:id" element={<MemberDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
