import React from 'react';
import { destinyTracks } from '../../../../const.ts';
import './course_row_view.scss';
import Tracks from '../../../tracks/Tracks.jsx';
import { DownOutlined } from '@ant-design/icons';

const CourseRowView = ({ course, selectedCourse, setSelectedCourse }) => {
  const handleClickArrow = () => {
    setSelectedCourse((prevCourse) => (prevCourse?.id === course?.id ? undefined : course));
  };

  return (
    <div
      className={`course_row_view ${selectedCourse == course ? 'show_tracks' : ''}`}
      key={course.id}>
      <div className="course_container">
        <div className="course_row" onClick={handleClickArrow}>
          <p className="title">{course.subjectName}</p>
          <DownOutlined className="arrow-bottom" />
        </div>
        {selectedCourse?.id == course?.id && (
          <Tracks tracks={course.tracks} destiny={destinyTracks.MainPage} />
        )}
      </div>
    </div>
  );
};

export default CourseRowView;
