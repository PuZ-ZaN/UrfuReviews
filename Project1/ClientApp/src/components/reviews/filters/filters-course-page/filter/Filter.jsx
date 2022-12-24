import React from 'react';
import { filtersData } from '../../../../../const.ts';
import './filter.scss';
import { useDispatch } from 'react-redux';
import { setFilteredTrackBy, setTeacher } from '../../../../../store/tracksSlice';

const Filter = ({ filterData, options }) => {
  const [isShownBody, setIsShownBody] = React.useState(false);
  const [currentTitle, setCurrentTitle] = React.useState(filterData.text);
  const currentOptions = 'options' in filterData ? Object.values(filterData.options) : options;
  const dispatch = useDispatch();

  const toggleShownBody = () => {
    setIsShownBody((prevValue) => !prevValue);
  };

  const changeCurrentTitle = (newTitle) => {
    setCurrentTitle(newTitle);
    setIsShownBody(false);
    if (filtersData.teacher == filterData) dispatch(setTeacher(newTitle));
    if (filtersData.filters == filterData) dispatch(setFilteredTrackBy(newTitle));
  };

  return (
    <div
      className={`select 
      ${filterData.class} 
      ${isShownBody ? 'select_active' : ''}`}>
      <div className="select_header" onClick={toggleShownBody}>
        <div className="select_header_title">{currentTitle}</div>
        <div className="select_header_icon"></div>
      </div>
      <div className={`select_body ${isShownBody ? 'select_shown_body' : ''}`}>
        {currentOptions.map((option) => (
          <div className="option" onClick={() => changeCurrentTitle(option)}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
