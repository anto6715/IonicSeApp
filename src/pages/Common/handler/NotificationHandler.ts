import {NavController, Platform} from "ionic-angular";
import {ChatPage} from "../chat/chat";

export class NotificationHandler {

  constructor(
    public platform: Platform,
    public navCtrl: NavController){

  }


  public notificationHandler(msg:any){

    if (msg.type == 'chat') {
      this.navCtrl.push(ChatPage, {'teaching': msg.data});
    }

  }

}
