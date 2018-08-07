import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from "@ionic/storage";
import { HomeStudentPage } from "../pages/home-student/home-student";
import { HomeProfessorPage } from "../pages/home-professor/home-professor";


var config = {
  apiKey: "AIzaSyCZ3Ha8coWfTCEFYbwnm2ia3iN6GvJpVls",
  authDomain: "seapp-17679.firebaseapp.com",
  databaseURL: "https://seapp-17679.firebaseio.com",
  projectId: "seapp-17679",
  storageBucket: "seapp-17679.appspot.com",
  messagingSenderId: "462401369686"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    HomeStudentPage,
    HomeProfessorPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    HomeStudentPage,
    HomeProfessorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
