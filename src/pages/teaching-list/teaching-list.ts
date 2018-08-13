import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Teaching} from "../../models/teaching";
import { TeachingRestProvider } from "../../providers/teaching-rest/teaching-rest";
import {User} from "../../models/user";
import {ChatPage} from "../chat/chat";

/**
 * Generated class for the TeachingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teaching-list',
  templateUrl: 'teaching-list.html',
})
export class TeachingListPage {

  teaching:Teaching[] =[];
  user: User ={} as User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public teachingRestProvider: TeachingRestProvider) {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.getTeachingByCourse(this.user.idCourse);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeachingListPage');
  }


  getTeachingByCourse(idCourse:number){
    this.teachingRestProvider.getTeachingByCourse(idCourse).subscribe(data=>{
      console.log(data);
      this.teaching = data;
    })

  }

  startChat(i:number) {
    this.navCtrl.push(ChatPage, {'teaching':this.teaching[i]});

  }
}
