import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private USER_INFO = "userKey";

    constructor(private http: HttpClient, private storage: Storage, private router: Router) { }

    login(username, password) {

        console.log(username + " " + password);
        this.http.post('https://core-api-525.herokuapp.com/api/client/login', {
            "email": username,
            "password": password
        })
            .subscribe(data => {
                data["Password"] = password;
                console.log(data);
                this.storage.set(this.USER_INFO, data)
                    .then(() => {
                        this.getUserInfo()
                            .then(value => {console.log(value); this.router.navigateByUrl('tabs');})
                            .catch(() => console.log("could not retrieve local storage"));
                    })
                    .catch(err => console.log(err));
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
