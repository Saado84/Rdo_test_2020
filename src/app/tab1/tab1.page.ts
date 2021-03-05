import { Component } from '@angular/core';
import { ModalController, IonRouterOutlet, NavController} from '@ionic/angular';
import { MapPage } from '../map/map.page';

 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  images = [
    {
      name: 'Fast-food',  
      page: '/fastfood', 
      ref: '../../assets/Burger.jpg'
    }, 
    {
      name: 'Pizzeria', 
      page: '/pizzeria', 
      ref: '../../assets/Pizza.jpg'
    }, 
    {
      name: 'Restaurants', 
      page: '/restaurants', 
      ref: '../../assets/Restaurant.jpg'
    }
  ]

  constructor(  
    public modalController: ModalController, 
    private routerOutlet: IonRouterOutlet,
    public navCtrl:NavController) { 

  }

  
  onOpenList(index: number){
    this.navCtrl.navigateForward(this.images[index].page); 
  }; 


  async openPanierPage(){
    const modal = await this.modalController.create({
     component: MapPage,
     swipeToClose: true,
     presentingElement: this.routerOutlet.nativeEl 
    });
     modal.present(); 
   }; 

}
