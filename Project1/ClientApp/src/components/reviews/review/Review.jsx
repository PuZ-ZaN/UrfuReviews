import React from 'react';
import './review.scss';

const Review = ({ review, index }) => {
  return (
    <div class="review">
      <div class="header_review">
        <div class="header_top">
          <div class="id">Отзыв №{index + 1}</div>
          <div class="criterias">
            <div class="criteria">Интерес к предмету: {review.interest}</div>
            <div class="criteria">Польза от предмета: {review.benefit}</div>
            <div class="criteria">Доступность изложения: {review.availability}</div>
          </div>
        </div>
        <div class="header_bottom">
          <div class="header_bottom_left">
            <div class="teacher">
              <span class="teacher_text">Преподаватель: </span>{' '}
              <span class="teacher_name">{review.prepodName}</span>
            </div>
            <div class="date">
              <span class="date_text">Дата: </span>
              {review.isMoved ? 'перенесен из гугл таблиц' : '04.11.2022'}
            </div>
          </div>
          <div class="header_bottom_right">
            <div class="general_assessment">
              <div class="assessment_text">Общая оценка:</div>
              <div class="stars">
                <div class={`star ${review.rating >= 1 ? 'active' : ''}`}></div>
                <div class={`star ${review.rating >= 2 ? 'active' : ''}`}></div>
                <div class={`star ${review.rating >= 3 ? 'active' : ''}`}></div>
                <div class={`star ${review.rating >= 4 ? 'active' : ''}`}></div>
                <div class={`star ${review.rating >= 5 ? 'active' : ''}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text_review">{review.body}</div>
      <div class="review_ratings_flex">
        <div class="review_ratings">
          <div class="like_button"></div>
          <div class="rating_value">0</div>
          <div class="dislike_button"></div>
        </div>
      </div>
    </div>
  );
};

export default Review;
