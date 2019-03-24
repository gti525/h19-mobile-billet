import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

    friendList: any;

    constructor( private eventService: EventService, private http: HttpClient ) { }

    ngOnInit() {
        this.getFriends();
        this.eventService.getFriends()
            .then(value => {
                if (value) {
                    this.friendList = value;
                }
                else this.getFriends();
            })
            .catch(() => this.getFriends());
        // this.friendList = [
        //     {
        //         ClientId: 1,
        //         FirstName: "Bob",
        //         Tickets: [
        //             {
        //                 "Id": 45,
        //                 "UUID": 54677,
        //                 "EventName": "ROUGE",
        //                 "Artist": "Barbe bleue",
        //                 "Date": "2019-05-25T00:00:00",
        //                 "Location": "Mtl",
        //                 "ClientId": 0,
        //                 "Client": null
        //             },
        //             {
        //                 "Id": 46,
        //                 "UUID": 65744,
        //                 "EventName": "BLEU",
        //                 "Artist": "Barbe bleue",
        //                 "Date": "2019-05-25T00:00:00",
        //                 "Location": "Mtl",
        //                 "ClientId": 0,
        //                 "Client": null
        //             }
        //         ]
        //     },
        //     {
        //         ClientId: 2,
        //         FirstName: "Alice",
        //         Tickets: [
        //             {
        //                 "Id": 45,
        //                 "UUID": 54677,
        //                 "EventName": "ORANGE",
        //                 "Artist": "Barbe bleue",
        //                 "Date": "2019-05-25T00:00:00",
        //                 "Location": "Mtl",
        //                 "ClientId": 0,
        //                 "Client": null
        //             },
        //             {
        //                 "Id": 46,
        //                 "UUID": 65744,
        //                 "EventName": "VIOLET",
        //                 "Artist": "Barbe bleue",
        //                 "Date": "2019-05-25T00:00:00",
        //                 "Location": "Mtl",
        //                 "ClientId": 0,
        //                 "Client": null
        //             }
        //         ]
        //     }
        // ]
    }

    getFriends () {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwibmJmIjoxNTUyOTI4Mjc4LCJleHAiOjE1NTM1MzMwNzgsImlhdCI6MTU1MjkyODI3OH0.LPaMQEVXF_MC5MbNJvwmuh84crbGdEbZx4ktDnvuJFc`
        })

        this.http.get('https://core-api-525.herokuapp.com/api/Client/friend', { headers })
            .subscribe(data => {
                console.log(JSON.stringify(data));
                this.friendList = data;
                this.eventService.saveFriends(data)
                    .then(() => console.log("friends saved") )
                    .catch(err => console.log(err))
            }, error => {
                console.log("could not get friends");
                console.log(error);
            })
    }

}
