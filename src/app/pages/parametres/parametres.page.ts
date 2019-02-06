import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-parametres',
    templateUrl: './parametres.page.html',
    styleUrls: ['./parametres.page.scss'],
})
export class ParametresPage implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    clickReturnLogin() {
        this.router.navigateByUrl('/');
    }

}
