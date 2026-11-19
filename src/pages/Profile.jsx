import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, resetProfile } from '../redux/profileSlice';
import { resetJobs } from '../redux/jobSlice';
import { resetInterviews } from '../redux/interviewSlice';
import {
  Mail,
  Briefcase,
  MapPin,
  DollarSign,
  Award,
  Edit3,
  RotateCcw,
  Target,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const jobs = useSelector((state) => state.jobs.items);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    role: profile.role || '',
    experience: profile.experience || '',
    targetSalary: profile.targetSalary || '',
    location: profile.location || '',
    bio: profile.bio || '',
  });

  const totalApplications = jobs.length;
  const interviewStageCount = jobs.filter(
    (j) => j.status === 'Interview' || j.status === 'Offered'
  ).length;
  const offersCount = jobs.filter((j) => j.status === 'Offered').length;

  const interviewRate =
    totalApplications > 0 ? Math.round((interviewStageCount / totalApplications) * 100) : 0;
  const offerRate =
    totalApplications > 0 ? Math.round((offersCount / totalApplications) * 100) : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    setIsEditing(false);
    toast.success('Profile details saved successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name || '',
      email: profile.email || '',
      role: profile.role || '',
      experience: profile.experience || '',
      targetSalary: profile.targetSalary || '',
      location: profile.location || '',
      bio: profile.bio || '',
    });
    setIsEditing(false);
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure you want to restore the initial sample jobs and interviews? All current data will be replaced with fresh demo data.'
      )
    ) {
      dispatch(resetJobs());
      dispatch(resetInterviews());
      dispatch(resetProfile());
      setFormData({
        name: 'Alex Sharma',
        email: 'alex.sharma@example.com',
        role: 'Frontend Developer',
        experience: '3+ Years',
        targetSalary: '$140,000 / yr',
        bio: 'Passionate frontend engineer specializing in React.js, Tailwind CSS, and modern web application development.',
        location: 'Bangalore / Remote',
      });
      toast.success('Sample data restored successfully! ✨');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Profile & Career Goals
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Manage your personal portfolio details and track your application conversion rates.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98]"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: User Profile Card / Form */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-xs backdrop-blur-sm dark:border-slate-800/80 dark:bg-[#0f172a]/70">
            {isEditing ? (
              /* Edit Profile Form */
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Edit Profile Details
                  </h3>
                  <span className="text-xs text-slate-400">Update your target job info</span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Target Role / Title
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g. Frontend Developer"
                      className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Experience Level
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g. 3+ Years"
                      className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Target Salary Package
                    </label>
                    <input
                      type="text"
                      name="targetSalary"
                      value={formData.targetSalary}
                      onChange={handleChange}
                      placeholder="e.g. $140,000 / yr or ₹20 LPA"
                      className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Location Preference
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Remote / Bangalore"
                      className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Professional Summary / Bio
                  </label>
                  <textarea
                    name="bio"
                    rows="3"
                    value={formData.bio}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              /* View Profile Card */
              <div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-purple-600 text-3xl font-extrabold text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-500/10">
                    {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                        {profile.name}
                      </h2>
                      <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-0.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {profile.role || 'Job Hunter'}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-indigo-500" />
                        {profile.email}
                      </span>
                      {profile.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                          {profile.location}
                        </span>
                      )}
                      {profile.experience && (
                        <span className="flex items-center gap-1.5">
                          <Award className="h-3.5 w-3.5 text-indigo-500" />
                          {profile.experience} Experience
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Target Career Preference Pills */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Target Compensation
                    </span>
                    <p className="mt-1 flex items-center gap-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      <DollarSign className="h-4 w-4" />
                      <span>{profile.targetSalary || 'Not set'}</span>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Target Role Title
                    </span>
                    <p className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white">
                      <Briefcase className="h-4 w-4 text-indigo-500" />
                      <span>{profile.role || 'Not set'}</span>
                    </p>
                  </div>
                </div>

                {/* Bio */}
                {profile.bio && (
                  <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      About Me
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {profile.bio}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Career Progress & Conversion Metrics */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-xs backdrop-blur-sm dark:border-slate-800/80 dark:bg-[#0f172a]/70">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Target className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Career Conversion Funnel
              </h3>
            </div>

            <div className="mt-5 space-y-4">
              {/* Interview Rate */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    Interview Rate
                  </span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {interviewRate}%
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 shadow-xs"
                    style={{ width: `${Math.min(interviewRate, 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  {interviewStageCount} of {totalApplications} applications reached interview
                </p>
              </div>

              {/* Offer Rate */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    Offer Rate
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {offerRate}%
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 shadow-xs"
                    style={{ width: `${Math.min(offerRate, 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  {offersCount} formal offers received
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-[11px] text-slate-500 dark:border-slate-800/80 dark:bg-slate-900/40 dark:text-slate-400">
              💡 <strong>Industry Standard:</strong> Tech applicants usually average ~10-15% interview rate and 2-5% offer conversion.
            </div>
          </div>

          {/* Reset Demo Data Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-xs backdrop-blur-sm dark:border-slate-800/80 dark:bg-[#0f172a]/70">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <RotateCcw className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Demo Data Controls
              </h3>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Want to test the app with a clean baseline? Reset to restore sample applications and interviews.
            </p>
            <button
              type="button"
              onClick={handleResetData}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset to Sample Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
