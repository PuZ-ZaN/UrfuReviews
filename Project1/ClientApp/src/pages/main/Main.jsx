import React from 'react';
import './Main.scss';
import { useDispatch, useSelector } from 'react-redux';
import Courses from '../../components/courses/Courses';
import {
  getCountReviews,
  getCountSubjects,
  getIsLoadingShowMoreCourses,
  getLimitSubjects,
  getSemester,
  getSubjects,
} from './../../store/selectors';
import { fetchCountSubjects, fetchSubjects } from '../../store/api-actions';
import { Button, Col, Row } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import { addLimitSubjects } from '../../store/subjectsSlice';
import Sidebar from '../../components/sidebar/Sidebar';

const Main = ({ isSidebarShown, setSidebarShown, sidebarIconRef }) => {
  const dispatch = useDispatch();
  const courses = useSelector(getSubjects);
  const countCourses = useSelector(getCountSubjects);
  const isLoadingShowMoreCourses = useSelector(getIsLoadingShowMoreCourses);
  const limit = useSelector(getLimitSubjects);
  const semester = useSelector((state) => getSemester(state));
  const [isColView, setIsColView] = React.useState(true);

  React.useEffect(() => {
    dispatch(fetchSubjects({ limit, semester }));
  }, [limit, semester]);

  React.useEffect(() => {
    dispatch(fetchCountSubjects({ semester }));
  }, [semester]);

  const showMoreCourses = () => {
    dispatch(addLimitSubjects());
  };

  const isShowButtonShowMore = () => countCourses > limit;

  const setColumnView = () => {
    setIsColView(true);
  };

  const setRowView = () => {
    setIsColView(false);
  };

  return (
    <>
      <div className="courses_title_container">
        <p className="courses_title">Список всех найденных курсов:</p>
        <div className="courses_view">
          <img
            src="img/column-view.svg"
            alt="column view"
            className={isColView ? 'active_view' : ''}
            onClick={setColumnView}
          />
          <img
            src="img/row-view.svg"
            alt="row view"
            className={!isColView ? 'active_view' : ''}
            onClick={setRowView}
          />
        </div>
      </div>
      <Row className="row-main">
        <Col flex="240px" className="sidebar-grid">
          <Sidebar
            isSidebarShown={isSidebarShown}
            setSidebarShown={setSidebarShown}
            sidebarIconRef={sidebarIconRef}
          />
        </Col>
        <Col flex="auto">
          <div className="courses">
            <Courses courses={courses} isColView={isColView} />
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
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Main;
