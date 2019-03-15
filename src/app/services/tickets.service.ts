import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LoginService} from './login.service';

@Injectable({
    providedIn: 'root'
})
export class TicketsService {

    currentTicket: any;
    USER_TICKET = "ticketKey";

    constructor(private http: HttpClient, private loginService: LoginService) {
    }

    setCurrentTicket (ticket) {
        this.currentTicket = ticket;
    }
}
