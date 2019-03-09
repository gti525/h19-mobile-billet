import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderService } from '../../provider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    image: String;
    public email;
    public password;

    constructor(private router: Router, private providerService: ProviderService) { 
        this.image = "assets/logo.png";
    }

    ngOnInit() {
    }

    go () {
        this.router.navigateByUrl('tabs');
    }

    login(){
		this.providerService.login(this.email, this.password)
	}

}
