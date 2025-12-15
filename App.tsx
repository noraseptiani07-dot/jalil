import React, { useState, useEffect, useRef } from 'react';
import { User, Exam, ExamResult, Role, Question, LiveSession, Tingkat, QuestionBank } from './types';
import { ChatInterface } from './components/ChatInterface';
import { 
  LayoutDashboard, Users, BookOpen, LogOut, Plus, 
  Clock, CheckCircle, BarChart3, GraduationCap, Play,
  AlertTriangle, ChevronRight, Check, Trash2, Save,
  Flag, X, Search, MoreVertical, Menu, Grid, Calendar,
  Activity, Eye, UserPlus, Timer, BookMarked, Filter,
  FileQuestion, Layers, Edit, Folder, ChevronDown, ChevronUp, FileText, XCircle, ArrowLeft, FolderPlus, ListChecks
} from 'lucide-react';

// --- MOCK DATA INITIALIZATION ---
const INITIAL_USERS: User[] = [
  // --- ADMINS ---
  { id: '1', name: 'Administrator Pusat', username: 'admin', role: 'admin', joinedAt: '2023-01-01' },
  { id: '102', name: 'Admin Akademik', username: 'admin_akademik', role: 'admin', joinedAt: '2023-01-02' },
  
  // --- TEACHERS (USTADZ/USTADZAH) ---
  { id: '2', name: 'Ustadz Budi Santoso', username: 'ustadz', role: 'teacher', joinedAt: '2023-02-15' },
  { id: '201', name: 'Ustadzah Siti Aminah', username: 'ustadzah', role: 'teacher', joinedAt: '2023-03-10' },
  { id: '202', name: 'KH. Abdullah Faqih', username: 'kyai', role: 'teacher', joinedAt: '2023-01-05' },
  { id: '203', name: 'Ustadz Yusuf Mansur', username: 'yusuf', role: 'teacher', joinedAt: '2023-04-01' },
  { id: '204', name: 'Ustadzah Halimah', username: 'halimah', role: 'teacher', joinedAt: '2023-04-05' },

  // --- STUDENTS: IDADIYAH (Persiapan) ---
  { id: '301', name: 'Zaid bin Tsabit', username: 'zaid', role: 'student', joinedAt: '2023-07-01', tingkat: 'Idadiyah' },
  { id: '302', name: 'Hasan Al-Basri', username: 'hasan', role: 'student', joinedAt: '2023-07-02', tingkat: 'Idadiyah' },
  { id: '306', name: 'Bilal Al-Habashi', username: 'bilal_habashi', role: 'student', joinedAt: '2023-07-03', tingkat: 'Idadiyah' },
  { id: '307', name: 'Salman Al-Farisi', username: 'salman', role: 'student', joinedAt: '2023-07-04', tingkat: 'Idadiyah' },
  { id: '308', name: 'Abdullah bin Mas\'ud', username: 'ibnu_masud', role: 'student', joinedAt: '2023-07-05', tingkat: 'Idadiyah' },

  // --- STUDENTS: IBTIDAIYAH (SD) ---
  { id: '3', name: 'Ahmad Santri', username: 'santri', role: 'student', joinedAt: '2023-06-10', tingkat: 'Ibtidaiyah' },
  { id: '303', name: 'Umar Al-Faruq', username: 'umar', role: 'student', joinedAt: '2023-06-11', tingkat: 'Ibtidaiyah' },
  { id: '304', name: 'Siti Aisyah', username: 'aisyah', role: 'student', joinedAt: '2023-06-12', tingkat: 'Ibtidaiyah' },
  { id: '305', name: 'Khodijah Al-Kubra', username: 'khodijah', role: 'student', joinedAt: '2023-06-13', tingkat: 'Ibtidaiyah' },
  { id: '309', name: 'Fatimah Az-Zahra (Kecil)', username: 'fatimah_kecil', role: 'student', joinedAt: '2023-06-14', tingkat: 'Ibtidaiyah' },
  { id: '310', name: 'Zubair bin Awwam', username: 'zubair', role: 'student', joinedAt: '2023-06-15', tingkat: 'Ibtidaiyah' },
  { id: '311', name: 'Talhah bin Ubaidillah', username: 'talhah', role: 'student', joinedAt: '2023-06-16', tingkat: 'Ibtidaiyah' },

  // --- STUDENTS: TSANAWIYAH (SMP) ---
  { id: '4', name: 'Fatimah Azzahra', username: 'fatimah', role: 'student', joinedAt: '2023-06-12', tingkat: 'Tsanawiyah' },
  { id: '401', name: 'Usman bin Affan', username: 'usman', role: 'student', joinedAt: '2023-06-14', tingkat: 'Tsanawiyah' },
  { id: '402', name: 'Ruqayyah binti Muhammad', username: 'ruqayyah', role: 'student', joinedAt: '2023-06-15', tingkat: 'Tsanawiyah' },
  { id: '403', name: 'Zainab binti Jahsy', username: 'zainab', role: 'student', joinedAt: '2023-06-16', tingkat: 'Tsanawiyah' },
  { id: '404', name: 'Ali bin Husein', username: 'ali_husein', role: 'student', joinedAt: '2023-06-17', tingkat: 'Tsanawiyah' },
  { id: '405', name: 'Muhammad Al-Baqir', username: 'baqir', role: 'student', joinedAt: '2023-06-18', tingkat: 'Tsanawiyah' },
  { id: '406', name: 'Ja\'far Ash-Shadiq', username: 'jafar', role: 'student', joinedAt: '2023-06-19', tingkat: 'Tsanawiyah' },

  // --- STUDENTS: ALIYAH (SMA) ---
  { id: '5', name: 'Ali bin Abi Thalib', username: 'ali', role: 'student', joinedAt: '2023-06-15', tingkat: 'Aliyah' },
  { id: '501', name: 'Abu Bakar Ash-Shiddiq', username: 'abubakar', role: 'student', joinedAt: '2023-06-17', tingkat: 'Aliyah' },
  { id: '502', name: 'Hafsah binti Umar', username: 'hafsah', role: 'student', joinedAt: '2023-06-18', tingkat: 'Aliyah' },
  { id: '503', name: 'Bilal bin Rabah', username: 'bilal', role: 'student', joinedAt: '2023-06-19', tingkat: 'Aliyah' },
  { id: '504', name: 'Khalid bin Walid', username: 'khalid', role: 'student', joinedAt: '2023-06-20', tingkat: 'Aliyah' },
  { id: '505', name: 'Amr bin Ash', username: 'amr', role: 'student', joinedAt: '2023-06-21', tingkat: 'Aliyah' },
  { id: '506', name: 'Muawiyah bin Abu Sufyan', username: 'muawiyah', role: 'student', joinedAt: '2023-06-22', tingkat: 'Aliyah' },
  { id: '507', name: 'Salahuddin Al-Ayyubi', username: 'salahuddin', role: 'student', joinedAt: '2023-06-23', tingkat: 'Aliyah' },
];

const INITIAL_BANKS: QuestionBank[] = [
  { id: 'b1', fan: 'Fiqih', bab: 'Shalat & Thaharah', tingkat: 'Ibtidaiyah', kelas: '1', createdAt: '2023-10-01' },
  { id: 'b2', fan: 'Nahwu', bab: 'I\'rab & Marfu\'at', tingkat: 'Tsanawiyah', kelas: '1', createdAt: '2023-10-02' },
  { id: 'b3', fan: 'Tarikh Islam', bab: 'Sirah Nabawiyah', tingkat: 'Aliyah', kelas: '1', createdAt: '2023-10-05' },
];

