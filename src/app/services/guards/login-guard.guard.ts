import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BachillerService } from '../bachiller.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public service: BachillerService) {

  }

  canActivate( ) {
    if (this.service.institucionAutenticada()) {
      console.log('Usuario autenticado');
      return true;
    } else {
      console.log('Usuario no autenticado');
      return false;
    }

  }
}
