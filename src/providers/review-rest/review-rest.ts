import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Lesson} from "../../models/lesson";
import {Review} from "../../models/review";
import {ServerUrl} from "../../Variable";
import { NotificationProvider } from "../notification/notification";

/*
  Generated class for the ReviewRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReviewRestProvider {
  apiReviewUrl = `${ServerUrl.url}/review`;
  constructor(public http: HttpClient,
              public notificationProvider: NotificationProvider) {
    console.log('Hello ReviewRestProvider Provider');
  }

  public getReviewMaterial(idStudent:number, idMaterial): Observable<Review>{
    return this.http.get<Review>(this.apiReviewUrl+"/getByIdStudentAndIdMaterial/"+idStudent+"_"+idMaterial);
  }

  public getReviewLesson(idStudent:number, idLesson): Observable<Review>{
    return this.http.get<Review>(this.apiReviewUrl+"/getByIdStudentAndIdLesson/"+idStudent+"_"+idLesson);
  }

  public getReviewLessonByIdLesson(idLesson:number): Observable<Review[]>{
    return this.http.get<Review[]>(this.apiReviewUrl+"/getByIdLesson/"+idLesson);
  }
  public getReviewMaterialByIdMaterial(idMaterial:number): Observable<Review[]>{
    return this.http.get<Review[]>(this.apiReviewUrl+"/getByIdMaterial/"+idMaterial);
  }




  public sendReview(review:Review, id:number):Observable<Review>{

    let request =  this.http.post<Review>(this.apiReviewUrl+"/save/",{
      "note": review.note,
      "rate": review.rate,
      "idStudent": review.idStudent,
      "idMaterial": review.idMaterial,
      "idReviewType": review.idReviewType,
      "idLesson": review.idLesson
    });
    let data:number;
    if (review.idLesson== null) {
      console.log('material');
      data = review.idMaterial;
      this.notificationProvider.sendToUser('Nuova Recensione','Un suo materiale ha una nuova recensione',data,id,'review-material').subscribe(data=>{
        console.log('notifica inviata');
      })
    }  else {
      console.log('lesson');
      data = review.idLesson;
      this.notificationProvider.sendToUser('Nuova Recensione','Una sua lezione ha una nuova recensione',data,id,'review-lesson').subscribe(data=>{
        console.log('notifica inviata');
      })
    }


    return request;
  }

}
