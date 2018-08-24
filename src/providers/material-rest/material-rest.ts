import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Material} from "../../models/material";
import {ServerUrl} from "../../Variable";

/*
  Generated class for the MaterialRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MaterialRestProvider {
  apiMaterialUrl = `${ServerUrl.url}/material`;

  constructor(public http: HttpClient) {
    console.log('Hello MaterialRestProvider Provider');
  }

  getMaterialByIdLesson(id:number): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiMaterialUrl+"/getByIdLesson/"+id);
  }

  getMaterialByIdTeaching(id:number): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiMaterialUrl+"/getByIdTeaching/"+id);
  }

  getMaterialById(id:number): Observable<Material> {
    return this.http.get<Material>(this.apiMaterialUrl+"/getById/"+id);
  }

}
