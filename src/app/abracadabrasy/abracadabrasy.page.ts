import { Component, OnDestroy } from '@angular/core';
import { Favoris } from 'src/Model/Favoris.model';
import { MapPage } from '../map/map.page';

import { FavorisService } from 'src/Services/Favoris.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { MenusService } from 'src/Services/Menus.service';

import { PopoverController, ToastController, NavController } from '@ionic/angular'; 
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { CallNumber } from '@ionic-native/call-number/ngx'; 


 

@Component({
  selector: 'app-abracadabrasy',
  templateUrl: './abracadabrasy.page.html',
  styleUrls: ['./abracadabrasy.page.scss'],
})

export class AbracadabrasyPage implements OnDestroy {

  private fastFood: any; 

  Menus: any[]; 

  Horaires: any[]; 
  Category: string; 
     
  sentFavoris = false; 


  constructor(
    private favorisService: FavorisService, 
    private route: ActivatedRoute, 
    private router: Router,
    public modalController: ModalController, 
    private routerOutlet: IonRouterOutlet,
    public navCtrl: NavController, 
    private MenusService: MenusService,
    public popoverController: PopoverController, 
    public toastController: ToastController,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth, 
    private callNumber: CallNumber
   ) {  

    if(this.route.snapshot.data['special']) {  
      this.fastFood = this.route.snapshot.data['special']
    }; 

    console.log(this.fastFood); 
    
    this.Menus = this.fastFood.menus; 
    this.Horaires = this.fastFood.horaires; 
    this.Category = this.fastFood.cat; 

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.getFavorisState(auth.uid);
      } 
    });

  };

  ngOnDestroy(){
    this.fastFood =! this.route.snapshot.data['special']; 
  }; 
  

  getFavorisState(UserId: string){
    this.afDatabase.list('Users/' + UserId + '/Favoris/')
    .snapshotChanges().subscribe(actions => {
       
      actions.forEach(action => {
        if(this.fastFood.name === action.payload.exportVal().name){
          this.sentFavoris = action.payload.exportVal().addAsFavoris;
        }; 
        
      });
    });
  };

  
  getFavoris(){

    let newFavoris = new Favoris(  
    this.fastFood.name,
    this.fastFood.adresse,
    this.fastFood.tel,
    this.fastFood.icone, 
    this.fastFood.menus, 
    this.fastFood.latitude, 
    this.fastFood.longitude, 
    this.fastFood.horaires, 
    this.fastFood.cat
    );
    this.favorisService.addFavoris(newFavoris);

    this.sentFavoris = !this.sentFavoris; 

    this.presentToast(); 

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.addUserFavoris(auth.uid);
      } 
    });
  };

  
  addUserFavoris(userId: string){
    this.afDatabase.list('Users/'+ userId + '/Favoris/').push({
      name: this.fastFood.name,
      addAsFavoris: this.sentFavoris, 
    })
  }; 



  onBack(cat: string){ 

    if(cat == "FF"){
      this.navCtrl.navigateBack('/fastfood')
    } else {
      if(cat == "PZ"){
        this.navCtrl.navigateBack('/pizzeria')
      } else {
        this.navCtrl.navigateBack('/restaurants')
      };
    };
 
  }; 


  onSendCompos(index: number){
    this.MenusService.setData('compos', [this.Menus[index], this.fastFood]); 
    this.router.navigateByUrl('/menuburger/compos')
  }; 


  
  // Il faut vérifier le fonctionnement de cette fonction sur un émulateur ou device réel directement //
  // Ensuite voir si rajouter un toast en cas d'erreur ! //
  onPhone(number: string){

    console.log('Numero: ' + number); 

    const alert = document.createElement('ion-alert');
    alert.message = this.fastFood.tel;
    alert.cssClass = 'my-custom-class';
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
      }, {
        text: 'Appeler',
        handler: () => {
          this.phoneNumber(number)
        }
      }
    ];
    document.body.appendChild(alert);
    return alert.present();
  };


  phoneNumber(number: string){
    this.callNumber.callNumber(number, true)
    .then(res => console.log('clavier activé', res))
    .catch(err => console.log('Erreur activation clavier', err)); 
  }; 



  // la data passe en dismiss mais son affichage est "undefined" à cause de l'asynchrone //
  // résoudre cette problématique //
  async onLOcate(){
    
    const modal = await this.modalController.create({
      component: MapPage,
      swipeToClose: true,
      componentProps: {
        Lat: this.fastFood.latitude, 
        Lng: this.fastFood.longitude
      },
      presentingElement: this.routerOutlet.nativeEl 
    });
    modal.present(); 
  };
   


  async onTime(ev: Event){

    const popover = this.popoverController.create({
      component: PopoverPage, 
      componentProps: {
        custom_id: this.fastFood.horaires
      }, 
      event: ev  
    });
    (await popover).present(); 
  };
    

  async presentToast() {

    const toast = await this.toastController.create({
      message: this.fastFood.name + ' a été ajouté aux favoris',
      duration: 1500
    });
    toast.present();
  };

}

 
