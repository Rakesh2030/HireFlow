import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteInterview,
  updateInterviewStatus,
} from '../redux/interviewSlice';
import {
  Calendar,
  PlusCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Edit2,
  Trash2,
  CalendarCheck2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import InterviewModal from '../components/interviews/InterviewModal';

export default function Interviews() {
  const dispatch = useDispatch();
  const interviews = useSelector((state) => state.interviews.items);

  // Tab filter: 'upcoming' | 'completed' | 'all'
  const [activeTab, setActiveTab] = useState('upcoming');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interviewToEdit, setInterviewToEdit] = useState(null);

  // Counts
  const scheduledCount = interviews.filter((i) => i.status === 'Scheduled').length;
  const completedCount = interviews.filter((i) => i.status === 'Completed').length;
  const cancelledCount = interviews.filter((i) => i.status === 'Cancelled').length;

  // Filtered interviews according to selected tab
  const filteredInterviews = useMemo(() => {
    return interviews.filter((item) => {
      if (activeTab === 'upcoming') {
        return item.status === 'Scheduled';
      }
      if (activeTab === 'completed') {
        return item.status === 'Completed';
      }
      return true; // 'all'
    });
  }, [interviews, activeTab]);

  // Open Edit Modal
  const handleEdit = (interview) => {
    setInterviewToEdit(interview);
    setIsModalOpen(true);
  };

  // Open Schedule Modal
  const handleScheduleNew = () => {
    setInterviewToEdit(null);
    setIsModalOpen(true);
  };

  // Delete Interview
  const handleDelete = (id, company) => {
    if (window.confirm(`Delete interview scheduled with ${company}?`)) {
      dispatch(deleteInterview(id));
      toast.success(`Interview for ${company} deleted.`);
    }
  };

  // Quick Status Toggle
  const handleStatusChange = (id, newStatus, company) => {
    dispatch(updateInterviewStatus({ id, status: newStatus }));
    if (newStatus === 'Completed') {
      toast.success(`Marked interview with ${company} as Completed! 🎉`);
    } else if (newStatus === 'Cancelled') {
      toast.error(`Interview with ${company} marked as Cancelled.`);
    } else {
      toast.success(`Interview status updated to ${newStatus}.`);
    }
  };

  // Helper to format date cleanly
  const formatDateTime = (dateString) => {
    if (!dateString) return 'Date TBD';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Interview Management
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Keep track of all upcoming technical rounds, behavioral interviews, and preparation notes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleScheduleNew}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-500/25 transition-all hover:bg-blue-700"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Schedule Interview</span>
        </button>
      </div>

      {/* Tabs & Stats Navigation */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            Upcoming ({scheduledCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === 'completed'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            All ({interviews.length})
          </button>
        </div>

        {cancelledCount > 0 && (
          <span className="text-xs text-rose-500 dark:text-rose-400">
            {cancelledCount} cancelled
          </span>
        )}
      </div>

      {/* Interview Cards List */}
      {filteredInterviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <CalendarCheck2 className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
            No interviews found in this view
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {activeTab === 'upcoming'
              ? 'You have no pending interviews scheduled right now.'
              : 'No past or completed interviews recorded yet.'}
          </p>
          <button
            type="button"
            onClick={handleScheduleNew}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Schedule an Interview</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredInterviews.map((interview) => (
            <div
              key={interview.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                {/* Header: Company & Status */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {interview.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {interview.company}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {interview.position}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      interview.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : interview.status === 'Cancelled'
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                        : 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                    }`}
                  >
                    {interview.status}
                  </span>
                </div>

                {/* Round Type Pill */}
                {interview.type && (
                  <div className="mt-3">
                    <span className="inline-block rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                      🎯 {interview.type}
                    </span>
                  </div>
                )}

                {/* Date & Time display */}
                <div className="mt-3.5 flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>{formatDateTime(interview.interviewDate)}</span>
                </div>

                {/* Preparation notes */}
                {interview.notes && (
                  <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                    <div className="mb-1 flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200">
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                      <span>Preparation Notes</span>
                    </div>
                    <p className="whitespace-pre-line">{interview.notes}</p>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                {/* Status Toggle Actions */}
                <div className="flex items-center gap-2">
                  {interview.status === 'Scheduled' ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(interview.id, 'Completed', interview.company)
                        }
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-900/60"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Mark Completed</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(interview.id, 'Cancelled', interview.company)
                        }
                        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Cancel</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(interview.id, 'Scheduled', interview.company)
                      }
                      className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    >
                      Move back to Scheduled
                    </button>
                  )}
                </div>

                {/* Edit & Delete Actions */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleEdit(interview)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    title="Edit interview"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(interview.id, interview.company)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
                    title="Delete interview"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule / Edit Interview Modal */}
      <InterviewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setInterviewToEdit(null);
        }}
        interviewToEdit={interviewToEdit}
      />
    </div>
  );
}
