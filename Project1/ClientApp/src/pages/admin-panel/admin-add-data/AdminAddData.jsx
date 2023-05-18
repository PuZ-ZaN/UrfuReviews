import React from 'react';
import { Alert, Col, Dropdown, Modal, Row, message } from 'antd';
import { useSelector } from 'react-redux';
import CourseColumnView from './../../../components/admin-panel/course-column-view/CourseColumnView';
import {
  DeleteFilled,
  EditFilled,
  FolderAddOutlined,
  FormOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import Search from 'antd/es/input/Search';

const AdminAddData = () => {
  const [inputCourse, setInputCourse] = React.useState('');
  const [inputTeacher, setInputTeacher] = React.useState('');
  const [selectedCourse, setSelectedCourse] = React.useState();
  const [selectedTrack, setSelectedTrack] = React.useState();
  // const courses = useSelector((state) => getFilteredSubjects(state));
  const courses = [];

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  const handleChangeNewCourse = (e) => {
    setInputCourse(e.target.value);
  };

  const handleChangeNewTeacher = (e) => {
    setInputTeacher(e.target.value);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Действие было успешно выполнено',
    });
  };

  const configCourse = {
    title: `Курс "${inputCourse}"`,
    content: <>Вы действительно хотите добавить курс с таким названием?</>,
    centered: true,
    onOk: success,
  };

  const configTeacher = {
    title: `Преподаватель "${inputTeacher}"`,
    content: <>Вы действительно хотите добавить преподавателя с таким ФИО?</>,
    centered: true,
    onOk: success,
  };

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
      {contextHolder}
      <Row gutter={{ lg: 35, md: 25, sm: 15 }}>
        <Col sm={24} md={14} lg={14}>
          <div className="courses_column_view">
            <Alert
              message={
                <p className="alert-message-new-data">
                  Правила добавления данных в БД:
                  <br />
                  1) Проверь, что по текущему названию ничего нет.
                  <br />
                  2) Скопируй название из Modeus.
                </p>
              }
              banner
              closable
              className="alert-new-data"
            />
            <Search
              placeholder="Название нового курса"
              allowClear
              enterButton={
                <div
                  className="enter-button-new"
                  onClick={() => {
                    Modal.confirm(configCourse);
                  }}>
                  <p>Добавить</p> <FolderAddOutlined />
                </div>
              }
              value={inputCourse}
              onChange={handleChangeNewCourse}
              size="large"
              className="add_new_course"
            />
            {courses.map((course) => (
              <CourseColumnView
                course={course}
                selectedCourse={selectedCourse}
                setSelectedCourse={handleSelectCourse}
                setSelectedTrack={handleSelectTrack}
                key={course.id}
              />
            ))}
          </div>
        </Col>
        <Col sm={0} md={10} lg={10} className="info_about_course_grid">
          {selectedCourse && selectedTrack && (
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
                enterButton={
                  <div
                    className="enter-button-new"
                    onClick={() => {
                      Modal.confirm(configTeacher);
                    }}>
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
                      <Dropdown
                        menu={{ items: itemsEdit }}
                        placement="bottomRight"
                        trigger={['click']}>
                        <FormOutlined />
                      </Dropdown>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AdminAddData;
