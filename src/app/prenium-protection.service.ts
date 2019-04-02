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
    console.log("PreniumProtectionService - canActivate")
    return !this.currentValue;
  }

  getCurrentValue(): boolean{
    console.log("PreniumProtectionService - getCurrentValue")
    return !this.currentValue;
  }

  setIsPreniumC(newVlaue: boolean) {
    console.log("PreniumProtectionService - setIsPreniumC")
    this.currentValue = newVlaue;
  }
}
