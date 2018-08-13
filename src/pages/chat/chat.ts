import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import {AngularFireDatabase, snapshotChanges} from "angularfire2/database";
import {User} from "../../models/user";
import {Teaching} from "../../models/teaching";
import {Message} from "../../models/message";
import { ChatProvider } from "../../providers/chat/chat";
import * as firebase from "firebase";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage implements OnInit{

  @ViewChild(Content) content: Content;

  user: User = {} as User;
  teaching: Teaching = {} as Teaching;
  message:  Message[] =[];
  msg:string;
  temp:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public angularFireDb: AngularFireDatabase,
              public chatProvider: ChatProvider) {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.teaching = this.navParams.get('teaching');


    this.angularFireDb.list('/'+this.teaching.name + "/messages").valueChanges().subscribe(data=>{
      this.message = JSON.parse(JSON.stringify(data));
      console.log(this.message[0].msg);
    })

  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage(){
    console.log(this.msg);

    this.chatProvider.sendMessage(this.msg, 1,'All', this.teaching.name, this.user.name);
    this.msg =null;
  }

  onFocus() {
    this.content.resize();
    this.scrollToBottom();
  }


  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

}
