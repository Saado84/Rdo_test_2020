import { Component, OnInit } from '@angular/core';
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

  favorisList = [];
   

  constructor(
    private router: Router,
    private RestoService: RestoService,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth) {

  }


  ngOnInit(){

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.getFavoris(auth.uid);
      } 
    }); 
  };


  getFavoris(UserId: string){
    this.afDatabase.list('Users/' + UserId + '/Favoris/')
    .snapshotChanges(['child_added', 'child_removed'])
    .subscribe(Favs => {
      this.favorisList = []; 
      Favs.forEach(Fav => {
        this.favorisList.push({
          key: Fav.key,
          name: Fav.payload.exportVal().name,
          adresse: Fav.payload.exportVal().adresse,
          tel: Fav.payload.exportVal().tel,
          state: Fav.payload.exportVal().state,

          icone: Fav.payload.exportVal().icone,
          menus: Fav.payload.exportVal().menus,
          latitude: Fav.payload.exportVal().latitude,
          longitude: Fav.payload.exportVal().longitude,
          horaires: Fav.payload.exportVal().horaires,
          addAsFavoris: Fav.payload.exportVal().addAsFavoris,  


        });
      });
    });
  }; 



  // La dernière ligne de cette fonction est à revoir !!
  // Option 2 : essayer de repasserles data via Firebase

  deleteMenu(index: number){

    console.log(this.favorisList[index].key);

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.changeFavorisState(auth.uid, index); 
      } 
    }); 
    this.favorisList.splice(index,1);    
  };


  changeFavorisState(UserId: string, index: number){
    this.afDatabase.list('Users/' + UserId + '/Favoris/' + this.favorisList[index].key).remove(); 
  };


  onSendMenus(index: number) {
    this.RestoService.setData('Menus', this.favorisList[index]); 
    this.router.navigateByUrl('/abracadabrasy/Menus');
  };


}
