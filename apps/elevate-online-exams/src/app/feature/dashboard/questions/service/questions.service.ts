import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardEndpoints } from '../../../../core/enum/dashboard-endpoints';
import { QuestionsResponse } from '../model/questions.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private http = inject(HttpClient);

  getAllQuestions(examId: string): Observable<QuestionsResponse> {
    const url = `${DashboardEndpoints.GET_ALL_QUESTIONS}`;
    const params = new HttpParams().set('exam', examId);
    return this.http.get<QuestionsResponse>(url, { params });
  }
}
