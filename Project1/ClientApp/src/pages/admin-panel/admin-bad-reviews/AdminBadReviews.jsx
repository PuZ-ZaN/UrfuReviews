import React from 'react';
import './AdminBadReviews.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getLimitReviews, getReviews } from './../../../store/selectors';
import { deleteReview, getBadReviews } from '../../../store/api-actions';
import Review from './../../../components/reviews/review/Review';
import { CommentOutlined, DeleteOutlined, UserDeleteOutlined } from '@ant-design/icons';
import ReviewAdminPanel from '../../../components/admin-panel/review/ReviewAdminPanel';
import { Button } from 'antd';

const AdminBadReviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(getReviews);
  const limitReviews = useSelector(getLimitReviews);
  const [selectedUserId, setSelectedUserId] = React.useState();

  React.useEffect(() => {
    dispatch(getBadReviews({ limit: limitReviews, userId: selectedUserId }));
  }, [selectedUserId]);

  return (
    <div className="container-bad-reviews">
      {selectedUserId && (
        <div className="selected-user">
          <div>
            <p>
              Показываются комментарии пользователя <b>{reviews[0].user.name}</b>
            </p>
            <Button onClick={() => setSelectedUserId(null)}>Сбросить</Button>
          </div>
          <hr />
        </div>
      )}
      <div className="reviews bad-reviews">
        {reviews.map((review, index) => (
          <ReviewAdminPanel review={review} handleSelectUser={setSelectedUserId} />
        ))}
      </div>
    </div>
  );
};

export default AdminBadReviews;
