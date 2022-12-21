import React from 'react';
import './course_row_view.scss';
import { gradients, getRandomGradient } from '../../../../gradients/gradients';

// обсудить градиенты карточек при отсутствии картинок: все единым градиентом или берется из базы

const getBackgroundStyles = (course) => {
  if (course.bgImg) {
    return `url(${course.bgImg})`;
  }
  return gradients[0];
};

const CourseRowView = ({ course, selectedCourse, setSelectedCourse }) => {
  const onCourseClick = () => {
    setSelectedCourse(course);
  };

  return (
    <>
      <div className='course_row_view' key={course.id} onClick={onCourseClick}>
        <div
          className='course_row_view_background'
          style={{
            background: getBackgroundStyles(course),
            backgroundSize: 'cover',
          }}></div>
        <p className='course_row_view_title'>{course.title}</p>
      </div>
    </>
  );
};

export default CourseRowView;
