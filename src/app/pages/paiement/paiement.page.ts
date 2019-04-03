import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';
import { PasserelleService } from 'src/app/services/passerelle.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {

  nom: String;
  prenom: String;
  numeroCC: String;
  expMois:String
  expAnnee: String;
  cvv: String;

  constructor(private router: Router, private alertController: AlertController, private passerelleService: PasserelleService, private settingService: SettingService) { }

  ngOnInit() {

    // if(this.settingService.getPremium() == true){
    //   this.router.navigateByUrl('/tabs/parametres')
    // }
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
      //console.log("le mois "+this.expMois)
      this.passerelleService.paiementPreniumEtape1(this.prenom, this.nom, this.numeroCC, this.cvv, this.expMois, this.expAnnee)
      this.presentConfirmation();
    }
}
