import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setSubjects } from './subjectsSlice';
import { setReviews, setTrack } from './trackSlice';

export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async function ({ pageNumber, semester }, { dispatch }) {
    try {
      let result;
      if (!isNaN(semester)) {
        result = await axios.get('/api/All', { params: { pageNumber, semester } });
      } else {
        result = await axios.get('/api/All', { params: { pageNumber } });
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
  async function ({ trackId, pageNumber = 1, teacherId }, { dispatch }) {
    try {
      const { data } = await axios.get('/api/Reviews/', {
        params: { trackId, pageNumber, teacherId },
      });
      dispatch(setReviews(data));
    } catch (error) {
      console.log('fetchReviews error');
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
