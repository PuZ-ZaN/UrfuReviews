import React from 'react';
import './../login/Login.scss';
import './Register.scss';
import Icon, { ArrowLeftOutlined, FontColorsOutlined, SendOutlined } from '@ant-design/icons';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Alert, Input } from 'antd';
import { Link } from 'react-router-dom';

// warning block on register: only urfu email

const Register = () => {
  return (
    <div className="login-container register-container">
      <Link to="/" className="a-back-button">
        <div className="back-button">
          <ArrowLeftOutlined />
          <p>На главную</p>
        </div>
      </Link>
      <div className="login-block">
        <p className="login_title register-title">Регистрация</p>
        <div className="username-block">
          <p className="username-title">Username</p>
          <Input size="large" placeholder="Введите username" prefix={<SendOutlined />} />
        </div>
        <div className="email-block">
          <p className="email-title">Email</p>
          <Alert
            message="Для подтверждения того, что вы обучаетесь в УРФУ, необходимо ввести корпоративную почту. Она должна заканчиваться на @urfu.me"
            type="warning"
            showIcon
            closable
            className="alert-urfu-email"
          />
          <Input size="large" placeholder="Введите email" prefix={<UserOutlined />} />
        </div>

        <div className="password-block">
          <p className="password-title">Пароль</p>
          <Input.Password size="large" placeholder="Введите пароль" prefix={<LockOutlined />} />
        </div>

        <div className="login-button">Зарегистрироваться</div>
      </div>
    </div>
  );
};

export default Register;
