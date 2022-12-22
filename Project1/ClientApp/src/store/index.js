import { configureStore } from '@reduxjs/toolkit';
import { activeDataReducer, originalDataBaseReducer } from './slices';

export default configureStore({
  reducer: {
    originalDataBase: originalDataBaseReducer,
    activeData: activeDataReducer,
  },
});
