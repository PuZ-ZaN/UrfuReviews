import React from 'react';
import './course_row_view.scss';
import { gradients, getRandomGradient } from '../../../../gradients/gradients';
import { Col } from 'antd';

const CourseRowView = ({ course, setSelectedCourse }) => {
  const onCourseClick = () => {
    setSelectedCourse(course);
  };

  return (
    <>
      <Col
        item
        key={course.id}
        onClick={onCourseClick}
        xs={24}
        sm={12}
        md={8}
        lg={8}
        className="course_row_view_grid">
        <div className="course_row_view">
          <div className="course_row_view_background"></div>
          <p className="course_row_view_title">{course.subjectName} 123</p>
        </div>
      </Col>
    </>
  );
};

export default CourseRowView;
