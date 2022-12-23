import React from 'react';
import './criteria.scss';
import CriteriaProgress from './criteria-progress/CriteriaProgress';

export default function Criteria({ averageValues }) {
  return (
    <div className="criteria_list">
      <div className="criteria">
        <div className="criteria_bar">
          <p className="criteria_title">
            <span>Интерес к предмету</span> <span className="value">{averageValues.interest}</span>
          </p>
          <CriteriaProgress value={averageValues.interest} />
        </div>
        <div className="criteria_bar">
          <p className="criteria_title">
            <span>Польза от предмета</span> <span className="value">{averageValues.benefit}</span>
          </p>
          <CriteriaProgress value={averageValues.benefit} />
        </div>
        <div className="criteria_bar">
          <p className="criteria_title">
            <span>Доступность изложения</span>{' '}
            <span className="value">{averageValues.availability}</span>
          </p>
          <CriteriaProgress value={averageValues.availability} />
        </div>
      </div>
    </div>
  );
}
