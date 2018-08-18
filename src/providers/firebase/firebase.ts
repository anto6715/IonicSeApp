import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from "@ionic-native/firebase";
import {AlertController, Platform} from "ionic-angular";
import { AngularFirestore} from "angularfire2/firestore";
import { UserRestProvider } from "../user-rest/user-rest";
import {from, Observable} from "rxjs";
import {Token} from "../../models/token";
import {ServerUrl} from "../../Variable";
import {User} from "../../models/user";

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  apiFcmUrl = `${ServerUrl.url}/user`;
  tkn:Token = {} as Token;
  user:User;

  constructor(public http: HttpClient,
              public firebaseNative: Firebase,
              public alertCtrl: AlertController,
              public afs: AngularFirestore,
              private platform: Platform,
              public userRest: UserRestProvider) {
    console.log('Hello FirebaseProvider Provider');
  }


  async getToken(idUser:number){
    let token;
    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken();

      console.log(token);
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    this.addFcmToken(token).subscribe(data=>{
      this.tkn = data;
      this.showAlert(this.tkn.token);
      this.showAlert('fatto');
    })
  }

  private saveTokenToFirestore(token,idUser) {


    this.addFcmToken(token).subscribe(data=>{
      console.log(data);
    }, err=>console.log(err));
  }

  public listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }

  addFcmToken(token:string):Observable<Token>{

    this.user = JSON.parse(localStorage.getItem('user'));
    this.showAlert(this.user.name);
    this.showAlert(this.user.idUser.toString());

    return this.http.post<Token>(this.apiFcmUrl+'/addFcmToken',{
      "idUser":this.user.idUser,
      "token":token,
    } );
  }

  public subscribeTopic(topic:string){
    return from(this.firebaseNative.subscribe(topic));
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
