import { Component } from '@angular/core';
import { ModalController, IonRouterOutlet, NavController} from '@ionic/angular';
import { MapPage } from '../map/map.page';

 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  constructor(  
    public modalController: ModalController, 
    private routerOutlet: IonRouterOutlet,
    public navCtrl:NavController) {

  }

  async openPanierPage(){
   const modal = await this.modalController.create({
    component: MapPage,
    swipeToClose: true,
    presentingElement: this.routerOutlet.nativeEl 
   });
    modal.present(); 
  }; 


  onOpenfastfoodPage(){
    this.navCtrl.navigateForward('/fastfood'); 
  }

  onOpenpizzeriaPage(){
    this.navCtrl.navigateForward('/pizzeria'); 
  }

  onOpenrestaurantsPage(){
    this.navCtrl.navigateForward('/restaurants'); 
  }

}
