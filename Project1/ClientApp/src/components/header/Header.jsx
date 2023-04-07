import React from 'react';
import './header.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ModalWindow from '../modal-window/ModalWindow';
import SignUpModalWindow from '../modal-window/sign-up-modal-window/SignUpModalWindow';
import StatusModalWindow from './../modal-window/status-modal-window/StatusModalWindow';
import { statusesLogin } from '../../const.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setTextSearch } from '../../store/subjectsSlice';
import { getFilteredBy, getSemester } from './../../store/selectors';
import MenuIcon from '@material-ui/icons/Menu';

export default function Header({ isSidebarShown, setSidebarShown, sidebarIconRef }) {
  const [inputText, setInputText] = React.useState('');
  const [isFocusedInput, setFocusedInput] = React.useState(false);
  const [isActiveModalWindow, setIsActiveModalWindow] = React.useState(false);
  const filteredBy = useSelector((state) => getFilteredBy(state));
  const semester = useSelector((state) => getSemester(state));
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const onFocus = () => setFocusedInput(true);
  const onBlur = () => setFocusedInput(false);

  // React.useEffect(() => {
  //   if (!isSidebarShown) return;

  //   const handleClick = (e) => {
  //     if (!sidebarIconRef.current) return;
  //     if (!sidebarIconRef.current.contains(e.target)) {
  //       setSidebarShown(false);
  //       console.log('click on no icon');
  //     }
  //   };

  //   document.addEventListener('click', handleClick);

  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //   };
  // }, [isSidebarShown]);

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

  const handleLogin = () => {
    setIsActiveModalWindow(true);
  };

  const closeModalWindow = () => {
    setIsActiveModalWindow(false);
  };

  const onClickSidebarIcon = () => {
    setSidebarShown((prevValue) => !prevValue);
  };

  return (
    <>
      <div className="header">
        <div className="sidebar-icon">
          <MenuIcon fontSize="large" onClick={onClickSidebarIcon} ref={sidebarIconRef} />
        </div>
        <div className={`search ${isFocusedInput ? 'focused' : 'no_focus'}`}>
          <form action="#">
            <div className="search_container">
              <input
                type="text"
                className="search"
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
            <a href="#" className="login" onClick={handleLogin}>
              <span>Войти</span>
              <img src="/img/arrow-right.svg" alt="arrow-right" />
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
