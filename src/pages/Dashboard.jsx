import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  XCircle,
  PlusCircle,
  CalendarPlus,
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import MonthlyChart from '../components/dashboard/MonthlyChart';
import StatusPieChart from '../components/dashboard/StatusPieChart';
import RecentActivity from '../components/dashboard/RecentActivity';

export default function Dashboard() {
  const jobs = useSelector((state) => state.jobs.items);
  const interviews = useSelector((state) => state.interviews.items);
  const profile = useSelector((state) => state.profile.data);

  // Compute key metric counts
  const totalApplications = jobs.length;
  const scheduledInterviews = interviews.filter((i) => i.status === 'Scheduled').length;
  const offersReceived = jobs.filter((j) => j.status === 'Offered').length;
  const rejectedApplications = jobs.filter((j) => j.status === 'Rejected').length;

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Welcome back, {profile.name || 'Job Seeker'} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track your job hunt pipeline, upcoming interviews, and career milestones.
          </p>
        </div>

        {/* Quick Action CTA buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/interviews"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <CalendarPlus className="h-4 w-4 text-indigo-500" />
            <span>Schedule Interview</span>
          </Link>
          <Link
            to="/applications"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Application</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={totalApplications}
          icon={Briefcase}
          color="blue"
          subtitle={`${jobs.filter((j) => j.status === 'Applied').length} in active review`}
        />
        <StatCard
          title="Interviews Scheduled"
          value={scheduledInterviews}
          icon={Calendar}
          color="indigo"
          subtitle="Next round coming up"
        />
        <StatCard
          title="Offers Received"
          value={offersReceived}
          icon={CheckCircle2}
          color="emerald"
          subtitle={offersReceived > 0 ? 'Congratulations!' : 'Pipeline in progress'}
        />
        <StatCard
          title="Rejected Applications"
          value={rejectedApplications}
          icon={XCircle}
          color="rose"
          subtitle="Keep applying & learning"
        />
      </div>

      {/* Charts & Analytics Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MonthlyChart jobs={jobs} />
        </div>
        <div className="lg:col-span-1">
          <StatusPieChart jobs={jobs} />
        </div>
      </div>

      {/* Recent Activity Feeds */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          Recent Activity
        </h2>
        <RecentActivity jobs={jobs} interviews={interviews} />
      </div>
    </div>
  );
}
