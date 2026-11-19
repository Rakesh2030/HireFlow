import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addInterview, updateInterview } from '../../redux/interviewSlice';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function InterviewModal({ isOpen, onClose, interviewToEdit }) {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.items);

  const getDefaultInterviewDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    d.setHours(14, 0, 0, 0);
    return d.toISOString().slice(0, 16);
  };

  const [formData, setFormData] = useState(() => {
    if (interviewToEdit) {
      return {
        jobId: interviewToEdit.jobId || '',
        company: interviewToEdit.company || '',
        position: interviewToEdit.position || '',
        interviewDate: interviewToEdit.interviewDate || '',
        type: interviewToEdit.type || 'Technical Round',
        notes: interviewToEdit.notes || '',
        status: interviewToEdit.status || 'Scheduled',
      };
    }
    return {
      jobId: '',
      company: jobs.length > 0 ? jobs[0].company : '',
      position: jobs.length > 0 ? jobs[0].position : '',
      interviewDate: getDefaultInterviewDate(),
      type: 'Technical Round 1',
      notes: '',
      status: 'Scheduled',
    };
  });

  if (!isOpen) return null;

  const handleJobSelect = (e) => {
    const selectedJobId = e.target.value;
    const selectedJob = jobs.find((j) => j.id === selectedJobId);

    if (selectedJob) {
      setFormData((prev) => ({
        ...prev,
        jobId: selectedJob.id,
        company: selectedJob.company,
        position: selectedJob.position,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        jobId: '',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.company.trim() || !formData.interviewDate) {
      toast.error('Please enter Company name and select Interview Date & Time.');
      return;
    }

    if (interviewToEdit) {
      dispatch(updateInterview({ ...formData, id: interviewToEdit.id }));
      toast.success('Interview details updated successfully!');
    } else {
      dispatch(addInterview(formData));
      toast.success('New interview scheduled successfully!');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl backdrop-blur-xl transition-all dark:border-slate-800 dark:bg-[#0f172a]/95 sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {interviewToEdit ? 'Edit Interview' : 'Schedule New Interview'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Set up date, round type, and preparation notes
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {jobs.length > 0 && !interviewToEdit && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Link to an Existing Application (Optional)
              </label>
              <select
                value={formData.jobId}
                onChange={handleJobSelect}
                className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-slate-200 dark:focus:bg-slate-900"
              >
                <option value="">-- Choose from your applications --</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.company} — {job.position} ({job.status})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Company Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Company Name *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Google"
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Job Position *
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Frontend Engineer"
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Interview Date & Time */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Interview Date & Time *
              </label>
              <input
                type="datetime-local"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
              />
            </div>

            {/* Round / Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Interview Round / Type
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="e.g. Technical Round 1, HR Screen"
                className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Notes / Agenda */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Preparation Notes & Meeting Links
            </label>
            <textarea
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. Zoom link, revise React hooks, system design diagrams..."
              className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
            />
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] transition-all"
            >
              {interviewToEdit ? 'Save Changes' : 'Schedule Interview'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
