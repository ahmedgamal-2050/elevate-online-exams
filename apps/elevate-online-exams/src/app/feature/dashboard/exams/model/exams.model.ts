import { PaginatedResponse } from 'apps/elevate-online-exams/src/app/core/model/api.model';

export interface ExamsResponse extends PaginatedResponse {
  exams: Exam[];
}

export interface Exam {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}
