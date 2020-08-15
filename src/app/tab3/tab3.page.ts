import { Component, OnInit } from '@angular/core';
import { Favoris } from 'src/Model/Favoris.model';
 
import { FavorisService } from 'src/Services/Favoris.service'; 
import { Router } from '@angular/router';
import { RestoService } from 'src/Services/Resto.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit{

  favorisList: Favoris[];
    

  favorisKey = []; 

  constructor(
    private favorisService: FavorisService, 
    private router: Router,
    private RestoService: RestoService,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth) {

  }


  ngOnInit(){

   this.loadFavoris();

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.getFavorisKey(auth.uid);
      } 
    }); 
  };

  loadFavoris(){

    this.favorisService.getFavoris().then(list => {
      this.favorisList = list; 
    });
  };


  getFavorisKey(UserId: string){
    this.afDatabase.list('Users/' + UserId + '/Favoris/')
    .snapshotChanges(['child_added', 'child_removed'])
    .subscribe(Favs => {
      this.favorisKey = []; 
      Favs.forEach(Fav => {
        this.favorisKey.push({
          key: Fav.key,
        });
      });
    });
  }; 



  // La dernière ligne de cette fonction est à revoir !!

  deleteMenu(index: number){

    console.log(this.favorisList[index].name);

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.changeFavorisState(auth.uid, index); 
      } 
    });   
    this.favorisService.deleteFavoris(this.favorisList[index].name);
    this.loadFavoris(); 
    
  };



  changeFavorisState(UserId: string, index: number){
    this.afDatabase.list('Users/' + UserId + '/Favoris/' + this.favorisKey[index].key).remove(); 
    
  };


  onSendMenus(index: number) {
    this.RestoService.setData('Menus', this.favorisList[index]); 
    this.router.navigateByUrl('/abracadabrasy/Menus');
  
  };


}
