import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathprotectionService } from 'src/app/pathprotection.service'
import { PreniumProtectionService } from './prenium-protection.service';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'user-tickets', loadChildren: './pages/user-tickets/user-tickets.module#UserTicketsPageModule', canActivate: [PathprotectionService] },
  { path: 'ticket', loadChildren: './pages/ticket/ticket.module#TicketPageModule', canActivate: [PathprotectionService] },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [PathprotectionService] },
  { path: 'parametres', loadChildren: './pages/parametres/parametres.module#ParametresPageModule', canActivate: [PathprotectionService] },
  { path: 'event', loadChildren: './pages/event/event.module#EventPageModule', canActivate: [PathprotectionService] },
  { path: 'paiement', loadChildren: './pages/paiement/paiement.module#PaiementPageModule', canActivate: [PathprotectionService, PreniumProtectionService] }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
