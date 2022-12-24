import { configureStore } from '@reduxjs/toolkit';
import { subjectsReducer } from './subjectsSlice';
import { trackReducer } from './tracksSlice';

export default configureStore({
  reducer: {
    subjects: subjectsReducer,
    tracks: trackReducer,
  },
});
