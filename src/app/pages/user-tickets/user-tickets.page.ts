import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import _ from 'lodash';
import { LoginService } from '../../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SettingService } from 'src/app/services/setting.service';
import { PreniumProtectionService } from 'src/app/prenium-protection.service';
//import { Ad } from '../../module/Ad';

@Component({
    selector: 'app-user-tickets',
    templateUrl: './user-tickets.page.html',
    styleUrls: ['./user-tickets.page.scss'],
})
export class UserTicketsPage implements OnInit {

    private ticketList: any;
    private show: boolean;
    private timestamp: any;

    constructor( 
        private ticketService: TicketsService, 
        private router: Router, 
        private loginService: LoginService, 
        private http: HttpClient,
        private settingService: SettingService,
        private preniumProtectionService: PreniumProtectionService
        ) { 
            this.preniumProtectionService.getCurrentValue();
            loginService.getUserInfo().then(info => {
                console.log("UserTicketsPage (getUserInfo) "+info.IsPremium)
            })
            .catch(() => {
            });
            console.log("UserTicketsPage (constructor) - the user is prenium? "+this.preniumProtectionService.getCurrentValue()+" "+this.preniumProtectionService.getCurrentValue())
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

            this.setTimestamp();

            console.log("UserTicketsPage (ngOnInit) - the user is prenium? "+this.preniumProtectionService.getCurrentValue())
    }

    async getTickets () {
        let user = await this.loginService.getUserInfo();
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.Token}`
        });

        this.http.get('https://core-api-525.herokuapp.com/api/Ticket', { headers })
            .subscribe(data => {
                console.log(JSON.stringify(data));
                this.ticketChecker(data);
                this.ticketService.saveTickets(data)
                    .then(() => console.log('ticket saved'))
                    .catch(err => console.log(err));
            }, error => {
                console.log("could not get ticket");
                console.log(error);
            });
    }

    ticketClickHandler (ticket) {
        this.ticketService.setCurrentTicket(ticket);
        this.router.navigateByUrl('ticket');
    }

    ticketChecker (tickets) {
        
        tickets.map( ticket => {
            if ( !moment().isBefore(ticket.Date) ){
                _.remove(tickets, t => t.Id === ticket.Id )
            }
        });

        this.setTicketList(tickets);
    }

    setTicketList (ticketList) {
        this.ticketList = ticketList;
    }

    setTimestamp () {
        this.timestamp = moment().format("DD-MM hh:mm");
    }

}
