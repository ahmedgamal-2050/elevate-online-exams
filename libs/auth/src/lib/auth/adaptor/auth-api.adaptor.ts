import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';

@Injectable({
  providedIn: 'root',
})
export class AuthApiAdaptor implements Adaptor {
  adapt(data: any): any {}
}
