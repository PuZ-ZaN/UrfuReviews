import React from 'react';
import './AddReview.scss';
import { assessmentTitle } from '../../const.ts';
import Assessment from '../../components/reviews/review/assessment/Assessment';
import FiltersAddReview from '../../components/reviews/filters/filters-add-review/FiltersAddReview';
import CircleProgress from '../../components/reviews/circle-progress/CircleProgress';

const AddReview = () => {
  return (
    <div className="add_review_page">
      <p className="add_review_title">Страница добавления отзыва</p>
      <FiltersAddReview />
      <div className="hr_add_review"></div>
      <div className="blocks">
        <div className="left_block">
          <div className="assessments_blocks">
            <Assessment title={assessmentTitle.Interest} />
            <Assessment title={assessmentTitle.Benefit} />
            <Assessment title={assessmentTitle.Clarity} />
            <Assessment title={assessmentTitle.Rate} />
          </div>
          <p className="add_review_comment_text">Ваш комментарий</p>
          <textarea name="" id="" cols="30" rows="10"></textarea>
          <button>
            <span>Добавить отзыв</span>
            <img src="/img/add_review_icon.png" width={24} height={24} alt="add" />
          </button>
        </div>
        <div className="right_block">
          <div className="right_block_info">
            <CircleProgress />
            <div className="right_block_info_title">
              Чтобы отзыв был максимально полезен, заполните все поля:
            </div>
            <div className="right_block_info_criterias">
              <ul>
                <li>Интерес к предмету</li>
                <li className="checked">Польза от предмета</li>
                <li>Доступность изложения</li>
                <li>Общая оценка</li>
                <li className="checked">Отзыв(от 50 до 1000 символов)</li>
              </ul>
            </div>
            <div className="right_block_info_anon_text">Отзыв будет добавлен анонимно.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
