import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Material} from "../../models/material";

/*
  Generated class for the MaterialRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MaterialRestProvider {
  apiMaterialUrl = 'http://192.168.1.5:8080/SeApp/material/';

  constructor(public http: HttpClient) {
    console.log('Hello MaterialRestProvider Provider');
  }

  getMaterialByIdLesson(id:number): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiMaterialUrl+"getByIdLesson/"+id);
  }

}
