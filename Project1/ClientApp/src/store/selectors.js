import { searchFilters } from '../const.ts';

export const getSubjects = (state) => state.subjects.subjects;

export const getSemester = (state) => state.subjects.semester;

export const getTrack = (state) => state.track.track;

export const getTeacher = (state) => state.track.teacher;

export const getReviews = (state) => state.track.reviews;

export const getIsLoadingStatus = (state) => {
  const isLoading = state.general.isLoading;
  const values = getValues(isLoading);

  // функция по получению всех значений объекта(в том числе вложенных)
  function getValues(object, array = []) {
    const objValues = Object.values(object);

    for (let elem of objValues) {
      if (typeof elem === 'object') {
        getValues(elem, array);
        continue;
      }
      array.push(elem);
    }

    return array;
  }

  return values.some((value) => value);
};
