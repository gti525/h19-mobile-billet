import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class EventService {

    friendList: any;
    FRIEND_INFO = "friendKey";

    constructor(private storage: Storage) { }

    getFriends () {
        return this.storage.get(this.FRIEND_INFO);
    }

    saveFriends (friendList) {
        return this.storage.set(this.FRIEND_INFO,friendList);
    }

    deleteFriends () {
        return this.storage.set(this.FRIEND_INFO, null);
    }
}
