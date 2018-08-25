import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Review} from "../../../models/review";
import { ReviewRestProvider } from "../../../providers/review-rest/review-rest";
import {Material} from "../../../models/material";
import { MaterialRestProvider } from "../../../providers/material-rest/material-rest";

/**
 * Generated class for the MaterialReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-material-reviews',
  templateUrl: 'material-reviews.html',
})
export class MaterialReviewsPage {

  material:Material = {} as Material;
  reviews:Review[] = [];
  idMaterial:number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              public reviewRestProvider: ReviewRestProvider,
              public materialRestProvider: MaterialRestProvider) {
    this.idMaterial = this.navParams.get('idMaterial');
    this.getMaterial();
    this.getReviews();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaterialReviewsPage');
  }

  getMaterial() {
    this.materialRestProvider.getMaterialById(this.idMaterial).subscribe(data=>{
      this.material = data;
    })
  }

  getReviews() {
    this.reviewRestProvider.getReviewMaterialByIdMaterial(this.idMaterial).subscribe(data=>{
      this.reviews = data;
      console.log(this.reviews);
      if (data.length == 0) {
        this.showAlert('Nessuna recensione per il materiale selezionato');
        this.dismiss();
      }
    })
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title:'Avviso',
      subTitle: message,
      buttons:['OK']

    });
    alert.present();
  }

}
