import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
        {
            path: 'user-tickets',
            children: [
            {
                path: '',
                loadChildren: '../user-tickets/user-tickets.module#UserTicketsPageModule'
            }
            ]        
        },
        {
            path: 'event',
            children: [
            {
                path: '',
                loadChildren: '../event/event.module#EventPageModule'
            }
            ]
        },
        {
            path: 'parametres',
            children: [
            {
                path: '',
                loadChildren: '../parametres/parametres.module#ParametresPageModule'
            }
            ]
        },
        {
            path: '',
            redirectTo: 'user-tickets',
            pathMatch: 'full'
        }
        ]
    }    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {}
