import React from 'react';
import './AddReview.scss';
import { assessmentTitle } from '../../const.ts';
import Assessment from './../../components/Reviews/review/assessment/Assessment';
import FiltersAddReview from './../../components/Reviews/filters/filters-add-review/FiltersAddReview';

const AddReview = () => {
  return (
    <div className="add_review_page">
      <p className="add_review_title">Страница добавления отзыва</p>
      <FiltersAddReview />
      <div className="hr_add_review"></div>
      <div className="assessments_blocks">
        <Assessment title={assessmentTitle.Interest} />
        <Assessment title={assessmentTitle.Benefit} />
        <Assessment title={assessmentTitle.Clarity} />
        <Assessment title={assessmentTitle.Rate} />
      </div>
    </div>
  );
};

export default AddReview;
