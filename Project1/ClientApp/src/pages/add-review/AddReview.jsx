import React from 'react';
import './AddReview.scss';
import { assessmentTitle } from '../../const.ts';
import Assessment from '../../components/reviews/review/assessment/Assessment';
import FiltersAddReview from '../../components/reviews/filters/filters-add-review/FiltersAddReview';
import CircleProgress from '../../components/reviews/circle-progress/CircleProgress';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getOriginalSubjects, getSelectedTrack } from '../../store/selectors';
// import { setSelectedTrack } from '../../store/trackSlice';
// import { setSelectedSubject, setSemester } from '../../store/subjectsSlice';
import { addReviewAction } from '../../store/api-actions';
import { Col, Modal, Row, message } from 'antd';

const AddReview = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const selectedTrack = useSelector((state) => getSelectedTrack(state));
  // const originalSubjects = useSelector((state) => getOriginalSubjects(state));
  // React.useEffect(() => {
  //   if (selectedTrack?.id && originalSubjects.length > 0) {
  //     const subjectByTrack = originalSubjects
  //       ? originalSubjects.find((subject) => {
  //           return subject.tracks.find((track) => track.id == selectedTrack.id);
  //         })
  //       : null;
  //     if (!subjectByTrack) return;
  //     dispatch(setSemester(subjectByTrack.semester[0]));
  //     dispatch(setSelectedSubject(subjectByTrack));
  //     dispatch(setSelectedTrack(selectedTrack.id));
  //     setCourseValues((prev) => ({
  //       ...prev,
  //       semester: subjectByTrack.semester[0],
  //       course: subjectByTrack,
  //       track: subjectByTrack.tracks.find((track) => track.id == selectedTrack.id),
  //     }));
  //   }
  // }, [selectedTrack, originalSubjects]);
  // const [courseValues, setCourseValues] = React.useState({
  //   semester: '',
  //   course: '',
  //   track: '',
  //   teacher: '',
  // });
  // const [fieldsValue, setFieldsValue] = React.useState({
  //   interest: 0,
  //   benefit: 0,
  //   availability: 0,
  //   rating: 0,
  //   body: '',
  //   isMoved: false,
  // });
  // const handleChangeSemester = (value) => {
  //   const semesterNumber = Number(value.split(',')[1][1]);
  //   dispatch(setSemester(semesterNumber));
  //   setCourseValues({ semester: semesterNumber, course: '', track: '', teacher: '' });
  // };
  // const handleChangeCourse = (value) => {
  //   const course = originalSubjects.find((subject) => subject.subjectName == value);
  //   dispatch(setSelectedSubject(course));
  //   setCourseValues((prev) => ({ ...prev, course, track: '', teacher: '' }));
  // };
  // const handleChangeTrack = (value) => {
  //   const track = courseValues.course.tracks.find((track) => track.trackName == value);
  //   dispatch(setSelectedTrack(track.id));
  //   setCourseValues((prev) => ({ ...prev, track, teacher: '' }));
  // };
  // const handleChangeTeacher = (value) => {
  //   const teacher = courseValues.track.prepods.find((teacher) => teacher.prepodName == value);
  //   setCourseValues((prev) => ({ ...prev, teacher }));
  // };
  // const changeInterestField = (value) => {
  //   setFieldsValue((prev) => ({ ...prev, interest: value }));
  // };
  // const changeBenefitField = (value) => {
  //   setFieldsValue((prev) => ({ ...prev, benefit: value }));
  // };
  // const changeClarityField = (value) => {
  //   setFieldsValue((prev) => ({ ...prev, availability: value }));
  // };
  // const changeRateField = (value) => {
  //   setFieldsValue((prev) => ({ ...prev, rating: value }));
  // };
  // const changeTextField = (e) => {
  //   const body = e.target.value;
  //   setFieldsValue((prev) => ({ ...prev, body }));
  // };
  // const isNumberFieldCorrect = (value) => {
  //   return Number.isInteger(value) && value !== 0;
  // };
  // const isStringFieldCorrect = (value) => {
  //   return typeof value === 'string' && value.length >= 30 && value.length <= 1000;
  // };
  // const isFieldCorrect = (value) => {
  //   return isNumberFieldCorrect(value) || isStringFieldCorrect(value);
  // };
  // const getCountCheckedFiels = () => {
  //   return Object.values(fieldsValue).filter((value) => isFieldCorrect(value)).length;
  // };
  // const isCourseValuesValid = () => {
  //   return (
  //     Object.values(courseValues).length ===
  //     Object.values(courseValues).filter((property) => Boolean(property)).length
  //   );
  // };
  // const [_, contextHolder] = message.useMessage();
  // const error = () => {
  //   Modal.error({
  //     content: 'Возникла ошибка при добавлении отзыва. Попробуйте еще раз.',
  //     className: 'modal-my-class',
  //   });
  // };
  // const success = () => {
  //   Modal.success({
  //     content: 'Отзыв был успешно добавлен. Вы будете перенаправлены на страницу с треком.',
  //     className: 'modal-my-class',
  //     onOk: () => navigate(`/track/${selectedTrack.id}`),
  //   });
  // };
  // const addReview = async () => {
  //   const result = await dispatch(
  //     addReviewAction({ ...fieldsValue, prepodId: courseValues.teacher.id }),
  //   );
  //   if (result?.error) {
  //     error();
  //   } else {
  //     success();
  //   }
  // };
  // if (!originalSubjects || originalSubjects.length == 0) return <></>;

  return <></>;

  // return (
  //   <>
  //     {contextHolder}
  //     <div className="add_review_page">
  //       <p className="add_review_title">Страница добавления отзыва</p>
  //       <FiltersAddReview
  //         onChangeSemester={handleChangeSemester}
  //         onChangeCourse={handleChangeCourse}
  //         onChangeTrack={handleChangeTrack}
  //         onChangeTeacher={handleChangeTeacher}
  //         courseValues={courseValues}
  //       />
  //       <div className="hr_add_review"></div>
  //       <Row className="blocks">
  //         <Col lg={16} md={16} xs={24}>
  //           <div className="left_block">
  //             <div className="assessments_blocks">
  //               <Assessment title={assessmentTitle.Interest} onChangeField={changeInterestField} />
  //               <Assessment title={assessmentTitle.Benefit} onChangeField={changeBenefitField} />
  //               <Assessment title={assessmentTitle.Clarity} onChangeField={changeClarityField} />
  //               <Assessment title={assessmentTitle.Rate} onChangeField={changeRateField} />
  //             </div>
  //             <p className="add_review_comment_text">Ваш комментарий</p>
  //             <textarea
  //               name=""
  //               id=""
  //               cols="30"
  //               rows="10"
  //               onChange={(e) => changeTextField(e)}></textarea>
  //             <button
  //               disabled={getCountCheckedFiels() !== 5 || !isCourseValuesValid}
  //               onClick={addReview}>
  //               <span>Добавить отзыв</span>
  //               <img src="/img/add_review_icon.png" width={24} height={24} alt="add" />
  //             </button>
  //           </div>
  //         </Col>
  //         <Col lg="auto" md="auto" sm="auto" xs="auto">
  //           <div className="right_block">
  //             <div className="right_block_info">
  //               <CircleProgress countChecked={getCountCheckedFiels()} />
  //               <div className="right_block_info_title">
  //                 Чтобы отзыв был максимально полезен, заполните все поля:
  //               </div>
  //               <div className="right_block_info_criterias">
  //                 <ul>
  //                   <li
  //                     className={`${
  //                       isNumberFieldCorrect(fieldsValue.interest) ? 'checked_li' : ''
  //                     }`}>
  //                     Интерес к предмету
  //                   </li>
  //                   <li
  //                     className={`${
  //                       isNumberFieldCorrect(fieldsValue.benefit) ? 'checked_li' : ''
  //                     }`}>
  //                     Польза от предмета
  //                   </li>
  //                   <li
  //                     className={`${
  //                       isNumberFieldCorrect(fieldsValue.availability) ? 'checked_li' : ''
  //                     }`}>
  //                     Доступность изложения
  //                   </li>
  //                   <li
  //                     className={`${isNumberFieldCorrect(fieldsValue.rating) ? 'checked_li' : ''}`}>
  //                     Общая оценка
  //                   </li>
  //                   <li className={`${isStringFieldCorrect(fieldsValue.body) ? 'checked_li' : ''}`}>
  //                     Отзыв(от 30 до 1000 символов)
  //                   </li>
  //                 </ul>
  //               </div>
  //               <div className="right_block_info_anon_text">Отзыв будет добавлен анонимно.</div>
  //             </div>
  //           </div>
  //         </Col>
  //       </Row>
  //     </div>
  //   </>
  // );
};

export default AddReview;
