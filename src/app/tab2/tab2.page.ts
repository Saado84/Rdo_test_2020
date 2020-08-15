import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/Model/Menu.model';

import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs'; 
import { MenuService } from 'src/Services/Menu.service';
import { CommandesService } from 'src/Services/Commandes.service';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
  

  menuList: Menu[];
  menuListSubscription: Subscription; 
  
    
  constructor(
    public afDB: AngularFireDatabase, 
    private menuService: MenuService, 
    private commandesService: CommandesService,
  ){};


  ngOnInit(){
    this.menuListSubscription = this.menuService.menuList$.subscribe(
      (menus: Menu[]) => {
        this.menuList = menus; 
      }
    );
    this.menuService.fetchList();
  };



  onPrice(index: number){
    if(this.menuList[index].choiceValue === "Solo")
    return this.menuList[index].priceSolo;
    else if(this.menuList[index].choiceValue === "Menu")
    return this.menuList[index].priceMenu
  };  

  onDrink(index: number){  
    if(this.menuList[index].choiceValue === "Menu")
    return "Boisson: " + this.menuList[index].boisson;
  };
  

  deleteMenu(index: number){
    this.menuService.deleteMenu(this.menuList[index].name).then(() => {
      this.menuService.fetchList();
    }); 
  };


  addMenu(index: number){
    this.afDB.list('Menus/').push({
      fastFood: this.menuList[index].fastFood,
      menu: this.menuList[index].name,
      compos: this.menuList[index].compos,
      option: this.menuList[index].choiceValue,
      quantite: this.menuList[index].quantMenu, 
      sauce: this.menuList[index].sauce,
      boisson: this.menuList[index].boisson,
      price: this.onPrice(index), 
    });
    this.sendCommande(index);
    this.presentAlert(index);
    this.deleteMenu(index);
  };


  presentAlert(index: number) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Commande envoyée';
    alert.subHeader = 'temps de préparation estimé: 25 min';
    alert.message = 'Veuillez passer récupérer votre commande chez: '+ this.menuList[index].fastFood;
    alert.buttons = ['OK'];
  
    document.body.appendChild(alert);
    return alert.present();
  };

  sendCommande(index: number){
    let newCommande = new Menu(  
      this.menuList[index].fastFood,
      this.menuList[index].name,
      this.menuList[index].priceSolo,
      this.menuList[index].compos,
      this.menuList[index].priceMenu,
      this.menuList[index].sauce,
      this.menuList[index].boisson,
      this.menuList[index].choiceValue,
      this.menuList[index].quantMenu
    );
    this.commandesService.addCommande(newCommande);
  };


}
