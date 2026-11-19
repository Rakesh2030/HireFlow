import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Calendar, MapPin, DollarSign } from 'lucide-react';

export default function KanbanCard({ job, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: job.id,
    data: { job },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.35 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group relative cursor-grab rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md active:cursor-grabbing dark:border-slate-800/80 dark:bg-[#0f172a] dark:hover:border-slate-700 ${
        isDragging ? 'ring-2 ring-indigo-500 shadow-2xl scale-[1.02]' : ''
      }`}
    >
      {/* Top Header: Company initial and Grip handle */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200/60 bg-gradient-to-b from-white to-slate-50 text-xs font-bold text-slate-700 shadow-2xs dark:border-slate-800 dark:from-slate-800 dark:to-slate-900 dark:text-slate-200">
            {job.company.charAt(0)}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              {job.company}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {job.position}
            </p>
          </div>
        </div>

        <div className="text-slate-300 transition-colors group-hover:text-slate-500 dark:text-slate-600 dark:group-hover:text-slate-400">
          <GripVertical className="h-4 w-4" />
        </div>
      </div>

      {/* Salary & Location Info */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
        {job.salary && (
          <span className="inline-flex items-center gap-1 rounded-md border border-slate-200/60 bg-slate-50/70 px-2 py-0.5 font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
            <DollarSign className="h-3 w-3 text-emerald-500" />
            <span>{job.salary}</span>
          </span>
        )}
        {job.location && (
          <span className="inline-flex items-center gap-1 rounded-md border border-slate-200/60 bg-slate-50/70 px-2 py-0.5 dark:border-slate-800 dark:bg-slate-900/60">
            <MapPin className="h-3 w-3 text-slate-400" />
            <span>{job.location}</span>
          </span>
        )}
      </div>

      {/* Notes snippet */}
      {job.notes && (
        <p className="mt-2.5 line-clamp-2 rounded-xl bg-slate-50/80 p-2 text-[11px] text-slate-500 italic dark:bg-slate-900/50 dark:text-slate-400">
          "{job.notes}"
        </p>
      )}

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-400 dark:border-slate-800/70">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{job.applicationDate || 'No date'}</span>
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(job);
          }}
          className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
