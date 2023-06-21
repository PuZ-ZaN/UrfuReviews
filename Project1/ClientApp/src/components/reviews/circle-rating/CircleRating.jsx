import React from 'react';
import './circle-rating.scss';

export default function Circle({ valuesTrack }) {
  const [style, setStyle] = React.useState({});
  const percentReccomend = Math.floor(
    ((valuesTrack.count4 + valuesTrack.count5) / valuesTrack.countReviews) * 100,
  );
  const emojisReccomend = ['😊', '🤔', '🥵', '🥴', '🤢'];
  const emojisRating = ['💞', '🔥', '👍', '💩', '☠️'];

  function countDashOffset(value) {
    const onePercent = 3.03;
    return Math.round((100 - value) * onePercent);
  }

  const getElementByValue = (elements, value) => {
    // value from 0 to 5
    if (elements.length < 5) return;

    for (var i = 4.5, j = 0; i >= 0.5; i--, j++) {
      if (value >= i) return elements[j];
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      const valuePercent = Math.round(valuesTrack.avgRating * 20);
      const dashOffsetValue = countDashOffset(valuePercent);
      setStyle({ strokeDashoffset: `${dashOffsetValue}%` });
    }, 10);
  }, [valuesTrack]);

  return (
    <div className="rating_circle_container">
      <div className="rating_circle">
        <div className="outer">
          <div className="inner">
            <div className="text">
              <div className="value">{valuesTrack?.avgRating}</div>
              <div className="text_rating">Общий рейтинг</div>
              <div className="count_reviews">{valuesTrack?.countReviews} отзывов</div>
            </div>
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor="#56CCF2" />
              <stop offset="100%" stopColor="#2F80ED" />
            </linearGradient>
          </defs>
          <circle cx="50%" cy="50%" r="calc(50% - 0.25rem)" strokeLinecap="round" style={style} />
        </svg>
      </div>
      <div className="bottom_circle">
        <div className="percent_recommend">
          <span className="emojy">
            {getElementByValue(emojisReccomend, (percentReccomend / 20).toFixed(1))}{' '}
          </span>
          <span className="bold">{percentReccomend}%</span> рекомендуют
        </div>
        {/* 💞🔥👍💩☠️ */}
        <div>
          <span className="emojy">{getElementByValue(emojisRating, valuesTrack.avgRating)} </span>
          <span className="bold">{valuesTrack.avgRating}</span> - Хороший рейтинг
        </div>
      </div>
    </div>
  );
}
