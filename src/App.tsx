import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import SatellitePage from './pages/SatellitePage';
import SubmitGPT from './pages/SubmitGPT';
import ModerationPanel from './pages/ModerationPanel';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SatellitePage />} />
          <Route path="/submit" element={<SubmitGPT />} />
          <Route path="/moderation" element={<ModerationPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
