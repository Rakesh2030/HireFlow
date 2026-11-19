import { X } from 'lucide-react';
import Sidebar from './Sidebar';

export default function MobileNav({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative flex w-72 max-w-[80vw] flex-1 flex-col bg-white shadow-2xl transition-transform dark:bg-[#0c111d]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-4 rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        <Sidebar onCloseMobile={onClose} />
      </div>
    </div>
  );
}
