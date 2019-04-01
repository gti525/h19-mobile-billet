import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { TicketsService } from './tickets.service';
import { EventService } from './event.service';
import { SettingService } from './setting.service';
import {AlertController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private USER_INFO = "userKey";

    private isUserLoggedIn : boolean = false;

    constructor(
        private http: HttpClient, 
        private storage: Storage, 
        private router: Router,
        private ticketService: TicketsService, 
        private eventService: EventService,
        private settingService: SettingService,
        private alertController: AlertController
        ) { }

    login(username, password) {

        console.log(username + " " + password);
        this.http.post('https://core-api-525.herokuapp.com/api/client/login', {
            "email": username,
            "password": password
        })
            .subscribe(data => {
                data["Password"] = password;
                console.log(data);
                this.settingService.setInfo(data);
                console.log(this.settingService.getInfo());
                this.isUserLoggedIn = true;
                this.storage.set(this.USER_INFO, data)
                    .then(() => {
                        this.getUserInfo()
                            .then(value => {console.log(value); this.router.navigateByUrl('tabs');})
                            .catch(() => console.log("could not retrieve local storage"));
                    })
                    .catch(err => console.log(err));
            }, error => {
                var messageRecu = "Erreur de connection : "+error.status+" <ul><li>errerur : "+error["error"]+"</li><ul>"
                this.afficherErreurConnection(messageRecu, "Reseau social (/login)")
                console.log('Adresse Email ou mot de passe invalide');
            });
    }

    async afficherErreurConnection(pMessage: string, titre:string){
        this.isUserLoggedIn = false;
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
    }

    getIsUserLoggedIn() : boolean{
        return this.isUserLoggedIn
    }

    getUserInfo(){
        return this.storage.get(this.USER_INFO);
    }
}
