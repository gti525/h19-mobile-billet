import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TicketsService {

    currentTicket = {
        QRCodeId: "QRCodeId",
        seat: "seat",
        date: "date",
        event: "event",
        localisation: "localisation"
    };

    constructor(private http: HttpClient) {
    }

    getUserTicketsData (userId) {
        return this.http.get(`API_Reseau_sociale/${userId}`)
    }
}
