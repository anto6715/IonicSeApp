import {Component, ViewChild, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LessonRestProvider } from "../../../providers/lesson-rest/lesson-rest";
import {Lesson} from "../../../models/lesson";
import {ModalController} from "ionic-angular";
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from "ion2-calendar";
import { MaterialListPage } from "../material-list/material-list";
import {LessonReviewPage} from "../lesson-review/lesson-review";
import {User} from "../../../models/user";
import {Value} from "../../../Variable";

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


  user:User = {} as User;
  lesson: Lesson[] = [];
  searchDate: string;
  title: string;
  todayDate: string;
  value = Value;

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
    this.getLesson(this.todayDate);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonPage');
  }

  getLesson(date: string) {

    if (this.user.userType == Value.student){
      this.lessonRestProvider.getLessonStudentByDate(date,this.user.idCourse).subscribe(data=>{
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

    if (this.user.userType == Value.professor) {
      this.lessonRestProvider.getLessonProfByDate(date,this.user.id).subscribe(data=>{
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
        this.getLesson(this.searchDate);
      }
    })
  }

  materialModal(id:number) {
    let profileModal = this.modalCtrl.create(MaterialListPage, {idLesson: id});
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }

  reviewModal(i:number){
    let profileModal = this.modalCtrl.create(LessonReviewPage, {idLesson: this.lesson[i].id});
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();

  }




}
