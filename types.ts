import React from 'react';

export type Role = 'admin' | 'teacher' | 'student';
export type Tingkat = 'Idadiyah' | 'Ibtidaiyah' | 'Tsanawiyah' | 'Aliyah';

export interface User {
  id: string;
  name: string;
  username: string;
  role: Role;
  joinedAt?: string;
  tingkat?: Tingkat; // Untuk santri
}

export interface QuestionBank {
  id: string;
  fan: string;      // Mapel
  bab: string;      // Fasal/Bab
  tingkat: Tingkat;
  kelas: string;    // e.g., "1 A", "2 B" (Opsional/Spesifik)
  description?: string;
  createdAt: string;
}

export interface Question {
  id: string;
  bankId: string; // Link to QuestionBank
  text: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  subject: string; // Redundant but useful for display (derived from Bank)
  bab: string;     // Redundant but useful for display (derived from Bank)
  tingkat: Tingkat;
  createdAt: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  tingkat: Tingkat;
  durationMinutes: number;
  questions: Question[]; // Soal yang dipilih untuk ujian ini
  status: 'active' | 'draft' | 'closed';
  authorId: string;
  createdAt: string;
  scheduledStart: string; // ISO String
  scheduledEnd: string;   // ISO String
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  score: number;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  submittedAt: string;
  durationSeconds?: number; // Total waktu pengerjaan dalam detik
  questionDurations?: Record<string, number>; // Waktu per soal (detik)
}

export interface LiveSession {
  studentId: string;
  examId: string;
  startTime: string;
  progress: number; // 0-100
  status: 'online' | 'idle' | 'offline' | 'completed';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface TechItem {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  codeSnippet: string;
}