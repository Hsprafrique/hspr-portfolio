import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={
          <div style={{ minHeight: '100vh', background: '#0E0B08', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace" }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#A89C8C', fontSize: '14px' }}>404 — system not found</p>
              <a href="/" style={{ color: '#FF9F1C', fontSize: '14px', marginTop: '10px', display: 'block' }}>← back to base</a>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}
