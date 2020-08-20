import { Component, OnInit } from '@angular/core';
import { Favoris } from 'src/Model/Favoris.model';
import { Subscription } from 'rxjs';  
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
  favorisListSubscription: Subscription;  

  favorisKey = []; 

  constructor(
    private favorisService: FavorisService, 
    private router: Router,
    private RestoService: RestoService,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth) {

  }


  ngOnInit(){

    this.favorisListSubscription = this.favorisService.favorisList$.subscribe(
      (favoris: Favoris[]) => {
        this.favorisList = favoris; 
      }
    );
    this.favorisService.fetchList(); 

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.getFavorisKey(auth.uid);
      } 
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



  deleteMenu(index: number){

    console.log(this.favorisList[index].name);

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.changeFavorisState(auth.uid, index); 
      } 
    }); 
      
    this.favorisService.deleteFavoris(this.favorisList[index].name).then(() => {
      this.favorisService.fetchList();
    });
    
  };



  changeFavorisState(UserId: string, index: number){
    this.afDatabase.list('Users/' + UserId + '/Favoris/' + this.favorisKey[index].key).remove(); 
    
  };


  onSendMenus(index: number) {
    this.RestoService.setData('Menus', this.favorisList[index]); 
    this.router.navigateByUrl('/abracadabrasy/Menus');
  
  };


}
