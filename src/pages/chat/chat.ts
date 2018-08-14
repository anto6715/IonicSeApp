import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import {AngularFireDatabase, snapshotChanges} from "angularfire2/database";
import {User} from "../../models/user";
import {Teaching} from "../../models/teaching";
import {Message} from "../../models/message";
import { ChatProvider } from "../../providers/chat/chat";
import { UserRestProvider } from "../../providers/user-rest/user-rest";
import { PopoverController} from "ionic-angular";
import { PopoverPage } from "./popover";

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

  users: User[] = [];
  user: User = {} as User;
  teaching: Teaching = {} as Teaching;
  message:  Message[] =[];
  msg:string;
  type:number =0;
  emailReceiver:string='';
  nameReceiver:string='';
  receiver:{
    type:number,
    emailReceiver:string,
    nameReceiver:string,
  };
  infoData:string[]=[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public angularFireDb: AngularFireDatabase,
              public chatProvider: ChatProvider,
              public userRestProvider: UserRestProvider,
              public popoverCtrl: PopoverController) {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.teaching = this.navParams.get('teaching');

    this.angularFireDb.list('/'+this.teaching.name + "/messages").valueChanges().subscribe(data=>{
      this.message = JSON.parse(JSON.stringify(data));
      this.setInfoData();

    });

    this.getStudents();

  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage(){
    console.log(this.msg);
     var date = new Date();
    console.log(date);
    this.chatProvider.sendMessage(this.msg, this.type,this.emailReceiver, this.user.email, this.teaching.name, date, this.user.name, this.nameReceiver);
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

  getStudents(){
    this.userRestProvider.getStudentsByCourse(this.user.idCourse).subscribe(data=>{
      this.users = data;
      console.log(this.users);
    })
  }

  presentPopover(myEvent) {
    console.log(this.teaching);
    let popover = this.popoverCtrl.create(PopoverPage, {
      users: this.users,
      idUser: this.user.id,
      receiver:this.type,
      emailReceiver: this.emailReceiver,
      professor: this.teaching.professorDTO,
    });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      this.receiver = data;
      if (this.receiver != null) {
        this.type=this.receiver.type;
        this.emailReceiver=this.receiver.emailReceiver;
        this.nameReceiver = this.receiver.nameReceiver;
        console.log(data);
      }

    })
  }

  setInfoData(){
    let i =0;
    var today = new Date();
    this.message.forEach(data =>{
      var d = new Date(data.date);
      if(d.getDate()== today.getDate() && d.getMonth() == today.getMonth() && d.getFullYear() == today.getFullYear()){
        this.infoData[i]=d.getHours()+":"+d.getMinutes();
        i++;
      } else {
        var MM = d.getMonth()+1;
        this.infoData[i] = d.getDate()+'/'+MM;
        i++;
      }

    })

  }
}
