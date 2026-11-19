import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateJobStatus } from '../redux/jobSlice';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { PlusCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import KanbanColumn from '../components/kanban/KanbanColumn';
import JobModal from '../components/applications/JobModal';

// 5 Main Pipeline Columns with refined styling
const COLUMNS = [
  {
    id: 'Applied',
    title: 'Applied',
    color: '#6366f1',
    badgeClass: 'border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  },
  {
    id: 'Shortlisted',
    title: 'Shortlisted',
    color: '#8b5cf6',
    badgeClass: 'border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400',
  },
  {
    id: 'Interview',
    title: 'Interview',
    color: '#f59e0b',
    badgeClass: 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  {
    id: 'Offered',
    title: 'Offered',
    color: '#10b981',
    badgeClass: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'Rejected',
    title: 'Rejected',
    color: '#f43f5e',
    badgeClass: 'border-rose-500/20 bg-rose-500/10 text-rose-500 dark:text-rose-400',
  },
];

export default function Kanban() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.items);

  const [activeJob, setActiveJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const foundJob = jobs.find((j) => j.id === active.id);
    if (foundJob) {
      setActiveJob(foundJob);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveJob(null);

    if (!over) return;

    const jobId = active.id;
    let targetStatus = over.id;

    const isColumn = COLUMNS.some((col) => col.id === targetStatus);

    if (!isColumn) {
      const overJob = jobs.find((j) => j.id === targetStatus);
      if (overJob) {
        targetStatus = overJob.status;
      }
    }

    const currentJob = jobs.find((j) => j.id === jobId);

    if (currentJob && currentJob.status !== targetStatus) {
      dispatch(updateJobStatus({ id: jobId, status: targetStatus }));
      toast.success(
        `Moved ${currentJob.company} to ${targetStatus}!`,
        { icon: '🚀' }
      );
    }
  };

  const handleEditJob = (job) => {
    setJobToEdit(job);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Kanban Board
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Drag and drop applications across hiring stages to update their progress in real-time.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setJobToEdit(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98]"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Helpful Tip Banner */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-3 text-xs text-indigo-700 dark:border-indigo-500/15 dark:bg-indigo-950/20 dark:text-indigo-300">
        <Sparkles className="h-4 w-4 shrink-0 text-indigo-500" />
        <span>
          <strong>Drag & Drop:</strong> Grab any card and drop it directly into another column to seamlessly advance your job search workflow.
        </span>
      </div>

      {/* Kanban Drag and Drop Context */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Horizontal scroll container for 5 columns */}
        <div className="flex gap-4 overflow-x-auto pb-6 pt-1">
          {COLUMNS.map((column) => {
            const columnJobs = jobs.filter((job) => job.status === column.id);
            return (
              <KanbanColumn
                key={column.id}
                column={column}
                jobs={columnJobs}
                onEditJob={handleEditJob}
              />
            );
          })}
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeJob ? (
            <div className="w-72 rounded-2xl border-2 border-indigo-500 bg-white p-4 shadow-2xl dark:bg-[#0f172a]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {activeJob.company.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {activeJob.company}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {activeJob.position}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                Updating application status...
              </p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Add / Edit Job Modal */}
      {isModalOpen && (
        <JobModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setJobToEdit(null);
          }}
          jobToEdit={jobToEdit}
        />
      )}
    </div>
  );
}
