import React from 'react';
import './rate.scss';
import RateProgress from './rate-progress/RateProgress';

export default function Rate({ frequencyStars, countReviews }) {
  const getPercent = (countStars) => {
    return Math.round((countStars / countReviews) * 100);
  };

  return (
    <div className="rate_list">
      <div className="rate">
        <div className="rate_bar">
          <RateProgress percent={getPercent(frequencyStars.fiveStars)} countStars={5} />
        </div>
        <div className="rate_bar">
          <RateProgress percent={getPercent(frequencyStars.fourStars)} countStars={4} />
        </div>
        <div className="rate_bar">
          <RateProgress percent={getPercent(frequencyStars.threeStars)} countStars={3} />
        </div>
        <div className="rate_bar">
          <RateProgress percent={getPercent(frequencyStars.twoStars)} countStars={2} />
        </div>
        <div className="rate_bar">
          <RateProgress percent={getPercent(frequencyStars.oneStars)} countStars={1} />
        </div>
      </div>
    </div>
  );
}
