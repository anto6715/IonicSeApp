import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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
  tab2Root = TeachingListPage;
  tab2Params:any;
  scope:string = 'material';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,) {
    this.tab2Params = {scope: 'material'};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsProfessorPage');
  }



}
