import React from 'react';
import './course.scss';
import Criteria from '../../components/reviews/criteria/Criteria';
import Review from '../../components/reviews/review/Review';
import Rate from '../../components/reviews/rate/Rate';
import Filters from '../../components/reviews/filters/filters-course-page/FiltersCoursePage';
import AddReviewBtn from '../../components/reviews/add-review-btn/AddReviewBtn';
import Circle from '../../components/reviews/circle-rating/CircleRating';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getActiveTrack } from '../../store/selectors';
import { setActiveTrack } from '../../store/slices';
import { getOriginalSubjects } from './../../store/selectors';
import { getAllReviews, getTrackValues } from '../../components/usefulMethods/usefulMethods';

export default function Course() {
  const dispatch = useDispatch();
  const id = useParams().id || -1;
  const allCourses = useSelector((state) => getOriginalSubjects(state));
  const track = useSelector((state) => getActiveTrack(state));
  const [allReviews, setAllReviews] = React.useState([]);
  const [trackValues, setTrackValues] = React.useState();

  React.useEffect(() => {
    if (id !== -1 && allCourses.length > 0) {
      dispatch(setActiveTrack(id));
    }
  }, [id, allCourses]);

  React.useEffect(() => {
    if (track) {
      setTrackValues(getTrackValues(track));
      setAllReviews(getAllReviews(track));
    }
  }, [track]);

  if (!track || !trackValues) return <></>;

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
        {allReviews.map((review, index) => (
          <Review key={review.id} review={review} index={index} />
        ))}
      </div>
    </div>
  );
}
