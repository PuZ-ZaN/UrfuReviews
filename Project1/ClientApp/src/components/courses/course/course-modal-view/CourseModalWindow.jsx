import React from 'react';
import { destinyTracks } from '../../../../const.ts';
import './course_modal_window.scss';
import Tracks from '../../../tracks/Tracks';
import ModalWindow from '../../../modal-window/ModalWindow';

const CourseModalWindow = ({ course, closeModalWindow }) => {
  const [rating, setRating] = React.useState(0);
  const [countReviews, setCountReviews] = React.useState(0);

  React.useEffect(() => {
    const tracks = course.tracks;
    let reviews = 0;
    let allRating = 0;
    for (var i = 0; i < tracks.length; i++) {
      const teachers = tracks[i].prepods;
      for (var j = 0; j < teachers.length; j++) {
        const reviewsOnTeacher = teachers[j].reviews;
        for (var k = 0; k < reviewsOnTeacher.length; k++) {
          allRating += reviewsOnTeacher[k].rating;
        }
        reviews += reviewsOnTeacher.length;
      }
    }
    setCountReviews(reviews);
    setRating((allRating / reviews).toFixed(1));
  }, [course]);

  const getCountReviews = () => {};

  return (
    <ModalWindow onClose={closeModalWindow}>
      <div className="course_modal_window">
        <div className="header">
          <div className="title">{course.subjectName}</div>
          <img src="img/close.svg" alt="close" onClick={closeModalWindow} />
        </div>
        <div className="values">
          <div className="assessment">
            <p>{rating}</p>
            Средняя оценка
          </div>
          <div className="count_tracks">
            <p>{course.tracks.length}</p>
            Всего треков
          </div>
          <div className="count_reviews">
            <p>{countReviews}</p>
            Добавлено отзывов
          </div>
        </div>
        <Tracks tracks={course.tracks} destiny={destinyTracks.ModalWindow} />
      </div>
    </ModalWindow>
  );
};

export default CourseModalWindow;
