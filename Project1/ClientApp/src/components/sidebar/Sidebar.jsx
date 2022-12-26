import React from 'react';
import { Link } from 'react-router-dom';
import CourseBlock from './course-block/CourseBlock';
import './sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { resetSubjectsState, setSemester } from '../../store/subjectsSlice';
import { getSemester } from '../../store/selectors';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [activeCourse, setActiveCourse] = React.useState(null);
  const activeSemester = useSelector((state) => getSemester(state));
  const href = useLocation().pathname;
  const [isBlockedClick, setIsBlockedClick] = React.useState(isNeedBlock());
  const listCourses = [1, 2, 3, 4];
  const emojyCourses = ['👶', '👦', '🧔', '👴'];

  React.useEffect(() => {
    setIsBlockedClick(isNeedBlock());
    setActiveCourse(null);
    setActiveCourse(null);
    dispatch(setSemester('all'));
  }, [href]);

  function isNeedBlock() {
    return href != '/' && href != '/search/';
  }

  const dispatch = useDispatch();

  const handleClickSemester = (semester) => {
    if (isBlockedClick) return;
    dispatch(setSemester(activeSemester !== semester ? semester : 'all'));
  };

  const handleClickLogo = () => {
    dispatch(resetSubjectsState());
  };

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar_title" onClick={handleClickLogo}>
        URFU Courses
      </Link>
      <div className="list_courses">
        {listCourses.map((numberCourse) => (
          <CourseBlock
            numberCourse={numberCourse}
            emojy={emojyCourses[numberCourse - 1]}
            isActiveCourse={activeCourse === numberCourse}
            setActiveCourse={isBlockedClick ? () => {} : setActiveCourse}
            numberActiveSemester={activeSemester}
            setActiveSemester={isBlockedClick ? () => {} : handleClickSemester}
            key={numberCourse}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
