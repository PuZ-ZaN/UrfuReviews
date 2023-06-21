import React from 'react';
import './course_column_view.scss';
import { Col } from 'antd';
import { getRandomGradient } from '../../../../gradients/gradients';

const CourseColumnView = ({ course, setSelectedCourse }) => {
  const onCourseClick = () => {
    setSelectedCourse(course);
  };

  return (
    <>
      <Col
        item
        key={course.id}
        onClick={onCourseClick}
        xs={12}
        sm={12}
        md={8}
        lg={6}
        className="course_col_view_grid">
        <div className="course_col_view">
          <div className="img-block">
            {course.picturePath ? (
              <img src={`${course.picturePath}`} alt="" />
            ) : (
              <div className="not-img">{course.subjectName[0]}</div>
            )}
          </div>

          <p className="course_col_view_title">{course.subjectName}</p>
        </div>
      </Col>
    </>
  );
};

export default CourseColumnView;
