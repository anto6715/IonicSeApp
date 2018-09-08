import { Component } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  Marker, ILatLng
} from '@ionic-native/google-maps';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RoomRestProvider } from "../../../providers/room-rest/room-rest";
import {Room} from "../../../models/room";

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  map: GoogleMap;
  idRoom:number;
  room:Room = {} as Room;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public roomRestProvider: RoomRestProvider) {
    this.idRoom=this.navParams.get("id");
    this.getRoom();
  }

  ionViewDidLoad() {

  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.room.latitude,
          lng: this.room.longitude
        },
        zoom: 18,
        tilt: 30
      },

      controls: {
        'compass': true,
        'myLocationButton': true,
        'myLocation': true,   // (blue dot)
        'indoorPicker': true,
        'zoom': true,          // android only
        'mapToolbar': true     // android only
      },

      gestures: {
        scroll: true,
        tilt: true,
        zoom: true,
        rotate: true
      },
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Aula   ' + this.room.name,
      animation: 'DROP',
      position: {
        lat: this.room.latitude,
        lng: this.room.longitude
      }
    });
    marker.showInfoWindow();
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {

    });
  }

  getRoom(){
    this.roomRestProvider.getRoomById(this.idRoom).subscribe(data=> {
      this.room=data;
      this.loadMap();
      console.log(this.room);
    })
  }

  roomPosition() {

      let cameraPos: CameraPosition<ILatLng> = {
        target: {
          lat: this.room.latitude,
          lng: this.room.longitude
        },
        zoom:18,
        duration:1000
      };
      this.map.animateCamera(cameraPos);


  }
}
