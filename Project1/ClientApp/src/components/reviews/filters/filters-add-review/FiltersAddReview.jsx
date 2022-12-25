import React from 'react';
import { filtersData } from '../../../../const.ts';
import Filter from '../filters-track-page/filter/Filter';
import './filters_add_review.scss';
import { useSelector } from 'react-redux';
import { getFilteredSubjects, getSelectedTrack, getTracks } from './../../../../store/selectors';

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
    useSelector((state) => getTracks(state)).map((track) => track.trackName),
  );

  const filteredNameTeachers = concatArray(
    useSelector((state) => getSelectedTrack(state))?.prepods.map((prepod) => prepod.prepodName),
  );

  const getSemesterText = () => {
    return Object.values(filtersData.courseSemester.options).find(
      (semester) => Number(semester.split(',')[1][1]) == courseValues.semester,
    );
  };

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
        activeValue={courseValues.course.subjectName}
      />
      <Filter
        filterData={filtersData.track}
        onClick={onChangeTrack}
        options={filteredNameTracks}
        activeValue={courseValues.track.trackName}
      />
      <Filter
        filterData={filtersData.teacher}
        onClick={onChangeTeacher}
        options={filteredNameTeachers}
      />
    </div>
  );
};

export default FiltersAddReview;
