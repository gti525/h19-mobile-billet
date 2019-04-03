import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { SettingService } from 'src/app/services/setting.service';
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';
import { PreniumProtectionService } from '../prenium-protection.service';

@Injectable({
  providedIn: 'root'
})
export class PasserelleService {

  private API_KEY_PASSERELLE = "2+++FhHMhnGTZnCRZZ7pSrqaOFz2FaO6wIv0ngvGGk0="
  private API_URL_PASSERELLE = "https://h19-passerelle.herokuapp.com/api/v1/"

  //ETAPE 1
  private API_POST_REQUEST_PASSERELLE_CREATE = "transaction/create"
  private API_POST_REQUEST_PASSERELLE_PROCESS = "transaction/process"
  private PRIX_PRENIUM = 2.00
  private resultatEtape1 = "";

  //ETAPE 2
  private resultatEtape2 = "";

  //ETAPE 3
  private API = "https://core-api-525.herokuapp.com/api/Client/changePremiumState"
  private resultatEtape3 = "";

  private attenteAlert;

  constructor(private http: HttpClient, 
    private loginService: LoginService, 
    private settingService: SettingService, 
    private router: Router, 
    private alertController: AlertController,
    private preniumProtectionService: PreniumProtectionService) {
  }

  paiementPreniumEtape1(prenomCC, nomCC, numeroCC, cvvCC, moisExpCC, anneeExpCC) {
    // todo : il faut verifier si lutilisateur est pas deja prenium
    // todo : il faut faire de la validation de formulaire 
    // (ca serait plus facile dutiliser des select et des max length pour les input)
    // pas oublige de mettre le content-type?
    console.log("paiementPreniumEtape1")
    this.afficherVeuillezPatienter()
    this.http.post(this.API_URL_PASSERELLE+this.API_POST_REQUEST_PASSERELLE_CREATE, {
            "MERCHANT_API_KEY": this.API_KEY_PASSERELLE,
            "amount": this.PRIX_PRENIUM,
            "purchase_desc": "Prix prenium pour enlever publicite",
            "credit_card": {
              "first_name": prenomCC,
              "last_name": nomCC,
              "number": numeroCC,
              "cvv": cvvCC+"",
              "exp": {
                "month": moisExpCC,
                "year": anneeExpCC
              }
            }
        }).subscribe(data => {
          this.enleverVeuillezPatienter()
          this.resultatEtape1 = "Etape 1 : "+data["result"]+", numero de transaction : "+data["transaction_number"]
          console.log("resultat etape 1 "+this.resultatEtape1)
          this.paiementPreniumEtape2(data["transaction_number"])
      }, error => {
        this.enleverVeuillezPatienter()
          this.resultatEtape1 = "Etape 1 (erreur) : "+error.status+" <ul><li>erreur : "+error.message+"</li> <li>details : "+error.error.message+"</li></ul>"
          this.afficherFeedback(this.resultatEtape1, "Passerelle (/create)");
      });
  }

  //ne marche pas encore, il faut attendre l'equipe de passerelle
  paiementPreniumEtape2(numeroTransaction: String) {
    // pas oublige de mettre le content-type?
    console.log("paiementPreniumEtape2")
    this.afficherVeuillezPatienter()
    this.http.post(this.API_URL_PASSERELLE+this.API_POST_REQUEST_PASSERELLE_PROCESS, {
      "transaction_number": numeroTransaction+"",
      "action": "COMMIT",
      "MERCHANT_API_KEY": this.API_KEY_PASSERELLE
    }).subscribe(data => {
          this.enleverVeuillezPatienter()
          console.log("ca marche")
          this.resultatEtape2 = "Etape 2 : "+data["result"]
          console.log(this.resultatEtape2)
          this.paiementPreniumEtape3()
      }, error => {
          this.enleverVeuillezPatienter()
          this.resultatEtape2 = "Etape 2 (erreur) : "+error.status+" <ul><li>erreur : "+error.message+"</li> <li>details : "+error.error.message+"</li><ul>"
          this.afficherFeedback(this.resultatEtape2, "Passerelle (/process)")
      });
  }

    //ne marche pas encore, il faut attendre l'equipe de reseau social (pour update le compte de l'utilisateur)
    paiementPreniumEtape3() {
      // pas oublige de mettre le content-type?
      this.afficherVeuillezPatienter()
      let token = ""
      this.loginService.getUserInfo().then(
        value => {
          token = value.Token
          console.log("le token de l'utilisateur est "+token)
          
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          });

          console.log("les header2")
          console.log(JSON.stringify(headers))

          this.http.post(this.API, {}, { headers: headers })
          .subscribe(error => {
              this.enleverVeuillezPatienter()
              console.log("erreur")
              this.resultatEtape3 = "Etape 3 (erreur) : "+error["status"]+", erreur : "+error["error"]+", details : "+error["headers"]
              console.log(JSON.stringify(error))
              console.log(this.resultatEtape3)
            }, data => {
              this.enleverVeuillezPatienter()
              console.log("ca marche")
              var messageRecu = data["error"]["text"]+""
              this.resultatEtape3 = "Etape 3 : "+messageRecu
              if(messageRecu.endsWith("True")){
                console.log("The message ends with true, so the user is now prenium")
                // todo : desactiver la possiblite de desactiver les pubs
                this.loginService.setIsUserPrenium(true)
                this.afficherConfirmation()
              } else {
                // todo : essayer de faire en sorte que lutilisateur ne puisse pas revenir a un compte normale sil y est deja prenium
                //console.log("Error : the meesage received from the api didnt end with true (in this case it ended with false)")
                this.afficherFeedback(this.resultatEtape3, "Reseau social (/changePremiumState)");
              }
              console.log(JSON.stringify(data))
              console.log(this.resultatEtape3)
            });

        }
      ).catch(() => console.log("pas reussi a avoir le token de l'utilisateur"))
    }

    async afficherConfirmation(){
      console.log("afficherConfirmation")
      // todo
      const alert = await this.alertController.create({
        header: 'Confirmation',
        backdropDismiss: false,
        message: 'Vous etes maintenant prenium',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/tabs/parametres');
        }}]
      });
      return await alert.present();
    }
    
    async afficherVeuillezPatienter(){
      console.log("afficherVeuillezPatienter")
      const alert = await this.alertController.create({
        header: 'En cours de traitement',
        backdropDismiss: false,
        message: 'Veuillez patienter'
      });
      this.attenteAlert = alert
      return await this.attenteAlert.present();
    }

    enleverVeuillezPatienter(){
      console.log("enleverVeuillezPatienter")
      this.attenteAlert.dismiss();
    }

    async afficherFeedback(pMessage: string, titre:string){
      const alert = await this.alertController.create({
        header: 'Erreur',
        subHeader: titre,
        backdropDismiss: false,
        message: pMessage,
        buttons: [{
          text: 'OK'
        }]
      });
      return await alert.present();
    }
}
