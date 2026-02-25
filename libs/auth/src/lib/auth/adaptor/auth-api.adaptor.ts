import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';
import { AuthAdaptor, AuthResponse } from '../interfaces/auth-responses';

@Injectable({
  providedIn: 'root',
})
export class AuthApiAdaptor implements Adaptor {
  authAdapt(data: AuthResponse): AuthAdaptor {
    return {
      message: data.message,
      token: data.token,
      email: data.user.email,
    };
  }
}
