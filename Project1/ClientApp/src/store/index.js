import { configureStore } from '@reduxjs/toolkit';
import { subjectsReducer } from './slices';

export default configureStore({
  reducer: {
    subjects: subjectsReducer,
  },
});
