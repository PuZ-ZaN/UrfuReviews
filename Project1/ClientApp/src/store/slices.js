import { createSlice } from '@reduxjs/toolkit';
import { searchFilters } from '../const.ts';

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    originalSubjects: [],
    filteredSubjects: [],
    semester: 0,
    textSearch: '',
    filteredBy: searchFilters.Track,
  },
  reducers: {
    setOriginalSubjects(state, action) {
      state.originalSubjects = action.payload;
      state.filteredSubjects = action.payload;
    },
    setFilteredSubjectsBySemestr(state, action) {
      state.semester = action.payload;
      state.filteredSubjects = state.originalSubjects.filter((subject) =>
        subject.semester.includes(action.payload),
      );
    },
    setTextSearch(state, action) {
      state.textSearch = action.payload;
    },
    setFilteredBy(state, action) {
      state.filteredBy = action.payload;
    },
    resetSearch(state) {
      state.semester = 0;
      state.textSearch = '';
      state.filteredBy = searchFilters.Track;
    },
  },
});

export const {
  setOriginalSubjects,
  setFilteredSubjectsBySemestr,
  setTextSearch,
  setFilteredBy,
  resetSearch,
} = subjectsSlice.actions;
export const subjectsReducer = subjectsSlice.reducer;
