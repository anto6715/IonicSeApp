import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Lesson} from "../../../models/lesson";
import { ReviewRestProvider } from "../../../providers/review-rest/review-rest";
import {User} from "../../../models/user";
import {Review} from "../../../models/review";
import {Value} from "../../../Variable";
import { LessonRestProvider } from "../../../providers/lesson-rest/lesson-rest";
import {Teaching} from "../../../models/teaching";

/**
 * Generated class for the LessonReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lesson-review',
  templateUrl: 'lesson-review.html',
})
export class LessonReviewPage {
  value = Value;
  lesson:Lesson ={
    teachingDTO: {},
    roomDTO:{},
  } as Lesson;
  note:string;
  rate:number;
  enableSend:boolean;
  enableReview:boolean;
  user:User ={} as User;
  newReview: Review = {} as Review;
  review:Review;
  reviews: Review[] = [];
  idLesson:number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public reviewRestProvider: ReviewRestProvider,
              public lessonRestProvider: LessonRestProvider) {

    this.idLesson = navParams.get('idLesson');
    this.getLesson();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getReview();
    console.log(this.lesson);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonReviewPage');
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  getReview() {
    if (this.user.userType == Value.student) {
      this.reviewRestProvider.getReviewLesson(this.user.id, this.idLesson).subscribe(data=>{
        console.log(data);
        this.review = data;
      })
    }
    if (this.user.userType == Value.professor) {
      this.reviewRestProvider.getReviewLessonByIdLesson(this.idLesson).subscribe(data=>{
        this.reviews = data;
      })
    }

  }


  sendReview(){
    this.newReview.rate= this.rate;
    this.newReview.note= this.note;
    this.newReview.idLesson= this.lesson.id;
    this.newReview.idReviewType=1;
    this.newReview.idStudent= this.user.id;
    //console.log(this.newReview);
    this.reviewRestProvider.sendReview(this.newReview, this.lesson.teachingDTO.professorDTO.idUser).subscribe(data=>{
      console.log(data);

      if(data != null){
        this.enableSend=false;
        this.enableReview=true;
        this.showAlert('Recensione inviata correttamente');

      }

    });
  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title:'Avviso',
      subTitle: message,
      buttons:['OK']

    });
    alert.present();
  }


  onModelChange(event) {
    this.rate = event;
    this.enableSend=true;
    console.log(this.rate);
  }

  getLesson(){
    this.lessonRestProvider.getById(this.idLesson).subscribe(data=>{
      this.lesson= data;
      console.log(this.lesson);

      var d = new Date();
      var lessonDate = new Date(this.lesson.date);
      console.log(this.lesson.date);
      console.log(d);
      console.log(lessonDate>d);
      if (lessonDate > d) {

        this.enableSend=false;
        this.enableReview=true;
      }
    })

  }

}
