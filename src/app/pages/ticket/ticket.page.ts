import { Component, OnInit } from '@angular/core';
import { TicketsService } from './../../services/tickets.service';


@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.page.html',
    styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

    private QRCodeId: string = null;
    private seat: string;
    private date: string;
    private event: string;
    private localisation: string;

    constructor (private ticketsService: TicketsService) { }

    ngOnInit() {
        const {QRCodeId, seat, date, event, localisation} = this.ticketsService.currentTicket;
        this.QRCodeId = QRCodeId;
        this.seat = seat;
        this.date = date;
        this.event = event;
        this.localisation = localisation;
    }

}
