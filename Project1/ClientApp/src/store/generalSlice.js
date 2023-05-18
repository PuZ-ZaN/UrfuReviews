import { createSlice, isAllOf, isAnyOf } from '@reduxjs/toolkit';
import { fetchReviews, fetchSubjects, fetchTrack } from './api-actions';

const generalSlice = createSlice({
  name: 'subjects',
  initialState: {
    isLoading: false,
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
    builder.addCase(fetchSubjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(fetchReviews.pending, fetchTrack.pending), (state, action) => ({
      ...state,
      isLoading: true,
    }));
    builder.addMatcher(isAllOf(fetchReviews.fulfilled, fetchTrack.fulfilled), (state, action) => ({
      ...state,
      isLoading: false,
    }));
  },
});

export const { setLoadingTrue, setLoadingFalse } = generalSlice.actions;

export const generalReducer = generalSlice.reducer;
