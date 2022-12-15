import React from 'react';
import './header.scss';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [inputText, setInputText] = React.useState('');

  const navigate = useNavigate();

  const handleInputText = (e) => {
    setInputText(e.value);
  };

  const searchResults = (e) => {
    e.preventDefault();
    navigate('/search');
    setInputText('');
  };

  return (
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
        <a href='#' className='login'>
          <span>Вход</span>
          <img src='/img/arrow-right.svg' alt='arrow-right' />
        </a>
        <a href='/review' className='faq'>
          <span>FAQ</span>
          <img src='/img/question.svg' alt='arrow-right' />
        </a>
      </div>
    </div>
  );
}
