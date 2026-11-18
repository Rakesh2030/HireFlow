import { createSlice } from '@reduxjs/toolkit';
import { initialProfile } from '../data/mockData';

// LocalStorage se profile load karna
const loadProfile = () => {
  try {
    const saved = localStorage.getItem('hireflow_profile');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error('Error reading profile from localStorage:', err);
  }
  return initialProfile;
};

// LocalStorage mein save karna
const saveProfile = (data) => {
  try {
    localStorage.setItem('hireflow_profile', JSON.stringify(data));
  } catch (err) {
    console.error('Error saving profile to localStorage:', err);
  }
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: loadProfile(),
  },
  reducers: {
    updateProfile: (state, action) => {
      state.data = { ...state.data, ...action.payload };
      saveProfile(state.data);
    },
    resetProfile: (state) => {
      state.data = initialProfile;
      saveProfile(initialProfile);
    },
  },
});

export const { updateProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
