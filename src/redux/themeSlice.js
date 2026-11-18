import { createSlice } from '@reduxjs/toolkit';

// Initial theme check (localStorage ya system preference)
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('hireflow_theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialDarkMode = getInitialTheme();

// Apply initial dark class to html document tag
if (initialDarkMode) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: initialDarkMode,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('hireflow_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('hireflow_theme', 'light');
      }
    },
    setTheme: (state, action) => {
      state.darkMode = action.payload;
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('hireflow_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('hireflow_theme', 'light');
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
