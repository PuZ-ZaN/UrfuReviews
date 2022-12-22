import React from 'react';
import { Link } from 'react-router-dom';
import CourseBlock from './course-block/CourseBlock';
import './sidebar.scss';

const Sidebar = () => {
  const [activeCourse, setActiveCourse] = React.useState(null);
  const [activeSemestr, setActiveSemestr] = React.useState(null);
  const listCourses = [1, 2, 3, 4];
  const emojyCourses = ['👶', '👦', '🧔', '👴'];

  return (
    <div className='sidebar'>
      <Link to='/' className='sidebar_title'>
        URFU Courses
      </Link>
      <div className='list_courses'>
        {listCourses.map((numberCourse) => (
          <CourseBlock
            numberCourse={numberCourse}
            emojy={emojyCourses[numberCourse - 1]}
            isActiveCourse={activeCourse === numberCourse}
            setActiveCourse={setActiveCourse}
            numberActiveSemestr={activeSemestr}
            setActiveSemestr={setActiveSemestr}
            key={numberCourse}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
