import React from 'react';
import Filter from './filter/Filter';
import { filtersData } from '../../../../const.ts';
import { useDispatch } from 'react-redux';
import { setFilteredTrackBy, setTeacher } from '../../../../store/tracksSlice';

const FiltersTrackPage = ({ teachers }) => {
  const dispatch = useDispatch();

  const handleClickTeacher = (value) => {
    dispatch(setTeacher(value));
  };

  const handleClickFilter = (value) => {
    dispatch(setFilteredTrackBy(value));
  };

  return (
    <>
      <Filter
        filterData={filtersData.teacher}
        options={teachers.map((teacher) => teacher.prepodName)}
        onClick={handleClickTeacher}
      />
      <Filter filterData={filtersData.filters} onClick={handleClickFilter} />
    </>
  );
};

export default FiltersTrackPage;
