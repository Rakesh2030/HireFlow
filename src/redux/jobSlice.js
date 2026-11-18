import { createSlice } from '@reduxjs/toolkit';
import { initialJobs } from '../data/mockData';

// Helper function: LocalStorage se jobs load karna
const loadJobsFromStorage = () => {
  try {
    const savedJobs = localStorage.getItem('hireflow_jobs');
    if (savedJobs) {
      return JSON.parse(savedJobs);
    }
  } catch (error) {
    console.error('Error reading jobs from localStorage:', error);
  }
  return initialJobs;
};

// Helper function: LocalStorage mein jobs save karna
const saveJobsToStorage = (jobs) => {
  try {
    localStorage.setItem('hireflow_jobs', JSON.stringify(jobs));
  } catch (error) {
    console.error('Error saving jobs to localStorage:', error);
  }
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    items: loadJobsFromStorage(),
  },
  reducers: {
    // Nayi job application add karna
    addJob: (state, action) => {
      const newJob = {
        ...action.payload,
        id: 'job-' + Date.now(),
      };
      state.items.unshift(newJob);
      saveJobsToStorage(state.items);
    },

    // Existing job ko edit/update karna
    updateJob: (state, action) => {
      const index = state.items.findIndex((job) => job.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        saveJobsToStorage(state.items);
      }
    },

    // Job delete karna
    deleteJob: (state, action) => {
      state.items = state.items.filter((job) => job.id !== action.payload);
      saveJobsToStorage(state.items);
    },

    // Drag-and-drop ya status change ke liye status update karna
    updateJobStatus: (state, action) => {
      const { id, status } = action.payload;
      const job = state.items.find((job) => job.id === id);
      if (job) {
        job.status = status;
        saveJobsToStorage(state.items);
      }
    },

    // Sample data restore/reset karna
    resetJobs: (state) => {
      state.items = initialJobs;
      saveJobsToStorage(initialJobs);
    },
  },
});

export const { addJob, updateJob, deleteJob, updateJobStatus, resetJobs } = jobSlice.actions;
export default jobSlice.reducer;
