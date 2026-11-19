import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/themeSlice';
import { Sun, Moon, Menu, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onOpenMobileNav }) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const profile = useSelector((state) => state.profile.data);
  const scheduledInterviews = useSelector((state) =>
    state.interviews.items.filter((i) => i.status === 'Scheduled').length
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/70 bg-white/70 px-4 backdrop-blur-xl transition-colors duration-200 dark:border-slate-800/80 dark:bg-[#090d16]/75 sm:px-6">
      {/* Left side: Hamburger menu (mobile) & Brand */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100/80 hover:text-slate-800 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white lg:hidden"
          aria-label="Open mobile navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Hire<span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">Flow</span>
          </span>
        </Link>
      </div>

      {/* Right side: Scheduled Badge, Theme Toggle & Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Scheduled Interviews Badge */}
        {scheduledInterviews > 0 && (
          <Link
            to="/interviews"
            className="hidden items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-600 transition-all hover:bg-indigo-500/15 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-400 sm:flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
            </span>
            <span>{scheduledInterviews} Interview{scheduledInterviews > 1 ? 's' : ''} Next</span>
          </Link>
        )}

        {/* Dark / Light Mode Toggle Button */}
        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/60 text-slate-600 shadow-xs backdrop-blur-sm transition-all hover:border-indigo-500/30 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-indigo-400/30 dark:hover:bg-slate-800 dark:hover:text-white"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="h-4 w-4 text-amber-400 transition-transform group-hover:rotate-45" />
          ) : (
            <Moon className="h-4 w-4 text-slate-600 transition-transform group-hover:-rotate-12" />
          )}
        </button>

        {/* User Profile Chip */}
        <Link
          to="/profile"
          className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white/60 p-1.5 pr-3 shadow-xs backdrop-blur-sm transition-all hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 dark:hover:bg-slate-800"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 text-[11px] font-bold text-white shadow-xs">
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold leading-none text-slate-800 dark:text-slate-200">
              {profile.name || 'User'}
            </p>
            <p className="mt-0.5 text-[10px] leading-none text-slate-400 dark:text-slate-500">
              {profile.role || 'Job Seeker'}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
