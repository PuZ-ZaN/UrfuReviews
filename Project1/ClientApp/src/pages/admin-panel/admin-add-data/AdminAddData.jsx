import React from 'react';
import './AdminAddData.scss';
import { Alert, Button, Col, Dropdown, Modal, Row, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowDownOutlined,
  DeleteFilled,
  EditFilled,
  FolderAddOutlined,
  FormOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import {
  getCountSubjects,
  getIsLoadingShowMoreCourses,
  getLimitSubjects,
  getSemester,
  getSubjects,
} from '../../../store/selectors';
import { addCourse, fetchCountSubjects, fetchSubjects } from '../../../store/api-actions';
import { addLimitSubjects } from '../../../store/subjectsSlice';
import { filtersData, optionsCourse } from '../../../const.ts';
import Courses from '../../../components/admin-panel/courses/Courses';
import TeachersBlock from '../../../components/admin-panel/teachers-block/TeachersBlock';

const AdminAddData = () => {
  const [selectedTrack, setSelectedTrack] = React.useState();

  console.log(selectedTrack);

  const [messageApi, contextHolder] = message.useMessage();

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

            <Courses setSelectedTrack={setSelectedTrack} />
          </div>
        </Col>
        <Col sm={0} md={10} lg={10} className="info_about_course_grid">
          <TeachersBlock selectedTrack={selectedTrack} />
        </Col>
      </Row>
    </>
  );
};

export default AdminAddData;
