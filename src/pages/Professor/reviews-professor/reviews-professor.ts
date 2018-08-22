import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeachingListPage } from "../../Common/teaching-list/teaching-list";
import {HomeProfessorPage} from "../home-professor/home-professor";
import {LessonPage} from "../../Common/lesson/lesson";

/**
 * Generated class for the ReviewsProfessorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviews-professor',
  templateUrl: 'reviews-professor.html',
})
export class ReviewsProfessorPage {
  tab1Root = LessonPage;
  tab2Root = HomeProfessorPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsProfessorPage');
  }

}
