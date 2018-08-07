import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user:any;
  constructor(public navCtrl: NavController,
              private storage: Storage) {

    this.user = JSON.parse(window.localStorage.user);
    console.log(this.user);
  }



}
