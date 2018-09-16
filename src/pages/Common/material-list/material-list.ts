import {Component, NgZone} from '@angular/core';
import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  ViewController
} from 'ionic-angular';
import {Material} from "../../../models/material";
import {Review} from "../../../models/review";
import {User} from "../../../models/user";
import {Value} from "../../../Variable";
import {MaterialRestProvider} from "../../../providers/material-rest/material-rest";
import {ReviewRestProvider} from "../../../providers/review-rest/review-rest";
import {MaterialReviewsPage} from "../../Professor/material-reviews/material-reviews";
import {LessonRestProvider} from "../../../providers/lesson-rest/lesson-rest";
import {AngularFireStorage } from "angularfire2/storage";
import {Lesson} from "../../../models/lesson";
import firebase from 'firebase';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {AndroidPermissions} from "@ionic-native/android-permissions";
declare var cordova: any;

/**
 * Generated class for the MaterialListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-material-list',
  templateUrl: 'material-list.html',
})
export class MaterialListPage {
  material: Material[] = [];
  note: string[] =[];
  review:Review[]=[];
  rate:number[] =[];
  user: User;
  newReview:Review= {} as Review;
  enableSend:boolean[]= [];
  enableReview:boolean[]=[];
  value = Value;
  idLesson:number;
  idTeaching:number;
  directory:any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public materialRestProvider: MaterialRestProvider,
              public alertCtrl: AlertController,
              public reviewRestProvider: ReviewRestProvider,
              public modalCtrl: ModalController,
              public afStorage: AngularFireStorage,
              public lessonRestProvider: LessonRestProvider,
              public zone: NgZone,
              private toastController: ToastController,
              private transfer: FileTransfer,
              private file: File,
              private androidPermissions: AndroidPermissions) {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );


    this.user = JSON.parse(localStorage.getItem('user'));
    this.idLesson = this.navParams.get('idLesson');
    this.idTeaching = this.navParams.get('idTeaching');
    this.getMaterial();
    this.directory = this.file.dataDirectory;

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MaterialPage');

  }

  getMaterial() {
    let subscription;
    if (this.idLesson != null) {
      subscription = this.materialRestProvider.getMaterialByIdLesson(this.idLesson);
    } else {
      subscription = this.materialRestProvider.getMaterialByIdTeaching(this.idTeaching);
    }
    subscription.subscribe(data=>{
      this.material = data;
      if (data.length == 0){
        console.log("nessun materiale");
        this.showAlert('Non è presente materiale didattico per la lezione selezionata');
        this.dismiss();
      } else {
        console.log("prova");
        this.material.forEach((data,i)=>{
          this.getReview(data.id, i);
        })
      }

      console.log(this.material);
    })
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  download(url:string, name:string){
    this.createToastMessage('Download in corso', 'bottom',1000);
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, cordova.file.externalRootDirectory+'/Download/'+name).then((entry) =>{
      this.createToastMessage('Download completato', 'top',3000)
    }, (error) => {
      this.showAlert(error.code);
    })
  }


  createToastMessage(msg:string, position:string, duration:number) {
    const toast = this.toastController.create({
      message: msg,
      duration: duration,
      position:position,
      showCloseButton: true,
      closeButtonText:'ok'
    });
    toast.onDidDismiss((data, role) =>{
      if (role == 'close') {
        return
      }
    });
    toast.present();
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
    this.reviewRestProvider.getReviewMaterial(this.user.id, idMaterial).subscribe(data=>{
      console.log(data);
      this.material[iteration].Review = data;
    })
  }

  onModelChange(event, i:number) {
    this.rate[i] = event;
    this.enableSend[i]=true;
    console.log(this.rate[i]);
  }

  sendReview(i:number){
    this.newReview.rate= this.rate[i];
    this.newReview.note= this.note[i];
    this.newReview.idMaterial = this.material[i].id;
    this.newReview.idReviewType=2;
    this.newReview.idStudent= this.user.id;
    this.reviewRestProvider.sendReview(this.newReview, this.material[i].idUserProf).subscribe(data=>{
      console.log(data);

      if(data != null){
        this.enableSend[i]=false;
        this.enableReview[i]=true;
        this.showAlert('Recensione inviata correttamente');
      }

    });
  }

  materialReviews(id:number) {
    let profileModal = this.modalCtrl.create(MaterialReviewsPage, {
      idMaterial:id,
    });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }





}
