import {ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {User} from "../../../models/user";
import { NavParams } from "ionic-angular";
import {Professor} from "../../../models/professor";
import { Value } from "../../../Variable";


@Component({
  template: `
    <ion-list>
      <ion-list-header>Invia a:</ion-list-header>
      <ion-buttons>
        <button ion-item (click)="close(publicMessage,' ', ' ',0)" ><ion-icon color="yellowdark" *ngIf="receiver == 0" name="checkmark"></ion-icon>Tutti</button>
        <button ion-item (click)="close(privateMessage,professor.email, professor.name, professor.idUser)" ><ion-icon color="yellowdark" *ngIf="emailReceiver == professor.email" name="checkmark"></ion-icon>Professore</button>
      </ion-buttons>
      <ion-buttons *ngFor="let u of users">
        <button *ngIf="u.id != idUser" ion-item (click)="close(privateMessage,u.email, u.name, u.idUser)" >{{u.name}}<ion-icon color="yellowdark" *ngIf="emailReceiver == u.email" name="checkmark"></ion-icon></button>  
      </ion-buttons>
    </ion-list>
  `
})
export class PopoverPage {

  users:User[]=[];
  idUser:number;
  receiver:number;
  emailReceiver:string;
  professor:Professor = {} as Professor;
  publicMessage:number = Value.public;
  privateMessage:number=Value.private;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams) {
    this.users = navParams.get('users');
    this.idUser = navParams.get('idUser');
    this.receiver = navParams.get('receiver');
    this.emailReceiver= navParams.get('emailReceiver');
    this.professor = navParams.get('professor');

  }

  close(type:number, email:string, name:string, idUser:number) {
    console.log(idUser);
    this.viewCtrl.dismiss({
      type:type,
      emailReceiver: email,
      nameReceiver:name,
      idReceiver:idUser,
    });
  }
}
