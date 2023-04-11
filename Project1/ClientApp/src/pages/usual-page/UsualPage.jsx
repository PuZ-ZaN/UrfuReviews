import React, { useRef } from 'react';
import Main from '../../pages/main/Main';
import { Route, Routes } from 'react-router-dom';
import Header from '../../components/header/Header';
import AddReview from '../../pages/add-review/AddReview';
import Search from '../../pages/search/Search';
import Sidebar from '../../components/sidebar/Sidebar';
import Track from '../../pages/track/Track';
import { useDispatch } from 'react-redux';
import { fetchOriginalSubjects } from '../../store/api-actions';
import { Col, Row } from 'antd';

const UsualPage = () => {
  const dispatch = useDispatch();
  const [isSidebarShown, setSidebarShown] = React.useState(false);
  const sidebarIconRef = useRef(null);

  React.useEffect(() => {
    dispatch(fetchOriginalSubjects());
  }, []);

  return (
    <Row className="wrapper">
      <Col flex={'240px'} className="sidebar-grid">
        <Sidebar
          isSidebarShown={isSidebarShown}
          setSidebarShown={setSidebarShown}
          sidebarIconRef={sidebarIconRef}
        />
      </Col>
      <Col flex={'auto'}>
        <div className="container">
          <Header
            isSidebarShown={isSidebarShown}
            setSidebarShown={setSidebarShown}
            sidebarIconRef={sidebarIconRef}
          />
          <div className="main_container">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/search" element={<Search />}></Route>
              <Route path="/track/:id" element={<Track />} />
              <Route path="/add_review/" element={<AddReview />} />
            </Routes>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default UsualPage;
