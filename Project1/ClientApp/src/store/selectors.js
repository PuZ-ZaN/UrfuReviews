import { searchFilters } from '../const.ts';
import { getAllTracks } from './../components/usefulMethods/usefulMethods';

export const getOriginalSubjects = (state) => state.subjects.originalSubjects;

export const getFilteredSubjects = (state) => state.subjects.filteredSubjects;

export const getSearchTracks = (allSubjects, text, filteredBy) => {
  const allTracks = getAllTracks(allSubjects);
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

export const getActiveTrack = (state) => state.subjects.activeTrack;

export const getFilteredBy = (state) => state.subjects.filteredBy;

export const getTextSearch = (state) => state.subjects.textSearch;

export const getSemester = (state) => state.subjects.semester;
