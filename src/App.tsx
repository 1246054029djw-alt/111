import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MeetingRooms from './pages/MeetingRooms';
import Approvals from './pages/Approvals';
import Members from './pages/Members';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes (Wrapped in Layout) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="meeting-rooms" element={<MeetingRooms />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="members" element={<Members />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Fallback for other routes */}
          <Route path="*" element={<div className="p-8 text-center text-outline">功能开发中...</div>} />
        </Route>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
