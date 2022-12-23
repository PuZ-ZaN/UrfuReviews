import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setOriginalSubjects } from './slices';

export const fetchOriginalSubjects = createAsyncThunk(
  'subjects/fetchOriginalSubjects',
  async function (_arg, { dispatch }) {
    try {
      const { data } = await axios.get('/api/All');
      dispatch(setOriginalSubjects(data.subjects));
    } catch (error) {
      console.log('fetchAll error');
    }
  },
);
