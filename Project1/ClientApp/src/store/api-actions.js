import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCountSubjects, setSubjects } from './subjectsSlice';
import { resetTrack, setReviews, setTrack } from './trackSlice';
import { setUser } from './userSlice';
import axios from './../axios';
import { setSearchTracks } from './searchSlice';

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

export const authLogin = createAsyncThunk('auth/login', async function (params, { dispatch }) {
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
  }
});

export const authMe = createAsyncThunk('auth/me', async function (_, { dispatch }) {
  try {
    const { data } = await axios.get('/auth/me');
    dispatch(setUser(data));
  } catch (error) {
    console.log('authLogin error');
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

export const fetchTrack = createAsyncThunk(
  'track/fetchTrack',
  async function ({ id }, { dispatch }) {
    try {
      const { data } = await axios.get(`/api/Tracks/${id}`, { params: { isAdvanced: true } });
      dispatch(setTrack(data[0]));
    } catch (error) {
      console.log('fetchTrack error');
    }
  },
);

export const fetchReviews = createAsyncThunk(
  'track/fetchReviews',
  async function ({ trackId, limit = 10, teacherId }, { dispatch }) {
    try {
      const { data } = await axios.get('/api/Reviews/', {
        params: { trackId, limit, teacherId },
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

      const { data } = await axios.get('/api/Search/', { params: { text, filteredBy } });
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
