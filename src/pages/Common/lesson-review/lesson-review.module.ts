import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonReviewPage } from './lesson-review';

@NgModule({
  declarations: [
    LessonReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonReviewPage),
  ],
})
export class LessonReviewPageModule {}
