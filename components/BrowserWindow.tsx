import React from 'react';
import { RefreshCw, ArrowLeft, ArrowRight, Lock, Globe } from 'lucide-react';

interface BrowserWindowProps {
  url: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({ url, children, isLoading }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200">
      {/* Browser Toolbar */}
      <div className="bg-slate-100 border-b border-slate-200 p-2 flex items-center gap-3">
        <div className="flex gap-1.5 ml-1">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        
        <div className="flex items-center gap-2 text-slate-400 ml-2">
          <ArrowLeft size={16} />
          <ArrowRight size={16} />
          <RefreshCw size={14} className={isLoading ? "animate-spin text-blue-500" : ""} />
        </div>

        {/* Address Bar */}
        <div className="flex-1 bg-white border border-slate-300 rounded-md px-3 py-1 flex items-center gap-2 text-sm text-slate-600 shadow-sm">
          <Lock size={12} className="text-green-600" />
          <span className="text-slate-400">localhost:8000/</span>
          <span className="text-slate-800 font-medium">{url}</span>
        </div>
        
        <Globe size={18} className="text-slate-400 mr-2" />
      </div>

      {/* Browser Content */}
      <div className="flex-1 bg-white overflow-y-auto relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs font-mono text-indigo-600">Processing PHP...</span>
            </div>
          </div>
        )}
        <div className="p-6 font-sans text-slate-800">
          {children}
        </div>
      </div>
    </div>
  );
};