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

    login(username, password) : any {

        this.deleteUserInfo()

        this.http.post('https://core-api-525.herokuapp.com/api/client/login', {
            "email": username,
            "password": password
        })
            .subscribe(data => {
                console.log(data);
                this.storage.set(this.USER_INFO, data)
                    .then(() => {
                        this.getUserInfo()
                            .then(value => console.log(value.Id + " is stored"))
                            .catch(() => console.log("could not retrieve local storage"))
                    })
                    .catch(err => console.log(err));
                this.router.navigateByUrl('tabs')
            }, error => {
                console.log('Adresse Email ou mot de passe invalide'+ error);
                this.getUserInfo()
                            .then(value => console.log(value.Id + " is stored"))
                            .catch(() => console.log("could not retrieve local storage"))
                return false;
            });
    }

    setUserInfo(info){
        this.storage.set(this.USER_INFO, info);
    }

    deleteUserInfo(){
        this.storage.set(this.USER_INFO, null);
    }

    getUserInfo(){
        return this.storage.get(this.USER_INFO);
    }
}
