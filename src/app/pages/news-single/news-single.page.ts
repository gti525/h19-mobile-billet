import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
    selector: 'app-news-single',
    templateUrl: './news-single.page.html',
    styleUrls: ['./news-single.page.scss'],
})
export class NewsSinglePage implements OnInit {

    article;

    constructor(private newsService: NewsService) { }

    ngOnInit() {
        this.article = this.newsService.currentArticle;
    }

}
