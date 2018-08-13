import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Teaching} from "../../models/teaching";


/*
  Generated class for the TeachingRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TeachingRestProvider {

  apiTeachingUrl = 'http://192.168.1.5:8080/SeApp/teaching/';

  constructor(public http: HttpClient) {
    console.log('Hello TeachingRestProvider Provider');
  }


  getTeachingByCourse(idCourse:number): Observable<Teaching[]>{
    return this.http.get<Teaching[]>(this.apiTeachingUrl+"getByIdCourse/"+idCourse);
  }



}
