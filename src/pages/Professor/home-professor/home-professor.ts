import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {NotificationHandler} from "../../Common/handler/NotificationHandler";
import {User} from "../../../models/user";
import {Course} from "../../../models/course";
import { CourseRestProvider } from "../../../providers/course-rest/course-rest";

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
              public courseRestProvider: CourseRestProvider) {

    this.handler = new NotificationHandler(platform, navCtrl);
    this.menuCtrl.enable(true,'menuProfessor');
    this.menuCtrl.enable(false,'menuStudent');


    this.user =    JSON.parse(localStorage.getItem('user'));
    this.getCourses(this.user.id);

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

}
