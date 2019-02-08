import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-tickets',
    templateUrl: './user-tickets.page.html',
    styleUrls: ['./user-tickets.page.scss'],
})
export class UserTicketsPage implements OnInit {

    private ticketList : any;

    constructor( private ticketService: TicketsService, private router: Router ) { 
        this.ticketList = [
            { event: "Cirque du Soleil", date: "Lundi 21 janvier", seat: "3A", localisation:"Centre Bell", id:"string1" },
            { event: "Concert Celine Dion", date: "Venredi 14 mars", seat: "3A", localisation:"Centre Bell", id:"string2" },
            { event: "Festival", date: "Jeudi 12 mai", seat: "3A", localisation:"Centre Bell", id:"string3" }
        ]
    }

    ngOnInit() {
        //this.ticketService.getUserTicketsData(userId);
        //then update curent ticket in ticketService
    }

    ticketClickHandler (ticket) {
        this.ticketService.setCurrentTicket(ticket);
        this.router.navigateByUrl('ticket');
    }

}
