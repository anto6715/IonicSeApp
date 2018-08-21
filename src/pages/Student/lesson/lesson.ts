import {Component, ViewChild, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LessonRestProvider } from "../../../providers/lesson-rest/lesson-rest";
import {Lesson} from "../../../models/lesson";
import {ModalController} from "ionic-angular";
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from "ion2-calendar";
import { MaterialPage } from "../material/material";
import {LessonReviewPage} from "../lesson-review/lesson-review";

/**
 * Generated class for the LessonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
})
export class LessonPage{


  user:any;
  lesson: Lesson[] = [];
  searchDate: string;
  title: string;
  todayDate: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lessonRestProvider: LessonRestProvider,
              public modalCtrl: ModalController,
              public zone: NgZone
              ) {

    this.user = JSON.parse(localStorage.getItem('user'));
    var d = new Date();
    var MM = d.getMonth() +1;
    this.todayDate = d.getFullYear()+"-"+MM+"-"+d.getUTCDate();
    this.getLesson(this.todayDate,this.user.idCourse);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonPage');
  }

  getLesson(date: string, id:number) {
    this.lessonRestProvider.getLessonStudentByDate(date,id).subscribe(data=>{
      //console.log(data);
      this.zone.run(()=>this.lesson = data);
      if (data.length ==0){
        if (this.searchDate == null){
          this.title= 'Nessuna lezione    ' + this.todayDate;
        } else {
          this.title= 'Nessuna lezione    ' + this.searchDate;
        }

      } else {
        this.title = date;
      }
      console.log(this.lesson);

    })
  }

  openCalendar() {
    const options: CalendarModalOptions = {
      title: 'Calendario',
      disableWeeks: [0,6],
      pickMode: 'single',
      cssClass: 'calendario',
      canBackwardsSelected:true,




    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: string) => {
      if (type === 'done') {
        this.searchDate = date.years+"-"+date.months+"-"+date.date;
        this.getLesson(this.searchDate,this.user.idCourse);
      }
    })
  }

  materialModal(id:number) {
    let profileModal = this.modalCtrl.create(MaterialPage, {idLesson: id});
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }

  reviewModal(i:number){
    let profileModal = this.modalCtrl.create(LessonReviewPage, {lesson: this.lesson[i]});
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();

  }




}
