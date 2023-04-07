import React from 'react';
import './courses.scss';
import CourseModalWindow from './course/course-modal-view/CourseModalWindow';
import CourseRowView from './course/course-row-view/CourseRowView';
import CourseColumnView from './course/course-column-view/CourseColumnView';
import { countAndGetCourseValues } from './../usefulMethods/usefulMethods';
import { Grid } from '@mui/material';

export default function Courses({ courses }) {
  const [isRowView, setIsRowView] = React.useState(true);
  const [selectedCourse, setSelectedCourse] = React.useState();
  const [courseValues, setCourseValues] = React.useState(null);

  React.useEffect(() => {
    if (!selectedCourse) return;
    setCourseValues(countAndGetCourseValues(selectedCourse));
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

      {/* перепутал row и view местами */}

      {isRowView ? (
        <div className="courses_row_view">
          <Grid container spacing={3}>
            {courses.map((course) => (
              <CourseRowView
                course={course}
                setSelectedCourse={handleSelectCourse}
                key={course.id}
              />
            ))}
          </Grid>
        </div>
      ) : (
        <div className="courses_column_view_container">
          <Grid container spacing={{ lg: 5, md: 3.5, sm: 2 }}>
            <Grid item md={8} lg={8}>
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
            </Grid>
            <Grid item sm={0} md={4} lg={4} className="info_about_course_grid">
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
                      Средняя оценка <span>{courseValues ? courseValues.rating : '0'}</span>
                    </div>
                    <div className="count_tracks">
                      Всего треков{' '}
                      <span>{selectedCourse ? selectedCourse.tracks.length : '0'}</span>
                    </div>
                    <div className="count_reviews">
                      Добавлено отзывов{' '}
                      <span>{courseValues ? courseValues.countReviews : '0'}</span>
                    </div>
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      )}
      {isRowView && selectedCourse && (
        <CourseModalWindow course={selectedCourse} closeModalWindow={closeModalWindow} />
      )}
    </>
  );
}
