import { createSlice } from '@reduxjs/toolkit';
import { filtersData } from '../const.ts';
import { countAndGetTrackValues } from './../components/usefulMethods/usefulMethods';
import {
  resetSubjectsState,
  setOriginalSubjects,
  setSelectedSubject,
  setSemester,
} from './subjectsSlice';

const trackSlice = createSlice({
  name: 'tracks',
  initialState: {
    allTracks: [],
    filteredTracks: [],
    selectedTrack: null,
    allReviews: [],
    teachers: [],
    filteredReviews: [],
    trackValues: null,
    teacher: null,
    filteredTrackBy: null,
  },
  reducers: {
    setTracks(state, action) {
      const allTracks = getTracks(action.payload);
      state.allTracks = allTracks;
      state.teachers = getTeachers(allTracks);
    },
    setSelectedTrack(state, action) {
      const trackInArray = state.allTracks.filter((track) => track.id === action.payload);
      const track = trackInArray.length > 0 ? trackInArray[0] : null;

      if (track) {
        state.selectedTrack = track;
        state.trackValues = countAndGetTrackValues(track);
        const allReviews = getAllReviews(track);
        state.allReviews = allReviews;
        state.filteredReviews = allReviews;
        state.teachers = getTeachers([track]);
      }
    },
    setAllReviews(state, action) {
      state.allReviews = action.payload;
      state.filteredReviews = action.payload;
    },
    setTrackValues(state, action) {
      state.trackValues = action.payload;
    },
    setTeacher(state, action) {
      state.teacher = action.payload;
      state.filteredReviews = state.allReviews.filter(
        (review) => review.prepodName === action.payload,
      );
      state.trackValues = countAndGetTrackValues(state.selectedTrack, action.payload);
    },
    setFilteredTrackBy(state, action) {
      state.filteredTrackBy = action.payload;
      const options = filtersData.filters.options;
      if (action.payload == options.rating) {
        state.filteredReviews.sort((first, second) => {
          return second.rating - first.rating;
        });
      } else if (action.payload == options.benefit) {
        state.filteredReviews.sort((first, second) => {
          // to do: benefit property doesn't exist
          return second.benefit - first.benefit;
        });
      } else if (action.payload == options.time) {
        state.filteredReviews.sort((first, second) => {
          return new Date(second.addedDate) - new Date(first.addedDate);
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setOriginalSubjects, (state, action) => {
      const allTracks = getTracks(action.payload);
      state.allTracks = allTracks;
      state.filteredTracks = allTracks;
      state.teachers = getTeachers(allTracks);
    });
    builder.addCase(setSemester, (state, action) => {
      if (action.payload == 'all') {
        state.filteredTracks = state.allTracks;
        state.teachers = getTeachers(state.allTracks);
      } else {
        const filteredTracks = state.allTracks.filter((track) =>
          track.semester.includes(action.payload),
        );
        state.filteredTracks = filteredTracks;
        state.teachers = getTeachers(filteredTracks);
      }
      state.selectedTrack = null;
      state.allReviews = [];
      state.filteredReviews = [];
      state.trackValues = null;
      state.teacher = null;
      state.filteredTrackBy = null;
    });
    builder.addCase(setSelectedSubject, (state, action) => {
      const tracks = action.payload.tracks;
      state.filteredTracks = tracks;
      state.selectedTrack = null;
      state.teachers = getTeachers(tracks);
    });
    builder.addCase(resetSubjectsState, (state, action) => {
      state.filteredTracks = state.allTracks;
      state.selectedTrack = null;
      state.allReviews = [];
      state.teachers = [];
      state.filteredReviews = [];
      state.trackValues = null;
      state.teacher = null;
      state.filteredTrackBy = null;
    });
  },
});

const getTracks = (courses) => {
  if (courses.length == 0) return [];
  return [].concat.apply(
    [],
    courses.map((subject) =>
      subject.tracks.map((track) => ({ ...track, semester: subject.semester })),
    ),
  );
};

const getAllReviews = (track) => {
  if (!track) return [];
  return [].concat.apply(
    [],
    track.prepods.map((teacher) =>
      teacher.reviews.map((review) => ({ ...review, prepodName: teacher.prepodName })),
    ),
  );
};

const getTeachers = (tracks) => {
  if (tracks.length == 0) return [];
  return [].concat.apply(
    [],
    tracks.map((track) => track.prepods),
  );
};

export const {
  setTracks,
  setSelectedTrack,
  setTrackValues,
  setTeacher,
  setFilteredTrackBy,
  setNullSelectedTrack,
} = trackSlice.actions;

export const trackReducer = trackSlice.reducer;
