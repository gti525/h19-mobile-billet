import { Injectable } from '@angular/core';
import {environment} from '../environments/environment'
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    currentArticle: any;

    constructor(private http: HttpClient) { }

    getData() {
        return this.http.get(`${API_URL}/top-headlines?country=us&apiKey=${API_KEY}`)
    }
}
