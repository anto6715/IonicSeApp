import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Lesson} from "../../models/lesson";
import {Review} from "../../models/review";
import {ServerUrl} from "../../Variable";

/*
  Generated class for the ReviewRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReviewRestProvider {
  apiReviewUrl = `${ServerUrl.url}/review`;
  constructor(public http: HttpClient) {
    console.log('Hello ReviewRestProvider Provider');
  }

  public getReviewMaterial(idStudent:number, idMaterial): Observable<Review>{
    return this.http.get<Review>(this.apiReviewUrl+"/getByIdStudentAndIdMaterial/"+idStudent+"_"+idMaterial);
  }

  public getReviewLesson(idStudent:number, idLesson): Observable<Review>{
    return this.http.get<Review>(this.apiReviewUrl+"/getByIdStudentAndIdLesson/"+idStudent+"_"+idLesson);
  }

  public sendReview(review:Review):Observable<Review>{
    return this.http.post<Review>(this.apiReviewUrl+"/save/",{
      "note": review.note,
      "rate": review.rate,
      "idStudent": review.idStudent,
      "idMaterial": review.idMaterial,
      "idReviewType": review.idReviewType,
      "idLesson": review.idLesson
    });
  }

}
