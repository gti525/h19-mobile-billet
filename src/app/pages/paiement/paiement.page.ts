import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';
import { PasserelleService } from 'src/app/passerelle.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {

  nom: String;
  prenom: String;
  numeroCC: Number;
  expMois: String;
  expAnnee: String;
  cvv: String;


  constructor(private router: Router, private alertController: AlertController, private passerelleService: PasserelleService) { }

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
      this.passerelleService.paiementPreniumEtape1(this.prenom, this.nom, this.numeroCC, this.cvv, this.expMois, this.expAnnee)
      this.presentConfirmation();
    }
}
