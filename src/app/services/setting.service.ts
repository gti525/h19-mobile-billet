import { Injectable } from '@angular/core';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

    private FirstName;
    private LastName;
    private Token;
    private Id;

  constructor() { }

  setInfo(info: any) {
    const {FirstName, LastName, Token, Id} = info;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Token = Token;
    this.Id = Id;
  }

  getInfo() : any {
    return {
        FirstName: this.FirstName,
        LastName: this.LastName,
        Token: this.Token,
        Id: this.Id
    };
  }
}
