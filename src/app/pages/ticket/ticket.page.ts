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
    private Artist: string;
    private Date: string;
    private EventName: string;
    private Location: string;

    constructor (private ticketsService: TicketsService, 
        private router: Router) {
    }

    ngOnChanges(){
        console.log("TicketPage - ngOnChanges")
    }

    ngOnInit() {
        const {UUID, Date, EventName, Location, Artist} = this.ticketsService.currentTicket;
        this.UUID = UUID;
        this.Date = Date;
        this.EventName = EventName;
        this.Location = Location;
        this.Artist = Artist;
    }

    //on devrait garder ca?
    // clickReturn () {
    //     this.router.navigateByUrl('/tabs');
    // }

}
