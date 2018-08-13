import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import {HomeStudentPage} from "../Student/home-student/home-student";
import { UserRestProvider} from "../../providers/user-rest/user-rest";
import * as firebase from 'firebase'
var config = {
  apiKey: "AIzaSyCZ3Ha8coWfTCEFYbwnm2ia3iN6GvJpVls",
  authDomain: "seapp-17679.firebaseapp.com",
  databaseURL: "https://seapp-17679.firebaseio.com",
  projectId: "seapp-17679",
  storageBucket: "seapp-17679.appspot.com",
  messagingSenderId: "462401369686"
};
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild("username") uname;
  @ViewChild("password") passwd;
  user: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public fireAuth: AngularFireAuth,
              private userRestProvider: UserRestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signInUser() {


      this.fireAuth.auth.signInWithEmailAndPassword(this.uname.value, 'prova123')
      .then(data =>{
        console.log(data);
        this.getUser(data.user.uid);
        this.showAlert('Successfull log in');
        this.navCtrl.setRoot(HomeStudentPage);
      })
      .catch(err =>{
        console.log(err.message);
        this.showAlert(err.message);
      })


  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title:'Login',
      subTitle: message,
      buttons:['OK']

    });
    alert.present();
  }

  getUser(uid: string) {
    this.userRestProvider.getUserByUid(uid)
      .then(data=>{
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch(err=>{
        console.log(err.message);
      })
  }
}
