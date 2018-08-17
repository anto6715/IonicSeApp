import { Component, ViewChild } from '@angular/core';
import {AlertController, MenuController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase'

import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {HomeStudentPage} from "../pages/Student/home-student/home-student";
import {LessonPage} from "../pages/Student/lesson/lesson";
import {User} from "../models/user";
import {MaterialPage} from "../pages/material/material";
import {TeachingListPage} from "../pages/teaching-list/teaching-list";
import { FirebaseProvider } from "../providers/firebase/firebase";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  user: User = {} as User;
  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  pages2: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public firebase: FirebaseProvider,
              public menuCtrl: MenuController,
              public alertCtrl: AlertController) {
    this.initializeApp();

    this.user = JSON.parse(localStorage.getItem('user'));

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Modifica', component: HomePage }
    ];
    this.pages2 = [
      { title: 'Orario Lezioni', component: LessonPage },
      { title: 'Chat', component: TeachingListPage}
    ];
  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  logout(){
    //
    this.firebase.addFcmToken(null).subscribe(data=>{
      this.showAlert('logout completato');
      localStorage.removeItem('user');
      this.menuCtrl.close('menuStudent');
      this.nav.setRoot(LoginPage);

    });

  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title:'Login',
      subTitle: message,
      buttons:['OK']

    });
    alert.present();
  }
}
