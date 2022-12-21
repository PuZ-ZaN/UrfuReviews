import React from 'react';
import './style.css';
import Main from './pages/Main/Main';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import axios from 'axios';
import AddReview from './pages/add-review/AddReview';
import Search from './pages/Search/Search';
import Sidebar from './components/Sidebar/Sidebar';
import Course from './pages/course/Course';

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
