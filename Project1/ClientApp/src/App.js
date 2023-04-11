import React from 'react';
import './style.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import UsualPage from './pages/usual-page/UsualPage';
import Register from './pages/register/Register';
import AdminPanel from './pages/admin-panel/AdminPanel';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<UsualPage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
