import React from 'react';
import './AdminBadReviews.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getLimitReviews, getReviews } from './../../../store/selectors';
import { getBadReviews } from '../../../store/api-actions';
import Review from './../../../components/reviews/review/Review';

const AdminBadReviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(getReviews);
  const limitReviews = useSelector(getLimitReviews);

  React.useEffect(() => {
    dispatch(getBadReviews({ limit: limitReviews }));
  }, []);

  return (
    <div>
      {
        <div className="reviews">
          {reviews.map((review, index) => (
            <Review key={review.id} teacher={'test'} review={review} />
          ))}
        </div>
      }
    </div>
  );
};

export default AdminBadReviews;
