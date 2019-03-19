import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import _ from 'lodash';
import { LoginService } from '../../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Ad } from '../../module/Ad';

@Component({
    selector: 'app-user-tickets',
    templateUrl: './user-tickets.page.html',
    styleUrls: ['./user-tickets.page.scss'],
})
export class UserTicketsPage implements OnInit {

    private ticketList: any;
    private show: boolean;

    constructor( private ticketService: TicketsService, private router: Router, private loginService: LoginService, private http: HttpClient ) {

    }

    ngOnInit() {
        // make api GET Ticket if there is no ticket in local storage
        this.ticketService.getTickets()
            .then(value => { 
                if (value.length !== 0) {
                    this.show = true;
                    this.ticketList = value 
                }
                else { this.getTickets() }
            })
            .catch(() => this.getTickets());
    }

    getTickets () {
        this.loginService.getUserInfo()
            .then(value => {
                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${value.Token}`
                })

                this.http.get('https://core-api-525.herokuapp.com/api/Ticket', { headers })
                    .subscribe(data => {
                        this.ticketChecker(data);
                        this.ticketService.saveTickets(data)
                            .then(() => console.log("tickets saved"))
                            .catch(err => console.log(err));
                    }, error => {
                        console.log("could not get ticket");
                        console.log(error);
                    })
            })
            .catch(err => console.log(err));
    }

    ticketClickHandler (ticket) {
        this.ticketService.setCurrentTicket(ticket);
        this.router.navigateByUrl('ticket');
    }

    ticketChecker (tickets) {
        
        tickets.map( ticket => {
            if ( !moment().isBefore(ticket.Date) ){
                _.remove(tickets, t => t.UUID === ticket.UUID )
            }
        });

        this.setTicketList(tickets);
    }

    setTicketList (ticketList) {
        this.ticketList = ticketList;
    }

}
