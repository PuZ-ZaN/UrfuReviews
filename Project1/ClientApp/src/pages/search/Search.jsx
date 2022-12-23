import React from 'react';
import { Link } from 'react-router-dom';
import Tracks from '../../components/tracks/Tracks';
import { destinyTracks, searchFilters } from '../../const.ts';
import './search.scss';
import {
  getFilteredBy,
  getFilteredSubjects,
  getOriginalSubjects,
  getSearchTracks,
  getSemester,
  getTextSearch,
} from './../../store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setFilteredBy, setSemester, setTextSearch } from '../../store/slices';

const Search = () => {
  const [tracks, setTracks] = React.useState([]);
  const filteredBy = useSelector((state) => getFilteredBy(state));
  const filteredCourses = useSelector((state) => getFilteredSubjects(state));
  const textSearch = useSelector((state) => getTextSearch(state));
  const semester = useSelector((state) => getSemester(state));

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    dispatch(setTextSearch(searchParams.get('text')));
    dispatch(setFilteredBy(searchParams.get('filteredBy')));
    dispatch(setSemester(searchParams.get('semester')));
    setTracks(getSearchTracks(filteredCourses, textSearch, filteredBy));
  }, []);

  React.useEffect(() => {
    setTracks(getSearchTracks(filteredCourses, textSearch, filteredBy));
  }, [filteredCourses, textSearch, filteredBy]);

  React.useEffect(() => {
    setSearchParams({
      text: searchParams.get('text'),
      filteredBy,
      semester,
    });
  }, [semester]);

  const handleTrackFilter = () => {
    setSearchParams({
      text: searchParams.get('text'),
      filteredBy: searchFilters.Track,
      semester,
    });
    dispatch(setFilteredBy(searchFilters.Track));
  };

  const handleTeacherFilter = () => {
    setSearchParams({
      text: searchParams.get('text'),
      filteredBy: searchFilters.Teacher,
      semester,
    });
    dispatch(setFilteredBy(searchFilters.Teacher));
  };

  const resetSearch = () => {
    dispatch(resetSearch());
  };

  return (
    <div className="search_page">
      <div className="search_tracks_container">
        <div className="search_title">
          Список всех найденных треков с{' '}
          {filteredBy == searchFilters.Teacher ? 'преподавателем' : 'названием'} {`"${textSearch}"`}
          {semester != 'all' ? ` на ${semester} семестре` : ''}
        </div>
        <div className="tracks_and_filters">
          <Tracks tracks={tracks} destiny={destinyTracks.Search} />
          <div className="tracks_filters">
            <p className="filters_title">Фильтры</p>
            <p className="filters_description">Выполнять поиск по:</p>
            <div className="filters">
              <span
                className={`filter_teacher ${
                  searchFilters.Teacher == filteredBy ? 'active_filter' : ''
                }`}
                onClick={handleTeacherFilter}>
                преподавателю
              </span>
              <span
                className={`filter_track ${
                  searchFilters.Track == filteredBy ? 'active_filter' : ''
                }`}
                onClick={handleTrackFilter}>
                треку
              </span>
            </div>
            <Link to="/" className="reset_filters" onClick={resetSearch}>
              Сбросить поиск
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
