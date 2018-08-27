import { Component, ViewChild } from '@angular/core';
import {AlertController, MenuController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/Common/login/login";
import {HomeStudentPage} from "../pages/Student/home-student/home-student";
import {LessonPage} from "../pages/Common/lesson/lesson";
import {User} from "../models/user";
import {TeachingListPage} from "../pages/Common/teaching-list/teaching-list";
import { FirebaseProvider } from "../providers/firebase/firebase";
import { Value } from "../Variable";
import {HomeProfessorPage} from "../pages/Professor/home-professor/home-professor";
import {ReviewsProfessorPage} from "../pages/Professor/reviews-professor/reviews-professor";
import {SegnalationListPage} from "../pages/Professor/segnalation-list/segnalation-list";

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
      { title: 'Orario Lezioni', component: LessonPage },
      { title: 'Chat', component: TeachingListPage},
      { title: 'Recensioni', component: ReviewsProfessorPage},
      { title: 'Segnalazioni', component: SegnalationListPage}

    ];
    this.pages2 = [
      { title: 'Orario Lezioni', component: LessonPage },
      { title: 'Chat', component: TeachingListPage},
      { title: 'Materiale Didattico', component: TeachingListPage}
    ];
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(this.user != null) {
        if (this.user.userType == Value.student) {
          this.nav.setRoot(HomeStudentPage);
        }
        if (this.user.userType == Value.professor) {
          this.nav.setRoot(HomeProfessorPage);
        }
      }
    });

  }

  openPage(page) {
    console.log('prova');
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == 'Chat') {

      this.nav.push(page.component, {
        scope:'chat',
      });
    }
    else if (page.title == 'Materiale Didattico') {
      this.nav.push(page.component, {
        scope: 'material',
      });
    } else {
      this.nav.push(page.component);
    }
  }

  logout(){
    //
    this.firebase.addFcmToken(null).subscribe(data=>{
      this.showAlert('logout completato');
      localStorage.removeItem('user');
      this.menuCtrl.close('menuStudent');
      this.menuCtrl.close('menuProfessor');
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
