import React from 'react';
import './course.scss';
import Criteria from '../../components/reviews/criteria/Criteria';
import Review from '../../components/reviews/review/Review';
import Rate from '../../components/reviews/rate/Rate';
import Filters from '../../components/reviews/filters/filters-course-page/FiltersCoursePage';
import AddReviewBtn from '../../components/reviews/add-review-btn/AddReviewBtn';
import Circle from '../../components/reviews/circle/Circle';

export default function Course() {
  return (
    <div className="course_title_container">
      <p className="course_title">Правовая грамотность (Онлайн, НИУ ВШЭ, ОК)</p>
      <div className="course_view">
        <div className="circle_big">
          <Circle rating={4.7} countReviews={11} />
        </div>
        <Rate />
        <Criteria />
      </div>

      <div className="filters_and_button">
        <Filters />
        <AddReviewBtn />
      </div>

      <div className="reviews">
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    </div>
  );
}
