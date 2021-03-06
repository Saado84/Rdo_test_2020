import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { PanierPage } from '../panier/panier.page';
import { ActivatedRoute, Router } from '@angular/router';
import { RestoService } from 'src/Services/Resto.service';



@Component({
  selector: 'app-menuburger',
  templateUrl: './menuburger.page.html',
  styleUrls: ['./menuburger.page.scss'],
})

export class MenuburgerPage implements OnInit {

  Menu: any[]; 

  Compos: any[]; 
  
  Horaires: any[]; 

  menu$ = {

    restoName : '',
    name : '',
    priceSolo:'',
    compos:'',
    priceMenu:''

  }; 


  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private RestoService: RestoService) {}


  ngOnInit() {

    if(this.route.snapshot.data['Special']) {
      this.Menu = this.route.snapshot.data['Special'];      
    }; 
    this.Compos = this.Menu[0].compos; 
    this.Horaires = this.Menu[1].horaires;  
    
  }; 

  
  onBack(){
    this.RestoService.setData('MENUS', this.Menu[1]); 
    this.navCtrl.navigateBack('/abracadabrasy/MENUS')    

  }; 

  async openPanierPage(){
    const modal = await this.modalController.create({
      component: PanierPage,
      swipeToClose: true,
      componentProps: {
        menuFastFood: this.menu$.restoName,
        menuName: this.menu$.name,
        menuPriceSolo: this.menu$.priceSolo, 
        menuCompos: this.menu$.compos, 
        menuPriceMenu: this.menu$.priceMenu,
        
        menuHoraires: this.Horaires, 
      },
      presentingElement: this.routerOutlet.nativeEl

    });
    modal.present(); 
  }; 

  sendMenu(index: number){
    this.menu$.restoName = this.Menu[1].name;  
    this.menu$.name = this.Compos[index].name;
    this.menu$.priceSolo = this.Compos[index].priceSolo;
    this.menu$.compos = this.Compos[index].compos;
    this.menu$.priceMenu = this.Compos[index].priceMenu;
    this.openPanierPage()
  };


}; 




 

