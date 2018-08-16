import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from "@ionic-native/firebase";
import { Platform} from "ionic-angular";
import { AngularFirestore} from "angularfire2/firestore";

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public http: HttpClient,
              public firebaseNative: Firebase,
              public afs: AngularFirestore,
              private platform: Platform) {
    console.log('Hello FirebaseProvider Provider');
  }


  async getToken(){
    let token;
    console.log('qua');
    if (this.platform.is('android')) {
      console.log('cordova');
      token = await this.firebaseNative.getToken();
      console.log(token);
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    return this.saveTokenToFirestore(token)
  }

  private saveTokenToFirestore(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices')

    const docData = {
      token,
      userId: 'testUser',
    };

    return devicesRef.doc(token).set(docData)
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }

}
