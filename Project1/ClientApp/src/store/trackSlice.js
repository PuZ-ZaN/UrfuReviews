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
  },
  reducers: {
    setTrack(state, action) {
      state.track = action.payload;
    },
    setReviews(state, action) {
      state.reviews = action.payload;
    },
    setSortedReviewsBy(state, action) {
      state.sortedReviewsBy = '';
    },
    setTeacher(state, action) {
      state.teacher = action.payload;
    },
  },
});

export const { setTrack, setReviews, setTeacher } = trackSlice.actions;

export const trackReducer = trackSlice.reducer;
