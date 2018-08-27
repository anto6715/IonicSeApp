import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../../models/user";
import {Segnalation} from "../../../models/segnalation";
import { SegnalationRestProvider } from "../../../providers/segnalation-rest/segnalation-rest";
import { SegnalationState } from "../../../Variable";

/**
 * Generated class for the SegnalationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-segnalation-list',
  templateUrl: 'segnalation-list.html',
})
export class SegnalationListPage {

  user:User = {} as User;
  segnalations: Segnalation[] = [];
  segnalationState = SegnalationState;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public segnalationrestProvider: SegnalationRestProvider) {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.getSegnalation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SegnalationListPage');
  }

  getSegnalation(){
    this.segnalationrestProvider.getSegnalationByIdProf(this.user.id).subscribe(data=>{
      this.segnalations= data;
      console.log(this.segnalations);
    })

  }

}
