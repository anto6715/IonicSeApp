import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Lesson} from "../../models/lesson";


/*
  Generated class for the LessonRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LessonRestProvider {
  apiLessonUrl = 'http://192.168.1.5:8080/SeApp/lesson/';

  constructor(public http: HttpClient) {
    console.log('Hello LessonRestProvider Provider');
  }

  getLessonStudentByDate(date:string, id: number):Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.apiLessonUrl + "getByDate/" + date + "_" + id);
  }

}
