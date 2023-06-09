import React from 'react';
import './review.scss';
import { Avatar, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeRatingReview } from '../../../store/api-actions';
import { LikeOutlined } from '@ant-design/icons';
import { getUserId, getUserName } from '../../../store/selectors';

const Review = ({ review, teacher }) => {
  const dispatch = useDispatch();
  const dateTime = new Date(review.addedDate);
  const userId = useSelector(getUserId);
  const usersRatingReview = review?.likes?.length - review?.disLikes?.length || 0;

  const handleChangeRatingReview = (isLike) => {
    if (userId == review.user?.id) {
      errorReviewBelongsUser();
      return;
    }
    if (isLikedReview() || isDisLikedReview()) {
      errorRated();
      return;
    }

    dispatch(changeRatingReview({ review, isLike }));
  };

  const handleLikeButton = () => handleChangeRatingReview(true);
  const handleDisLikeButton = () => handleChangeRatingReview(false);

  const isLikedReview = () => {
    return review.likes.includes(userId);
  };

  const isDisLikedReview = () => {
    return review.disLikes.includes(userId);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const errorReviewBelongsUser = () => {
    messageApi.open({
      type: 'error',
      content: 'Вы не можете оценивать свой отзыв',
      className: 'modal-my-class',
    });
  };

  const errorRated = () => {
    messageApi.open({
      type: 'error',
      content: 'Вы уже оценили этот отзыв',
      className: 'modal-my-class',
    });
  };

  return (
    <>
      {contextHolder}
      <div className="review">
        <div className="header_review">
          <div className="header_id_date">
            <div className="id">
              <Avatar size="large" className="id-avatar">
                {review.isAnonym || review.isMoved ? 'А' : review.user.name[0].toUpperCase()}
              </Avatar>
              {review.isAnonym || review.isMoved
                ? 'Аноним'
                : review.user.name[0].toUpperCase() + review.user.name.slice(1)}
            </div>
            <div className="date">
              {review.isMoved
                ? 'перенесен из гугл таблиц'
                : `${dateTime?.getDate()}.${dateTime?.getMonth() + 1}.${dateTime?.getFullYear()}`}
            </div>
          </div>
          <div className="header_rates">
            <div className="general_assessment">
              <div className="assessment_text">Общая оценка:</div>
              <div className="stars">
                <div className={`star ${review.rating >= 1 ? 'active' : ''}`}></div>
                <div className={`star ${review.rating >= 2 ? 'active' : ''}`}></div>
                <div className={`star ${review.rating >= 3 ? 'active' : ''}`}></div>
                <div className={`star ${review.rating >= 4 ? 'active' : ''}`}></div>
                <div className={`star ${review.rating >= 5 ? 'active' : ''}`}></div>
              </div>
            </div>
            <div className="criterias">
              <div className="criteria">Интерес к предмету: {review.interest}</div>
              <div className="criteria">Польза от предмета: {review.benefit}</div>
              <div className="criteria">Доступность изложения: {review.availability}</div>
            </div>
          </div>
          <div className="header_teacher">
            <div className="teacher">
              <span className="teacher_text">Преподаватель: </span>{' '}
              <span className="teacher_name">{teacher}</span>
            </div>
          </div>
        </div>
        <div className="text_review">
          {/* <p className="text_review_title">Достоинства</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro est et commodi enim ratione
          neque maxime quo laudantium aut dignissimos, quasi sunt molestiae rem, repudiandae ipsam
          facere tempora reiciendis corporis?
        </p>
        <p className="text_review_title">Недостатки</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim laudantium iure dolor
          ipsam, dolores error quas consectetur quasi rerum doloremque sed aut sapiente ea eius quos
          voluptate placeat harum tempora!
        </p> */}
          <p className="text_review_title">Комментарий</p>
          <p>{review.body}</p>
        </div>
        <div className="review_ratings_flex">
          <div className="review_ratings">
            <div
              className={`like_button ${isLikedReview() ? 'liked' : ''}`}
              onClick={handleLikeButton}>
              <svg viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_216_864)">
                  <path
                    d="M23.7613 10.1736C23.1298 9.63455 22.3391 9.3419 21.5382 9.3419H20.727H17.8056H16.1421V5.445C16.1421 3.80718 15.6646 2.6263 14.7199 1.93318C13.2258 0.834446 11.167 1.46082 11.0797 1.49163C10.823 1.57378 10.6484 1.80995 10.6484 2.07693V6.43591C10.6484 7.8581 9.97071 9.06465 8.63068 10.0248C7.6295 10.7435 6.60778 11.0567 6.49996 11.0927L6.35107 11.1286C6.1303 10.7538 5.72469 10.5022 5.25747 10.5022H1.26816C0.569902 10.5022 0 11.0721 0 11.7704V23.497C0 24.1953 0.569902 24.7652 1.26816 24.7652H5.26774C5.65794 24.7652 6.01221 24.5855 6.24325 24.3082C6.88503 24.9911 7.79379 25.4172 8.77957 25.4172H12.163H12.5122H19.4485C21.8052 25.4172 23.3095 24.185 23.5765 22.0286L24.9576 13.4596C25.1476 12.2273 24.6906 10.9643 23.7613 10.1736ZM5.29855 23.497C5.29855 23.5176 5.28314 23.533 5.26261 23.533H1.26816C1.24762 23.533 1.23222 23.5176 1.23222 23.497V11.7704C1.23222 11.7499 1.24762 11.7345 1.26816 11.7345H5.26774C5.28828 11.7345 5.30368 11.7499 5.30368 11.7704V23.497H5.29855ZM23.7305 13.2645L22.3545 21.8489C22.3545 21.8541 22.3545 21.8643 22.3494 21.8746C22.1594 23.4097 21.1839 24.1902 19.4434 24.1902H12.507H12.1579H8.77443C7.68084 24.1902 6.731 23.3738 6.56157 22.2956C6.55644 22.2597 6.54617 22.2237 6.5359 22.1878V12.3506L6.80288 12.289C6.81315 12.289 6.81828 12.2838 6.82855 12.2838C6.8799 12.2684 8.09671 11.9244 9.3238 11.0516C11.0027 9.86046 11.8858 8.26371 11.8858 6.43591V2.56982C12.4198 2.48254 13.3336 2.43633 13.996 2.92922C14.6018 3.3759 14.9099 4.22305 14.9099 5.445V9.95287C14.9099 10.2917 15.1871 10.569 15.526 10.569H17.8056H20.727H21.5382C22.0465 10.569 22.5548 10.759 22.9604 11.1081C23.5662 11.6266 23.864 12.4533 23.7305 13.2645Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_216_864">
                    <rect width="25" height="25" fill="white" transform="translate(0 0.851562)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className={`rating_value ${usersRatingReview >= 0 ? 'useful' : 'useless'}`}>
              {usersRatingReview}
            </div>
            <div
              className={`dislike_button ${isDisLikedReview() ? 'disliked' : ''}`}
              onClick={handleDisLikeButton}>
              <svg
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_216_867)">
                  <path
                    d="M1.23869 16.5295C1.8702 17.0686 2.66088 17.3612 3.46182 17.3612L4.27303 17.3612L7.19442 17.3612L8.85792 17.3612L8.85792 21.2581C8.85792 22.8959 9.3354 24.0768 10.2801 24.7699C11.7742 25.8687 13.833 25.2423 13.9203 25.2115C14.177 25.1293 14.3516 24.8932 14.3516 24.6262L14.3516 20.2672C14.3516 18.845 15.0293 17.6385 16.3693 16.6784C17.3705 15.9596 18.3922 15.6464 18.5 15.6104L18.6489 15.5745C18.8697 15.9493 19.2753 16.2009 19.7425 16.2009L23.7318 16.2009C24.4301 16.2009 25 15.631 25 14.9327L25 3.2061C25 2.50784 24.4301 1.93794 23.7318 1.93794L19.7323 1.93794C19.3421 1.93794 18.9878 2.11764 18.7568 2.39489C18.115 1.71203 17.2062 1.28589 16.2204 1.28589L12.837 1.28589L12.4878 1.28589L5.55146 1.28589C3.19484 1.28589 1.6905 2.51811 1.42352 4.67449L0.0424091 13.2436C-0.147559 14.4758 0.30939 15.7388 1.23869 16.5295ZM19.7015 3.2061C19.7015 3.18556 19.7169 3.17016 19.7374 3.17016L23.7318 3.17016C23.7524 3.17016 23.7678 3.18556 23.7678 3.2061L23.7678 14.9327C23.7678 14.9533 23.7524 14.9687 23.7318 14.9687L19.7323 14.9687C19.7117 14.9687 19.6963 14.9533 19.6963 14.9327L19.6963 3.2061L19.7015 3.2061ZM1.26949 13.4387L2.64548 4.85419C2.64548 4.84906 2.64548 4.83879 2.65061 4.82852C2.84058 3.29338 3.81608 2.51297 5.55659 2.51297L12.493 2.51297L12.8421 2.51297L16.2256 2.51297C17.3192 2.51297 18.269 3.32932 18.4384 4.40751C18.4436 4.44345 18.4538 4.47939 18.4641 4.51533L18.4641 14.3526L18.1971 14.4142C18.1869 14.4142 18.1817 14.4193 18.1714 14.4193C18.1201 14.4347 16.9033 14.7787 15.6762 15.6515C13.9973 16.8427 13.1142 18.4394 13.1142 20.2672L13.1142 24.1333C12.5802 24.2206 11.6664 24.2668 11.004 23.7739C10.3982 23.3272 10.0901 22.4801 10.0901 21.2581L10.0901 16.7502C10.0901 16.4114 9.81289 16.1341 9.47403 16.1341L7.19442 16.1341L4.27303 16.1341L3.46182 16.1341C2.95353 16.1341 2.44524 15.9442 2.03963 15.595C1.43379 15.0765 1.136 14.2499 1.26949 13.4387Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_216_867">
                    <rect
                      width="25"
                      height="25"
                      fill="white"
                      transform="translate(25 25.8516) rotate(-180)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
