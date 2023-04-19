import React from 'react';
import './review.scss';
import { Avatar } from 'antd';

const Review = ({ review, index }) => {
  const dateTime = new Date(review.addedDate);

  return (
    <div class="review">
      <div class="header_review">
        <div class="header_id_date">
          <div class="id">
            <Avatar size="large" className="id-avatar">
              A
            </Avatar>
            аноним
          </div>
          <div className="date">
            {review.isMoved
              ? 'перенесен из гугл таблиц'
              : `${dateTime?.getDate()}.${dateTime?.getMonth() + 1}.${dateTime?.getFullYear()}`}
          </div>
        </div>
        <div className="header_rates">
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
          <div class="criterias">
            <div class="criteria">Интерес к предмету: {review.interest}</div>
            <div class="criteria">Польза от предмета: {review.benefit}</div>
            <div class="criteria">Доступность изложения: {review.availability}</div>
          </div>
        </div>
        <div className="header_teacher">
          <div class="teacher">
            <span class="teacher_text">Преподаватель: </span>{' '}
            <span class="teacher_name">{review.prepodName}</span>
          </div>
        </div>
      </div>
      <div class="text_review">
        {/* <p className="text_review_title">Достоинства</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro est et commodi enim ratione
          neque maxime quo laudantium aut dignissimos, quasi sunt molestiae rem, repudiandae ipsam
          facere tempora reiciendis corporis?
        </p>
        <p className="text_review_title">Недостатки</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim laudantium iure dolor
          ipsam, dolores error quas consectetur quasi rerum doloremque sed aut sapiente ea eius quos
          voluptate placeat harum tempora!
        </p> */}
        <p className="text_review_title">Комментарий</p>
        <p>{review.body}</p>
      </div>
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