const INITIAL_QUESTIONS: Question[] = [
  // Fiqih Ibtidaiyah (Bank b1)
  { id: 'q1', bankId: 'b1', text: 'Apa hukum shalat lima waktu bagi muslim baligh?', options: ['Sunnah', 'Wajib', 'Mubah', 'Makruh'], correctAnswer: 1, subject: 'Fiqih', bab: 'Shalat & Thaharah', tingkat: 'Ibtidaiyah', createdAt: '2023-10-01' },
  { id: 'q2', bankId: 'b1', text: 'Air yang suci dan mensucikan disebut air?', options: ['Mutanajis', 'Musta\'mal', 'Mutlaq', 'Musyammas'], correctAnswer: 2, subject: 'Fiqih', bab: 'Shalat & Thaharah', tingkat: 'Ibtidaiyah', createdAt: '2023-10-01' },
  // Nahwu Tsanawiyah (Bank b2)
  { id: 'q3', bankId: 'b2', text: 'Tanda i\'rab rafa\' pada isim mufrad adalah?', options: ['Fathah', 'Kasrah', 'Dhammah', 'Sukun'], correctAnswer: 2, subject: 'Nahwu', bab: 'I\'rab & Marfu\'at', tingkat: 'Tsanawiyah', createdAt: '2023-10-02' },
  { id: 'q4', bankId: 'b2', text: 'Kata "Zaidun" dalam kalimat "Qama Zaidun" berkedudukan sebagai?', options: ['Fa\'il', 'Maf\'ul Bih', 'Mubtada', 'Khabar'], correctAnswer: 0, subject: 'Nahwu', bab: 'I\'rab & Marfu\'at', tingkat: 'Tsanawiyah', createdAt: '2023-10-02' },
  // Tarikh Aliyah (Bank b3)
  { id: 'q5', bankId: 'b3', text: 'Perang Badar terjadi pada tahun ke berapa Hijriyah?', options: ['1 H', '2 H', '3 H', '4 H'], correctAnswer: 1, subject: 'Tarikh Islam', bab: 'Sirah Nabawiyah', tingkat: 'Aliyah', createdAt: '2023-10-05' },
];

const INITIAL_EXAMS: Exam[] = [
  {
    id: 'e1',
    title: 'Imtihan Fiqih Dasar',
    subject: 'Fiqih',
    tingkat: 'Ibtidaiyah',
    durationMinutes: 45,
    status: 'active',
    authorId: '2',
    createdAt: '2023-10-01',
    scheduledStart: '2023-10-01T08:00',
    scheduledEnd: '2023-12-31T10:00',
    questions: [INITIAL_QUESTIONS[0], INITIAL_QUESTIONS[1]]
  }
];

// --- COMPONENTS ---

// 1. TOAST NOTIFICATION
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-[100] px-4 py-3 md:px-6 md:py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300 max-w-[90vw] ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-500 text-white'}`}>
      {type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
      <span className="font-medium text-sm md:text-base">{message}</span>
    </div>
  );
};

