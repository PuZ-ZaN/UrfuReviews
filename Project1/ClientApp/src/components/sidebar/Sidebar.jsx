import React from 'react';
import { Link } from 'react-router-dom';
import CourseBlock from './course-block/CourseBlock';
import './sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { resetSubjectsState, setSemester } from '../../store/subjectsSlice';
import { getSemester } from '../../store/selectors';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ isSidebarShown, setSidebarShown, sidebarIconRef }) => {
  const sidebarRef = React.useRef();
  const [activeCourse, setActiveCourse] = React.useState(null);
  const activeSemester = useSelector((state) => getSemester(state));
  const href = useLocation().pathname;
  const listCourses = [1, 2, 3, 4];
  const emojyCourses = ['👶', '👦', '🧔', '👴'];

  React.useEffect(() => {
    setActiveCourse(null);
    dispatch(setSemester('all'));
  }, [href]);

  // mobile sidebar-burger menu

  React.useEffect(() => {
    if (!isSidebarShown) return;

    const handleClick = (e) => {
      if (e.target.classList == 'sidebar_layout ') setSidebarShown(false);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isSidebarShown]);

  const dispatch = useDispatch();

  const handleClickSemester = (semester) => {
    dispatch(setSemester(activeSemester !== semester ? semester : 'all'));
  };

  return (
    <div className={`sidebar_layout ${isSidebarShown ? '' : 'hidden_sidebar'}`}>
      <div className="sidebar" ref={sidebarRef}>
        <p className="sidebar_title">
          Сортировка
          <br /> по курсам
        </p>
        <div className={`list_courses`}>
          {listCourses.map((numberCourse) => (
            <CourseBlock
              numberCourse={numberCourse}
              emojy={emojyCourses[numberCourse - 1]}
              isActiveCourse={activeCourse === numberCourse}
              setActiveCourse={setActiveCourse}
              numberActiveSemester={activeSemester}
              setActiveSemester={handleClickSemester}
              key={numberCourse}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
