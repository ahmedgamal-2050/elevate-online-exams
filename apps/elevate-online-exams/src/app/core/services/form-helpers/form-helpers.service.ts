import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormHelpersService {
  hasFormChanged(current: any, initial: any): boolean {
    return Object.keys(current).some(key => current[key] !== initial[key]);
  }
}
