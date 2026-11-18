import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Briefcase } from 'lucide-react';

export default function RecentActivity({ jobs, interviews }) {
  // Sort jobs by applicationDate descending (most recent first)
  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.applicationDate || 0) - new Date(a.applicationDate || 0))
    .slice(0, 4);

  // Status badge styling helper
  const getStatusBadge = (status) => {
    const badgeStyles = {
      Applied: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
      Shortlisted: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
      Interview: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
      Offered: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
      Rejected: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
    };
    return (
      badgeStyles[status] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Recent Applications List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Recent Applications
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Latest job applications submitted
              </p>
            </div>
          </div>
          <Link
            to="/applications"
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <span>View All</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {recentJobs.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">No applications yet.</p>
          ) : (
            recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {job.company}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {job.position} {job.salary ? `• ${job.salary}` : ''}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                  <p className="mt-1 text-[11px] text-slate-400">{job.applicationDate}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upcoming Interviews Schedule */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Upcoming Interviews
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Scheduled technical & HR rounds
              </p>
            </div>
          </div>
          <Link
            to="/interviews"
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <span>View All</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {interviews.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">No interviews scheduled yet.</p>
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
                <div key={item.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.company}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.type || item.position}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        item.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : item.status === 'Cancelled'
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                          : 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="h-3.5 w-3.5 text-blue-500" />
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
