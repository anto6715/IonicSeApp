import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUserUrl = 'http://192.168.1.3:8080/SeApp/student/getByUid/'

  constructor(public http: HttpClient) {
  }

  getUserByUid(uid: String) {
    return new Promise( resolve => {
      this.http.get(this.apiUserUrl+uid).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err)
      })
    })
  }

}
