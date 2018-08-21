import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { AlertController } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import {HomeStudentPage} from "../../Student/home-student/home-student";
import { UserRestProvider} from "../../../providers/user-rest/user-rest";
import { Value } from "../../../Variable";
import {User} from "../../../models/user";
import {HomeProfessorPage} from "../../Professor/home-professor/home-professor";

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
  user: User = {} as User;

  constructor(public navCtrl: NavController,
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
        this.user = data;
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));

        this.showAlert('Successfull log in');
        if (this.user.userType == Value.student){
          this.navCtrl.setRoot(HomeStudentPage);
        } else if (this.user.userType == Value.professor) {
          this.navCtrl.setRoot(HomeProfessorPage);
        } else {
          this.showAlert('utente non riconosciuto');
        }

      })
      .catch(err=>{
        console.log(err.message);
      })
  }
}
