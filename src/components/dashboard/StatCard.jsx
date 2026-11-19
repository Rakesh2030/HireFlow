import { TrendingUp } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, color, subtitle }) {
  // Refined modern color system
  const colorStyles = {
    blue: {
      bg: 'bg-indigo-500/10 dark:bg-indigo-400/10',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-500/20',
      ring: 'ring-indigo-500/10',
      glow: 'from-indigo-500/20 to-transparent',
    },
    indigo: {
      bg: 'bg-violet-500/10 dark:bg-violet-400/10',
      text: 'text-violet-600 dark:text-violet-400',
      border: 'border-violet-500/20',
      ring: 'ring-violet-500/10',
      glow: 'from-violet-500/20 to-transparent',
    },
    emerald: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/20',
      ring: 'ring-emerald-500/10',
      glow: 'from-emerald-500/20 to-transparent',
    },
    rose: {
      bg: 'bg-rose-500/10 dark:bg-rose-400/10',
      text: 'text-rose-600 dark:text-rose-400',
      border: 'border-rose-500/20',
      ring: 'ring-rose-500/10',
      glow: 'from-rose-500/20 to-transparent',
    },
  };

  const style = colorStyles[color] || colorStyles.blue;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/50 dark:border-slate-800/80 dark:bg-[#0f172a]/70 dark:hover:border-slate-700 dark:hover:shadow-black/40">
      {/* Top subtle highlight gradient */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${style.glow}`}
      />

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl border ${style.border} ${style.bg} ${style.text} ring-4 ${style.ring} transition-transform group-hover:scale-105`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {value}
        </p>
      </div>

      {subtitle && (
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          <TrendingUp className="h-3 w-3 text-emerald-500 shrink-0" />
          <span className="truncate">{subtitle}</span>
        </div>
      )}
    </div>
  );
}
