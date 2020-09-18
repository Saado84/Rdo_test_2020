import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, LoadingController, ToastController, NavParams } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx'; 
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { RestoService } from 'src/Services/Resto.service';



declare var google: any;  

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage {

  map: any; 

  infoMarkers: any = []; 


  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef; 
 
  constructor( 
  
    private modalController: ModalController,
    public fireStore: AngularFirestore,
    private router: Router,
    private RestoService: RestoService,
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navParams: NavParams) {

  }; 


  ionViewDidEnter() {
    this.locateMe();   
  };
  

  // s'assurer de la précision de la localisation //
  // s'assurer le blocage du chargement de la map à cause des URL qui restent dans le cach //
  // supprimer les bouttons (+)/(-) pour le zoom et le fullscreen //
  // Rajouter le point bleu lumineux pour indiquer la position actuelle // 
  
  
  async locateMe(){

    const loading = await this.loadCtrl.create({
      message: 'Veuillez patienter...', 
      });
      await loading.present(); 
  
      this.geolocation.getCurrentPosition().then((pos) => {
      loading.dismiss(); 

      let receivedLat = this.navParams.get('Lat');
      let receivedLng = this.navParams.get('Lng');

      let latitude: number; 
      let longitude: number;  
      let zoom: number;  

      if(receivedLat){
        latitude = receivedLat,
        longitude = receivedLng, 
        zoom = 15
      } else {
        latitude = pos.coords.latitude,
        longitude = pos.coords.longitude,
        zoom = 13
      }; 

      const location = new google.maps.LatLng(latitude, longitude); 

      const options = {
        mapId: '4033f28b3217a700', 
        center: location,
        mapTypeId: 'roadmap',
        zoom: zoom, 
        mapTypeControl: false, 
        streetViewControl:false, 
        fullScreenControl: false,  
      }; 

      this.map = new google.maps.Map(this.mapRef.nativeElement, options); 
      this.loadMarker('FastFood'); 
      this.loadMarker('Pizzeria'); 
      this.loadMarker('Restaurant'); 

      }).catch(() => {
      loading.dismiss();
      this.presentToast(); 
    });
  }; 


  async presentToast(){
    const toast = await this.toastCtrl.create({
      message: 'Impossible de charger la carte !', 
      duration: 2500,
      position: "bottom"
    }); 
    toast.present(); 
  };



  // actualiser la fonction avec la bonne formule pour la lecture multi-collections rappeler la fonctions... //
  // ...plusieurs fois à travers le changement d'argument (cf. lignes 66 & 67) //

  loadMarker(collection: string ) {
    this.fireStore.collection(collection).snapshotChanges(['added', 'modified', 'removed'])
    .subscribe(actions => {
      actions.forEach(action => {
        let position = new google.maps.LatLng(
          action.payload.doc.data()['latitude'], 
          action.payload.doc.data()['longitude']
        ); 

        let icons = {
          FastFood: {
          icon: '../../assets/Map_Icons/fastfood.png'
          },
          Pizzeria: {
          icon: '../../assets/Map_Icons/pizzaria.png'
          },
          Restaurant: {
          icon: '../../assets/Map_Icons/restaurant.png'
          }
        };

        let mapMarker = new google.maps.Marker({
          position: position,
          title: action.payload.doc.data()['name'], 
          animation: google.maps.Animation.DROP,  
          icon: icons[collection].icon
        });

        let object = action.payload.doc.data(); 

        mapMarker.setMap(this.map); 
        this.addInfoMarker(mapMarker, collection, object);

      });
    });
  };

  // Personnaliser les étiquettes des marqueurs //
  // rajouter des légendes aux marqueurs //
  // Agrandir un peu plus les icones des marqueurs //

  addInfoMarker(marker, type: string, object: any){
    let infoMarkerContent = 
    '<div id="content">' +
      '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
      '<p>' + type + '</p>' +
      '<ion-button id="navigate">VOIR MENUS</ion-button>' +  
    '</div>'; 

    let infoMarker = new google.maps.InfoWindow({
      content: infoMarkerContent
    }); 

    marker.addListener('click', () => {
      this.closeAllMarkers();
      infoMarker.open(this.map, marker); 

      google.maps.event.addListenerOnce(infoMarker, 'domready', () => {
        document.getElementById('navigate').addEventListener('click', () => { 
          this.onSendMenus(object)
        });
      }); 
    });

    this.infoMarkers.push(infoMarker); 
  }; 

  onSendMenus(menus: any) {  
    
    this.RestoService.setData('Map_Menus', menus); 
    this.router.navigateByUrl('/abracadabrasy/Map_Menus');
    this.closeMapPage();
    
  };


  closeAllMarkers(){
    for(let marker of this.infoMarkers){
      marker.close(); 
    }
  }; 


  closeMapPage(){
    this.modalController.dismiss()
  };

  
}
