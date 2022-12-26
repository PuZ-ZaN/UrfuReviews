import { searchFilters } from '../const.ts';

export const getOriginalSubjects = (state) => state.subjects.originalSubjects;

export const getFilteredSubjects = (state) => state.subjects.filteredSubjects;

export const getSelectedSubjects = (state) => state.subjects.selectedSubject;

export const getSearchTracks = (allTracks, text, filteredBy) => {
  let searchTracks = [];
  if (filteredBy === searchFilters.Track) {
    searchTracks = allTracks.filter((track) =>
      track?.trackName?.toLowerCase().includes(text?.toLowerCase()),
    );
  } else {
    searchTracks = allTracks.filter((track) => {
      let isContainsTeacher = false;
      for (let prepod of track.prepods) {
        if (prepod?.prepodName?.toLowerCase().includes(text.toLowerCase())) {
          isContainsTeacher = true;
          break;
        }
      }
      return isContainsTeacher;
    });
  }
  return searchTracks;
};

export const getFilteredBy = (state) => state.subjects.filteredBy;

export const getTextSearch = (state) => state.subjects.textSearch;

export const getSemester = (state) => state.subjects.semester;

export const getAllTracks = (state) => state.tracks.allTracks;

export const getFilteredTracks = (state) => state.tracks.filteredTracks;

export const getSelectedTrack = (state) => state.tracks.selectedTrack;

export const getAllReviews = (state) => state.tracks.allReviews;

export const getFilteredReviews = (state) => state.tracks.filteredReviews;

export const getTrackValues = (state) => state.tracks.trackValues;

export const getTeachers = (state) => state.tracks.teachers;
