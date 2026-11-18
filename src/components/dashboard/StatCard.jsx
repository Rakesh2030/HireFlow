import { TrendingUp } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, color, subtitle }) {
  // Color configuration mapping for light and dark modes
  const colorStyles = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/60',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'hover:border-blue-300 dark:hover:border-blue-700',
    },
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/60',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'hover:border-indigo-300 dark:hover:border-indigo-700',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'hover:border-emerald-300 dark:hover:border-emerald-700',
    },
    rose: {
      bg: 'bg-rose-50 dark:bg-rose-950/60',
      text: 'text-rose-600 dark:text-rose-400',
      border: 'hover:border-rose-300 dark:hover:border-rose-700',
    },
  };

  const style = colorStyles[color] || colorStyles.blue;

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${style.border}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className={`rounded-xl p-2.5 ${style.bg} ${style.text}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </p>
      </div>

      {subtitle && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          <span>{subtitle}</span>
        </div>
      )}
    </div>
  );
}
