import { createSlice } from '@reduxjs/toolkit';

const subjectsSlice = createSlice({
  name: 'subjectsSlice',
  initialState: {
    originalSubjects: [],
    filteredSubjects: [],
    activeSemestr: 0,
  },
  reducers: {
    setOriginalSubjects(state, action) {
      state.originalSubjects = action.payload;
      state.filteredSubjects = action.payload;
    },
    setFilteredSubjectsBySemestr(state, action) {
      state.activeSemestr = action.payload;
      state.filteredSubjects = state.originalSubjects.filter((subject) =>
        subject.semester.includes(action.payload),
      );
    },
  },
});

export const { setOriginalSubjects, setFilteredSubjectsBySemestr } = subjectsSlice.actions;
export const subjectsReducer = subjectsSlice.reducer;
