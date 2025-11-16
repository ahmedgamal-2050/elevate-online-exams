import { Observable } from 'rxjs';

export abstract class AuthApiBase {
  abstract register(data: any): Observable<any>;
  abstract login(data: any): Observable<any>;
  abstract changePassword(data: any): Observable<any>;
  abstract deleteMyAccount(data: any): Observable<any>;
  abstract editProfile(data: any): Observable<any>;
  abstract logout(data: any): Observable<any>;
  abstract profileData(data: any): Observable<any>;
  abstract forgotPassword(data: any): Observable<any>;
  abstract verifyOtp(data: any): Observable<any>;
  abstract resetPassword(data: any): Observable<any>;
}
