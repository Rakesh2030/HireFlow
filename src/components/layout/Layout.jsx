import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MobileNav from './MobileNav';

export default function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-800 antialiased transition-colors duration-200 dark:bg-[#090d16] dark:text-slate-100">
      {/* Subtle ambient luxury mesh glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.08),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.15),rgba(9,13,22,0))]" />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: darkMode ? '#0f172a' : '#ffffff',
            color: darkMode ? '#f8fafc' : '#0f172a',
            border: darkMode ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid #e2e8f0',
            borderRadius: '1rem',
            boxShadow: darkMode
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
              : '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
            fontSize: '13px',
            fontWeight: 500,
          },
        }}
      />

      <div className="relative z-10 flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:sticky lg:top-0 lg:block lg:h-screen lg:shrink-0">
          <Sidebar />
        </div>

        {/* Mobile Drawer Navigation */}
        <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-x-hidden">
          <Navbar onOpenMobileNav={() => setMobileNavOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
