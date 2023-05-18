import React from 'react';
import './track.scss';
import Criteria from '../../components/reviews/criteria/Criteria';
import Review from '../../components/reviews/review/Review';
import Rate from '../../components/reviews/rate/Rate';
import Filters from '../../components/reviews/filters/filters-track-page/FiltersTrackPage';
import AddReviewBtn from '../../components/reviews/add-review-btn/AddReviewBtn';
import Circle from '../../components/reviews/circle-rating/CircleRating';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviews, getTeacher, getTrack } from './../../store/selectors';
import { setTrack } from '../../store/trackSlice';
import { fetchReviews, fetchTrack } from '../../store/api-actions';
import { getValuesTrack } from '../../components/usefulMethods/usefulMethods';
import { ConsoleSqlOutlined } from '@ant-design/icons';

export default function Track() {
  const dispatch = useDispatch();
  const id = useParams().id || -1;
  const track = useSelector((state) => getTrack(state));
  const reviews = useSelector((state) => getReviews(state));
  const teacher = useSelector((state) => getTeacher(state));

  const [pageNumber, setPageNumber] = React.useState(1);

  const [valuesTrack, setValuesTrack] = React.useState();

  React.useEffect(() => {
    if (id !== -1) {
      dispatch(fetchTrack({ id }));
    }
  }, [id]);

  React.useEffect(() => {
    if (id !== -1) {
      dispatch(fetchReviews({ trackId: id, pageNumber, teacherId: teacher?.id }));
    }
  }, [id, pageNumber, teacher]);

  React.useEffect(() => {
    setValuesTrack(getValuesTrack(track));
  }, [track]);

  const getNameTeacherReview = (review) => {
    if (!track) return;

    return track.prepods.find((prepod) => prepod.id == review.prepodId)?.prepodName;
  };

  if (!track || reviews.length == 0 || !valuesTrack) return <></>;

  return (
    <>
      <div className="course_title_container">
        <p className="course_title">{track?.trackName}</p>
        <div className="course_view">
          <div className="circle_big">
            <Circle valuesTrack={valuesTrack} />
          </div>

          <Rate valuesTrack={valuesTrack} />
          <Criteria valuesTrack={valuesTrack} />
        </div>

        <div className="filters_and_button">
          <Filters teachers={track?.prepods} setValuesTrack={setValuesTrack} />
          <AddReviewBtn />
        </div>

        <div className="reviews">
          {reviews.map((review, index) => (
            <Review key={review.id} teacher={getNameTeacherReview(review)} review={review} />
          ))}
        </div>
      </div>
    </>
  );
}
