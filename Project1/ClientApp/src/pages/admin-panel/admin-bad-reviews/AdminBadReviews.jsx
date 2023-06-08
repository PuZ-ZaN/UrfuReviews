import React from 'react';
import './AdminBadReviews.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getLimitReviews, getReviews } from './../../../store/selectors';
import { getBadReviews } from '../../../store/api-actions';
import Review from './../../../components/reviews/review/Review';
import { CommentOutlined, DeleteOutlined, UserDeleteOutlined } from '@ant-design/icons';

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
            <>
              <div className="review-top-panel">
                <div className="delete">
                  <DeleteOutlined />
                  Удалить комментарий
                </div>
                <div className="get-user-comments">
                  <CommentOutlined />
                  Все отзывы пользователя
                </div>
                <div className="block-user">
                  <UserDeleteOutlined />
                  Заблокировать пользователя
                </div>
              </div>
              <Review key={review.id} teacher={'test'} review={review} />
            </>
          ))}
        </div>
      }
    </div>
  );
};

export default AdminBadReviews;
