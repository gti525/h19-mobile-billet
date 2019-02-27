import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'user-tickets', loadChildren: './pages/user-tickets/user-tickets.module#UserTicketsPageModule' },
  { path: 'ticket', loadChildren: './pages/ticket/ticket.module#TicketPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'parametres', loadChildren: './pages/parametres/parametres.module#ParametresPageModule' },
  { path: 'event', loadChildren: './pages/event/event.module#EventPageModule' },
  { path: 'paiement', loadChildren: './pages/paiement/paiement.module#PaiementPageModule' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
