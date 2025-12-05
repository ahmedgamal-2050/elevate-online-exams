import { AuthAdaptor, AuthResponse } from './auth-responses';

export interface Adaptor {
  authAdapt(data: AuthResponse): AuthAdaptor;
}
