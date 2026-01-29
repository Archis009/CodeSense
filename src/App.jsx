import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Placeholder for other routes */}
        <Route path="/dashboard/*" element={<div>Dashboard (Coming Soon)</div>} />
        <Route path="/login" element={<div>Login (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
