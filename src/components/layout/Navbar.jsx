import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/themeSlice';
import { Sun, Moon, Menu, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onOpenMobileNav }) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const profile = useSelector((state) => state.profile.data);
  const scheduledInterviews = useSelector((state) =>
    state.interviews.items.filter((i) => i.status === 'Scheduled').length
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/90 sm:px-6">
      {/* Left side: Hamburger menu (mobile) & Brand (mobile only) */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white lg:hidden"
          aria-label="Open mobile navigation"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Mobile Brand Logo */}
        <Link to="/" className="flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/30">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Hire<span className="text-blue-600 dark:text-blue-400">Flow</span>
          </span>
        </Link>
      </div>

      {/* Right side: Actions, Theme Toggle & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Scheduled Interviews Badge */}
        {scheduledInterviews > 0 && (
          <Link
            to="/interviews"
            className="hidden items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-900/80 sm:flex"
          >
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>{scheduledInterviews} Interview{scheduledInterviews > 1 ? 's' : ''} Upcoming</span>
          </Link>
        )}

        {/* Dark / Light Mode Toggle Button */}
        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* User Profile Chip */}
        <Link
          to="/profile"
          className="flex items-center gap-2.5 rounded-xl border border-slate-200 p-1.5 pr-3 hover:bg-slate-50 transition-colors dark:border-slate-800 dark:hover:bg-slate-800/60"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs font-bold text-white shadow-sm">
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold leading-none text-slate-900 dark:text-white">
              {profile.name || 'User'}
            </p>
            <p className="mt-0.5 text-[11px] leading-none text-slate-500 dark:text-slate-400">
              {profile.role || 'Job Seeker'}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
