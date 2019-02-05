import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'user-tickets', loadChildren: './user-tickets/user-tickets.module#UserTicketsPageModule' },
    { path: 'news', loadChildren: './news/news.module#NewsPageModule' },
    { path: 'news-single', loadChildren: './news-single/news-single.module#NewsSinglePageModule' },
    { path: 'ticket', loadChildren: './ticket/ticket.module#TicketPageModule' },
    { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'parametres', loadChildren: './parametres/parametres.module#ParametresPageModule' }

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
