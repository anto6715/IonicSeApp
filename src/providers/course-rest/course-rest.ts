import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ServerUrl} from "../../Variable";
import {Observable} from "rxjs";
import {Course} from "../../models/course";

/*
  Generated class for the CourseRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CourseRestProvider {
  apiCourseUrl = `${ServerUrl.url}/course`;

  constructor(public http: HttpClient) {
    console.log('Hello CourseRestProvider Provider');
  }

  getCourseByIdProf(id:number): Observable<Course[]>{
    return this.http.get<Course[]>(this.apiCourseUrl+"/getByIdProf/"+id);
  }

}
