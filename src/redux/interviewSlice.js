import { createSlice } from '@reduxjs/toolkit';
import { initialInterviews } from '../data/mockData';

// Helper function: LocalStorage se interviews load karna
const loadInterviewsFromStorage = () => {
  try {
    const saved = localStorage.getItem('hireflow_interviews');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error reading interviews from localStorage:', error);
  }
  return initialInterviews;
};

// Helper function: LocalStorage mein interviews save karna
const saveInterviewsToStorage = (interviews) => {
  try {
    localStorage.setItem('hireflow_interviews', JSON.stringify(interviews));
  } catch (error) {
    console.error('Error saving interviews to localStorage:', error);
  }
};

const interviewSlice = createSlice({
  name: 'interviews',
  initialState: {
    items: loadInterviewsFromStorage(),
  },
  reducers: {
    // Naya interview schedule karna
    addInterview: (state, action) => {
      const newInterview = {
        ...action.payload,
        id: 'int-' + Date.now(),
      };
      state.items.unshift(newInterview);
      saveInterviewsToStorage(state.items);
    },

    // Interview edit karna
    updateInterview: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        saveInterviewsToStorage(state.items);
      }
    },

    // Interview delete karna
    deleteInterview: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveInterviewsToStorage(state.items);
    },

    // Interview status change karna (Scheduled, Completed, Cancelled)
    updateInterviewStatus: (state, action) => {
      const { id, status } = action.payload;
      const interview = state.items.find((item) => item.id === id);
      if (interview) {
        interview.status = status;
        saveInterviewsToStorage(state.items);
      }
    },

    // Sample data restore/reset karna
    resetInterviews: (state) => {
      state.items = initialInterviews;
      saveInterviewsToStorage(initialInterviews);
    },
  },
});

export const {
  addInterview,
  updateInterview,
  deleteInterview,
  updateInterviewStatus,
  resetInterviews,
} = interviewSlice.actions;

export default interviewSlice.reducer;
