import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TicketsService {

    currentTicket: any;

    constructor(private http: HttpClient) {
    }

    setCurrentTicket (ticket) {
        this.currentTicket = ticket;
    }

    getUserTicketsData (userId) {
        return this.http.get(`API_Reseau_sociale/${userId}`)
    }
}