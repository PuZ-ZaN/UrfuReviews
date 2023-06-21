import React from 'react';
import './Courses.scss';
import Course from './course/Course';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCountSubjects,
  getIsLoadingShowMoreCourses,
  getLimitSubjects,
  getSemester,
  getSubjects,
} from '../../../store/selectors';
import { addLimitSubjects } from '../../../store/subjectsSlice';
import { Button, Modal, Select, message } from 'antd';
import { ArrowDownOutlined, FolderAddOutlined, UploadOutlined } from '@ant-design/icons';
import {
  addCourse,
  fetchCountSubjects,
  fetchSubjects,
  searchCourses,
  updateCourse,
} from '../../../store/api-actions';
import { filtersData, optionsCourse } from '../../../const.ts';
import Search from 'antd/es/input/Search';

const Courses = ({ setSelectedTrack }) => {
  const dispatch = useDispatch();

  const courses = useSelector(getSubjects);
  const isLoadingShowMoreCourses = useSelector(getIsLoadingShowMoreCourses);
  const countCourses = useSelector(getCountSubjects);
  const limit = useSelector(getLimitSubjects);
  const semester = useSelector(getSemester);

  const [selectedCourse, setSelectedCourse] = React.useState();
  const [inputCourse, setInputCourse] = React.useState('');
  const [isSearched, setIsSearched] = React.useState(false);
  const [semesterItems, setSemesterItems] = React.useState([]);
  const [imgCourse, setImgCourse] = React.useState();
  const [editedCourse, setEditedCourse] = React.useState();

  const filePicker = React.useRef(null);

  const handleChangeNewCourse = (e) => {
    setInputCourse(e.target.value);
    setIsSearched(false);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  const showMoreCourses = () => {
    dispatch(addLimitSubjects());
  };

  const isShowButtonShowMore = () => countCourses > limit;

  const success = () => {
    Modal.success({
      content: 'Данные были успешно добавлены',
      className: 'modal-my-class',
      centered: true,
      onOk: () => window.location.reload(),
      onCancel: () => window.location.reload(),
    });
  };

  const error = () => {
    Modal.error({
      content: 'Возникла ошибка при добавлении данных',
      className: 'modal-my-class',
      centered: true,
    });
  };

  const addNewCourse = async () => {
    const semesterFormatted = semesterItems.map((value) => +value[0]);
    const result = await dispatch(
      addCourse({ name: inputCourse, semester: semesterFormatted, img: imgCourse }),
    );
    if (result?.error) {
      error();
    } else {
      success();
    }
  };

  const updateEditedCourse = async () => {
    const semesterFormatted = semesterItems.map((value) => +value[0]);
    const result = await dispatch(
      updateCourse({
        id: editedCourse.id,
        name: inputCourse,
        semester: semesterFormatted,
        img: imgCourse,
      }),
    );
    if (result?.error) {
      error();
    } else {
      success();
    }
  };

  const handleAddNewCourse = () => {
    if (isSearched) {
      if (!semesterItems.length || !inputCourse.length) {
        Modal.error(configCourseError);
      } else {
        Modal.confirm(configCourseAdd);
      }
    } else {
      dispatch(searchCourses({ text: inputCourse }));
      setIsSearched(true);
    }
  };

  const handleUpdateCourse = () => {
    if (!semesterItems.length || !inputCourse.length) {
      Modal.error(configCourseError);
    } else {
      Modal.confirm(configCourseUpdate);
    }
  };

  const configCourseError = {
    title: <>Какие-то из полей были не заполнены</>,
    content: <>{!inputCourse.length ? 'Введи название курса' : 'Выбери семестры курса!'}</>,
    centered: true,
  };

  const configCourseAdd = {
    title: (
      <>
        Курс "{inputCourse}"
        <br />
        {semesterItems.join(', ')}
      </>
    ),
    content: <>Вы действительно хотите добавить курс с таким названием?</>,
    centered: true,
    onOk: addNewCourse,
  };

  const configCourseUpdate = {
    title: (
      <>
        Курс "{inputCourse}"
        <br />
        {semesterItems.join(', ')}
      </>
    ),
    content: <>Вы действительно хотите обновить курс?</>,
    centered: true,
    onOk: updateEditedCourse,
  };

  const handlePickImg = () => {
    filePicker.current.click();
  };

  const changeImgCourse = (e) => {
    setImgCourse(e.target.files[0]);
  };

  const onChangeEditedCourse = (course) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setEditedCourse(course);
    setSemesterItems(course.semester.map((sem) => sem + ' семестр'));
    setInputCourse(course.subjectName);
  };

  React.useEffect(() => {
    dispatch(fetchSubjects({ limit, semester }));
  }, [semester, limit]);

  React.useEffect(() => {
    dispatch(fetchCountSubjects({ semester }));
  }, [semester]);

  return (
    <>
      <div className="semester-search">
        <div className="upload-image-course">
          <Button onClick={handlePickImg} icon={<UploadOutlined />}>
            Загрузить картинку
          </Button>
          {imgCourse?.name || editedCourse?.picturePath || 'По желанию можно загрузить картинку'}
          <input
            type="file"
            className="hidden"
            ref={filePicker}
            onChange={changeImgCourse}
            accept="image/*,.jpg,.png"
          />
        </div>
        <Select
          mode="multiple"
          className="semester"
          placeholder="Семестры нового курса"
          value={semesterItems}
          onChange={setSemesterItems}
          options={optionsCourse.map((option) => ({
            label: `${option.course} курс`,
            options: option.semesters.map((semester) => {
              const value = `${semester} семестр`;
              return { label: value, value };
            }),
          }))}
        />
        <Search
          placeholder="Название нового курса"
          allowClear
          enterButton={
            <div
              className="enter-button-new"
              onClick={editedCourse ? handleUpdateCourse : handleAddNewCourse}>
              <p>{editedCourse ? 'Обновить' : isSearched ? 'Добавить' : 'Проверить'}</p>{' '}
              <FolderAddOutlined />
            </div>
          }
          onPressEnter={editedCourse ? handleUpdateCourse : handleAddNewCourse}
          value={inputCourse}
          onChange={handleChangeNewCourse}
          size="large"
          className="add_new_course"
        />
      </div>

      {isSearched ? (
        <h2>
          {courses.length != 0
            ? `В базе найдены следующие курсы с названием "${inputCourse}"`
            : `В базе не было найдено курсов с названием "${inputCourse}"`}
        </h2>
      ) : null}

      {courses.map((course) => (
        <Course
          course={course}
          selectedCourse={selectedCourse}
          setSelectedCourse={handleSelectCourse}
          setSelectedTrack={handleSelectTrack}
          onChangeEditedCourse={onChangeEditedCourse}
          key={course.id}
        />
      ))}

      {(isShowButtonShowMore() || isLoadingShowMoreCourses) && (
        <div className="pagination">
          <div className="pagination-content">
            <Button
              type="default"
              icon={<ArrowDownOutlined />}
              size="large"
              onClick={showMoreCourses}
              loading={isLoadingShowMoreCourses}>
              Показать больше курсов
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
