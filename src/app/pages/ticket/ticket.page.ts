import { Component, OnInit } from '@angular/core';
import { TicketsService } from './../../services/tickets.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.page.html',
    styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

    private QRCodeId: string;
    private seat: string;
    private date: string;
    private event: string;
    private localisation: string;

    constructor (private ticketsService: TicketsService, private router: Router) { }

    ngOnInit() {
        const {id, seat, date, event, localisation} = this.ticketsService.currentTicket;
        this.QRCodeId = id;
        this.seat = seat;
        this.date = date;
        this.event = event;
        this.localisation = localisation;
    }

    clickReturn () {
        this.router.navigateByUrl('/tabs')
    }

}
