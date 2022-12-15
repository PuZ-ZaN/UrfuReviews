import React from 'react';
import { destinyTracks } from '../../../../const.ts';
import './modal_window.scss';
import Tracks from './../../../Tracks/Tracks';

const ModalWindow = ({ course, closeModalWindow }) => {
  return (
    <div className='layout'>
      <div className='modal_window'>
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
    </div>
  );
};

export default ModalWindow;
