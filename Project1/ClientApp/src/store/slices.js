import { createSlice } from '@reduxjs/toolkit';
import { searchFilters } from '../const.ts';
import { getAllTracks } from './../components/usefulMethods/usefulMethods';

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    originalSubjects: [],
    filteredSubjects: [],
    activeTrack: null,
    semester: 'all',
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
      if (action.payload == 'all') {
        state.filteredSubjects = state.originalSubjects;
      } else {
        state.filteredSubjects = state.originalSubjects.filter((subject) =>
          subject.semester.includes(action.payload),
        );
      }
    },
    setTextSearch(state, action) {
      state.textSearch = action.payload;
    },
    setFilteredBy(state, action) {
      state.filteredBy = action.payload;
    },
    setSemester(state, action) {
      state.semester = action.payload;
    },
    setActiveTrack(state, action) {
      const allTracks = getAllTracks(state.originalSubjects);
      const trackInArray = allTracks.filter((track) => track.id === action.payload);
      state.activeTrack = trackInArray.length > 0 ? trackInArray[0] : null;
    },
    resetSearch(state) {
      state.semester = 'all';
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
  setSemester,
  setActiveTrack,
} = subjectsSlice.actions;
export const subjectsReducer = subjectsSlice.reducer;
