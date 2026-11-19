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
      badgeColor: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
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
      badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-400 border border-indigo-500/20',
    },
    {
      name: 'Profile & Goals',
      path: '/profile',
      icon: User,
      badge: null,
    },
  ];

  return (
    <aside className="flex h-full w-64 flex-col justify-between border-r border-slate-200/80 bg-white/80 p-4 backdrop-blur-xl transition-colors duration-200 dark:border-slate-800/80 dark:bg-[#0c111d]/90">
      <div>
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 ring-1 ring-white/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                Hire<span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">Flow</span>
              </span>
              <span className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 -mt-0.5">Career Pipeline OS</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="mt-6">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Navigation
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
                    `group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20'
                        : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`h-4 w-4 transition-colors ${
                            isActive
                              ? 'text-white'
                              : 'text-slate-400 group-hover:text-indigo-500 dark:text-slate-500 dark:group-hover:text-indigo-400'
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge !== null && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
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

      {/* Pro Career Hub Widget */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-transparent p-4 dark:border-indigo-500/15 dark:from-indigo-950/30 dark:via-violet-950/20">
        <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
          <Sparkles className="h-3.5 w-3.5" />
          <h4 className="text-[11px] font-bold uppercase tracking-wider">Career Hub</h4>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
          {totalApplications} active applications tracked. Keep momentum going!
        </p>
      </div>
    </aside>
  );
}
