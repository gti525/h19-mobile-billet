import { Component, OnInit } from '@angular/core';

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

    constructor () {
        //TODO: Get data from ticket id
        this.QRCodeId = 'QRCodeId';
        this.seat = '3A';
        this.date = '21 janvier 2019';
        this.event = 'Cirque du soleil';
        this.localisation = '5222 rue st-denis' ;
    }

    ngOnInit() {
    }

}
