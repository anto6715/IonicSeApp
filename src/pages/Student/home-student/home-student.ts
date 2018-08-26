import { Component } from '@angular/core';
import { IonicPage, NavController, Platform} from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { MenuController} from "ionic-angular";
import {User } from "../../../models/user";
import { FirebaseProvider } from "../../../providers/firebase/firebase";
import { tap } from "rxjs/operators";
import { ToastController} from "ionic-angular";
import {Teaching} from "../../../models/teaching";
import { TeachingRestProvider } from "../../../providers/teaching-rest/teaching-rest";
import { NotificationHandler} from "../../Common/handler/NotificationHandler";


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
  teaching: Teaching[] =[];
  handler: NotificationHandler;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public menuCtrl: MenuController,
              public fcm: FirebaseProvider,
              private toastController: ToastController,
              public teachingRest: TeachingRestProvider,
              private platform: Platform) {


    this.handler = new NotificationHandler(platform, navCtrl);
    this.menuCtrl.enable(false,'menuProfessor');
    this.menuCtrl.enable(true,'menuStudent');

    this.user =    JSON.parse(localStorage.getItem('user'));

    this.teachingRest.getTeachingByCourse(this.user.idCourse).subscribe(data=>{
      data.forEach(teaching =>{
        this.fcm.subscribeTopic(teaching.name.replace(/ /, '')+"_"+this.user.idCourse).pipe(
          tap (msg =>{
            this.createToastMessage(msg.body);
          })
        ).subscribe();
      })
    });

    if (!this.user.token) {
      this.fcm.getToken(this.user.idUser);
    }
    this.fcm.listenToNotifications().subscribe(res => {
      if(res.tap) {
        // background mode
        this.handler.notificationHandler(res)
      } else {
        // foreground mode
        this.createToastMessage(res);
      }
    });
  }

  createToastMessage(msg) {
    const toast = this.toastController.create({
      message: 'Nuovo Messaggio:'+ msg.body,
      duration: 3000,
      position:'top',
      showCloseButton: true,
      closeButtonText:'apri'
    });
    toast.onDidDismiss((data, role) =>{
      if (role == 'close') {
        this.handler.notificationHandler(msg);
      }
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
}

