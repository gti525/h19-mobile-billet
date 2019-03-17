import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    image: String;

    constructor(private loginService: LoginService, private alertController: AlertController) { 
        this.image = "assets/logo.png";
    }

    ngOnInit() { }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Première connection',
            subHeader: 'Veuillez entrer vos informations de connection',
            inputs: [
                {
                    name: 'email',
                    type: 'text',
                    placeholder: 'mail@mobileApp.ca'
                },
                {
                    name: 'password',
                    type: 'password',
                    placeholder: 'mot de passe'
                },
            ],
            buttons: [{
                    text: 'OK',
                    handler: (data) =>{
                        this.loginService.login(data.email, data.password);
                    }
                },
                'Annuler'
            ]
        });

        await alert.present();
    }
    
    login(){
        this.loginService.getUserInfo()
            .then(info => {
                if ((info.Email === null || info.Email === "" || info.Email === undefined )  && (info.Password === null || info.Password === undefined)) {
                    this.presentAlert();
                }
                else this.loginService.login(info.Email, info.Password)
            })
            .catch(() => {
                this.presentAlert();
            });
        
    }
}
