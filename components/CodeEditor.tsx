import React from 'react';
import { Copy } from 'lucide-react';

interface CodeEditorProps {
  fileName: string;
  code: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ fileName, code }) => {
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-slate-700 font-mono text-sm">
      {/* Editor Header / Tabs */}
      <div className="flex items-center bg-[#252526] border-b border-[#333]">
        <div className="px-4 py-2 bg-[#1e1e1e] text-indigo-300 border-t-2 border-indigo-500 flex items-center gap-2">
          <span className="text-orange-400 text-xs">Ag</span>
          {fileName}
        </div>
        <div className="px-4 py-2 text-slate-500 text-xs italic">
          read-only
        </div>
        <div className="ml-auto px-3 text-slate-400 hover:text-white cursor-pointer">
           <Copy size={14} />
        </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <pre className="font-fira leading-relaxed">
          <code className="block text-slate-300">
            {code.split('\n').map((line, i) => (
              <div key={i} className="table-row">
                <span className="table-cell text-right pr-4 text-slate-600 select-none w-8">{i + 1}</span>
                <span className="table-cell whitespace-pre-wrap break-all">
                  {line
                    .replace(/<\?php/g, '<span class="text-pink-500 font-bold">&lt;?php</span>')
                    .replace(/(echo|if|else|foreach|return|function|class|public|private)/g, '<span class="text-blue-400">$1</span>')
                    .replace(/(\$[\w]+)/g, '<span class="text-indigo-300">$1</span>')
                    .replace(/('.*?')/g, '<span class="text-emerald-400">$1</span>')
                    .replace(/(".*?")/g, '<span class="text-emerald-400">$1</span>')
                    .replace(/(\/\/.*)/g, '<span class="text-slate-500 italic">$1</span>')
                    .replace(/(=>|->|::)/g, '<span class="text-pink-400">$1</span>')
                  }
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
      
      {/* Editor Footer */}
      <div className="bg-[#007acc] text-white text-[10px] px-2 py-1 flex justify-between items-center">
        <span>PHP 8.2 Server</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};