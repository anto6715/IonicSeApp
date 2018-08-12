import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Lesson} from "../../../models/lesson";
import { ReviewRestProvider } from "../../../providers/review-rest/review-rest";
import {User} from "../../../models/user";
import {Review} from "../../../models/review";

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

  lesson:Lesson ={} as Lesson;
  note:string;
  rate:number;
  enableSend:boolean;
  enableReview:boolean;
  user:User ={} as User;
  newReview: Review = {} as Review;
  review:Review;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public reviewRestProvider: ReviewRestProvider) {

    this.lesson = navParams.get('lesson');
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getReview(this.lesson.id);
    console.log(this.lesson);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonReviewPage');
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  getReview(idLesson:number) {
    this.reviewRestProvider.getReviewLesson(this.user.id, idLesson).subscribe(data=>{
      console.log(data);
      this.review = data;
    })
  }


  sendReview(){
    this.newReview.rate= this.rate;
    this.newReview.note= this.note;
    this.newReview.idLesson= this.lesson.id;
    this.newReview.idReviewType=1;
    this.newReview.idStudent= this.user.id;
    //console.log(this.newReview);
    this.reviewRestProvider.sendReview(this.newReview).subscribe(data=>{
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

}
