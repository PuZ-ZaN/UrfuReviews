import React from 'react';
import { useSelector } from 'react-redux';
import Courses from '../../components/courses/Courses';
import { getAll } from '../../store/selectors';

const Main = () => {
  const allCourses = useSelector((state) => getAll(state));

  return (
    <div className="courses">
      <Courses courses={allCourses} />
    </div>
  );
};

export default Main;
