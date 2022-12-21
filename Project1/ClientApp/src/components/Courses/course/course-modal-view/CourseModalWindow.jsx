import React from 'react';
import { destinyTracks } from '../../../../const.ts';
import './course_modal_window.scss';
import Tracks from '../../../tracks/Tracks';
import ModalWindow from '../../../modal-window/ModalWindow';

const CourseModalWindow = ({ course, closeModalWindow }) => {
  return (
    <ModalWindow onClose={closeModalWindow}>
      <div className='course_modal_window'>
        <div className='header'>
          <div className='title'>{course.title}</div>
          <img src='img/close.svg' alt='close' onClick={closeModalWindow} />
        </div>
        <div className='values'>
          <div className='assessment'>
            <p>4.7</p>
            Средняя оценка
          </div>
          <div className='count_tracks'>
            <p>4</p>
            Всего треков
          </div>
          <div className='count_reviews'>
            <p>25</p>
            Добавлено отзывов
          </div>
        </div>
        <Tracks tracks={course.tracks} destiny={destinyTracks.ModalWindow} />
      </div>
    </ModalWindow>
  );
};

export default CourseModalWindow;
