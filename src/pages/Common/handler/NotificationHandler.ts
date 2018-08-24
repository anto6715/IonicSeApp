import {NavController, Platform} from "ionic-angular";
import {ChatPage} from "../chat/chat";
import {LessonReviewPage} from "../lesson-review/lesson-review";

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
      this.navCtrl.push(LessonReviewPage, {'idLesson': msg.data});
    }
    if (msg.type == 'review-lesson') {
      this.navCtrl.push(LessonReviewPage, {'idLesson': msg.data});
    }

  }

}
