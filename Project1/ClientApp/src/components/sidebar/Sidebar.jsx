import React from 'react';
import { Link } from 'react-router-dom';
import CourseBlock from './course-block/CourseBlock';
import './sidebar.scss';
import { useDispatch } from 'react-redux';
import { setFilteredSubjectsBySemestr } from '../../store/slices';

const Sidebar = () => {
  const [activeCourse, setActiveCourse] = React.useState(null);
  const [activeSemestr, setActiveSemestr] = React.useState(null);
  const listCourses = [1, 2, 3, 4];
  const emojyCourses = ['👶', '👦', '🧔', '👴'];

  const dispatch = useDispatch();

  const handleClickSemester = (semester) => {
    dispatch(setFilteredSubjectsBySemestr(semester));
    setActiveSemestr(semester);
  };

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar_title">
        URFU Courses
      </Link>
      <div className="list_courses">
        {listCourses.map((numberCourse) => (
          <CourseBlock
            numberCourse={numberCourse}
            emojy={emojyCourses[numberCourse - 1]}
            isActiveCourse={activeCourse === numberCourse}
            setActiveCourse={setActiveCourse}
            numberActiveSemestr={activeSemestr}
            setActiveSemestr={handleClickSemester}
            key={numberCourse}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
