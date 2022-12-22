import React from 'react';
import './courses.scss';
import CourseModalWindow from './course/course-modal-view/CourseModalWindow';
import CourseRowView from './course/course-row-view/CourseRowView';
import CourseColumnView from './course/course-column-view/CourseColumnView';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveReviews, setActiveSubject, setActiveTracks } from '../../store/slices';
import { getAllReviews, getAllTracks } from '../../store/selectors';
import { getActiveTracks } from './../../store/selectors';

export default function Courses({ courses }) {
  const [isRowView, setIsRowView] = React.useState(true);
  const [selectedCourse, setSelectedCourse] = React.useState();
  const dispatch = useDispatch();
  const originalTracks = useSelector((state) => getAllTracks(state));
  const originalReviews = useSelector((state) => getAllReviews(state));
  const activeTracks = useSelector((state) => getActiveTracks(state));

  const [rating, setRating] = React.useState(0);
  const [countReviews, setCountReviews] = React.useState(0);

  React.useEffect(() => {
    if (!selectedCourse) return;
    const tracks = selectedCourse.tracks;
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
  }, [selectedCourse]);

  const setRowView = () => {
    setIsRowView(true);
  };

  const setColumnView = () => {
    setIsRowView(false);
  };

  const closeModalWindow = () => {
    setSelectedCourse(null);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  console.log(selectedCourse);

  return (
    <>
      <div className="courses_title_container">
        <p className="courses_title">Список всех найденных курсов:</p>
        <div className="courses_view">
          <img
            src="img/row-view.svg"
            alt="row view"
            className={isRowView && 'active_view'}
            onClick={setRowView}
          />
          <img
            src="img/column-view.svg"
            alt="column view"
            className={!isRowView && 'active_view'}
            onClick={setColumnView}
          />
        </div>
      </div>
      {isRowView ? (
        <div className="courses_row_view">
          {courses.map((course) => (
            <CourseRowView
              course={course}
              selectedCourse={selectedCourse}
              setSelectedCourse={handleSelectCourse}
              key={course.id}
            />
          ))}
        </div>
      ) : (
        <div className="courses_column_view_container">
          <div className="courses_column_view">
            {courses.map((course) => (
              <CourseColumnView
                course={course}
                selectedCourse={selectedCourse}
                setSelectedCourse={handleSelectCourse}
                key={course.id}
              />
            ))}
          </div>
          {selectedCourse && (
            <div className="info_about_course">
              <p className="title">
                <span className="title_up">
                  Информация
                  <br />
                </span>{' '}
                об выбранном курсе
              </p>
              <div className="values">
                <div className="assessment">
                  Средняя оценка <span>{rating}</span>
                </div>
                <div className="count_tracks">
                  Всего треков <span>{selectedCourse ? selectedCourse.tracks.length : '0'}</span>
                </div>
                <div className="count_reviews">
                  Добавлено отзывов <span>{countReviews}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {isRowView && selectedCourse && (
        <CourseModalWindow course={selectedCourse} closeModalWindow={closeModalWindow} />
      )}
    </>
  );
}
