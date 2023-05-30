import React from 'react';
import './Login.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Modal, message } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../../store/api-actions';
import { getIsAuthUser } from '../../store/selectors';

// warning block on register: only urfu email

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuthUser);

  const onSubmit = async ({ email, password }) => {
    const result = await dispatch(authLogin({ email: email.split('@')[0], password }));
    if (result?.error) {
      error();
    } else {
      success();
    }
  };

  const [_, contextHolder] = message.useMessage();

  const error = () => {
    Modal.error({
      content: 'Неверный логин или пароль',
      className: 'modal-my-class',
      centered: true,
    });
  };
  const success = () => {
    Modal.success({
      content: 'Вы успешно вошли в систему',
      className: 'modal-my-class',
    });
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <>
      {contextHolder}
      <div className="login-container">
        <Link to="/" className="a-back-button">
          <div className="back-button">
            <ArrowLeftOutlined />
            <p>На главную</p>
          </div>
        </Link>
        <div className="login-block">
          <p className="login_title">Вход</p>
          <Form name="login" onFinish={onSubmit}>
            <div className="email-block">
              <p className="email-title">Email</p>
              <Form.Item
                name="email"
                rules={[
                  {
                    validator: (_, value) =>
                      value?.endsWith('@urfu.me')
                        ? Promise.resolve()
                        : Promise.reject(new Error('Укажите почту в формате @urfu.me')),
                  },
                ]}
                className="form-item">
                <Input
                  size="large"
                  type="email"
                  placeholder="Введите email"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            </div>
            <div className="password-block">
              <p className="password-title">Пароль</p>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Укажите пароль' }]}
                className="form-item">
                <Input.Password
                  size="large"
                  placeholder="Введите пароль"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <p className="forget-password-title">Забыли пароль?</p>
            </div>
            <button type="submit" className="login-button">
              Войти
            </button>
          </Form>
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
    </>
  );
};

export default Login;
