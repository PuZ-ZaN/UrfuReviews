import React from 'react';
import { filtersData } from '../../../../const.ts';
import Filter from '../filters-course-page/filter/Filter';
import './filters_add_review.scss';

const FiltersAddReview = () => {
  return (
    <div className="filters_add_review">
      <Filter filterData={filtersData.courseSemester} />
      <Filter
        filterData={filtersData.subject}
        options={['lorem ispum ewaje vaweh hawe vawe vw', 'ea', 'eae']}
      />
      <Filter
        filterData={filtersData.track}
        options={['test long lorem text eawha vawe hwae ', 'ea', 'eae']}
      />
      <Filter filterData={filtersData.teacher} options={['test', 'ea', 'eae']} />
    </div>
  );
};

export default FiltersAddReview;
