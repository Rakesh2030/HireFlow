import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Briefcase } from 'lucide-react';

export default function RecentActivity({ jobs, interviews }) {
  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.applicationDate || 0) - new Date(a.applicationDate || 0))
    .slice(0, 4);

  // Status badge styling with refined opacity & border
  const getStatusBadge = (status) => {
    const badgeStyles = {
      Applied: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400',
      Shortlisted: 'bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400',
      Interview: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
      Offered: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
      Rejected: 'bg-rose-500/10 text-rose-500 border-rose-500/20 dark:text-rose-400',
    };
    return (
      badgeStyles[status] || 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300'
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Recent Applications List */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xs backdrop-blur-sm dark:border-slate-800/80 dark:bg-[#0f172a]/70">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Recent Applications
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Latest job applications submitted
              </p>
            </div>
          </div>
          <Link
            to="/applications"
            className="group flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <span>View All</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {recentJobs.length === 0 ? (
            <p className="py-6 text-center text-xs text-slate-400">No applications yet.</p>
          ) : (
            recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 text-xs font-bold text-slate-700 shadow-xs dark:border-slate-800 dark:from-slate-800 dark:to-slate-900 dark:text-slate-200">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {job.company}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {job.position} {job.salary ? `• ${job.salary}` : ''}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getStatusBadge(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                  <p className="mt-1 text-[10px] text-slate-400">{job.applicationDate}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upcoming Interviews Schedule */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xs backdrop-blur-sm dark:border-slate-800/80 dark:bg-[#0f172a]/70">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Upcoming Interviews
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Scheduled technical & HR rounds
              </p>
            </div>
          </div>
          <Link
            to="/interviews"
            className="group flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <span>View All</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {interviews.length === 0 ? (
            <p className="py-6 text-center text-xs text-slate-400">No interviews scheduled yet.</p>
          ) : (
            interviews.slice(0, 3).map((item) => {
              const formattedDate = item.interviewDate
                ? new Date(item.interviewDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Date Pending';

              return (
                <div key={item.id} className="py-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.company}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.type || item.position}
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
                        item.status === 'Completed'
                          ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : item.status === 'Cancelled'
                          ? 'border-rose-500/20 bg-rose-500/10 text-rose-500 dark:text-rose-400'
                          : 'border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <Calendar className="h-3 w-3 text-indigo-500" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
