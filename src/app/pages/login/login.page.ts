import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    image: String;
    email: String;
    password: String;

    constructor(private loginService: LoginService) { 
        this.image = "assets/logo.png";
    }

    ngOnInit() {
    }
    
    login(){
        this.loginService.login(this.email, this.password);
    }
}
