import React from 'react';
import { destinyTracks } from '../../../../const.ts';
import './course_modal_window.scss';
import Tracks from '../../../tracks/Tracks';
import ModalWindow from '../../../modal-window/ModalWindow';
import { getCourseValues } from '../../../usefulMethods/usefulMethods';

const CourseModalWindow = ({ course, closeModalWindow }) => {
  const [courseValues, setCourseValues] = React.useState(null);

  React.useEffect(() => {
    if (!course) return;
    setCourseValues(getCourseValues(course));
  }, [course]);

  return (
    <ModalWindow onClose={closeModalWindow}>
      <div className="course_modal_window">
        <div className="header">
          <div className="title">{course.subjectName}</div>
          <img src="img/close.svg" alt="close" onClick={closeModalWindow} />
        </div>
        <div className="values">
          <div className="assessment">
            <p>{courseValues ? courseValues.rating : '0'}</p>
            Средняя оценка
          </div>
          <div className="count_tracks">
            <p>{courseValues ? courseValues.countTracks : '0'}</p>
            Всего треков
          </div>
          <div className="count_reviews">
            <p>{courseValues ? courseValues.countReviews : '0'}</p>
            Добавлено отзывов
          </div>
        </div>
        <Tracks tracks={course.tracks} destiny={destinyTracks.ModalWindow} />
      </div>
    </ModalWindow>
  );
};

export default CourseModalWindow;
