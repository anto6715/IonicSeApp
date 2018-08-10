import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Lesson} from "../../models/lesson";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUserUrl = 'http://localhost:8080/SeApp/student/getByUid/'
  apiLessonUrl = 'http://localhost:8080/SeApp/lesson/getByDate/'

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

  getLessonByDate(date:string, id: number):Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.apiLessonUrl + date + "_" + id);
  }

}
