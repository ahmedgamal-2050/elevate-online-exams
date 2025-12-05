import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DashboardEndpoints } from 'apps/elevate-online-exams/src/app/core/enum/dashboard-endpoints';
import { Observable } from 'rxjs';
import { SubjectsResponse } from '../model/diplomas.model';

@Injectable({
  providedIn: 'root',
})
export class DiplomasService {
  private http = inject(HttpClient);

  getAllSubjects(page = 1): Observable<SubjectsResponse> {
    const url = DashboardEndpoints.GET_ALL_SUBJECTS;
    const params = new HttpParams().append('page', page);
    return this.http.get<SubjectsResponse>(url, { params });
  }
}
