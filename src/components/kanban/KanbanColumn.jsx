import { useDroppable } from '@dnd-kit/core';
import KanbanCard from './KanbanCard';

export default function KanbanColumn({ column, jobs, onEditJob }) {
  // dnd-kit droppable hook for the column
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-80 shrink-0 flex-col rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5 transition-colors dark:border-slate-800 dark:bg-slate-900/60 ${
        isOver
          ? 'ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
          : ''
      }`}
    >
      {/* Column Header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: column.color }}
          />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {column.title}
          </h3>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${column.badgeClass}`}
        >
          {jobs.length}
        </span>
      </div>

      {/* Cards Container */}
      <div className="flex flex-1 flex-col gap-3 min-h-[350px]">
        {jobs.length === 0 ? (
          <div
            className={`flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400 transition-colors dark:border-slate-800 ${
              isOver ? 'border-blue-400 bg-blue-50/40 text-blue-600 dark:bg-blue-950/40' : ''
            }`}
          >
            {isOver ? 'Release to drop here' : 'Drop applications here'}
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
