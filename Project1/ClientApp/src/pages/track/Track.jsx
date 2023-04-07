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
import { getSelectedTrack, getAllTracks, getFilteredReviews } from '../../store/selectors';
import { getTrackValues } from '../../store/selectors';
import { setSelectedTrack } from '../../store/tracksSlice';
import { Grid } from '@mui/material';

export default function Track() {
  const dispatch = useDispatch();
  const id = useParams().id || -1;
  const tracks = useSelector((state) => getAllTracks(state));
  const track = useSelector((state) => getSelectedTrack(state));
  const reviews = useSelector((state) => getFilteredReviews(state));
  const trackValues = useSelector((state) => getTrackValues(state));

  React.useEffect(() => {
    if (id !== -1 && tracks.length > 0) {
      dispatch(setSelectedTrack(id));
    }
  }, [id, tracks]);

  if (!track || !trackValues || reviews.length == 0) return <></>;

  return (
    <div className="course_title_container">
      <p className="course_title">{track?.trackName}</p>
      <div className="course_view">
        <div className="circle_big">
          <Circle
            rating={trackValues?.averageValues.rating}
            countReviews={trackValues?.countReviews}
          />
        </div>

        <Rate frequencyStars={trackValues?.countStars} countReviews={trackValues?.countReviews} />
        <Criteria averageValues={trackValues?.averageValues} />
      </div>

      <div className="filters_and_button">
        <Filters teachers={track.prepods} />
        <AddReviewBtn />
      </div>

      <div className="reviews">
        {reviews.map((review, index) => (
          <Review key={review.id} review={review} index={index} />
        ))}
      </div>
    </div>
  );
}
