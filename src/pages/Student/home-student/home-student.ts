import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import {HomePage} from "../../home/home";
import { MenuController} from "ionic-angular";
import {User } from "../../../models/user";

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
  user: User;
  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public menuCtrl: MenuController) {

  this.menuCtrl.enable(false,'menuProfessor');
  this.menuCtrl.enable(true,'menuStudent');

  this.user =    JSON.parse(localStorage.getItem('user'));

  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeStudentPage');
  }

}
