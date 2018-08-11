import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController} from "ionic-angular";
import {Material} from "../../models/material";
import { MaterialRestProvider } from "../../providers/material-rest/material-rest";
import { AlertController } from "ionic-angular";

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
  rate:any =3;
  modify:boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public materialRestProvider: MaterialRestProvider,
              public alertCtrl: AlertController) {

    this.modify=true;

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
      }
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

  onModelChange(event) {
    this.rate = event;
    console.log(this.rate);
  }
}
