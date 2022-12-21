import React from 'react';
import './courses.scss';
import { courses } from '../../mocks/courses';
import CourseColumnView from './course/course-column-view/CourseColumnView';
import CourseModalWindow from './course/course-modal-view/CourseModalWindow';
import CourseRowView from './course/course-row-view/CourseRowView';

export default function Courses() {
  const [isRowView, setIsRowView] = React.useState(true);
  const [selectedCourse, setSelectedCourse] = React.useState();

  const setRowView = () => {
    setIsRowView(true);
  };

  const setColumnView = () => {
    setIsRowView(false);
  };

  const closeModalWindow = () => {
    setSelectedCourse(null);
  };

  return (
    <>
      <div className='courses_title_container'>
        <p className='courses_title'>Список всех найденных курсов:</p>
        <div className='courses_view'>
          <img
            src='img/row-view.svg'
            alt='row view'
            className={isRowView && 'active_view'}
            onClick={setRowView}
          />
          <img
            src='img/column-view.svg'
            alt='column view'
            className={!isRowView && 'active_view'}
            onClick={setColumnView}
          />
        </div>
      </div>
      {isRowView ? (
        <div className='courses_row_view'>
          {courses.map((course) => (
            <CourseRowView
              course={course}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              key={course.id}
            />
          ))}
        </div>
      ) : (
        <div className='courses_column_view_container'>
          <div className='courses_column_view'>
            {courses.map((course) => (
              <CourseColumnView
                course={course}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                key={course.id}
              />
            ))}
          </div>
          {selectedCourse && (
            <div className='info_about_course'>
              <p className='title'>
                <span className='title_up'>
                  Информация
                  <br />
                </span>{' '}
                об выбранном курсе
              </p>
              <div className='values'>
                <div className='assessment'>
                  Средняя оценка <span>4.7</span>
                </div>
                <div className='count_tracks'>
                  Всего треков <span>4</span>
                </div>
                <div className='count_reviews'>
                  Добавлено отзывов <span>25</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {isRowView && selectedCourse && (
        <CourseModalWindow
          course={selectedCourse}
          closeModalWindow={closeModalWindow}
        />
      )}
    </>
  );
}
