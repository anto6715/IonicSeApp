import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ServerUrl} from "../../Variable";
import { Notification} from "../../models/notification";
import {Observable} from "rxjs";

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {


  apiNotificationUrl = `${ServerUrl.url}/notification`;

  constructor(public http: HttpClient) {
    console.log('Hello NotificationProvider Provider');
  }

  sendNotification(title:string, body:string, data:string, idUser:number): Observable<any>{

    let notification: Notification = {
      title: title,
      body: body,
      data: data,
      idUser: idUser,
    };

    return this.http.post<any>(this.apiNotificationUrl+"/sendToUser", notification);

  }

}
