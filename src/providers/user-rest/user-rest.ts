import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {ServerUrl} from "../../Variable";
import { Token } from "../../models/token";
import {AlertController} from "ionic-angular";


/*
  Generated class for the UserRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserRestProvider {
  apiUserUrl = `${ServerUrl.url}/student`;


  constructor(public http: HttpClient,
              public alertCtrl: AlertController,) {
    console.log('Hello StudentRestProvider Provider');
  }


  getUserByUid(uid: String) {
    return new Promise( resolve => {
      this.http.get(this.apiUserUrl+"/getByUid/"+uid).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err)
      })
    })
  }

  getStudentsByCourse(idCourse:number): Observable<User[]>{
    return this.http.get<User[]>(this.apiUserUrl+'/getByCourse/'+idCourse);
  }




  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title:'Login',
      subTitle: message,
      buttons:['OK']

    });
    alert.present();
  }
}
