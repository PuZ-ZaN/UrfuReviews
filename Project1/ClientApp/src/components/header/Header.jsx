import React from 'react';
import './header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTextSearch } from '../../store/subjectsSlice';
import { getIsAuthUser, getSemester } from './../../store/selectors';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { logout } from '../../store/userSlice';

export default function Header({ isSidebarShown, setSidebarShown, sidebarIconRef }) {
  const [inputText, setInputText] = React.useState('');
  const [isFocusedInput, setFocusedInput] = React.useState(false);
  //const filteredBy = useSelector((state) => getFilteredBy(state));
  const filteredBy = 'teachers';
  const semester = useSelector(getSemester);
  const isAuth = useSelector(getIsAuthUser);
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
    //dispatch(setTextSearch(inputText));
    setInputText('');
  };

  const onClickSidebarIcon = () => {
    setSidebarShown((prevValue) => !prevValue);
  };

  const handleLogout = () => {
    dispatch(logout());
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
            {!isAuth ? (
              <Link to="/login" className="logout">
                <span>Войти</span>
                <img src="/img/arrow-right.svg" alt="logout" />
              </Link>
            ) : (
              <>
                <Link to="/add_review" className="add-review">
                  <span>Добавить отзыв</span>
                  <img src="/img/add_review_icon.png" alt="add" />
                </Link>
                <div className="logout" onClick={handleLogout}>
                  <span>Выйти</span>
                  <img src="/img/arrow-right.svg" alt="logout" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
