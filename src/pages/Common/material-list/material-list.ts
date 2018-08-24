import {Component, NgZone} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Material} from "../../../models/material";
import {Review} from "../../../models/review";
import {User} from "../../../models/user";
import {Value} from "../../../Variable";
import {MaterialRestProvider} from "../../../providers/material-rest/material-rest";
import {ReviewRestProvider} from "../../../providers/review-rest/review-rest";
import {MaterialReviewsPage} from "../../Professor/material-reviews/material-reviews";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public materialRestProvider: MaterialRestProvider,
              public alertCtrl: AlertController,
              public reviewRestProvider: ReviewRestProvider,
              public modalCtrl: ModalController,
              public zone: NgZone) {


    this.user = JSON.parse(localStorage.getItem('user'));

    this.getMaterial()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaterialPage');
  }

  getMaterial() {
    let id = this.navParams.get('id');
    if (this.user.userType == Value.student) {
      this.materialRestProvider.getMaterialByIdLesson(id).subscribe(data=>{
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
    }

    if (this.user.userType == Value.professor) {
      this.materialRestProvider.getMaterialByIdTeaching(id).subscribe(data=>{
        this.material = data;
        if (data.length == 0){
          console.log("nessun materiale");
          this.showAlert('Non è presente materiale didattico per l\'insegnamento selezionato');
          this.dismiss();
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
    this.reviewRestProvider.sendReview(this.newReview).subscribe(data=>{
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
      id:id,
    });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }
}
