import React from 'react';
import './AddReview.scss';
import { assessmentTitle } from '../../const.ts';
import Assessment from '../../components/reviews/review/assessment/Assessment';
import FiltersAddReview from '../../components/reviews/filters/filters-add-review/FiltersAddReview';
import CircleProgress from '../../components/reviews/circle-progress/CircleProgress';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTracks, getOriginalSubjects } from '../../store/selectors';
import { setSelectedTrack, setTracks } from '../../store/tracksSlice';
import { setSemester } from '../../store/subjectsSlice';
import { addReviewAction } from '../../store/api-actions';

const AddReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id || -1;
  const originalSubjects = useSelector((state) => getOriginalSubjects(state));
  const [tracksBySubject, setTracksBySubject] = React.useState([]);

  React.useEffect(() => {
    if (id !== -1 && originalSubjects.length > 0) {
      dispatch(setSelectedTrack(id));
    }
  }, [id, originalSubjects]);

  const [courseValues, setCourseValues] = React.useState({
    semester: null,
    course: '',
    track: '',
    teacher: '',
  });

  const [fieldsValue, setFieldsValue] = React.useState({
    interest: 0,
    benefit: 0,
    availability: 0,
    rating: 0,
    body: '',
    isMoved: false,
  });

  const handleChangeSemester = (value) => {
    const semesterNumber = Number(value.split(',')[1][1]);
    dispatch(setSemester(semesterNumber));
    setCourseValues((prev) => ({ ...prev, semester: semesterNumber }));
  };

  const handleChangeCourse = (value) => {
    const course = originalSubjects.find((subject) => subject.subjectName == value);
    setCourseValues((prev) => ({ ...prev, course: course }));
    dispatch(setTracks([course]));
  };

  const handleChangeTrack = (value) => {
    const track = courseValues.course.tracks.find((track) => track.trackName == value);
    dispatch(setSelectedTrack(track.id));
    setCourseValues((prev) => ({ ...prev, track }));
  };

  const handleChangeTeacher = (value) => {
    const teacher = courseValues.track.prepods.find((teacher) => teacher.prepodName == value);
    setCourseValues((prev) => ({ ...prev, teacher }));
  };

  const changeInterestField = (value) => {
    setFieldsValue((prev) => ({ ...prev, interest: value }));
  };

  const changeBenefitField = (value) => {
    setFieldsValue((prev) => ({ ...prev, benefit: value }));
  };

  const changeClarityField = (value) => {
    setFieldsValue((prev) => ({ ...prev, availability: value }));
  };

  const changeRateField = (value) => {
    setFieldsValue((prev) => ({ ...prev, rating: value }));
  };

  const changeTextField = (e) => {
    const body = e.target.value;
    setFieldsValue((prev) => ({ ...prev, body }));
  };

  const isNumberFieldCorrect = (value) => {
    return Number.isInteger(value) && value !== 0;
  };

  const isStringFieldCorrect = (value) => {
    return typeof value === 'string' && value.length >= 30 && value.length <= 1000;
  };

  const isFieldCorrect = (value) => {
    return isNumberFieldCorrect(value) || isStringFieldCorrect(value);
  };

  const getCountCheckedFiels = () => {
    return Object.values(fieldsValue).filter((value) => isFieldCorrect(value)).length;
  };

  const addReview = () => {
    dispatch(addReviewAction({ ...fieldsValue, prepodId: courseValues.teacher.id }));
    navigate('/');
    window.location.reload();
  };

  if (!originalSubjects || originalSubjects.length == 0) return <></>;

  return (
    <div className="add_review_page">
      <p className="add_review_title">Страница добавления отзыва</p>
      <FiltersAddReview
        onChangeSemester={handleChangeSemester}
        onChangeCourse={handleChangeCourse}
        onChangeTrack={handleChangeTrack}
        onChangeTeacher={handleChangeTeacher}
      />
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
          <button disabled={getCountCheckedFiels() !== 5} onClick={addReview}>
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
                <li
                  className={`${
                    isNumberFieldCorrect(fieldsValue.availability) ? 'checked_li' : ''
                  }`}>
                  Доступность изложения
                </li>
                <li className={`${isNumberFieldCorrect(fieldsValue.rating) ? 'checked_li' : ''}`}>
                  Общая оценка
                </li>
                <li className={`${isStringFieldCorrect(fieldsValue.body) ? 'checked_li' : ''}`}>
                  Отзыв(от 30 до 1000 символов)
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
