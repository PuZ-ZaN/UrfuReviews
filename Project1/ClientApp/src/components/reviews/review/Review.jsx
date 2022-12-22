import React from 'react';
import './review.scss';

const Review = () => {
  return (
    <div class="review">
      <div class="header_review">
        <div class="header_top">
          <div class="id">Пользователь №234</div>
          <div class="criterias">
            <div class="criteria">Интерес к предмету: 4</div>
            <div class="criteria">Польза от предмета: 3</div>
            <div class="criteria">Доступность изложения: 4</div>
          </div>
        </div>
        <div class="header_bottom">
          <div class="header_bottom_left">
            <div class="teacher">
              <span class="teacher_text">Преподаватель:</span>{' '}
              <span class="teacher_name">Шадрин Денис Борисович</span>
            </div>
            <div class="date">
              <span class="date_text">Дата: </span>04.11.2022
            </div>
          </div>
          <div class="header_bottom_right">
            <div class="general_assessment">
              <div class="assessment_text">Общая оценка:</div>
              <div class="stars">
                <div class="star active"></div>
                <div class="star active"></div>
                <div class="star active"></div>
                <div class="star active"></div>
                <div class="star"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text_review">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </div>
      <div class="review_ratings_flex">
        <div class="review_ratings">
          <div class="like_button"></div>
          <div class="rating_value">+5</div>
          <div class="dislike_button"></div>
        </div>
      </div>
    </div>
  );
};

export default Review;
