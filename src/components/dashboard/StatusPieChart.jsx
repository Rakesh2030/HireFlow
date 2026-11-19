import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

const statusColors = {
  Applied: '#6366f1',
  Shortlisted: '#8b5cf6',
  Interview: '#f59e0b',
  Offered: '#10b981',
  Rejected: '#f43f5e',
};

// Custom Recharts Tooltip declared outside render
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-200/80 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-[#0f172a]/95">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{data.name}</p>
        <p className="mt-0.5 text-sm font-bold" style={{ color: data.color }}>
          {data.value} Applications
        </p>
      </div>
    );
  }
  return null;
}

export default function StatusPieChart({ jobs }) {
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
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xs backdrop-blur-sm dark:border-slate-800/80 dark:bg-[#0f172a]/70">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <PieIcon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Status Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pipeline distribution
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {total} Total
        </span>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-60 items-center justify-center text-xs text-slate-400">
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
                  innerRadius={54}
                  outerRadius={78}
                  paddingAngle={4}
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{total}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Apps</span>
            </div>
          </div>

          {/* Clean Legend */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
            {Object.keys(statusColors).map((status) => {
              const count = counts[status];
              return (
                <div
                  key={status}
                  className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/50 p-1.5 px-2.5 dark:border-slate-800/60 dark:bg-slate-900/40"
                >
                  <span
                    className="h-2 w-2 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: statusColors[status] }}
                  />
                  <span className="truncate text-[11px] text-slate-600 dark:text-slate-400">
                    {status}: <strong className="text-slate-900 dark:text-white font-semibold">{count}</strong>
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
