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
                        "Date": "2019-02-15",
                        "Location": "Mtl",
                        "ClientId": 9,
                        "Client": null
                    },
                    {
                        "Id": 5,
                        "UUID": 53025,
                        "EventName": "TEST2",
                        "Artist": "1,2,test",
                        "Date": "2020-03-14",
                        "Location": "Mtl",
                        "ClientId": 9,
                        "Client": null
                    },
                    {
                        "Id": 6,
                        "UUID": 89700,
                        "EventName": "LE FEU",
                        "Artist": "Johnny",
                        "Date": "2019-04-14",
                        "Location": "Mtl",
                        "ClientId": 9,
                        "Client": null
                    }
                ]
                //=================================
                console.log(data);
                let dataToSave = {data, password };
                this.storage.set(this.USER_INFO, dataToSave)
                
                //this.storage.set(this.USER_INFO, data)
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
