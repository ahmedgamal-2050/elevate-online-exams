import { inject, Injectable } from '@angular/core';
import { AuthApiBase } from '../base/auth-api';
import { AuthEndpoints } from '../enums/auth-endpoints';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import {
  RegisterRequest,
  LoginRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
} from '../interfaces/auth-requests';
import {
  GeneralSuccessResponse,
  AuthResponse,
  AuthAdaptor,
} from '../interfaces/auth-responses';
import { AuthApiAdaptor } from '../adaptor/auth-api.adaptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AuthApiBase {
  private readonly http = inject(HttpClient);
  private readonly authAdaptor = inject(AuthApiAdaptor);

  override register(data: RegisterRequest): Observable<AuthAdaptor> {
    return this.http.post<AuthResponse>(AuthEndpoints.REGISTER, data).pipe(
      map(response => this.authAdaptor.authAdapt(response)),
      catchError(error => of(error))
    );
  }

  override login(data: LoginRequest): Observable<AuthAdaptor> {
    return this.http.post<AuthResponse>(AuthEndpoints.LOGIN, data).pipe(
      map(response => this.authAdaptor.authAdapt(response)),
      catchError(error => of(error))
    );
  }

  override changePassword(data: ChangePasswordRequest): Observable<any> {
    return this.http.patch(AuthEndpoints.CHANGE_PASSWORD, data);
  }

  override deleteMyAccount(): Observable<GeneralSuccessResponse> {
    return this.http.delete<GeneralSuccessResponse>(
      AuthEndpoints.DELETE_MY_ACCOUNT
    );
  }

  override editProfile(data: any): Observable<any> {
    return this.http.put(AuthEndpoints.EDIT_PROFILE, data);
  }

  override logout(): Observable<GeneralSuccessResponse> {
    return this.http.get<GeneralSuccessResponse>(AuthEndpoints.LOGOUT);
  }

  override profileData(): Observable<any> {
    return this.http.get(AuthEndpoints.PROFILE_DATA);
  }

  override forgotPassword(data: ForgotPasswordRequest): Observable<any> {
    return this.http.post(AuthEndpoints.FORGOT_PASSWORD, data);
  }

  override verifyOtp(data: VerifyOtpRequest): Observable<any> {
    return this.http.post(AuthEndpoints.VERIFY_OTP, data);
  }

  override resetPassword(data: ResetPasswordRequest): Observable<any> {
    return this.http.put(AuthEndpoints.RESET_PASSWORD, data);
  }
}
