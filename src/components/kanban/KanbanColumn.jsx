import { useDroppable } from '@dnd-kit/core';
import KanbanCard from './KanbanCard';

export default function KanbanColumn({ column, jobs, onEditJob }) {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-80 shrink-0 flex-col rounded-3xl border border-slate-200/70 bg-slate-100/50 p-3.5 backdrop-blur-sm transition-all duration-200 dark:border-slate-800/80 dark:bg-[#0c111d]/70 ${
        isOver
          ? 'ring-2 ring-indigo-500/80 bg-indigo-50/40 dark:bg-indigo-950/20'
          : ''
      }`}
    >
      {/* Column Header */}
      <div className="mb-3.5 flex items-center justify-between px-2 pt-1">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full shadow-xs"
            style={{ backgroundColor: column.color }}
          />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            {column.title}
          </h3>
        </div>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${column.badgeClass}`}
        >
          {jobs.length}
        </span>
      </div>

      {/* Cards Container */}
      <div className="flex flex-1 flex-col gap-3 min-h-[350px]">
        {jobs.length === 0 ? (
          <div
            className={`flex flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200/70 p-6 text-center text-xs text-slate-400 transition-colors dark:border-slate-800/80 ${
              isOver ? 'border-indigo-400 bg-indigo-50/30 text-indigo-600 dark:bg-indigo-950/30' : ''
            }`}
          >
            {isOver ? 'Drop to update stage' : 'Drop applications here'}
          </div>
        ) : (
          jobs.map((job) => (
            <KanbanCard key={job.id} job={job} onEdit={onEditJob} />
          ))
        )}
      </div>
    </div>
  );
}
