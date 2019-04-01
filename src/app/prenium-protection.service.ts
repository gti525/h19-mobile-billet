import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class PreniumProtectionService {

  constructor(private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    //on retourne seulement true si l'utilisateur est prenium
    var newvalue = this.loginService.getIsUserPrenium()
    return !newvalue;
  }
}
