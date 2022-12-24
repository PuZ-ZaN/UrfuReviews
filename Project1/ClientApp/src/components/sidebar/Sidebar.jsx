import React from 'react';
import { Link } from 'react-router-dom';
import CourseBlock from './course-block/CourseBlock';
import './sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredSubjectsBySemestr, setSemester } from '../../store/subjectsSlice';
import { getSemester } from '../../store/selectors';

const Sidebar = () => {
  const [activeCourse, setActiveCourse] = React.useState(null);
  const activeSemester = useSelector((state) => getSemester(state));
  const listCourses = [1, 2, 3, 4];
  const emojyCourses = ['👶', '👦', '🧔', '👴'];

  const dispatch = useDispatch();

  const handleClickSemester = (semester) => {
    dispatch(setFilteredSubjectsBySemestr(activeSemester !== semester ? semester : 'all'));
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
            numberActiveSemester={activeSemester}
            setActiveSemester={handleClickSemester}
            key={numberCourse}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
