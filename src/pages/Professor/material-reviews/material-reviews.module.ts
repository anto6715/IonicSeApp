import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaterialReviewsPage } from './material-reviews';

@NgModule({
  declarations: [
    MaterialReviewsPage,
  ],
  imports: [
    IonicPageModule.forChild(MaterialReviewsPage),
  ],
})
export class MaterialReviewsPageModule {}
