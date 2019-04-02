import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class PreniumProtectionService {

  currentValue: boolean;

  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    //on retourne seulement true si l'utilisateur est prenium
    return !this.currentValue;
  }

  getCurrentValue(): boolean{
    return !this.currentValue;
  }

  setIsPreniumC(newVlaue: boolean) {
    this.currentValue = newVlaue;
  }
}
