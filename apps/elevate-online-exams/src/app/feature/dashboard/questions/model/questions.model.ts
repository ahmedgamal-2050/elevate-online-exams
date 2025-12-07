import { Exam } from '../../exams/model/exams.model';

export interface Question {
  _id: string;
  question: string;
  answers: Answer[];
  type: string;
  correct: string;
  subject: null;
  exam: Exam;
  createdAt: string;
}

export interface Answer {
  answer: string;
  key: string;
}

export interface QuestionsResponse {
  message: string;
  questions: Question[];
}
