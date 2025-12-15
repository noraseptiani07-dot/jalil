import React from 'react';
import { TechItem } from '../types';
import { Check } from 'lucide-react';

interface TechCardProps {
  item: TechItem;
  isSelected: boolean;
  onClick: () => void;
}

export const TechCard: React.FC<TechCardProps> = ({ item, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-start p-6 rounded-2xl border transition-all duration-300 w-full text-left
        ${isSelected 
          ? `bg-slate-800 border-${item.color}-500 shadow-[0_0_20px_rgba(0,0,0,0.3)] ring-1 ring-${item.color}-500/50` 
          : 'bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-800/50'
        }`}
    >
      <div className={`p-3 rounded-lg mb-4 bg-slate-950 ${isSelected ? `text-${item.color}-400` : 'text-slate-400 group-hover:text-white'}`}>
        {item.icon}
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-white">{item.name}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">
        {item.description}
      </p>

      {isSelected && (
        <div className="w-full mt-auto">
          <div className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-semibold">Contoh Kode</div>
          <div className="bg-slate-950 rounded-md p-3 w-full overflow-hidden border border-slate-800">
            <pre className="code-font text-xs text-emerald-400 overflow-x-auto">
              <code>{item.codeSnippet}</code>
            </pre>
          </div>
        </div>
      )}
      
      {!isSelected && (
        <div className="mt-auto flex items-center text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
          <span className="mr-2">Klik untuk detail</span>
        </div>
      )}
      
      {isSelected && (
        <div className="absolute top-4 right-4 text-emerald-500">
          <Check size={20} />
        </div>
      )}
    </button>
  );
};