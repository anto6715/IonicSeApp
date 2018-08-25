import {Component, NgZone} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Material} from "../../../models/material";
import {Review} from "../../../models/review";
import {User} from "../../../models/user";
import {Value} from "../../../Variable";
import {MaterialRestProvider} from "../../../providers/material-rest/material-rest";
import {ReviewRestProvider} from "../../../providers/review-rest/review-rest";
import {MaterialReviewsPage} from "../../Professor/material-reviews/material-reviews";
import {LessonRestProvider} from "../../../providers/lesson-rest/lesson-rest";
import {Lesson} from "../../../models/lesson";

/**
 * Generated class for the MaterialListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-material-list',
  templateUrl: 'material-list.html',
})
export class MaterialListPage {
  material: Material[] = [];
  note: string[] =[];
  review:Review[]=[];
  rate:number[] =[];
  user: User;
  newReview:Review= {} as Review;
  enableSend:boolean[]= [];
  enableReview:boolean[]=[];
  value = Value;
  idLesson:number;
  idTeaching:number;
  lesson:Lesson = {} as Lesson;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public materialRestProvider: MaterialRestProvider,
              public alertCtrl: AlertController,
              public reviewRestProvider: ReviewRestProvider,
              public modalCtrl: ModalController,
              public lessonRestProvider: LessonRestProvider,
              public zone: NgZone) {


    this.user = JSON.parse(localStorage.getItem('user'));
    this.idLesson = this.navParams.get('idLesson');
    this.idTeaching = this.navParams.get('idTeaching');
    console.log(this.idLesson);
    console.log(this.idTeaching);
    this.getLesson();

    this.getMaterial()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaterialPage');
  }

  getMaterial() {

      if (this.idLesson != null) {
        this.materialRestProvider.getMaterialByIdLesson(this.idLesson).subscribe(data=>{
          this.material = data;
          if (data.length == 0){
            console.log("nessun materiale");
            this.showAlert('Non è presente materiale didattico per la lezione selezionata');
            this.dismiss();
          } else {
            console.log("prova");
            var i =0;
            this.material.forEach(data=>{
              this.getReview(data.id, i);
              i++;
            })
          }

          console.log(this.material);
        })
      } else {
      this.materialRestProvider.getMaterialByIdTeaching(this.idTeaching).subscribe(data=>{
        this.material = data;
        if (data.length == 0){
          console.log("nessun materiale");
          this.showAlert('Non è presente materiale didattico per l\'insegnamento selezionato');
          this.dismiss();
        } else if (this.user.userType == Value.student) {
          console.log("prova");
          var i =0;
          this.material.forEach(data=>{
            this.getReview(data.id, i);
            i++;
          })
        }
      })
    }


  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  download(link:string){
    console.log(link);
  }


  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title:'Avviso',
      subTitle: message,
      buttons:['OK']

    });
    alert.present();
  }

  getReview(idMaterial:number, iteration:number) {
    this.reviewRestProvider.getReviewMaterial(this.user.id, idMaterial).subscribe(data=>{
      console.log(data);
      this.material[iteration].Review = data;
    })
  }

  onModelChange(event, i:number) {
    this.rate[i] = event;
    this.enableSend[i]=true;
    console.log(this.rate[i]);
  }

  sendReview(i:number){
    this.newReview.rate= this.rate[i];
    this.newReview.note= this.note[i];
    this.newReview.idMaterial = this.material[i].id;
    this.newReview.idReviewType=2;
    this.newReview.idStudent= this.user.id;
    //console.log(this.newReview);
    this.reviewRestProvider.sendReview(this.newReview, this.lesson.teachingDTO.professorDTO.idUser).subscribe(data=>{ // serve id prof del materiale
      console.log(data);

      if(data != null){
        this.enableSend[i]=false;
        this.enableReview[i]=true;
        this.showAlert('Recensione inviata correttamente');
      }

    });
  }

  materialReviews(id:number) {
    let profileModal = this.modalCtrl.create(MaterialReviewsPage, {
      idMaterial:id,
    });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }

  getLesson(){
    if (this.idLesson != null) {
      this.lessonRestProvider.getById(this.idLesson).subscribe(data=>{
        this.lesson= data;
        console.log(this.lesson);
      })
    }


  }
}
