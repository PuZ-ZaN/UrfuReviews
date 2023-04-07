import React from 'react';
import './circle-rating.scss';

export default function Circle({ rating, countReviews }) {
  const [style, setStyle] = React.useState({});

  function countDashOffset(value) {
    const onePercent = 3.03;
    return Math.round((100 - value) * onePercent);
  }

  React.useEffect(() => {
    setTimeout(() => {
      const valuePercent = Math.round(rating * 20);
      const dashOffsetValue = countDashOffset(valuePercent);
      setStyle({ strokeDashoffset: `${dashOffsetValue}%` });
    }, 10);
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

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stop-color="#56CCF2" />
            <stop offset="100%" stop-color="#2F80ED" />
          </linearGradient>
        </defs>
        <circle cx="50%" cy="50%" r="calc(50% - 0.25rem)" stroke-linecap="round" style={style} />
      </svg>
    </div>
  );
}
