import React from 'react';
import { Link } from 'react-router-dom';
import Tracks from '../../components/tracks/Tracks';
import { destinyTracks, searchFilters } from '../../const.ts';
import { courses } from '../../mocks/courses';
import './search.scss';

const Search = () => {
  const [tracks, setTracks] = React.useState([]);
  const [activeFilter, setActiveFilter] = React.useState(searchFilters.Track);

  React.useEffect(() => {
    setTracks(courses[0].tracks);
  }, []);

  const handleTrackFilter = () => {
    setActiveFilter(searchFilters.Track);
  };

  const handleTeacherFilter = () => {
    setActiveFilter(searchFilters.Teacher);
  };

  return (
    <div className="search_page">
      <div className="search_tracks_container">
        <div className="search_title">
          Список всех найденных треков с{' '}
          {activeFilter == searchFilters.Teacher ? 'преподавателем' : 'названием'} “Щадрин” на 5
          семестре:
        </div>
        <div className="tracks_and_filters">
          <Tracks tracks={tracks} destiny={destinyTracks.Search} />
          <div className="tracks_filters">
            <p className="filters_title">Фильтры</p>
            <p className="filters_description">Выполнять поиск по:</p>
            <div className="filters">
              <span
                className={`filter_teacher ${
                  searchFilters.Teacher == activeFilter ? 'active_filter' : ''
                }`}
                onClick={handleTeacherFilter}>
                преподавателю
              </span>
              <span
                className={`filter_track ${
                  searchFilters.Track == activeFilter ? 'active_filter' : ''
                }`}
                onClick={handleTrackFilter}>
                треку
              </span>
            </div>
            <Link to="/" className="reset_filters">
              Сбросить поиск
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
