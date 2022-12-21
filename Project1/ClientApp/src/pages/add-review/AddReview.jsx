import React from 'react';
import FiltersAddReview from './../../components/reviews/filters/filters-add-review/FiltersAddReview';
import './AddReview.scss';
import Assessment from '../../components/reviews/review/assessment/Assessment';
import { assessmentTitle } from '../../const.ts';

const AddReview = () => {
  return (
    <div className='add_review_page'>
      <p className='add_review_title'>Страница добавления отзыва</p>
      <FiltersAddReview />
      <div className='hr_add_review'></div>
      <div className='assessments_blocks'>
        <Assessment title={assessmentTitle.Interest} />
        <Assessment title={assessmentTitle.Benefit} />
        <Assessment title={assessmentTitle.Clarity} />
        <Assessment title={assessmentTitle.Rate} />
      </div>
    </div>
  );
};

export default AddReview;
