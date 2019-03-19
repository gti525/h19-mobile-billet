import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaiementPage } from './paiement.page';
import { AdModule } from 'src/app/module/AdModule';

const routes: Routes = [
  {
    path: '',
    component: PaiementPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaiementPage]
})
export class PaiementPageModule {}
