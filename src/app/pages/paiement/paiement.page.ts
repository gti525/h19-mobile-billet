import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  clickReturn() {
    this.router.navigateByUrl('/tabs/parametres')
  }
}