// Helper Component for Timer
const SessionTimer = ({ startTime, status, finalDuration }: { startTime: string, status: string, finalDuration?: number }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (status === 'completed') {
      if (finalDuration !== undefined) setElapsed(finalDuration);
      return;
    }

    const start = new Date(startTime).getTime();
    const tick = () => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    };
    
    tick(); // immediate
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [startTime, status, finalDuration]);

  const format = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h > 0 ? h + 'j ' : ''}${m}m ${s}d`;
  };

  return <span>{format(elapsed)}</span>;
};

// 2. LOGIN COMPONENT
const LoginView = ({ onLogin, users }: { onLogin: (u: User) => void, users: User[] }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.username === username);
    if (user) {
      onLogin(user);
    } else {
      setError('Username tidak ditemukan.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 rounded-full blur-[100px]"></div>

      <div className="bg-white/95 backdrop-blur-xl w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col relative z-10 border border-white/20 mx-4 md:mx-0">
        <div className="bg-gradient-to-br from-emerald-700 to-teal-800 p-8 md:p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20"></div>
          <div className="bg-white/20 w-16 h-16 md:w-20 md:h-20 rounded-2xl mx-auto flex items-center justify-center mb-6 backdrop-blur-md shadow-inner ring-1 ring-white/30">
             <BookMarked size={32} className="text-white md:hidden" />
             <BookMarked size={40} className="text-white hidden md:block" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Pesantren Digital</h1>
          <p className="text-emerald-100 text-xs md:text-sm font-medium">Sistem Akademik & Ujian Santri</p>
        </div>
        
        <div className="p-6 md:p-8 pt-8 md:pt-10">
          <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Username</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white font-medium text-sm md:text-base"
                  placeholder="Contoh: santri"
                />
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>
            </div>
            
            {error && (
              <div className="text-red-600 text-xs md:text-sm bg-red-50 p-3 md:p-4 rounded-xl flex items-center gap-3 border border-red-100 animate-pulse">
                <AlertTriangle size={18} className="shrink-0"/> 
                {error}
              </div>
            )}

            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 md:py-4 rounded-xl shadow-xl shadow-emerald-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 text-sm md:text-base">
              Masuk Sistem
            </button>
            
            <div className="text-center mt-6">
              <p className="text-xs text-slate-400 mb-2">Akun Demo Cepat:</p>
              <div className="flex flex-wrap justify-center gap-2 text-[10px] md:text-xs font-mono">
                <button type="button" onClick={() => setUsername('admin')} className="bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-600 transition">admin</button>
                <button type="button" onClick={() => setUsername('ustadz')} className="bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-600 transition">ustadz</button>
                <button type="button" onClick={() => setUsername('santri')} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-1 rounded transition">Ibtd: santri</button>
                <button type="button" onClick={() => setUsername('fatimah')} className="bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 px-2 py-1 rounded transition">Tsna: fatimah</button>
                <button type="button" onClick={() => setUsername('ali')} className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 px-2 py-1 rounded transition">Alyh: ali</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// 3. EXAM RUNNER (SANTRI)
interface ExamRunnerProps {
  exam: Exam;
  student: User;
  onFinish: (res: ExamResult) => void;
  onUpdateSession: (progress: number, status: LiveSession['status']) => void;
}

const ExamRunner = ({ exam, student, onFinish, onUpdateSession }: ExamRunnerProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(exam.durationMinutes * 60);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Time Tracking State
  const [questionDurations, setQuestionDurations] = useState<Record<string, number>>({});
  const lastSwitchTime = useRef<number>(Date.now());
  const examStartTime = useRef<number>(Date.now());

  // Report progress whenever answers change
  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = exam.questions.length;
    const currentProgress = Math.round((answeredCount / totalQuestions) * 100);
    onUpdateSession(currentProgress, 'online');
  }, [answers, exam.questions.length, onUpdateSession]);

  useEffect(() => {
    // Reset switch time when component mounts
    lastSwitchTime.current = Date.now();
    examStartTime.current = Date.now();
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Helper to record time spent on the current question
  const recordTime = () => {
    const now = Date.now();
    const elapsedSeconds = (now - lastSwitchTime.current) / 1000;
    const currentQId = exam.questions[currentQ].id;

    setQuestionDurations(prev => ({
      ...prev,
      [currentQId]: (prev[currentQId] || 0) + elapsedSeconds
    }));

    lastSwitchTime.current = now;
  };

  const handleNavigation = (targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= exam.questions.length) return;
    recordTime(); // Save time for current question before switching
    setCurrentQ(targetIndex);
    setIsMobileNavOpen(false);
  };

  const handleAnswer = (optionIdx: number) => {
    setAnswers(prev => ({...prev, [exam.questions[currentQ].id]: optionIdx}));
  };

  const toggleFlag = (qId: string) => {
    const newFlags = new Set(flagged);
    if (newFlags.has(qId)) newFlags.delete(qId);
    else newFlags.add(qId);
    setFlagged(newFlags);
  };

  const handleSubmit = () => {
    recordTime(); // Save time for the last question
    onUpdateSession(100, 'completed'); // Signal that exam is finished

    let correctCount = 0;
    exam.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correctCount++;
    });
    const score = Math.round((correctCount / exam.questions.length) * 100);

    const now = Date.now();
    const totalDurationSeconds = (now - examStartTime.current) / 1000;

    const result: ExamResult = {
      id: Math.random().toString(36).substr(2, 9),
      examId: exam.id,
      studentId: student.id,
      score,
      answers,
      submittedAt: new Date().toISOString(),
      durationSeconds: Math.floor(totalDurationSeconds),
      questionDurations: questionDurations 
    };
    onFinish(result);
  };

  const progress = (Object.keys(answers).length / exam.questions.length) * 100;

  const QuestionGrid = () => (
    <div className="grid grid-cols-5 gap-3">
      {exam.questions.map((q, idx) => {
        const isAnswered = answers[q.id] !== undefined;
        const isActive = idx === currentQ;
        const isFlagged = flagged.has(q.id);
        
        let bgClass = 'bg-slate-50 text-slate-500 border-slate-200';
        if (isActive) bgClass = 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-200';
        else if (isFlagged) bgClass = 'bg-yellow-100 text-yellow-600 border-yellow-300';
        else if (isAnswered) bgClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';

        return (
          <button
            key={q.id}
            onClick={() => handleNavigation(idx)}
            className={`aspect-square rounded-lg text-sm font-bold flex flex-col items-center justify-center border transition-all relative ${bgClass} hover:opacity-90`}
          >
            {idx + 1}
            {isFlagged && <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full m-1"></div>}
          </button>
        )
      })}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col font-sans overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-2 flex justify-between items-center shadow-sm h-16 shrink-0 z-20 relative">
        <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
            <BookOpen size={20} />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm md:text-lg font-bold text-slate-800 leading-tight truncate">{exam.title}</h2>
            <p className="text-slate-500 text-[10px] md:text-xs truncate">{exam.subject} ({exam.tingkat}) • {currentQ + 1}/{exam.questions.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-6 shrink-0">
           <div className="flex flex-col items-end px-2 md:px-4 py-1 bg-slate-100 rounded-lg border border-slate-200">
             <span className="text-[9px] md:text-[10px] text-slate-500 uppercase font-bold tracking-wider">Sisa Waktu</span>
             <div className={`text-sm md:text-xl font-mono font-bold leading-none ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-800'}`}>
               {formatTime(timeLeft)}
             </div>
           </div>
           
           <button onClick={() => setIsMobileNavOpen(true)} className="md:hidden p-2 bg-slate-100 rounded-lg text-slate-600">
             <Grid size={20} />
           </button>

           <button 
            onClick={() => { recordTime(); setShowConfirm(true); }}
            className="hidden md:flex bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all text-sm items-center gap-2"
           >
             <CheckCircle size={18} /> Selesai
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex relative">
        <div className="hidden md:flex w-80 bg-white border-r border-slate-200 flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
           <div className="p-6 border-b border-slate-100">
             <div className="flex justify-between text-sm mb-2 text-slate-600">
               <span className="font-semibold">Progres</span>
               <span className="font-bold text-emerald-600">{Math.round(progress)}%</span>
             </div>
             <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out" style={{width: `${progress}%`}}></div>
             </div>
           </div>
           <div className="flex-1 overflow-y-auto p-6">
             <QuestionGrid />
             <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <div className="w-3 h-3 rounded bg-emerald-600"></div> Sedang dibuka
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <div className="w-3 h-3 rounded bg-emerald-50 border border-emerald-200"></div> Sudah dijawab
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-300"></div> Ragu-ragu
                </div>
             </div>
           </div>
        </div>

        {isMobileNavOpen && (
          <div className="absolute inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileNavOpen(false)}></div>
            <div className="absolute right-0 top-0 bottom-0 w-3/4 bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-200">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-lg text-slate-800">Navigasi Soal</h3>
                 <button onClick={() => setIsMobileNavOpen(false)} className="p-2 bg-slate-100 rounded-full"><X size={18}/></button>
              </div>
              <div className="mb-6">
                 <div className="flex justify-between text-sm mb-2 text-slate-600">
                   <span className="font-semibold">Progres</span>
                   <span className="font-bold text-emerald-600">{Math.round(progress)}%</span>
                 </div>
                 <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{width: `${progress}%`}}></div>
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                 <QuestionGrid />
              </div>
              <button 
                 onClick={() => { recordTime(); setShowConfirm(true); }}
                 className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg"
               >
                 Selesai Ujian
               </button>
            </div>
          </div>
        )}

        <div className="flex-1 p-4 md:p-10 overflow-y-auto bg-slate-50/50 scroll-smooth">
           <div className="max-w-4xl mx-auto pb-24 md:pb-20">
             <div className="bg-white p-5 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-slate-200 mb-4 md:mb-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 md:w-2 h-full bg-emerald-500"></div>
               <div className="flex justify-between items-start mb-4 md:mb-8">
                 <div className="flex items-center gap-3">
                   <span className="px-3 py-1 md:px-4 md:py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs md:text-sm font-bold border border-emerald-100">
                     Soal No. {currentQ + 1}
                   </span>
                 </div>
                 <button 
                   onClick={() => toggleFlag(exam.questions[currentQ].id)}
                   className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors border
                     ${flagged.has(exam.questions[currentQ].id) 
                       ? 'bg-yellow-100 text-yellow-700 border-yellow-200' 
                       : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}
                 >
                   <Flag size={14} fill={flagged.has(exam.questions[currentQ].id) ? "currentColor" : "none"} />
                   <span className="hidden md:inline">Ragu-ragu</span>
                 </button>
               </div>
               
               <p className="text-base md:text-2xl text-slate-800 leading-relaxed font-medium">
                 {exam.questions[currentQ].text}
               </p>
             </div>

             <div className="space-y-3 md:space-y-4">
               {exam.questions[currentQ].options.map((opt, idx) => {
                 const isSelected = answers[exam.questions[currentQ].id] === idx;
                 return (
                   <button
                     key={idx}
                     onClick={() => handleAnswer(idx)}
                     className={`w-full p-4 md:p-6 rounded-xl md:rounded-2xl text-left flex items-start md:items-center gap-3 md:gap-6 border md:border-2 transition-all group relative overflow-hidden
                       ${isSelected
                         ? 'border-emerald-500 bg-white shadow-md' 
                         : 'border-transparent bg-white shadow-sm hover:border-emerald-200 hover:shadow-md'}`}
                   >
                     {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 bg-emerald-500"></div>}
                     
                     <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center border md:border-2 font-bold text-sm md:text-lg transition-colors shrink-0 mt-0.5 md:mt-0
                       ${isSelected
                         ? 'bg-emerald-600 border-emerald-600 text-white' 
                         : 'border-slate-200 text-slate-400 group-hover:border-emerald-300 group-hover:text-emerald-500'}`}>
                       {String.fromCharCode(65 + idx)}
                     </div>
                     <span className={`text-sm md:text-lg ${isSelected ? 'text-emerald-900 font-semibold' : 'text-slate-600'}`}>
                       {opt}
                     </span>
                   </button>
                 );
               })}
             </div>

             <div className="flex justify-between mt-8 md:mt-10 gap-3">
               <button 
                 disabled={currentQ === 0}
                 onClick={() => handleNavigation(currentQ - 1)}
                 className="flex-1 md:flex-none px-4 md:px-8 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white font-bold transition-all flex items-center justify-center gap-2 shadow-sm text-sm md:text-base"
               >
                 <ChevronRight className="rotate-180" size={18} /> <span className="hidden md:inline">Sebelumnya</span>
               </button>
               
               {currentQ < exam.questions.length - 1 ? (
                 <button 
                   onClick={() => handleNavigation(currentQ + 1)}
                   className="flex-1 md:flex-none px-4 md:px-8 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                 >
                   <span className="hidden md:inline">Selanjutnya</span> <ChevronRight size={18} />
                 </button>
               ) : (
                 <button 
                   onClick={() => { recordTime(); setShowConfirm(true); }}
                   className="flex-1 md:flex-none px-4 md:px-8 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                 >
                   Selesai <CheckCircle size={18} />
                 </button>
               )}
             </div>
           </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl transform scale-100">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600">
               <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Kumpulkan Jawaban?</h3>
            <p className="text-center text-slate-500 mb-6 text-sm md:text-base">
              Antum masih memiliki waktu <b>{formatTime(timeLeft)}</b>. 
              {Object.keys(answers).length < exam.questions.length && <span className="text-red-500 block mt-1 font-bold">Ada {exam.questions.length - Object.keys(answers).length} soal belum dijawab!</span>}
              <br/>Yakin ingin mengakhiri ujian ini?
            </p>
            <div className="flex gap-3 flex-col md:flex-row">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition text-sm">
                Periksa Lagi
              </button>
              <button onClick={handleSubmit} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition text-sm">
                Ya, Kumpulkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 4. SIDEBAR ITEM
const SidebarItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 group relative overflow-hidden ${active ? 'bg-emerald-800 text-white shadow-lg shadow-emerald-900/20' : 'text-emerald-100 hover:bg-emerald-800/50 hover:text-white'}`}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400"></div>}
    <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
      {icon}
    </div>
    <span className={`font-medium text-sm tracking-wide ${active ? 'font-bold' : ''}`}>{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>}
  </button>
);

// 5. STAT CARD
const StatCard = ({ title, value, icon, bg, trend }: { title: string, value: string | number, icon: React.ReactNode, bg: string, trend: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6 ${bg}`}>
        {icon}
      </div>
      <div className="px-2 py-1 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wider border border-slate-100">
        {trend}
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-slate-800">{value}</p>
  </div>
);

// 6. MAIN DASHBOARD LAYOUT
const App: React.FC = () => {
  // State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [banks, setBanks] = useState<QuestionBank[]>(INITIAL_BANKS);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);
  const [results, setResults] = useState<ExamResult[]>([]);
  // Use state for live sessions instead of static mock data
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  
  // UI State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [toast, setToast] = useState<{msg: string, type: 'success'|'error'} | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeBank, setActiveBank] = useState<QuestionBank | null>(null); // For viewing bank details
  
  // Modals
  const [showAddUser, setShowAddUser] = useState(false);
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showAddBank, setShowAddBank] = useState(false);

  // Filters
  const [filterTingkat, setFilterTingkat] = useState<Tingkat | 'All'>('All');

  // Form States
  const [newUser, setNewUser] = useState({ name: '', username: '', role: 'student' as Role, tingkat: 'Idadiyah' as Tingkat });
  const [newBank, setNewBank] = useState<Partial<QuestionBank>>({ fan: '', bab: '', tingkat: 'Ibtidaiyah', kelas: '', description: '' });
  const [newExam, setNewExam] = useState<Partial<Exam>>({ 
    title: '', subject: '', tingkat: 'Ibtidaiyah', durationMinutes: 60, questions: [], 
    scheduledStart: '', scheduledEnd: '' 
  });
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set());
  const [selectedBankIdForExam, setSelectedBankIdForExam] = useState<string>(''); // For exam creation

  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({ 
    text: '', options: ['', '', '', ''], correctAnswer: 0, subject: '', bab: '', tingkat: 'Ibtidaiyah' 
  });
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  // --- Handlers ---
  
  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
  };

  const handleUpdateLiveSession = (studentId: string, examId: string, progress: number, status: LiveSession['status']) => {
    setLiveSessions(prev => {
      const existing = prev.findIndex(s => s.studentId === studentId && s.examId === examId);
      if (existing !== -1) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], progress, status };
        return updated;
      } else {
        return [...prev, { studentId, examId, startTime: new Date().toISOString(), progress, status }];
      }
    });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.username) return showToast("Nama dan Username wajib diisi!", "error");
    
    const roleToAdd = currentUser?.role === 'teacher' ? 'student' : newUser.role;

    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      username: newUser.username,
      role: roleToAdd,
      tingkat: roleToAdd === 'student' ? newUser.tingkat : undefined,
      joinedAt: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, user]);
    setShowAddUser(false);
    setNewUser({ name: '', username: '', role: 'student', tingkat: 'Idadiyah' });
    showToast("User berhasil ditambahkan!", "success");
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    showToast("User berhasil dihapus", "success");
  };

  const handleSaveBank = () => {
    if (!newBank.fan || !newBank.bab) return showToast("Fan (Mapel) dan Bab wajib diisi!", "error");
    
    const bank: QuestionBank = {
      id: `b${Date.now()}`,
      fan: newBank.fan!,
      bab: newBank.bab!,
      tingkat: newBank.tingkat || 'Ibtidaiyah',
      kelas: newBank.kelas || '',
      description: newBank.description || '',
      createdAt: new Date().toISOString()
    };
    setBanks([...banks, bank]);
    setShowAddBank(false);
    setNewBank({ fan: '', bab: '', tingkat: 'Ibtidaiyah', kelas: '', description: '' });
    showToast("Kelompok Bank Soal berhasil dibuat!", "success");
  };

  const handleDeleteBank = (id: string) => {
    if(confirm("Hapus kelompok bank soal ini? Semua soal di dalamnya akan ikut terhapus.")) {
      setBanks(banks.filter(b => b.id !== id));
      setQuestions(questions.filter(q => q.bankId !== id)); // Cascade delete
      showToast("Bank soal dihapus.", "success");
    }
  };

  const openAddQuestionModal = (bank: QuestionBank) => {
    setEditingQuestionId(null);
    setNewQuestion({ 
      text: '', options: ['', '', '', ''], correctAnswer: 0, 
      // Inherit metadata from Bank
      bankId: bank.id,
      subject: bank.fan,
      bab: bank.bab,
      tingkat: bank.tingkat 
    });
    setShowAddQuestion(true);
  };

  const openEditQuestionModal = (q: Question) => {
    setEditingQuestionId(q.id);
    setNewQuestion({...q});
    setShowAddQuestion(true);
  }

  const handleSaveQuestion = () => {
    if (!newQuestion.text || newQuestion.options?.some(o => !o)) 
      return showToast("Lengkapi redaksi soal dan opsi jawaban!", "error");

    if (editingQuestionId) {
      // Edit Mode
      setQuestions(questions.map(q => q.id === editingQuestionId ? {
        ...q,
        ...newQuestion,
        text: newQuestion.text!,
        options: newQuestion.options!,
        correctAnswer: newQuestion.correctAnswer!,
      } as Question : q));
      showToast("Soal berhasil diperbarui!", "success");
    } else {
      // Add Mode
      const q: Question = {
        id: `q${Date.now()}`,
        bankId: newQuestion.bankId!,
        text: newQuestion.text!,
        options: newQuestion.options!,
        correctAnswer: newQuestion.correctAnswer!,
        subject: newQuestion.subject!,
        bab: newQuestion.bab!,
        tingkat: newQuestion.tingkat || 'Ibtidaiyah',
        createdAt: new Date().toISOString()
      };
      setQuestions([...questions, q]);
      showToast("Soal berhasil ditambahkan ke Bank Soal!", "success");
    }
    
    setShowAddQuestion(false);
  };

  const handleDeleteQuestion = (id: string) => {
    if(confirm("Yakin ingin menghapus soal ini?")) {
      setQuestions(questions.filter(q => q.id !== id));
      showToast("Soal dihapus dari Bank Soal.", "success");
    }
  };

  const handleSaveExam = () => {
    if (!newExam.title || selectedQuestionIds.size === 0) return showToast("Judul ujian wajib diisi dan minimal pilih 1 soal!", "error");
    if (!newExam.scheduledStart || !newExam.scheduledEnd) return showToast("Jadwal ujian belum diatur!", "error");
    
    const selectedQs = questions.filter(q => selectedQuestionIds.has(q.id));
    // Derive metadata from the first selected question (assuming homogenous selection from a bank)
    const metaSource = selectedQs[0];

    const exam: Exam = {
      id: `e${Date.now()}`,
      title: newExam.title!,
      subject: metaSource.subject,
      tingkat: metaSource.tingkat,
      durationMinutes: newExam.durationMinutes || 60,
      questions: selectedQs,
      status: 'active',
      authorId: currentUser?.id || 'unknown',
      createdAt: new Date().toISOString(),
      scheduledStart: newExam.scheduledStart!,
      scheduledEnd: newExam.scheduledEnd!
    };
    
    setExams([...exams, exam]);
    setShowCreateExam(false);
    setNewExam({ title: '', subject: '', tingkat: 'Ibtidaiyah', durationMinutes: 60, questions: [], scheduledStart: '', scheduledEnd: '' });
    setSelectedQuestionIds(new Set());
    setSelectedBankIdForExam('');
    showToast("Jadwal Ujian berhasil diterbitkan!", "success");
  };

  const toggleQuestionSelection = (qId: string) => {
    const newSet = new Set(selectedQuestionIds);
    if (newSet.has(qId)) newSet.delete(qId);
    else newSet.add(qId);
    setSelectedQuestionIds(newSet);
  };

  const handleSelectBankForExam = (bankId: string) => {
    setSelectedBankIdForExam(bankId);
    setSelectedQuestionIds(new Set()); // Reset selection when bank changes
  };

  const handleSelectAllQuestions = (bankId: string) => {
    const bankQuestions = questions.filter(q => q.bankId === bankId);
    const newSet = new Set(selectedQuestionIds);
    const allSelected = bankQuestions.every(q => newSet.has(q.id));

    if (allSelected) {
      bankQuestions.forEach(q => newSet.delete(q.id));
    } else {
      bankQuestions.forEach(q => newSet.add(q.id));
    }
    setSelectedQuestionIds(newSet);
  };

  // Helper to format duration
  const formatDurationSimple = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m > 0 ? `${m}m ${s}d` : `${s} detik`;
  };

  // --- Render ---

  if (!currentUser) {
    return <LoginView onLogin={setCurrentUser} users={users} />;
  }

  if (activeExam && currentUser.role === 'student') {
    return (
      <ExamRunner 
        exam={activeExam} 
        student={currentUser} 
        onUpdateSession={(progress, status) => {
          handleUpdateLiveSession(currentUser.id, activeExam.id, progress, status);
        }}
        onFinish={(res) => {
          setResults(prev => [...prev, res]);
          setActiveExam(null);
          setActiveTab('history');
          showToast("Alhamdulillah, ujian telah dikumpulkan!", "success");
        }} 
      />
    );
  }

  const roleDisplay = {
    'admin': 'Administrator',
    'teacher': 'Ustadz / Ustadzah',
    'student': 'Santri'
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 overflow-hidden">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-[#064e3b] text-emerald-100 flex flex-col transition-transform duration-300 shadow-2xl md:shadow-xl md:translate-x-0 md:relative md:flex shrink-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 md:p-8 flex items-center gap-4 border-b border-emerald-800">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shadow-lg">
            <BookMarked size={20} />
          </div>
          <div>
            <span className="font-bold text-xl text-white tracking-tight block">Ma'had App</span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-semibold">Sistem Akademik</span>
          </div>
          <button className="ml-auto md:hidden text-emerald-300" onClick={() => setIsSidebarOpen(false)}><X/></button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={<LayoutDashboard size={20}/>} label="Beranda" active={activeTab === 'dashboard'} onClick={() => {setActiveTab('dashboard'); setIsSidebarOpen(false);}} />
          
          {currentUser.role === 'teacher' && (
            <>
              <div className="pt-4 pb-2 px-4 text-xs font-bold text-emerald-400/70 uppercase tracking-wider">Menu Ustadz</div>
              <SidebarItem icon={<Layers size={20}/>} label="Bank Soal" active={activeTab === 'bank_soal'} onClick={() => {setActiveTab('bank_soal'); setIsSidebarOpen(false);}} />
              <SidebarItem icon={<Calendar size={20}/>} label="Jadwal Imtihan" active={activeTab === 'schedule'} onClick={() => {setActiveTab('schedule'); setIsSidebarOpen(false);}} />
              <SidebarItem icon={<Activity size={20}/>} label="Monitor Ujian" active={activeTab === 'monitor'} onClick={() => {setActiveTab('monitor'); setIsSidebarOpen(false);}} />
              <SidebarItem icon={<BarChart3 size={20}/>} label="Analisa Nilai" active={activeTab === 'analytics'} onClick={() => {setActiveTab('analytics'); setIsSidebarOpen(false);}} />
              <SidebarItem icon={<Users size={20}/>} label="Data Santri" active={activeTab === 'students_manage'} onClick={() => {setActiveTab('students_manage'); setIsSidebarOpen(false);}} />
            </>
          )}
          
          {currentUser.role === 'student' && (
            <>
              <div className="pt-4 pb-2 px-4 text-xs font-bold text-emerald-400/70 uppercase tracking-wider">Menu Santri</div>
              <SidebarItem icon={<BookOpen size={20}/>} label="Daftar Ujian" active={activeTab === 'exams'} onClick={() => {setActiveTab('exams'); setIsSidebarOpen(false);}} />
              <SidebarItem icon={<CheckCircle size={20}/>} label="Riwayat Nilai" active={activeTab === 'history'} onClick={() => {setActiveTab('history'); setIsSidebarOpen(false);}} />
            </>
          )}
          
          {currentUser.role === 'admin' && (
             <>
               <div className="pt-4 pb-2 px-4 text-xs font-bold text-emerald-400/70 uppercase tracking-wider">Administrasi</div>
               <SidebarItem icon={<Users size={20}/>} label="Manajemen User" active={activeTab === 'users'} onClick={() => {setActiveTab('users'); setIsSidebarOpen(false);}} />
             </>
          )}
        </nav>

        <div className="p-4 border-t border-emerald-800 bg-[#064e3b]">
          <button onClick={() => {setShowChat(!showChat); setIsSidebarOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-3 border ${showChat ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg' : 'bg-emerald-900/50 border-emerald-800 hover:bg-emerald-800'}`}>
            <div className="bg-white/10 p-1 rounded-md"><Search className="text-yellow-300" size={14} /></div>
            <span className="font-medium text-sm">Tanya Ustadz Bot</span>
          </button>
          
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0 border border-emerald-400">
              {currentUser.username[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
               <p className="text-xs text-emerald-300 truncate capitalize">{roleDisplay[currentUser.role]}</p>
            </div>
            <button onClick={() => setCurrentUser(null)} className="p-2 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition text-emerald-400" title="Keluar">
               <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-slate-50 w-full">
        {/* Header */}
        <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600"
            >
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-slate-800 capitalize tracking-tight truncate max-w-[200px] md:max-w-none">
                {activeTab === 'users' ? 'Manajemen User' : 
                 activeTab === 'bank_soal' ? (activeBank ? activeBank.fan : 'Bank Soal') :
                 activeTab === 'schedule' ? 'Jadwal Imtihan' :
                 activeTab.replace('_', ' ')}
              </h2>
              <p className="hidden md:block text-slate-500 text-xs mt-0.5">
                Ahlan wa sahlan, {currentUser.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <span className="hidden md:inline px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
               {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
             </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative scroll-smooth">
          
          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <StatCard 
                  title="Total Ujian" 
                  value={exams.length} 
                  icon={<BookOpen className="text-emerald-600" size={24}/>} 
                  bg="bg-emerald-100" 
                  trend="Aktif"
                />
                <StatCard 
                  title="Total Santri" 
                  value={users.filter(u => u.role === 'student').length} 
                  icon={<Users className="text-blue-600" size={24}/>} 
                  bg="bg-blue-100" 
                  trend="Terdaftar"
                />
                <StatCard 
                  title="Total Bank Soal" 
                  value={banks.length} 
                  icon={<Layers className="text-purple-600" size={24}/>} 
                  bg="bg-purple-100"
                  trend="Kelompok"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                 <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <BookMarked size={120} className="text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-slate-800 relative z-10">Selamat Datang di Sistem Pesantren</h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl relative z-10 mb-6">
                      Assalamu'alaikum Warahmatullahi Wabarakatuh. Silakan gunakan menu di samping untuk mengelola kegiatan akademik, bank soal, dan jadwal ujian.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 relative z-10">
                      <button onClick={() => setShowChat(true)} className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-sm">
                        <Search size={18} /> Tanya Ustadz Bot
                      </button>
                      {currentUser.role === 'teacher' && (
                        <button onClick={() => setActiveTab('schedule')} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition text-sm">
                          Lihat Jadwal
                        </button>
                      )}
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* TEACHER: BANK SOAL - GROUP VIEW & DETAIL VIEW */}
          {activeTab === 'bank_soal' && currentUser.role === 'teacher' && (
            <div className="space-y-6">
              {!activeBank ? (
                // VIEW 1: LIST OF QUESTION BANKS
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm sticky top-0 z-20">
                     <div>
                        <h3 className="font-bold text-slate-800">Kelompok Bank Soal</h3>
                        <p className="text-xs text-slate-500">Kelola kumpulan soal per Mapel dan Bab</p>
                     </div>
                     <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <div className="relative">
                          <select 
                            value={filterTingkat} 
                            onChange={(e) => setFilterTingkat(e.target.value as any)}
                            className="w-full sm:w-48 px-4 py-2 border rounded-lg text-sm bg-slate-50 focus:ring-emerald-500 outline-none appearance-none font-medium"
                          >
                            <option value="All">Semua Tingkat</option>
                            <option value="Idadiyah">Idadiyah</option>
                            <option value="Ibtidaiyah">Ibtidaiyah</option>
                            <option value="Tsanawiyah">Tsanawiyah</option>
                            <option value="Aliyah">Aliyah</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16}/>
                        </div>
                        <button onClick={() => setShowAddBank(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20 font-bold text-sm">
                           <FolderPlus size={16} /> Buat Kelompok
                        </button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {banks
                      .filter(b => filterTingkat === 'All' || b.tingkat === filterTingkat)
                      .map(bank => {
                        const qCount = questions.filter(q => q.bankId === bank.id).length;
                        return (
                          <div key={bank.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition group relative overflow-hidden cursor-pointer" onClick={() => setActiveBank(bank)}>
                             <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 group-hover:bg-emerald-100 transition-colors"></div>
                             
                             <div className="relative z-10">
                               <div className="flex justify-between items-start mb-3">
                                  <div className={`p-2 rounded-lg ${bank.tingkat === 'Aliyah' ? 'bg-purple-100 text-purple-600' : bank.tingkat === 'Tsanawiyah' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    <Layers size={20} />
                                  </div>
                                  <div className="text-right">
                                     <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{bank.tingkat}</span>
                                     {bank.kelas && <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-bold">Kelas {bank.kelas}</span>}
                                  </div>
                               </div>
                               
                               <h4 className="font-bold text-lg text-slate-800 leading-snug mb-1">{bank.fan}</h4>
                               <p className="text-sm text-slate-500 font-medium mb-4 flex items-center gap-1"><Folder size={14}/> {bank.bab}</p>
                               
                               <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                                  <span className="text-xs text-slate-500 font-bold bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">{qCount} Soal</span>
                                  <div className="flex gap-2">
                                     <button 
                                      onClick={(e) => { e.stopPropagation(); handleDeleteBank(bank.id); }}
                                      className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded transition"
                                     >
                                       <Trash2 size={16}/>
                                     </button>
                                     <button className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline">
                                       Lihat Soal <ChevronRight size={14}/>
                                     </button>
                                  </div>
                               </div>
                             </div>
                          </div>
                        );
                      })}
                      {banks.length === 0 && (
                        <div className="col-span-full text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
                          Belum ada kelompok bank soal. Silakan buat baru.
                        </div>
                      )}
                  </div>
                </>
              ) : (
                // VIEW 2: QUESTION LIST WITHIN A BANK
                <>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm sticky top-0 z-20">
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-3">
                           <button onClick={() => setActiveBank(null)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                             <ArrowLeft size={20}/>
                           </button>
                           <div>
                              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                {activeBank.fan}
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{activeBank.tingkat}</span>
                              </h3>
                              <p className="text-sm text-slate-500 flex items-center gap-1">
                                <Folder size={14} /> {activeBank.bab} 
                                {activeBank.kelas && <span className="mx-1">• Kelas {activeBank.kelas}</span>}
                              </p>
                           </div>
                        </div>
                        <button onClick={() => openAddQuestionModal(activeBank)} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20 font-bold text-sm">
                           <Plus size={16} /> Tambah Soal
                        </button>
                     </div>
                  </div>

                  <div className="space-y-3">
                    {questions.filter(q => q.bankId === activeBank.id).map((q, idx) => (
                      <div key={q.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition shadow-sm group">
                         <div className="flex justify-between items-start gap-4">
                            <div className="flex gap-3 flex-1">
                               <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                                 {idx + 1}
                               </div>
                               <div className="flex-1">
                                  <p className="text-slate-800 font-medium mb-3 leading-relaxed">{q.text}</p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                     {q.options.map((opt, i) => (
                                       <div key={i} className={`px-3 py-1.5 rounded border flex items-center gap-2 ${i === q.correctAnswer ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                                          <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 border-current">
                                            {String.fromCharCode(65+i)}
                                          </span>
                                          {opt}
                                       </div>
                                     ))}
                                  </div>
                               </div>
                            </div>
                            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button onClick={() => openEditQuestionModal(q)} className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit size={16}/></button>
                               <button onClick={() => handleDeleteQuestion(q.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={16}/></button>
                            </div>
                         </div>
                      </div>
                    ))}
                    {questions.filter(q => q.bankId === activeBank.id).length === 0 && (
                      <div className="text-center py-12 text-slate-400">
                        Belum ada soal di kelompok ini.
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* TEACHER: SCHEDULE & EXAM CREATION */}
          {activeTab === 'schedule' && currentUser.role === 'teacher' && !showCreateExam && (
             <div className="space-y-6">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                     <h3 className="font-bold text-xl text-slate-800">Jadwal Imtihan (Ujian)</h3>
                     <p className="text-slate-500 text-sm">Kelola jadwal ujian aktif dari Bank Soal</p>
                  </div>
                  <button onClick={() => setShowCreateExam(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20 font-bold text-sm">
                    <Plus size={18} /> Buat Jadwal Ujian
                  </button>
                </div>

                <div className="space-y-4">
                  {exams.sort((a,b) => new Date(a.scheduledStart || '').getTime() - new Date(b.scheduledStart || '').getTime()).map(exam => {
                     const now = new Date();
                     const start = new Date(exam.scheduledStart || '');
                     const end = new Date(exam.scheduledEnd || '');
                     let status = 'upcoming';
                     let statusColor = 'bg-blue-100 text-blue-700 border-blue-200';
                     
                     if (now >= start && now <= end) {
                       status = 'active';
                       statusColor = 'bg-emerald-100 text-emerald-700 border-emerald-200 animate-pulse';
                     } else if (now > end) {
                       status = 'ended';
                       statusColor = 'bg-slate-100 text-slate-500 border-slate-200';
                     }

                     return (
                       <div key={exam.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center gap-6">
                          <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-100 min-w-[80px]">
                             <span className="text-xs font-bold text-slate-500 uppercase">{start.toLocaleString('default', { month: 'short' })}</span>
                             <span className="text-2xl font-bold text-slate-800">{start.getDate()}</span>
                          </div>
                          <div className="flex-1">
                             <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-bold text-lg text-slate-800">{exam.title}</h4>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusColor}`}>
                                   {status === 'active' ? 'Sedang Berlangsung' : status === 'ended' ? 'Selesai' : 'Akan Datang'}
                                </span>
                             </div>
                             <p className="text-sm text-slate-500 mb-2">{exam.subject} • {exam.tingkat} • {exam.durationMinutes} Menit</p>
                             <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                                <span className="flex items-center gap-1"><Clock size={12}/> {start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                             </div>
                          </div>
                          <div className="flex gap-2">
                             <div className="text-sm text-slate-500 flex items-center gap-1"><FileQuestion size={14}/> {exam.questions.length} Soal</div>
                          </div>
                       </div>
                     );
                  })}
                </div>
             </div>
          )}

          {/* TEACHER: CREATE EXAM WIZARD - UPDATED FLOW */}
          {activeTab === 'schedule' && currentUser.role === 'teacher' && showCreateExam && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
               <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                  <h3 className="font-bold text-lg text-slate-800">Buat Jadwal Ujian Baru</h3>
                  <button onClick={() => {setShowCreateExam(false); setSelectedBankIdForExam('');}} className="text-slate-400 hover:text-red-500"><X size={20}/></button>
               </div>
               
               <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-6 space-y-5 overflow-y-auto border-r border-slate-100">
                     <h4 className="font-bold text-emerald-600 border-b border-emerald-100 pb-2 mb-4 flex items-center gap-2">
                       <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">1</span>
                       Pilih Bank Soal & Waktu
                     </h4>
                     
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Kelompok Bank Soal</label>
                        <select 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50"
                          value={selectedBankIdForExam}
                          onChange={(e) => handleSelectBankForExam(e.target.value)}
                        >
                          <option value="">-- Pilih Bank Soal --</option>
                          {banks.map(b => (
                            <option key={b.id} value={b.id}>{b.fan} - {b.bab} ({b.tingkat})</option>
                          ))}
                        </select>
                     </div>

                     {selectedBankIdForExam && (
                       <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-sm text-emerald-800 space-y-1 animate-in fade-in slide-in-from-top-2">
                          <p><strong>Mapel:</strong> {banks.find(b => b.id === selectedBankIdForExam)?.fan}</p>
                          <p><strong>Bab:</strong> {banks.find(b => b.id === selectedBankIdForExam)?.bab}</p>
                          <p><strong>Tingkat:</strong> {banks.find(b => b.id === selectedBankIdForExam)?.tingkat}</p>
                       </div>
                     )}

                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Judul Ujian</label>
                        <input type="text" className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 outline-none" 
                          placeholder="Contoh: Imtihan Akhir Bab Shalat"
                          value={newExam.title} onChange={e => setNewExam({...newExam, title: e.target.value})} 
                        />
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Mulai</label>
                           <input type="datetime-local" className="w-full px-4 py-2 rounded-lg border text-sm"
                            value={newExam.scheduledStart} onChange={e => setNewExam({...newExam, scheduledStart: e.target.value})} />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Selesai</label>
                           <input type="datetime-local" className="w-full px-4 py-2 rounded-lg border text-sm"
                            value={newExam.scheduledEnd} onChange={e => setNewExam({...newExam, scheduledEnd: e.target.value})} />
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Durasi (Menit)</label>
                        <input type="number" className="w-full px-4 py-2 rounded-lg border"
                          value={newExam.durationMinutes} onChange={e => setNewExam({...newExam, durationMinutes: parseInt(e.target.value) || 0})} />
                     </div>
                  </div>

                  <div className="flex flex-col h-full bg-slate-50/50">
                     <div className="p-4 border-b border-slate-200 bg-white shrink-0">
                       <h4 className="font-bold text-emerald-600 flex justify-between items-center">
                         <span className="flex items-center gap-2">
                           <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">2</span>
                           Pilih Soal ({selectedQuestionIds.size} dipilih)
                         </span>
                         {selectedBankIdForExam && (
                           <button 
                             onClick={() => handleSelectAllQuestions(selectedBankIdForExam)}
                             className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-slate-600 font-medium flex items-center gap-2 transition"
                           >
                             <ListChecks size={14}/> Pilih Semua
                           </button>
                         )}
                       </h4>
                     </div>
                     
                     <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                        {!selectedBankIdForExam ? (
                          <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <Layers size={48} className="mb-2 opacity-20"/>
                            <p>Silakan pilih Bank Soal terlebih dahulu.</p>
                          </div>
                        ) : (
                          questions.filter(q => q.bankId === selectedBankIdForExam).length === 0 ? (
                             <div className="text-center py-8 text-slate-400">Bank soal ini kosong.</div>
                          ) : (
                            questions
                              .filter(q => q.bankId === selectedBankIdForExam)
                              .map(q => (
                                 <div 
                                   key={q.id} 
                                   onClick={() => toggleQuestionSelection(q.id)}
                                   className={`p-3 rounded-xl border cursor-pointer transition-all flex gap-3 items-start group
                                     ${selectedQuestionIds.has(q.id) ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500' : 'bg-white border-slate-200 hover:border-emerald-300'}`}
                                 >
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors
                                      ${selectedQuestionIds.has(q.id) ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 group-hover:border-emerald-400'}`}>
                                      {selectedQuestionIds.has(q.id) && <Check size={12}/>}
                                    </div>
                                    <div className="flex-1">
                                       <p className="text-sm text-slate-800 font-medium line-clamp-3 leading-relaxed">{q.text}</p>
                                    </div>
                                 </div>
                              ))
                          )
                        )}
                     </div>

                     <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                        <button onClick={handleSaveExam} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2">
                            <Save size={18}/> Terbitkan Jadwal Ujian
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* TEACHER: ADD BANK MODAL */}
          {showAddBank && (
            <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl text-slate-800">Buat Kelompok Bank Soal</h3>
                    <button onClick={() => setShowAddBank(false)}><X size={24} className="text-slate-400"/></button>
                 </div>
                 <div className="space-y-4">
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1">Fan / Mapel</label>
                       <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 outline-none" placeholder="Misal: Fiqih"
                          value={newBank.fan} onChange={e => setNewBank({...newBank, fan: e.target.value})} />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1">Bab / Fasal</label>
                       <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 outline-none" placeholder="Misal: Shalat Sunnah"
                          value={newBank.bab} onChange={e => setNewBank({...newBank, bab: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">Tingkat</label>
                          <select className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 outline-none bg-white" 
                            value={newBank.tingkat} onChange={e => setNewBank({...newBank, tingkat: e.target.value as Tingkat})}>
                             <option value="Idadiyah">Idadiyah</option>
                             <option value="Ibtidaiyah">Ibtidaiyah</option>
                             <option value="Tsanawiyah">Tsanawiyah</option>
                             <option value="Aliyah">Aliyah</option>
                          </select>
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">Kelas (Opsional)</label>
                          <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 outline-none" placeholder="Contoh: 1 A"
                             value={newBank.kelas} onChange={e => setNewBank({...newBank, kelas: e.target.value})} />
                       </div>
                    </div>
                    <button onClick={handleSaveBank} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl mt-4 shadow-lg">Simpan Kelompok</button>
                 </div>
              </div>
            </div>
          )}

          {/* TEACHER: ADD/EDIT QUESTION MODAL (Refactored to be simpler since meta is inherited) */}
          {showAddQuestion && (
            <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl text-slate-800">
                      {editingQuestionId ? 'Edit Soal' : 'Tambah Soal Baru'}
                    </h3>
                    <button onClick={() => setShowAddQuestion(false)}><X size={24} className="text-slate-400"/></button>
                 </div>
                 
                 <div className="bg-slate-50 p-4 rounded-xl mb-4 text-sm border border-slate-100 flex gap-4 text-slate-600">
                    <div className="flex items-center gap-2"><BookOpen size={16}/> <span>{newQuestion.subject}</span></div>
                    <div className="flex items-center gap-2"><Folder size={16}/> <span>{newQuestion.bab}</span></div>
                    <div className="flex items-center gap-2"><GraduationCap size={16}/> <span>{newQuestion.tingkat}</span></div>
                 </div>

                 <div className="space-y-4">
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1">Pertanyaan</label>
                       <textarea className="w-full px-4 py-3 border rounded-xl h-32 focus:ring-2 focus:ring-emerald-500 outline-none resize-none" placeholder="Tulis redaksi soal di sini..."
                          value={newQuestion.text} onChange={e => setNewQuestion({...newQuestion, text: e.target.value})} />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Pilihan Jawaban (Klik huruf untuk set kunci jawaban)</label>
                       <div className="space-y-3">
                          {newQuestion.options?.map((opt, idx) => (
                             <div key={idx} className="flex items-center gap-3">
                                <div onClick={() => setNewQuestion({...newQuestion, correctAnswer: idx})}
                                   className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer border-2 font-bold text-sm transition shrink-0
                                   ${newQuestion.correctAnswer === idx ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-300 text-slate-400 hover:border-emerald-300'}`}>
                                   {String.fromCharCode(65+idx)}
                                </div>
                                <input type="text" className="flex-1 px-4 py-2 border rounded-lg focus:ring-emerald-500 outline-none" placeholder={`Opsi ${String.fromCharCode(65+idx)}`}
                                   value={opt} onChange={e => {
                                      const newOpts = [...(newQuestion.options || [])];
                                      newOpts[idx] = e.target.value;
                                      setNewQuestion({...newQuestion, options: newOpts});
                                   }} />
                             </div>
                          ))}
                       </div>
                    </div>
                    <button onClick={handleSaveQuestion} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl mt-4 shadow-lg shadow-emerald-500/20 transition">
                      {editingQuestionId ? 'Simpan Perubahan' : 'Simpan Soal'}
                    </button>
                 </div>
              </div>
            </div>
          )}

          {/* TEACHER: MONITOR LIVE */}
          {activeTab === 'monitor' && currentUser.role === 'teacher' && (
             <div className="space-y-6">
               <div className="bg-emerald-900 text-white p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 p-6 opacity-10"><Activity size={100}/></div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Eye size={24}/> Monitor Ujian Live</h3>
                  <p className="text-emerald-200 text-sm max-w-lg">
                    Pantau aktivitas santri yang sedang ujian.
                  </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {liveSessions.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                      <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-400">
                        <Activity size={24}/>
                      </div>
                      <p>Belum ada santri yang sedang ujian saat ini.</p>
                    </div>
                 ) : (
                  liveSessions.map((session, i) => {
                   const student = users.find(u => u.id === session.studentId);
                   const exam = exams.find(e => e.id === session.examId);
                   const result = results.find(r => r.studentId === session.studentId && r.examId === session.examId);
                   const isCompleted = session.status === 'completed';
                   
                   // Metadata
                   const firstQ = exam?.questions[0];
                   const bank = banks.find(b => b.id === firstQ?.bankId);
                   
                   return (
                     <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex items-center gap-3 w-full">
                              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center font-bold text-emerald-600 shrink-0">
                                {student?.username[0].toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <p className="font-bold text-slate-800 text-sm truncate">{student?.name}</p>
                                 <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-slate-500">
                                    <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{exam?.subject}</span>
                                    <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{firstQ?.bab || '-'}</span>
                                    <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{bank?.kelas ? `Kelas ${bank.kelas}` : exam?.tingkat}</span>
                                 </div>
                              </div>
                           </div>
                           <div className={`w-3 h-3 rounded-full shrink-0 ${session.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`} title={isCompleted ? 'Selesai' : 'Sedang Mengerjakan'}></div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 bg-slate-50 p-2 rounded-lg">
                           <span className="flex items-center gap-1"><Clock size={12}/> Durasi:</span>
                           <span className="font-mono font-bold text-slate-700">
                             <SessionTimer startTime={session.startTime} status={session.status} finalDuration={result?.durationSeconds} />
                           </span>
                        </div>

                        <div className="space-y-2">
                           <div className="flex justify-between text-xs text-slate-600">
                              <span>Progress</span>
                              <span className="font-bold">{isCompleted ? 'Selesai' : `${session.progress}%`}</span>
                           </div>
                           <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div className={`h-full transition-all duration-1000 ${isCompleted ? 'bg-blue-500' : 'bg-emerald-500'}`} style={{width: `${session.progress}%`}}></div>
                           </div>
                        </div>
                     </div>
                   );
                 })
                )}
               </div>
             </div>
          )}

          {/* SHARED: USER MANAGEMENT (ADMIN or TEACHER viewing students) */}
          {(activeTab === 'users' || activeTab === 'students_manage') && (
            <div className="space-y-6">
               <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                     <h3 className="font-bold text-slate-800">
                        {activeTab === 'users' ? 'Manajemen User' : 'Data Santri'}
                     </h3>
                     <p className="text-xs text-slate-500">
                        {activeTab === 'users' ? 'Kelola akses pengguna sistem' : 'Daftar santri yang terdaftar'}
                     </p>
                  </div>
                  <button onClick={() => setShowAddUser(true)} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20 font-bold text-sm">
                     <UserPlus size={16} /> Tambah {activeTab === 'users' ? 'User' : 'Santri'}
                  </button>
               </div>
               
               <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                 <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Lengkap</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tingkat</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users
                        .filter(u => activeTab === 'users' ? true : u.role === 'student')
                        .map(user => (
                        <tr key={user.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-700">{user.name}</div>
                            <div className="text-[10px] text-slate-400">ID: {user.id}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{user.username}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${
                              user.role === 'admin' ? 'bg-red-50 text-red-600 border-red-100' : 
                              user.role === 'teacher' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{user.tingkat || '-'}</td>
                          <td className="px-6 py-4 text-right">
                             {user.id !== currentUser.id && (
                               <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-red-300 hover:bg-red-50 hover:text-red-600 rounded-lg transition" title="Hapus User">
                                 <Trash2 size={16}/>
                               </button>
                             )}
                          </td>
                        </tr>
                      ))}
                      {users.filter(u => activeTab === 'users' ? true : u.role === 'student').length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-slate-400">Tidak ada data user.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                 </div>
               </div>
            </div>
          )}

          {/* ADD USER MODAL */}
          {showAddUser && (
            <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl text-slate-800">Tambah User Baru</h3>
                    <button onClick={() => setShowAddUser(false)}><X size={24} className="text-slate-400"/></button>
                 </div>
                 <div className="space-y-4">
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
                       <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 outline-none" 
                          value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} placeholder="Nama Lengkap" />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1">Username</label>
                       <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 outline-none" 
                          value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} placeholder="Username Login" />
                    </div>
                    {currentUser.role === 'admin' && (
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">Role</label>
                         <select className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 outline-none bg-white"
                            value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value as Role})}>
                            <option value="student">Student (Santri)</option>
                            <option value="teacher">Teacher (Ustadz)</option>
                            <option value="admin">Admin</option>
                         </select>
                      </div>
                    )}
                    {(newUser.role === 'student' || currentUser.role === 'teacher') && (
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-1">Tingkat</label>
                         <select className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 outline-none bg-white"
                            value={newUser.tingkat} onChange={e => setNewUser({...newUser, tingkat: e.target.value as Tingkat})}>
                            <option value="Idadiyah">Idadiyah</option>
                            <option value="Ibtidaiyah">Ibtidaiyah</option>
                            <option value="Tsanawiyah">Tsanawiyah</option>
                            <option value="Aliyah">Aliyah</option>
                         </select>
                      </div>
                    )}
                    <button onClick={handleAddUser} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl mt-4 shadow-lg">Simpan Data</button>
                 </div>
              </div>
            </div>
          )}
          
          {/* STUDENT: EXAMS LIST */}
          {activeTab === 'exams' && currentUser.role === 'student' && (
             <div className="space-y-6">
               <h3 className="font-bold text-xl text-slate-800">Daftar Ujian Tersedia</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {exams.filter(e => e.status === 'active' && (e.tingkat === currentUser.tingkat)).length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
                      Tidak ada ujian aktif untuk tingkat {currentUser.tingkat} saat ini.
                    </div>
                 ) : (
                   exams.filter(e => e.status === 'active' && (e.tingkat === currentUser.tingkat)).map(exam => {
                      const isDone = results.some(r => r.examId === exam.id && r.studentId === currentUser.id);
                      return (
                        <div key={exam.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition group">
                           <div className="flex justify-between items-start mb-4">
                              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <BookOpen size={24}/>
                              </div>
                              {isDone && <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><CheckCircle size={12}/> Selesai</span>}
                           </div>
                           <h4 className="font-bold text-lg text-slate-800 mb-1">{exam.title}</h4>
                           <p className="text-sm text-slate-500 mb-4">{exam.subject} • {exam.durationMinutes} Menit</p>
                           <button 
                             disabled={isDone}
                             onClick={() => setActiveExam(exam)}
                             className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold rounded-lg transition shadow-lg shadow-emerald-500/20 disabled:shadow-none"
                           >
                             {isDone ? 'Sudah Dikerjakan' : 'Kerjakan Sekarang'}
                           </button>
                        </div>
                      );
                   })
                 )}
               </div>
             </div>
          )}

          {/* STUDENT: HISTORY */}
          {activeTab === 'history' && currentUser.role === 'student' && (
            <div className="space-y-6">
              <h3 className="font-bold text-xl text-slate-800">Riwayat Nilai</h3>
               <div className="grid grid-cols-1 gap-4">
                 {results.filter(r => r.studentId === currentUser.id).length === 0 ? (
                   <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
                     Belum ada riwayat ujian.
                   </div>
                 ) : (
                   results.filter(r => r.studentId === currentUser.id).map(r => {
                     const exam = exams.find(e => e.id === r.examId);
                     return (
                       <div key={r.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center hover:shadow-md transition">
                          <div>
                            <h4 className="font-bold text-lg text-slate-800">{exam?.title}</h4>
                            <p className="text-sm text-slate-500">{exam?.subject} • {new Date(r.submittedAt).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                             <div className="text-2xl font-bold text-emerald-600">{r.score}</div>
                             <div className="text-[10px] text-slate-400">Nilai Akhir</div>
                          </div>
                       </div>
                     )
                   })
                 )}
               </div>
            </div>
          )}

          {/* ANALYTICS (Placeholder) */}
          {activeTab === 'analytics' && (
             <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <BarChart3 size={64} className="mb-4 opacity-20"/>
                <h3 className="text-lg font-bold text-slate-600">Analisa Nilai</h3>
                <p>Fitur statistik dan analisa perkembangan santri akan segera hadir.</p>
             </div>
          )}

        </div>
        
        {/* Chat Interface Overlay */}
        {showChat && (
          <div className="fixed bottom-4 right-4 w-full max-w-sm h-[500px] z-50 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
             <ChatInterface onClose={() => setShowChat(false)} userName={currentUser.name} />
          </div>
        )}

      </main>
    </div>
  );
};

export default App;