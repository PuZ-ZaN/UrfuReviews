import React from 'react';
import './course_row_view.scss';
import { gradients, getRandomGradient } from '../../../../gradients/gradients';
import { Grid } from '@mui/material';

const CourseRowView = ({ course, setSelectedCourse }) => {
  const onCourseClick = () => {
    setSelectedCourse(course);
  };

  return (
    <>
      <Grid
        item
        key={course.id}
        onClick={onCourseClick}
        xs={12}
        sm={6}
        md={4}
        lg={4}
        className="course_row_view_grid">
        <div className="course_row_view">
          <div className="course_row_view_background"></div>
          <p className="course_row_view_title">{course.subjectName} 123</p>
        </div>
      </Grid>
    </>
  );
};

export default CourseRowView;
