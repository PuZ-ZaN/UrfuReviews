import React from 'react';
import { Link } from 'react-router-dom';
import { countAndGetTrackValues } from '../../usefulMethods/usefulMethods';
import './track.scss';

const Track = ({ track }) => {
  const [style, setStyle] = React.useState({ width: 0 });
  const [trackValues, setTrackValues] = React.useState(null);

  React.useEffect(() => {
    if (!track) return;
    setTrackValues(countAndGetTrackValues(track));
  }, []);

  React.useEffect(() => {
    const newStyle = {
      opacity: 1,
      width: `${trackValues ? trackValues.averageValues.rating * 20 : 0}%`,
    };

    setStyle(newStyle);
  }, [trackValues]);

  // FIX: не обновляется рейтинг при поиске

  return (
    <Link to={`/track/${track.id}`}>
      <div className="track_for_course">
        <div className="left">
          <p className="title">{track.trackName}</p>
        </div>
        <div className="right">
          <div className="bar">
            <div className="bar_percent" style={style}></div>
          </div>
          <p className="rating">{trackValues ? trackValues.averageValues.rating : '0'}</p>
        </div>
      </div>
    </Link>
  );
};

export default Track;
