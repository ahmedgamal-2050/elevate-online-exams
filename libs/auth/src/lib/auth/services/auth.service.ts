import { inject, Injectable } from '@angular/core';
import { AuthApiBase } from '../base/auth-api';
import { AuthEndpoints } from '../enums/flower-auth-endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
} from '../interfaces/auth-responses';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AuthApiBase {
  private readonly http = inject(HttpClient);

  override register(data: RegisterRequest): Observable<any> {
    return this.http.post<AuthResponse>(AuthEndpoints.REGISTER, data);
  }

  override login(data: LoginRequest): Observable<any> {
    return this.http.post<AuthResponse>(AuthEndpoints.LOGIN, data);
  }

  override changePassword(data: ChangePasswordRequest): Observable<any> {
    return this.http.patch(AuthEndpoints.CHANGE_PASSWORD, data);
  }

  override deleteMyAccount(): Observable<GeneralSuccessResponse> {
    return this.http.delete<GeneralSuccessResponse>(
      AuthEndpoints.DELETE_MY_ACCOUNT
    );
  }

  override uploadProfilePhoto(data: any): Observable<any> {
    return this.http.put(AuthEndpoints.UPLOAD_PROFILE_PHOTO, data);
  }

  override changeUserRole(data: any): Observable<any> {
    return this.http.patch(AuthEndpoints.CHANGE_USER_ROLE, data);
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
