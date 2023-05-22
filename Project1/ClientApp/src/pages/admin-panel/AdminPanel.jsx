import React from 'react';
import './AdminPanel.scss';
import { Col, Row } from 'antd';
import Sidebar from '../../components/sidebar/Sidebar';
import { fetchSubjects } from '../../store/api-actions';
import { useDispatch, useSelector } from 'react-redux';
import { DislikeOutlined, PlusOutlined } from '@ant-design/icons';
import AdminTab from './admin-tab/AdminTab';
import AdminAddData from './admin-add-data/AdminAddData';
import { Navigate } from 'react-router-dom';
import { getIsAuthUser, getIsLoadingStatus } from '../../store/selectors';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuthUser);
  const isLoading = useSelector(getIsLoadingStatus);

  const tabsInfo = [
    { text: 'Добавление данных', icon: <PlusOutlined />, component: <AdminAddData /> },
    { text: 'Заминусованные комментарии', icon: <DislikeOutlined />, component: <p>hello</p> },
  ];
  const [activeTab, setActiveTab] = React.useState(tabsInfo[0]);

  const handleClickTab = (textTab) => {
    setActiveTab(tabsInfo.find((tab) => tab.text === textTab));
  };

  if (!isLoading && !isAuth) return <Navigate to="/login" />;

  return (
    <Row className="wrapper admin-wrapper">
      <Col flex={'240px'} className="sidebar-grid">
        <Sidebar />
      </Col>
      <Col flex={'auto'}>
        <div className="container">
          <div className="courses_column_view_container">
            <div className="admin-tabs">
              {tabsInfo.map((tab) => (
                <AdminTab
                  isActive={activeTab.text === tab.text}
                  onClick={handleClickTab}
                  text={tab.text}
                  icon={tab.icon}
                />
              ))}
            </div>
            {activeTab?.component}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AdminPanel;
