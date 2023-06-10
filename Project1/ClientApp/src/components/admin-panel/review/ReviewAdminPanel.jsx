import './ReviewAdminPanel.scss';
import { CommentOutlined, DeleteOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../../store/api-actions';
import Review from '../../reviews/review/Review';

const ReviewAdminPanel = ({ review }) => {
  const dispatch = useDispatch();

  const handleDeleteReview = async () => {
    const result = await dispatch(deleteReview({ id: review.id }));

    if (result?.error) {
      errorDelete();
    } else {
      successDelete();
    }
  };

  const successDelete = () => {
    Modal.success({
      content: 'Комментарий был успешно удален',
      className: 'modal-my-class',
      centered: true,
      onOk: () => window.location.reload(),
      onCancel: () => window.location.reload(),
    });
  };

  const errorDelete = () => {
    Modal.error({
      content: 'Возникла ошибка при удалении комментария',
      className: 'modal-my-class',
      centered: true,
    });
  };

  const configDelete = {
    title: `Вы действительно хотите удалить комментарий?`,
    content: <>{review.body.substr(0, 30) + '...'}</>,
    centered: true,
    onOk: handleDeleteReview,
  };

  return (
    <>
      <div className="review-top-panel">
        <div className="delete" onClick={() => Modal.confirm(configDelete)}>
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
  );
};

export default ReviewAdminPanel;
