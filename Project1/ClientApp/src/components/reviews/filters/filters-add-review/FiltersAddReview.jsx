import React from 'react';
import { filtersData } from '../../../../const.ts';
import Filter from '../filters-track-page/filter/Filter';
import './filters_add_review.scss';
import { useSelector } from 'react-redux';
import { getFilteredSubjects, getSelectedTrack, getTracks } from './../../../../store/selectors';

const FiltersAddReview = ({ onChangeSemester, onChangeCourse, onChangeTrack, onChangeTeacher }) => {
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

  return (
    <div className="filters_add_review">
      <Filter filterData={filtersData.courseSemester} onClick={onChangeSemester} />
      <Filter
        filterData={filtersData.subject}
        onClick={onChangeCourse}
        options={filteredNameCourses}
      />
      <Filter filterData={filtersData.track} onClick={onChangeTrack} options={filteredNameTracks} />
      <Filter
        filterData={filtersData.teacher}
        onClick={onChangeTeacher}
        options={filteredNameTeachers}
      />
    </div>
  );
};

export default FiltersAddReview;
