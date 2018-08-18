import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Message} from "../../models/message";
import { NotificationProvider} from "../notification/notification";
import {NavController} from "ionic-angular";

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(public http: HttpClient,
              public notificationRest: NotificationProvider) {
    console.log('Hello ChatProvider Provider');

  }

  public sendMessage(msg:string, type:number, emailReceveir:string, emailSender:string, teachingName:string,date: Date, nameSender:string, nameReceiver:string, idReceiver:number){

    firebase.database().ref('/'+teachingName).once('value',
      function (snapshot) {
      let i = snapshot.child('/messages').numChildren();
      console.log(idReceiver);
      console.log(i);
      let data: Message = {
        date:date,
        type:type,  // 0 se pubblico, 1 se privato
        emailSender:emailSender,
        emailReceiver:emailReceveir,  // 0 se tutti, altrimenti id destinatario
        msg:msg,
        nameSender:nameSender,
        nameReceiver:nameReceiver,
        idReceiver:idReceiver,
      };


      let updates = {};
      updates['/' +teachingName +'/messages/'+ i] = data;
      firebase.database().ref().update(updates);




    });
    if (type !=0) {
      this.notificationRest.sendToUser('Nuovo Messaggio privato',teachingName,'message',idReceiver).subscribe(data=>{
        console.log('notifica inviata');
      })
    } else {

    }

  }

}
