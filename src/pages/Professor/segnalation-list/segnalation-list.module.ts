import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SegnalationListPage } from './segnalation-list';

@NgModule({
  declarations: [
    SegnalationListPage,
  ],
  imports: [
    IonicPageModule.forChild(SegnalationListPage),
  ],
})
export class SegnalationListPageModule {}
