import React from 'react';
import Filter from './filter/Filter';
import { filtersData } from '../../../../const.ts';

const FiltersTrackPage = ({ teachers }) => {
  return (
    <>
      <Filter
        filterData={filtersData.teacher}
        options={teachers.map((teacher) => teacher.prepodName)}
      />
      <Filter filterData={filtersData.filters} options={[]} />
    </>
  );
};

export default FiltersTrackPage;
