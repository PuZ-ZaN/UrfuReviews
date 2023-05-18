import { createSlice } from '@reduxjs/toolkit';

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    subjects: [],
    semester: 'all',
  },
  reducers: {
    setSubjects(state, action) {
      state.subjects = action.payload;
    },
    setSemester(state, action) {
      state.semester = action.payload;
    },
    resetSubjectsState(state, action) {
      state.semester = 'all';
    },
  },
});

export const { setSubjects, setSemester, resetSubjectsState } = subjectsSlice.actions;

export const subjectsReducer = subjectsSlice.reducer;
