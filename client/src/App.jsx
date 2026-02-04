import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import DashboardLayout from './components/layout/DashboardLayout';

import NewAnalysis from './pages/NewAnalysis';
import History from './pages/History';
import Settings from './pages/Settings';
import ProfileSettings from './pages/ProfileSettings';
import NotificationSettings from './pages/NotificationSettings';
import SecuritySettings from './pages/SecuritySettings';
import Dashboard from './pages/Dashboard';

import AnalysisResult from './pages/AnalysisResult';

import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="new" element={<NewAnalysis />} />
          <Route path="history" element={<History />} />
          <Route path="analysis/:id" element={<AnalysisResult />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/profile" element={<ProfileSettings />} />
          <Route path="settings/notifications" element={<NotificationSettings />} />
          <Route path="settings/security" element={<SecuritySettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
