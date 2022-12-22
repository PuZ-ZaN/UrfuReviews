import React from 'react';
import { filtersData } from '../../../../const.ts';
import Filter from '../filters-course-page_t/filter_t/Filter';
import './filters_add_review.scss';

const FiltersAddReview = () => {
  return (
    <div className="filters_add_review">
      <Filter filterData={filtersData.CourseSemester} />
      <Filter
        filterData={filtersData.Subject}
        options={['lorem ispum ewaje vaweh hawe vawe vw', 'ea', 'eae']}
      />
      <Filter
        filterData={filtersData.Track}
        options={['test long lorem text eawha vawe hwae ', 'ea', 'eae']}
      />
      <Filter filterData={filtersData.Teacher} options={['test', 'ea', 'eae']} />
    </div>
  );
};

export default FiltersAddReview;
