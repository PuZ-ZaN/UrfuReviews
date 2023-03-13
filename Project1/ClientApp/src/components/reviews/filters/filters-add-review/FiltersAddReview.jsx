import React from 'react';
import { filtersData } from '../../../../const.ts';
import Filter from '../filters-track-page/filter/Filter';
import './filters_add_review.scss';
import { useSelector } from 'react-redux';
import { getFilteredSubjects, getTeachers, getFilteredTracks } from './../../../../store/selectors';

const FiltersAddReview = ({
  onChangeSemester,
  onChangeCourse,
  onChangeTrack,
  onChangeTeacher,
  courseValues,
}) => {
  const concatArray = (someArray) => {
    return [].concat.apply([], someArray);
  };

  const filteredNameCourses = concatArray(
    useSelector((state) => getFilteredSubjects(state)).map((course) => course.subjectName),
  );

  const filteredNameTracks = concatArray(
    useSelector((state) => getFilteredTracks(state)).map((track) => track.trackName),
  );

  const filteredNameTeachers = concatArray(
    useSelector((state) => getTeachers(state)).map((teacher) => teacher.prepodName),
  );

  const getSemesterText = () => {
    return Object.values(filtersData.courseSemester.options).find(
      (semester) => Number(semester.split(',')[1][1]) == courseValues.semester,
    );
  };

  console.log(courseValues);

  return (
    <div className="filters_add_review">
      <Filter
        filterData={filtersData.courseSemester}
        onClick={onChangeSemester}
        activeValue={getSemesterText()}
      />
      <Filter
        filterData={filtersData.subject}
        onClick={onChangeCourse}
        options={filteredNameCourses}
        activeValue={courseValues?.course?.subjectName}
        isBlocked={!Boolean(courseValues?.semester)}
      />
      <Filter
        filterData={filtersData.track}
        onClick={onChangeTrack}
        options={filteredNameTracks}
        activeValue={courseValues?.track?.trackName}
        isBlocked={!Boolean(courseValues?.course)}
      />
      <Filter
        filterData={filtersData.teacher}
        onClick={onChangeTeacher}
        options={filteredNameTeachers}
        activeValue={courseValues?.teacher?.prepodName}
        isBlocked={!Boolean(courseValues?.track)}
      />
    </div>
  );
};

export default FiltersAddReview;
