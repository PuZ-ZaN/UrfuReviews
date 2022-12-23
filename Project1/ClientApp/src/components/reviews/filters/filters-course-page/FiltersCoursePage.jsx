import React from 'react';
import Filter from './filter/Filter';
import { filtersData } from '../../../../const.ts';

const Filters = ({ teachers }) => {
  return (
    <>
      <Filter
        filterData={filtersData.Teacher}
        options={teachers.map((teacher) => teacher.prepodName)}
      />
      <Filter filterData={filtersData.Filters} options={[]} />
    </>
  );
};

export default Filters;
