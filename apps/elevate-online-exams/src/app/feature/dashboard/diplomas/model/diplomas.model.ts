import { PaginatedResponse } from 'apps/elevate-online-exams/src/app/core/model/api.model';

export interface SubjectsResponse extends PaginatedResponse {
  subjects: Subject[];
}

export interface Subject {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
}
