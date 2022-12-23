import React from 'react';
import './style.css';
import Main from './pages/main/Main';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import AddReview from './pages/add-review/AddReview';
import Search from './pages/search/Search';
import Sidebar from './components/sidebar/Sidebar';
import Course from './pages/course/Course';
import { useDispatch } from 'react-redux';
import { fetchOriginalSubjects } from './store/api-actions';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchOriginalSubjects());
  }, []);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main_container">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />}></Route>
          <Route path="/review" element={<Course />} />
          <Route path="/add_review" element={<AddReview />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
