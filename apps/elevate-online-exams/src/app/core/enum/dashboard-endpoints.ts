import { environment } from '../../../environments/environment';

export class DashboardEndpoints {
  static readonly GET_ALL_SUBJECTS = `${environment.baseUrl}/${environment.apiVersion}/subjects`;
  static readonly GET_ALL_EXAMS = `${environment.baseUrl}/${environment.apiVersion}/exams`;
  static readonly GET_ALL_QUESTIONS = `${environment.baseUrl}/${environment.apiVersion}/questions`;
}
