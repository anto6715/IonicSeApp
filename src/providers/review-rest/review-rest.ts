import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Lesson} from "../../models/lesson";
import {Review} from "../../models/review";

/*
  Generated class for the ReviewRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReviewRestProvider {
  apiReviewUrl = 'http://192.168.1.5:8080/SeApp/review/';
  constructor(public http: HttpClient) {
    console.log('Hello ReviewRestProvider Provider');
  }

  public getReview(idStudent:number, idMaterial): Observable<Review>{
    return this.http.get<Review>(this.apiReviewUrl+"getByIdStudentAndIdMaterial/"+idStudent+"_"+idMaterial);
  }

  public sendReview(review:Review):Observable<Review>{
    return this.http.post<Review>(this.apiReviewUrl+"save/",{
      "note": review.note,
      "rate": review.rate,
      "idStudent": review.idStudent,
      "idMaterial": review.idMaterial,
      "idReviewType":2
    });
  }

}
