import { searchFilters } from '../const.ts';

export const getSubjects = (state) => state.subjects.subjects;

export const getSemester = (state) => state.subjects.semester;

export const getTrack = (state) => state.track.track;

export const getTeacher = (state) => state.track.teacher;

export const getReviews = (state) => state.track.reviews;

export const getIsLoading = (state) => state.general.isLoading;
