import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx'; 
import { AngularFirestore } from '@angular/fire/firestore';

import { Platform} from '@ionic/angular'; 


declare var google: any;  

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage {

  map: any; 

  latitude: number; 
  longitude: number; 

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef; 
 
  constructor( 

    private platform: Platform,  
    private modalController: ModalController,
    public fireStore: AngularFirestore,
    private geolocation: Geolocation) {

  }; 



  ionViewDidEnter() {
    this.platform.ready().then(() => {

      let options = { 
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false, 
        streetViewControl:false, 
        fullScreenControl: false,  
      }; 
  
      this.map = new google.maps.Map(this.mapRef.nativeElement, options); 

      this.geolocation.getCurrentPosition().then((pos) => {
        let latLng = new google.maps.LatLng(pos.coords.altitude, pos.coords.longitude);
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;
        console.log(this.latitude, this.longitude); 
         
        this.map.setCenter(latLng);
        this.map.setZoom(15); 
      });

      console.log(this.latitude, this.longitude); 

    });
  };


  


  closeMapPage(){
    this.modalController.dismiss()
  };

  
}
