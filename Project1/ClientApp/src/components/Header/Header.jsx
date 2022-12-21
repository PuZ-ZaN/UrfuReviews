import React from 'react';
import './header.scss';
import { useNavigate } from 'react-router-dom';
import ModalWindow from '../modal-window/ModalWindow';
import SignUpModalWindow from '../modal-window/sign-up-modal-window/SignUpModalWindow';
import StatusModalWindow from './../modal-window/status-modal-window/StatusModalWindow';
import { statusesLogin } from '../../const.ts';

export default function Header() {
  const [inputText, setInputText] = React.useState('');
  const [isActiveModalWindow, setIsActiveModalWindow] = React.useState(false);

  const navigate = useNavigate();

  const handleInputText = (e) => {
    setInputText(e.value);
  };

  const searchResults = (e) => {
    e.preventDefault();
    navigate('/search');
    setInputText('');
  };

  const handleLogin = () => {
    setIsActiveModalWindow(true);
  };

  const closeModalWindow = () => {
    setIsActiveModalWindow(false);
  };

  return (
    <>
      <div className='header'>
        <div className='search'>
          <form action='#'>
            <div className='search_container'>
              <input
                type='text'
                className='search'
                placeholder='Введите название трека или преподавателя'
                value={inputText}
                onChange={handleInputText}
                required></input>
              <button
                type='submit'
                className='button-search'
                onClick={searchResults}>
                Поиск
              </button>
            </div>
          </form>
        </div>

        <div className='nav-items'>
          <a href='#' className='login' onClick={handleLogin}>
            <span>Войти</span>
            <img src='/img/arrow-right.svg' alt='arrow-right' />
          </a>
          {/* <a href='/review' className='add_review'>
          <span>Добавить отзыв</span>
          <img
            src='/img/add_review_icon.png'
            width={19}
            height={19}
            alt='add'
          />
        </a> */}
          {/* <a href='/review' className='faq'>
          <span>FAQ</span>
          <img src='/img/question.svg' alt='arrow-right' />
        </a> */}
        </div>
      </div>
      {isActiveModalWindow && <SignUpModalWindow onClose={closeModalWindow} />}
      {/* {isActiveModalWindow && (
        <StatusModalWindow
          onClose={closeModalWindow}
          statusLogin={statusesLogin.SuccessSignUp}
        />
      )} */}
    </>
  );
}
