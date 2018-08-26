import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {NotificationHandler} from "../../Common/handler/NotificationHandler";
import {User} from "../../../models/user";
import {Course} from "../../../models/course";
import { CourseRestProvider } from "../../../providers/course-rest/course-rest";
import { TeachingRestProvider } from "../../../providers/teaching-rest/teaching-rest";
import {tap} from "rxjs/operators";
import {FirebaseProvider} from "../../../providers/firebase/firebase";

/**
 * Generated class for the HomeProfessorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-professor',
  templateUrl: 'home-professor.html',
})
export class HomeProfessorPage {

  handler: NotificationHandler;
  user: User={} as User;
  courses: Course[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private platform: Platform,
              public menuCtrl: MenuController,
              public fcm: FirebaseProvider,
              private toastController: ToastController,
              public courseRestProvider: CourseRestProvider,
              public teachingRestProvider: TeachingRestProvider) {

    this.handler = new NotificationHandler(platform, navCtrl);
    this.menuCtrl.enable(true,'menuProfessor');
    this.menuCtrl.enable(false,'menuStudent');

    this.user =    JSON.parse(localStorage.getItem('user'));

    this.getCourses(this.user.id);

    this.teachingRestProvider.getByIdProf(this.user.id).subscribe(data=>{
      data.forEach(teaching=>{
        this.fcm.subscribeTopic(teaching.name.replace(/ /, '')+"_"+teaching.courseDTO.id).pipe(
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeProfessorPage');
  }

  getCourses(id:number){
    this.courseRestProvider.getCourseByIdProf(id).subscribe(data =>{
      this.courses = data;
      console.log(this.courses);
    })
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

}
