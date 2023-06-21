import React from 'react';
import './courses.scss';
import CoursesColumnView from './courses-column-view/CoursesColumnView';
import CoursesRowView from './courses-row-view/CoursesRowView';
import CourseModalWindow from './courses-column-view/course-modal-view/CourseModalWindow';

export default function Courses({ courses, isColView }) {
  const [selectedCourse, setSelectedCourse] = React.useState();

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  return (
    <>
      {isColView ? (
        <CoursesColumnView
          courses={courses}
          selectedCourse={selectedCourse}
          handleSelectCourse={handleSelectCourse}
        />
      ) : (
        <CoursesRowView
          courses={courses}
          selectedCourse={selectedCourse}
          handleSelectCourse={handleSelectCourse}
        />
      )}
    </>
  );
}
