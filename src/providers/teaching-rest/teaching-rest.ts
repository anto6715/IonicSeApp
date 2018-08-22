import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Teaching} from "../../models/teaching";
import { ServerUrl } from "../../Variable";


/*
  Generated class for the TeachingRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TeachingRestProvider {

  apiTeachingUrl = `${ServerUrl.url}/teaching`;

  constructor(public http: HttpClient) {
    console.log('Hello TeachingRestProvider Provider');
  }


  getTeachingByCourse(idCourse:number): Observable<Teaching[]>{
    return this.http.get<Teaching[]>(this.apiTeachingUrl+"/getByIdCourse/"+idCourse);
  }

  getByNameAndIdCourse(name:string, idCourse:number): Observable<Teaching>{
    return this.http.get<Teaching>(this.apiTeachingUrl+"/getByNameAndIdCourse/"+name+"_"+idCourse);
  }

  getByIdProf(id:number): Observable<Teaching[]> {
   return this.http.get<Teaching[]>(this.apiTeachingUrl +"/getByIdProf/"+id);
  }

  getByNameAndIdProf(name:string,id:number): Observable<Teaching>{
    return this.http.get<Teaching>(this.apiTeachingUrl+"/getByNameAndIdProf/"+name+"_"+id);
  }



}
