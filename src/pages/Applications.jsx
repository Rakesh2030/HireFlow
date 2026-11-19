import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteJob } from '../redux/jobSlice';
import {
  Search,
  PlusCircle,
  Filter,
  Edit2,
  Trash2,
  MapPin,
  Calendar,
  Briefcase,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import JobModal from '../components/applications/JobModal';

export default function Applications() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.items);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);

  // Status badges color mapper with modern opacity + border styling
  const getStatusBadge = (status) => {
    const map = {
      Applied: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400',
      Shortlisted: 'bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400',
      Interview: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
      Offered: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
      Rejected: 'bg-rose-500/10 text-rose-500 border-rose-500/20 dark:text-rose-400',
    };
    return map[status] || 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        selectedStatus === 'All' || job.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, selectedStatus]);

  const handleEdit = (job) => {
    setJobToEdit(job);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setJobToEdit(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id, company) => {
    if (window.confirm(`Are you sure you want to delete application for ${company}?`)) {
      dispatch(deleteJob(id));
      toast.success(`Deleted application for ${company}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Job Applications
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Track, filter, and manage all your active and past job applications.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98]"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-xs backdrop-blur-sm dark:border-slate-800/80 dark:bg-[#0f172a]/70 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company, role or location..."
            className="w-full rounded-xl border border-slate-200/80 bg-slate-50/80 py-2 pl-10 pr-9 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-slate-300 dark:focus:bg-slate-900"
          >
            <option value="All">All Statuses ({jobs.length})</option>
            <option value="Applied">Applied</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Showing count indicator */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
        <span>
          Showing <strong className="text-slate-800 dark:text-slate-200">{filteredJobs.length}</strong> of <strong>{jobs.length}</strong> applications
        </span>
        {(searchTerm || selectedStatus !== 'All') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedStatus('All');
            }}
            className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Applications View */}
      {filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200/80 bg-white/50 p-12 text-center dark:border-slate-800 dark:bg-[#0f172a]/40">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Briefcase className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
            No applications found
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Try adjusting your search criteria or add a new job application.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:from-indigo-500 hover:to-violet-500"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Add Application</span>
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-xs backdrop-blur-sm dark:border-slate-800/80 dark:bg-[#0f172a]/70 md:block">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800/80 dark:bg-slate-900/40">
                  <th className="py-3.5 pl-6 pr-4">Company</th>
                  <th className="px-4 py-3.5">Role & Package</th>
                  <th className="px-4 py-3.5">Applied Date</th>
                  <th className="px-4 py-3.5">Location</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="group transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
                  >
                    {/* Company */}
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 font-bold text-slate-700 shadow-xs dark:border-slate-800 dark:from-slate-800 dark:to-slate-900 dark:text-slate-200">
                          {job.company.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">
                            {job.company}
                          </p>
                          {job.notes && (
                            <p className="max-w-xs truncate text-[11px] text-slate-400 italic">
                              {job.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Role & Salary */}
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{job.position}</p>
                      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {job.salary || 'Salary not disclosed'}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{job.applicationDate || 'N/A'}</span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{job.location || 'Remote'}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getStatusBadge(
                          job.status
                        )}`}
                      >
                        {job.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleEdit(job)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
                          title="Edit application"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(job.id, job.company)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400 transition-colors"
                          title="Delete application"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Grid View */}
          <div className="grid grid-cols-1 gap-3.5 md:hidden">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-sm dark:border-slate-800/80 dark:bg-[#0f172a]/70"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 font-bold text-slate-700 shadow-xs dark:border-slate-800 dark:from-slate-800 dark:to-slate-900 dark:text-slate-200">
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{job.company}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{job.position}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getStatusBadge(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  {job.salary && (
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      💰 {job.salary}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[11px]">
                    <MapPin className="h-3 w-3" />
                    {job.location || 'Remote'}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Calendar className="h-3 w-3" />
                    {job.applicationDate}
                  </span>
                </div>

                {job.notes && (
                  <p className="mt-3 rounded-xl bg-slate-50/80 p-2.5 text-xs text-slate-600 italic dark:bg-slate-900/60 dark:text-slate-300">
                    "{job.notes}"
                  </p>
                )}

                <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => handleEdit(job)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(job.id, job.company)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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
