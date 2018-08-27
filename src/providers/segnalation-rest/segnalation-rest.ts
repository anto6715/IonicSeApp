import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Segnalation} from "../../models/segnalation";
import {ServerUrl} from "../../Variable";

/*
  Generated class for the SegnalationRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SegnalationRestProvider {

  apiSegnalationUrl = `${ServerUrl.url}/segnalation`;

  constructor(public http: HttpClient) {
    console.log('Hello SegnalationRestProvider Provider');
  }

  getSegnalationByIdProf(id:number): Observable<Segnalation[]> {
    return this.http.get<Segnalation[]>(this.apiSegnalationUrl+/getByIdProfessor/+id);
  }

}
