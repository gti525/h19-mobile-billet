import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { TicketsService } from './tickets.service';
import { EventService } from './event.service';
import { SettingService } from './setting.service';
import {AlertController} from '@ionic/angular';
import { PreniumProtectionService } from 'src/app/prenium-protection.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private USER_INFO = "userKey";

    private isUserLoggedIn : boolean = false;
    
    private isUserPrenium : boolean = false;

    private attenteAlert : any;

    constructor(
        private http: HttpClient, 
        private storage: Storage, 
        private router: Router,
        private ticketService: TicketsService, 
        private eventService: EventService,
        private settingService: SettingService,
        private alertController: AlertController) { }

    async login(username, password) {
        await this.afficherVeuillezPatienter();
        console.log(username + " " + password);
        this.http.post('https://core-api-525.herokuapp.com/api/client/login', {
            "email": username,
            "password": password
        })
            .subscribe(data => {
                this.enleverVeuillezPatienter()
                data["Password"] = password;
                console.log(data);
                console.log("prenium? "+data["IsPremium"]);
                this.settingService.setInfo(data);
                console.log(this.settingService.getInfo());
                this.isUserLoggedIn = true;
                this.isUserPrenium = data["IsPremium"]
                this.storage.set(this.USER_INFO, data)
                    .then(() => {
                        this.getUserInfo()
                            .then(value => {console.log(value); this.router.navigateByUrl('tabs');})
                            .catch(() => console.log("could not retrieve local storage"));
                    })
                    .catch(err => console.log(err));
            }, error => {
                this.enleverVeuillezPatienter()
                var messageRecu = "Erreur de connection : "+error.status+" <ul><li>errerur : "+error["error"]+"</li><ul>"
                this.afficherErreurConnection(messageRecu, "Reseau social (/login)")
                console.log('Adresse Email ou mot de passe invalide');
            });
    }

    async afficherErreurConnection(pMessage: string, titre:string){
        this.isUserLoggedIn = false;
        this.isUserPrenium = false;
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

    async deleteUserInfo(){
        await this.storage.set(this.USER_INFO, null);
        await this.eventService.deleteFriends();
        await this.ticketService.deleteTickets();
        this.isUserLoggedIn = false;
        this.isUserPrenium = false;
    }

    getIsUserLoggedIn() : boolean{
        return this.isUserLoggedIn
    }

    getIsUserPrenium() : boolean{
        return this.isUserPrenium
    }

    setIsUserPrenium(preinum: boolean) {
        this.isUserPrenium = preinum;
    }

    getUserInfo(){
        return this.storage.get(this.USER_INFO);
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
}
