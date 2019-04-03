import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { SettingService } from 'src/app/services/setting.service';
import { PreniumProtectionService } from 'src/app/prenium-protection.service';

@Component({
    selector: 'app-parametres',
    templateUrl: './parametres.page.html',
    styleUrls: ['./parametres.page.scss'],
})
export class ParametresPage implements OnInit {

    userName: String;
    private isPremiumFromService: boolean

    constructor(
        private router: Router, 
        private loginService: LoginService,
        private settingService: SettingService,
        private preniumProtectionService: PreniumProtectionService
        ) { 
            this.isPremiumFromService = this.preniumProtectionService.getCurrentValue();
        }

    async ngOnInit() {
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
}
