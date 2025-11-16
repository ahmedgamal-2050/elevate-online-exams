import { inject, Injectable } from '@angular/core';
import { AuthApiBase } from '../base/auth-api';
import { AuthEndpoints } from '../enums/auth-endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AuthApiBase {
  private readonly http = inject(HttpClient);

  override register(data: any): Observable<any> {
    return this.http.post(AuthEndpoints.REGISTER, data);
  }

  override login(data: any): Observable<any> {
    return this.http.post(AuthEndpoints.LOGIN, data);
  }

  override changePassword(data: any): Observable<any> {
    return this.http.patch(AuthEndpoints.CHANGE_PASSWORD, data);
  }

  override deleteMyAccount(): Observable<any> {
    return this.http.delete(AuthEndpoints.DELETE_MY_ACCOUNT);
  }

  override editProfile(data: any): Observable<any> {
    return this.http.put(AuthEndpoints.EDIT_PROFILE, data);
  }

  override logout(): Observable<any> {
    return this.http.get(AuthEndpoints.LOGOUT);
  }

  override profileData(): Observable<any> {
    return this.http.get(AuthEndpoints.PROFILE_DATA);
  }

  override forgotPassword(data: any): Observable<any> {
    return this.http.post(AuthEndpoints.FORGOT_PASSWORD, data);
  }

  override verifyOtp(data: any): Observable<any> {
    return this.http.post(AuthEndpoints.VERIFY_OTP, data);
  }

  override resetPassword(data: any): Observable<any> {
    return this.http.put(AuthEndpoints.RESET_PASSWORD, data);
  }
}
