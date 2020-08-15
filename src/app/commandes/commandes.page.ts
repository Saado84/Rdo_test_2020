import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/Model/Menu.model'; 

import { CommandesService } from 'src/Services/Commandes.service';



@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss'],
})
export class CommandesPage implements OnInit{

  commandesList: Menu[];
   

  constructor(
    private commandesService: CommandesService) {

    this.loadCommandes(); 
  }


  ngOnInit() {

  };

  loadCommandes(){
    this.commandesService.getCommandes().then(list => {
      this.commandesList = list; 
    });
  };


  onDrink(index: number){  
    if(this.commandesList[index].choiceValue === "Menu")
    return "Boisson: " + this.commandesList[index].boisson;
  };

  onPrice(index: number){
    if(this.commandesList[index].choiceValue === "Solo")
    return this.commandesList[index].priceSolo;
    else if(this.commandesList[index].choiceValue === "Menu")
    return this.commandesList[index].priceMenu
  }; 


  deleteCommande(index: number){
    this.commandesService.deleteCommande(this.commandesList[index].name).then(() => {
      this.loadCommandes();
    }); 
  };



  

}




