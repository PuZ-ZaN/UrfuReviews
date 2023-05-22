import { createSlice } from '@reduxjs/toolkit';
import { authLogin, authMe, fetchReviews, fetchSubjects, fetchTrack } from './api-actions';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    isLoading: {
      subjects: undefined,
      track: {
        track: undefined,
        reviews: undefined,
      },
      search: undefined,
      user: true,
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
    // pending
    builder.addCase(fetchTrack.pending, (state) => {
      state.isLoading.track.track = true;
    });
    builder.addCase(fetchReviews.pending, (state) => {
      state.isLoading.track.reviews = true;
    });
    builder.addCase(fetchSubjects.pending, (state) => {
      state.isLoading.subjects = true;
    });
    builder.addCase(authMe.pending, (state) => {
      state.isLoading.user = true;
    });
    //fulfilled
    builder.addCase(fetchTrack.fulfilled, (state) => {
      state.isLoading.track.track = false;
    });
    builder.addCase(fetchReviews.fulfilled, (state) => {
      state.isLoading.track.reviews = false;
    });
    builder.addCase(fetchSubjects.fulfilled, (state) => {
      state.isLoading.subjects = false;
    });
    builder.addCase(authMe.fulfilled, (state) => {
      state.isLoading.user = false;
    });
  },
});

export const { setLoadingTrue, setLoadingFalse } = generalSlice.actions;

export const generalReducer = generalSlice.reducer;
