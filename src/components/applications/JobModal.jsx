import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addJob, updateJob } from '../../redux/jobSlice';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function JobModal({ isOpen, onClose, jobToEdit }) {
  const dispatch = useDispatch();

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState(() => {
    if (jobToEdit) {
      return {
        company: jobToEdit.company || '',
        position: jobToEdit.position || '',
        salary: jobToEdit.salary || '',
        location: jobToEdit.location || '',
        applicationDate: jobToEdit.applicationDate || getTodayDate(),
        status: jobToEdit.status || 'Applied',
        notes: jobToEdit.notes || '',
      };
    }
    return {
      company: '',
      position: '',
      salary: '',
      location: '',
      applicationDate: getTodayDate(),
      status: 'Applied',
      notes: '',
    };
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.company.trim() || !formData.position.trim()) {
      toast.error('Please enter both Company name and Job Position.');
      return;
    }

    if (jobToEdit) {
      dispatch(updateJob({ ...formData, id: jobToEdit.id }));
      toast.success('Job application updated successfully!');
    } else {
      dispatch(addJob(formData));
      toast.success('New job application added!');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
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
              {jobToEdit ? 'Edit Job Application' : 'Add New Application'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {jobToEdit
                ? 'Update company, role, or stage details'
                : 'Enter details of the job you have applied for'}
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
                placeholder="e.g. Google, Stripe"
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
            {/* Salary */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Salary Package
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. $130,000 / ₹18 LPA"
                className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote, Bangalore"
                className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Application Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Application Date
              </label>
              <input
                type="date"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
              />
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Current Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
              >
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Notes & Referral Details
            </label>
            <textarea
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. Applied via LinkedIn, HR contacted on email..."
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
              {jobToEdit ? 'Save Changes' : 'Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
