import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewpagePage } from './newpage';

@NgModule({
  declarations: [
    NewpagePage,
  ],
  imports: [
    IonicPageModule.forChild(NewpagePage),
  ],
})
export class NewpagePageModule {}
