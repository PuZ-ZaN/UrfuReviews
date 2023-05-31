import React from 'react';

export const getAvgRatingTrack = (track) => {
  return +(
    track.prepods.reduce((sum, prepod) => (sum += prepod.values.avgRating), 0) /
      getCountPrepodsWithReviews(track) || 0
  ).toFixed(1);
};

export const getCountReviewsTrack = (track) => {
  if (!track) return;

  return track.prepods.reduce((sum, prepod) => (sum += prepod.values.countReviews), 0);
};

const getZeroValuesPrepod = (track) => {
  if (!track) return;

  const values = {};
  for (let value in track.prepods[0].values) {
    values[value] = 0;
  }

  return values;
};

export const getCountPrepodsWithReviews = (track) => {
  return track.prepods.filter((prepod) => prepod.values.countReviews > 0).length;
};

export const getValuesTrack = (track) => {
  if (!track) return;

  const values = getZeroValuesPrepod(track);

  track.prepods.forEach((prepod) => {
    for (let value in prepod.values) {
      values[value] += prepod.values[value];
    }
  });

  for (let value in values) {
    if (value.includes('avg')) {
      values[value] = (values[value] / getCountPrepodsWithReviews(track) || 0).toFixed(1);
    }
  }

  return values;
};

export const getValuesCourse = (course) => {
  if (!course) return;

  const values = { avgRating: 0, countReviews: 0 };

  course.tracks.forEach((track) => {
    values.avgRating += getAvgRatingTrack(track);
    values.countReviews += getCountReviewsTrack(track);
  });

  const countTracks = course.tracks.filter((track) => getCountReviewsTrack(track) > 0).length;

  console.log(values.avgRating, countTracks);

  values.avgRating = (values.avgRating / countTracks || 0).toFixed(1);

  return values;
};
