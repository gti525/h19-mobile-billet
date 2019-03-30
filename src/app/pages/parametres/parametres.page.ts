import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
    selector: 'app-parametres',
    templateUrl: './parametres.page.html',
    styleUrls: ['./parametres.page.scss'],
})
export class ParametresPage implements OnInit {

    userName: String;
    isPremium: boolean = false;

    constructor(
        private router: Router, 
        private loginService: LoginService,
        private settingService: SettingService
        ) { }

    async ngOnInit() {
        this.isPremium = this.settingService.getPremium();
        console.log(this.isPremium);
        let info = await this.loginService.getUserInfo();
        this.userName = info.FirstName + " " + info.LastName;
    }

    clickReturnLogin() {
        this.loginService.deleteUserInfo()
            .then(() => {
                this.router.navigateByUrl('/');
            })
            .catch(err => {
                console.log(err);
            });
    }

    removeAdsClickHandler() {
        console.log("removeAdsClickHandler")
        this.router.navigateByUrl('paiement');
    }

    setPremium(){
        console.log("the user is prenium? "+this.isPremium)
        //this.settingService.setPremium(!this.isPremium);
    }
}
