import React from 'react';
import { Link } from 'react-router-dom';
import './track.scss';

const Track = ({ track }) => {
  const [style, setStyle] = React.useState({ width: 0 });
  const [rating, setRating] = React.useState(0);

  console.log(track);

  React.useEffect(() => {
    let reviews = 0;
    let allRating = 0;
    const teachers = track.prepods;
    for (var j = 0; j < teachers.length; j++) {
      const reviewsOnTeacher = teachers[j].reviews;
      for (var k = 0; k < reviewsOnTeacher.length; k++) {
        allRating += reviewsOnTeacher[k].rating;
      }
      reviews += reviewsOnTeacher.length;
    }

    setRating((allRating / reviews).toFixed(1));
  }, []);

  React.useEffect(() => {
    const newStyle = {
      opacity: 1,
      width: `${rating * 20}%`,
    };

    setStyle(newStyle);
  }, [rating]);

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
          <p className="rating">{rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default Track;
