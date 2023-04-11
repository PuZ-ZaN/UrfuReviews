import React from 'react';
import './Login.scss';
import Icon, { ArrowLeftOutlined } from '@ant-design/icons';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

// warning block on register: only urfu email

const Login = () => {
  return (
    <div className="login-container">
      <Link to="/" className="a-back-button">
        <div className="back-button">
          <ArrowLeftOutlined />
          <p>На главную</p>
        </div>
      </Link>
      <div className="login-block">
        <p className="login_title">Вход</p>
        <div className="email-block">
          <p className="email-title">Email</p>
          <Input size="large" placeholder="Введите email" prefix={<UserOutlined />} />
        </div>
        <div className="password-block">
          <p className="password-title">Пароль</p>
          <Input.Password size="large" placeholder="Введите пароль" prefix={<LockOutlined />} />
          <p className="forget-password-title">Забыли пароль?</p>
        </div>
        <div className="login-button">Войти</div>
        <div className="register-block">
          <p className="or-register-title">
            Нет аккаунта?{' '}
            <span className="register-title">
              <Link to="/register">Зарегистрируйтесь</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
