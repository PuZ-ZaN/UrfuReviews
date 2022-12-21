import React from 'react';
import { destinyTracks } from '../../../../const.ts';
import './course_column_view.scss';
import Tracks from './../../../tracks/Tracks';

const CourseColumnView = ({ course, selectedCourse, setSelectedCourse }) => {
  const handleClickArrow = () => {
    setSelectedCourse((prevCourse) =>
      prevCourse === course ? undefined : course
    );
  };

  return (
    <div
      className={`course_column_view ${
        selectedCourse == course ? 'show_tracks' : ''
      }`}
      key={course.id}>
      <div className='course_container'>
        <div className='course_column' onClick={handleClickArrow}>
          <p className='title'>{course.title}</p>
          <img src='img/arrow-bottom.svg' alt='show tracks' />
        </div>
        {selectedCourse == course && (
          <Tracks tracks={course.tracks} destiny={destinyTracks.MainPage} />
        )}
      </div>
    </div>
  );
};

export default CourseColumnView;
