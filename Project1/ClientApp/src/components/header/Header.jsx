import React from 'react';
import './header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTextSearch } from '../../store/subjectsSlice';
import { getFilteredBy, getSemester } from './../../store/selectors';
import { MenuOutlined } from '@ant-design/icons';

export default function Header({ isSidebarShown, setSidebarShown, sidebarIconRef }) {
  const [inputText, setInputText] = React.useState('');
  const [isFocusedInput, setFocusedInput] = React.useState(false);
  const filteredBy = useSelector((state) => getFilteredBy(state));
  const semester = useSelector((state) => getSemester(state));
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onFocus = () => setFocusedInput(true);
  const onBlur = () => setFocusedInput(false);

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const searchResults = (e) => {
    e.preventDefault();
    if (!inputText) return;
    navigate(`/search/?text=${inputText}&filteredBy=${filteredBy}&semester=${semester}`);
    dispatch(setTextSearch(inputText));
    setInputText('');
  };

  const onClickSidebarIcon = () => {
    setSidebarShown((prevValue) => !prevValue);
  };

  return (
    <>
      <div className="header">
        <div className="sidebar-icon">
          <MenuOutlined
            style={{ fontSize: '1.5rem' }}
            onClick={onClickSidebarIcon}
            ref={sidebarIconRef}
          />
        </div>
        <div className={`search ${isFocusedInput ? 'focused' : 'no_focus'}`}>
          <form action="#">
            <div className="search_container">
              <input
                type="text"
                className="search-input"
                placeholder="Введите название трека или преподавателя"
                value={inputText}
                onChange={handleInputText}
                onFocus={onFocus}
                onBlur={onBlur}
                required></input>
              <button type="submit" className="button-search" onClick={searchResults}>
                Поиск
              </button>
            </div>
          </form>
        </div>

        <div className="nav-items-grid">
          <div className="nav-items">
            <Link to="/login" className="login">
              <span>Добавить отзыв</span>
              <img src="/img/arrow-right.svg" alt="arrow-right" />
            </Link>
            {/* <a href="/review" className="add_review">
              <span>Добавить отзыв</span>
              <img src="/img/add_review_icon.png" width={19} height={19} alt="add" />
            </a>
            <a href='/review' className='faq'>
          <span>FAQ</span>
          <img src='/img/question.svg' alt='arrow-right' />
        </a> */}
          </div>
        </div>
      </div>
    </>
  );
}
