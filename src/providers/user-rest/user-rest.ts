import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../models/user";


/*
  Generated class for the UserRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserRestProvider {
  apiUserUrl = 'http://localhost:8080/SeApp/student/'

  constructor(public http: HttpClient) {
    console.log('Hello StudentRestProvider Provider');
  }


  getUserByUid(uid: String) {
    return new Promise( resolve => {
      this.http.get(this.apiUserUrl+"getByUid/"+uid).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err)
      })
    })
  }
}
