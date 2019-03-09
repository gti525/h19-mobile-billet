import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class ProviderService {

	private USER_INFO = "user_info"

	constructor(public http: Http, private storage: Storage) {
		console.log('service pour le login')
	}

	login(username, password){
			this.deleteUserInfo()
			//console.log('login '+username+' '+password)
  		this.http.post('https://core-api-525.herokuapp.com/api/client/login', {
	    "email": "AN16720@test.com",
	    "password": "AN16720"})
	    .subscribe(data => {
        //console.log('ca marche '+data);
				//console.log('ca marche '+data['_body']);
				this.setUserInfo(data.json());
       }, error => {
        console.log('marche pas '+error);
			});
			
			this.getUserInfo().then(
				(value)=>{
					//console.log("the saved value is "+value.Id)
				}
			);
	}

	setUserInfo(info: JSON){
		this.storage.set(this.USER_INFO, info);
	}

	deleteUserInfo(){
		this.storage.set(this.USER_INFO, null);
	}

	getUserInfo(){
		return this.storage.get(this.USER_INFO);
	}
}
