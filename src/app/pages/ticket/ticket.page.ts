import { Component, OnInit } from '@angular/core';
import { TicketsService } from './../../services/tickets.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.page.html',
    styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

    private UUID: string;
    private seat: string;
    private Date: string;
    private EventName: string;
    private Location: string;

    constructor (private ticketsService: TicketsService, private router: Router) { }

    ngOnInit() {
        const {UUID, seat, Date, EventName, Location} = this.ticketsService.currentTicket;
        console.log("ticket info "+[UUID, seat, Date, event, Location] )
        this.UUID = UUID+"";
        this.seat = seat;
        this.Date = Date;
        this.EventName = EventName;
        this.Location = Location;
    }

    clickReturn () {
        this.router.navigateByUrl('/tabs');
    }

}
