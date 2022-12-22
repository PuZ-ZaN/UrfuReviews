import React from 'react';
import './criteria.scss';
import CriteriaProgress from './criteria-progress_t/CriteriaProgress';

export default function Criteria() {
  return (
    <div className="criteria_list">
      <div className="criteria">
        <div className="criteria_bar">
          <p className="criteria_title">
            <span>Интерес к предмету</span> <span className="value">4.9</span>
          </p>
          <CriteriaProgress value={4.9} />
        </div>
        <div className="criteria_bar">
          <p className="criteria_title">
            <span>Польза от предмета</span> <span className="value">4.5</span>
          </p>
          <CriteriaProgress value={4.5} />
        </div>
        <div className="criteria_bar">
          <p className="criteria_title">
            <span>Доступность изложения</span> <span className="value">4.7</span>
          </p>
          <CriteriaProgress value={4.7} />
        </div>
      </div>
    </div>
  );
}
