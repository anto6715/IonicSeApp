import {NavController, Platform} from "ionic-angular";
import {ChatPage} from "../pages/Common/chat/chat";
import {LessonReviewPage} from "../pages/Common/lesson-review/lesson-review";
import {MaterialReviewsPage} from "../pages/Professor/material-reviews/material-reviews";

export class NotificationHandler {

  constructor(
    public platform: Platform,
    public navCtrl: NavController){

  }


  public notificationHandler(msg:any){

    if (msg.type == 'chat') {
      this.navCtrl.push(ChatPage, {'teaching': msg.data});
    }
    if (msg.type == 'review-material') {
      this.navCtrl.push(MaterialReviewsPage, {'idMaterial': msg.data});
    }
    if (msg.type == 'review-lesson') {
      this.navCtrl.push(LessonReviewPage, {'idLesson': msg.data});
    }

  }

}
