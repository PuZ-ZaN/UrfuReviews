import React from 'react';
import { destinyTracks } from '../../../../const.ts';
import './course.scss';
import Tracks from '../../tracks/Tracks.jsx';
import { DeleteFilled, EditFilled, FormOutlined } from '@ant-design/icons';
import { Dropdown, Modal, Select } from 'antd';
import Search from 'antd/es/transfer/search.js';

const Course = ({
  course,
  selectedCourse,
  setSelectedCourse,
  setSelectedTrack,
  onChangeEditedCourse,
}) => {
  const handleClickArrow = () => {
    setSelectedCourse((prevCourse) => (prevCourse?.id === course?.id ? undefined : course));
  };

  const handleEditCourse = () => {
    onChangeEditedCourse(course);
  };

  const itemsEdit = [
    {
      label: (
        <div onClick={handleEditCourse}>
          <span className="item-dropdown">Редактировать</span>
          <EditFilled />
        </div>
      ),
      key: '0',
    },
    {
      label: (
        <>
          <span className="item-dropdown">Удалить</span>
          <DeleteFilled />
        </>
      ),
      key: '1',
    },
  ];

  return (
    <div
      className={`course_column_view ${selectedCourse == course ? 'show_tracks' : ''}`}
      key={course.id}>
      <div className="course_container">
        <div className="course_column" onClick={handleClickArrow}>
          <p className="title">{course.subjectName}</p>
          <div className="icons">
            <img src="img/arrow-bottom.svg" alt="show tracks" />
            <div className="dropdown" onClick={(e) => e.stopPropagation()}>
              <Dropdown menu={{ items: itemsEdit }} placement="bottomRight" trigger={['click']}>
                <FormOutlined />
              </Dropdown>
            </div>
          </div>
        </div>
        {selectedCourse?.id == course?.id && (
          <Tracks tracks={course.tracks} setSelectedTrack={setSelectedTrack} course={course} />
        )}
      </div>
    </div>
  );
};

export default Course;
