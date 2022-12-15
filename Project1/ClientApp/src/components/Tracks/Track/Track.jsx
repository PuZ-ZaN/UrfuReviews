import React from 'react';
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
  );
};

export default Track;
