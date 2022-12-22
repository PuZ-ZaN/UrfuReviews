import React from 'react';
import './AddReview.scss';
import { assessmentTitle } from '../../const.ts';
import Assessment from '../../components/reviews/review/assessment/Assessment';
import FiltersAddReview from '../../components/reviews/filters/filters-add-review/FiltersAddReview';
import CircleProgress from '../../components/reviews/circle-progress/CircleProgress';

const AddReview = () => {
  const courseValues = React.useState({
    semester: 0,
    subject: '',
    track: '',
    teacher: '',
  });

  const [fieldsValue, setFieldsValue] = React.useState({
    interest: 0,
    benefit: 0,
    clarity: 0,
    rate: 0,
    text: '',
  });

  const changeInterestField = (value) => {
    setFieldsValue((prev) => ({ ...prev, interest: value }));
  };

  const changeBenefitField = (value) => {
    setFieldsValue((prev) => ({ ...prev, benefit: value }));
  };

  const changeClarityField = (value) => {
    setFieldsValue((prev) => ({ ...prev, clarity: value }));
  };

  const changeRateField = (value) => {
    setFieldsValue((prev) => ({ ...prev, rate: value }));
  };

  const changeTextField = (e) => {
    const text = e.target.value;
    setFieldsValue((prev) => ({ ...prev, text: text }));
  };

  const isNumberFieldCorrect = (value) => {
    return Number.isInteger(value) && value !== 0;
  };

  const isStringFieldCorrect = (value) => {
    return typeof value === 'string' && value.length >= 50 && value.length <= 1000;
  };

  const isFieldCorrect = (value) => {
    return isNumberFieldCorrect(value) || isStringFieldCorrect(value);
  };

  const getCountCheckedFiels = () => {
    return Object.values(fieldsValue).filter((value) => isFieldCorrect(value)).length;
  };

  return (
    <div className="add_review_page">
      <p className="add_review_title">Страница добавления отзыва</p>
      <FiltersAddReview />
      <div className="hr_add_review"></div>
      <div className="blocks">
        <div className="left_block">
          <div className="assessments_blocks">
            <Assessment title={assessmentTitle.Interest} onChangeField={changeInterestField} />
            <Assessment title={assessmentTitle.Benefit} onChangeField={changeBenefitField} />
            <Assessment title={assessmentTitle.Clarity} onChangeField={changeClarityField} />
            <Assessment title={assessmentTitle.Rate} onChangeField={changeRateField} />
          </div>
          <p className="add_review_comment_text">Ваш комментарий</p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => changeTextField(e)}></textarea>
          <button disabled={getCountCheckedFiels() !== 5}>
            <span>Добавить отзыв</span>
            <img src="/img/add_review_icon.png" width={24} height={24} alt="add" />
          </button>
        </div>
        <div className="right_block">
          <div className="right_block_info">
            <CircleProgress countChecked={getCountCheckedFiels()} />
            <div className="right_block_info_title">
              Чтобы отзыв был максимально полезен, заполните все поля:
            </div>
            <div className="right_block_info_criterias">
              <ul>
                <li className={`${isNumberFieldCorrect(fieldsValue.interest) ? 'checked_li' : ''}`}>
                  Интерес к предмету
                </li>
                <li className={`${isNumberFieldCorrect(fieldsValue.benefit) ? 'checked_li' : ''}`}>
                  Польза от предмета
                </li>
                <li className={`${isNumberFieldCorrect(fieldsValue.clarity) ? 'checked_li' : ''}`}>
                  Доступность изложения
                </li>
                <li className={`${isNumberFieldCorrect(fieldsValue.rate) ? 'checked_li' : ''}`}>
                  Общая оценка
                </li>
                <li className={`${isStringFieldCorrect(fieldsValue.text) ? 'checked_li' : ''}`}>
                  Отзыв(от 50 до 1000 символов)
                </li>
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
