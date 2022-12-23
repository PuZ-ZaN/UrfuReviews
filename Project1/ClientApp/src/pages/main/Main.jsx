import React from 'react';
import { useSelector } from 'react-redux';
import Courses from '../../components/courses/Courses';
import { getFilteredSubjects } from './../../store/selectors';

const Main = () => {
  const filteredCourses = useSelector((state) => getFilteredSubjects(state));

  return (
    <div className="courses">
      <Courses courses={filteredCourses} />
    </div>
  );
};

export default Main;
