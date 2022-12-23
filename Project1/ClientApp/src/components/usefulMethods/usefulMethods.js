import React from 'react';
import { getOriginalSubjects } from './../../store/selectors';

export const getTrackValues = (track) => {
  const trackInfo = {
    countReviews: 0,
    countStars: {
      fiveStars: 0,
      fourStars: 0,
      threeStars: 0,
      twoStars: 0,
      oneStars: 0,
    },
    averageValues: {
      rating: 0,
      interest: 0,
      benefit: 0,
      availability: 0,
    },
  };
  const sumValues = { ...trackInfo.averageValues };

  const teachers = track.prepods;

  for (let teacher of teachers) {
    const reviewsOnTeacher = teacher.reviews;
    for (let review of reviewsOnTeacher) {
      switch (review.rating) {
        case 1:
          trackInfo.countStars.oneStars++;
          break;
        case 2:
          trackInfo.countStars.twoStars++;
          break;
        case 3:
          trackInfo.countStars.threeStars++;
          break;
        case 4:
          trackInfo.countStars.fourStars++;
          break;
        case 5:
          trackInfo.countStars.fiveStars++;
          break;
      }
      sumValues.rating += review.rating;
      sumValues.interest += review.interest;
      sumValues.benefit += review.benefit;
      sumValues.availability += review.availability;
    }
    trackInfo.countReviews += reviewsOnTeacher.length;
  }

  trackInfo.averageValues = {
    rating: Number((sumValues.rating / trackInfo.countReviews).toFixed(1)),
    interest: Number((sumValues.interest / trackInfo.countReviews).toFixed(1)),
    benefit: Number((sumValues.benefit / trackInfo.countReviews).toFixed(1)),
    availability: Number((sumValues.availability / trackInfo.countReviews).toFixed(1)),
  };

  return trackInfo;
};

export const getCourseValues = (course) => {
  const courseInfo = {
    rating: 0,
    countTracks: course.tracks.length,
    countReviews: 0,
  };
  const sumValues = { rating: 0 };

  const tracks = course.tracks;
  for (let track of tracks) {
    const trackInfo = getTrackValues(track);
    sumValues.rating += trackInfo.averageValues.rating;
    courseInfo.countReviews += trackInfo.countReviews;
  }

  courseInfo.rating = (sumValues.rating / courseInfo.countTracks).toFixed(1);

  return courseInfo;
};

export const getAllTracks = (courses) => {
  return [].concat.apply(
    [],
    courses.map((subject) => subject.tracks),
  );
};
