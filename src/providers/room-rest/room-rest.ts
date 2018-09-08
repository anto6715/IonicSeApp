import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ServerUrl} from "../../Variable";
import {Observable} from "rxjs";
import {Room} from "../../models/room";

/*
  Generated class for the RoomRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoomRestProvider {

  apiRoomUrl = `${ServerUrl.url}/room`;

  constructor(public http: HttpClient) {
    console.log('Hello RoomRestProvider Provider');
  }

  public getRoomById(id:number): Observable<Room> {
    return this.http.get<Room>(this.apiRoomUrl+/getById/+id);
  }

}
