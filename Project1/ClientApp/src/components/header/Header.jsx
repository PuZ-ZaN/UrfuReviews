import React from 'react';
import './header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterdBySearch, getIsAuthUser, getUserName } from './../../store/selectors';
import {
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  MessageOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { logout } from '../../store/userSlice';
import { setTextSearch } from '../../store/searchSlice';
import Search from 'antd/es/input/Search';
import { Avatar } from 'antd';
import { resetSubjectsState } from '../../store/subjectsSlice';

export default function Header({ isSidebarShown, setSidebarShown, sidebarIconRef }) {
  const [inputText, setInputText] = React.useState('');
  const [isFocusedInput, setFocusedInput] = React.useState(false);

  const filteredBy = useSelector(getFilterdBySearch);
  const isAuth = useSelector(getIsAuthUser);
  const userName = useSelector(getUserName);
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
    navigate(`/search/?text=${inputText}&filteredBy=${filteredBy}`);
    dispatch(setTextSearch(inputText));
    setInputText('');
  };

  const onClickSidebarIcon = () => {
    setSidebarShown((prevValue) => !prevValue);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClickLogo = () => {
    dispatch(resetSubjectsState());
  };

  return (
    <header>
      <div className="header">
        {/* <div className="sidebar-icon">
          <MenuOutlined
            style={{ fontSize: '1.5rem' }}
            onClick={onClickSidebarIcon}
            ref={sidebarIconRef}
          />
        </div> */}
        <Link to="/" className="title" onClick={handleClickLogo}>
          URFU Courses
        </Link>
        <div className={`search ${isFocusedInput ? 'focused' : 'no_focus'}`}>
          <form action="#">
            <div className="search_container">
              <div className="search-icon">
                <SearchOutlined />
              </div>
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
            {/* <Search placeholder="input search text" allowClear enterButton="Найти" size="large" /> */}
          </form>
        </div>

        <div className="nav-items-grid">
          <div className="nav-items">
            {!isAuth ? (
              <Link to="/login" className="logout">
                <span>Войти</span>
                {/* <img src="/img/arrow-right.svg" alt="logout" /> */}
                <LoginOutlined />
              </Link>
            ) : (
              <>
                <Link to="/add_review" className="add-review">
                  <span>Добавить отзыв</span>
                  {/* <img src="/img/add_review_icon.png" alt="add" /> */}
                  <MessageOutlined />
                </Link>
                <div className="logout" onClick={handleLogout}>
                  <span>Выйти</span> <LogoutOutlined />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
