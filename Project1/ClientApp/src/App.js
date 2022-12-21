import React from 'react';
import './style.css';
import Sidebar from './components/sidebar/Sidebar';
import Main from './pages/main/Main';
import { Route, Routes } from 'react-router-dom';
import Search from './pages/search/Search';
import Header from './components/header/Header';
import axios from 'axios';
import Course from './pages/course/Course';
import AddReview from './pages/add-review/AddReview';

function App() {
  React.useEffect(() => {
    axios.get('/api/Subjects').then(({ data }) => {
      console.log(data);
    });
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
