import { createSlice } from '@reduxjs/toolkit';

const originalDataBaseSlice = createSlice({
  name: 'originalDataBase',
  initialState: {
    allDataBase: [],
    subjects: [],
    tracks: [],
    teachers: [],
    reviews: [],
  },
  reducers: {
    setAllDataBase(state, action) {
      state.allDataBase = action.payload;
    },
    setOriginalSubjects(state, action) {
      state.subjects = action.payload;
    },
    setOriginalTracks(state, action) {
      state.tracks = action.payload;
    },
    setOriginalTeachers(state, action) {
      state.teachers = action.payload;
    },
    setOriginalReviews(state, action) {
      state.reviews = action.payload;
    },
  },
});

const activeDataSlice = createSlice({
  name: 'activeData',
  initialState: {
    subject: {},
    tracks: [],
    teachers: [],
    reviews: [],
    countTracks: 0,
    ratingTrackAverage: 0,
    interestTrackAverage: 0,
    benefitTrackAverage: 0,
    availabilityTrackAverage: 0,
  },
  reducers: {
    setActiveSubject(state, action) {
      state.subject = action.payload;
    },
    setActiveTracks(state, action) {
      state.tracks = action.payload;
      state.countTracks = action.payload.length;
    },
    setActiveTeachers(state, action) {
      state.teachers = action.payload;
    },
    setActiveReviews(state, action) {
      state.reviews = action.payload;
    },
  },
});

export const {
  setAllDataBase,
  setOriginalSubjects,
  setOriginalTracks,
  setOriginalTeachers,
  setOriginalReviews,
  setAll,
} = originalDataBaseSlice.actions;
export const { setActiveSubject, setActiveTracks, setActiveTeachers, setActiveReviews } =
  activeDataSlice.actions;

export const originalDataBaseReducer = originalDataBaseSlice.reducer;
export const activeDataReducer = activeDataSlice.reducer;
