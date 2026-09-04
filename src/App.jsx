import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={
          <div style={{ minHeight:'100vh', background:'#0D0D0F', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace' }}>
            <div style={{ textAlign:'center' }}>
              <p style={{ color:'#8E8E99', fontSize:'14px' }}>404 — not found</p>
              <a href="/" style={{ color:'#30D5C8', fontSize:'13px', marginTop:'10px', display:'block' }}>← back</a>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}
