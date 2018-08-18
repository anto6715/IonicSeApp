import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { MenuController} from "ionic-angular";
import {User } from "../../../models/user";
import { FirebaseProvider } from "../../../providers/firebase/firebase";
import {tap} from "rxjs/operators";
import { ToastController} from "ionic-angular";
import { UserRestProvider} from "../../../providers/user-rest/user-rest";
import {Token} from "../../../models/token";
import {TeachingListPage} from "../../teaching-list/teaching-list";
import { NotificationProvider } from "../../../providers/notification/notification";
import {Teaching} from "../../../models/teaching";
import { TeachingRestProvider } from "../../../providers/teaching-rest/teaching-rest";


/**
 * Generated class for the HomeStudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-student',
  templateUrl: 'home-student.html',
})
export class HomeStudentPage {
  user: User={} as User;
  tkn: Token;
  teaching: Teaching[] =[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public menuCtrl: MenuController,
              public alertCtrl: AlertController,
              public fcm: FirebaseProvider,
              public toastCtrl: ToastController,
              private toastController: ToastController,
              public teachingRest: TeachingRestProvider,
              public notificationRest: NotificationProvider) {

  this.menuCtrl.enable(false,'menuProfessor');
  this.menuCtrl.enable(true,'menuStudent');
  this.user =    JSON.parse(localStorage.getItem('user'));
  this.teachingRest.getTeachingByCourse(this.user.idCourse).subscribe(data=>{
    data.forEach(teaching =>{
      this.fcm.subscribeTopic(teaching.name.replace(/ /, '')).pipe(
        tap (msg =>{
          const toast = this.toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      ).subscribe();
    })
  });







    if (!this.user.token) {
      this.fcm.getToken(this.user.idUser);
    }
    this.fcm.listenToNotifications().pipe(
      tap(msg => {
        // show a toast
        this.navCtrl.push(TeachingListPage);
        const toast = this.toastCtrl.create({
          message: msg.body,
          duration: 3000
        });
        toast.present();
      })
    )
      .subscribe()





  }

  createToastMessage(msg) {
    const toast = this.toastController.create({
      message: msg.body,
      duration: 3000
    });
    toast.present();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeStudentPage');


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

