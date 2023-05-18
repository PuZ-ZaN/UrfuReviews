import { configureStore } from '@reduxjs/toolkit';
import { subjectsReducer } from './subjectsSlice';
import { searchReducer } from './searchSlice';
import { trackReducer } from './trackSlice';
import { generalReducer } from './generalSlice';

export default configureStore({
  reducer: {
    general: generalReducer,
    subjects: subjectsReducer,
    search: searchReducer,
    track: trackReducer,
  },
});
