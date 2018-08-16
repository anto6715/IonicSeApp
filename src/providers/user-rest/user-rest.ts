import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {ServerUrl} from "../../Variable";


/*
  Generated class for the UserRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserRestProvider {
  apiUserUrl = `${ServerUrl.url}/student`;

  constructor(public http: HttpClient) {
    console.log('Hello StudentRestProvider Provider');
  }


  getUserByUid(uid: String) {
    return new Promise( resolve => {
      this.http.get(this.apiUserUrl+"/getByUid/"+uid).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err)
      })
    })
  }

  getStudentsByCourse(idCourse:number): Observable<User[]>{
    return this.http.get<User[]>(this.apiUserUrl+'/getByCourse/'+idCourse);
  }
}
