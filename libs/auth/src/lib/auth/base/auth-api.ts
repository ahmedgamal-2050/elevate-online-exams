import { Observable } from 'rxjs';
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from '../interfaces/auth-requests';
import { GeneralSuccessResponse } from '../interfaces/auth-responses';

export abstract class AuthApiBase {
  abstract register(data: RegisterRequest): Observable<any>;
  abstract login(data: LoginRequest): Observable<any>;
  abstract changePassword(data: ChangePasswordRequest): Observable<any>;
  abstract deleteMyAccount(): Observable<GeneralSuccessResponse>;
  abstract editProfile(data: any): Observable<any>;
  abstract uploadProfilePhoto(data: any): Observable<any>;
  abstract changeUserRole(data: any): Observable<any>;
  abstract logout(): Observable<GeneralSuccessResponse>;
  abstract profileData(): Observable<any>;
  abstract forgotPassword(data: ForgotPasswordRequest): Observable<any>;
  abstract verifyOtp(data: VerifyOtpRequest): Observable<any>;
  abstract resetPassword(data: ResetPasswordRequest): Observable<any>;
}
