import { createSlice } from '@reduxjs/toolkit';
import { searchFilters } from '../const.ts';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    text: [],
    filterBy: searchFilters.Track,
  },
  reducers: {
    setText(state, action) {
      state.text = action.payload;
    },
    setFilterBy(state, action) {
      state.filterBy = action.payload;
    },
  },
});

export const { setText, setFilterBy } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
