import React from 'react';
import './assessment.scss';

const Assessment = ({ title }) => {
  return (
    <div className='assessment_block'>
      <div className='assessment_title'>{title}</div>
      <div className='assessment_stars'>
        <img src='/img/star-gray.svg' alt='star' />
        <img src='/img/star-gray.svg' alt='star' />
        <img src='/img/star-gray.svg' alt='star' />
        <img src='/img/star-gray.svg' alt='star' />
        <img src='/img/star-gray.svg' alt='star' />
      </div>
    </div>
  );
};

export default Assessment;
