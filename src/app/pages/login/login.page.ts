import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    image: String;

    constructor(private router: Router) { 
        this.image = "assets/logo.png";
    }

    ngOnInit() {
    }

    go () {
        this.router.navigateByUrl('tabs');
    }

}
