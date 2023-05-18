import React from 'react';
import './style.scss';
import './ant-style.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import UsualPage from './pages/usual-page/UsualPage';
import Register from './pages/register/Register';
import AdminPanel from './pages/admin-panel/AdminPanel';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { getIsLoading } from './store/selectors';

function App() {
  const [_, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <Routes>
        <Route path="/*" element={<UsualPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
