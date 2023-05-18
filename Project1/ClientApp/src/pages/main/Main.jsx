import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Courses from '../../components/courses/Courses';
import { getSemester, getSubjects } from './../../store/selectors';
import { fetchSubjects } from '../../store/api-actions';

const Main = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => getSubjects(state));

  const [pageNumber, setPageNumber] = React.useState(1);
  const semester = useSelector((state) => getSemester(state));

  React.useEffect(() => {
    dispatch(fetchSubjects({ pageNumber, semester }));
  }, [pageNumber, semester]);

  return (
    <div className="courses">
      <Courses courses={courses} />
    </div>
  );
};

export default Main;
