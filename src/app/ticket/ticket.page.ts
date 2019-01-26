import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

  public myAngularxQrCode: string = null;

  constructor () {
    this.myAngularxQrCode = 'Your QR code data string';
  }
  
  ngOnInit() {
  }

}
