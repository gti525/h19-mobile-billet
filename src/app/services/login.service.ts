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
                //================================= temporaire
                data["Tickets"] = [
                    {
                        "Id": 4,
                        "UUID": 134705,
                        "EventName": "ROUGE",
                        "Artist": "Barbe bleue",
                        "Date": "2019-02-25T00:00:00",
                        "Location": "Mtl",
                        "ClientId": 9,
                        "Client": null
                    },
                    {
                        "Id": 5,
                        "UUID": 53025,
                        "EventName": "TEST2",
                        "Artist": "1,2,test",
                        "Date": "2019-02-25T00:00:00",
                        "Location": "Mtl",
                        "ClientId": 9,
                        "Client": null
                    }
                ]
                //=================================
                let dataToSave = {data, password };
                this.storage.set(this.USER_INFO, dataToSave)
                console.log(data);
                this.storage.set(this.USER_INFO, data)
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
