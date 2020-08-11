import { Component } from '@angular/core';
import { Favoris } from 'src/Model/Favoris.model';

import { FavorisService } from 'src/Services/Favoris.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { MenusService } from 'src/Services/Menus.service';

import { PopoverController, ToastController, NavController } from '@ionic/angular'; 
import { PopoverPage } from '../popover/popover.page';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';


 

@Component({
  selector: 'app-abracadabrasy',
  templateUrl: './abracadabrasy.page.html',
  styleUrls: ['./abracadabrasy.page.scss'],
})

export class AbracadabrasyPage {

  private fastFood: any; 

  Menus: any[]; 

  Horaires: any[]; 

  state = false;  
    
  sentFavoris = false; 


  constructor(
    private favorisService: FavorisService, 
    private route: ActivatedRoute, 
    private router: Router,

    public navCtrl: NavController, 

    private MenusService: MenusService,
    public popoverController: PopoverController, 
    public toastController: ToastController,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth, 
  ) {

    if(this.route.snapshot.data['special']) {
      this.fastFood = this.route.snapshot.data['special']; 
    };

    this.Menus = this.fastFood.menus; 
    this.Horaires = this.fastFood.horaires; 


    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.getFavorisState(auth.uid);
      } 
    });

  };
 

  getFavorisState(UserId: string){
    this.afDatabase.list('Users/' + UserId + '/Favoris/')
    .snapshotChanges().subscribe(actions => {
       
      actions.forEach(action => {
        if(this.fastFood.key === action.key){
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
    this.fastFood.horaires
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
      adresse: this.fastFood.adresse,
      tel: this.fastFood.tel,
      icone: this.fastFood.icone,
      menus: this.fastFood.menus,
      latitude: this.fastFood.latitude,
      longitude: this.fastFood.longitude,
      horaires: this.fastFood.horaires,
      addAsFavoris: this.sentFavoris, 
      sate: this.state

    })
  }; 


  onBack(){
    this.navCtrl.navigateBack('/fastfood'); 
  }; 


  onSendCompos(index: number){
    this.MenusService.setData('compos', [this.Menus[index], this.fastFood]); 
    this.router.navigateByUrl('/menuburger/compos')
  }; 


  onPhone(){

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
        }
      }
    ];
    document.body.appendChild(alert);
    return alert.present();
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
      duration: 3000
    });
    toast.present();
  };

}

 
