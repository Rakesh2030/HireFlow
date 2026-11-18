import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './jobSlice';
import interviewReducer from './interviewSlice';
import themeReducer from './themeSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    interviews: interviewReducer,
    theme: themeReducer,
    profile: profileReducer,
  },
});

export default store;
