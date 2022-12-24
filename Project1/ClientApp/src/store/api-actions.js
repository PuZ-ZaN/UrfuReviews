import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setOriginalSubjects } from './subjectsSlice';
import { setTracks } from './tracksSlice';

export const fetchOriginalSubjects = createAsyncThunk(
  'subjects/fetchOriginalSubjects',
  async function (_arg, { dispatch }) {
    try {
      const { data } = await axios.get('/api/All');
      dispatch(setOriginalSubjects(data.subjects));
      dispatch(setTracks(data.subjects));
    } catch (error) {
      console.log('fetchAll error');
    }
  },
);
