import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {User} from "../../../models/user";
import {Teaching} from "../../../models/teaching";
import {Message} from "../../../models/message";
import { ChatProvider } from "../../../providers/chat/chat";
import { UserRestProvider } from "../../../providers/user-rest/user-rest";
import { PopoverController} from "ionic-angular";
import { PopoverPage } from "./popover";
import { TeachingRestProvider} from "../../../providers/teaching-rest/teaching-rest";
import {Value} from "../../../Variable";

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
  nameTeaching:string;
  receiver:Message ={
    emailReceiver:'',
    nameReceiver:'',
    type:0,
    idReceiver:0,

  } as Message;
  infoData:string[]=[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public angularFireDb: AngularFireDatabase,
              public chatProvider: ChatProvider,
              public userRestProvider: UserRestProvider,
              public popoverCtrl: PopoverController,
              public teachingRestProvider: TeachingRestProvider) {

    this.nameTeaching=this.navParams.get('teaching');
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getTeaching();


    this.angularFireDb.list('/'+this.nameTeaching + "/messages").valueChanges().subscribe(data=>{
      this.message = JSON.parse(JSON.stringify(data));
      this.setInfoData();

    });


  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.scrollToBottom();
  }

  sendMessage(){
    console.log(this.msg);
    var date = new Date();
    console.log(date);
    let sendMessage: Message = {
      date: date,
      idReceiver:this.receiver.idReceiver,
      type:this.receiver.type,
      nameReceiver:this.receiver.nameReceiver,
      emailReceiver:this.receiver.emailReceiver,
      msg:this.msg,
      nameSender:this.user.name,
      emailSender:this.user.email,

    };
    this.chatProvider.sendMessage(sendMessage, this.teaching);
    this.msg =null;
    this.scrollToBottom();
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
    this.userRestProvider.getStudentsByCourse(this.teaching.idCourse).subscribe(data=>{
      this.users = data;
      console.log(this.users);
    })
  }

  getTeaching(){

    if (this.user.userType == Value.student){
      this.teachingRestProvider.getByNameAndIdCourse(this.nameTeaching, this.user.idCourse).subscribe(data=>{
        this.teaching = data;
        console.log(this.teaching);
        this.getStudents();
      });
    }

    if (this.user.userType == Value.professor) {
      this.teachingRestProvider.getByNameAndIdProf(this.nameTeaching, this.user.id).subscribe(data=>{
        this.teaching = data;
        console.log(this.teaching);
        this.getStudents();
      })

    }

  }

  presentPopover(myEvent) {
    console.log(this.teaching);
    let popover = this.popoverCtrl.create(PopoverPage, {
      users: this.users,
      idUser: this.user.id,
      receiver:this.receiver.type,
      emailReceiver: this.receiver.emailReceiver,
      professor: this.teaching.professorDTO,
    });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      if (data == null) {
        this.receiver.emailReceiver='';
        this.receiver.nameReceiver='';
        this.receiver.type=0;
        this.receiver.idReceiver=0;
      } else {
        this.receiver = data;
        console.log(this.receiver);
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
