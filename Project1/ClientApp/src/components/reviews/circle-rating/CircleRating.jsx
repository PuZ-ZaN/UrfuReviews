import React from 'react';
import './circle-rating.scss';

export default function Circle({ rating, countReviews }) {
  const [style, setStyle] = React.useState({});

  function countDashOffset(value) {
    const onePercent = 8.15;
    return Math.round((100 - value) * onePercent);
  }

  React.useEffect(() => {
    const valuePercent = Math.round(rating * 20);
    const dashOffsetValue = countDashOffset(valuePercent);
    setStyle({ strokeDashoffset: dashOffsetValue });
  }, [rating, countReviews]);

  return (
    <div className="rating_circle">
      <div className="outer">
        <div className="inner">
          <div className="text">
            <div className="value">{rating}</div>
            <div className="text_rating">Общий рейтинг</div>
            <div className="count_reviews">{countReviews} отзывов</div>
          </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="270px" height="270px">
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stop-color="#56CCF2" />
            <stop offset="100%" stop-color="#2F80ED" />
          </linearGradient>
        </defs>
        <circle cx="135" cy="135" r="130" stroke-linecap="round" style={style} />
      </svg>
    </div>
  );
}
