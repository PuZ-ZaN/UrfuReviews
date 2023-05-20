import { createSlice, isAllOf, isAnyOf, isFulfilled, isPending } from '@reduxjs/toolkit';
import { fetchReviews, fetchSubjects, fetchTrack } from './api-actions';

const generalSlice = createSlice({
  name: 'subjects',
  initialState: {
    isLoading: {
      subjects: undefined,
      track: {
        track: undefined,
        reviews: undefined,
      },
      search: undefined,
    },
  },
  reducers: {
    setLoadingTrue(state, action) {
      state.isLoading = true;
    },
    setLoadingFalse(state, action) {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrack.pending, (state, action) => {
      state.isLoading.track.track = true;
    });
    builder.addCase(fetchReviews.pending, (state, action) => {
      state.isLoading.track.reviews = true;
    });
    builder.addCase(fetchSubjects.pending, (state, action) => {
      state.isLoading.subjects = true;
    });
    builder.addCase(fetchTrack.fulfilled, (state, action) => {
      state.isLoading.track.track = false;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.isLoading.track.reviews = false;
    });
    builder.addCase(fetchSubjects.fulfilled, (state, action) => {
      state.isLoading.subjects = false;
    });
  },
});

export const { setLoadingTrue, setLoadingFalse } = generalSlice.actions;

export const generalReducer = generalSlice.reducer;
