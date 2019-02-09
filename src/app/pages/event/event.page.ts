import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  private ticketList = [];

    constructor( private ticketService: TicketsService, private router: Router ) {
        this.ticketList = [
            { event: 'Cirque du Soleil', date: 'Lundi 21 janvier', seat: '3A', localisation: 'Centre Bell', id: 'string1' },
            { event: 'Concert Celine Dion', date: 'Venredi 14 mars', seat: '3A', localisation: 'Centre Bell', id: 'string2' },
            { event: 'Festival', date: 'Jeudi 12 mai', seat: '3A', localisation: 'Centre Bell', id: 'string3' }
        ];
    }

  ngOnInit() {

  }

}
