import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, Sparkles, X } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from '@google/genai';

interface ChatInterfaceProps {
  onClose?: () => void;
  userName: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose, userName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Assalamu'alaikum, ${userName}! Saya Ustadz Bot. Ada yang bisa saya bantu terkait kegiatan belajar atau hafalan hari ini?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      setMessages(prev => [...prev, { role: 'model', text: '', isThinking: true }]);
      const streamResponse = await sendMessageToGemini(userMsg);
      
      let fullText = '';
      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
           fullText += c.text;
           setMessages(prev => {
             const newArr = [...prev];
             const lastIndex = newArr.length - 1;
             newArr[lastIndex] = { role: 'model', text: fullText, isThinking: false };
             return newArr;
           });
        }
      }
    } catch (error) {
      setMessages(prev => {
          const newArr = [...prev];
          const lastIndex = newArr.length - 1;
          newArr[lastIndex] = { role: 'model', text: "Mohon maaf, koneksi terputus. Silakan coba lagi.", isThinking: false };
          return newArr;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-emerald-200">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex items-center justify-between shrink-0 text-white">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-lg">
             <Sparkles className="text-yellow-300" size={18} />
          </div>
          <div>
             <h3 className="font-bold text-sm">Ustadz Bot Assistant</h3>
             <p className="text-[10px] opacity-80">Powered by Gemini AI</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded transition">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 shadow-sm">
                <Bot size={16} className="text-emerald-600" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none' 
                : 'bg-white text-slate-700 rounded-bl-none border border-slate-200'
              }`}>
              {msg.isThinking ? (
                <div className="flex items-center gap-2 text-slate-400">
                  <Loader2 className="animate-spin" size={14} />
                  <span>Sedang berpikir...</span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{msg.text}</div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2 border border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan untuk Ustadz Bot..."
            className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all transform hover:scale-105 active:scale-95"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};