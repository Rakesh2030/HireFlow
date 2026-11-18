import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Briefcase,
  Kanban,
  Calendar,
  User,
  Sparkles,
} from 'lucide-react';

export default function Sidebar({ onCloseMobile }) {
  const jobs = useSelector((state) => state.jobs.items);
  const interviews = useSelector((state) => state.interviews.items);

  const totalApplications = jobs.length;
  const scheduledInterviews = interviews.filter((i) => i.status === 'Scheduled').length;

  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Job Applications',
      path: '/applications',
      icon: Briefcase,
      badge: totalApplications > 0 ? totalApplications : null,
    },
    {
      name: 'Kanban Board',
      path: '/kanban',
      icon: Kanban,
      badge: null,
    },
    {
      name: 'Interviews',
      path: '/interviews',
      icon: Calendar,
      badge: scheduledInterviews > 0 ? scheduledInterviews : null,
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300',
    },
    {
      name: 'Profile & Goals',
      path: '/profile',
      icon: User,
      badge: null,
    },
  ];

  return (
    <aside className="flex h-full w-64 flex-col justify-between border-r border-slate-200 bg-white p-4 transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div>
        {/* App Logo */}
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Hire<span className="text-blue-600 dark:text-blue-400">Flow</span>
            </span>
            <span className="ml-1.5 rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              SaaS
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mt-6">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Menu
          </p>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 dark:bg-blue-600'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-slate-200'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-5 w-5 transition-colors ${
                            isActive
                              ? 'text-white'
                              : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge !== null && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : item.badgeColor ||
                                'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Career Progress Box */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-indigo-50/50 p-4 dark:border-blue-950/60 dark:from-slate-800/80 dark:to-slate-800/30">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <Sparkles className="h-4 w-4" />
          <h4 className="text-xs font-bold uppercase tracking-wider">Career Hub</h4>
        </div>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
          Track your applications, interviews & offers all in one place.
        </p>
      </div>
    </aside>
  );
}
