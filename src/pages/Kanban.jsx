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

// 5 Main Pipeline Columns
const COLUMNS = [
  {
    id: 'Applied',
    title: 'Applied',
    color: '#3b82f6',
    badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
  },
  {
    id: 'Shortlisted',
    title: 'Shortlisted',
    color: '#8b5cf6',
    badgeClass: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
  },
  {
    id: 'Interview',
    title: 'Interview',
    color: '#f59e0b',
    badgeClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
  },
  {
    id: 'Offered',
    title: 'Offered',
    color: '#10b981',
    badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
  },
  {
    id: 'Rejected',
    title: 'Rejected',
    color: '#ef4444',
    badgeClass: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
  },
];

export default function Kanban() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.items);

  // Active dragged job for DragOverlay
  const [activeJob, setActiveJob] = useState(null);

  // Modal state for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);

  // Setup sensors with activation constraint so regular clicks aren't captured as drags
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // Drag start handler
  const handleDragStart = (event) => {
    const { active } = event;
    const foundJob = jobs.find((j) => j.id === active.id);
    if (foundJob) {
      setActiveJob(foundJob);
    }
  };

  // Drag end handler: drop card into column
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveJob(null);

    if (!over) return;

    const jobId = active.id;
    // Over ID can be either the column ID or another card's ID
    let targetStatus = over.id;

    // Check if target is a column
    const isColumn = COLUMNS.some((col) => col.id === targetStatus);

    // If dropped over a card, find that card's column
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
        `Moved ${currentJob.company} (${currentJob.position}) to ${targetStatus}!`,
        { icon: '🚀' }
      );
    }
  };

  // Open Edit Modal
  const handleEditJob = (job) => {
    setJobToEdit(job);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Kanban Board
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Drag and drop applications across stages to update their progress in real-time.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setJobToEdit(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-500/25 transition-all hover:bg-blue-700"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Helpful Tip Banner */}
      <div className="flex items-center gap-2.5 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-2.5 text-xs text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
        <Sparkles className="h-4 w-4 shrink-0 text-blue-500" />
        <span>
          <strong>Pro-tip:</strong> Simply drag any application card and drop it into another column (e.g. from <em>Applied</em> to <em>Interview</em>).
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

        {/* Drag Overlay: preview card while dragging */}
        <DragOverlay>
          {activeJob ? (
            <div className="w-72 rounded-xl border-2 border-blue-500 bg-white p-4 shadow-2xl dark:bg-slate-900">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                  {activeJob.company.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {activeJob.company}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeJob.position}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                Dropping into new stage...
              </p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Add / Edit Job Modal */}
      <JobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setJobToEdit(null);
        }}
        jobToEdit={jobToEdit}
      />
    </div>
  );
}
