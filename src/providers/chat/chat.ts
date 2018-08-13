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

  sendMessage(msg:string, type:number, receveir:string, teachingName:String, sender:string){
    firebase.database().ref('/'+teachingName).once('value',
      function (snapshot) {
      let i = snapshot.child('/messages').numChildren();
      console.log(i);
      let data = {
        type:type,
        sender:sender,
        receiver:receveir,
        msg:msg,
      };

      let updates = {};
      updates['/' +teachingName +'/messages/'+ i] = data;
      firebase.database().ref().update(updates);
    })

  }

}
