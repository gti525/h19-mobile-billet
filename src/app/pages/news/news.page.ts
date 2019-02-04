import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
    selector: 'app-news',
    templateUrl: './news.page.html',
    styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
    data: any;

    constructor(private newsService: NewsService, private router: Router) { }

    ngOnInit() {
        this.newsService
        .getData()
        .subscribe(data => {
        this.data = data;
        })
    }

    onGoToNewsSinglePage( article ) {
        this.newsService.currentArticle = article;
        this.router.navigate(['/news-single'])
    }

}
