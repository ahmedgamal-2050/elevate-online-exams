import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DashboardEndpoints } from 'apps/elevate-online-exams/src/app/core/enum/dashboard-endpoints';
import { Observable } from 'rxjs';
import { ExamsResponse } from '../model/exams.model';

@Injectable({
  providedIn: 'root',
})
export class ExamsService {
  private http = inject(HttpClient);

  getAllExams(page = 1, subjectId = ''): Observable<ExamsResponse> {
    const url = DashboardEndpoints.GET_ALL_EXAMS;
    const params = new HttpParams().append('page', page);

    /* No data returns for all subjects */

    // if (subjectId) {
    //   params = params.append('subject', subjectId);
    // }
    return this.http.get<ExamsResponse>(url, { params });
  }
}
