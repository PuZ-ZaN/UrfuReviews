import { createSlice } from '@reduxjs/toolkit';
import { filtersData } from '../const.ts';
import { countAndGetTrackValues } from './../components/usefulMethods/usefulMethods';

const trackSlice = createSlice({
  name: 'tracks',
  initialState: {
    tracks: [],
    selectedTrack: null,
    allReviews: [],
    filteredReviews: [],
    trackValues: null,
    teacher: null,
    filteredTrackBy: null,
  },
  reducers: {
    setTracks(state, action) {
      state.tracks = getAllTracks(action.payload);
    },
    setSelectedTrack(state, action) {
      const trackInArray = state.tracks.filter((track) => track.id === action.payload);
      const track = trackInArray.length > 0 ? trackInArray[0] : null;
      state.selectedTrack = track;
      if (track) {
        state.trackValues = countAndGetTrackValues(track);
        const allReviews = getAllReviews(track);
        state.allReviews = allReviews;
        state.filteredReviews = allReviews;
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
});

const getAllTracks = (courses) => {
  if (courses.length == 0) return [];
  return [].concat.apply(
    [],
    courses.map((subject) => subject.tracks),
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

export const { setTracks, setSelectedTrack, setTrackValues, setTeacher, setFilteredTrackBy } =
  trackSlice.actions;

export const trackReducer = trackSlice.reducer;
