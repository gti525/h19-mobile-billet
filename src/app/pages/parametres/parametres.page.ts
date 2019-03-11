import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-parametres',
    templateUrl: './parametres.page.html',
    styleUrls: ['./parametres.page.scss'],
})
export class ParametresPage implements OnInit {
    
    userName: String

    constructor(private router: Router, private loginService: LoginService) { }

    ngOnInit() {
    
    }

    ngAfterContentInit(){
        this.loginService.getUserInfo().then(
            value => {
                console.log("set le nom de lutilisateur "+value.FirstName+" "+value.LastName)
                this.userName = value.FirstName+" "+value.LastName;
            }
        )
        .catch(() => console.log("could not retrieve local storage"))
    }

    clickReturnLogin() {
        this.router.navigateByUrl('/');
    }

    removeAdsClickHandler() {
        console.log("removeAdsClickHandler")
        this.router.navigateByUrl('paiement');
    }
}
