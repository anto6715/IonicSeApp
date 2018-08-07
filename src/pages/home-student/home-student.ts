import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

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
  user: any;
  course: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage) {



  this.user =    JSON.parse(localStorage.getItem('user'));
  console.log(this.user.courseDTO.name);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeStudentPage');
  }

}
