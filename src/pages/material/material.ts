import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController} from "ionic-angular";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaterialPage');
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

}
