import React from 'react';
import './rate.scss';
import RateProgress from './rate-progress/RateProgress';

export default function Rate() {
  return (
    <div className='rate_list'>
      <div className='rate'>
        <div className='rate_bar'>
          <RateProgress percent='63' countStars={5} />
        </div>
        <div className='rate_bar'>
          <RateProgress percent='18' countStars={4} />
        </div>
        <div className='rate_bar'>
          <RateProgress percent='6' countStars={3} />
        </div>
        <div className='rate_bar'>
          <RateProgress percent='9' countStars={2} />
        </div>
        <div className='rate_bar'>
          <RateProgress percent='4' countStars={1} />
        </div>
      </div>
    </div>
  );
}
