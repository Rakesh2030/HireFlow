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

  const [activeTab, setActiveTab] = useState('upcoming');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interviewToEdit, setInterviewToEdit] = useState(null);

  const scheduledCount = interviews.filter((i) => i.status === 'Scheduled').length;
  const completedCount = interviews.filter((i) => i.status === 'Completed').length;
  const cancelledCount = interviews.filter((i) => i.status === 'Cancelled').length;

  const filteredInterviews = useMemo(() => {
    return interviews.filter((item) => {
      if (activeTab === 'upcoming') {
        return item.status === 'Scheduled';
      }
      if (activeTab === 'completed') {
        return item.status === 'Completed';
      }
      return true;
    });
  }, [interviews, activeTab]);

  const handleEdit = (interview) => {
    setInterviewToEdit(interview);
    setIsModalOpen(true);
  };

  const handleScheduleNew = () => {
    setInterviewToEdit(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id, company) => {
    if (window.confirm(`Delete interview scheduled with ${company}?`)) {
      dispatch(deleteInterview(id));
      toast.success(`Interview for ${company} deleted.`);
    }
  };

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
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Interview Management
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Keep track of all upcoming technical rounds, behavioral interviews, and preparation notes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleScheduleNew}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98]"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Schedule Interview</span>
        </button>
      </div>

      {/* Tabs & Stats Navigation */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-3.5 dark:border-slate-800">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/70 dark:bg-[#0c111d] border border-slate-200/70 dark:border-slate-800/80">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-white text-indigo-600 shadow-xs dark:bg-slate-800 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Upcoming ({scheduledCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'completed'
                ? 'bg-white text-indigo-600 shadow-xs dark:bg-slate-800 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-indigo-600 shadow-xs dark:bg-slate-800 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            All ({interviews.length})
          </button>
        </div>

        {cancelledCount > 0 && (
          <span className="text-xs font-medium text-rose-500 dark:text-rose-400">
            {cancelledCount} cancelled
          </span>
        )}
      </div>

      {/* Interview Cards List */}
      {filteredInterviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200/80 bg-white/50 p-12 text-center dark:border-slate-800 dark:bg-[#0f172a]/40">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <CalendarCheck2 className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
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
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:from-indigo-500 hover:to-violet-500"
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
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800/80 dark:bg-[#0f172a]/80"
            >
              <div>
                {/* Header: Company & Status */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 font-bold text-slate-700 shadow-xs dark:border-slate-800 dark:from-slate-800 dark:to-slate-900 dark:text-slate-200">
                      {interview.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {interview.company}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {interview.position}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
                      interview.status === 'Completed'
                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : interview.status === 'Cancelled'
                        ? 'border-rose-500/20 bg-rose-500/10 text-rose-500 dark:text-rose-400'
                        : 'border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    }`}
                  >
                    {interview.status}
                  </span>
                </div>

                {/* Round Type Pill */}
                {interview.type && (
                  <div className="mt-3">
                    <span className="inline-block rounded-lg border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[11px] font-semibold text-violet-600 dark:text-violet-400">
                      🎯 {interview.type}
                    </span>
                  </div>
                )}

                {/* Date & Time */}
                <div className="mt-3.5 flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                  <span>{formatDateTime(interview.interviewDate)}</span>
                </div>

                {/* Preparation notes */}
                {interview.notes && (
                  <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs text-slate-600 dark:border-slate-800/60 dark:bg-slate-900/40 dark:text-slate-300">
                    <div className="mb-1 flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
                      <FileText className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Preparation Notes</span>
                    </div>
                    <p className="whitespace-pre-line text-[11px]">{interview.notes}</p>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  {interview.status === 'Scheduled' ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(interview.id, 'Completed', interview.company)
                        }
                        className="inline-flex items-center gap-1 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400 transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Mark Completed</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(interview.id, 'Cancelled', interview.company)
                        }
                        className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition-colors"
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
                      className="rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                    >
                      Move to Scheduled
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleEdit(interview)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
                    title="Edit interview"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(interview.id, interview.company)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400 transition-colors"
                    title="Delete interview"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule / Edit Interview Modal */}
      {isModalOpen && (
        <InterviewModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setInterviewToEdit(null);
          }}
          interviewToEdit={interviewToEdit}
        />
      )}
    </div>
  );
}
