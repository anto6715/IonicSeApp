import {Component, ViewChild, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestProvider } from "../../../providers/rest/rest";
import {Lesson} from "../../../models/lesson";
import {ModalController} from "ionic-angular";
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from "ion2-calendar";
import { ViewController} from "ionic-angular";
import { Content} from "ionic-angular";

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
  @ViewChild(Content) content: Content;


  user:any;
  lesson: Lesson[] = [];
  searchDate: string;
  title: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restProvider: RestProvider,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public zone: NgZone
              ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    var d = new Date();
    var MM = d.getMonth() +1;
    var date = d.getFullYear()+"-"+MM+"-"+d.getUTCDate();
    this.getLesson(date,this.user.idCourse);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonPage');
  }

  getLesson(date: string, id:number) {
    this.restProvider.getLessonByDate(date,id).subscribe(data=>{
      //console.log(data);
      this.zone.run(()=>this.lesson = data);
      if (data.length ==0){
        this.title= 'Nessuna lezione oggi';
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

}
