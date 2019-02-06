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
            { event: "Cirque du Soleil", date: "Lundi 21 janvier" },
            { event: "Concert Celine Dion", date: "Venredi 14 mars" },
            { event: "Festival", date: "Jeudi 12 mai" }
        ]
    }

    ngOnInit() {
        //this.ticketService.getUserTicketsData(userId);
        //then update curent ticket in ticketService
    }

    ticketClickHandler () {
        this.router.navigateByUrl('ticket');
    }

}
