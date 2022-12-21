import React from 'react';
import './filter.scss';

const Filter = ({ filterData, options }) => {
  const [isShownBody, setIsShownBody] = React.useState(false);
  const [currentTitle, setCurrentTitle] = React.useState(filterData.text);
  const currentOptions = 'options' in filterData ? filterData.options : options;

  const toggleShownBody = () => {
    setIsShownBody((prevValue) => !prevValue);
  };

  const changeCurrentTitle = (newTitle) => {
    setCurrentTitle(newTitle);
    setIsShownBody(false);
  };

  return (
    <div
      className={`select 
      ${filterData.class} 
      ${isShownBody ? 'select_active' : ''}`}>
      <div className='select_header' onClick={toggleShownBody}>
        <div className='select_header_title'>{currentTitle}</div>
        <div className='select_header_icon'></div>
      </div>
      <div className={`select_body ${isShownBody ? 'select_shown_body' : ''}`}>
        {currentOptions.map((option) => (
          <div className='option' onClick={() => changeCurrentTitle(option)}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;