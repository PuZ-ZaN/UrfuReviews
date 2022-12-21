import React from 'react';
import Filter from './filter/Filter';
import { filtersData } from '../../../../const.ts';

const Filters = () => {
  const teachers = [
    'Щадрин Денис Борисович',
    'Белоусова Вероника Игоревна',
    'Иванов Александр Олегович',
  ];

  return (
    <>
      <Filter filterData={filtersData.Teacher} options={teachers} />
      <Filter filterData={filtersData.Filters} options={[]} />
    </>
  );
};

export default Filters;
