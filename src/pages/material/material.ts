import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController} from "ionic-angular";
import {Material} from "../../models/material";
import { MaterialRestProvider } from "../../providers/material-rest/material-rest";
import { AlertController } from "ionic-angular";
import {User} from "../../models/user";
import { ReviewRestProvider } from "../../providers/review-rest/review-rest";
import {Review} from "../../models/review";

/**
 * Generated class for the MaterialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-material',
  templateUrl: 'material.html',
})
export class MaterialPage {
  material: Material[] = [];
  review: Review;
  rate:number[] =[];
  modify:boolean;
  user: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public materialRestProvider: MaterialRestProvider,
              public alertCtrl: AlertController,
              public reviewRestProvider: ReviewRestProvider) {


    this.user = JSON.parse(localStorage.getItem('user'));

    this.getMaterialByIdLesson(navParams.get('idLesson'))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaterialPage');
  }

  getMaterialByIdLesson(id:number) {
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
    this.reviewRestProvider.getReview(this.user.id, idMaterial).subscribe(data=>{
      console.log(data);
      this.material[iteration].Review = data;
    })
  }

  onModelChange(event, i:number) {
    this.rate[i] = event;
    console.log(this.rate[i]);
  }
}
