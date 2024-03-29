import React from 'react';
import { Link } from 'react-router-dom';
import './addReviewBtn.scss';

const AddReviewBtn = ({ trackId }) => {
  return (
    <Link to={`/add_review/${trackId}`} className="add_review_link">
      <div className="add_review_button">
        <div className="add_review_text">Добавить отзыв</div>
        <div className="add_review_icon"></div>
      </div>
    </Link>
  );
};

export default AddReviewBtn;
