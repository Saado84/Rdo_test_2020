import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { MenuService } from 'src/Services/Menu.service';
import { Menu } from 'src/Model/Menu.model'; 
import { Router } from '@angular/router';




@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})

export class PanierPage implements OnInit {

  menu = {
    fastFood: '',
    name: '',
    priceSolo: '',
    compos: '',
    priceMenu: '',
    sauce: '',
    boisson: '',
    choiceValue: 'Solo',
    quantMenu: 1,

  }; 
  

  constructor(
    private modalController: ModalController, 
    private navParams: NavParams, 
    private menuService: MenuService,
    private toastController: ToastController,
    private router: Router) {}


  ngOnInit() {
    this.menu.fastFood = this.navParams.get('menuFastFood');
    this.menu.name = this.navParams.get('menuName');
    this.menu.priceSolo = this.navParams.get('menuPriceSolo');
    this.menu.compos = this.navParams.get('menuCompos');
    this.menu.priceMenu = this.navParams.get('menuPriceMenu');
  };



  closePanierPage(){
    let newMenu = new Menu(  
      this.menu.fastFood,
      this.menu.name,
      this.menu.priceSolo,
      this.menu.compos,
      this.menu.priceMenu,
      this.menu.sauce,
      this.menu.boisson,
      this.menu.choiceValue,
      this.menu.quantMenu
    );
    this.menuService.addMenu(newMenu);
    this.modalController.dismiss();
    this.presentToastWithOptions(); 

  };


  pushOne(){
    this.menu.quantMenu++;
  };


  popOne(){
    if (this.menu.quantMenu > 1){
      return  this.menu.quantMenu--;
    } else {
      return this.menu.quantMenu = 1
   };
  };

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          icon: 'cart-outline',
          text: 'aller au panier pour commander votre séléction',
          handler: () => {
            this.router.navigateByUrl('/tabs/tab2'); 
          }
        }, {
          text: 'X',
          side: 'end', 
          role: 'cancel',
        }
      ]
    });
    toast.present();
  }; 


  onDismissPage(){
    this.modalController.dismiss(); 
  }


}

