import { Injectable } from '@angular/core';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

    private FirstName;
    private LastName;
    private Token;
    private IsPremium;
    private Id;

  constructor() { }

  setInfo(info: any) {
    const {FirstName, LastName, Token, Id, IsPremium} = info;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Token = Token;
    this.IsPremium = IsPremium;
    this.Id = Id;
  }

  getInfo() : any {
    return {
        FirstName: this.FirstName,
        LastName: this.LastName,
        Token: this.Token,
        IsPremium: this.IsPremium,
        Id: this.Id
    };
  }

  getPremium() : boolean {
      return this.IsPremium;
  }

  setPremium(IsPremium: boolean) {
    this.IsPremium = IsPremium;
  }
}
