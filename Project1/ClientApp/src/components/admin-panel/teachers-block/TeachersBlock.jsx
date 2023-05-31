import React from 'react';
import { Dropdown, Modal, message } from 'antd';
import Search from 'antd/es/input/Search';
import { DeleteFilled, EditFilled, FormOutlined, UserAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addTeacher } from '../../../store/api-actions';
import { getSubjects } from '../../../store/selectors';

const TeachersBlock = ({ selectedTrack, setSelectedTrack }) => {
  const dispatch = useDispatch();
  const courses = useSelector(getSubjects);
  const [inputTeacher, setInputTeacher] = React.useState('');

  const addNewTrack = async () => {
    const result = await dispatch(
      addTeacher({
        name: inputTeacher,
        trackId: selectedTrack.id,
        courseId: selectedTrack.subjectId,
      }),
    );

    if (result?.error) {
      error();
    } else {
      success();
      setInputTeacher('');
    }
  };

  const success = () => {
    Modal.success({
      content: 'Данные были успешно добавлены',
      className: 'modal-my-class',
      centered: true,
    });
  };

  const error = () => {
    Modal.error({
      content: 'Возникла ошибка при добавлении данных',
      className: 'modal-my-class',
      centered: true,
    });
  };

  const configTeacher = {
    title: `Преподаватель "${inputTeacher}"`,
    content: (
      <>
        Вы действительно хотите добавить преподавателя с таким ФИО в трек{' '}
        <b>"{selectedTrack?.trackName}"</b>?
      </>
    ),
    centered: true,
    onOk: addNewTrack,
  };

  const configTeacherError = {
    title: <>Какие-то из полей были не заполнены</>,
    content: <>Введите ФИО преподавателя</>,
    centered: true,
  };

  const handleChangeNewTeacher = (e) => {
    setInputTeacher(e.target.value);
  };

  const handleAddNewTrack = () => {
    if (!inputTeacher) {
      Modal.error(configTeacherError);
    } else {
      Modal.confirm(configTeacher);
    }
  };

  React.useEffect(() => {
    if (!selectedTrack || !courses) return;
    const course = courses.find((course) => course.id == selectedTrack.subjectId);
    const updateTrack = course.tracks.find((track) => track.id === selectedTrack.id);
    setSelectedTrack(updateTrack);
  }, [courses]);

  const itemsEdit = [
    {
      label: (
        <>
          <span className="item-dropdown">Переименовать</span>
          <EditFilled />
        </>
      ),
      key: '0',
    },
    {
      label: (
        <>
          <span className="item-dropdown">Удалить</span>
          <DeleteFilled />
        </>
      ),
      key: '1',
    },
  ];

  return (
    <>
      {selectedTrack && (
        <div className="info_about_course">
          <p className="title">
            <span className="title_up">
              Преподаватели на треке:
              <br />
            </span>{' '}
            <span className="track-name">{selectedTrack?.trackName}</span>
          </p>
          <Search
            placeholder="ФИО нового преподавателя"
            allowClear
            onPressEnter={handleAddNewTrack}
            enterButton={
              <div className="enter-button-new" onClick={handleAddNewTrack}>
                <p>Добавить</p> <UserAddOutlined />
              </div>
            }
            value={inputTeacher}
            onChange={handleChangeNewTeacher}
            size="large"
            className="add_new_prepod"
          />
          {selectedTrack.prepods
            .map((prepod) => prepod.prepodName)
            .map((prepodName) => (
              <div className="prepod-block-name">
                <p className="prepod-name">{prepodName}</p>
                <div className="icons-block">
                  <Dropdown menu={{ items: itemsEdit }} placement="bottomRight" trigger={['click']}>
                    <FormOutlined />
                  </Dropdown>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default TeachersBlock;
