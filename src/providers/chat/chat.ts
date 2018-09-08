import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Message} from "../../models/message";
import { NotificationProvider} from "../notification/notification";
import {NavController} from "ionic-angular";
import {Teaching} from "../../models/teaching";

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

  public sendMessage(message:Message,teaching:Teaching){

    firebase.database().ref('/'+teaching.name).once('value',
      function (snapshot) {
        let i = snapshot.child('/messages').numChildren();
        let updates = {};
        updates['/' +teaching.name +'/messages/'+ i] = message;
        firebase.database().ref().update(updates);

      });
    if (message.type !=0) {
      this.notificationRest.sendToUser('Nuovo Messaggio privato',teaching.name,teaching.name,message.idReceiver, 'chat').subscribe(data=>{
        console.log('notifica inviata');
      })
    } else {
      this.notificationRest.sendToTopic('Nuovo Messaggio', teaching.name,teaching.name, teaching.name.replace(/ /, ''), teaching.courseDTO.id, 'chat').subscribe( data =>{
        console.log('notifica inviata');
        console.log(teaching.courseDTO.id);
      })

    }

  }

}
