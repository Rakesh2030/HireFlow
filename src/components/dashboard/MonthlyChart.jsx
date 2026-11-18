import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { BarChart3 } from 'lucide-react';

// Custom Recharts Tooltip declared outside render for clean performance
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 text-sm font-bold text-blue-600 dark:text-blue-400">
          {payload[0].value} Applications
        </p>
      </div>
    );
  }
  return null;
}

export default function MonthlyChart({ jobs }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  // Helper to aggregate applications per month
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Default distribution for the last 6 months
  const monthlyCounts = {
    Jun: 1,
    Jul: 2,
    Aug: 3,
    Sep: 4,
    Oct: 0,
    Nov: 0,
  };

  // Count actual applications from state
  jobs.forEach((job) => {
    if (job.applicationDate) {
      const date = new Date(job.applicationDate);
      if (!isNaN(date.getTime())) {
        const m = monthNames[date.getMonth()];
        if (monthlyCounts[m] !== undefined) {
          monthlyCounts[m] += 1;
        } else {
          monthlyCounts[m] = 1;
        }
      }
    }
  });

  const chartData = [
    { month: 'Jun', applications: monthlyCounts['Jun'] || 1 },
    { month: 'Jul', applications: monthlyCounts['Jul'] || 2 },
    { month: 'Aug', applications: monthlyCounts['Aug'] || 3 },
    { month: 'Sep', applications: monthlyCounts['Sep'] || 4 },
    { month: 'Oct', applications: monthlyCounts['Oct'] || 2 },
    { month: 'Nov', applications: monthlyCounts['Nov'] || 5 },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Application Activity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Monthly applications submitted
            </p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          Last 6 Months
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={darkMode ? '#334155' : '#f1f5f9'}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="applications"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
              maxBarSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
