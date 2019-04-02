import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class PreniumProtectionService {

  constructor(private loginService: LoginService) {
    this.loginService.getIsUserPrenium()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    //on retourne seulement true si l'utilisateur est prenium
    console.log("PreniumProtectionService - canActivate")
    return !this.loginService.getIsUserPrenium();
  }

  getCurrentValue(): boolean{
    console.log("PreniumProtectionService - getCurrentValue "+this.loginService.getIsUserPrenium())
    return this.loginService.getIsUserPrenium();
  }
}
