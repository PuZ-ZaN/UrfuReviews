import { createSlice } from '@reduxjs/toolkit';
import { searchFilters } from '../const.ts';
import { setSelectedTrack } from './tracksSlice';

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    originalSubjects: [],
    filteredSubjects: [],
    selectedSubject: null,
    semester: 'all',
    textSearch: '',
    filteredBy: searchFilters.Track,
  },
  reducers: {
    setOriginalSubjects(state, action) {
      state.originalSubjects = action.payload;
      state.filteredSubjects = action.payload;
    },
    setSelectedSubject(state, action) {
      state.selectedSubject = action.payload;
    },
    setTextSearch(state, action) {
      state.textSearch = action.payload;
    },
    setFilteredBy(state, action) {
      state.filteredBy = action.payload;
    },
    setSemester(state, action) {
      state.semester = action.payload;
      if (action.payload == 'all') {
        state.filteredSubjects = state.originalSubjects;
      } else {
        state.filteredSubjects = state.originalSubjects.filter((subject) =>
          subject.semester.includes(action.payload),
        );
      }
    },
    resetSubjectsState(state) {
      state.filteredSubjects = state.originalSubjects;
      state.selectedSubject = null;
      state.semester = 'all';
      state.textSearch = '';
      state.filteredBy = searchFilters.Track;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setSelectedTrack, (state, action) => {
      console.log(action.payload);
      if (!state.selectedSubject) {
        state.selectedSubject = state.filteredSubjects.find(
          (subject) => subject.id == action.payload,
        );
      }
    });
  },
});

export const {
  setOriginalSubjects,
  setTextSearch,
  setFilteredBy,
  setSemester,
  setSelectedSubject,
  resetSubjectsState,
} = subjectsSlice.actions;

export const subjectsReducer = subjectsSlice.reducer;
