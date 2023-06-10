import { createSlice } from '@reduxjs/toolkit';
import { countAndGetTrackValues } from '../components/usefulMethods/usefulMethods.js';
import {
  resetSubjectsState,
  setOriginalSubjects,
  setSelectedSubject,
  setSemester,
} from './subjectsSlice.js';

const trackSlice = createSlice({
  name: 'track',
  initialState: {
    track: undefined,
    teacher: undefined,
    sortedReviewsBy: undefined,
    reviews: [],
    limit: 8,
  },
  reducers: {
    setTrack(state, action) {
      state.track = action.payload;
    },
    setReviews(state, action) {
      state.reviews = action.payload;
    },
    setSortedReviewsBy(state, action) {
      state.sortedReviewsBy = action.payload;
    },
    setTeacher(state, action) {
      state.teacher = action.payload;
    },
    addLimitReviews(state) {
      state.limit += 8;
    },
    updateReview(state, action) {
      state.reviews = state.reviews.map((review) =>
        review.id === action.payload.id ? action.payload : review,
      );
    },
    resetTrack(state) {
      state.track = undefined;
      state.teacher = undefined;
      state.sortedReviewsBy = undefined;
      state.reviews = [];
      state.limit = 8;
    },
  },
});

export const {
  setTrack,
  setReviews,
  setTeacher,
  addLimitReviews,
  resetTrack,
  updateReview,
  setSortedReviewsBy,
} = trackSlice.actions;

export const trackReducer = trackSlice.reducer;
