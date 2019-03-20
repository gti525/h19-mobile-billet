import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  clickReturn() {
    this.router.navigateByUrl('/tabs/parametres')
  }

  async presentConfirmation() {
    const alert = await this.alertController.create({
      header: 'Paiement effectué avec succès !',
      buttons: ['OK']
    });
      await alert.present();
    }

    pay() {
      this.presentConfirmation();
    }
}
