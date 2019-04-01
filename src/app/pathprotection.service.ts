import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class PathprotectionService implements CanActivate{

  constructor(private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    //on retourne seulement true si l'utilisateur est loggedin
    var returnValue = this.loginService.getIsUserLoggedIn()
    return returnValue;
  }
}
