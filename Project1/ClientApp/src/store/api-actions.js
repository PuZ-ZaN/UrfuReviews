import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  setAllDataBase,
  setOriginalReviews,
  setOriginalSubjects,
  setOriginalTeachers,
  setOriginalTracks,
} from './slices';

export const fetchAll = createAsyncThunk(
  'originalDataBase/fetchAll',
  async function (_arg, { dispatch }) {
    try {
      const { data } = await axios.get('/api/All');
      dispatch(setAllDataBase(data.subjects));
    } catch (error) {
      console.log('fetchAll error');
    }
  },
);

export const fetchOriginalSubjects = createAsyncThunk(
  'originalDataBase/fetchOriginalSubjects',
  async function (_arg, { dispatch }) {
    try {
      const { data } = await axios.get('/api/Subjects');
      dispatch(setOriginalSubjects(data));
    } catch (error) {
      console.log('fetchOriginalSubjects error');
    }
  },
);

export const fetchOriginalTracks = createAsyncThunk(
  'originalDataBase/fetchOriginalTracks',
  async function (_arg, { dispatch }) {
    try {
      const { data } = await axios.get('/api/Tracks');
      dispatch(setOriginalTracks(data));
    } catch (error) {
      console.log('fetchOriginalTracks error');
    }
  },
);

export const fetchOriginalTeachers = createAsyncThunk(
  'originalDataBase/fetchOriginalTeachers',
  async function (_arg, { dispatch }) {
    try {
      const { data } = await axios.get('/api/Prepods');
      dispatch(setOriginalTeachers(data));
    } catch (error) {
      console.log('fetchOriginalTeachers error');
    }
  },
);

export const fetchOriginalReviews = createAsyncThunk(
  'originalDataBase/fetchOriginalReviews',
  async function (_arg, { dispatch }) {
    try {
      const { data } = await axios.get('/api/Reviews');
      dispatch(setOriginalReviews(data));
    } catch (error) {
      console.log('fetchOriginalReviews error');
    }
  },
);
