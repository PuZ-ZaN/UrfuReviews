import React from 'react';
import { Link } from 'react-router-dom';
import './track.scss';

const Track = ({ track }) => {
  const [style, setStyle] = React.useState({ width: 0 });

  React.useEffect(() => {
    const newStyle = {
      opacity: 1,
      width: `${track.rating * 20}%`,
    };

    setStyle(newStyle);
  }, []);

  return (
    <Link to='/review'>
      <div className='track_for_course'>
        <div className='left'>
          <p className='title'>{track.title}</p>
        </div>
        <div className='right'>
          <div className='bar'>
            <div className='bar_percent' style={style}></div>
          </div>
          <p className='rating'>{track.rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default Track;
