import { createSlice } from '@reduxjs/toolkit';

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    subjects: [],
    count: undefined,
    limit: 8,
    semester: 'all',
  },
  reducers: {
    setSubjects(state, action) {
      state.subjects = action.payload;
    },
    setSemester(state, action) {
      state.semester = action.payload;
      state.limit = 8;
    },
    setCountSubjects(state, action) {
      state.count = action.payload;
    },
    addLimitSubjects(state) {
      state.limit += 8;
    },
    updateSubject(state, action) {
      console.log(action.payload);
      state.subjects = state.subjects.map((subject) => {
        if (subject.id == action.payload.id) return action.payload;
        return subject;
      });
    },
    resetSubjectsState(state, action) {
      state.semester = 'all';
      state.limit = 8;
    },
  },
});

export const {
  setSubjects,
  setSemester,
  setCountSubjects,
  addLimitSubjects,
  updateSubject,
  resetSubjectsState,
} = subjectsSlice.actions;

export const subjectsReducer = subjectsSlice.reducer;
