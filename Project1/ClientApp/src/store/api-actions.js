import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCountSubjects, setSubjects, updateSubject } from './subjectsSlice';
import { resetTrack, setReviews, setTrack, updateReview } from './trackSlice';
import { setUser } from './userSlice';
import axios from './../axios';
import { setSearchTracks } from './searchSlice';
import { mocksData } from './../mocks/data.js';

export const addMocksData = createAsyncThunk('add/mocks', async function (_, { rejectWithValue }) {
  try {
    for (let key in mocksData) {
      var data = mocksData[key];
      var route = `add${key.slice(0, -1)}`;

      if (key == 'subjects') {
        data.forEach(async (element) => {
          const formData = new FormData();

          formData.append('subjectName', element.subjectName);
          for (let sem of element.semester) {
            formData.append('semester', sem);
          }
          formData.append('id', element.id);
          formData.append('addedDate', element.addedDate);
          if (element.img) formData.append('picture', element.img);

          await axios.post('/api/AddSubject', formData);
        });
      } else {
        data.forEach(async (element) => {
          await axios.post(`/api/${route}`, element);
        });
      }
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const authRegister = createAsyncThunk(
  'auth/register',
  async function (params, { rejectWithValue }) {
    try {
      const data = await axios.post('/auth/register', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const authLogin = createAsyncThunk(
  'auth/login',
  async function (params, { dispatch, rejectWithValue }) {
    try {
      const { data } = await axios.post('/auth/login', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      localStorage.setItem('token', data.access_token);
      dispatch(setUser(data));
    } catch (error) {
      console.log('authLogin error');
      return rejectWithValue(error);
    }
  },
);

export const authMe = createAsyncThunk('auth/me', async function (_, { dispatch }) {
  try {
    const { data } = await axios.get('/auth/me');
    dispatch(setUser(data));
  } catch (error) {
    console.log('authMe error');
  }
});

export const fetchCountSubjects = createAsyncThunk(
  'subjects/fetchCountSubjects',
  async function ({ semester }, { dispatch }) {
    try {
      let result;
      if (!isNaN(semester)) {
        result = await axios.get('/api/All/count', { params: { semester } });
      } else {
        result = await axios.get('/api/All/count');
      }

      dispatch(setCountSubjects(result.data));
    } catch (error) {
      console.log('fetchCountSubjects error');
    }
  },
);

export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async function ({ limit = 6, semester }, { dispatch }) {
    try {
      let result;
      if (!isNaN(semester)) {
        result = await axios.get('/api/All', { params: { limit, semester } });
      } else {
        result = await axios.get('/api/All', { params: { limit } });
      }

      dispatch(setSubjects(result.data));
    } catch (error) {
      console.log('fetchSubjects error');
    }
  },
);

export const fetchSubjectByTrackId = createAsyncThunk(
  'subjects/fetchSubjectsByTrackId',
  async function ({ trackId }, { dispatch, fulfillWithValue }) {
    try {
      const { data } = await axios.get(`/api/subjectByTrackId/${trackId}`);
      dispatch(setSubjects([data.subject]));
    } catch (error) {
      console.log('fetchSubjectsByTrack error');
    }
  },
);

export const fetchTrack = createAsyncThunk(
  'track/fetchTrack',
  async function ({ id }, { dispatch }) {
    try {
      const { data } = await axios.get(`/api/Tracks/${id}`, {
        params: { isAdvanced: true },
      });
      dispatch(setTrack(data[0]));
    } catch (error) {
      console.log('fetchTrack error');
    }
  },
);

export const fetchReviews = createAsyncThunk(
  'track/fetchReviews',
  async function ({ trackId, limit = 10, teacherId, sortedBy = 'время' }, { dispatch }) {
    try {
      const { data } = await axios.get('/api/Reviews/', {
        params: { trackId, limit, teacherId, sortedBy },
      });
      dispatch(setReviews(data));
    } catch (error) {
      console.log('fetchReviews error');
    }
  },
);

export const searchTracks = createAsyncThunk(
  'search/searchTracks',
  async function ({ text, filteredBy }, { dispatch }) {
    try {
      if (!text) return;

      const { data } = await axios.get('/api/Search/', {
        params: { text, filteredBy },
      });
      dispatch(setSearchTracks(data));
    } catch (error) {
      console.log('searchTracks error');
    }
  },
);

export const addReviewAction = createAsyncThunk(
  'review/addReview',
  async function (review, { rejectWithValue }) {
    try {
      await axios.post('/api/AddReview', review);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const changeRatingReview = createAsyncThunk(
  'review/changeRating',
  async function ({ review, isLike }, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios.post('/api/changeRatingReview', {
        review,
        isLike,
      });
      dispatch(updateReview(data));
    } catch (error) {
      console.log('error');
      return rejectWithValue(error);
    }
  },
);

// admin panel

export const searchCourses = createAsyncThunk(
  'admin/course/searchCourses',
  async function ({ text }, { dispatch, rejectWithValue }) {
    try {
      const result = await axios.get('/api/searchSubjects', {
        params: { text },
      });
      dispatch(setSubjects(result.data));
      dispatch(setCountSubjects(null));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getBadReviews = createAsyncThunk(
  'admin/reviews/getBadReviews',
  async function ({ limit, userId }, { dispatch, rejectWithValue }) {
    try {
      const result = await axios.get('/api/badReviews', {
        params: { limit, userId },
      });
      dispatch(setReviews(result.data));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addCourse = createAsyncThunk(
  'admin/course/addCourse',
  async function ({ name, semester, img }, { rejectWithValue }) {
    try {
      const formData = new FormData();

      formData.append('subjectName', name);
      for (let sem of semester) {
        formData.append('semester', sem);
      }
      if (img) formData.append('picture', img);

      await axios.post('/api/AddSubject', formData);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateCourse = createAsyncThunk(
  'admin/course/updateCourse',
  async function ({ id, name, semester, img }, { rejectWithValue }) {
    try {
      const formData = new FormData();

      formData.append('id', id);
      formData.append('subjectName', name);
      for (let sem of semester) {
        formData.append('semester', sem);
      }
      if (img) formData.append('picture', img);

      await axios.patch('/api/updateSubject', formData);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addTrack = createAsyncThunk(
  'admin/track/addTrack',
  async function ({ name, courseId }, { dispatch, rejectWithValue }) {
    try {
      await axios.post('/api/addTrack', {
        trackName: name,
        subjectId: courseId,
      });
      const { data } = await axios.get('/api/searchSubjects', {
        params: { id: courseId },
      });
      dispatch(updateSubject(data[0]));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addTeacher = createAsyncThunk(
  'admin/teacher/addTeacher',
  async function ({ name, trackId, courseId }, { dispatch, rejectWithValue }) {
    try {
      await axios.post('/api/addPrepod', { prepodName: name, trackId });
      const { data } = await axios.get('/api/searchSubjects', {
        params: { id: courseId },
      });
      dispatch(updateSubject(data[0]));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteReview = createAsyncThunk(
  'admin/review/delete',
  async function ({ id }, { dispatch, rejectWithValue }) {
    try {
      await axios.delete(`/api/deleteReview/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
