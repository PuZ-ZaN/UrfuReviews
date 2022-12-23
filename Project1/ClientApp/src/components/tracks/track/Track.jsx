import React from 'react';
import { Link } from 'react-router-dom';
import './track.scss';
import { getTrackValues } from './../../usefulMethods/usefulMethods';

const Track = ({ track }) => {
  const [style, setStyle] = React.useState({ width: 0 });
  const [trackValues, setTrackValues] = React.useState(null);

  React.useEffect(() => {
    if (!track) return;
    setTrackValues(getTrackValues(track));
  }, []);

  React.useEffect(() => {
    const newStyle = {
      opacity: 1,
      width: `${trackValues ? trackValues.averageValues.rating * 20 : 0}%`,
    };

    setStyle(newStyle);
  }, [trackValues]);

  return (
    <Link to="/review">
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
