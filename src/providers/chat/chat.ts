import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ChatProvider Provider');
  }

  sendMessage(msg:string, type:number, emailReceveir:string, emailSender:string, teachingName:String,date: Date, nameSender:string, nameReceiver:string){
    firebase.database().ref('/'+teachingName).once('value',
      function (snapshot) {
      let i = snapshot.child('/messages').numChildren();
      console.log(i);
      let data = {
        date:date,
        type:type,  // 0 se pubblico, 1 se privato
        emailSender:emailSender,
        emailReceiver:emailReceveir,  // 0 se tutti, altrimenti id destinatario
        msg:msg,
        nameSender:nameSender,
        nameReceiver:nameReceiver,
      };

      let updates = {};
      updates['/' +teachingName +'/messages/'+ i] = data;
      firebase.database().ref().update(updates);
    })

  }

}
