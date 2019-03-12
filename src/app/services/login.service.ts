import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private USER_INFO = "userKey";
        
    constructor(private http: HttpClient, private storage: Storage, private router: Router) { }

    login(username, password) {

        //this.deleteUserInfo();
        console.log(username + " " + password);
        this.http.post('https://core-api-525.herokuapp.com/api/client/login', {
            "email": username,
            "password": password
        })
            .subscribe(data => {
                let dataToSave = {data, password };
                this.storage.set(this.USER_INFO, dataToSave)
                    .then(() => {
                        this.getUserInfo()
                            .then(value => console.log(value))
                            .catch(() => console.log("could not retrieve local storage"))
                    })
                    .catch(err => console.log(err));
                this.router.navigateByUrl('tabs')
            }, error => {
                console.log('Adresse Email ou mot de passe invalide');
            });
    }

    deleteUserInfo(){
        return this.storage.set(this.USER_INFO, null);
    }

    getUserInfo(){
        return this.storage.get(this.USER_INFO);
    }
}
