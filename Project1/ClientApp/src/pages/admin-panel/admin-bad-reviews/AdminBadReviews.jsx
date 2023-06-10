import React from 'react';
import './AdminBadReviews.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getLimitReviews, getReviews } from './../../../store/selectors';
import { deleteReview, getBadReviews } from '../../../store/api-actions';
import Review from './../../../components/reviews/review/Review';
import { CommentOutlined, DeleteOutlined, UserDeleteOutlined } from '@ant-design/icons';
import ReviewAdminPanel from '../../../components/admin-panel/review/ReviewAdminPanel';

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
        <div className="reviews bad-reviews">
          {reviews.map((review, index) => (
            <ReviewAdminPanel review={review} />
          ))}
        </div>
      }
    </div>
  );
};

export default AdminBadReviews;
