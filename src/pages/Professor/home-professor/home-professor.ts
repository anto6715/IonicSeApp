import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {NotificationHandler} from "../../Common/handler/NotificationHandler";
import {User} from "../../../models/user";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private platform: Platform,
              public menuCtrl: MenuController,) {

    this.handler = new NotificationHandler(platform, navCtrl);
    this.menuCtrl.enable(true,'menuProfessor');
    this.menuCtrl.enable(false,'menuStudent');


    this.user =    JSON.parse(localStorage.getItem('user'));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeProfessorPage');
  }

}
