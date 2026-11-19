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
      <div className="rounded-xl border border-slate-200/80 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-[#0f172a]/95">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="mt-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">
          {payload[0].value} Applications
        </p>
      </div>
    );
  }
  return null;
}

export default function MonthlyChart({ jobs }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const monthlyCounts = {
    Jun: 1,
    Jul: 2,
    Aug: 3,
    Sep: 4,
    Oct: 0,
    Nov: 0,
  };

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
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xs backdrop-blur-sm dark:border-slate-800/80 dark:bg-[#0f172a]/70">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Application Velocity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Monthly applications submitted
            </p>
          </div>
        </div>
        <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Last 6 Months
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.65} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={darkMode ? '#1e293b' : '#f1f5f9'}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 11, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 11, fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }} />
            <Bar
              dataKey="applications"
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
