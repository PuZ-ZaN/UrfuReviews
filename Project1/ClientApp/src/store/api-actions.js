import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setOriginalSubjects } from './subjectsSlice';
import { setTracks } from './tracksSlice';

export const fetchOriginalSubjects = createAsyncThunk(
  'subjects/fetchOriginalSubjects',
  async function (_arg, { dispatch }) {
    try {
      const { data } = await axios.get('/api/All');
      dispatch(setOriginalSubjects(data));
    } catch (error) {
      console.log('fetchAll error');
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
