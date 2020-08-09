import { Component, OnInit, OnDestroy } from '@angular/core';
import { Menu } from 'src/Model/Menu.model'; 
import { Subscription } from 'rxjs';
import { CommandesService } from 'src/Services/Commandes.service';



@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss'],
})
export class CommandesPage implements OnInit, OnDestroy{

  commandesList: Menu[];
  commandesListSubscription: Subscription;  

  constructor(private commandesService: CommandesService) {}


  ngOnInit() {
    this.commandesListSubscription = this.commandesService.commandesList$.subscribe(
      (commandes: Menu[]) => {
        this.commandesList = commandes; 
      }
    );
    this.commandesService.fetchList();
  };

  ngOnDestroy(){
    this.commandesListSubscription.unsubscribe();
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


  deleteMenu(index: number){
    this.commandesList.splice(index,1);
  };
  

}




