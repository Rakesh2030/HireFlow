import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

const statusColors = {
  Applied: '#3b82f6',
  Shortlisted: '#8b5cf6',
  Interview: '#f59e0b',
  Offered: '#10b981',
  Rejected: '#ef4444',
};

// Custom Recharts Tooltip declared outside render
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{data.name}</p>
        <p className="mt-0.5 text-sm font-bold" style={{ color: data.color }}>
          {data.value} Applications
        </p>
      </div>
    );
  }
  return null;
}

export default function StatusPieChart({ jobs }) {
  // Group jobs by status
  const counts = {
    Applied: 0,
    Shortlisted: 0,
    Interview: 0,
    Offered: 0,
    Rejected: 0,
  };

  jobs.forEach((job) => {
    if (counts[job.status] !== undefined) {
      counts[job.status] += 1;
    }
  });

  const chartData = [
    { name: 'Applied', value: counts['Applied'], color: statusColors.Applied },
    { name: 'Shortlisted', value: counts['Shortlisted'], color: statusColors.Shortlisted },
    { name: 'Interview', value: counts['Interview'], color: statusColors.Interview },
    { name: 'Offered', value: counts['Offered'], color: statusColors.Offered },
    { name: 'Rejected', value: counts['Rejected'], color: statusColors.Rejected },
  ].filter((item) => item.value > 0);

  const total = jobs.length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <PieIcon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Status Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pipeline distribution
            </p>
          </div>
        </div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {total} Total
        </span>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-slate-400">
          No application data yet.
        </div>
      ) : (
        <>
          <div className="relative h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{total}</span>
              <span className="text-[11px] text-slate-400">Apps</span>
            </div>
          </div>

          {/* Clean Legend */}
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
            {Object.keys(statusColors).map((status) => {
              const count = counts[status];
              return (
                <div key={status} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: statusColors[status] }}
                  />
                  <span className="truncate text-slate-600 dark:text-slate-400">
                    {status}: <strong className="text-slate-900 dark:text-white">{count}</strong>
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
