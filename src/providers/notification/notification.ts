import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ServerUrl} from "../../Variable";
import { Notification} from "../../models/notification";
import {Observable} from "rxjs";
import {User} from "../../models/user";

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {
  user:User = {} as User;


  apiNotificationUrl = `${ServerUrl.url}/notification`;

  constructor(public http: HttpClient) {
    console.log('Hello NotificationProvider Provider');
  }

  sendToUser(title:string, body:string, data:any, idUser:number, type:string): Observable<any>{

    let notification: Notification = {
      title: title,
      body: body,
      data: data,
      type: type,
      idUser: idUser,
      token_topic:'',
    };

    return this.http.post<any>(this.apiNotificationUrl+"/sendToUser", notification);

  }

  sendToTopic(title:string, body:string, data:any, topic:string, idCourse:number, type:string){

    this.user = JSON.parse(localStorage.getItem('user'));
    let notification: Notification = {
      title: title,
      body: body,
      data: data,
      type: type,
      idUser:0,
      token_topic: topic+"_"+idCourse,
    };

    return this.http.post<any>(this.apiNotificationUrl+"/sendToTopic", notification);
  }

}
